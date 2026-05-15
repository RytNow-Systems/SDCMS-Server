# Multi-Box Parcels — Design & Implementation Guide (Path A)
**Version:** 1.0  
**Audience:** Client · Product Team · Frontend Developers · Backend Developers · DB Engineers  
**Last Updated:** May 2026  
**Status:** Approved for Implementation

> **Reading this for the first time?** Start with Section 1 (The Problem) and Section 2 (The Solution). Sections 7–10 are technical deep-dives for the engineering team.

---

## Table of Contents
1. [The Problem](#1-the-problem)
2. [The Solution — Path A](#2-the-solution--path-a)
3. [What Changes and What Stays the Same](#3-what-changes-and-what-stays-the-same)
4. [User Flows — Role by Role](#4-user-flows--role-by-role)
5. [Screen-by-Screen UI Changes](#5-screen-by-screen-ui-changes)
6. [Shipping Label Changes](#6-shipping-label-changes)
7. [API Changes (For Backend Developers)](#7-api-changes-for-backend-developers)
8. [Frontend Component Changes (For Frontend Developers)](#8-frontend-component-changes-for-frontend-developers)
9. [Database & Stored Procedures (For DB Engineers)](#9-database--stored-procedures-for-db-engineers)
10. [Rules & Constraints](#10-rules--constraints)
11. [Known Limitations & Out of Scope](#11-known-limitations--out-of-scope)
12. [Implementation Checklists](#12-implementation-checklists)

---

## 1. The Problem

### How the system works today

When an order is created, each receiver gets **one parcel** — one physical box. The system prints one label per receiver, the courier scans that label's QR code, links one AWB (courier tracking number), and dispatches it.

This works perfectly when each receiver's entire shipment fits in a single box.

### The real-world gap

In practice, a receiver's order can contain 15–20 items across multiple product types. These cannot always fit in one box. The warehouse team needs to pack them into 2, 3, or more physical boxes — and each box needs its own label and its own AWB from the courier.

**The system today has no way to handle this.** There is only one `TrackingNo` field per parcel, so linking a second AWB would overwrite the first. Multiple labels for the same receiver are not supported. The courier's scanning flow breaks.

---

## 2. The Solution — Path A

### The core idea

> **One physical box = one parcel row in the system.**

If a receiver needs 3 boxes, the system creates 3 separate parcels for that receiver. Each box gets its own label, its own QR code, its own ParcelCode (`UC-5-11`, `UC-5-12`, `UC-5-13`), and its own AWB.

Every existing flow — label printing, QR scanning, AWB linking, dispatch — works **exactly as it does today**, applied once per box independently.

### Why this approach was chosen over the alternative

The alternative (Path B) would keep one parcel per receiver but track multiple boxes inside it using a sub-table (`parcel__items_track_details`). This was evaluated and rejected because:

- Courier scanning flow becomes non-standard: "scan one QR, then scan N AWBs" is confusing in the field.
- Parcel status becomes ambiguous — "2 of 3 boxes linked" is a new intermediate state that would require changes across every screen showing status.
- Labels lose a clear identity anchor — without a separate parcel per box, there is no clean QR identity for each physical box.
- Every layer of the system (DB, API, service, UI) needs modification. Path A requires far fewer changes.

Path A keeps "parcel = physical shipment unit" as a consistent rule throughout the system. The only conceptual change is: **a receiver can now have multiple parcels**.

---

## 3. What Changes and What Stays the Same

### What stays exactly the same

| Area | Status |
|---|---|
| Order creation flow (`OrderFormPage`) | No change |
| Parcel creation stored procedure (`prc_parcel_details_set` trigger 0) | No change — just called more times |
| QR scanning flow on the courier scanner app | No change |
| AWB linking flow (`scanAndLinkAWB`) | No change |
| Dispatch logic | No change |
| Delivery and cancellation flows | No change |
| `parcel_details` table schema | No change |
| All existing stored procedures | No change |
| `receiver_status_details` audit log | No change |

### What changes

| Area | Change |
|---|---|
| `OrderDetailsPage` | Restructured: flat parcel list → receiver-grouped list with box sub-rows |
| `ShippingLabel` component | Adds "Box N of M" field |
| Backend: order response | `receiver.parcel` (single) → `receiver.parcels[]` (array) |
| Backend: parcel response | Adds `boxNumber` and `totalBoxes` computed fields |
| New API endpoint | `POST /api/v1/receivers/:receiverDetailsId/parcels` — creates an extra box |
| `notification_log`: add `WhatUpStatusId` column | DB migration (separate from this feature, tracked separately) |

---

## 4. User Flows — Role by Role

### Operator / Warehouse Staff

**Step 1 — Order created (no change)**
Operator creates the order (manually or via bulk upload). The system automatically creates one parcel per receiver as it does today.

**Step 2 — Preparing the shipment**
Operator opens the order on `OrderDetailsPage`. Each receiver shows their parcel (Box 1). If a receiver's goods need more than one box during packing, the operator clicks **"+ Add Box"** on that receiver's row. The system creates a new parcel (Box 2) for that receiver instantly. This can be repeated for Box 3, Box 4, etc.

> **When to add boxes:** During the packing stage — after the order is confirmed but before labels are printed. Extra boxes can still be added after some labels are printed, as long as no box for that receiver has been dispatched yet.

**Step 3 — Print labels**
Operator selects boxes (individual boxes, or all boxes for a receiver at once) and clicks **Print Label**. One label prints per selected box. Each label shows "Box 2 of 3" so the packer knows which box it belongs to.

**Step 4 — Hand off to courier**
Boxes are handed to the courier with their labels attached.

---

### Courier

No change to the scanning flow.

For each physical box:
1. Scan the QR code on the label.
2. The app identifies the parcel: "Ram Kumar — Box 2 of 3, UC-5-12."
3. Scan the AWB barcode from the courier's own label.
4. The AWB is linked. Done.

Repeat for every box. Each box is fully independent — the courier does not need to scan all boxes in one session.

If `AUTO_DISPATCH_ON_SCAN` is enabled, each box auto-dispatches immediately after AWB linking, as today.

---

### Manager / Admin

The `OrderListPage` derived status works the same. An order's status rolls up from all its parcels:

| Parcel states | Order derived status |
|---|---|
| All Pending | Pending |
| Any mix of statuses | In Progress |
| All Dispatched | Dispatched |
| All Delivered | Delivered |

On `OrderDetailsPage`, the manager now sees a receiver-grouped view. If Ram Kumar has 3 boxes in different states, the receiver row shows: **"2 of 3 Dispatched"**.

---

### Receiver (End Customer)

Receives one dispatch notification per box (via SMS / WhatsApp — same trigger as today, fires once per parcel when dispatched).

Each notification contains that box's specific AWB tracking number. If a receiver has 3 boxes, they receive 3 notifications — one per box as each one is dispatched.

---

## 5. Screen-by-Screen UI Changes

### `OrderDetailsPage` — Before and After

**Before (current):**
```
Parcels  [2 Selected]

┌─────────────────────────────────────────────────────────┐
│ ☐  Parcel 1                                          ⌄  │
│    Ram Kumar  |  9876543210  |  Mumbai  |  [Pending]    │
│    ─ products table inside ─                            │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ ☐  Parcel 2                                          ⌄  │
│    Priya Sharma  |  8765432109  |  Delhi  |  [Pending]  │
└─────────────────────────────────────────────────────────┘
```

**After (Path A):**
```
Parcels  [3 Selected]

┌─────────────────────────────────────────────────────────┐
│ ☐  Ram Kumar           9876543210                    ⌄  │
│    Bandra, Mumbai, MH – 400050                          │
│    3 boxes  ·  Blue Jeans ×5, White Shirt ×3            │
│    ──────────────────────────────────────────────────   │
│    ☐  Box 1  UC-5-11   [Label Printed]                  │
│    ☐  Box 2  UC-5-12   [AWB Linked]                     │
│    ☐  Box 3  UC-5-13   [Pending]        [+ Add Box]     │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ ☐  Priya Sharma        8765432109                    ⌄  │
│    Connaught Place, Delhi – 110001                      │
│    1 box  ·  Kurta ×2                                   │
│    ──────────────────────────────────────────────────   │
│    ☐  Box 1  UC-5-14   [Pending]        [+ Add Box]     │
└─────────────────────────────────────────────────────────┘
```

### Checkbox behaviour

| Checkbox | What it selects |
|---|---|
| Outer checkbox (receiver row header) | All boxes for that receiver |
| Inner checkbox (individual box row) | That specific box only |
| "X Selected" count at top | Total number of boxes selected |

All bulk actions (Print Label, Dispatch, Send Notification) operate on the **selected boxes**, not receivers.

### `[+ Add Box]` button

- Appears on the last box row of each receiver.
- Disabled (greyed out) once any box for that receiver is `Dispatched` or `Delivered`.
- Clicking opens a small confirmation dialog:

```
┌──────────────────────────────────────────────────┐
│  Add Box 4 for Ram Kumar?                        │
│                                                  │
│  A new parcel will be created. Print a label     │
│  for the new physical box.                       │
│                                                  │
│                    [Cancel]    [Add Box]          │
└──────────────────────────────────────────────────┘
```

On confirm, the new box row appears immediately in the list.

### Aggregate status badge on receiver header

| Condition | Badge shown |
|---|---|
| All boxes same status | `[Pending]` / `[Label Printed]` / `[Dispatched]` etc. |
| Mixed statuses | `[2 of 3 Dispatched]` |
| All delivered | `[Delivered]` |

### Courier scanner — minor addition only

After scanning a QR, the parcel identity screen adds one line:

```
┌──────────────────────────────────────┐
│  ✅ Parcel Identified                │
│                                      │
│  Ram Kumar                           │
│  Bandra, Mumbai                      │
│  Box 2 of 3          ←  new          │
│  UC-5-12                             │
│                                      │
│  Scan AWB barcode →                  │
└──────────────────────────────────────┘
```

This is read-only context — no flow change.

---

## 6. Shipping Label Changes

One new field added: **Box N of M**.

```
┌───────────────────────────────────────┐
│  Utsav Creation                       │
│                                       │
│  Shipping To:                         │
│  RAM KUMAR                            │
│  Bandra, Mumbai, MH – 400050          │
│  📞 9876543210                        │
│                                       │
│  From: [Sender Name]                  │
│  [Sender Address]                     │
│  📞 [Sender Phone]                    │
│                        ┌───────────┐  │
│  Order:  UC-5          │           │  │
│  Box:    2 of 3   ←new │  QR CODE  │  │
│                        └───────────┘  │
│         ┌────────────────────────┐    │
│         │       UC-5-12          │    │
│         └────────────────────────┘    │
└───────────────────────────────────────┘
```

`boxNumber` and `totalBoxes` are computed by the backend (see Section 7) and returned in the label data response. No change to QR code value — it remains the `ParcelCode` (`UC-5-12`).

---

## 7. API Changes (For Backend Developers)

### New endpoint: Create extra parcel for receiver

```
POST /api/v1/receivers/:receiverDetailsId/parcels
```

**Auth:** ADMIN, OPERATOR roles.

**Path parameter:** `receiverDetailsId` — the receiver to add a box for.

**Request body:**
```json
{
  "createdBy": 5
}
```

**What it does internally:**
Calls `prc_parcel_details_set` trigger 0 with the given `FkReceiverDetailsId`. The SP already supports multiple parcels per receiver — this endpoint just exposes that capability.

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "parcelId": 13,
    "parcelCode": "UC-5-13",
    "status": "Pending",
    "boxNumber": 3,
    "totalBoxes": 3,
    "receiverDetailsId": 7
  }
}
```

**Validation (Zod):**
- `receiverDetailsId` must be a positive integer.
- Receiver must exist.
- Receiver must not have all boxes already `Dispatched` or `Delivered` (guard against adding boxes post-dispatch).

---

### Modified: Order details response

`GET /api/v1/orders/:id` — the receiver object changes:

**Before:**
```json
{
  "receiverId": 7,
  "receiverName": "Ram Kumar",
  "parcel": {
    "parcelId": 11,
    "parcelCode": "UC-5-11",
    "status": "Pending"
  }
}
```

**After:**
```json
{
  "receiverId": 7,
  "receiverName": "Ram Kumar",
  "parcels": [
    { "parcelId": 11, "parcelCode": "UC-5-11", "status": "Label Printed", "boxNumber": 1, "totalBoxes": 3 },
    { "parcelId": 12, "parcelCode": "UC-5-12", "status": "AWB Linked",    "boxNumber": 2, "totalBoxes": 3 },
    { "parcelId": 13, "parcelCode": "UC-5-13", "status": "Pending",       "boxNumber": 3, "totalBoxes": 3 }
  ]
}
```

**How `boxNumber` and `totalBoxes` are computed (service layer):**
```js
// Sort parcels for a receiver by PkParcelDetailsId ASC.
// Position in sorted list = boxNumber (1-indexed).
// Count of rows = totalBoxes.
// No new SP needed — computed in parcelService / orderService.
```

---

### Modified: Label data response

`GET /api/v1/parcels/:id/label-data` adds two fields:

```json
{
  "parcelCode": "UC-5-12",
  "trackingNo": null,
  "orderCode": "UC-5",
  "boxNumber": 2,
  "totalBoxes": 3,
  "to": { ... },
  "from": { ... },
  "items": [ ... ]
}
```

---

### Modified: Parcel lookup response (scanner)

`GET /api/v1/parcels/search` and `GET /api/v1/parcels/:id` add `boxNumber` and `totalBoxes` to the response so the scanner UI can display "Box N of M" context.

---

## 8. Frontend Component Changes (For Frontend Developers)

### New component tree for `OrderDetailsPage`

```
OrderDetailsPage
  └── ReceiverAccordionRow          ← NEW — replaces current AccordionItem
        ├── Receiver header
        │     ├── Outer checkbox (selects all boxes)
        │     ├── Receiver name, phone, address
        │     └── Aggregate status badge
        └── Expanded content
              ├── BoxRow[]          ← NEW — one per parcel
              │     ├── Inner checkbox (selects this box)
              │     ├── "Box N" label + ParcelCode
              │     ├── Individual status badge
              │     └── [+ Add Box] button (on last row only)
              └── Products table (unchanged — shows all receiver products)

AddBoxDialog                        ← NEW — small confirm dialog
```

### `ReceiverAccordionRow` props

```jsx
<ReceiverAccordionRow
  receiver={{
    receiverId: 7,
    receiverName: "Ram Kumar",
    receiverPhone: "9876543210",
    shippingAddress: "Bandra, Mumbai, MH – 400050",
    products: [...],
    parcels: [
      { parcelId: 11, parcelCode: "UC-5-11", dbId: 11, status: "Label Printed", boxNumber: 1, totalBoxes: 3 },
      { parcelId: 12, parcelCode: "UC-5-12", dbId: 12, status: "AWB Linked",    boxNumber: 2, totalBoxes: 3 },
      { parcelId: 13, parcelCode: "UC-5-13", dbId: 13, status: "Pending",       boxNumber: 3, totalBoxes: 3 }
    ]
  }}
  selectedParcelIds={selectedParcelIds}       // Set<number> from parent
  onToggleParcel={toggleParcelSelection}       // (parcelId) => void
  onToggleReceiver={toggleReceiverSelection}   // (parcelIds[]) => void
  onAddBox={handleAddBox}                      // (receiverDetailsId) => void
  courierName="BlueDart"
/>
```

### `OrderDetailsPage` state change

The current line:
```js
// OrderDetailsPage.jsx line 131
const parcels = order.receivers?.map((receiver, idx) => {
  const parcel = receiver.parcel || {};   // ← singular
```
Changes to iterate `receiver.parcels[]` for each receiver.

`selectedParcelIds` remains a `Set<number>` of parcel database IDs — no change in how selection works, just sourced from `receiver.parcels[]` instead of `receiver.parcel`.

### `ShippingLabel` component change

Add `boxNumber` and `totalBoxes` to the destructured label data props and render in the right panel beneath "Order:":

```jsx
{/* Existing */}
<p>Order: {orderCode || 'NA'}</p>

{/* Add this */}
{boxNumber && totalBoxes && (
  <p>Box: {boxNumber} of {totalBoxes}</p>
)}
```

`LabelPrintView` requires no changes — it already accepts an array of parcel IDs and fetches each label independently.

---

## 9. Database & Stored Procedures (For DB Engineers)

### No schema changes required for this feature

`parcel_details` already supports multiple rows per `FkReceiverDetailsId`. No new columns, no new tables, no new stored procedures are needed for Path A.

**Verification query — confirms the table supports multiple parcels per receiver:**
```sql
SELECT FkReceiverDetailsId, COUNT(*) AS BoxCount
FROM parcel_details
GROUP BY FkReceiverDetailsId
HAVING BoxCount > 1;
-- Returns 0 rows today (expected). Will return populated rows after this feature ships.
```

### What the backend calls (no change to SP signatures)

| Action | SP Called | Notes |
|---|---|---|
| Create extra box | `prc_parcel_details_set(0, 0, pFkReceiverDetailsId, NULL, NULL, pCreatedBy)` | Trigger 0. Exact same call as original parcel creation — just for same `FkReceiverDetailsId` again |
| Print label | `prc_parcel_details_set(parcelId, 1, ...)` | Trigger 1. No change |
| Link AWB | `prc_parcel_details_set(parcelId, 2, ...)` | Trigger 2. No change |
| Dispatch | `prc_parcel_details_set(parcelId, 3, ...)` | Trigger 3. No change |

### `boxNumber` / `totalBoxes` computation

Computed in the Node.js service layer — no SP change required:

```sql
-- Equivalent of what the service does:
SELECT
  PkParcelDetailsId,
  ROW_NUMBER() OVER (PARTITION BY FkReceiverDetailsId ORDER BY PkParcelDetailsId ASC) AS BoxNumber,
  COUNT(*) OVER (PARTITION BY FkReceiverDetailsId) AS TotalBoxes
FROM parcel_details
WHERE FkReceiverDetailsId = ?;
```

### Pending SP fix (pre-existing, unrelated to Path A)

`prc_parcel_details_set` trigger 3 (DISPATCH) does not write `TrackingNo` when an AWB is passed directly at dispatch time. This is documented in `sql-procedures/parcel_details`. Fix is one line — see the PENDING task comment at the bottom of that file. **Must be resolved before dispatch flows are tested end-to-end.**

---

## 10. Rules & Constraints

| Rule | Detail |
|---|---|
| Add box only before dispatch | `[+ Add Box]` is disabled once any box for that receiver has status `Dispatched` or `Delivered`. Cancelled boxes are ignored in this check. |
| Minimum 1 box per receiver | The original parcel created at order-creation time cannot be deleted. |
| Scanning is per-box | Each box is scanned and linked independently. There is no "scan all boxes for receiver" batch flow. |
| AWB uniqueness still enforced | Each AWB must be unique across all parcels. `_ensureUniqueAWB` already enforces this on `parcel_details.TrackingNo`. |
| Status rollup for receiver | Computed on the fly from all parcel rows for that receiver. Not stored. |
| Status rollup for order | Unchanged — derived from all parcels across all receivers. |
| `receiver_status_details` log | Each box generates its own audit entries (PRINT_LABEL, AWB_LINK, DISPATCH, etc.). Append-only rule unchanged. |

---

## 11. Known Limitations & Out of Scope

### Out of scope for Path A

| Item | Notes |
|---|---|
| Item-to-box assignment | Knowing which specific products went into which box is not tracked. If this is needed in future, it is a separate feature (Path B concepts). |
| Removing a box | Once created, a box (parcel) can only be Cancelled — not deleted. This is consistent with the existing parcel cancellation flow. |
| Bulk "add N boxes" | The `[+ Add Box]` button adds one box at a time. A "split into N" dialog is a future enhancement. |

### Pre-existing issues to resolve before testing

| Issue | Location | Severity |
|---|---|---|
| `prc_parcel_details_set` trigger 3 does not write `TrackingNo` | `sql-procedures/parcel_details` (PENDING comment at bottom of file) | Medium — affects label data after dispatch |
| `notification.repository.js` calls `prc_parcel_notification_log_set` which does not match live `notification_log` table columns | `src/modules/notification/notification.repository.js` | Medium — affects notification logging |

---

## 12. Implementation Checklists

### DB Engineer

- [ ] Run the verification query in Section 9 to confirm `parcel_details` supports multiple rows per receiver.
- [ ] Apply the pending trigger 3 fix to `prc_parcel_details_set` (documented in `sql-procedures/parcel_details`).
- [ ] No new tables or stored procedures required for this feature.

### Backend Developer

- [ ] Add `POST /api/v1/receivers/:receiverDetailsId/parcels` endpoint with Zod validation (Section 7).
- [ ] Modify `getOrderById` to return `receiver.parcels[]` array (not `receiver.parcel`).
- [ ] Add `boxNumber` / `totalBoxes` computation to `parcelService` (sort by `PkParcelDetailsId ASC` per receiver, use position as `boxNumber`).
- [ ] Add `boxNumber` / `totalBoxes` to label data response (`getLabelData`).
- [ ] Add `boxNumber` / `totalBoxes` to parcel search / lookup response (for scanner context).
- [ ] Add guard in new endpoint: reject if receiver's parcels are all `Dispatched` / `Delivered`.
- [ ] Update API manifest (`scripts/api-manifest.yaml`) with new endpoint and modified responses.
- [ ] Regenerate API docs: `node scripts/generate-api-docs.js`.

### Frontend Developer

- [ ] Create `ReceiverAccordionRow` component (replaces current `AccordionItem` in `OrderDetailsPage`).
- [ ] Create `BoxRow` sub-component (individual parcel row inside `ReceiverAccordionRow`).
- [ ] Create `AddBoxDialog` component (confirm dialog for `[+ Add Box]`).
- [ ] Update `OrderDetailsPage` to iterate `receiver.parcels[]` instead of `receiver.parcel`.
- [ ] Update `ShippingLabel` to render "Box N of M" field.
- [ ] Implement receiver-level checkbox (selects all boxes for receiver).
- [ ] Implement aggregate status badge logic on receiver header row.
- [ ] Wire `[+ Add Box]` to `POST /api/v1/receivers/:receiverDetailsId/parcels` and refresh order data on success.
- [ ] Update scanner result screen to display "Box N of M" context line.

### Tester

| Test Case | Expected Result |
|---|---|
| Order created — receiver has 1 box by default | Order details shows 1 box row per receiver |
| Click `[+ Add Box]` for a receiver | New box row appears; `boxNumber` increments; `totalBoxes` updates on all rows |
| Print label for Box 2 of 3 | Label shows "Box: 2 of 3" |
| Courier scans Box 2 QR | Scanner shows "Box 2 of 3" context; AWB link succeeds independently |
| Courier scans Box 3 QR after Box 2 is dispatched | Works independently; Box 2 dispatch does not affect Box 3 |
| `[+ Add Box]` when all boxes are Dispatched | Button is disabled; no API call made |
| Same AWB scanned on two different boxes | Second scan returns `409 Conflict` — duplicate AWB |
| Order status when 2 of 3 boxes dispatched | Order derived status = "In Progress" |
| Order status when all boxes delivered | Order derived status = "Delivered" |
| Receiver header badge when mixed box statuses | Shows "N of M Dispatched" aggregate text |
| Outer checkbox selects all box rows | All inner checkboxes for that receiver become checked |
