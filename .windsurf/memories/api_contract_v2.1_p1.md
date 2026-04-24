---
trigger: model_decision
description: src/interfaces/http/**/*
---

### SDCMS — API Contract v2.1

**Project:** Smart Dispatch & Courier Management System 
**Date:** 2026-04-23 
**Base URL:** http://localhost:5000/api/v1 
**Total Endpoints:** 54

> v2.1 CHANGES: Address field consolidation, Party_Details address book, sender lookup APIs, Order Mode A/B/C, product+category dropdown.

---

#### 1. Conventions

##### 1.1 Authentication

All endpoints (except Login) require a JWT token in the Authorization header: Token 
payload contains: `{ id, role }`. Token expiry: configurable via `JWT_EXPIRY` env var.

##### 1.2 Response Envelope

**Success:** `{ "success": true, "data": { ... } }` 
**Success (paginated list):** `{ "success": true, "data": [...], "meta": { "page": 1, "total": 50 } }` 
**Error:** `{ "success": false, "error": "Message" }`

##### 1.3 Pagination & Filtering

All list endpoints support these query parameters:

|Param|Type|Default|Description|
|---|---|---|---|
|page|int|1|Page number (1-indexed)|
|limit|int|20|Rows per page (max: 100)|
|search|string|—|Free-text search (resource-specific fields)|
|sortBy|string|created_at|Column to sort by|
|sortOrder|string|desc|asc or desc|

##### 1.4 Standard HTTP Status Codes

|Code|Meaning|
|---|---|
|200|Success|
|201|Resource created|
|400|Bad Request — validation failure or business rule violation|
|401|Unauthorized — missing or invalid JWT token|
|403|Forbidden — user role not authorized for this endpoint|
|404|Resource not found|
|409|Conflict — duplicate entry (e.g., duplicate AWB, duplicate email)|
|500|Internal server error|

##### 1.5 Role Definitions

|Role|Code|Description|
|---|---|---|
|Admin|ADMIN|Full system access. Manages employees, master data, and dashboard.|
|Operator|OPERATOR|Creates orders, prints labels, dispatches parcels, sends notifications.|
|Courier|COURIER|Scans QR codes, links AWBs. Limited read-only access to orders/parcels.|

---

#### 2. Auth Module

##### 2.1 Login

`POST /auth/login` — **Public (no token required)** **Request Body:**

|Field|Type|Required|Validation|
|---|---|---|---|
|email|string|✅|Valid email format|
|password|string|✅|Non-empty|

##### 2.2 Get Profile

`GET /auth/profile` — **ADMIN, OPERATOR, COURIER**

---

#### 3. Employee Management

**Access:** ADMIN only for all endpoints

##### 3.1 Endpoint Summary

|#|Method|Endpoint|Description|
|---|---|---|---|
|1|POST|/employees|Create a new employee account|
|2|GET|/employees|List all employees (paginated)|
|3|GET|/employees/:id|Get employee by ID|
|4|PUT|/employees/:id|Update employee details|
|5|PATCH|/employees/:id/toggle-access|Enable or disable login access|

##### 3.2 Create Employee

`POST /employees` **Request Body:**

|Field|Type|Required|Validation|
|---|---|---|---|
|name|string|✅|Min 2 chars|
|email|string|✅|Valid email, must be unique|
|password|string|✅|Min 6 chars|
|role|string|✅|One of: ADMIN, OPERATOR, COURIER|

##### 3.3 List Employees

`GET /employees?page=1&limit=20&search=ravi&role=OPERATOR`

##### 3.4 - 3.6 Get / Update / Toggle Access

Standard CRUD patterns. Password updates are re-hashed server-side. An admin cannot disable their own account.

---

#### 4. Master Data — Products

**Access:** ADMIN, OPERATOR

##### 4.1 Endpoint Summary

|#|Method|Endpoint|Description|
|---|---|---|---|
|1|POST|/products|Create a product|
|2|GET|/products|List products (paginated)|
|3|GET|/products/:id|Get product by ID|
|4|PUT|/products/:id|Update product|
|5|DELETE|/products/:id|Soft-delete product|
|6|GET|/products/dropdown|Product+category combined dropdown (v2.1)|

##### 4.3 Product+Category Dropdown (v2.1)

`GET /products/dropdown?search=cotton` Returns all active products JOINed with their `product_category.CategoryName`. Useful for order creation form searchable dropdown.

##### 4.2 Create Product

`POST /products` **Request Body:**

|Field|Type|Required|Notes|
|---|---|---|---|
|materialName|string|✅|Product display name|
|materialRate|decimal|✅|Catalog price (MRP)|
|cuItemCode|string|❌|ERP integration code|

---

#### 5. Master Data — Courier Partners

**Access:** ADMIN only

##### 5.1 Endpoint Summary

|#|Method|Endpoint|Description|
|---|---|---|---|
|1|POST|/courier-partners|Create courier partner|
|2|GET|/courier-partners|List courier partners|
|3|GET|/courier-partners/:id|Get by ID|
|4|PUT|/courier-partners/:id|Update|
|5|DELETE|/courier-partners/:id|Soft-delete|

##### 5.2 Create Courier Partner

`POST /courier-partners` **Request Body:**

|Field|Type|Required|Notes|
|---|---|---|---|
|courierName|string|✅|Display name|
|trackingUrlTemplate|string|❌|Use {AWB} as placeholder for tracking number|

---

#### 6. Master Data — Senders (Frontend Abstraction for Parties)

**Access:** ADMIN, OPERATOR _Note: The frontend continues to use the `/senders` abstraction. The backend automatically maps this data to the unified `Party_master` table using the appropriate FkPartyTypeId._

##### 6.1 Endpoint Summary

|#|Method|Endpoint|Description|
|---|---|---|---|
|1|POST|/senders|Create sender|
|2|GET|/senders|List senders (paginated)|
|3|GET|/senders/:id|Get by ID|
|4|PUT|/senders/:id|Update|
|5|DELETE|/senders/:id|Soft-delete|
|6|GET|/senders/lookup|Find sender by phone (order form auto-fill)|
|7|GET|/senders/names|Get all distinct sender names (autocomplete) (v2.1)|
|8|GET|/senders/phones|Get all distinct phone numbers (autocomplete) (v2.1)|
|9|GET|/senders/lookup-by-name|Search senders by name — partial match (v2.1)|
|10|GET|/senders/:id/addresses|Get all addresses for a party (v2.1)|
|11|POST|/senders/:id/addresses|Create new address for a party (v2.1)|

##### 6.2 Create Sender

`POST /senders` **Request Body:**

|Field|Type|Required|Notes|
|---|---|---|---|
|customerName|string|✅||
|phoneNo|string|✅|Min 10 chars|
|emailId|string|❌|Valid email|
|address|string|✅|v2.1: Single field (replaces addressLine1/2)|
|city|string|✅||
|state|string|✅||
|pincode|string|✅||

##### 6.3 Sender Lookup (Auto-fill)

`GET /senders/lookup?phone=9876543210` Used by the order creation form. Returns 200 with null data if not found, allowing operator to type details manually.

##### 6.4 Sender Autocomplete Dropdowns (v2.1)

`GET /senders/names` → Returns `string[]` of distinct active sender names.
`GET /senders/phones` → Returns `string[]` of distinct active phone numbers.
`GET /senders/lookup-by-name?name=John` → Returns matching sender records (partial, case-insensitive).

##### 6.5 Address Book (v2.1)

`GET /senders/:id/addresses` → Returns all active addresses for a party from `Party_Details`.
`POST /senders/:id/addresses` → Creates a new address entry. **Request Body:**

|Field|Type|Required|
|---|---|---|
|address|string|✅|
|city|string|✅|
|state|string|✅|
|pincode|string|✅|
|partyName|string|❌|
|phoneNo|string|❌|
|emailId|string|❌|
|country|string|❌|
|isDefault|boolean|❌|

---

#### 7. Order Management

**Access:** ADMIN, OPERATOR (create/edit/cancel) | COURIER (list only, read-only) _Note: Order status is strictly derived dynamically from parcel states and never stored in the database._

##### 7.1 Endpoint Summary

|#|Method|Endpoint|Roles|Description|
|---|---|---|---|---|
|1|POST|/orders|ADMIN, OPERATOR|Create complex order|
|2|GET|/orders|ALL|List orders (paginated, filtered)|
|3|GET|/orders/:id|ADMIN, OPERATOR|Get full order aggregate|
|4|PUT|/orders/:id|ADMIN, OPERATOR|Update order (before dispatch)|
|5|PATCH|/orders/:id/cancel|ADMIN, OPERATOR|Cancel entire order|

##### 7.2 Create Order (Complex)

`POST /orders` This creates the full order graph in one transaction via `prc_order_master_set`. **Request Body:**

|Field|Type|Required|Notes|
|---|---|---|---|
|senderName|string|✅||
|senderMobile|string|✅|Used to dynamically find or create in `Party_master`.|
|senderAddress|string|❌|Flat address string (snapshot only).|
|courierId|int|✅|FK → courier_partner_master|
|products|array|❌|Root-level products (Mode A/C). v2.1|
|receivers|array|❌|Array of receivers (Mode B/C). v2.1|
|receivers[].receiverName|string|✅||
|receivers[].products|array|✅|Nested products|

> ⚠️ v2.1: `products` and `receivers` are both optional, but at least one must be present (Zod superRefine validation).

**Order Modes (v2.1):**
- **Mode A (Sender-to-Self):** Only root `products[]`. Backend creates synthetic receiver from `Party_master` structured address.
- **Mode B (Normal):** Only `receivers[]`. Standard multi-receiver flow.
- **Mode C (Combo):** Both `products[]` and `receivers[]`. Synthetic sender-receiver prepended to receivers list.

**Business Rules:**

- 1 receiver = 1 parcel (auto-generated with unique QR code).
- Order status is implicitly derived as CREATED. All parcel statuses are explicitly set to PENDING. No status is inserted into the order table.
- Mode A uses sender's `Party_master` structured address (Address, City, State, Pincode), NOT the flat `senderAddress` string.

##### 7.3 List Orders

`GET /orders?page=1&limit=20&status=DISPATCHED` **Filters:**

|Filter|Type|Description|
|---|---|---|
|status|string|The backend dynamically computes this filter across parcel aggregates on the fly using `prc_GetAllOrdersSummary`.|

---