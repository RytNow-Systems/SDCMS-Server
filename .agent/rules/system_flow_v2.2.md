---
trigger: model_decision
description: Defines the strict Parcel and Order state transitions (v2.2). Load this when building or validating status flows and state changes. v2.2 adds address consolidation and Order Mode A/B/C.
---

**Document Type:** Schema Walkthrough & Design Decisions **Project:** Smart Dispatch & Courier Management System **Context:** This document captures the complete logical walkthrough of how every table in the SDCMS schema is used, organized in sequence to understand the application flow. It heavily enforces the new core principle: **“Order = planning, Parcel = execution”** and the unified event-logging paradigm.

---

#### Part 1: Before Anything Works — System Setup

Before a single order can be created, the system needs foundation data.

##### The Very First Thing: Roles & Status Lookups

**Table:** **`lu_user_role`** This table holds exactly 3 roles: ADMIN, OPERATOR, and COURIER. Every single person who logs into the system must be one of these three. **Table:** **`lu_details`** Instead of hardcoding status strings, the database uses a master lookup table for all statuses (e.g., Pending, Label Printed, Dispatched). The backend and database procedures resolve integer foreign keys (`LuDetailsId`) from this table to maintain strict referential integrity.

##### The Second Thing: Creating User Accounts

**Table:** **`employee_master`** This is the **login table**. Every admin, operator, and courier gets a row here.

- `UserName` + `Password` (hashed) → what they type to log in.
- `FkRoleId` → points back to `lu_user_role`.
- `EmployeeCode` → the primary key (e.g., EMP001). This shows up everywhere as the `CreatedBy` value.

---

#### Part 2: Setting Up Master Data

Before you can create an order, you need to know who is involved, what is being shipped, and who is delivering it.

##### Parties (Unified Address Book)

**Table:** **`Party_master`** The old customer and sender tables have been unified into `Party_master`. The frontend still calls them "Senders" for user-friendliness, but the backend maps them here.

- `CustomerName`, `PhoneNo` → identifies the party.
- `FkPartyTypeId` → distinguishes if this is a Sender or Receiver.
- Contains full structured address fields (`Address`, `City`, `State`, `Pincode`).
  > v2.2: `AddressLine1`/`AddressLine2` consolidated into single `Address` field.

**Table:** **`Party_Details`** *(NEW in v2.2)* Per-party address book. A single party can have multiple shipping/billing addresses stored here, with an `IsDefault` flag to mark the primary one. Used by the frontend address book dropdown.

##### Products (What's Being Shipped)

**Table:** **`product_master`** The catalog of items that can go into an order.

- `MaterialName` → product display name.
- `MaterialRate` → catalog list price, which acts as a fallback during order creation.

##### Courier Partners (Who Delivers)

**Table:** **`courier_partner_master`** The list of courier companies.

- `TrackingUrlTemplate` → Stores templates like `https://domain.com?awb={AWB}`. The system replaces `{AWB}` with the real tracking number later.

---

#### Part 3: Creating an Order (The Planning Layer)

This is the heart of the system. An Operator creates a complex order in a single atomic transaction.

##### Step 1: Identify the Sender

**Table hit:** **`Party_master`** The operator types the sender's phone number. The system runs a **find-or-create**:

- **Found?** → Pre-fill their details.
- **Not found?** → Create a new row.

##### Step 2: Create the Order

**Table hit:** **`order_master`** A new row is inserted to hold the order. **Crucial Architectural Rule:** **NO order status is inserted into the database**. Order status is entirely derived.

- `FkSenderId` → Points to the Party.
- `SenderName`, `SenderMobile`, etc. → **Snapshot** of the sender at this exact moment in time so future edits to the Party don't alter past labels.
- `TotalAmount` → Starts at 0, updated AFTER items are added.

##### Step 3: Add Receivers

**Table hit:** **`receiver_details`** One order can have multiple receivers. A row is created for each delivery destination.

- **Order Modes (v2.2):**
  - **Mode A (Sender-to-Self):** Root `products[]` only, no receivers. Backend creates a synthetic receiver by copying the sender's structured `Party_master` address (`Address`, `City`, `State`, `Pincode`) into `receiver_details`.
  - **Mode B (Normal):** `receivers[]` only. Standard multi-receiver flow.
  - **Mode C (Combo):** Both root `products[]` and `receivers[]`. Backend prepends a synthetic sender-receiver to the receivers list, then processes external receivers normally.
  > v2.2: The old flat `senderAddress` string is only stored as a snapshot in `order_master`. Receiver addresses always come from structured fields.

##### Step 4: Add Products to Each Receiver

**Table hit:** **`order_items`** Each receiver gets their own list of products.

- Items are strictly linked to the receiver, NOT the order, to prevent mismatches.
- **Pricing Fallback:** The backend captures the `UnitPrice`. If a custom price is not provided, the system automatically falls back to the `MaterialRate` defined in the product catalog.
- The `TotalAmount` is calculated (`SUM(UnitPrice × OutwardQty)`) and updates the `order_master`.

##### Step 5: Generate Parcels (The Execution Layer Begins)

**Table hit:** **`parcel_details`** This happens **automatically**. **1 receiver = 1 parcel**.

- `parcel_id` → System-generated unique string (Frontend uses this to visually render the QR code).
- `TrackingNo` → **NULL** (courier provides this later).
- `FkParcelStatusId` → Maps to **"Pending"** via `lu_details`.
- `LabelPrintCount` → Starts at 0.

---

#### Part 4: Order Editing & Cancellations

Orders are not locked immediately, but there are strict thresholds governing edits and cancellations.

##### Editing an Order

If the operator realizes a mistake, they can edit the order (`PUT /orders/:id`).

- **The Threshold Rule:** An order can only be edited if **all** of its parcels are below the "AWB Linked" status. Once physical execution (linking tracking numbers) begins, the database transaction (`prc_UpdateComplexOrder`) strictly rejects updates.

##### Cancelling an Order

If an order is aborted (`PATCH /orders/:id/cancel`), the system runs a cascading transaction (`prc_CancelOrder`).

- The system checks that no parcel is "Dispatched" or "Delivered".
- If safe, it bulk-updates all associated `parcel_details` rows to "Cancelled" and appends a cancellation event log to `receiver_status_details` for every single box.

---

#### Part 5: Label Printing

The order is planned. Now the operator prints physical labels.

**Tables hit:** **`parcel_details`** + **`receiver_status_details`** _Note: The old `parcel_label_print_log` table was deleted. Logs are now unified._

1. **Fetch Data:** The system pulls the `parcel_id`, sender snapshot, and structured receiver address (`prc_GetLabelData`).
2. **Update Parcel:** Increments `LabelPrintCount` by 1 and updates status to **"Label Printed"**.
3. **Log the Event:** Appends a new row to `receiver_status_details` tracking the print action (`ActionType = 'STATUS_UPDATE'`).

---

#### Part 6: Courier Scanning — AWB Linking

The courier arrives and performs the **Atomic Two-Scan Flow**.

**Tables hit:** **`parcel_details`** + **`receiver_status_details`** **Scan 1:** The printed **QR code** (which extracts the hidden `parcel_id` to identify the parcel). **Scan 2:** The courier's **AWB barcode** (assigns the tracking number).

**What happens in the DB (`prc_ScanAndLinkAWB`):**

1. System validates the `parcel_id` and ensures `TrackingNo` is perfectly unique to prevent delivery chaos.
2. **Role-Based Auto-Dispatch:**
    - If scanned by **COURIER** → Status jumps directly to **"Dispatched"** and `DispatchDate` is stamped.
    - If scanned by **OPERATOR** → Status changes to **"AWB Linked"** (dispatch happens separately).
3. **Audit Trail:** An append-only event log is added to `receiver_status_details` with `ActionType = 'AWB_LINK'`.

---

#### Part 7: Dispatch

If parcels were scanned by an Operator (AWB Linked), they must be manually dispatched.

**Tables hit:** **`parcel_details`** + **`receiver_status_details`** The operator selects an array of `parcelIds` (bulk dispatch) (`POST /parcels/dispatch`). The system resolves the `lu_details` ID for "Dispatched", stamps the `DispatchDate`, and logs the action as a new append-only row in `receiver_status_details`.

---

#### Part 8: Terminal States (Delivery & Returns)

The final phases of a physical box's journey.

**Tables hit:** **`parcel_details`** + **`receiver_status_details`**

- **Delivery:** Once the courier confirms delivery, an Operator calls `PATCH /parcels/:id/deliver`. The system updates the parcel to **"Delivered"** and logs the terminal event.
- **Returns:** If a dispatched box bounces back to the warehouse, it is marked as **"Returned"**. A hard rule prevents returning a box that was never dispatched.

---

#### Part 9: Notifications

Once dispatched, the system alerts the receiver.

**Table hit:** **`Notification_log`** A row is created tracking the recipient phone and message (`prc_SendNotification`). The status starts as "Not Sent". A webhook callback from the messaging provider eventually updates this to "Sent" or "Failed" (`prc_UpdateNotificationStatus`). Failed messages can be explicitly retried (`POST /notifications/:id/resend`).

---

#### Part 10: Bulk Upload

Operators uploading 200+ orders via an Excel spreadsheet.

**Tables hit:** **`bulk_order_upload_log`** + **`bulk_order_upload_detail`**

- **Log Table:** Tracks the upload session header (Total Rows, Success Rows, Failed Rows).
- **Detail Table:** Logs the row-by-row success or failure messages (`prc_LogBulkUploadRowDetail`).
- For every successful row, the system runs the exact same `prc_CreateComplexOrder` transaction from Part 3.

---

#### Part 11: Data Consumption & Visibility

With execution tracked meticulously at the parcel level, the frontend consumes this data in three powerful ways:

**1. The Amazon-Style Timeline** **Endpoint:** `GET /parcels/:id/timeline` Instead of looking at the order, the frontend queries `receiver_status_details` to build a vertical, chronological timeline of every physical event (Printed → Scanned → Linked → Dispatched → Delivered) for a single specific box.

**2. Real-Time Dashboard Metrics** **Endpoint:** `GET /dashboard/metrics` The dashboard shows system-wide totals (`totalOrders`, `pendingOrders`, `dispatchedOrders`). Because order statuses are not saved in the database, `prc_GetDashboardMetrics` calculates these aggregations dynamically on-the-fly purely from `parcel_details` states.

**3. System-Wide Audit & Reconciliation** **Endpoint:** `GET /parcel-events/export` Operators use the event log endpoints to browse system-wide events and download a CSV of the `receiver_status_details` log for end-of-day auditing and operator reconciliation.

---

#### Part 12: Design Decisions Summary

##### Decision 1: Unified, Append-Only Logging

We eliminated fragmented log tables. **All** physical execution events (prints, QR scans, AWB linking, dispatches) are written as **append-only** rows into `receiver_status_details`. This provides an unbreakable audit trail.

##### Decision 2: Order Status is Derived (Never Stored)

To enforce "Parcel = Execution," we completely removed the order status column from `order_master`. Order status is calculated dynamically on-the-fly (`prc_GetAllOrdersSummary`) based on the aggregated states of its physical parcels.

- _Rule Example:_ If ALL parcels are DISPATCHED → Order is "Dispatched". If SOME parcels are printed → Order is "Partially Printed".

##### Decision 3: Party Consolidation

We eliminated separate sender and customer tables. Everyone is a `Party_master`. The frontend maintains the "Sender" abstraction for user-friendliness, but the backend cleanly maps everything to the unified party table.

##### Decision 4: Master Data CRUD in DB Procedures

Unlike older documentation which limited procedures to transactional flows, the backend heavily utilizes Master Data CRUD stored procedures (e.g., `prc_CreateProduct`, `prc_CreateCourierPartner`, `prc_FindOrCreateParty`) to keep data access strictly unified and optimized at the database layer.