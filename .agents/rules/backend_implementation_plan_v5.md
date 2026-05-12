---
trigger: model_decision
description: Trigger when the user commands "Implement Sprint [X] Feature [Y]". Provides the exact backend API roadmap, enforcing zero direct DB access (use SPs), plain-text Bruno testing, and heavy commentary for the Antigravity project.
---

# Backend API Implementation Plan — v5

## Goal Description

Cross-review of **`api_contract_v2.2_p1.md`**, **`api_contract_v2.2_p2.md`**, **`system_flow_v2.3.md`**, **`api_procedure_spec_v2.1.md`**, and **`db_schema_v3.md`**. Supersedes v4.

**What changed since v4?**
8. **Color Matrix Tables:** `lu_color_code` and `product_color_matrix` added (db_schema_v3). Per-color/size pricing.
9. **New Procedures:** `prc_product_color_matrix_get` / `prc_product_color_matrix_set` (api_procedure_spec_v2.1).
10. **New Endpoint:** `POST /products/:id/matrix` for managing product color/size variations.
11. **Pricing Hierarchy:** Order pricing fallback chain updated: explicit `unitPrice` → `product_color_matrix.MaterialRate` → `product_master.MaterialRate`.

**What changed since v2?**
1. **`_set` / `_get` Procedure Standard:** All old semantic names (`prc_CreateProduct`, `prc_ScanAndLinkAWB`, etc.) are replaced by standardized `prc_[tablename]_set` and `prc_[tablename]_get` procedures per `api_procedure_spec_v1.md`.
2. **Upsert via `_set`:** `_set` procedures handle Insert (ID=0), Update (ID>0), and soft-delete (IsActive=0). **No `pAction` parameter** on `_set` calls.
3. **Read via `_get`:** `_get` procedures **MUST** use `pAction` integer (`0`=get all, `1`=get specific, `2`+=custom queries like label-data).
4. **Duplicate Checking:** Uses `prc_check_duplicate_XXX` triggers instead of relying solely on MySQL 1062 errors.
5. **Audit Logging:** All `prc_parcel_details_set` calls internally trigger `prc_receiver_status_details_set`.
6. **Seeder Migration:** ✅ Done — `lu_order_status`/`lu_parcel_status` replaced with unified `lu_master` → `lu_details` hierarchy.
7. **Order Module Refactored:** ✅ Done — field names aligned to `db_schema_v1`, response envelope added, `express-async-handler` wired, update/cancel routes added.

## Core Project Rules
> [!IMPORTANT]
> 1. **Zero Direct DB Ops:** Every Repository MUST invoke `CALL prc_[tablename]_set/get(...)`. In-memory mocks with commented-out `CALL` placeholders are acceptable during dev.
> 2. **`_set`/`_get` Convention:** Upserts go through `_set` (ID=0 insert, ID>0 update). Reads go through `_get` with `pAction`. **Never** use old semantic names like `prc_CreateProduct`.
> 3. **Plain-Text Test Data:** Ship `[FeatureName]_Test_Data.txt` files per `AGENTS.md` §6. No native `.bru` files.
> 4. **Zod Validation:** All payloads validated via Zod before reaching the Service layer.
> 5. **Async Error Handling:** Controllers use `express-async-handler`. Services use `try/catch`.
> 6. **Response Envelope:** `{ success, data?, error? }`. Paginated lists add `meta: { page, limit, totalRows, totalPages }`.

## Execution Strategy
Each Sprint is divided into standalone "Features." Command a single Feature (e.g., *"Implement Sprint 2 - Feature C"*) to work on just that piece.

---

### Sprint 1: Project Setup & Auth ✅ COMPLETED

- [x] **Feature A:** Route standards (`/api/v1/...`), seeders (`lu_user_role`, unified `lu_master`→`lu_details`).
- [x] **Feature B:** Auth alignment (`auth.routes.js`, `POST /auth/login` → `prc_employee_master_get` pAction=1).
- [x] **Feature C:** Employee CRUD (5 endpoints on `/employees`). Maps to `prc_employee_master_set` / `prc_employee_master_get`.

---

### Sprint 2: Master Data & Order Creation

- [x] **Feature A: Courier Partners** — 5 endpoints on `/courier-partners`. `ADMIN` only.
  - Repository: `prc_courier_partner_master_set` (upsert/delete) / `prc_courier_partner_master_get` (pAction 0,1).
  - ⚠️ Current mock uses old `prc_Create...` names — retrofit in Sprint 7.

- [x] **Feature B: Products** — 5+1 endpoints on `/products`. `ADMIN`, `OPERATOR`.
  - Repository: `prc_product_master_set` (upsert/delete) / `prc_product_master_get` (pAction 0,1) / `prc_product_master_search`.
  - ⚠️ Current mock uses old `prc_Create...` names — retrofit in Sprint 7.
  - ✅ v5: Extended with color matrix endpoint (`POST /products/:id/matrix`). See Sprint 2.5.

- [ ] **Feature C: Senders (Party_master)**
  - New module: `src/modules/sender/` + routes + controller. Register as `/api/v1/senders`.
  - Endpoints (API Contract §6):
    - `POST /senders` → `prc_Party_master_set` (ID=0, find-or-create by phone).
    - `GET /senders` → `prc_Party_master_get` (pAction=0, paginated).
    - `GET /senders/:id` → `prc_Party_master_get` (pAction=1).
    - `PUT /senders/:id` → `prc_Party_master_set` (ID>0).
    - `DELETE /senders/:id` → `prc_Party_master_set` (IsActive=0).
    - `GET /senders/lookup?phone=...` → `prc_Party_master_get` (pAction=1, returns `200` with `null` if not found).
  - Structured address: `addressLine1/2`, `city`, `state`, `pincode`. Zod schema required.
  - Ship `Sender_Test_Data.txt`.

- [ ] **Feature D: Order Pipeline**
  - ⚠️ Base refactor done (field names, routes, envelope). SP names still need `_set`/`_get` update.
  - **Create** (`POST /orders`) → `prc_order_master_set` (ID=0). Atomic: `order_master` → `receiver_details` → `order_items` → `parcel_details`. 1 receiver = 1 parcel.
  - **List** (`GET /orders`) → `prc_order_master_get` (pAction=0). Derived order status from parcel states.
  - **Get Aggregate** (`GET /orders/:id`) → `prc_order_master_get` (pAction=1). Nested JSON: `Order → Receivers → [Items, Parcel]`.
  - **Update** (`PUT /orders/:id`) → `prc_order_master_set` (ID>0). ❗ Fails if any parcel ≥ AWB_LINKED.
  - **Cancel** (`PATCH /orders/:id/cancel`) → `prc_order_master_set` (pCancelRequested=1). ❌ Blocked if dispatched/delivered. Cascades + logs to `receiver_status_details`.
  - Ship `Order_Test_Data.txt`.

---

### Sprint 2.5: Product Color Matrix & Order Pricing (v5)

- [ ] **Feature A: Product Color Matrix CRUD**
  - Extend `src/modules/product/` with two new repository methods:
    - `getColorMatrix(productId)` → `CALL prc_product_color_matrix_get(0, ?)`
    - `setColorMatrix(matrixId, productId, data, adminId)` → `CALL prc_product_color_matrix_set(?, ?, ?, ?, ?, ?, 1)`
  - New route: `POST /products/:id/matrix` → `validate(productMatrixSchema)` → controller → service.
  - Service: `addOrUpdateColorMatrix()` method, `_mapMatrixToApi()` / `_mapMatrixToInternal()` helpers.
  - Enrich `GET /products/:id` to return `variations[]` array from color matrix.
  - Zod schema: `productMatrixSchema` (`fkLuColorId`, `materialRate`, `size`).
  - Mock seed: `seedColorMatrix` array in repository.
  - Ship updated `Product_Test_Data.txt`.

- [ ] **Feature B: Order Pricing Fallback Chain**
  - Update `productItemSchema` in `validation.schemas.js` to accept optional `colorId` and `size`.
  - Update `order.service.js` pricing resolution: explicit `unitPrice` → `product_color_matrix.MaterialRate` (if colorId+size) → `product_master.MaterialRate`.
  - No SP signature change needed in order repo — resolution happens in service layer.
  - Ship updated `Order_Test_Data.txt`.

- [ ] **Feature C: Update E2E Tests**
  - Add `4.11`–`4.13` tests for matrix CRUD in `tests/e2e/mock_api.test.js`.
  - Add `POST /products/:id/matrix` to `scripts/api-manifest.yaml`.

---

### Sprint 3: QR, Label Printing & Parcel Retrieval

- [ ] **Feature A: Parcel Retrieval & Label Data**
  - New module: `src/modules/parcel/` + routes + controller. Register as `/api/v1/parcels`.
  - `GET /parcels` → `prc_parcel_details_get` (pAction=0, paginated, filterable).
  - `GET /parcels/:id` → `prc_parcel_details_get` (pAction=1).
  - `GET /parcels/:id/label-data` → `prc_parcel_details_get` (pAction=2). Stitches sender snapshot + receiver address + parcel_id into flat JSON.
  - `GET /parcels/:id/timeline` → `prc_receiver_status_details_get` (pAction=1). Amazon-style event timeline.
  - Ship `Parcel_Test_Data.txt`.

- [ ] **Feature B: Label Print Logging**
  - `POST /parcels/:id/log-print` → `prc_parcel_details_set`. Increments `LabelPrintCount`, transitions to `LABEL_PRINTED`, triggers `prc_receiver_status_details_set` internally.
  - Ship `LabelPrint_Test_Data.txt`.

---

### Sprint 4: Scanner Operations & AWB Linking

- [ ] **Feature A: Two-Scan Operation (Parcel ID + AWB)**
  - `POST /parcels/scan` → `prc_parcel_details_set`. Validates parcel_id, ensures unique AWB (409 on duplicate).
  - Role-based: **COURIER** → auto-dispatch. **OPERATOR** → AWB_LINKED only.
  - Internally triggers `prc_receiver_status_details_set` (ActionType='AWB_LINK').
  - Ship `Scan_Test_Data.txt`.

- [ ] **Feature B: Dispatch & Terminal States**
  - `POST /parcels/dispatch` → `prc_parcel_details_set` (bulk parcelIds array, stamps DispatchDate).
  - `PATCH /parcels/:id/deliver` → `prc_parcel_details_set`. Terminal state.
  - `PATCH /parcels/:id/cancel` → `prc_parcel_details_set`. ❌ Only before dispatch.
  - `PATCH /parcels/:id/return` → `prc_parcel_details_set`. ❌ Only after dispatch.
  - All calls trigger `prc_receiver_status_details_set`. No backward/skipped transitions.
  - Ship `Dispatch_Test_Data.txt`.

- [ ] **Feature C: Parcel Events & Audit Export**
  - `GET /parcel-events` → `prc_receiver_status_details_get` (pAction=0).
  - `GET /parcel-events/export` → CSV download for end-of-day auditing.
  - Ship `ParcelEvents_Test_Data.txt`.

---

### Sprint 5: Bulk Upload

- [ ] **Feature A: Bulk Upload Flow**
  - New module: `src/modules/bulk-upload/`.
  - `POST /bulk-uploads` → `prc_bulk_order_upload_log_set` (session header), iterates rows calling `prc_order_master_set` per row, logs via `prc_bulk_order_upload_detail_set`, finalizes session.
  - `GET /bulk-uploads` / `GET /bulk-uploads/:id` → read session + row-by-row results.
  - Zod validation on incoming JSON array.
  - Ship `BulkUpload_Test_Data.txt`.

---

### Sprint 6: Notifications

- [ ] **Feature A: Notification System**
  - New module: `src/modules/notification/`.
  - `POST /parcels/:id/notify` → `prc_Notification_log_set`. Uses `TrackingUrlTemplate` from courier, replaces `{AWB}`.
  - `POST /notifications/:id/resend` → `prc_Notification_log_set` (re-trigger failed).
  - `GET /parcels/:id/notifications` → `prc_Notification_log_get` (pAction=1).
  - `POST /notifications/webhook` → `prc_Notification_log_set` (status callback: Sent/Failed).
  - Ship `Notification_Test_Data.txt`.

---

### Sprint 7: Dashboard, Auth Profile & SP Retrofit

- [ ] **Feature A: Auth Profile**
  - `GET /auth/profile` → `prc_employee_master_get` (pAction=1, from JWT). All roles.
  - Ship `AuthProfile_Test_Data.txt`.

- [ ] **Feature B: Dashboard**
  - `GET /dashboard/metrics` → `prc_dashboard_metrics_get` (pAction=0). Aggregates from `parcel_details` states dynamically. `ADMIN` only.
  - Ship `Dashboard_Test_Data.txt`.

- [ ] **Feature C: SP Name Retrofit (Mock → `_set`/`_get`)**
  - Update **all** existing repository placeholder comments across `auth`, `employee`, `courier`, `product`, `order` modules from old semantic names to `_set`/`_get` convention.
  - Verify no anti-patterns: no `pAction` on `_set` calls, no old `prc_Create...` names.

---

### Sprint 8: Production Hardening

- [ ] **Feature A: Repository Migration (Mock → Live DB)**
  - For each module: remove in-memory seed arrays, activate `CALL prc_..._set/get(...)` invocations.
  - Wire MySQL error translation: `prc_check_duplicate_XXX` → 409, SIGNAL → 400, no rows → 404, 1062 → 409.

- [x] **Feature B: Seeder Reconciliation** ✅ COMPLETED
  - Migrated to unified `lu_master` → `lu_details` hierarchy. Removed `lu_order_status`/`lu_parcel_status`.

- [ ] **Feature C: Integration Testing**
  - E2E: Create sender → Create order → Print label → Scan QR+AWB → Dispatch → Deliver.
  - Verify `receiver_status_details` audit trail. Verify derived order status computation.