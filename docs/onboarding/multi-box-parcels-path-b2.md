# Multi-Box Parcels — Design & Implementation Guide (Path B2)
**Version:** 1.0  
**Audience:** Client · Product Team · Frontend Developers · Backend Developers · DB Engineers  
**Last Updated:** May 2026  
**Status:** Approved for Review

> **Reading this for the first time?** Start with Section 1 (The Problem) and Section 2 (The Solution). Sections 7–10 are technical deep-dives for the engineering team.  
> **Comparing options?** See also `multi-box-parcels-path-a.md` for the alternative approach. A side-by-side comparison is in Section 2.

---

## Table of Contents
1. [The Problem](#1-the-problem)
2. [The Solution — Path B2](#2-the-solution--path-b2)
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

When an order is created, each receiver gets **one parcel** — one physical box. The system prints one label, the courier scans that label's QR code, links one AWB (courier tracking number), and dispatches it.

This works perfectly when each receiver's entire shipment fits in one box.

### The real-world gap

In practice, a receiver's order can contain 15–20 items across multiple product types. These cannot always fit in one box. The warehouse team needs to pack them into 2, 3, or more physical boxes — and **each box needs its own label, its own identity, and its own AWB from the courier.**

The system today has no way to handle this cleanly:
- There is only one `TrackingNo` field per parcel — linking a second AWB would overwrite the first.
- Multiple labels for the same receiver are not supported.
- There is no record of which specific products went into which specific physical box.

### Why item-level tracking matters

Path B2 solves an additional problem that Path A does not: **provenance**. At any point you can answer: "Which physical box contains the Kurta?" or "Box 3 was lost in transit — which items are affected?" This matters for:

- **Partial loss claims** — if one of three boxes is lost, you know exactly which products to reorder or reimburse.
- **Returns reconciliation** — a returned box can be verified against its declared contents.
- **Warehouse auditing** — packing errors can be traced to the specific box and operator.

---

## 2. The Solution — Path B2

### The core idea

> **One receiver = one parcel (parent). Each physical box within that parcel = one row in `parcel__items_track_details`, with its own QR code (BoxCode), its own label, and its own AWB.**

The key addition to the existing `parcel__items_track_details` table is a `BoxCode` column — a system-generated identifier for each physical box. This is what gets printed as the QR code on each box's label, and what the courier scans independently.

### How the data model looks

```
parcel_details (1 row — the receiver's shipment group)
  PkParcelDetailsId: 11
  ParcelCode: UC-5-11
  QRCode: [UUID — parent identity, used for admin lookup]
  FkParcelStatusId: → computed from children
  └──────────────────────────────────────────────────────
       parcel__items_track_details (N rows — physical boxes)
       ┌────────────────────────────────────────────────┐
       │ Row 1: BoxCode: UC-5-11-B1                     │
       │        FkOrderItemId: Item A (Blue Jeans ×5)   │
       │        TrackingNumber: DHL00123456  ← AWB      │
       ├────────────────────────────────────────────────┤
       │ Row 2: BoxCode: UC-5-11-B2                     │
       │        FkOrderItemId: Item B (White Shirt ×3)  │
       │        TrackingNumber: DHL00123457             │
       ├────────────────────────────────────────────────┤
       │ Row 3: BoxCode: UC-5-11-B3                     │
       │        FkOrderItemId: Item C (Kurta ×2)        │
       │        TrackingNumber: —  ← not yet linked     │
       └────────────────────────────────────────────────┘
```

### A new step is added to the workflow

Path B2 introduces one mandatory new step between order creation and label printing: **Packing**.

```
TODAY:
  Order Created → Label Printed → AWB Linked → Dispatched → Delivered

PATH B2:
  Order Created → Packing ← NEW → Label Printed → AWB Linked → Dispatched → Delivered
```

During packing, the operator assigns each order item to a physical box. This creates the item rows with `BoxCode` identities. Only after all items are assigned can labels be printed.

### Path A vs Path B2 — at a glance

| | Path A | Path B2 |
|---|---|---|
| Model | 1 parcel = 1 physical box | 1 parcel = N boxes (children) |
| New packing step required | No | Yes |
| Per-box item tracking | No | Yes |
| Courier scanning flow | Unchanged | Unchanged (each box scanned independently) |
| New mandatory UI screens | 1 small dialog | 1 full packing screen |
| DB schema change | None | Add `BoxCode` column to `parcel__items_track_details` |
| New API endpoints | 1 | 4 |
| Partial loss tracking | No | Yes |
| Best for | Simple multi-box dispatch | Auditability + item provenance |

---

## 3. What Changes and What Stays the Same

### What stays exactly the same

| Area | Status |
|---|---|
| Order creation flow (`OrderFormPage`) | No change |
| `parcel_details` table schema | No change |
| `prc_parcel_details_set` stored procedure | No change |
| `receiver_status_details` audit log | No change |
| Courier scanning UX (scan QR → scan AWB → done) | No change — same two-scan session, just uses BoxCode QR |
| Dispatch and delivery flows | No change |
| `OrderListPage` derived status | No change |

### What changes

| Area | Change |
|---|---|
| `OrderDetailsPage` | Gains a packing section inside each parcel accordion. Print Label disabled until packing complete. |
| `ShippingLabel` component | New layout: per-box label with `BoxCode` QR, item name, "Box N of M" |
| `LabelPrintView` | Loops over item rows (not parcel IDs) to print N labels |
| Scanner QR result screen | Shows item context ("Box for White Shirt ×3") after BoxCode scan |
| Backend: parcel status logic | Parcel moves to `AWB_LINKED` only when all item rows have `TrackingNumber` |
| Backend: order response | Each parcel now includes `itemRows[]` array |
| Backend: label data endpoint | New endpoint for per-box label data |
| `parcel__items_track_details` table | Add `BoxCode VARCHAR(50)` column (DB migration required) |
| SP `prc_parcel__items_track_details_set` | Update to accept and write `BoxCode` parameter |
| New API endpoints | 4 new endpoints (see Section 7) |

---

## 4. User Flows — Role by Role

### Operator / Warehouse Staff

**Step 1 — Order created (no change)**
Operator creates the order. The system creates one parcel per receiver automatically. No box assignment happens yet.

**Step 2 — Pack the order (new step)**
Operator opens the order on `OrderDetailsPage` and expands a receiver's parcel. A new **Packing** section appears showing all order items for that receiver — all marked "Not Boxed."

The operator clicks **"+ Assign Item to Box"** for each item, selecting which physical box it goes into (new box or an existing box alongside other items). The system generates a `BoxCode` for each box and creates an item row in the database.

Once all items are assigned to boxes, the parcel row shows "All items boxed ✅" and the Print Label option becomes available.

> **Example:** Ram Kumar's order has 3 items — Blue Jeans, White Shirt, Kurta. The operator packs Blue Jeans into Box 1, White Shirt into Box 2, and Kurta into Box 3. Three item rows are created. Three labels can now be printed.

**Step 3 — Print labels**
Operator selects the parcel and clicks Print Label. Three labels print — one per box. Each label shows the item inside, "Box N of 3," and a unique `BoxCode` QR.

**Step 4 — Hand off to courier**
Each box has its own label attached. Boxes are handed to the courier.

---

### Courier

**No change to the two-scan flow.** For each physical box:

1. Scan the `BoxCode` QR on the label.
2. App shows: "Box 2 of 3 — Ram Kumar — White Shirt ×3."
3. Scan the AWB barcode from the courier's own sticker.
4. AWB linked. Done. Move to next box.

Each box is completely independent. The courier does not need to scan all boxes in one session, does not need to know how many boxes exist for a receiver, and does not need to do anything differently from today. The only change is that the QR they scan encodes a `BoxCode` (`UC-5-11-B2`) instead of a `ParcelCode` (`UC-5-11`).

When the **last box** for a parcel gets its AWB linked, the system automatically promotes the parcel status to `AWB Linked`. No action required from the courier.

If `AUTO_DISPATCH_ON_SCAN` is enabled, the parcel auto-dispatches at the moment the last box is linked. Individual boxes do not dispatch independently — dispatch happens at parcel level.

---

### Manager / Admin

The `OrderListPage` derived status and the outer accordion on `OrderDetailsPage` both show parcel-level status — unchanged.

On `OrderDetailsPage`, the manager now sees the packing status and per-box AWB progress inside each parcel:

```
Parcel 1 — Ram Kumar [AWB Linked — 2 of 3 boxes]
  Box 1 — Blue Jeans ×5    — AWB: DHL001  ✅
  Box 2 — White Shirt ×3   — AWB: DHL002  ✅
  Box 3 — Kurta ×2         — AWB: —       ⏳
```

The parcel-level badge shows "2 of 3 boxes linked" as an in-progress indicator until all are done.

---

### Receiver (End Customer)

Receives **one** dispatch notification when the entire parcel is dispatched (all boxes linked and dispatched together). The notification lists all AWB tracking numbers so the receiver knows how many boxes to expect.

```
"Your order has been dispatched in 3 boxes.
Track them here:
Box 1 (Blue Jeans):   track.courier.com/DHL001
Box 2 (White Shirt):  track.courier.com/DHL002
Box 3 (Kurta):        track.courier.com/DHL003"
```

---

## 5. Screen-by-Screen UI Changes

### `OrderDetailsPage` — Parcel Accordion

The outer accordion row (receiver summary, status badge, checkboxes) is **unchanged**. The expanded content gains a new Packing section.

#### Before packing (new state)

```
┌───────────────────────────────────────────────────────────┐
│ ☐  Parcel 1  UC-5-11                                  ⌄  │
│    Ram Kumar  |  9876543210  |  Mumbai  |  [Pending]       │
│                                                           │
│  ─── PACKING ─────────────────────────────────────────    │
│  ⚠ No boxes assigned yet. Assign all items before         │
│    printing labels.                                       │
│                                           [+ Assign Item] │
│                                                           │
│  ─── ORDER ITEMS ──────────────────────────────────────   │
│  Product           │ Qty │ Packed?                        │
│  Blue Jeans Navy   │  5  │  ✗ Not assigned                │
│  White Shirt       │  3  │  ✗ Not assigned                │
│  Kurta Blue        │  2  │  ✗ Not assigned                │
└───────────────────────────────────────────────────────────┘
```

#### Packing in progress

```
┌───────────────────────────────────────────────────────────┐
│ ☐  Parcel 1  UC-5-11                                  ⌄  │
│    Ram Kumar  |  Mumbai  |  [Pending — 2 of 3 packed]     │
│                                                           │
│  ─── PACKING ─────────────────────────────────────────    │
│  Box 1  (UC-5-11-B1)  Blue Jeans ×5   │ AWB: —  │ [⋯]   │
│  Box 2  (UC-5-11-B2)  White Shirt ×3  │ AWB: —  │ [⋯]   │
│                                           [+ Assign Item] │
│                                                           │
│  ─── ORDER ITEMS ──────────────────────────────────────   │
│  Product           │ Qty │ Packed?                        │
│  Blue Jeans Navy   │  5  │  ✅ Box 1                       │
│  White Shirt       │  3  │  ✅ Box 2                       │
│  Kurta Blue        │  2  │  ✗ Not assigned                │
└───────────────────────────────────────────────────────────┘
```

`[Print Label]` in the Actions dropdown remains **disabled** until all items are assigned.

#### Packing complete — labels printable

```
┌───────────────────────────────────────────────────────────┐
│ ☐  Parcel 1  UC-5-11                                  ⌄  │
│    Ram Kumar  |  Mumbai  |  [Pending — Ready to print]    │
│                                                           │
│  ─── PACKING ─── ✅ All items assigned ───────────────    │
│  Box 1  (UC-5-11-B1)  Blue Jeans ×5   │ AWB: —  │ [⋯]   │
│  Box 2  (UC-5-11-B2)  White Shirt ×3  │ AWB: —  │ [⋯]   │
│  Box 3  (UC-5-11-B3)  Kurta ×2        │ AWB: —  │ [⋯]   │
│                                                           │
│  ─── ORDER ITEMS ──────────────────────────────────────   │
│  Blue Jeans Navy  │ 5 │ ✅ Box 1                           │
│  White Shirt      │ 3 │ ✅ Box 2                           │
│  Kurta Blue       │ 2 │ ✅ Box 3                           │
└───────────────────────────────────────────────────────────┘
```

`[Print Label]` is now **enabled**. Clicking it prints 3 labels (one per box).

#### After courier scans — post AWB linking

```
┌───────────────────────────────────────────────────────────┐
│ ☐  Parcel 1  UC-5-11                                  ⌄  │
│    Ram Kumar  |  Mumbai  |  [AWB Linked]                  │
│                                                           │
│  ─── BOXES ───────────────────────────────────────────    │
│  Box 1  (UC-5-11-B1)  Blue Jeans ×5   │ AWB: DHL001  ✅  │
│  Box 2  (UC-5-11-B2)  White Shirt ×3  │ AWB: DHL002  ✅  │
│  Box 3  (UC-5-11-B3)  Kurta ×2        │ AWB: DHL003  ✅  │
└───────────────────────────────────────────────────────────┘
```

---

### `AssignItemToBoxDialog` — New Component

Opens when operator clicks `[+ Assign Item]`.

```
┌──────────────────────────────────────────────────────┐
│  Assign Item to Box — Ram Kumar · UC-5-11            │
│                                                      │
│  Select item:                                        │
│  ┌────────────────────────────────────────────────┐  │
│  │  ○  Blue Jeans Navy ×5     [already assigned]  │  │
│  │  ○  White Shirt ×3         [already assigned]  │  │
│  │  ●  Kurta Blue ×2          ← unassigned        │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  Assign to:                                          │
│  ●  New Box  (will be: Box 3 — UC-5-11-B3)           │
│  ○  Box 1 alongside Blue Jeans                       │
│  ○  Box 2 alongside White Shirt                      │
│                                                      │
│  ─────────────────────────────────────────────────   │
│  ⓘ Assigning to an existing box means both items    │
│  share the same AWB — one physical box.              │
│                                                      │
│                    [Cancel]    [Assign]               │
└──────────────────────────────────────────────────────┘
```

**"Assign to existing box"** allows multiple order items to share one physical box (and one AWB). When the courier scans that box, both items are linked. Both item rows will store the same `TrackingNumber`.

On confirm:
- `POST /api/v1/parcels/:parcelId/boxes` — creates a new item row with a system-generated `BoxCode` (new box), or
- `POST /api/v1/parcels/:parcelId/boxes/:boxRowId/items` — adds item to existing box row.

---

### `[⋯]` Box Row Menu

Each box row in the packing section has a context menu with:

```
┌────────────────────┐
│  Move to other box │
│  Remove from box   │
│  ─────────────────  │
│  Print this label  │
└────────────────────┘
```

- **Move to other box:** reassigns item to a different box row. Allowed only before label is printed for that box.
- **Remove from box:** removes the item row. Resets item to "Not assigned."
- **Print this label:** prints the label for just that one box.

Box editing (move/remove) is **locked** once the box's label has been printed (status transitions past Pending for that item row).

---

### Courier Scanner Screen

After BoxCode QR scan, the result screen shows item context:

```
┌──────────────────────────────────────────────────┐
│  ✅ Box Identified                               │
│                                                  │
│  Ram Kumar — Mumbai                              │
│  Box 2 of 3                                      │
│  UC-5-11-B2                                      │
│                                                  │
│  Contains: White Shirt ×3                        │
│                                                  │
│  Scan AWB barcode →                              │
└──────────────────────────────────────────────────┘
```

After AWB scan:

```
┌──────────────────────────────────────────────────┐
│  ✅ AWB Linked                                   │
│                                                  │
│  Box 2 — White Shirt ×3                          │
│  AWB: DHL00123457                                │
│                                                  │
│  1 box remaining for this parcel.                │
│                                                  │
│  [Done — scan next box]                          │
└──────────────────────────────────────────────────┘
```

If this was the **last box** for the parcel:

```
┌──────────────────────────────────────────────────┐
│  ✅ All Boxes Linked                             │
│                                                  │
│  UC-5-11 — Ram Kumar — 3 boxes                   │
│  Parcel status → AWB Linked                      │
│                                                  │
│  [Done]                                          │
└──────────────────────────────────────────────────┘
```

---

## 6. Shipping Label Changes

Each box gets its own dedicated label. The QR code encodes the `BoxCode` (`UC-5-11-B2`), not the parent `ParcelCode`.

```
┌──────────────────────────────────────────────────┐
│  Utsav Creation                                  │
│                                                  │
│  Shipping To:                                    │
│  RAM KUMAR                                       │
│  Bandra, Mumbai, MH – 400050                     │
│  📞 9876543210                                   │
│                                                  │
│  From: [Sender Name], Surat                      │
│  📞 [Sender Phone]                               │
│                       ┌────────────────────┐     │
│  Order:  UC-5         │                    │     │
│  Parcel: UC-5-11      │  QR CODE           │     │
│  Box:    2 of 3       │  (BoxCode QR)      │     │
│  Item:   White Shirt  │                    │     │
│          ×3 units     └────────────────────┘     │
│                                                  │
│         ┌──────────────────────────────┐         │
│         │        UC-5-11-B2            │         │
│         └──────────────────────────────┘         │
└──────────────────────────────────────────────────┘
```

### Key differences from today's label

| Field | Today | Path B2 |
|---|---|---|
| QR code value | `ParcelCode` (e.g. `UC-5-11`) | `BoxCode` (e.g. `UC-5-11-B2`) |
| ID displayed | `ParcelCode` | `BoxCode` |
| Extra fields | None | Box N of M, Item name + qty |
| Labels per receiver | 1 | N (one per box) |

`LabelPrintView` must loop over item rows for the parcel (not the parcel ID directly) and call a new per-box label data endpoint for each. One label renders per item row.

---

## 7. API Changes (For Backend Developers)

### New endpoint 1: Create a box (assign item to new box)

```
POST /api/v1/parcels/:parcelId/boxes
```

**Auth:** ADMIN, OPERATOR.

**Request body:**
```json
{
  "orderItemId": 42,
  "createdBy": 5
}
```

**What it does:**
1. Generates `BoxCode` = `UC-{orderId}-{parcelId}-B{n}` where `n` is next available box number for this parcel.
2. Calls `prc_parcel__items_track_details_set(0, receiverDetailsId, parcelId, orderItemId, NULL, createdBy)` with `BoxCode`.
3. Returns the created item row.

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "itemRowId": 7,
    "boxCode": "UC-5-11-B3",
    "boxNumber": 3,
    "totalBoxes": 3,
    "orderItemId": 44,
    "itemName": "Kurta Blue",
    "qty": 2,
    "trackingNumber": null,
    "status": "pending"
  }
}
```

**Validation (Zod):**
- `parcelId` must exist and belong to an active order.
- `orderItemId` must belong to the same receiver as the parcel.
- `orderItemId` must not already have an item row for this parcel (prevent duplicate assignment).
- Parcel must not be `Dispatched` or `Delivered`.

---

### New endpoint 2: Add item to existing box

```
POST /api/v1/parcels/:parcelId/boxes/:boxRowId/items
```

Merges an additional order item into an existing box row. Both items will share the same AWB.

**Request body:**
```json
{ "orderItemId": 45, "createdBy": 5 }
```

**Response `201`:** Returns updated box row including all items now assigned to it.

---

### New endpoint 3: Link AWB to a specific box

```
PATCH /api/v1/parcels/:parcelId/boxes/:boxRowId/awb
```

This replaces the existing `POST /api/v1/parcels/scan` for B2. The scan flow now resolves a `BoxCode` to a `boxRowId`, then calls this endpoint.

**Request body:**
```json
{
  "awbNumber": "DHL00123457",
  "courierId": 2,
  "scannedBy": 5
}
```

**Service logic:**
1. Update `parcel__items_track_details.TrackingNumber` for this row via SP.
2. Check if ALL item rows for this `parcelId` now have a `TrackingNumber`.
3. If yes → call `prc_parcel_details_set(parcelId, 2, awbNumber, courierId, scannedBy)` to move parcel to `AWB_LINKED`.
4. If `AUTO_DISPATCH_ON_SCAN=true` and COURIER role → also call trigger 3 and fire notification.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "itemRowId": 7,
    "boxCode": "UC-5-11-B2",
    "trackingNumber": "DHL00123457",
    "parcelStatus": "AWB Linked",
    "allBoxesLinked": true
  }
}
```

**AWB uniqueness rule (important change):**
The existing `_ensureUniqueAWB` in `parcel.service.js:404` checks `parcel_details.TrackingNo` globally — no two parcels can share an AWB. In Path B2, multiple item rows on the **same parcel** may share an AWB (items packed in the same box). The uniqueness rule must be scoped:

- Same AWB on **different parcels** → blocked (`409 Conflict`).
- Same AWB on **different item rows of the same parcel** → allowed (same physical box, multiple items).

---

### New endpoint 4: Per-box label data

```
GET /api/v1/parcels/:parcelId/boxes/:boxRowId/label-data
```

Returns label data for a single box.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "boxCode": "UC-5-11-B2",
    "boxNumber": 2,
    "totalBoxes": 3,
    "parcelCode": "UC-5-11",
    "orderCode": "UC-5",
    "trackingNumber": null,
    "itemName": "White Shirt",
    "itemQty": 3,
    "to": {
      "name": "Ram Kumar",
      "phone": "9876543210",
      "address": "Bandra",
      "city": "Mumbai",
      "state": "MH",
      "pincode": "400050"
    },
    "from": {
      "name": "Sender Name",
      "phone": "9999999999",
      "address": "Surat"
    }
  }
}
```

---

### Modified: `POST /api/v1/parcels/scan` (QR scan resolution)

The scanner sends the scanned QR value. Today it resolves a `ParcelCode`. In Path B2, it must also resolve a `BoxCode`.

```
POST /api/v1/parcels/scan
Body: { "qrValue": "UC-5-11-B2", "awbNumber": "DHL00123457" }
```

Service logic:
1. Detect QR type: does `qrValue` match `BoxCode` pattern (`UC-X-Y-BZ`)? → route to box AWB linking flow.
2. Does it match `ParcelCode` pattern (`UC-X-Y`)? → route to existing parcel-level flow (backwards compatibility for admin lookups).

---

### Modified: Order response

`GET /api/v1/orders/:id` — each parcel now includes its item rows:

```json
{
  "receiverId": 7,
  "receiverName": "Ram Kumar",
  "parcel": {
    "parcelId": 11,
    "parcelCode": "UC-5-11",
    "status": "AWB Linked",
    "allBoxesLinked": true,
    "itemRows": [
      { "itemRowId": 5, "boxCode": "UC-5-11-B1", "boxNumber": 1, "totalBoxes": 3, "itemName": "Blue Jeans", "qty": 5, "trackingNumber": "DHL001" },
      { "itemRowId": 6, "boxCode": "UC-5-11-B2", "boxNumber": 2, "totalBoxes": 3, "itemName": "White Shirt", "qty": 3, "trackingNumber": "DHL002" },
      { "itemRowId": 7, "boxCode": "UC-5-11-B3", "boxNumber": 3, "totalBoxes": 3, "itemName": "Kurta", "qty": 2, "trackingNumber": null }
    ]
  }
}
```

---

## 8. Frontend Component Changes (For Frontend Developers)

### New component tree

```
OrderDetailsPage
  └── AccordionItem (existing — outer receiver/parcel row, unchanged)
        └── AccordionContent
              ├── PackingSection                 ← NEW
              │     ├── PackingStatusBanner      ← NEW (warning if incomplete)
              │     ├── BoxRow[]                 ← NEW (one per item row)
              │     │     ├── BoxCode, item name, qty
              │     │     ├── AWB value (or "—")
              │     │     ├── Status icon
              │     │     └── [⋯] context menu
              │     └── AssignItemButton         ← NEW
              │
              └── OrderItemsTable (existing — shows items with "Packed?" column added)

AssignItemToBoxDialog                            ← NEW
```

### `PackingSection` props

```jsx
<PackingSection
  parcelId={11}
  parcelCode="UC-5-11"
  receiverDetailsId={7}
  orderItems={[
    { orderItemId: 42, name: "Blue Jeans", qty: 5 },
    { orderItemId: 43, name: "White Shirt", qty: 3 },
    { orderItemId: 44, name: "Kurta Blue", qty: 2 }
  ]}
  itemRows={[
    { itemRowId: 5, boxCode: "UC-5-11-B1", boxNumber: 1, orderItemId: 42, trackingNumber: null },
    { itemRowId: 6, boxCode: "UC-5-11-B2", boxNumber: 2, orderItemId: 43, trackingNumber: null }
  ]}
  onPackingComplete={handlePackingComplete}   // called when all items assigned
  onItemRowAdded={handleItemRowAdded}         // refreshes accordion data
  isPrintLocked={!allItemsBoxed}              // drives Actions dropdown state
/>
```

### Print Label guard

In `OrderDetailsPage`, the `handlePrintLabels` function (currently at line 78) must check:

```js
// Before calling printRef.current.print(ids):
const allItemsBoxed = selectedParcels.every(p => p.itemRows.length === p.orderItems.length);
if (!allItemsBoxed) {
  toast.error("Complete packing before printing labels.");
  return;
}
```

The print call also changes: instead of passing `parcelIds` to `LabelPrintView`, it passes `itemRowIds` for the selected parcels.

### `LabelPrintView` change

The `print(ids)` method currently accepts parcel IDs and calls `getLabelData(id)` per parcel.

In Path B2 it accepts item row IDs and calls `getBoxLabelData(parcelId, boxRowId)` per box:

```js
// Before (parcel-level):
for (const id of parcelIds) {
  const { data } = await getLabelData(id);
}

// After (box-level):
for (const { parcelId, boxRowId } of boxRefs) {
  const { data } = await getBoxLabelData(parcelId, boxRowId);
}
```

### `ShippingLabel` component

Destructures `boxCode`, `boxNumber`, `totalBoxes`, `itemName`, `itemQty` from label data:

```jsx
<QRCodeSVG
  value={boxCode || 'NA'}     // ← BoxCode, not parcelCode
  size={160}
  level="H"
/>

<p>Order: {orderCode}</p>
<p>Parcel: {parcelCode}</p>
<p>Box: {boxNumber} of {totalBoxes}</p>   {/* new */}
<p>Item: {itemName} ×{itemQty}</p>         {/* new */}

<span>{boxCode}</span>                     {/* ID display — BoxCode */}
```

---

## 9. Database & Stored Procedures (For DB Engineers)

### Schema change: `parcel__items_track_details`

Add one column:

```sql
ALTER TABLE parcel__items_track_details
ADD COLUMN BoxCode VARCHAR(50) NULL AFTER FkOrderItemId;
```

`BoxCode` format: `UC-{orderId}-{parcelId}-B{n}` (e.g. `UC-5-11-B2`). Generated in the Node.js backend service — not in the stored procedure.

**After migration, full table structure:**

```
PkParcelItemsTrackDetailsid  int(11) AI PK
FkReceiverDetailsId          int(11)
FkParcelDetailsId            int(11)
FkOrderItemId                int(11)
BoxCode                      varchar(50)     ← NEW
TrackingNumber               varchar(100)
CreatedBy                    int(11)
```

---

### Updated SP: `prc_parcel__items_track_details_set`

Add `pBoxCode` parameter to both INSERT and UPDATE branches:

```sql
CREATE DEFINER=`user`@`%` PROCEDURE `prc_parcel__items_track_details_set`(
  pPkParcelItemsTrackDetailsid int(11),
  pFkReceiverDetailsId int(11),
  pFkParcelDetailsId int(11),
  pFkOrderItemId int(11),
  pBoxCode varchar(50),            -- NEW parameter
  pTrackingNumber varchar(100),
  pCreatedBy int(11)
)
BEGIN
  DECLARE pParcelItemId INT;

  IF pPkParcelItemsTrackDetailsid = 0 THEN
    INSERT INTO parcel__items_track_details
      (FkReceiverDetailsId, FkParcelDetailsId, FkOrderItemId, BoxCode, TrackingNumber, CreatedBy)
    VALUES
      (pFkReceiverDetailsId, pFkParcelDetailsId, pFkOrderItemId, pBoxCode, pTrackingNumber, pCreatedBy);
    SELECT LAST_INSERT_ID() AS pParcelItemId;
  ELSE
    UPDATE parcel__items_track_details
    SET
      FkReceiverDetailsId = pFkReceiverDetailsId,
      FkParcelDetailsId   = pFkParcelDetailsId,
      FkOrderItemId       = pFkOrderItemId,
      BoxCode             = pBoxCode,
      TrackingNumber      = pTrackingNumber
    WHERE PkParcelItemsTrackDetailsid = pPkParcelItemsTrackDetailsid;
  END IF;
END
```

---

### New SP: `prc_parcel__items_track_details_get_by_parcel`

The existing `prc_parcel__items_track_details_get` fetches all rows (action 0) or by PK (action 1). Add action 2 to fetch all rows for a given parcel:

```sql
-- Add to existing procedure body:
IF pAction = 2 THEN
  SELECT
    pitd.PkParcelItemsTrackDetailsid,
    pitd.FkReceiverDetailsId,
    pitd.FkParcelDetailsId,
    pd.ParcelCode,
    pitd.FkOrderItemId,
    oi.OutwardQty,
    pitd.BoxCode,
    pitd.TrackingNumber,
    pitd.CreatedBy,
    IFNULL(CreatedUser.FullName, '') AS CreatedUserName
  FROM parcel__items_track_details pitd
    LEFT JOIN employee_master CreatedUser ON CreatedUser.EmployeeCode = pitd.CreatedBy
    LEFT JOIN order_items oi ON oi.PkOrderItemId = pitd.FkOrderItemId
    LEFT JOIN parcel_details pd ON pd.PkParcelDetailsId = pitd.FkParcelDetailsId
    LEFT JOIN receiver_details rd ON rd.PkReceiverDetailsId = pitd.FkReceiverDetailsId
  WHERE pitd.FkParcelDetailsId = pLookupId
  ORDER BY pitd.PkParcelItemsTrackDetailsid ASC;
END IF;
```

---

### How parcel status transitions work (no SP change to `prc_parcel_details_set`)

The status promotion logic lives in the Node.js service — no SP change required:

```
After each call to PATCH /boxes/:boxRowId/awb:
  1. Service fetches all item rows for parcelId
  2. Check: do ALL rows have a non-NULL TrackingNumber?
  3. If yes → call prc_parcel_details_set(parcelId, trigger=2, awbNumber, courierId, createdBy)
     → parcel moves to AWB_LINKED
  4. If AUTO_DISPATCH_ON_SCAN=true and COURIER role → also call trigger 3 → DISPATCHED
  5. If no → do nothing; parcel stays Label Printed
```

---

### Pre-existing pending fix (must resolve before testing)

`prc_parcel_details_set` trigger 3 (DISPATCH) does not write `TrackingNo` when an AWB is passed at dispatch time. This is documented in `sql-procedures/parcel_details`. Fix required before dispatch flows are tested end-to-end.

---

## 10. Rules & Constraints

| Rule | Detail |
|---|---|
| Packing required before label print | `[Print Label]` is disabled until every order item for that receiver has an item row in `parcel__items_track_details` |
| Box editing locked after label print | Once a box's label is printed, its item assignment cannot be changed |
| AWB uniqueness — cross-parcel | Same AWB cannot be used on two different parcels (`409 Conflict`) |
| AWB uniqueness — same parcel | Same AWB is allowed on multiple item rows of the same parcel (items in the same physical box) |
| Parcel AWB_LINKED trigger | Service promotes parcel to `AWB_LINKED` only when all item rows have a `TrackingNumber` |
| Auto-dispatch scope | Fires at parcel level (all boxes linked), not per-box |
| Box removal | Allowed before label print only. Once printed, use Cancel flow instead |
| Minimum 1 item row | A receiver parcel must have at least 1 item row before labels can be printed |
| `receiver_status_details` | Append-only rule unchanged. Events are logged at parcel level (PRINT_LABEL, AWB_LINK, DISPATCH etc.) |

---

## 11. Known Limitations & Out of Scope

### Out of scope for this implementation

| Item | Notes |
|---|---|
| Qty split across boxes | The current model assigns an entire order item (all qty) to one box. Splitting "5 units of Blue Jeans across Box 1 and Box 2" requires a `BoxQty` column — a future enhancement |
| Per-box delivery tracking | Delivery is logged at parcel level. Knowing which box was delivered first is not tracked |
| Box-level cancellation | Individual boxes cannot be cancelled independently. Cancel the entire parcel |

### Pre-existing issues to resolve before testing

| Issue | Location | Severity |
|---|---|---|
| `prc_parcel_details_set` trigger 3 does not write `TrackingNo` | `sql-procedures/parcel_details` (PENDING comment) | Medium |
| `notification.repository.js` calls `prc_parcel_notification_log_set` which does not match live `notification_log` schema | `src/modules/notification/notification.repository.js` | Medium |

---

## 12. Implementation Checklists

### DB Engineer

- [ ] Run `ALTER TABLE parcel__items_track_details ADD COLUMN BoxCode VARCHAR(50) NULL AFTER FkOrderItemId`
- [ ] Deploy updated `prc_parcel__items_track_details_set` with `pBoxCode` parameter (Section 9)
- [ ] Add action `2` (get by `FkParcelDetailsId`) to `prc_parcel__items_track_details_get` (Section 9)
- [ ] Apply the pending trigger 3 fix to `prc_parcel_details_set` (documented in `sql-procedures/parcel_details`)
- [ ] Verify `parcel__items_track_details` has no UNIQUE constraint on `FkOrderItemId` — multiple items in the same box share AWB and same item could theoretically appear twice (edge case)

### Backend Developer

- [ ] Add `BoxCode` generation logic in service: format `UC-{orderId}-{parcelId}-B{n}`, where `n` is count of existing rows + 1
- [ ] Add `POST /api/v1/parcels/:parcelId/boxes` with Zod validation (Section 7)
- [ ] Add `POST /api/v1/parcels/:parcelId/boxes/:boxRowId/items` (merge item into existing box)
- [ ] Add `PATCH /api/v1/parcels/:parcelId/boxes/:boxRowId/awb` with completion-check logic (Section 7)
- [ ] Add `GET /api/v1/parcels/:parcelId/boxes/:boxRowId/label-data` (Section 7)
- [ ] Modify `POST /api/v1/parcels/scan` to detect `BoxCode` vs `ParcelCode` and route accordingly (Section 7)
- [ ] Modify AWB uniqueness check: allow same AWB across item rows of the same parcel; block across different parcels
- [ ] Modify `getOrderById` to include `parcel.itemRows[]` in response (Section 7)
- [ ] Update API manifest (`scripts/api-manifest.yaml`) with all new endpoints
- [ ] Regenerate API docs: `node scripts/generate-api-docs.js`

### Frontend Developer

- [ ] Create `PackingSection` component (item assignment workspace inside accordion)
- [ ] Create `BoxRow` component (individual box row with BoxCode, item, AWB, menu)
- [ ] Create `AssignItemToBoxDialog` component (assign/merge items to boxes)
- [ ] Add "Packed?" column to the existing order items table inside the accordion
- [ ] Add packing-complete guard to `handlePrintLabels` in `OrderDetailsPage`
- [ ] Update `LabelPrintView` to loop over `itemRowIds` instead of `parcelIds`
- [ ] Update `ShippingLabel` to render `boxCode` QR, item name/qty, "Box N of M"
- [ ] Update scanner QR result screen to handle `BoxCode` resolution and show item context
- [ ] Add partial-link progress text to parcel status badge ("2 of 3 boxes linked")

### Tester

| Test Case | Expected Result |
|---|---|
| Order created — packing section empty | All items shown as "Not assigned"; Print Label disabled |
| Assign item to new box | New box row appears with generated BoxCode; item marked "✅ Box N" in items table |
| Assign item to existing box | Item merged into existing box row; both items share same BoxCode |
| Attempt Print Label before all items assigned | Toast error: "Complete packing before printing labels." |
| Print labels after all items assigned | N labels print, one per box; each label shows BoxCode QR and item name |
| Courier scans Box QR | Scanner shows "Box N of M", receiver name, item name |
| Courier scans AWB after Box QR | AWB linked to item row; "1 remaining" message shown |
| Courier scans last AWB for parcel | Parcel status → "AWB Linked"; "All Boxes Linked" confirmation |
| Same AWB scanned on second box of same parcel | Allowed (same physical box, two items) — AWB linked |
| Same AWB scanned on different parcel | `409 Conflict` — duplicate AWB across parcels |
| All boxes linked, AUTO_DISPATCH_ON_SCAN=true, COURIER role | Parcel auto-dispatches; notification fires |
| Attempt to reassign item after label printed | Edit controls locked; context menu shows greyed-out options |
| Order status when 1 of 2 parcels fully linked | Order derived status = "In Progress" |
