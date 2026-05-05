# Order API Codemap

> Auto-generated codemap of all Order module files, endpoints, and database procedure dependencies.
> Use this as a reference before making schema or procedure changes.

---

## 1. File Inventory

| Layer | File | Purpose |
|-------|------|---------|
| Routes | `src/interfaces/http/routes/order.routes.js` | Route definitions, middleware wiring |
| Controller | `src/interfaces/http/controllers/order.controller.js` | Express handlers, request/response mapping |
| Service | `src/modules/order/order.service.js` | Business logic, mode detection, diff computation |
| Repository | `src/modules/order/order.repository.js` | Data access, SP calls, mock fallback |
| Validation | `src/interfaces/http/validations/validation.schemas.js` (lines 113-175) | Zod schemas for create/update |
| Seeds | `src/modules/order/order.seed.js` | Mock in-memory data for `USE_MOCK_DB=true` |
| App Mount | `src/app.js` (line 42) | `app.use('/api/v1/orders', orderRoutes)` |

### Cross-module Dependencies

| Dependency | Used By | Purpose |
|------------|---------|---------|
| `src/modules/parcel/parcel-code.service.js` | Service (mapper), Repository (aggregate builder) | Generates `UC-{orderId}-{parcelId}` codes |
| `src/modules/product/product.repository.js` | Service | Resolves product variations |
| `src/shared/middleware/auth.middleware.js` | Routes | `protect`, `authorizeRoles` |
| `src/shared/middleware/validate.middleware.js` | Routes | Zod validation middleware |
| `src/infrastructure/database/db.js` | Repository | MySQL connection pool |

---

## 2. API Endpoints

### 2.1 `POST /api/v1/orders` — Create Order

- **Controller:** `createOrder` (`order.controller.js:16-19`)
- **Service:** `orderService.createOrder()` → `_createOrderLive()` / `_createOrderMock()`
- **Validation:** `createOrderSchema` (Zod, `validation.schemas.js:139-150`)
- **Roles:** `ADMIN`, `OPERATOR`
- **Status:** `201 Created`

**Payload shape (Mode A/B/C):**
```
{
  senderId, senderAddressId, courierId?,
  products?: [{ variationId, quantity }],        // Mode A: root products
  receivers?: [{ receiverId, receiverAddressId,   // Mode B/C: external receivers
                 products: [{ variationId, quantity }] }]
}
```

**Flow:**
1. Resolve sender party + address via `resolveParty` / `resolveAddress`
2. Resolve all product variations via `resolveVariation` (falls back to `resolveProduct` for `FkUnitId`)
3. Resolve all receiver parties + addresses
4. Detect mode: Mode A (root products only), Mode B (receivers only), Mode C (both)
5. Normalize into unified receivers list via `_buildReceiversList()`
6. **Live:** Managed transaction → `prc_order_master_set` → `prc_receiver_details_set` → `prc_order_items_set` → `prc_parcel_details_set`
7. Re-fetch aggregate via `findById()` → `_mapOrderAggregate()`

---

### 2.2 `GET /api/v1/orders` — List Orders

- **Controller:** `getOrderList` (`order.controller.js:26-47`)
- **Service:** `orderService.getOrderSummaryList(filters)`
- **Roles:** `ADMIN`, `OPERATOR`, `COURIER`
- **Query params:** `page`, `limit`, `search`, `sortBy`, `sortOrder`

**Flow:**
1. `findAllOrders()` → **Live:** `prc_order_master_get(0, 0)` + `prc_receiver_details_get(0, 0)` + `prc_parcel_details_get(0, 0)`
2. Enrich each order with `TotalParcels` (counted from receiver→parcel mapping)
3. In-memory pagination + search filtering
4. Map via `_mapOrderSummary()`

**Response:** `{ success, data: OrderSummary[], meta: { page, limit, totalRows, totalPages } }`

---

### 2.3 `GET /api/v1/orders/:id` — Get Order Detail

- **Controller:** `getOrderById` (`order.controller.js:54-57`)
- **Service:** `orderService.getOrderDetails(orderId)`
- **Roles:** `ADMIN`, `OPERATOR`

**Flow:**
1. `findById(orderId)` → **Live:** `prc_order_master_get(1, orderId)` + `prc_Party_master_get(1, null, senderId)` + `prc_courier_partner_master_get(1, courierId)` + `prc_receiver_details_get(0, 0)` + `prc_parcel_details_get(0, 0)` + `prc_order_items_get(0, 0)`
2. `_buildOrderAggregate()` assembles nested JSON
3. Map via `_mapOrderAggregate()`

**Response:** `{ success, data: OrderAggregate }` — nested: order → receivers → [items[], parcel]

---

### 2.4 `PUT /api/v1/orders/:id` — Update Order

- **Controller:** `updateOrder` (`order.controller.js:65-68`)
- **Service:** `orderService.updateOrder(orderId, payload, user)`
- **Validation:** `updateOrderSchema` (Zod, `validation.schemas.js:168-175`)
- **Roles:** `ADMIN`, `OPERATOR`

**Payload shape (diff strategy):**
```
{
  senderId?, senderAddressId?,
  receivers?: [{
    receiverDetailsId?,     // present = update, absent = insert
    receiverId, receiverAddressId,
    products: [{
      orderItemId?,          // present = update, absent = insert
      variationId, quantity
    }]
  }]
}
```

**Flow:**
1. Fetch existing header (`getOrderHeader`), receivers, items, parcels
2. **Threshold guard:** `_checkPhysicalExecutionBegun()` — blocks if any parcel status ≥ `AWB_LINKED`
3. Resolve sender snapshot if `senderId`/`senderAddressId` provided
4. Resolve incoming receivers + products
5. Compute diffs: `_diffReceivers()` → `_diffItems()` (toUpdate, toCreate, toRemove)
6. Recalculate `totalAmount`
7. **Live:** Managed transaction via `_updateOrderGraphLive()`:
   - Update header: `prc_order_master_set`
   - Remove receivers: cancel parcel (`prc_parcel_details_set` trigger=5) → soft-delete items (`prc_order_items_set` isActive=0) → soft-delete receiver (`prc_receiver_details_set` isActive=0)
   - Update receivers: `prc_receiver_details_set` + item diffs (remove/update/create via `prc_order_items_set`)
   - Create receivers: `prc_receiver_details_set` → `prc_order_items_set` → `prc_parcel_details_set` (trigger=0)
8. Re-fetch full aggregate

---

### 2.5 `DELETE /api/v1/orders/:id/cancel` — Cancel Order

- **Controller:** `cancelOrder` (`order.controller.js:76-79`)
- **Service:** `orderService.cancelOrder(orderId, user)`
- **Roles:** `ADMIN`, `OPERATOR`

**Flow:**
1. Fetch header, receivers, parcels
2. **Threshold guard:** `_checkPhysicalExecutionBegun()` — blocks if any parcel is `DISPATCHED` or `DELIVERED`
3. **Live:** Managed transaction via `_cancelOrderLive()`:
   - Cancel parcels: `prc_parcel_details_set` (trigger=5)
   - Soft-delete items: `prc_order_items_set` (isActive=0)
   - Soft-delete receivers: `prc_receiver_details_set` (isActive=0)
   - Soft-delete order: `prc_order_master_set` (isActive=0)

---

## 3. Database Procedures Referenced

### Order Module (direct calls from `order.repository.js`)

| Procedure | pAction / Params | Called From |
|-----------|-------------------|-------------|
| `prc_order_master_set` | pPkOrderId, pSenderId, pFkPartyDetailsId, pTotalAmount, pCreatedBy, pIsActive | `_executeOrderMaster`, `_updateOrderGraphLive`, `_cancelOrderLive` |
| `prc_order_master_get` | pAction=0 (list all), pAction=1 (by id) | `findAllOrders`, `findById`, `getOrderHeader` |
| `prc_receiver_details_set` | pPkReceiverDetailsId, pFkOrderId, pReceiverId, pFkPartyDetailsId, pCreatedBy, pIsActive | `_executeReceiverDetails`, `_updateOrderGraphLive`, `_cancelOrderLive` |
| `prc_receiver_details_get` | pAction=0 (all), pAction=1 (by id) | `findAllOrders`, `findById`, `getReceiversForOrder` |
| `prc_order_items_set` | pPkOrderItemId, pFkReceiverDetailsId, pFkProductId, pFkLuColorId, pOutwardQty, pFkUnitId, pUnitPrice, pCreatedBy, pIsActive | `_executeOrderItem`, `_updateOrderGraphLive`, `_cancelOrderLive` |
| `prc_order_items_get` | pAction=0 (all) | `findById`, `getItemsForReceivers` |
| `prc_parcel_details_set` | pTriggerType=0 (CREATE), pTriggerType=5 (CANCEL) | `_executeParcelDetails`, `_updateOrderGraphLive`, `_cancelOrderLive` |
| `prc_parcel_details_get` | pAction=0 (all) | `findAllOrders`, `findById`, `getParcelsForReceivers` |

### Cross-module Procedures (for resolution)

| Procedure | pAction / Params | Called From |
|-----------|-------------------|-------------|
| `prc_Party_master_get` | pAction=1, pLookUpId=null, pPkPartyId=partyId | `resolveParty`, `findById` (sender email) |
| `prc_party_details_get` | pAction=1, pPkPartyId=partyId | `resolveAddress` |
| `prc_product_master_search` | productId, 0, 0 | `resolveProduct` |
| `prc_product_color_matrix_get` | pAction=1, variationId | `resolveVariation` |
| `prc_courier_partner_master_get` | pAction=1, courierId | `findById` (courier name) |

---

## 4. Key Business Rules

### 4.1 Mode Detection (Service)
- **Mode A (Self):** `products[]` present, `receivers[]` absent → synthetic receiver from sender
- **Mode B (External):** `products[]` absent, `receivers[]` present → external receivers only
- **Mode C (Combo):** both present → synthetic receiver + external receivers

### 4.2 Status Derivation (Repository `_deriveOrderStatus`)
Order status is **mathematically derived** from parcel states, never stored:
- All `CANCELLED` → `Cancelled`
- All `DELIVERED` → `Completed`
- All `DISPATCHED` → `Dispatched`
- Mixed dispatched/delivered → `Partially Dispatched`
- All `LABEL_PRINTED`/`AWB_LINKED` → `Label Printed`
- Mixed printed/pending → `Partially Printed`
- Default → `Pending`

### 4.3 Threshold Guards (Service `_checkPhysicalExecutionBegun`)
Both `updateOrder` and `cancelOrder` block if any parcel has reached:
- `AWB_LINKED`
- `DISPATCHED`
- `DELIVERED`

### 4.4 Parcel Lifecycle (Enforced by SPs)
`Created → Label Printed → AWB Linked → Dispatched → Delivered`

### 4.5 Append-Only Audit
All state changes logged in `receiver_status_details` via stored procedures. Never updated or deleted.

---

## 5. Validation Schemas Summary

### `createOrderSchema` (`validation.schemas.js:139`)
- Extends `baseOrderSchema` with `.superRefine()` ensuring at least one of `products` or `receivers` is present

### `baseOrderSchema` (`validation.schemas.js:122-137`)
- `senderId` (required, positive int)
- `senderAddressId` (required, positive int)
- `courierId` (optional, nullable, positive int)
- `products` (optional array of `{ variationId, quantity }`)
- `receivers` (optional array of `{ receiverId, receiverAddressId, products[] }`)

### `updateOrderSchema` (`validation.schemas.js:168-175`)
- `senderId` (optional)
- `senderAddressId` (optional)
- `receivers` (optional array with diff-aware shape: `receiverDetailsId?`, `receiverId`, `receiverAddressId`, `products[{ orderItemId?, variationId, quantity }]`)
- Refined: at least one field must be provided

---

## 6. Response Shapes

### OrderSummary (list item)
```json
{
  "orderId": 1,
  "orderCode": "ORD-20260330-001",
  "senderId": 1,
  "senderName": "Ramesh Textiles",
  "senderEmail": null,
  "senderMobile": "9876543210",
  "totalAmount": 3650.00,
  "derivedStatus": "Pending",
  "createdAt": "2026-03-30T10:00:00.000Z",
  "expectedDeliveryDate": null,
  "totalParcels": 2
}
```

### OrderAggregate (detail)
```json
{
  "...OrderSummary fields...,
  "senderAddress": "14, Gandhi Nagar...",
  "courierId": 1,
  "courierName": "Bluedart",
  "receivers": [{
    "id": 1,
    "receiverId": 2,
    "receiverName": "Delhi Fabrics Ltd.",
    "receiverEmail": "delhi@fabrics.com",
    "receiverPhone": "9123456780",
    "address": "45, Karol Bagh",
    "city": "New Delhi",
    "state": "Delhi",
    "pincode": "110005",
    "parcel": {
      "parcelId": 1,
      "parcelCode": "UC-1-1",
      "trackingNo": null,
      "status": "PENDING"
    },
    "products": [{
      "productId": 1,
      "quantity": 5,
      "unitPrice": 420.00,
      "materialName": "Cotton Fabric",
      "materialCode": "CF-001",
      "unitTitle": "Meter"
    }]
  }]
}
```

---

## 7. Dual-Mode Architecture

All repository methods follow this pattern:
```js
async someMethod(...args) {
  if (process.env.USE_MOCK_DB !== 'true') {
    return this._someMethodLive(...args);
  }
  return this._someMethodMock(...args);
}
```

- **Live mode** (`USE_MOCK_DB=false`): Calls MySQL stored procedures via `db.execute()`
- **Mock mode** (`USE_MOCK_DB=true`): Mutates in-memory seed arrays from `order.seed.js`

The service layer also has a top-level mock/live split in `createOrder()`.

---

## 8. Naming Convention Notes

The codebase handles **dual-case** column names throughout:
- **Live DB (PascalCase):** `PkOrderId`, `OrderCode`, `FkSenderId`, `SenderName`, etc.
- **Mock seeds (camelCase):** `id`, `orderCode`, `fkSenderId`, `senderName`, etc.

All mappers (`_mapOrderSummary`, `_mapOrderAggregate`) use fallback chains like:
```js
o.PkOrderId || o.id || o.orderId
```

---

## 9. Potential Change Impact Areas

When modifying schema or procedures, these areas are most likely to need updates:

1. **Column renames:** Update all mappers in `order.service.js` (`_mapOrderSummary`, `_mapOrderAggregate`) and `order.repository.js` (`_buildOrderAggregate`)
2. **New/removed SP parameters:** Update `_executeOrderMaster`, `_executeReceiverDetails`, `_executeOrderItem`, `_executeParcelDetails` in `order.repository.js`
3. **New SP signatures:** Update `_updateOrderGraphLive` and `_cancelOrderLive` transaction flows
4. **New fields in payload:** Update Zod schemas in `validation.schemas.js` (lines 113-175)
5. **Status flow changes:** Update `_checkPhysicalExecutionBegun` block list and `_deriveOrderStatus` logic
6. **New resolution needs:** Add methods to `order.repository.js` (following `resolveParty`/`resolveAddress` pattern)
