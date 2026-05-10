# SDCMS Backend — Agent API Reference

> **Purpose:** Complete, machine-readable API reference for frontend AI agents.
> Every field, constraint, role, status code, and business rule is declared explicitly.
> No assumption should be made about behaviour not stated here.
>
> **Source of truth:** `scripts/api-manifest.yaml` + Zod schemas in `src/interfaces/http/validations/`
> **Last synced:** 2026-05-10

---

## 1. Transport & Auth

| Property | Value |
|----------|-------|
| Base URL | `{{base_url}}/api/v1` |
| Protocol | HTTPS |
| Content-Type (writes) | `application/json` |
| Auth scheme | `Authorization: Bearer <JWT>` |
| Token source | `POST /auth/login → data.token` |
| Token storage | `localStorage` or secure cookie (frontend responsibility) |
| Unauthenticated routes | `POST /auth/login`, `GET /system/health`, `POST /notifications/webhook` |

---

## 2. Universal Response Envelope

Every endpoint returns this shape — no exceptions.

```typescript
interface ApiResponse<T = unknown> {
  success: boolean;
  data?:   T;       // present on success
  error?:  string;  // present on failure; never a raw DB error
}
```

**Success:** `{ success: true, data: <payload> }`  
**Failure:** `{ success: false, error: "<human-readable message>" }`

---

## 3. Pagination

Paginated list endpoints accept `page` (default `1`) and `limit` (default `20`) as query params and return a `meta` envelope alongside `data`.

```typescript
interface PaginatedResponse<T> {
  success: true;
  data:    T[];
  meta: {
    page:       number;
    limit:      number;
    totalRows:  number;
    totalPages: number;
  };
}
```

Paginated endpoints: `GET /orders`, `GET /parcels`, `GET /parcel-events`.

---

## 4. Roles & Access Control Matrix

| Role | Description |
|------|-------------|
| `ADMIN` | Full access to all modules |
| `OPERATOR` | Full access except employee management |
| `COURIER` | Read-only parcels + scan operation |

| Module | ADMIN | OPERATOR | COURIER |
|--------|-------|----------|---------|
| Auth (login, profile) | ✓ | ✓ | ✓ |
| System health | ✓ | ✓ | ✓ |
| Product Catalog (CRUD) | ✓ | ✓ | — |
| Employee Management | ✓ | — | — |
| Courier Partners | ✓ | ✓ | ✓ (read-only) |
| Senders | ✓ | ✓ | — |
| Receivers | ✓ | ✓ | — |
| Orders (read) | ✓ | ✓ | ✓ |
| Orders (write) | ✓ | ✓ | — |
| Parcels (read) | ✓ | ✓ | ✓ |
| Parcels (write: label, dispatch, deliver, cancel) | ✓ | ✓ | — |
| Scan (`POST /parcels/scan`) | ✓ | ✓ | ✓ |
| Parcel Events | ✓ | ✓ | — |
| Dashboard | ✓ | — | — |
| Bulk Upload | ✓ | ✓ | — |
| Notifications | ✓ | ✓ | — |
| Webhook (`POST /notifications/webhook`) | ✓ | ✓ | ✓ |

---

## 5. Domain Vocabulary

| Term | Definition |
|------|-----------|
| `order` | Planning unit linking a customer to one or more receivers. Status is **mathematically derived** from its parcels — never stored directly. |
| `receiver` | A delivery destination within an order. One order → many receivers. |
| `parcel` | The physical shipment unit. Single source of truth for execution. One receiver → one parcel. |
| `parcelId` | Dynamic string ID: `PCL-{orderId}-{parcelDetailsId}`. **Frontend generates the QR code from this string.** Backend does not store QR images. |
| `parcelDetailsId` | Numeric primary key of the parcel record. Used in URL params. |
| `awbNumber` | Airway Bill — the courier's tracking number, linked at scan time. |
| `orderCode` | Human-readable order identifier: `ORD-{year}-{sequence}`. |
| `derivedStatus` | Order status computed from all child parcel statuses. Not stored in DB. |
| `receiver_status_details` | Append-only audit table — every parcel event is logged here. Never updated or deleted. |
| `Party Master` | Shared table for senders and receivers (`party_master`). All IDs (senderId, receiverId) reference this table. |
| `sessionHash` | Client-generated content fingerprint (MD5/SHA-256 of `rows`) for bulk-upload deduplication. |

---

## 6. Parcel Status Machine

```
PENDING ──────────────► LABEL_PRINTED ──────────────► AWB_LINKED ──────────────► DISPATCHED ──────────────► DELIVERED
                                                                                       │
                                                                              CANCELLED (terminal)
```

| Transition | Trigger | Who |
|-----------|---------|-----|
| `PENDING → LABEL_PRINTED` | `POST /parcels/:id/log-print` | ADMIN, OPERATOR |
| `LABEL_PRINTED → AWB_LINKED` | `POST /parcels/scan` (OPERATOR role) | OPERATOR |
| `LABEL_PRINTED → DISPATCHED` | `POST /parcels/scan` (COURIER role) — auto-dispatch | COURIER |
| `AWB_LINKED → DISPATCHED` | `POST /parcels/dispatch` | ADMIN, OPERATOR |
| `DISPATCHED → DELIVERED` | `PATCH /parcels/:id/deliver` | ADMIN, OPERATOR |
| `Any (non-DISPATCHED) → CANCELLED` | `PATCH /parcels/:id/cancel` or order edit removing a receiver | ADMIN, OPERATOR |

**Invariants the frontend must enforce:**
- Never show "Edit Order" if any parcel in the order is `AWB_LINKED` or beyond — PUT will return `400`.
- Never show "Scan" if parcel is not `LABEL_PRINTED`.
- Never show "Dispatch" if parcel is not `AWB_LINKED`.
- `DELIVERED` and `CANCELLED` are terminal — no further transitions.

---

## 7. Order Creation Modes

The backend auto-detects the mode from the payload shape.

| Mode | Condition | Description |
|------|-----------|-------------|
| Mode A (Sender-to-Self) | Root-level `products` array present | Sender is also the receiver |
| Mode B (Sender → Receivers) | Root-level `receivers` array present | One or more named receiver destinations |
| Mode C (Combo) | Both `products` and `receivers` present | Mixed; not commonly used |

---

## 8. TypeScript Interfaces

### Auth

```typescript
interface LoginRequest {
  email:    string;
  password: string;
}

interface AuthUser {
  id:             string;
  employeeCode:   string;
  username:       string;
  name:           string;
  email:          string;
  role:           'ADMIN' | 'OPERATOR' | 'COURIER';
  token:          string;  // JWT; store and attach to all requests
}

interface UserProfile {
  employeeCode: string;
  username:     string;
  firstName:    string;
  email:        string;
  phoneNo:      string;
  roleCode:     'ADMIN' | 'OPERATOR' | 'COURIER';
  allowLogin:   boolean;
  createdAt:    string;  // ISO 8601
}
```

### Products

```typescript
interface Category  { id: number; categoryName: string; }
interface Unit      { id: number; unitTitle: string; unitCode: string; }
interface Color     { id: number; colorName: string; colorCode: string; }

interface ProductVariation {
  variationId:  number;
  colorId:      number;
  colorName?:   string;
  size:         string;
  materialRate: number;
}

interface Product {
  id:           number;
  materialName: string;
  materialRate: number;
  categoryId:   number;
  categoryName?: string;
  unitId:       number;
  variations:   ProductVariation[];
}

interface ProductDropdownItem {
  value: { productId: number; variationId: number; materialRate: number; };
  label: string;  // "Cotton Roll — Red / M (Textiles) [CU-001]"
}

// Write payloads
interface CreateProductRequest {
  materialName: string;
  categoryId:   number;
  unitId:       number;
  materialRate?: number;         // defaults to 0
  variations?:   Array<{
    colorId:      number;
    size:         string;
    materialRate: number;
  }>;
}

interface UpdateProductRequest {
  materialName?:  string;
  categoryId?:    number;
  unitId?:        number;
  materialRate?:  number;
  variations?:    Array<{
    matrixId?:    number;        // present = update; absent = insert
    colorId?:     number;
    size?:        string;
    materialRate?: number;
    isActive?:    false;         // matrixId + isActive:false = soft-delete
  }>;
}
```

### Employees

```typescript
type EmployeeRole = 'ADMIN' | 'OPERATOR' | 'COURIER';

interface Employee {
  id:          string;
  name:        string;
  role:        EmployeeRole;
  email:       string;
  allowLogin:  boolean;
  createdAt:   string;
}

interface CreateEmployeeRequest {
  name:     string;
  role:     EmployeeRole;
  email:    string;
  password: string;
}
```

### Party (Senders & Receivers share shape)

```typescript
interface Party {
  id:           number;
  customerName: string;
  phoneNo:      string;
  emailId?:     string;
  isActive:     boolean;
}

interface PartyAddress {
  id:          number;
  partyId:     number;
  partyName:   string;
  phoneNo:     string;
  address:     string;
  city:        string;
  state:       string;
  pincode:     string;
  isDefault:   boolean;
}

interface CreatePartyRequest {
  customerName: string;
  phoneNo:      string;
  emailId?:     string;
  address?:     string;
  city?:        string;
  state?:       string;
  pincode?:     string;
}

interface CreateAddressRequest {
  address:  string;
  city:     string;
  state:    string;
  pincode:  string;
}
```

### Courier Partners

```typescript
interface CourierPartner {
  id:                   number;
  courierName:          string;
  trackingUrlTemplate?: string;  // e.g. "https://track.example.com/awb/{AWB}"
}
```

### Orders

```typescript
type ParcelStatus   = 'PENDING' | 'LABEL_PRINTED' | 'AWB_LINKED' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
type DerivedStatus  = 'PENDING' | 'PARTIAL_DISPATCH' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';

interface OrderListItem {
  id:            number;
  orderCode:     string;      // "ORD-2026-001"
  senderName:    string;
  senderMobile:  string;
  totalAmount:   number;
  derivedStatus: DerivedStatus;
  createdAt:     string;
}

interface OrderProduct {
  productId:  number;
  qty:        number;
  unitPrice:  number;
}

interface OrderParcel {
  parcelDetailsId: number;
  parcelId:        string;  // "PCL-1-1" — use this string for QR code
  status:          ParcelStatus;
}

interface OrderReceiver {
  id:               number;   // receiverDetailsId
  receiverName:     string;
  receiverPhone:    string;
  address:          string;
  city:             string;
  state:            string;
  pincode:          string;
  parcel:           OrderParcel;
  products:         OrderProduct[];
}

interface OrderAggregate {
  id:            number;
  orderCode:     string;
  senderName:    string;
  senderMobile:  string;
  totalAmount:   number;
  derivedStatus: DerivedStatus;
  senderAddress: string;
  courierId:     number;
  receivers:     OrderReceiver[];
}

// Write payloads
interface OrderProductInput {
  variationId:   number;
  quantity:      number;
  orderItemId?:  number;  // present = update; absent = insert; omit entirely = delete
}

interface OrderReceiverInput {
  receiverId:          number;
  receiverAddressId:   number;
  receiverDetailsId?:  number;  // present = update existing; absent = insert new
  products:            OrderProductInput[];
}

interface CreateOrderRequest {
  senderId:        number;
  senderAddressId: number;
  courierId:       number;
  // Mode B: receivers array
  receivers?:      OrderReceiverInput[];
  // Mode A: top-level products
  products?:       OrderProductInput[];
}

// PUT /orders/:id — send the FULL current state of the order
interface UpdateOrderRequest {
  senderId?:        number;
  senderAddressId?: number;
  receivers?:       OrderReceiverInput[];  // must include ALL existing receivers, not just changed ones
}
```

### Parcels

```typescript
interface Parcel {
  parcelDetailsId: number;
  parcelId:        string;    // "PCL-{orderId}-{parcelDetailsId}"
  trackingNo:      string | null;
  status:          ParcelStatus;
  labelPrintCount: number;
  receiverName:    string;
  receiverPhone:   string;
  address:         string;
  city:            string;
  state:           string;
  pincode:         string;
  orderCode:       string;
}

interface ParcelEvent {
  receiverStatusDetailsId: number;
  parcelId:                string;
  orderCode:               string;
  actionType:              'STATUS_UPDATE' | 'AWB_LINK' | 'LABEL_PRINT' | 'DISPATCH' | 'DELIVERY' | 'CANCELLATION';
  awbNumber:               string | null;
  previousStatus:          string;
  newStatus:               string;
  scannedBy:               string;   // employeeCode
  timestamp:               string;   // ISO 8601
}

interface ScanRequest {
  parcelId:  string;   // "PCL-1-1" — from QR code scan
  awbNumber: string;   // from AWB barcode scan
}

interface DispatchRequest {
  parcelDetailsIds: number[];  // min 1 item
}
```

### Bulk Upload

```typescript
interface BulkUploadProduct  { variationId: number; quantity: number; }

interface BulkUploadReceiver {
  receiverId:        number;
  receiverAddressId: number;
  receiverPhone:     string;   // min 10 chars
  products:          BulkUploadProduct[];  // min 1
}

interface BulkUploadRow {
  senderId:        number;
  senderAddressId: number;
  courierId?:      number;
  receivers:       BulkUploadReceiver[];  // min 1
}

interface BulkUploadPayload {
  sessionHash: string;          // required; client SHA-256/MD5 of rows
  fileName?:   string;          // default "bulk_upload.json"
  rows:        BulkUploadRow[]; // min 1
}

interface BulkUploadCreated {
  sessionId:        number;
  successfulOrders: number;
  failedRows:       number;
}

interface BulkUploadSession {
  sessionId:    number;
  sessionHash:  string;
  fileName:     string;
  totalRows:    number;
  successCount: number;
  failedCount:  number;
  createdBy:    string;
  createdAt:    string;
}

interface BulkUploadErrorRow {
  rowData:      BulkUploadRow;  // always a parsed object
  errorMessage: string;
}

interface BulkUploadDetail {
  bulkUploadErrorId: number;
  bulkUploadId:      number;
  rowNumber:         number;   // 1-based
  errorMessage:      string;
  rowData:           BulkUploadRow;
}
```

### Dashboard

```typescript
interface DashboardMetrics {
  TotalOrders:      number;
  PendingOrders:    number;
  DispatchedOrders: number;
  DeliveredOrders:  number;
}
```

---

## 9. Endpoint Catalog

Format per entry:
```
METHOD  /path
Roles:  [...]
Params: query/path parameters
Body:   request shape
200/201: response data shape
Errors: status → condition
```

---

### 9.1 Authentication

#### `POST /auth/login`
```
Auth:   none
Body:   { email: string, password: string }
200:    AuthUser (includes token)
403:    allowLogin is false (account locked)
401:    wrong credentials
```

#### `GET /auth/profile`
```
Roles:  ALL
200:    UserProfile
```

#### `GET /system/health`
```
Auth:   none
200:    { status: "UP", dbConnected: boolean }
```

---

### 9.2 Product Catalog

#### `GET /products/categories`
```
Roles:  ADMIN, OPERATOR
200:    Category[]
```

#### `POST /products/categories`
```
Roles:  ADMIN, OPERATOR
Body:   { categoryName: string }
201:    Category
```

#### `GET /products/units`
```
Roles:  ADMIN, OPERATOR
200:    Unit[]
```

#### `POST /products/units`
```
Roles:  ADMIN, OPERATOR
Body:   { unitTitle: string, unitCode: string }
201:    Unit
```

#### `GET /products/colors`
```
Roles:  ADMIN, OPERATOR
200:    Color[]
```

#### `POST /products/colors`
```
Roles:  ADMIN, OPERATOR
Body:   { colorName: string, colorCode?: string }
201:    Color
Notes:  colorCode optional; defaults to ""
```

#### `GET /products`
```
Roles:  ADMIN, OPERATOR
Query:  categoryId?: number, unitId?: number
200:    Product[] (without variations)
```

#### `GET /products/dropdown`
```
Roles:  ADMIN, OPERATOR
200:    ProductDropdownItem[]
Notes:  Use this for order form product selection; value object has variationId
```

#### `POST /products`
```
Roles:  ADMIN, OPERATOR
Body:   CreateProductRequest
201:    Product (with variations if provided)
```

#### `GET /products/:id`
```
Roles:  ADMIN, OPERATOR
Params: id: number
200:    Product (with all active variations)
404:    product not found
```

#### `PUT /products/:id`
```
Roles:  ADMIN, OPERATOR
Params: id: number
Body:   UpdateProductRequest (all fields optional)
200:    updated Product
Notes:
  - Variations diff: matrixId present → update
  - Variations diff: matrixId absent → insert new
  - matrixId + isActive:false → soft-delete variation
```

#### `DELETE /products/:id`
```
Roles:  ADMIN, OPERATOR
Params: id: number
200:    { success: true }
```

#### `POST /products/:id/matrix`
```
Roles:  ADMIN, OPERATOR
Params: id: number
Body:   { fkLuColorId: number, materialRate: number, size: string, matrixId?: number }
201:    ProductVariation
Notes:  Prefer inline variations on PUT /products/:id for batch edits
```

---

### 9.3 Employee Management *(ADMIN only)*

#### `GET /employees`
```
Roles:  ADMIN
200:    Employee[]
```

#### `POST /employees`
```
Roles:  ADMIN
Body:   CreateEmployeeRequest
201:    Employee
```

#### `GET /employees/:id`
```
Roles:  ADMIN
Params: id: string (employeeCode)
200:    Employee
404:    not found
```

#### `PUT /employees/:id`
```
Roles:  ADMIN
Body:   Partial<CreateEmployeeRequest>
200:    updated Employee
```

#### `DELETE /employees/:id`
```
Roles:  ADMIN
200:    { success: true }
Notes:  Soft-delete; deactivated employees excluded from all GET responses
```

#### `PATCH /employees/:id/toggle-access`
```
Roles:  ADMIN
Body:   { allowLogin: boolean }
200:    { success: true }
```

---

### 9.4 Courier Partners

#### `GET /courier-partners`
```
Roles:  ADMIN, OPERATOR, COURIER
200:    CourierPartner[]
```

#### `POST /courier-partners`
```
Roles:  ADMIN, OPERATOR
Body:   { courierName: string, trackingUrlTemplate?: string }
201:    CourierPartner
```

#### `GET /courier-partners/:id`
```
Roles:  ADMIN, OPERATOR, COURIER
Params: id: number
200:    CourierPartner
```

#### `PUT /courier-partners/:id`
```
Roles:  ADMIN, OPERATOR
Body:   Partial<{ courierName: string, trackingUrlTemplate: string }>
200:    updated CourierPartner
```

#### `DELETE /courier-partners/:id`
```
Roles:  ADMIN, OPERATOR
200:    { success: true }
```

---

### 9.5 Senders

#### `GET /senders`
```
Roles:  ADMIN, OPERATOR
200:    Party[]
```

#### `POST /senders`
```
Roles:  ADMIN, OPERATOR
Body:   CreatePartyRequest
201:    Party
```

#### `GET /senders/:id`
```
Roles:  ADMIN, OPERATOR
Params: id: number
200:    Party
```

#### `PUT /senders/:id`
```
Roles:  ADMIN, OPERATOR
Body:   Partial<CreatePartyRequest>
200:    updated Party
```

#### `DELETE /senders/:id`
```
Roles:  ADMIN, OPERATOR
200:    { success: true }
```

#### `GET /senders/lookup?phone=<phone>`
```
Roles:  ADMIN, OPERATOR
Query:  phone: string
200:    Party | null
Notes:  Searches both senders AND receivers; use for auto-fill
```

#### `GET /senders/lookup-by-name?name=<partial>`
```
Roles:  ADMIN, OPERATOR
Query:  name: string (partial match)
200:    Party[]
```

#### `GET /senders/names`
```
Roles:  ADMIN, OPERATOR
200:    string[]  (distinct party names for autocomplete)
```

#### `GET /senders/phones`
```
Roles:  ADMIN, OPERATOR
200:    string[]  (distinct party phones for autocomplete)
```

#### `GET /senders/:id/addresses`
```
Roles:  ADMIN, OPERATOR
Params: id: number
200:    PartyAddress[]
```

#### `POST /senders/:id/addresses`
```
Roles:  ADMIN, OPERATOR
Params: id: number
Body:   CreateAddressRequest
201:    PartyAddress
```

---

### 9.6 Receivers

*Mirror of Senders — identical endpoint signatures, replace `/senders` with `/receivers`.*

```
GET    /receivers
POST   /receivers
GET    /receivers/:id
PUT    /receivers/:id
DELETE /receivers/:id
GET    /receivers/lookup?phone=<phone>
GET    /receivers/lookup-by-name?name=<partial>
GET    /receivers/names
GET    /receivers/phones
GET    /receivers/:id/addresses
POST   /receivers/:id/addresses
```

---

### 9.7 Order Pipeline

#### `GET /orders`
```
Roles:  ADMIN, OPERATOR, COURIER
Query:  page?: number, limit?: number, status?: DerivedStatus
200:    PaginatedResponse<OrderListItem>
```

#### `POST /orders`
```
Roles:  ADMIN, OPERATOR
Body:   CreateOrderRequest
201:    OrderAggregate
Notes:
  - Mode B (receivers array): each receiver gets its own parcel
  - Mode A (products array at root): sender is the sole receiver
  - Each created parcel starts at PENDING
  - parcelId format: "PCL-{orderId}-{parcelDetailsId}"
  - Frontend is responsible for generating the QR code from parcelId
```

#### `GET /orders/:id`
```
Roles:  ADMIN, OPERATOR, COURIER
Params: id: number
200:    OrderAggregate
404:    order not found
```

#### `PUT /orders/:id`
```
Roles:  ADMIN, OPERATOR
Params: id: number
Body:   UpdateOrderRequest
200:    updated OrderAggregate
400:    any parcel in the order is AWB_LINKED or beyond
Notes:
  - FULL array required — receivers/products omitted from the array are soft-deleted
  - receivers with receiverDetailsId → update; without → insert
  - products with orderItemId → update; without → insert; omit → delete
  - Removing a receiver auto-cancels its parcel
```

#### `DELETE /orders/:id/cancel`
```
Roles:  ADMIN, OPERATOR
Params: id: number
200:    { success: true }
Notes:  Cancels all non-dispatched parcels in the order
```

---

### 9.8 Parcels — Read

#### `GET /parcels`
```
Roles:  ADMIN, OPERATOR, COURIER
Query:  page?: number, limit?: number, orderCode?: string, parcelId?: string
200:    PaginatedResponse<Parcel>
```

#### `GET /parcels/:id`
```
Roles:  ADMIN, OPERATOR, COURIER
Params: id: number  (parcelDetailsId)
200:    Parcel
```

#### `GET /parcels/:id/label-data`
```
Roles:  ADMIN, OPERATOR
Params: id: number
200:    Parcel  (same shape; triggers internal label print counter increment)
Notes:  Call this endpoint when the label is rendered — it records the print event
```

#### `GET /parcels/:id/timeline`
```
Roles:  ADMIN, OPERATOR, COURIER
Params: id: number
200:    ParcelEvent[]  (append-only; chronological)
```

---

### 9.9 Label Print Logging

#### `POST /parcels/:id/log-print`
```
Roles:  ADMIN, OPERATOR
Params: id: number
Body:   (none)
200:    { parcelDetailsId, parcelId, status: "LABEL_PRINTED" }
400:    parcel is not in PENDING status
```

---

### 9.10 Scan Operation

#### `POST /parcels/scan`
```
Roles:  ADMIN, OPERATOR, COURIER
Body:   ScanRequest  { parcelId: string, awbNumber: string }
200:    updated Parcel
400:    parcel is not LABEL_PRINTED (prerequisite not met)
Notes:
  - OPERATOR role → parcel moves to AWB_LINKED
  - COURIER role  → parcel moves directly to DISPATCHED (auto-dispatch)
  - Both the QR scan (parcelId) and AWB scan are one atomic call
  - Both events are logged sequentially in receiver_status_details
```

---

### 9.11 Dispatch & Terminal States

#### `POST /parcels/dispatch`
```
Roles:  ADMIN, OPERATOR
Body:   DispatchRequest  { parcelDetailsIds: number[] }  // min 1
200:    { success: true, dispatched: number[] }
400:    any parcel in the list is not AWB_LINKED
```

#### `PATCH /parcels/:id/deliver`
```
Roles:  ADMIN, OPERATOR
Params: id: number
Body:   (none)
200:    updated Parcel  (status: "DELIVERED")
400:    parcel is not DISPATCHED
Notes:  Terminal state — no further transitions possible
```

#### `PATCH /parcels/:id/cancel`
```
Roles:  ADMIN, OPERATOR
Params: id: number
Body:   (none)
200:    updated Parcel  (status: "CANCELLED")
400:    parcel is already DISPATCHED or DELIVERED
Notes:  Terminal state — no further transitions possible
```

---

### 9.12 Parcel Events & Audit

#### `GET /parcel-events`
```
Roles:  ADMIN, OPERATOR
Query:  page?: number, limit?: number
200:    PaginatedResponse<ParcelEvent>
```

#### `GET /parcel-events/export`
```
Roles:  ADMIN, OPERATOR
200:    text/csv download
Headers: Content-Type: text/csv
Notes:  Contains all events across all parcels; handle as file download
```

---

### 9.13 Dashboard *(ADMIN only)*

#### `GET /dashboard/metrics`
```
Roles:  ADMIN
200:    DashboardMetrics
Notes:
  - TotalOrders, PendingOrders, DispatchedOrders, DeliveredOrders are current fields
  - totalOrders and parcelsByStatus are @deprecated — do not use in new UI
```

---

### 9.14 Bulk Upload

#### `POST /bulk-uploads`
```
Roles:  ADMIN, OPERATOR
Body:   BulkUploadPayload
201:    BulkUploadCreated  { sessionId, successfulOrders, failedRows }
409:    sessionHash already exists (duplicate submission)
400:    Zod validation failure (no session created)
Notes:
  - sessionHash: client-computed SHA-256 or MD5 of JSON.stringify(rows)
  - Rows processed independently — one failure never aborts the batch
  - successfulOrders + failedRows always equals rows.length
  - If failedRows > 0, call GET /bulk-uploads/:sessionId/errors
```

#### `GET /bulk-uploads`
```
Roles:  ADMIN, OPERATOR
200:    BulkUploadSession[]
```

#### `GET /bulk-uploads/:id`
```
Roles:  ADMIN, OPERATOR
Params: id: number
200:    { session: BulkUploadSession, details: BulkUploadDetail[] }
404:    session not found
```

#### `GET /bulk-uploads/:sessionId/errors`
```
Roles:  ADMIN, OPERATOR
Params: sessionId: number
200:    BulkUploadErrorRow[]  (empty array if no errors)
Notes:  rowData is always a parsed object — never a raw JSON string
```

---

### 9.15 Notifications

#### `POST /parcels/:id/notify`
```
Roles:  ADMIN, OPERATOR
Params: id: number
Body:   (none)
200:    { success: true }
```

#### `GET /parcels/:id/notifications`
```
Roles:  ADMIN, OPERATOR
Params: id: number
200:    notification history array
```

#### `POST /notifications/:id/resend`
```
Roles:  ADMIN, OPERATOR
Params: id: number  (notification ID)
Body:   (none)
200:    { success: true }
```

#### `POST /notifications/webhook`
```
Auth:   none (external)
Body:   { notificationId: number, status: 'sent'|'delivered'|'failed', externalId?: string }
200:    { success: true }
```

---

## 10. Error Response Catalog

| HTTP Status | Meaning | Common Causes |
|------------|---------|---------------|
| `400` | Bad request / business rule violation | Invalid state transition, diff conflict, Zod validation error |
| `401` | Unauthenticated | Missing/expired JWT |
| `403` | Forbidden | `allowLogin: false` on login; role lacks permission for endpoint |
| `404` | Resource not found | Wrong ID in URL param |
| `409` | Conflict | Duplicate `sessionHash` on bulk upload |
| `422` | Unprocessable entity | Structurally valid payload but semantically rejected |
| `500` | Internal server error | Unexpected DB error; error message is sanitised (no raw SQL) |

All errors return: `{ success: false, error: "<message>" }`

---

## 11. Key Workflow Sequences

### 11.1 Create and Print a Label

```
1. POST /orders           → get orderId, receivers[].parcel.parcelId
2. POST /parcels/:id/log-print  → status: LABEL_PRINTED
3. GET  /parcels/:id/label-data → render label; use parcelId string as QR content
   (Frontend generates QR code from parcelId — backend does not)
```

### 11.2 Scan → Dispatch → Deliver

```
OPERATOR flow:
1. POST /parcels/scan  { parcelId, awbNumber }   → status: AWB_LINKED
2. POST /parcels/dispatch  { parcelDetailsIds }   → status: DISPATCHED
3. PATCH /parcels/:id/deliver                     → status: DELIVERED

COURIER flow (collapsed):
1. POST /parcels/scan  { parcelId, awbNumber }   → status: DISPATCHED (auto)
2. PATCH /parcels/:id/deliver                     → status: DELIVERED
```

### 11.3 Bulk Upload

```
1. Build rows array from source data (IDs only — no free-text names)
2. Compute sessionHash = SHA-256(JSON.stringify(rows))
3. POST /bulk-uploads  { sessionHash, fileName, rows }
   → { sessionId, successfulOrders, failedRows }
4. If failedRows > 0:
   GET /bulk-uploads/:sessionId/errors
   → [{ rowData, errorMessage }]
   Show each errorMessage next to the original rowData for correction
5. To re-submit corrected rows: fix data → new hash → new POST /bulk-uploads
```

### 11.4 Edit an Order

```
1. GET  /orders/:id  → load full OrderAggregate into form state
2. Check: if any receiver.parcel.status >= AWB_LINKED → disable edit (show tooltip)
3. User edits; frontend mutates the in-memory state
4. On save: PUT /orders/:id  { full state of all receivers + products }
   - Include receiverDetailsId on existing receivers (from step 1 response)
   - Include orderItemId on existing products
   - Omit deleted receivers/products entirely from the array
5. Backend diffs and applies atomically
```

---

## 12. Field Constraints Summary

| Field | Type | Constraint |
|-------|------|-----------|
| `parcelId` (scan) | `string` | min 1 char; format `PCL-{n}-{n}` |
| `awbNumber` | `string` | min 1 char |
| `parcelDetailsIds` (dispatch) | `number[]` | min 1 item; each positive int |
| `sessionHash` | `string` | min 1 char; must be unique across sessions |
| `rows` (bulk upload) | array | min 1 item |
| `receivers` (per row) | array | min 1 item |
| `products` (per receiver) | array | min 1 item |
| `variationId` | `number` | positive int |
| `quantity` | `number` | positive int |
| `receiverPhone` | `string` | min 10 chars |
| `senderId`, `receiverId`, `senderAddressId`, `receiverAddressId` | `number` | positive int; must exist in Party Master |
| `notificationId` (webhook) | `number` | positive int |
| `status` (webhook) | `string` | enum: `'sent' \| 'delivered' \| 'failed'` |

---

## 13. ID Formats Reference

| Identifier | Format | Example |
|-----------|--------|---------|
| `orderCode` | `ORD-{year}-{sequence}` | `ORD-2026-001` |
| `parcelId` | `PCL-{orderId}-{parcelDetailsId}` | `PCL-1-1` |
| `employeeCode` | `EMP-{sequence}` | `EMP-001` |
| `parcelDetailsId` | positive integer | `1` |
| Party IDs | positive integer | `1` |

---

## 14. Lookup Dependency Map

Before creating an order or bulk upload row, the frontend must resolve these IDs:

```
Sender name/phone  →  GET /senders/lookup?phone=<phone>  →  senderId
Sender address     →  GET /senders/:id/addresses          →  senderAddressId
Receiver name/phone → GET /receivers/lookup?phone=<phone> → receiverId
Receiver address   →  GET /receivers/:id/addresses         →  receiverAddressId
Courier            →  GET /courier-partners                →  courierId
Product variation  →  GET /products/dropdown               →  variationId
```

Free-text names are **not accepted** in order or bulk upload payloads. All entity references must be resolved to their numeric IDs before submission.
