---
trigger: model_decision
description: Defines API-to-MySQL stored procedure contracts (v2). Outlines backend vs DB responsibilities (validation vs transactions) and prc_LogReceiverStatus logging. Load when writing Repositories, mapping payloads, or translating MySQL errors.
---

# SDCMS — API ↔ Stored Procedure Contract Specification v2

---

## 1. Purpose

This document defines the **authoritative contract** between REST APIs and MySQL stored procedures.

It explicitly governs:
- API → Procedure invocation mapping
- Request → Parameter transformation
- Procedure → Response mapping
- Transaction ownership
- Error handling standardization
- State transition enforcement

This document is the **single source of truth** for backend engineers following the `_set` and `_get` standard.

---

## 2. Global Execution Rules

### 2.1 Procedure Invocation Standard

All stored procedures MUST be invoked using:
```javascript
// Example for a _get operation with pAction
const [rows] = await db.execute('CALL prc_employee_master_get(?, ?, ...)', [0, params]); // 0 = GetAll

// Example for an Upsert (_set) operation
const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ...)', [params]);
```

### 2.2 Responsibility Matrix

| Concern | Owner |
|---|---|
| Input validation | Backend |
| Authentication | Backend |
| Transaction control | Stored Procedures (`_set` specifically) |
| Business logic | Stored Procedures |
| Status computation | Database (derived dynamically via `_get` and `_set` states)|

### 2.4 Transaction Policy & Naming Rules
- **Upsert (`_set`):** Handles all Inserts, Updates, Deletions. **NO** `pAction` parameter is used here. Controlled by passing ID=0 (Insert) or ID>0 (Update).
- **Read (`_get`):** Handles all queries. **MUST** use the `pAction` integer parameter. Standard: `0` = get all, `1` = get specific. Higher values are module-specific (see sections below).
- **Transactions:** `_set` procedures are fully atomic wrappers. Backend MUST NOT wrap them in additional transactions.

### 2.5 Logging Rule (Non-Negotiable)
Every state-changing operations within `prc_parcel_details_set`, `prc_order_master_set` or similar must invoke `prc_receiver_status_details_set`.

---

## 3. Shared Data Contracts

### 3.1 OrderPayload (Canonical Input Model)

> v2 CHANGE: `products` and `receivers` are now both optional at the root level to support Mode A/B/C.

```json
{
  "senderName": "string",
  "senderMobile": "string",
  "senderAddress": "string (optional)",
  "courierId": "number",
  "products": [{ "productId": "number", "qty": "number", "unitPrice": "number|null" }],
  "receivers": [
    {
      "receiverName": "string",
      "products": [{ "productId": "number", "qty": "number", "unitPrice": "number|null" }]
    }
  ]
}
```

**Order Modes (determined by payload shape):**
- **Mode A (Sender-to-Self):** `products[]` only, no `receivers[]`. Backend creates synthetic receiver from Party_master.
- **Mode B (Normal):** `receivers[]` only, no root `products[]`. Standard multi-receiver flow.
- **Mode C (Combo):** Both `products[]` and `receivers[]`. Synthetic sender-receiver + external receivers.

---

## 4. AUTH & EMPLOYEE APIs

### API: Login
**Endpoint:** `POST /api/v1/auth/login`  
**Procedure:** `prc_employee_master_get` (`pAction = 1`, passing email)

### API: Create Employee
**Endpoint:** `POST /api/v1/employees`  
**Procedure:** `prc_employee_master_set` (Passing `0` for EmployeeCode)

### API: Get Employees
**Endpoint:** `GET /api/v1/employees`  
**Procedure:** `prc_employee_master_get` (`pAction = 0`)

### API: Update / Toggle Employee
**Endpoint:** `PUT /api/v1/employees/:id` & `PATCH /api/v1/employees/:id/toggle-access`  
**Procedure:** `prc_employee_master_set` (Passing the specific `EmployeeCode`)

---

## 5. PRODUCT APIs

| API | Endpoint | Procedure |
|---|---|---|
| Create/Update Product | POST / PUT /products | `prc_product_master_set` (0 = Create) |
| Get Products | GET /products | `prc_product_master_get` (`pAction = 0`) |
| Get Product Info | GET /products/:id | `prc_product_master_get` (`pAction = 1`) |
| Product+Category Dropdown | GET /products/dropdown | `prc_product_master_get` (`pAction = 2`) |
| Soft Delete Product | DELETE /products/:id | `prc_product_master_set` (Passing `IsActive = 0`) |

> v2 ADDITION: `pAction = 2` returns products JOINed with `product_category.CategoryName` for dropdown search.

---

## 6. COURIER APIs

| API | Endpoint | Procedure |
|---|---|---|
| Create/Update Courier | POST / PUT /courier-partners | `prc_courier_partner_master_set` |
| Get Couriers | GET /courier-partners | `prc_courier_partner_master_get` (`pAction = 0`) |
| Delete Courier | DELETE /courier-partners/:id | `prc_courier_partner_master_set` |

---

## 7. PARTY APIs

### API: Find or Create Party (Upsert)
**Endpoint:** `POST /api/v1/senders`  
**Procedure:** `prc_Party_master_set`
- Evaluates if logical sender exists by phone; if yes updates/returns, else inserts.
- v2: Uses single `Address` field (not AddressLine1/2).

### Standard Operations
| API | Procedure | pAction |
|---|---|---|
| Get All Parties | `prc_Party_master_get` | `0` |
| Get Specific Party | `prc_Party_master_get` | `1` |
| Find by Phone | `prc_Party_master_get` | `2` |
| Get All Names (dropdown) | `prc_Party_master_get` | `3` |
| Get All Phones (dropdown) | `prc_Party_master_get` | `4` |
| Search by Name (partial) | `prc_Party_master_get` | `5` |
| Update/Delete Party | `prc_Party_master_set` | — |

> v2 ADDITIONS: pAction 3, 4, 5 support autocomplete dropdowns and partial name search.

### Party_Details (Address Book) APIs

| API | Endpoint | Procedure | pAction |
|---|---|---|---|
| Get All Addresses for Party | GET /senders/:id/addresses | `prc_Party_Details_get` | `0` |
| Get Address by ID | — (future) | `prc_Party_Details_get` | `1` |
| Create Address | POST /senders/:id/addresses | `prc_Party_Details_set` | — (ID=0) |

> v2 NEW: `Party_Details` stores per-party address book entries with `IsDefault` flag.

---

## 8. ORDER APIs (Transactional Core)

### API: Create/Update Order
**Endpoint:** `POST /api/v1/orders` / `PUT /api/v1/orders/:id`  
**Procedure:** `prc_order_master_set`
- **Body:** `pOrderPayload` mapping JSON directly into DB. Creates `order_master` -> `receiver_details` -> `parcel_details` inside transaction (ID=0 triggers Insert).

### API: Cancel Orderapi_pr
**Endpoint:** `PATCH /api/v1/orders/:id/cancel`  
**Procedure:** `prc_order_master_set` (Passing `pCancelRequested = 1`)

### API: Read Orders
**Endpoint:** `GET /api/v1/orders/:id`  
**Procedure:** `prc_order_master_get` (`pAction = 1` for Aggregate JSON response specific to ID)

**Endpoint:** `GET /api/v1/orders`  
**Procedure:** `prc_order_master_get` (`pAction = 0` for paginated summaries that calculate Order Status dynamically).

---

## 9. PARCEL APIs

### Read APIs
| Endpoint | Procedure |
|---|---|
| GET /parcels | `prc_parcel_details_get` (`pAction = 0`) |
| GET /parcels/:id | `prc_parcel_details_get` (`pAction = 1`) |
| GET /parcels/:id/label-data| `prc_parcel_details_get` (`pAction = 2`) |
| GET /parcels/:id/timeline | `prc_receiver_status_details_get` (`pAction = 1`) |
| GET /parcel-events | `prc_receiver_status_details_get` (`pAction = 0`) |

### Execution Logic APIs (Updates physical status & tracking)
| API Capability | Endpoint Mapping | Procedure execution |
|---|---|---|
| Print Label | POST /parcels/:id/log-print | `prc_parcel_details_set` |
| Scan & Link AWB | POST /parcels/scan | `prc_parcel_details_set` |
| Dispatch Parcels | POST /parcels/dispatch | `prc_parcel_details_set` |
| Update End Status | PATCH /parcels/:id/{status}| `prc_parcel_details_set` |

*(Note: All executions through `prc_parcel_details_set` inevitably trigger `prc_receiver_status_details_set` to strictly build out the audit timeline).*

---

## 10. NOTIFICATION / BULK APIs

| Protocol Area | Procedure |
|---|---|
| Notification Sender & Hook | `prc_Notification_log_set` |
| Retrieve Notifications | `prc_Notification_log_get` (`pAction = 1`) |
| Bulk Excel Log Initiation | `prc_bulk_order_upload_log_set` |
| Bulk Excel Row Status | `prc_bulk_order_upload_detail_set` |

---

## 11. ANALYTICS

### API: Dashboard Metrics
**Endpoint:** `GET /api/v1/dashboard/metrics`  
**Procedure:** `prc_dashboard_metrics_get` (`pAction = 0`)

---

## 12. ERROR CONTRACT

| MySQL Code / Cause | Meaning | API Response |
|---|---|---|
| `prc_check_duplicate_XXX` Trigger | Duplicate entity found | 409 Conflict |
| 1062 ER_DUP_ENTRY | Hard constraint duplicate | 409 Conflict |
| SIGNAL / Rollback | Business rule violation | 400 Bad Request |
| No rows | Not found | 404 |

---

## 13. ANTI-PATTERNS (STRICTLY FORBIDDEN)
- ❌ Passing `pAction` to `_set` procedures instead of checking primary keys against `0` (Insert) or `>0` (update).
- ❌ Using old semantic procedure names (e.g. `prc_CreateProduct`).
- ❌ Wrapping `_set` API handlers in NodeJS transactions. Database holds the ultimate boundaries.
- ❌ Computing order status in JS.
