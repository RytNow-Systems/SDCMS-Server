# Parcel API Codemap

> Auto-generated codemap of all Parcel module files, endpoints, and database procedure dependencies.
> Use this as a reference before making schema or procedure changes.

---

## 1. File Inventory

| Layer | File | Purpose |
|-------|------|---------|
| Routes (parcels) | `src/interfaces/http/routes/parcel.routes.js` | Route definitions for parcel CRUD + state transitions |
| Routes (events) | `src/interfaces/http/routes/parcel-events.routes.js` | Route definitions for audit event browsing/export |
| Controller (parcels) | `src/interfaces/http/controllers/parcel.controller.js` | Express handlers for 9 parcel endpoints |
| Controller (events) | `src/interfaces/http/controllers/parcel-events.controller.js` | Express handlers for event browse + CSV export |
| Service | `src/modules/parcel/parcel.service.js` | Business logic, state machine, transition validation |
| Repository | `src/modules/parcel/parcel.repository.js` | Data access, SP calls, mock fallback |
| Code Service | `src/modules/parcel/parcel-code.service.js` | PCL code generation/deconstruction (`UC-{orderId}-{parcelId}`) |
| Validation | `src/interfaces/http/validations/parcel.validation.js` | Zod schemas for scan + dispatch payloads |
| Seeds | `src/modules/parcel/parcel.seed.js` | Mock in-memory data (re-exports from order.seed + own status log) |
| App Mount | `src/app.js` (lines 45-46) | `app.use('/api/v1/parcels', parcelRoutes)` + `app.use('/api/v1/parcel-events', parcelEventsRoutes)` |

### Cross-module Dependencies

| Dependency | Used By | Purpose |
|------------|---------|---------|
| `src/modules/order/order.seed.js` | `parcel.seed.js` | Re-exports `seedParcels`, `seedReceivers`, `seedParties`, `seedOrders` |
| `src/modules/sender/sender.repository.js` | `parcel-code.service.js` | Resolves `orderId` from `receiverDetailsId` via `resolveReceiverOrderId()` |
| `src/shared/middleware/auth.middleware.js` | Both route files | `protect`, `authorizeRoles` |
| `src/shared/middleware/validate.middleware.js` | `parcel.routes.js` | Zod validation middleware |
| `src/infrastructure/database/db.js` | `parcel.repository.js` | MySQL connection pool |

---

## 2. API Endpoints

### 2.1 `GET /api/v1/parcels` — List Parcels

- **Controller:** `getParcelList` (`parcel.controller.js:20-42`)
- **Service:** `parcelService.getParcelList(filters)`
- **Roles:** `ADMIN`, `OPERATOR`, `COURIER`
- **Query params:** `page`, `limit`, `search`, `status`, `sortBy`, `sortOrder`

**Flow:**
1. `parcelRepository.findAll(filters)` → **Live:** `prc_parcel_details_search(0, 0, 0, 0)` (pAction=0 = list all)
2. Client-side search filtering on `PkParcelDetailsId` + `TrackingNo`
3. In-memory pagination
4. Map each parcel via `_mapParcel()` (async — resolves `parcelId` via `ParcelCodeService.generateCodeAsync`)

**Response:** `{ success, data: ParcelSummary[], meta: { page, limit, totalRows, totalPages } }`

---

### 2.2 `GET /api/v1/parcels/:id` — Get Parcel Detail

- **Controller:** `getParcelById` (`parcel.controller.js:49-52`)
- **Service:** `parcelService.getParcelDetails(id)`
- **Roles:** `ADMIN`, `OPERATOR`, `COURIER`

**Flow:**
1. `parcelRepository.findById(id)` → **Live:** `prc_parcel_details_get(1, id)` (pAction=1 = by ID)
2. Map via `_mapParcel()`

**Response:** `{ success, data: ParcelDetail }`

---

### 2.3 `GET /api/v1/parcels/:id/label-data` — Get Label Data

- **Controller:** `getLabelData` (`parcel.controller.js:60-63`)
- **Service:** `parcelService.getLabelData(id)`
- **Roles:** `ADMIN`, `OPERATOR`

**Flow:**
1. `parcelRepository.getLabelData(id)` → **Live:** `prc_parcel_details_get(2, id)` (pAction=2 = parcel + receiver join)
2. Returns fields: `PkParcelDetailsId`, `TrackingNo`, `QRCode`, `ReceiverName`, `ReceiverPhone`, `Address`, `City`, `Pincode`
3. Map via `_mapParcel()`

**Note:** Backend does NOT generate QR images — frontend responsibility. Backend only provides the `parcelId` string.

---

### 2.4 `GET /api/v1/parcels/:id/timeline` — Get Event Timeline

- **Controller:** `getTimeline` (`parcel.controller.js:70-73`)
- **Service:** `parcelService.getTimeline(id)`
- **Roles:** `ADMIN`, `OPERATOR`, `COURIER`

**Flow:**
1. Fetch parcel via `findById(id)` to get `receiverDetailsId`
2. `parcelRepository.getTimeline(parcelId)` → **Live:** `prc_receiver_status_details_get(1, parcelId)`
3. Map events via `_mapEvent()`

**Response:** `{ success, data: TimelineEvent[] }` — chronological, Amazon-style

---

### 2.5 `POST /api/v1/parcels/:id/log-print` — Log Label Print

- **Controller:** `logPrint` (`parcel.controller.js:81-84`)
- **Service:** `parcelService.logLabelPrint(id, user)`
- **Roles:** `ADMIN`, `OPERATOR`

**Flow:**
1. Fetch parcel, validate state is `PENDING` or `LABEL_PRINTED`
2. `parcelRepository.updateParcelState(id, 1, null, 0, employeeCode)` → **Live:** `prc_parcel_details_set(id, 1, null, null, 0, adminId)`
   - Trigger 1 = PRINT_LABEL
   - Increments `LabelPrintCount`
   - Transitions to `LABEL_PRINTED`
   - SP auto-logs to `receiver_status_details`

---

### 2.6 `POST /api/v1/parcels/scan` — Atomic Scan + AWB Link

- **Controller:** `scanParcel` (`parcel.controller.js:92-95`)
- **Service:** `parcelService.scanAndLinkAWB(payload, user)`
- **Validation:** `scanParcelSchema` — `{ parcelId: string, awbNumber: string }`
- **Roles:** `ADMIN`, `OPERATOR`, `COURIER`

**Flow:**
1. Deconstruct `parcelId` (PCL code) via `ParcelCodeService.deconstructCode()` → extract numeric `parcelDetailsId`
2. Fetch parcel via `findById(parcelDetailsId)`, validate status is `LABEL_PRINTED`
3. Check AWB uniqueness via `findByAWB(awbNumber)` → **Live:** `prc_parcel_details_search_by_awb(awb)`
4. **Role-based branching:**
   - `COURIER` → `updateParcelState(id, 3, awbNumber, 0, employeeCode)` — auto-dispatch (Trigger 3 = DISPATCH)
   - `ADMIN`/`OPERATOR` → `updateParcelState(id, 2, awbNumber, 0, employeeCode)` — AWB link only (Trigger 2 = SCAN_LINK_AWB)

**Business Rule:** QR identifies the parcel, AWB links the shipment. Both happen in a **single scanning session** — one atomic backend flow.

---

### 2.7 `POST /api/v1/parcels/dispatch` — Bulk Dispatch

- **Controller:** `dispatchParcels` (`parcel.controller.js:103-106`)
- **Service:** `parcelService.dispatchParcels(parcelDetailsIds, user)`
- **Validation:** `dispatchParcelsSchema` — `{ parcelDetailsIds: number[] }`
- **Roles:** `ADMIN`, `OPERATOR`

**Flow:**
1. Iterate over `parcelDetailsIds`
2. For each: fetch parcel, validate status is `AWB_LINKED`
3. `updateParcelState(id, 3, trackingNo, 0, employeeCode)` — Trigger 3 = DISPATCH
4. Stamps `DispatchDate`

**Response:** `{ success, data: { dispatched: count, parcels: ParcelDetail[] } }`

---

### 2.8 `PATCH /api/v1/parcels/:id/deliver` — Mark Delivered

- **Controller:** `deliverParcel` (`parcel.controller.js:114-117`)
- **Service:** `parcelService.deliverParcel(id, user)` → `_transition(id, 4, 'DELIVERED', user)`
- **Roles:** `ADMIN`, `OPERATOR`

**Flow:**
1. Fetch parcel, validate transition `DISPATCHED → DELIVERED` via `VALID_TRANSITIONS` map
2. `updateParcelState(id, 4, trackingNo, 0, employeeCode)` — Trigger 4 = DELIVERED

**Terminal state** — no further transitions allowed.

---

### 2.9 `PATCH /api/v1/parcels/:id/cancel` — Cancel Parcel

- **Controller:** `cancelParcel` (`parcel.controller.js:125-128`)
- **Service:** `parcelService.cancelParcel(id, user)` → `_transition(id, 5, 'CANCELLED', user)`
- **Roles:** `ADMIN`, `OPERATOR`

**Flow:**
1. Fetch parcel, validate transition from `PENDING`/`LABEL_PRINTED`/`AWB_LINKED` → `CANCELLED` via `VALID_TRANSITIONS` map
2. `updateParcelState(id, 5, trackingNo, 0, employeeCode)` — Trigger 5 = CANCELLED

**Terminal state** — no further transitions allowed. Cannot cancel `DISPATCHED` or `DELIVERED` parcels.

---

### 2.10 `GET /api/v1/parcel-events` — Browse Events

- **Controller:** `browseEvents` (`parcel-events.controller.js:18-40`)
- **Service:** `parcelService.browseEvents(filters)`
- **Roles:** `ADMIN`, `OPERATOR`
- **Query params:** `page`, `limit`, `dateFrom`, `dateTo`, `actionType`, `scannedBy`

**Flow:**
1. `parcelRepository.browseEvents(filters)` → **Live:** `prc_receiver_status_details_get(0, 0)`
2. Client-side filtering on `actionType`
3. In-memory pagination
4. Map via `_mapEvent()`

**Response:** `{ success, data: Event[], meta: { page, limit, totalRows, totalPages } }`

---

### 2.11 `GET /api/v1/parcel-events/export` — Export CSV

- **Controller:** `exportCSV` (`parcel-events.controller.js:48-83`)
- **Service:** `parcelService.browseEvents(filters)` (same as browse, but unfiltered for export)
- **Roles:** `ADMIN`, `OPERATOR`
- **Query params:** `dateFrom`, `dateTo`, `actionType`, `scannedBy`

**Flow:**
1. Fetch all matching events via `browseEvents(filters)`
2. Build CSV with columns: `EventID, ParcelID, OrderCode, ActionType, AWBNumber, PreviousStatus, NewStatus, ScannedBy, Timestamp`
3. Set `Content-Disposition: attachment` header, respond with CSV text

---

## 3. State Machine

### 3.1 Status Constants (`parcel.service.js:13-20`)

```
PENDING → LABEL_PRINTED → AWB_LINKED → DISPATCHED → DELIVERED
                                                  ↘ CANCELLED (terminal)
```

### 3.2 Valid Transitions (`parcel.service.js:23-30`)

| Current State | Allowed Targets |
|---------------|-----------------|
| `PENDING` | `LABEL_PRINTED`, `CANCELLED` |
| `LABEL_PRINTED` | `AWB_LINKED`, `DISPATCHED`, `CANCELLED` |
| `AWB_LINKED` | `DISPATCHED`, `CANCELLED` |
| `DISPATCHED` | `DELIVERED` |
| `DELIVERED` | *(none — terminal)* |
| `CANCELLED` | *(none — terminal)* |

### 3.3 Trigger Types (`parcel.repository.js:185`)

| Trigger | Constant | Effect |
|---------|----------|--------|
| 1 | `PRINT_LABEL` | Increments `LabelPrintCount`, status → `LABEL_PRINTED` |
| 2 | `SCAN_LINK_AWB` | Sets `TrackingNo`, status → `AWB_LINKED` |
| 3 | `DISPATCH` | Stamps `DispatchDate`, status → `DISPATCHED` |
| 4 | `DELIVERED` | Status → `DELIVERED` (terminal) |
| 5 | `CANCELLED` | Status → `CANCELLED` (terminal) |

### 3.4 Role-Based Auto-Dispatch (`parcel.service.js:296-305`)

When `scanAndLinkAWB` is called by a `COURIER`, the flow skips `AWB_LINKED` and goes directly to `DISPATCHED` (Trigger 3 instead of Trigger 2). For `ADMIN`/`OPERATOR`, it stops at `AWB_LINKED`.

---

## 4. Database Procedures Referenced

### Parcel Module (direct calls from `parcel.repository.js`)

| Procedure | pAction / Params | Called From |
|-----------|-------------------|-------------|
| `prc_parcel_details_get` | pAction=0 (list all), pAction=1 (by ID), pAction=2 (label data join) | `findAll`, `findById`, `getLabelData` |
| `prc_parcel_details_set` | parcelId, triggerType, pFkReceiverDetailsId, awbNumber, courierId, adminId | `updateParcelState` |
| `prc_parcel_details_search_by_awb` | awbNumber | `findByAWB` |
| `prc_receiver_status_details_get` | pAction=1, parcelId for timeline; pAction=0, 0 for browse | `getTimeline`, `browseEvents` |
| `prc_receiver_status_details_set` | parcelId, receiverDetailsId, actionType, awbNumber, adminId | `logEvent` |

### Cross-module (via `parcel-code.service.js` → `sender.repository.js`)

| Procedure | Purpose |
|-----------|---------|
| `prc_receiver_details_get` | Resolves `FkOrderId` from `receiverDetailsId` for PCL code generation |

---

## 5. Validation Schemas (`parcel.validation.js`)

### `scanParcelSchema`
```js
{
  parcelId: z.string().min(1),    // PCL code string (e.g. "UC-1-3")
  awbNumber: z.string().min(1)    // AWB tracking number
}
```

### `dispatchParcelsSchema`
```js
{
  parcelDetailsIds: z.array(z.number().int().positive()).min(1)
}
```

---

## 6. Response Shapes

### ParcelSummary / ParcelDetail (`_mapParcel`)
```json
{
  "parcelDetailsId": 1,
  "parcelId": "UC-1-1",
  "trackingNo": null,
  "status": "PENDING",
  "labelPrintCount": 0,
  "dispatchDate": null,
  "receiverName": "Delhi Fabrics Ltd.",
  "receiverPhone": "9123456780",
  "address": "45, Karol Bagh",
  "city": "New Delhi",
  "state": "Delhi",
  "pincode": "110005",
  "orderCode": "ORD-20260330-001",
  "orderId": 1,
  "receiverDetailsId": 1,
  "createdAt": "2026-03-30T10:00:00.000Z"
}
```

### TimelineEvent / BrowseEvent (`_mapEvent`)
```json
{
  "receiverStatusDetailsId": 1,
  "parcelId": "UC-1-1",
  "orderCode": "ORD-20260330-001",
  "actionType": "STATUS_UPDATE",
  "awbNumber": null,
  "previousStatus": null,
  "newStatus": "PENDING",
  "scannedBy": "EMP001",
  "timestamp": "2026-03-30T10:00:00.000Z"
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

- **Live mode:** Calls MySQL stored procedures via `db.execute()`
- **Mock mode:** Mutates in-memory seed arrays from `parcel.seed.js` (which re-exports from `order.seed.js`)

Mock mode auto-logs to `seedStatusLog` on every state change (mirroring the SP's automatic `receiver_status_details` logging).

---

## 8. Naming Convention Notes

Same dual-case pattern as the Order module:
- **Live DB (PascalCase):** `PkParcelDetailsId`, `TrackingNo`, `ParcelStatusName`, `FkReceiverDetailsId`, etc.
- **Mock seeds (camelCase):** `id`, `trackingNo`, `parcelStatusCode`, `fkReceiverDetailsId`, etc.

The `_mapParcel` mapper handles both with fallback chains:
```js
parcel.PkParcelDetailsId || parcel.id || parcel.parcelDetailsId
parcel.ParcelStatusName || parcel.StatusDescription || parcel.status || parcel.parcelStatusCode
```

---

## 9. PCL Code System (`parcel-code.service.js`)

- **Format:** `UC-{orderId}-{parcelId}`
- **Generation:** `generateCode(orderId, parcelId)` — synchronous, requires known orderId
- **Async generation:** `generateCodeAsync({ orderId, parcelId, receiverDetailsId })` — resolves orderId from DB if not provided
- **Deconstruction:** `deconstructCode("UC-1-3")` → `{ orderId: 1, parcelId: 3 }`
- **Resolution chain:** `parcel.FkReceiverDetailsId` → `prc_receiver_details_get` → `receiver_details.FkOrderId`

---

## 10. Potential Change Impact Areas

When modifying schema or procedures, these areas are most likely to need updates:

1. **Column renames in `parcel_details`:** Update `_mapParcel()` in `parcel.service.js` and `_mapMockParcel()` in `parcel.repository.js`
2. **New/removed trigger types:** Update `VALID_TRANSITIONS` map and the `switch(triggerType)` block in `updateParcelState` mock
3. **New SP parameters for `prc_parcel_details_set`:** Update `updateParcelState()` signature and call site
4. **Changes to `prc_parcel_details_get` pAction values:** Update `findAll` (pAction=0), `findById` (pAction=1), `getLabelData` (pAction=2)
5. **Status flow changes:** Update `VALID_TRANSITIONS`, `STATUS` constants, and the `_checkPhysicalExecutionBegun` block list in `order.service.js`
6. **New fields in scan/dispatch payload:** Update Zod schemas in `parcel.validation.js`
7. **Changes to `receiver_status_details` columns:** Update `_mapEvent()` in `parcel.service.js` and CSV column mapping in `parcel-events.controller.js`
8. **PCL code format change:** Update `generateCode`, `generateCodeAsync`, and `deconstructCode` in `parcel-code.service.js`
