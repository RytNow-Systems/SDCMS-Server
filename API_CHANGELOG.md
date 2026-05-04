# SDCMS API Changelog & Bruno Update Guide

This document tracks all API changes and provides a checklist for keeping Bruno Desktop collections and frontend integrations up to date.

---

## 🚀 Version 2.4: Order Cancellation Safety & Consistency
**Date:** May 4, 2026
**Status:** Implementation Complete

### 📦 Module-Specific Changes

#### 1. Order Pipeline ❌ Cancellation Refactoring
- **Cascading Soft-Deletes**: The `PATCH /orders/:id/cancel` endpoint now atomically soft-deletes all associated `receiver_details` and `order_items` (`IsActive=0`) and marks all associated parcels as `CANCELLED`.
- **Physical Execution Threshold**: Cancellation is now strictly blocked if any parcel in the order has reached the `AWB_LINKED`, `DISPATCHED`, or `DELIVERED` state.
- **Error Handling**: Returns `400 Bad Request` with a clear explanation if the threshold is breached.
- **Audit Logging**: Every cancelled parcel automatically appends a "CANCELLED" event to the `receiver_status_details` timeline.

---

## 🚀 Version 2.3: Name-to-ID Abstraction & Pricing Hierarchy
**Date:** Apr 28, 2026
**Status:** Implementation Complete

### 📦 Module-Specific Changes

#### 1. Product Catalog ❌ Abstraction Update
- **Create/Update Abstraction**: The `POST /products` and `PUT /products/:id` endpoints now support resolving human-readable names to IDs.
- **Fields Added**: `categoryName` (resolves to `categoryId`) and `unitCode` (resolves to `unitId`).
- **Precedence**: If both an ID and a Name/Code are provided, the ID takes precedence.

#### 2. Order Pipeline ❌ Pricing Hierarchy (v2.3)
- **Automated Pricing**: The `POST /orders` endpoint no longer strictly requires `unitPrice` for each product.
- **Resolution Chain**:
    1. **Explicit**: If `unitPrice` is provided in the payload, it is used.
    2. **Color Matrix**: Match by `colorId` + `size` in the product variations.
    3. **Catalog Fallback**: Fallback to the `MaterialRate` in the base product master.
    4. **Zero**: If no price is found, defaults to `0`.

---

## 🚀 Version 2.0: Stored Procedure & Lifecycle Integration
**Date:** Apr 24, 2026
**Status:** Integrated & Verified via E2E Tests

### 🛠 Global Architectural Changes
- **Zero Direct SQL**: All repository logic now uses `CALL prc_...` stored procedures.
- **Strict Parcel Lifecycle**: Enforced state transitions (PENDING → LABEL_PRINTED → AWB_LINKED → DISPATCHED → DELIVERED).
- **Atomic Creation**: Orders, Receivers, and Parcels are now created in a single transactional flow.

### 📦 Module-Specific Changes

#### 1. Authentication ❌ Structural Update
- **Login Response**: Now returns a full user object instead of just `token`.
- **Fields**: `id`, `employeeCode`, `name`, `email`, `role`, `token`.
- **Profile**: Updated to return `firstName`, `phoneNo`, `allowLogin`, and `createdAt`.

#### 2. Order Pipeline ❌ Major logic update
- **Mode A/B/C**: Documentation updated in manifest to explain Sender-to-Self vs External Receiver flows.
- **Aggregate Response**: `GET /orders/:id` now returns a deep aggregate including receivers, their items, and their parcel status in a single call.

#### 3. Parcel Execution (Label/Scan/Dispatch) ❌ ENTIRELY NEW WORKFLOWS
- **Log Label Print**: `POST /parcels/:id/log-print` — Must be called before AWB linking.
- **Two-Scan Flow**: `POST /parcels/scan` — Atomic QR Code + AWB Number linking.
- **Courier Shortcut**: If the authenticated user is a `COURIER`, scanning a parcel automatically moves it to `DISPATCHED` status.
- **Batch Dispatch**: `POST /parcels/dispatch` — Accepts an array of `parcelIds`.

#### 4. Dashboard Metrics ❌ SP Integration
- **Endpoint**: `GET /dashboard/metrics`
- **Response**: Transitioned to PascalCase fields (`TotalOrders`, `PendingOrders`, etc.) with camelCase fallbacks for backward compatibility.

#### 5. Product Catalog ❌ SP Integration
- **Endpoint**: Now uses `prc_product_master_set` for Create/Update.
- **Validation**: Added 409 Conflict check for duplicate material names within a category.

---

## 🚀 Version 1.1: camelCase & Address Consolidation
**Date:** Apr 20, 2026
**Status:** Completed

### Global Changes
- **camelCase Standardization**: All API response bodies now use camelCase instead of PascalCase.
- **Example**: `PkPartyId` → `pkPartyId`, `CustomerName` → `customerName`

### Per-Collection Changes

#### 1. Senders ❌ Major Changes
- **Field Rename**: `addressLine1`/`addressLine2` → single `address` field.
- **New Endpoints**: Added Name/Phone lookups and Address Book management.

#### 2. Order Pipeline ❌ Major Changes
- **Field Rename**: Receiver `addressLine1` → `address` in create order payload.
- **Mode A/B/C**: Initial support for different creation modes.

#### 3. Receivers ❌ NEW COLLECTION
- **New Collection**: Created a dedicated "Receivers" collection for lookups.

---

## ✅ Bruno Update Checklist (For Software Testers)

### Phase 2 Updates (Current)
- [ ] **Auth**: Update "Login" expected response to include the full user object.
- [ ] **Order**: Update "Get Order Details" response example to include the nested `parcel` object inside each receiver.
- [ ] **Parcel**: Add "Scan and Link AWB" request with `qrCode` and `awbNumber` payload.
- [ ] **Parcel**: Add "Batch Dispatch" request with `parcelIds` array.
- [ ] **Dashboard**: Update assertions to check for PascalCase fields (`TotalOrders`).

### Phase 1 Updates (Previously Done)
- [ ] Update all payloads to replace `addressLine1` with `address`.
- [ ] Update all response assertions to use camelCase field names.
- [ ] Import the new "Receivers" collection.

---

## 📥 Re-Export Workflow
1. Open Bruno Desktop.
2. Apply changes to the affected collections listed above.
3. Use the updated `test_data/` files to verify payloads.
4. **Export Collection (as .zip)** for each changed collection → save to `bruno/`.
5. **Export as HTML** for each → save to `bruno-html-docs/`.
