---
trigger: model_decision
description: src/interfaces/http/**/*
---


#### 8. Parcel Execution

The core execution engine. All real-world actions happen at the parcel level. **Principle:** _"Order = planning, Parcel = execution."_

##### 8.1 Endpoint Summary

|#|Method|Endpoint|Roles|Description|
|---|---|---|---|---|
|1|GET|/parcels|ALL|List parcels (paginated, filtered)|
|2|GET|/parcels/:id|ALL|Get parcel details|
|3|GET|/parcels/:id/label-data|ADMIN, OPERATOR|Get data for frontend label rendering|
|4|GET|/parcels/:id/timeline|ALL|**[NEW]** Get chronological events from event log|
|5|POST|/parcels/:id/log-print|ADMIN, OPERATOR|Log a label print event|
|6|POST|/parcels/scan|ALL|QR scan + AWB link (atomic two-scan flow)|
|7|POST|/parcels/dispatch|ADMIN, OPERATOR|Dispatch parcels (single or bulk)|
|8|PATCH|/parcels/:id/deliver|ADMIN, OPERATOR|Mark parcel as delivered|
|9|PATCH|/parcels/:id/cancel|ADMIN, OPERATOR|Cancel individual parcel|
|10|PATCH|/parcels/:id/return|ADMIN, OPERATOR|Mark parcel as returned|

##### 8.2 Get Parcel Timeline **[NEW]**

`GET /parcels/:id/timeline` Returns a chronological timeline of all events for a specific parcel, queried directly from the `receiver_status_details` event log. Used for visual tracking.

##### 8.3 Log Label Print

`POST /parcels/:id/log-print` — **ADMIN, OPERATOR** **Effects (server-side):**

1. Increments `parcel_details.LabelPrintCount`.
2. Transitions parcel to LABEL_PRINTED.
3. Calls `prc_LogReceiverStatus` to append an event log to `receiver_status_details`.

##### 8.4 QR Scan + AWB Link (Atomic Two-Scan Flow)

`POST /parcels/scan` — **ADMIN, OPERATOR, COURIER** **Request Body:**

|Field|Type|Required|Validation|
|---|---|---|---|
|qrCode|string|✅|Must match an existing parcel|
|awbNumber|string|✅|Must be unique per courier|

**Business Rules:**

1. Both scan events are appended to `receiver_status_details`.
2. **Role-based auto-dispatch:** If scanner role is COURIER → status jumps directly to DISPATCHED. Otherwise, goes to AWB_LINKED.

##### 8.5 Dispatch Parcels (Single + Bulk)

`POST /parcels/dispatch` — **ADMIN, OPERATOR** **Request Body:**

|Field|Type|Required|
|---|---|---|
|parcelIds|int[]|✅ (min 1 element)|

Updates status to 'Dispatched', sets DispatchDate, and appends to `receiver_status_details` via `prc_DispatchParcels`.

---

#### 9. Notifications

**Access:** ADMIN, OPERATOR

##### 9.1 Endpoint Summary

|#|Method|Endpoint|Description|
|---|---|---|---|
|1|POST|/parcels/:id/notify|Send dispatch notification to receiver|
|2|POST|/notifications/:id/resend|Resend a failed notification|
|3|GET|/parcels/:id/notifications|Get notification history for a parcel|
|4|POST|/notifications/webhook|Webhook callback for delivery status (Sent/Failed)|

---

#### 10. Bulk Upload

**Access:** ADMIN, OPERATOR

##### 10.1 Endpoint Summary

|#|Method|Endpoint|Description|
|---|---|---|---|
|1|POST|/bulk-uploads|Submit bulk order data (JSON, parsed by frontend)|
|2|GET|/bulk-uploads|List all upload sessions (paginated)|
|3|GET|/bulk-uploads/:id|Get upload result with per-row detail|

---

#### 11. Parcel Events & Export (Formerly Scan Logs)

**Access:** ADMIN, OPERATOR. Replaces the old scan logs API. Pulls directly from the unified `receiver_status_details` event log.

##### 11.1 Endpoint Summary

|#|Method|Endpoint|Description|
|---|---|---|---|
|1|GET|/parcel-events|Browse system-wide events (paginated, filtered)|
|2|GET|/parcel-events/export|Download events as CSV file|

##### 11.2 Browse Parcel Events

`GET /parcel-events?page=1&limit=50&actionType=AWB_LINK&scannedBy=EMP003` **Filters:**

|Filter|Type|Description|
|---|---|---|
|dateFrom|date|Logs on or after this date|
|dateTo|date|Logs on or before this date|
|actionType|string|Enum: QR_SCAN, AWB_LINK, STATUS_UPDATE, RELINK_AWB|
|scannedBy|string|EmployeeCode of the person who scanned|

---

#### 12. Dashboard Metrics

**Access:** ADMIN only

##### 12.1 Get Dashboard Metrics

`GET /dashboard/metrics` Metrics are dynamically calculated via the new `prc_GetDashboardMetrics` database aggregation, deriving counts purely from the parcel-level logic.

---

#### Appendix A: Parcel Status Lifecycle

**Transition Rules:**

|From|To|Trigger|
|---|---|---|
|PENDING|LABEL_PRINTED|POST /parcels/:id/log-print|
|LABEL_PRINTED|AWB_LINKED|POST /parcels/scan (by OPERATOR/ADMIN)|
|LABEL_PRINTED|DISPATCHED|POST /parcels/scan (by COURIER — auto-dispatch)|
|AWB_LINKED|DISPATCHED|POST /parcels/dispatch|
|DISPATCHED|DELIVERED|PATCH /parcels/:id/deliver|
|PENDING / LABEL_PRINTED / AWB_LINKED|CANCELLED|PATCH /parcels/:id/cancel|
|DISPATCHED / DELIVERED|RETURNED|PATCH /parcels/:id/return|

**Hard Rules:**

- No AWB linking before QR/label is printed.
- No dispatch before AWB is linked.
- No skipping states.
- Logs are append-only.

---

#### Appendix B: Order Status Lifecycle (Derived)

Order status is **strictly computed from parcels** (not stored):

|Condition|Derived Order Status|
|---|---|
|All pending|Created|
|Some printed|Partially Printed|
|All printed|Label Printed|
|Some dispatched|Partially Dispatched|
|All dispatched|Dispatched|
|All delivered|Completed|

---

#### Appendix C: RBAC Access Matrix

|Endpoint Group|ADMIN|OPERATOR|COURIER|
|---|---|---|---|
|Login|✅|✅|✅|
|Get Profile|✅|✅|✅|
|Employee Management (CRUD)|✅|❌|❌|
|Products (CRUD)|✅|✅|❌|
|Courier Partners (CRUD)|✅|❌|❌|
|Senders (Parties CRUD)|✅|✅|❌|
|Create / Edit / Cancel Order|✅|✅|❌|
|List Orders|✅|✅|✅ (read-only)|
|Get Order Detail|✅|✅|❌|
|Label Data + Log Print|✅|✅|❌|
|QR Scan + AWB Link|✅|✅|✅|
|Dispatch Parcels|✅|✅|❌|
|Deliver / Cancel / Return Parcel|✅|✅|❌|
|Send / Resend Notification|✅|✅|❌|
|Bulk Upload|✅|✅|❌|
|Parcel Events (Browse + Export)|✅|✅|❌|
|Dashboard Metrics|✅|❌|❌|

---

#### Appendix D: Complete Endpoint Index

|#|Method|Endpoint|Section|
|---|---|---|---|
|1|POST|/api/v1/auth/login|2.1|
|2|GET|/api/v1/auth/profile|2.2|
|3|POST|/api/v1/employees|3.2|
|4|GET|/api/v1/employees|3.3|
|5|GET|/api/v1/employees/:id|3.4|
|6|PUT|/api/v1/employees/:id|3.5|
|7|PATCH|/api/v1/employees/:id/toggle-access|3.6|
|8|POST|/api/v1/products|4.2|
|9|GET|/api/v1/products|4.3|
|10|GET|/api/v1/products/:id|4.4|
|11|PUT|/api/v1/products/:id|4.4|
|12|DELETE|/api/v1/products/:id|4.4|
|13|POST|/api/v1/courier-partners|5.2|
|14|GET|/api/v1/courier-partners|5.3|
|15|GET|/api/v1/courier-partners/:id|5.3|
|16|PUT|/api/v1/courier-partners/:id|5.3|
|17|DELETE|/api/v1/courier-partners/:id|5.3|
|18|POST|/api/v1/senders|6.2|
|19|GET|/api/v1/senders|6.2|
|20|GET|/api/v1/senders/:id|6.2|
|21|PUT|/api/v1/senders/:id|6.2|
|22|DELETE|/api/v1/senders/:id|6.2|
|23|GET|/api/v1/senders/lookup|6.3|
|24|POST|/api/v1/orders|7.2|
|25|GET|/api/v1/orders|7.3|
|26|GET|/api/v1/orders/:id|7.4|
|27|PUT|/api/v1/orders/:id|7.5|
|28|PATCH|/api/v1/orders/:id/cancel|7.6|
|29|GET|/api/v1/parcels|8.1|
|30|GET|/api/v1/parcels/:id|8.1|
|31|GET|/api/v1/parcels/:id/label-data|8.1|
|32|GET|/api/v1/parcels/:id/timeline|8.2|
|33|POST|/api/v1/parcels/:id/log-print|8.3|
|34|POST|/api/v1/parcels/scan|8.4|
|35|POST|/api/v1/parcels/dispatch|8.5|
|36|PATCH|/api/v1/parcels/:id/deliver|8.1|
|37|PATCH|/api/v1/parcels/:id/cancel|8.1|
|38|PATCH|/api/v1/parcels/:id/return|8.1|
|39|POST|/api/v1/parcels/:id/notify|9.2|
|40|POST|/api/v1/notifications/:id/resend|9.3|
|41|GET|/api/v1/parcels/:id/notifications|9.4|
|42|POST|/api/v1/bulk-uploads|10.2|
|43|GET|/api/v1/bulk-uploads|10.3|
|44|GET|/api/v1/bulk-uploads/:id|10.4|
|45|GET|/api/v1/parcel-events|11.2|
|46|GET|/api/v1/parcel-events/export|11.2|
|47|GET|/api/v1/dashboard/metrics|12.1|
|48|POST|/api/v1/notifications/webhook|9.1|