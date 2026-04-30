This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.agent/
  agents/
    documentation-writer.md
  rules/
    api_contract_v2.2_p1.md
    api_contract_v2.2_p2.md
    api_procedure_spec_v2.1.md
    backend_implementation_plan_v5.md
    db_schema_v3.md
    system_flow_v2.3.md
  workflows/
    retrofit_backend_v1.md
    sync_artifact_v1.md
.windsurf/
  memories/
    api_contract_v2.2_p1.md
    api_contract_v2.2_p2.md
    api_procedure_spec_v2.1.md
    backend_implementation_plan_v5.md
    db_schema_v3.md
    system_flow_v2.3.md
bruno/
  !Order of Docs.png
  Authentication.zip
  Bulk Upload.zip
  Courier Partners.zip
  Dashboard.zip
  Dispatch and Terminal States.zip
  Employee Management (ADMIN).zip
  Label Print Logging.zip
  Notification.zip
  Order Pipeline.zip
  Parcel Events & Audit Export.zip
  Parcels Retrieval and Label Data.zip
  Product Catalog.zip
  Receivers.zip
  Senders.zip
  Two Scan Operations.zip
bruno-html-docs/
  Authentication-documentation.html
  Bulk Upload-documentation.html
  Courier Partners-documentation.html
  Dashboard-documentation.html
  Dispatch and Terminal States-documentation.html
  Employee Management (ADMIN)-documentation.html
  Label Print Logging-documentation.html
  Notification-documentation.html
  Order Pipeline-documentation.html
  Parcel Events & Audit Export-documentation.html
  Parcels Retrieval and Label Data-documentation.html
  Product Catalog-documentation.html
  Receivers-documentation.html
  Senders-documentation.html
  Two Scan Operations-documentation.html
docs/
  api/
    authentication-documentation.html
    bulk-upload-documentation.html
    courier-partners-documentation.html
    dashboard-documentation.html
    dispatch-terminal-documentation.html
    employee-management-documentation.html
    label-print-documentation.html
    notification-documentation.html
    order-pipeline-documentation.html
    parcel-events-documentation.html
    parcels-retrieval-documentation.html
    product-catalog-documentation.html
    receivers-documentation.html
    scan-operations-documentation.html
    senders-documentation.html
scripts/
  api-manifest.yaml
  generate-api-docs.js
src/
  infrastructure/
    database/
      db.js
      seeders.js
  interfaces/
    http/
      controllers/
        auth.controller.js
        bulk-upload.controller.js
        courier.controller.js
        dashboard.controller.js
        employee.controller.js
        notification.controller.js
        order.controller.js
        parcel-events.controller.js
        parcel.controller.js
        product.controller.js
        receiver.controller.js
        sender.controller.js
        system.controller.js
      routes/
        auth.routes.js
        bulk-upload.routes.js
        courier.routes.js
        dashboard.routes.js
        employee.routes.js
        notification.routes.js
        order.routes.js
        parcel-events.routes.js
        parcel.routes.js
        product.routes.js
        receiver.routes.js
        sender.routes.js
        system.routes.js
      validations/
        bulk-upload.validation.js
        notification.validation.js
        parcel.validation.js
        validation.schemas.js
  modules/
    auth/
      auth.service.js
    bulk-upload/
      bulk-upload.repository.js
      bulk-upload.service.js
    courier/
      courier.repository.js
      courier.service.js
    dashboard/
      dashboard.repository.js
      dashboard.service.js
    employee/
      employee.repository.js
      employee.service.js
    notification/
      notification.repository.js
      notification.service.js
    order/
      order.repository.js
      order.seed.js
      order.service.js
    parcel/
      parcel.repository.js
      parcel.seed.js
      parcel.service.js
    product/
      product.repository.js
      product.service.js
    sender/
      sender.repository.js
      sender.service.js
  shared/
    middleware/
      auth.middleware.js
      error.middleware.js
      validate.middleware.js
    utils/
      generateToken.js
  app.js
  server.js
test_data/
  Address_Test_Data.txt
  Auth_Test_Data.txt
  BulkUpload_Test_Data.txt
  Courier_Test_Data.txt
  Dashboard_Test_Data.txt
  Dispatch_Test_Data.txt
  Employee_Test_Data.txt
  LabelPrint_Test_Data.txt
  Notification_Test_Data.txt
  Order_Test_Data.txt
  Parcel_Test_Data.txt
  ParcelEvents_Test_Data.txt
  Product_Test_Data.txt
  ProductDropdown_Test_Data.txt
  ReceiverLookup_Test_Data.txt
  Scan_Test_Data.txt
  Sender_Test_Data.txt
  SenderLookup_Test_Data.txt
tests/
  e2e/
    mock_api.test.js
.antigravityignore
.editorconfig
.env.example
.gitattributes
.gitignore
.nvmrc
API_CHANGELOG.md
Auth_Login_Fix_Test_Data.txt
jest.config.js
package.json
README.md
```

# Files

## File: .agent/agents/documentation-writer.md
````markdown
---
name: documentation-writer
description: Expert in technical documentation. Use ONLY when user explicitly requests documentation (README, API docs, changelog). DO NOT auto-invoke during normal development.
tools: Read, Grep, Glob, Bash, Edit, Write
model: inherit
skills: clean-code, documentation-templates
---

# Documentation Writer

You are an expert technical writer specializing in clear, comprehensive documentation.

## Core Philosophy

> "Documentation is a gift to your future self and your team."

## Your Mindset

- **Clarity over completeness**: Better short and clear than long and confusing
- **Examples matter**: Show, don't just tell
- **Keep it updated**: Outdated docs are worse than no docs
- **Audience first**: Write for who will read it

---

## Documentation Type Selection

### Decision Tree

```
What needs documenting?
│
├── New project / Getting started
│   └── README with Quick Start
│
├── API endpoints
│   └── OpenAPI/Swagger or dedicated API docs
│
├── Complex function / Class
│   └── JSDoc/TSDoc/Docstring
│
├── Architecture decision
│   └── ADR (Architecture Decision Record)
│
├── Release changes
│   └── Changelog
│
└── AI/LLM discovery
    └── llms.txt + structured headers
```

---

## Documentation Principles

### README Principles

| Section | Why It Matters |
|---------|---------------|
| **One-liner** | What is this? |
| **Quick Start** | Get running in <5 min |
| **Features** | What can I do? |
| **Configuration** | How to customize? |

### Code Comment Principles

| Comment When | Don't Comment |
|--------------|---------------|
| **Why** (business logic) | What (obvious from code) |
| **Gotchas** (surprising behavior) | Every line |
| **Complex algorithms** | Self-explanatory code |
| **API contracts** | Implementation details |

### API Documentation Principles

- Every endpoint documented
- Request/response examples
- Error cases covered
- Authentication explained

---

## Quality Checklist

- [ ] Can someone new get started in 5 minutes?
- [ ] Are examples working and tested?
- [ ] Is it up to date with the code?
- [ ] Is the structure scannable?
- [ ] Are edge cases documented?

---

## When You Should Be Used

- Writing README files
- Documenting APIs
- Adding code comments (JSDoc, TSDoc)
- Creating tutorials
- Writing changelogs
- Setting up llms.txt for AI discovery

---

> **Remember:** The best documentation is the one that gets read. Keep it short, clear, and useful.
````

## File: .agent/rules/api_contract_v2.2_p2.md
````markdown
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
|Product Dropdown (+ categories)|✅|✅|❌|
|Courier Partners (CRUD)|✅|❌|❌|
|Senders (Parties CRUD)|✅|✅|❌|
|Sender Lookups (names/phones/name-search)|✅|✅|❌|
|Address Book (Party_Details)|✅|✅|❌|
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
|49|GET|/api/v1/senders/names|6.4|
|50|GET|/api/v1/senders/phones|6.4|
|51|GET|/api/v1/senders/lookup-by-name|6.4|
|52|GET|/api/v1/senders/:id/addresses|6.5|
|53|POST|/api/v1/senders/:id/addresses|6.5|
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
|54|GET|/api/v1/products/dropdown|4.3|
````

## File: .agent/rules/api_procedure_spec_v2.1.md
````markdown
---
trigger: model_decision
description: Defines API-to-MySQL stored procedure contracts (v2). Outlines backend vs DB responsibilities (validation vs transactions) and prc_LogReceiverStatus logging. Load when writing Repositories, mapping payloads, or translating MySQL errors.
---

# SDCMS — API ↔ Stored Procedure Contract Specification v2.1

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
| Search Products | (internal) | `prc_product_master_search(pPkProductId, pFkProductCategoryId, pFkUnitId)` |
| Check Duplicate | (internal) | `prc_check_duplicate_product_master(pPkProductId, pFkProductCategoryId, pFkUnitId, pMaterialName)` |

> v2 ADDITION: `pAction = 2` returns products JOINed with `product_category.CategoryName` for dropdown search.

### 5.1 Product Color Matrix APIs (v2.1)

| API | Endpoint | Procedure |
|---|---|---|
| Add/Update Color Matrix | POST /products/:id/matrix | `prc_product_color_matrix_set` (0 = Insert, >0 = Update) |
| Get Color Matrix | GET /products/:id (enrichment) | `prc_product_color_matrix_get` (`pAction = 0`, by ProductId) |

**Procedure Signatures:**

```sql
CALL prc_product_color_matrix_get(pAction INT, pPkProductColorId INT)
-- pAction=0: Get all variations for a product (pass product ID as pPkProductColorId)
-- pAction=1: Get specific matrix entry by PkProductColorId

CALL prc_product_color_matrix_set(
  pPkProductColorId INT,  -- 0=Insert, >0=Update
  pFkProductId INT,
  pFkLuColorId INT,
  pMaterialRate DECIMAL(10,2),
  pSize VARCHAR(50),
  pCreatedBy INT,
  pIsActive INT
)
```

> ✅ v2.1 ADDITION: `lu_color_code` and `product_color_matrix` tables support per-color/size pricing.
> 🔑 Pricing Hierarchy: explicit `unitPrice` → `product_color_matrix.MaterialRate` → `product_master.MaterialRate`.

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
````

## File: .agent/rules/backend_implementation_plan_v5.md
````markdown
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
````

## File: .agent/rules/db_schema_v3.md
````markdown
---
trigger: model_decision
description: Primary reference for the v3 database physical schema (tables, columns, types, and FKs). Use for data structure context. For logic and stored procedures, refer to api_procedure_spec document.
---

## 🔷 MASTER TABLES

### Party_master
- PkPartyId (PK)
- FkPartyTypeId (Sender / Receiver)
- CustomerName
- PhoneNo
- EmailId
- Address (varchar 255 — replaces AddressLine1/AddressLine2)
- City
- State
- Pincode
- CreatedBy (INT FK → employee_master)
- CreatedDate
- UpdatedBy (INT FK → employee_master)
- UpdatedDate
- IsActive

> ⚠️ v2 CHANGE: `AddressLine1` + `AddressLine2` consolidated into single `Address` field.

---

### Party_Details (Address Book)
- PkPartyDetailsId (PK)
- FkPartyId (FK → Party_master)
- PartyName
- PhoneNo
- EmailId
- Address
- City
- State
- Pincode
- Country
- IsActive
- IsDefault (boolean — marks default address for a party)
- CreatedBy (INT FK → employee_master)
- CreatedDate
- UpdatedBy (INT FK → employee_master)
- UpdatedDate

> ✅ NEW in v2: Per-party address book. A party can have multiple shipping addresses.
> Convention: `FkPartyId` links back to `Party_master.PkPartyId`.

---

### product_category
- PkProductCategoryId (PK)
- CategoryName (DEFAULT NULL)
- IsActive
- CreatedDate
- CreatedBy (INT FK → employee_master)
- UpdatedDate
- UpdatedBy (INT FK → employee_master)

> ⚠️ v3 CHANGE: `CategoryName` constraint relaxed from NOT NULL to DEFAULT NULL.
> ⚠️ v3 FIX: `CreatedBy` / `UpdatedBy` corrected from VARCHAR(20) to INT (matches employee_master.EmployeeCode).

---

### product_master
- PkProductId (PK)
- FkProductCategoryId (FK)
- FkUnitId (FK)
- MaterialCode
- MaterialName
- cu_item_code
- MaterialRate
- MaterialDescription
- CreatedBy (INT FK → employee_master)
- CreatedDate
- UpdatedBy (INT FK → employee_master)
- UpdatedDate
- IsActive

---

### lu_color_code
- PkLuColorId (PK, AUTO_INCREMENT)
- ColorName (varchar 50)
- ColorCode (varchar 20)
- CreatedBy (INT FK → employee_master)
- CreatedDate
- IsActive (default 1)

> ✅ NEW in v3: Master lookup table for available product colors.

---

### product_color_matrix
- PkProductColorId (PK, AUTO_INCREMENT)
- FkProductId (FK → product_master)
- FkLuColorId (FK → lu_color_code)
- MaterialRate (decimal 10,2 — catalogue/list price for this specific color+size combination)
- Size (varchar 50)
- CreatedBy (INT FK → employee_master)
- CreatedDate (DEFAULT CURRENT_TIMESTAMP)
- UpdatedBy (INT FK → employee_master)
- UpdatedDate (ON UPDATE CURRENT_TIMESTAMP)
- IsActive (tinyint, default 1)

> ✅ NEW in v3: Maps a product to a color and size, allowing unique pricing per combination.
> 🔑 Pricing Hierarchy: `product_color_matrix.MaterialRate` (specific) > `product_master.MaterialRate` (catalog fallback).

---

### lu_unit
- PkUnitId (PK)
- UnitTitle
- UnitCode
- ConversionFactor
- CreatedDate
- CreatedBy (INT FK → employee_master)
- IsActive

---

### courier_partner_master
- CourierId (PK)
- CourierName (UNIQUE)
- TrackingUrlTemplate
- IsActive

---

### employee_master
- EmployeeCode (INT PK AUTO_INCREMENT)
- FullName
- ContactNumber
- EmailAddress
- UserName
- Password
- FkRoleId
- AllowLogin
- IsActive
- CreatedDate
- CreatedBy (INT FK → employee_master)
- UpdatedDate
- UpdatedBy (INT FK → employee_master)

---

### lu_user_role
- PkUserRoleId (PK)
- RoleCode (UNIQUE)
- RoleDescription
- IsActive

---

### lu_master
- LuMasterId (PK)
- LuMaster
- LuMaster_1
- LuMaster_2
- LuMaster_3

---

### lu_details
- LuDetailsId (PK)
- LuDetails
- LuDetails_1
- LuDetails_2
- LuDetails_3
- LuMasterId (FK)
- IsActive

---

## 🔷 TRANSACTION TABLES

### order_master
- PkOrderId (PK)
- OrderCode (DEFAULT NULL)
- FkSenderId (FK → Party_master)
- OrderDate
- ExpectedDeliveryDate
- TotalAmount
- CreatedBy (INT FK → employee_master)
- CreatedDate
- UpdatedBy (INT FK → employee_master)
- UpdatedDate
- IsActive

> ⚠️ Order status is DERIVED (NOT stored)
> ⚠️ v3 CHANGE: `OrderCode` constraint relaxed from NOT NULL to DEFAULT NULL.

---

### receiver_details
- PkReceiverDetailsId (PK)
- FkOrderId (FK → order_master)
- FkReceiverId (FK → Party_master, optional)
- ReceiverName
- ReceiverPhone
- ReceiverEmail
- Address (varchar 255 — replaces AddressLine1/AddressLine2)
- City
- State
- Pincode
- Country
- IsActive

> ⚠️ v2 CHANGE: `AddressLine1` + `AddressLine2` consolidated into single `Address` field.

---

### order_items
- PkOrderItemId (PK)
- FkReceiverDetailsId (FK → receiver_details)
- FkProductId (FK → product_master)
- OutwardQty
- FkUnitId (FK → lu_unit)
- UnitPrice
- TransactionDate
- IsActive
- CreatedDate
- CreatedBy (INT FK → employee_master)

---

### parcel_details
- PkParcelDetailsId (PK)
- FkReceiverDetailsId (FK → receiver_details)
- FkCourierId (FK → courier_partner_master)
- TrackingNo (AWB)
- QRCode (UNIQUE)
- FkParcelStatusId (FK → lu_details)
- LabelPrintCount
- DispatchDate
- CreatedDate
- CreatedBy (INT FK → employee_master)

> ✅ Constraint:
UNIQUE (FkCourierId, TrackingNo)

---

### receiver_status_details (EVENT LOG)

- PkReceiverStatusDetailsId (PK)
- FkParcelDetailsId (FK → parcel_details) ✅ CRITICAL
- FkReceiverDetailsId (FK → receiver_details)
- FkOrderStatusId (FK → lu_details)
- ActionType (QR_SCAN | AWB_LINK | STATUS_UPDATE | RELINK_AWB)
- AWBNumber (nullable)
- PreviousStatus (nullable)
- CreatedDate
- CreatedBy (INT FK → employee_master)

> ⚠️ Append-only audit + scan log

---

### Notification_log

- PkNotificationLogId (PK)
- FkParcelDetailsId (FK → parcel_details) ✅
- FkReceiverDetailsId (FK → receiver_details) ✅
- FkNotificationTypeId
- FkClientId
- FkPlantId
- FkReasonId
- FkReasonDetailsId
- AppSendStatusId
- SMSSendStatusId
- EmailSendStatusId
- LastNotificationTime
- LastNotificationLevel
- IsActive
- RequestedBy (INT FK → employee_master)
- IsPaymentCheck

---

## 🔷 OPTIONAL (RECOMMENDED)

### courier_awb_prefix_map

- Id (PK)
- FkCourierId
- Prefix

> Used for auto-detecting courier from AWB

---

## 🔷 STATUS DEFINITIONS (lu_details)

### Parcel Status
- Pending
- Label Printed
- AWB Linked
- Dispatched
- Delivered

---

### ActionType (ENUM)
- QR_SCAN
- AWB_LINK
- STATUS_UPDATE
- RELINK_AWB

---

## 🔷 KEY RULES

- QRCode → UNIQUE
- AWB → UNIQUE per courier
- One parcel = one AWB
- LabelPrintCount → increment only
- Logs → append only
- Order status → derived from parcel states
````

## File: .agent/rules/system_flow_v2.3.md
````markdown
---
trigger: model_decision
description: Defines the strict Parcel and Order state transitions (v2.3). Load this when building or validating status flows and state changes. v2.3 adds product color/size matrix and pricing hierarchy. v2.2 adds address consolidation and Order Mode A/B/C.
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
- `MaterialRate` → catalog list price, which acts as the **base fallback** during order creation.

**Table:** **`lu_color_code`** *(NEW in v2.3)* Master lookup for available product colors (`ColorName`, `ColorCode`).

**Table:** **`product_color_matrix`** *(NEW in v2.3)* Maps a specific product to a color and size, with its own `MaterialRate`. This allows unique catalogue pricing per color+size combination.

- `FkProductId` → links to `product_master`.
- `FkLuColorId` → links to `lu_color_code`.
- `Size` → size label (e.g., S, M, L, XL).
- `MaterialRate` → price for this specific color+size combo.

> 🔑 **Pricing Hierarchy (v2.3):** explicit `unitPrice` → `product_color_matrix.MaterialRate` (by colorId+size) → `product_master.MaterialRate` (catalog fallback).

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
- **Pricing Fallback (v2.3):** The backend captures the `UnitPrice`. Resolution chain: (1) explicit `unitPrice` from payload, (2) `product_color_matrix.MaterialRate` if `colorId`+`size` are specified, (3) `product_master.MaterialRate` as the catalog default.
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
````

## File: .agent/workflows/retrofit_backend_v1.md
````markdown
---
description: Retrofits the existing backend codebase to comply with the latest AGENTS.md rules (Zod validation, text-based Bruno tests, and parcel_id transition)
---

// turbo
1. Verify that a `.antigravityignore` file exists in the project root containing `node_modules/`. If missing, create it first. 


2. Create a safety checkpoint. 

// turbo
3. Run `git add -A && git commit -m "chore: checkpoint before backend retrofit"`

// turbo
4. Use `grep` in the terminal to identify all Express route files in `src/` that lack Zod validation imports. 

// parallel
5. Create and integrate strict Zod validation schemas for all identified routes. 

// turbo
6. Use `find . -name "*.bru"` in the terminal to locate all native Bruno files. 

// parallel
7. Convert the configuration of each identified `.bru` file into a new plain-text `[FeatureName]_Test_Data.txt` file, ensuring you include post-request scripts and assertions.
 
8. Run `git rm` on all the old native `.bru` files to remove them safely. (Wait for user approval).

// turbo
9. Use `grep -rn "qr_code" src/` in the terminal to locate any logic that stores, processes, or returns `qr_code` strings/blobs. 

10. Refactor the identified `qr_code` logic to strictly use and return `parcel_id` instead, enforcing that the frontend handles QR generation.

// turbo
11. Run the linter (`npm run lint`) to ensure the refactored code is clean. 

12. Output a structured summary of the retrofitted files.
````

## File: .agent/workflows/sync_artifact_v1.md
````markdown
---
description: Syncs an updated rule or artifact with the codebase, refactors code to match, and automatically bumps the artifact version.
---

1. Ask the user which artifact in `.agent/rules/` was recently updated.
2. Read the specified artifact to understand the new rules, schemas, or API contracts.
3. Create a safety checkpoint.

// turbo
4. Run `git add -A && git commit -m "chore: checkpoint before artifact sync"` 

// turbo
5. Run terminal commands (e.g., `grep -rn "keyword" src/`) to efficiently locate codebase files affected by the artifact update, rather than blindly reading the whole directory.

6. Refactor the necessary codebase files to perfectly match the new artifact definitions.
7. Evaluate the severity of the changes made (minor vs. major).

// turbo
8. Run `git mv` to increment the version number in the artifact's filename (e.g., `git mv .agent/rules/schema_v1.md .agent/rules/schema_v1.1.md`). 

9. Update the description frontmatter inside the artifact file to log the changes and the new version. 

10. Output a summary of the refactored files and the new artifact version.
````

## File: .windsurf/memories/api_contract_v2.2_p2.md
````markdown
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
|Product Dropdown (+ categories)|✅|✅|❌|
|Courier Partners (CRUD)|✅|❌|❌|
|Senders (Parties CRUD)|✅|✅|❌|
|Sender Lookups (names/phones/name-search)|✅|✅|❌|
|Address Book (Party_Details)|✅|✅|❌|
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
|49|GET|/api/v1/senders/names|6.4|
|50|GET|/api/v1/senders/phones|6.4|
|51|GET|/api/v1/senders/lookup-by-name|6.4|
|52|GET|/api/v1/senders/:id/addresses|6.5|
|53|POST|/api/v1/senders/:id/addresses|6.5|
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
|54|GET|/api/v1/products/dropdown|4.3|
````

## File: .windsurf/memories/api_procedure_spec_v2.1.md
````markdown
---
trigger: model_decision
description: Defines API-to-MySQL stored procedure contracts (v2). Outlines backend vs DB responsibilities (validation vs transactions) and prc_LogReceiverStatus logging. Load when writing Repositories, mapping payloads, or translating MySQL errors.
---

# SDCMS — API ↔ Stored Procedure Contract Specification v2.1

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
| Search Products | (internal) | `prc_product_master_search(pPkProductId, pFkProductCategoryId, pFkUnitId)` |
| Check Duplicate | (internal) | `prc_check_duplicate_product_master(pPkProductId, pFkProductCategoryId, pFkUnitId, pMaterialName)` |

> v2 ADDITION: `pAction = 2` returns products JOINed with `product_category.CategoryName` for dropdown search.

### 5.1 Product Color Matrix APIs (v2.1)

| API | Endpoint | Procedure |
|---|---|---|
| Add/Update Color Matrix | POST /products/:id/matrix | `prc_product_color_matrix_set` (0 = Insert, >0 = Update) |
| Get Color Matrix | GET /products/:id (enrichment) | `prc_product_color_matrix_get` (`pAction = 0`, by ProductId) |

**Procedure Signatures:**

```sql
CALL prc_product_color_matrix_get(pAction INT, pPkProductColorId INT)
-- pAction=0: Get all variations for a product (pass product ID as pPkProductColorId)
-- pAction=1: Get specific matrix entry by PkProductColorId

CALL prc_product_color_matrix_set(
  pPkProductColorId INT,  -- 0=Insert, >0=Update
  pFkProductId INT,
  pFkLuColorId INT,
  pMaterialRate DECIMAL(10,2),
  pSize VARCHAR(50),
  pCreatedBy INT,
  pIsActive INT
)
```

> ✅ v2.1 ADDITION: `lu_color_code` and `product_color_matrix` tables support per-color/size pricing.
> 🔑 Pricing Hierarchy: explicit `unitPrice` → `product_color_matrix.MaterialRate` → `product_master.MaterialRate`.

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
````

## File: .windsurf/memories/backend_implementation_plan_v5.md
````markdown
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
````

## File: .windsurf/memories/db_schema_v3.md
````markdown
---
trigger: model_decision
description: Primary reference for the v3 database physical schema (tables, columns, types, and FKs). Use for data structure context. For logic and stored procedures, refer to api_procedure_spec document.
---

## 🔷 MASTER TABLES

### Party_master
- PkPartyId (PK)
- FkPartyTypeId (Sender / Receiver)
- CustomerName
- PhoneNo
- EmailId
- Address (varchar 255 — replaces AddressLine1/AddressLine2)
- City
- State
- Pincode
- CreatedBy
- CreatedDate
- UpdatedBy
- UpdatedDate
- IsActive

> ⚠️ v2 CHANGE: `AddressLine1` + `AddressLine2` consolidated into single `Address` field.

---

### Party_Details (Address Book)
- PkPartyDetailsId (PK)
- FkPartyId (FK → Party_master)
- PartyName
- PhoneNo
- EmailId
- Address
- City
- State
- Pincode
- Country
- IsActive
- IsDefault (boolean — marks default address for a party)
- CreatedBy
- CreatedDate
- UpdatedBy
- UpdatedDate

> ✅ NEW in v2: Per-party address book. A party can have multiple shipping addresses.
> Convention: `FkPartyId` links back to `Party_master.PkPartyId`.

---

### product_category
- PkProductCategoryId (PK)
- CategoryName (DEFAULT NULL)
- IsActive
- CreatedDate
- CreatedBy
- UpdatedDate
- UpdatedBy

> ⚠️ v3 CHANGE: `CategoryName` constraint relaxed from NOT NULL to DEFAULT NULL.
> ⚠️ v3 FIX: `CreatedBy` / `UpdatedBy` corrected from VARCHAR(20) to INT.

---

### product_master
- PkProductId (PK)
- FkProductCategoryId (FK)
- FkUnitId (FK)
- MaterialCode
- MaterialName
- cu_item_code
- MaterialRate
- MaterialDescription
- CreatedBy
- CreatedDate
- UpdatedBy
- UpdatedDate
- IsActive

---

### lu_color_code
- PkLuColorId (PK, AUTO_INCREMENT)
- ColorName (varchar 50)
- ColorCode (varchar 20)
- CreatedBy
- CreatedDate
- IsActive (default 1)

> ✅ NEW in v3: Master lookup table for available product colors.

---

### product_color_matrix
- PkProductColorId (PK, AUTO_INCREMENT)
- FkProductId (FK → product_master)
- FkLuColorId (FK → lu_color_code)
- MaterialRate (decimal 10,2 — catalogue/list price for this specific color+size combination)
- Size (varchar 50)
- CreatedBy
- CreatedDate (DEFAULT CURRENT_TIMESTAMP)
- UpdatedBy
- UpdatedDate (ON UPDATE CURRENT_TIMESTAMP)
- IsActive (tinyint, default 1)

> ✅ NEW in v3: Maps a product to a color and size, allowing unique pricing per combination.
> 🔑 Pricing Hierarchy: `product_color_matrix.MaterialRate` (specific) > `product_master.MaterialRate` (catalog fallback).

---

### lu_unit
- PkUnitId (PK)
- UnitTitle
- UnitCode
- ConversionFactor
- CreatedDate
- CreatedBy
- IsActive

---

### courier_partner_master
- CourierId (PK)
- CourierName (UNIQUE)
- TrackingUrlTemplate
- IsActive

---

### employee_master
- EmployeeCode (PK)
- FullName
- ContactNumber
- EmailAddress
- UserName
- Password
- FkRoleId
- AllowLogin
- IsActive
- CreatedDate
- CreatedBy
- UpdatedDate
- UpdatedBy

---

### lu_user_role
- PkUserRoleId (PK)
- RoleCode (UNIQUE)
- RoleDescription
- IsActive

---

### lu_master
- LuMasterId (PK)
- LuMaster
- LuMaster_1
- LuMaster_2
- LuMaster_3

---

### lu_details
- LuDetailsId (PK)
- LuDetails
- LuDetails_1
- LuDetails_2
- LuDetails_3
- LuMasterId (FK)
- IsActive

---

## 🔷 TRANSACTION TABLES

### order_master
- PkOrderId (PK)
- OrderCode (DEFAULT NULL)
- FkSenderId (FK → Party_master)
- OrderDate
- ExpectedDeliveryDate
- TotalAmount
- CreatedBy
- CreatedDate
- UpdatedBy
- UpdatedDate
- IsActive

> ⚠️ Order status is DERIVED (NOT stored)
> ⚠️ v3 CHANGE: `OrderCode` constraint relaxed from NOT NULL to DEFAULT NULL.

---

### receiver_details
- PkReceiverDetailsId (PK)
- FkOrderId (FK → order_master)
- FkReceiverId (FK → Party_master, optional)
- ReceiverName
- ReceiverPhone
- ReceiverEmail
- Address (varchar 255 — replaces AddressLine1/AddressLine2)
- City
- State
- Pincode
- Country
- IsActive

> ⚠️ v2 CHANGE: `AddressLine1` + `AddressLine2` consolidated into single `Address` field.

---

### order_items
- PkOrderItemId (PK)
- FkReceiverDetailsId (FK → receiver_details)
- FkProductId (FK → product_master)
- OutwardQty
- FkUnitId (FK → lu_unit)
- UnitPrice
- TransactionDate
- IsActive
- CreatedDate
- CreatedBy

---

### parcel_details
- PkParcelDetailsId (PK)
- FkReceiverDetailsId (FK → receiver_details)
- FkCourierId (FK → courier_partner_master)
- TrackingNo (AWB)
- QRCode (UNIQUE)
- FkParcelStatusId (FK → lu_details)
- LabelPrintCount
- DispatchDate
- CreatedDate
- CreatedBy

> ✅ Constraint:
UNIQUE (FkCourierId, TrackingNo)

---

### receiver_status_details (EVENT LOG)

- PkReceiverStatusDetailsId (PK)
- FkParcelDetailsId (FK → parcel_details) ✅ CRITICAL
- FkReceiverDetailsId (FK → receiver_details)
- FkOrderStatusId (FK → lu_details)
- ActionType (QR_SCAN | AWB_LINK | STATUS_UPDATE | RELINK_AWB)
- AWBNumber (nullable)
- PreviousStatus (nullable)
- CreatedDate
- CreatedBy

> ⚠️ Append-only audit + scan log

---

### Notification_log

- PkNotificationLogId (PK)
- FkParcelDetailsId (FK → parcel_details) ✅
- FkReceiverDetailsId (FK → receiver_details) ✅
- FkNotificationTypeId
- FkClientId
- FkPlantId
- FkReasonId
- FkReasonDetailsId
- AppSendStatusId
- SMSSendStatusId
- EmailSendStatusId
- LastNotificationTime
- LastNotificationLevel
- IsActive
- RequestedBy
- IsPaymentCheck

---

## 🔷 OPTIONAL (RECOMMENDED)

### courier_awb_prefix_map

- Id (PK)
- FkCourierId
- Prefix

> Used for auto-detecting courier from AWB

---

## 🔷 STATUS DEFINITIONS (lu_details)

### Parcel Status
- Pending
- Label Printed
- AWB Linked
- Dispatched
- Delivered

---

### ActionType (ENUM)
- QR_SCAN
- AWB_LINK
- STATUS_UPDATE
- RELINK_AWB

---

## 🔷 KEY RULES

- QRCode → UNIQUE
- AWB → UNIQUE per courier
- One parcel = one AWB
- LabelPrintCount → increment only
- Logs → append only
- Order status → derived from parcel states
````

## File: .windsurf/memories/system_flow_v2.3.md
````markdown
---
trigger: model_decision
description: Defines the strict Parcel and Order state transitions (v2.3). Load this when building or validating status flows and state changes. v2.3 adds product color/size matrix and pricing hierarchy. v2.2 adds address consolidation and Order Mode A/B/C.
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
- `MaterialRate` → catalog list price, which acts as the **base fallback** during order creation.

**Table:** **`lu_color_code`** *(NEW in v2.3)* Master lookup for available product colors (`ColorName`, `ColorCode`).

**Table:** **`product_color_matrix`** *(NEW in v2.3)* Maps a specific product to a color and size, with its own `MaterialRate`. This allows unique catalogue pricing per color+size combination.

- `FkProductId` → links to `product_master`.
- `FkLuColorId` → links to `lu_color_code`.
- `Size` → size label (e.g., S, M, L, XL).
- `MaterialRate` → price for this specific color+size combo.

> 🔑 **Pricing Hierarchy (v2.3):** explicit `unitPrice` → `product_color_matrix.MaterialRate` (by colorId+size) → `product_master.MaterialRate` (catalog fallback).

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
- **Pricing Fallback (v2.3):** The backend captures the `UnitPrice`. Resolution chain: (1) explicit `unitPrice` from payload, (2) `product_color_matrix.MaterialRate` if `colorId`+`size` are specified, (3) `product_master.MaterialRate` as the catalog default.
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
````

## File: bruno-html-docs/Bulk Upload-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bulk Upload - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Bulk Upload\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: GET Specific Session Result\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/bulk-uploads/:id'\n      params:\n        - name: id\n          value: '1'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Get Specific Session Result\n\n      Fetch the detailed status and processing results of a specific bulk upload session. This includes summary metadata and an array of individual row results (successes and failures).\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/bulk-uploads/:id` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{token}}\n      ```\n\n      **Path Parameters**\n      * `id`: The unique identifier of the bulk upload session.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data.session.fileName` should be a **String**\n      * `res.body.data.details` should be an **Array**\n  - info:\n      name: List Bulk Upload Sessions\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/bulk-uploads'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## List Upload Sessions\n\n      Retrieve a list of all bulk upload sessions performed by the user. This is useful for tracking the status and history of multiple batch processing requests.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/bulk-uploads` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{token}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": \"bulk_88291\",\n            \"fileName\": \"test_orders.json\",\n            \"totalRows\": 2,\n            \"processedRows\": 2,\n            \"status\": \"completed\",\n            \"createdAt\": \"2026-04-20T09:40:00Z\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data[0].fileName` should be a **String**\n      * `res.body.data[0].totalRows` should be a **Number**\n  - info:\n      name: Submit Bulk Upload\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/bulk-uploads'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \"fileName\": \"test_orders.json\",\n            \"rows\": [\n              {\n                \"senderName\": \"Bulk Sender One\",\n                \"senderMobile\": \"9000000001\",\n                \"senderAddress\": \"123 Bulk Road, Surat\",\n                \"courierId\": 1,\n                \"receivers\": [\n                  {\n                    \"receiverName\": \"Bulk Receiver Alpha\",\n                    \"receiverPhone\": \"8000000001\",\n                    \"addressLine1\": \"A-101, Alpha Towers\",\n                    \"city\": \"Mumbai\",\n                    \"state\": \"Maharashtra\",\n                    \"pincode\": \"400001\",\n                    \"products\": [\n                      {\n                        \"productId\": 1,\n                        \"qty\": 10,\n                        \"unitPrice\": 450.00\n                      }\n                    ]\n                  }\n                ]\n              },\n              {\n                \"senderName\": \"Bulk Sender Two\",\n                \"senderMobile\": \"9000000002\",\n                \"senderAddress\": \"456 Bulk Ave, Delhi\",\n                \"courierId\": 1,\n                \"receivers\": [\n                  {\n                    \"receiverName\": \"Bulk Receiver Beta\",\n                    \"receiverPhone\": \"8000000002\",\n                    \"addressLine1\": \"B-202, Beta Plaza\",\n                    \"city\": \"New Delhi\",\n                    \"state\": \"Delhi\",\n                    \"pincode\": \"110001\",\n                    \"products\": [\n                      {\n                        \"productId\": 2,\n                        \"qty\": 5,\n                        \"unitPrice\": 1200.00\n                      }\n                    ]\n                  }\n                ]\n              }\n            ]\n          }\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Submit Bulk Upload\n\n      This endpoint allows for the batch processing of multiple orders. It accepts a list of senders, receivers, and associated products to streamline high-volume parcel creation.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/bulk-uploads` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{token}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"fileName\": \"test_orders.json\",\n        \"rows\": [\n          {\n            \"senderName\": \"Bulk Sender One\",\n            \"senderMobile\": \"9000000001\",\n            \"senderAddress\": \"123 Bulk Road, Surat\",\n            \"courierId\": 1,\n            \"receivers\": [\n              {\n                \"receiverName\": \"Bulk Receiver Alpha\",\n                \"receiverPhone\": \"8000000001\",\n                \"addressLine1\": \"A-101, Alpha Towers\",\n                \"city\": \"Mumbai\",\n                \"state\": \"Maharashtra\",\n                \"pincode\": \"400001\",\n                \"products\": [\n                  {\n                    \"productId\": 1,\n                    \"qty\": 10,\n                    \"unitPrice\": 450.00\n                  }\n                ]\n              }\n            ]\n          },\n          {\n            \"senderName\": \"Bulk Sender Two\",\n            \"senderMobile\": \"9000000002\",\n            \"senderAddress\": \"456 Bulk Ave, Delhi\",\n            \"courierId\": 1,\n            \"receivers\": [\n              {\n                \"receiverName\": \"Bulk Receiver Beta\",\n                \"receiverPhone\": \"8000000002\",\n                \"addressLine1\": \"B-202, Beta Plaza\",\n                \"city\": \"New Delhi\",\n                \"state\": \"Delhi\",\n                \"pincode\": \"110001\",\n                \"products\": [\n                  {\n                    \"productId\": 2,\n                    \"qty\": 5,\n                    \"unitPrice\": 1200.00\n                  }\n                ]\n              }\n            ]\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Response Structure (Example)**\n\n      **Status Code:** `202 Accepted`\n\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"uploadId\": \"bulk_88291\",\n          \"status\": \"processing\",\n          \"message\": \"Bulk upload has been queued for processing.\"\n        }\n      }\n      ```\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:24:46.997Z'\n    exportedUsing: Bruno/3.2.2\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Dashboard-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Dashboard\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: GET Metrics (ADMIN User)\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/dashboard/metrics'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |\n      ### TEST 1: Get Metrics (ADMIN User)\n      **Description:** Fetches system-wide metrics from DB.\n      **HTTP Method:** GET\n      **URL:** {{baseUrl}}/api/v1/dashboard/metrics\n      **Headers:** \n      - Authorization: Bearer {{adminToken}}\n      - Content-Type: application/json\n\n      **Assertions:**\n      - Status Code: 200\n      - Success: true\n      - Body Path `data`: exists\n      - Body Path `data.totalOrders`: is a number\n      - Body Path `data.totalParcels`: is a number\n\n      ---\n  - info:\n      name: GET Metrics (Unauthenticated)\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/dashboard/metrics'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |\n      ### TEST 3: Get Metrics (Unauthenticated)\n      **Description:** Should fail with 401.\n      **HTTP Method:** GET\n      **URL:** {{baseUrl}}/api/v1/dashboard/metrics\n      **Headers:** \n      - Content-Type: application/json\n\n      **Assertions:**\n      - Status Code: 401\n      - Success: false\n  - info:\n      name: '[OR] - GET Metrics '\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/dashboard/metrics'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |\n      ### TEST 2: Get Metrics (OPERATOR User - Forbidden)\n      **Description:** Should fail with 403.\n      **HTTP Method:** GET\n      **URL:** {{baseUrl}}/api/v1/dashboard/metrics\n      **Headers:** \n      - Authorization: Bearer {{operatorToken}}\n      - Content-Type: application/json\n\n      **Assertions:**\n      - Status Code: 403\n      - Success: false\n      - Error: contains \"is not authorized for this route\"\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:25:44.296Z'\n    exportedUsing: Bruno/3.2.2\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Dispatch and Terminal States-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dispatch and Terminal States - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Dispatch and Terminal States\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: BULK Dispatch Parcels (Happy Path)\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. Dispatch Parcels (Bulk \u2014 Happy Path)\n      Finalizes the warehouse process by moving multiple parcels from the linked stage to the dispatched stage in a single operation.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      Target parcels must be in the `AWB_LINKED` state.\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": [1, 2]\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"dispatched\": 2,\n          \"parcels\": [\n            { \"id\": 1, \"status\": \"DISPATCHED\", \"dispatchDate\": \"2026-04-20T10:45:00Z\" },\n            { \"id\": 2, \"status\": \"DISPATCHED\", \"dispatchDate\": \"2026-04-20T10:45:00Z\" }\n          ]\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**.\n      * `res.body.success` should equal **true**.\n      * **Transition Logic:** Every parcel ID in the array must now show `status: \"DISPATCHED\"`.\n      * **Data Integrity:** A `dispatchDate` timestamp must be generated for each record.\n\n      ---\n\n      ### **Post-Request Verification**\n      * **GET** `{{baseUrl}}/api/v1/parcels/1/timeline`\n      * **Check:** Verify a `STATUS_UPDATE` event exists with `newStatus: \"DISPATCHED\"`.\n\n      ---s\n  - info:\n      name: Cancel Parcel (Happy Path - Before Dispatch)\n      type: http\n      seq: 7\n    http:\n      method: PATCH\n      url: '{{base_url}}/parcels/2/cancel'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 7. Cancel Parcel (Happy Path \u2014 Before Dispatch)\n      Allows the cancellation of a parcel as long as it has not yet left the facility. This is applicable for orders in `PENDING`, `LABEL_PRINTED`, or `AWB_LINKED` states.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/2/cancel` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 2) must be in a pre-dispatch state (e.g., `PENDING`).\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"status\": \"CANCELLED\",\n          \"previousStatus\": \"PENDING\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **State Check:** The status must be successfully updated to **\"CANCELLED\"**.\n\n      ---\n  - info:\n      name: Deliver Parcels (Happy Path)\n      type: http\n      seq: 5\n    http:\n      method: PATCH\n      url: '{{base_url}}/parcels/1/deliver'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Deliver Parcel (Happy Path)\n      Updates a parcel to its final terminal state: `DELIVERED`. This signifies the completion of the delivery lifecycle.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/deliver` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 1) must currently be in the `DISPATCHED` state.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"status\": \"DELIVERED\",\n          \"previousStatus\": \"DISPATCHED\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **State Check:** Confirm the `status` has transitioned to **\"DELIVERED\"**.\n\n      ---\n  - info:\n      name: Return Parcel (Happy Path - After Dispatch)\n      type: http\n      seq: 9\n    http:\n      method: PATCH\n      url: '{base_url}}/parcels/1/return'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 9. Return Parcel (Happy Path \u2014 After Dispatch)\n      Logs a parcel as returned. This terminal state is applicable only after a parcel has been dispatched or delivered, representing a reversal in the logistics flow.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/return` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 1) must be in either the `DISPATCHED` or `DELIVERED` state.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"status\": \"RETURNED\",\n          \"previousStatus\": \"DISPATCHED\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **State Check:** Confirm the `status` has transitioned to **\"RETURNED\"**.\n\n      ---\n\n      Ready for Unit 10 (Return \u2014 State Validation)?\n  - info:\n      name: '[CR]: BULK Dispatch Parcels (Happy Path)'\n      type: http\n      seq: 11\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Courier Role \u2014 Cannot Dispatch\n\n      This test ensures that the dispatch action is restricted to higher-level administrative roles and that users with the `COURIER` role are blocked from executing bulk dispatches.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{courierToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": [1]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * **Validation:** Only `ADMIN` and `OPERATOR` roles are authorized to dispatch parcels.\n  - info:\n      name: Return Parcel (Not Dispatched - Wrong State)\n      type: http\n      seq: 10\n    http:\n      method: PATCH\n      url: '{base_url}}/parcels/1/return'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 10. Return \u2014 Wrong State (Not Dispatched)\n      Ensures that a parcel cannot be marked as \"Returned\" if it never left the facility. The system requires a parcel to have reached at least the `DISPATCHED` state before a return can be processed, as you cannot return what was never sent.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/2/return` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 2) is currently in a pre-dispatch state (e.g., `PENDING` or `LABEL_PRINTED`).\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Invalid state transition: cannot move parcel from 'PENDING' to 'RETURNED'...\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Validation:** The system must block the transition, confirming that a parcel cannot be returned before it is dispatched.\n\n      ---\n  - info:\n      name: Cancel Parcel (Wrong State - Already Dispatched)\n      type: http\n      seq: 8\n    http:\n      method: PATCH\n      url: '{{base_url}}/parcels/2/cancel'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 8. Cancel \u2014 Wrong State (Already Dispatched)\n      Enforces the rule that once a parcel has physically left the facility (status `DISPATCHED`), it can no longer be cancelled through the standard cancellation flow. At this stage, the \"Return\" flow must be used instead.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/cancel` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 1) is already in the `DISPATCHED` state.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Invalid state transition: cannot move parcel from 'DISPATCHED' to 'CANCELLED'...\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Logic Check:** The system must reject the cancellation and inform the user that the transition from `DISPATCHED` is prohibited.\n\n      ---\n  - info:\n      name: Deliver Parcels - Wrong State (Not Dispatched)\n      type: http\n      seq: 6\n    http:\n      method: PATCH\n      url: '{{base_url}}/parcels/1/deliver'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Deliver \u2014 Wrong State (Not Dispatched)\n      Prevents a parcel from being marked as delivered if it hasn't actually been dispatched yet. This logical guard ensures the integrity of the delivery timeline.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/deliver` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 1) is currently in a non-dispatched state (e.g., `PENDING`, `LABEL_PRINTED`, or `AWB_LINKED`).\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Invalid state transition: cannot move parcel from 'PENDING' to 'DELIVERED'...\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Business Logic:** The system must block the transition and return a relevant error message regarding the invalid state sequence.\n\n      ---\n  - info:\n      name: BULK Dispatch Parcels- Wrong State (Still PENDING)\n      type: http\n      seq: 2\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Dispatch \u2014 Wrong State (Still PENDING)\n      Ensures that a parcel cannot be dispatched if the mandatory prerequisite of linking an AWB (Air Waybill) has not been met. This maintains the integrity of the shipping pipeline.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      The parcel (e.g., ID 1) exists but is still in the `PENDING` or `LABEL_PRINTED` state (not yet `AWB_LINKED`).\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": [1]\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot dispatch parcel PDS-A1B2C3: status is 'PENDING'. Dispatch requires AWB_LINKED status.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Logic Check:** The error message must specify that the current status is insufficient for dispatch.\n\n      ---\n  - info:\n      name: BULK Dispatch Parcels \u2014 Parcel Not Found\n      type: http\n      seq: 3\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Dispatch \u2014 Parcel Not Found\n      Validates that the bulk dispatch operation fails correctly when provided with a parcel ID that does not exist in the database.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": [9999]\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `404 Not Found`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Parcel with ID 9999 not found\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **404**\n      * `res.body.success` should equal **false**\n      * **Validation:** The error message should clearly identify the missing ID.\n\n      ---\n  - info:\n      name: BULK Dispatch Parcels \u2014 Validation Error (Empty Array)\n      type: http\n      seq: 4\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Dispatch \u2014 Validation Error (Empty Array)\n      Protects the system from processing empty bulk requests. The API requires at least one parcel ID to initiate a dispatch job.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": []\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Validation Error - parcelIds: At least one parcel ID is required\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Schema Check:** The API must return a validation error when the `parcelIds` array is empty.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:23:56.925Z'\n    exportedUsing: Bruno/3.2.2\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Label Print Logging-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Label Print Logging - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Label Print Logging\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Log Label Print (Happy Path)\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      # LABEL PRINT MODULE \u2014 API Documentation\n      **Sprint 3, Feature B: Label Print Logging**\n\n      ---\n\n      ## 1. Log Label Print (Happy Path)\n      Records the initial printing of a shipping label for a specific parcel. This action triggers a state change in the system and increments the print counter.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Body**\n      *(None Required)*\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-12345\",\n          \"status\": \"LABEL_PRINTED\",\n          \"labelPrintCount\": 1\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **State Transition:** The `status` must update to **\"LABEL_PRINTED\"**.\n      * **Counter Logic:** The `labelPrintCount` must be exactly **1**.\n\n      ---\n\n      ### **Post-Request Verification**\n      1.  **GET** `{{baseUrl}}/api/v1/parcels/1/timeline`\n      2.  **Verify:** A new `STATUS_UPDATE` event should exist.\n      3.  **Check:** `previousStatus` should be \"PENDING\" and `newStatus` should be \"LABEL_PRINTED\".\n\n      ---\n  - info:\n      name: Re-Print Label (Increment Count)\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Re-Print Label (Increment Count)\n      Allows operators to re-print a label if the original was lost or damaged. The system tracks these occurrences by incrementing the `labelPrintCount` without changing the parcel's status, as it is already in the printed state.\n\n      ---\n\n      ### **Pre-condition**\n      The parcel must already be in the `LABEL_PRINTED` state (following the completion of Unit 1).\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-12345\",\n          \"status\": \"LABEL_PRINTED\",\n          \"labelPrintCount\": 2\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Counter Logic:** The `labelPrintCount` must increment (e.g., from 1 to **2**).\n      * **State Persistence:** The status must remain **\"LABEL_PRINTED\"**.\n\n      ---\n  - info:\n      name: Log Print \u2014 Invalid State (Already AWB_LINKED)\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Log Print \u2014 Invalid State (Already AWB_LINKED)\n      Validates that a label cannot be printed once the parcel has progressed to a later stage in the workflow, such as being linked to an Air Waybill (AWB). This prevents operational errors where labels might be reprinted for parcels already out for delivery.\n\n      ---\n\n      ### **Pre-condition**\n      The parcel must be in the `AWB_LINKED` state.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot print label: parcel is in 'AWB_LINKED' state...\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Error Detail:** The error message must explicitly mention the invalid state (`AWB_LINKED`) as the reason for rejection.\n\n      ---\n  - info:\n      name: Log Print \u2014 Parcel Not Found\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Log Print \u2014 Parcel Not Found\n      Ensures the system handles requests for non-existent parcel IDs gracefully by returning a standard \"Not Found\" error.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/9999/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `404 Not Found`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Parcel not found\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **404**\n      * `res.body.success` should equal **false**\n      * **Error Message:** The response must clearly state that the parcel was not found.\n\n      ---\n  - info:\n      name: '[CR] Log Print \u2014  Forbidden'\n      type: http\n      seq: 5\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Log Print \u2014 COURIER Role Forbidden\n      Verifies that access control is strictly enforced. Only accounts with **ADMIN** or **OPERATOR** roles should have the authority to log label prints; external or restricted roles like **COURIER** must be denied.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `403 Forbidden`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Access denied: Insufficient permissions to perform this action.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * `res.body.success` should equal **false**\n      * **Authorization Logic:** The request must be rejected because the `COURIER` role does not possess the required permission scope.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:23:08.221Z'\n    exportedUsing: Bruno/3.2.2\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Notification-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Notification\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Get notification history for parcel\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/:parcelid/notifications'\n      params:\n        - name: parcelid\n          value: '5'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Get Notification History for Parcel\n\n      Retrieves a comprehensive list of all notification attempts and statuses associated with a specific parcel.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/5/notifications` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{adminToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 12,\n            \"type\": \"dispatch_confirmation\",\n            \"status\": \"sent\",\n            \"sent_at\": \"2026-04-20T09:40:19Z\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data` should be an **Array**\n  - info:\n      name: Notification Webhook (Status update)\n      type: http\n      seq: 4\n    http:\n      method: POST\n      url: '{{base_url}}/notifications/webhook'\n      body:\n        type: json\n        data: |-\n          {\n            \"notificationId\": 12,\n            \"status\": \"delivered\",\n            \"externalId\": \"SMS_GATEWAY_XYZ_999\"\n          }\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Notification Webhook (Status Update)\n\n      Endpoint for external service providers (e.g., SMS or Email gateways) to send asynchronous status updates regarding notification delivery.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/notifications/webhook` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"notificationId\": 12,\n        \"status\": \"delivered\",\n        \"externalId\": \"SMS_GATEWAY_XYZ_999\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"appStatusId\": 2\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data.appStatusId` should equal **2**\n  - info:\n      name: Resend Failed Notification\n      type: http\n      seq: 2\n    http:\n      method: POST\n      url: '{{base_url}}/notifications/:parcelid/resend'\n      params:\n        - name: parcelid\n          value: '12'\n          type: path\n      body:\n        type: json\n        data: |-\n          {}\n          // If this doesn't work just select 'no-body' instead of 'JSON' in top right\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Resend Failed Notification\n\n      Triggers a manual retry for a notification that previously failed to deliver.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/notifications/12/resend` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer {{adminToken}}\n      ```\n\n      **Payload**\n      ```json\n      {}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"message\": \"Notification sent successfully\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data.message` should equal **\"Notification sent successfully\"**\n  - info:\n      name: Send Dispatch Notification\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/:parcelid/notify'\n      params:\n        - name: parcelid\n          value: '5'\n          type: path\n      body:\n        type: json\n        data: |-\n          {}\n          // If this doesn't work just select 'no-body' instead of 'JSON' in top right\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Send Dispatch Notification\n\n      Send a notification to the recipient confirming that the parcel has been dispatched.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/5/notify` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer {{adminToken}}\n      ```\n\n      **Payload**\n      ```json\n      {}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"message\": \"Notification sent successfully\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data.message` should equal **\"Notification sent successfully\"**\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:25:03.775Z'\n    exportedUsing: Bruno/3.2.2\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Order Pipeline-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Pipeline - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Order Pipeline\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Cancel Order (Blocked - Parcel Dispatched)\n      type: http\n      seq: 7\n    http:\n      method: PATCH\n      url: '{{base_url}}/orders/1/cancel'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 7. Cancel Order (Blocked \u2014 Parcel Dispatched)\n      Validates the safeguard preventing order cancellation if the fulfillment process is too far advanced.\n\n      ---\n\n      ### **Pre-condition**\n      * At least one parcel in this order must have a status of `DISPATCHED` or `DELIVERED`.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1/cancel` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot cancel order: one or more parcels are already dispatched or delivered.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Error Validation:** The error message must specifically cite that dispatched/delivered parcels are blocking the cancellation.\n\n      ---\n\n      Shall I provide the final unit for this module?\n  - info:\n      name: Cancel Order\n      type: http\n      seq: 6\n    http:\n      method: PATCH\n      url: '{{base_url}}/orders/1/cancel'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Cancel Order (Happy Path)\n      Verifies that an order can be successfully cancelled, which should trigger the cancellation of all associated parcels that have not yet been dispatched.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1/cancel` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"cancelledParcels\": 2,\n          \"cancelledBy\": \"EMP-OPERATOR-01\",\n          \"timestamp\": \"2026-04-20T10:20:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Verification:** The response should return the count of parcels successfully moved to a cancelled state.\n\n      ---\n  - info:\n      name: Create Order\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/orders'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |\n          {\n            \"senderName\": \"Munna Bhai\",\n            \"senderMobile\": \"9876543210\",\n            \"senderAddress\": \"14, Gandhi Nagar, Near Railway Station, Surat, Gujarat 395002\",\n            \"courierId\": 1,\n            \"receivers\": [\n              {\n                \"receiverName\": \"Delhi Fabrics Ltd.\",\n                \"receiverPhone\": \"9123456780\",\n                \"addressLine1\": \"45, Karol Bagh\",\n                \"city\": \"New Delhi\",\n                \"state\": \"Delhi\",\n                \"pincode\": \"110005\",\n                \"products\": [\n                  { \"productId\": 1, \"qty\": 5, \"unitPrice\": 420.00 },\n                  { \"productId\": 3, \"qty\": 2, \"unitPrice\": 1100.00 }\n                ]\n              },\n              {\n                \"receiverName\": \"Mumbai Silk House\",\n                \"receiverPhone\": \"9988776655\",\n                \"addressLine1\": \"22, Linking Road\",\n                \"addressLine2\": \"Bandra West\",\n                \"city\": \"Mumbai\",\n                \"state\": \"Maharashtra\",\n                \"pincode\": \"400050\",\n                \"products\": [\n                  { \"productId\": 1, \"qty\": 3, \"unitPrice\": 450.00 }\n                ]\n              }\n            ]\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '201'\n        - expression: res.body.data.receivers[0].parcel.parcel_id\n          operator: startsWith\n          value: '\"PDS\"'\n        - expression: res.body.data.receivers[0].parcel.parcel_id\n          operator: isDefined\n          value: ''\n        - expression: res.body.data.receivers[0].parcel.parcelStatusCode\n          operator: eq\n          value: '\"PENDING\"'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 1. Create Complex Order\n      Allows an operator to create a bulk order consisting of a single sender and multiple receivers. Each receiver entry automatically generates a corresponding parcel with a unique tracking identifier.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/orders` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"senderName\": \"Ramesh Textiles\",\n        \"senderMobile\": \"9876543210\",\n        \"senderAddress\": \"14, Gandhi Nagar, Near Railway Station, Surat, Gujarat 395002\",\n        \"courierId\": 1,\n        \"receivers\": [\n          {\n            \"receiverName\": \"Delhi Fabrics Ltd.\",\n            \"receiverPhone\": \"9123456780\",\n            \"addressLine1\": \"45, Karol Bagh\",\n            \"city\": \"New Delhi\",\n            \"state\": \"Delhi\",\n            \"pincode\": \"110005\",\n            \"products\": [\n              { \"productId\": 1, \"qty\": 5, \"unitPrice\": 420.00 },\n              { \"productId\": 3, \"qty\": 2, \"unitPrice\": 1100.00 }\n            ]\n          },\n          {\n            \"receiverName\": \"Mumbai Silk House\",\n            \"receiverPhone\": \"9988776655\",\n            \"addressLine1\": \"22, Linking Road\",\n            \"addressLine2\": \"Bandra West\",\n            \"city\": \"Mumbai\",\n            \"state\": \"Maharashtra\",\n            \"pincode\": \"400050\",\n            \"products\": [\n              { \"productId\": 1, \"qty\": 3, \"unitPrice\": 450.00 }\n            ]\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `201 Created`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"orderId\": 123,\n          \"orderCode\": \"ORD-778899\",\n          \"receivers\": [\n            {\n              \"receiverName\": \"Delhi Fabrics Ltd.\",\n              \"parcel\": {\n                \"parcelId\": \"PDS-DEL-001\",\n                \"status\": \"PENDING\"\n              }\n            }\n          ]\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **201**\n      * `res.body.success` should equal **true**\n      * **Parcel Generation:** Each receiver must have a nested `parcel` object.\n      * **Identifier Logic:** `parcelId` must start with the prefix **\"PDS-\"**.\n      * **Initial State:** Parcel status must be **\"PENDING\"**.\n\n      ---\n  - info:\n      name: Get Order Summary\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/orders/1'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: ''\n          operator: eq\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Get Order Aggregate\n      Retrieves a comprehensive view of a single order, including all nested relationships such as receivers, their specific product items, and their corresponding parcel tracking details.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"orderId\": 1,\n          \"orderCode\": \"ORD-778899\",\n          \"senderName\": \"Ramesh Textiles\",\n          \"receivers\": [\n            {\n              \"receiverName\": \"Delhi Fabrics Ltd.\",\n              \"items\": [\n                { \"productId\": 1, \"productName\": \"Cotton Roll\", \"qty\": 5 }\n              ],\n              \"parcel\": {\n                \"id\": 50,\n                \"parcelId\": \"PDS-DEL-001\",\n                \"status\": \"PENDING\"\n              }\n            }\n          ]\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Structure Validation:** The response must follow the nested hierarchy: **Order \u2192 Receivers \u2192 [Items, Parcel]**.\n      * **Data Integrity:** The `parcel` object must be linked and present for every receiver in the array.\n\n      ---\n  - info:\n      name: List Orders\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/orders?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.data[0].derivedStatus\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. List Orders (Paginated)\n      Retrieves a paginated list of all orders. This view includes a `derivedStatus`, which is calculated based on the aggregate states of all parcels associated with that order.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/orders?page=1&limit=20` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"orderId\": 1,\n            \"orderCode\": \"ORD-2026-001\",\n            \"senderName\": \"Ramesh Textiles\",\n            \"derivedStatus\": \"PARTIALLY_DISPATCHED\",\n            \"createdAt\": \"2026-04-20T10:00:00Z\"\n          }\n        ],\n        \"meta\": {\n          \"page\": 1,\n          \"limit\": 20,\n          \"totalRows\": 45,\n          \"totalPages\": 3\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Logic Check:** Each order object must include a `derivedStatus` field.\n      * **Metadata Check:** Response must include standard pagination metadata (`page`, `limit`, `totalRows`, `totalPages`).\n\n      ---\n\n      Ready for Unit 3?\n  - info:\n      name: Update Order (Blocked - Parcel >= AWB_LINKED)\n      type: http\n      seq: 5\n    http:\n      method: PUT\n      url: '{{base_url}}/orders/1'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |+\n          {\n            \"senderName\": \"Should Fail\"\n          }\n\n          // Pre-condition: At least one parcel in this order must be AWB_LINKED or DISPATCHED\n\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '400'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Update Order (Blocked \u2014 Parcel \u2265 AWB_LINKED)\n      This test validates the business logic that prevents an order from being modified once the fulfillment process has reached a critical stage (i.e., once any associated parcel is linked to an Air Waybill or dispatched).\n\n      ---\n\n      ### **Pre-condition**\n      * At least one parcel associated with this `orderId` must have its status set to `AWB_LINKED` or `DISPATCHED`.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"senderName\": \"Should Fail\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot update order: one or more parcels have already been AWB-linked or dispatched.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * `res.body.error` must match the specific business logic error message.\n\n      ---\n  - info:\n      name: Update Order (Happy Path)\n      type: http\n      seq: 4\n    http:\n      method: PUT\n      url: '{{base_url}}/orders/1'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \"senderName\": \"Ramesh Textiles Updated\",\n          //   \"senderName\": \"Ramesh Textiles\",\n            \"courierId\": 2\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Update Order (Happy Path)\n      Allows for the modification of order details (such as sender information or courier preferences) as long as the order is still in a preliminary state.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"senderName\": \"Ramesh Textiles Updated\",\n        \"courierId\": 2\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"orderId\": 1,\n          \"senderName\": \"Ramesh Textiles Updated\",\n          \"courierId\": 2,\n          \"updatedAt\": \"2026-04-20T10:15:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Validation:** The response body must reflect the updated `senderName`.\n\n      ---\n  - info:\n      name: '[CR] - List Orders (Read-only Access)'\n      type: http\n      seq: 8\n    http:\n      method: GET\n      url: '{{base_url}}/orders?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.data[0].derivedStatus\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 8. COURIER Role \u2014 List Orders (Read-Only Access)\n      Ensures that users with the `COURIER` role can view order records but are restricted from performing any write operations (create, edit, or cancel).\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/orders?page=1&limit=10` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Access Control Check:** The `COURIER` role must have successful read-only access to the order list.\n      * **Permission Logic:** Any attempt by a `COURIER` to use `POST`, `PUT`, `PATCH`, or `DELETE` on this module should result in a **403 Forbidden** status.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:22:33.184Z'\n    exportedUsing: Bruno/3.2.2\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Parcel Events & Audit Export-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Parcel Events &amp; Audit Export - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Parcel Events & Audit Export\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Browse Events with ActionType Filter\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?actionType=AWB_LINK'\n      params:\n        - name: actionType\n          value: AWB_LINK\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse Events with ActionType Filter\n\n      Verifies that the event logs can be filtered by a specific type of action, such as linking an Air Waybill (AWB).\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?actionType=AWB_LINK` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** All returned events must have an `actionType` exactly matching **\"AWB_LINK\"**.\n  - info:\n      name: Browse Events with Combined Filters\n      type: http\n      seq: 5\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?actionType=STATUS_UPDATE&scannedBy=EMP001&dateFrom=2026-03-29'\n      params:\n        - name: actionType\n          value: STATUS_UPDATE\n          type: query\n        - name: scannedBy\n          value: EMP001\n          type: query\n        - name: dateFrom\n          value: '2026-03-29'\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse Events with Combined Filters\n\n      Verifies that the API correctly applies multiple filters simultaneously, ensuring the result set only contains events that meet every specified criterion.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?actionType=STATUS_UPDATE&scannedBy=EMP001&dateFrom=2026-03-29` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Filter Logic:** Events must match **ALL** filter criteria simultaneously (`actionType`, `scannedBy`, and `dateFrom`).\n  - info:\n      name: Browse Events with ScannedBy Filter\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?scannedBy=EMP001'\n      params:\n        - name: scannedBy\n          value: EMP001\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse Events with ScannedBy Filter\n\n      Verifies the ability to filter the event logs by the specific employee or system entity that performed the action.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?scannedBy=EMP001` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** All returned events must have a `scannedBy` value exactly matching **\"EMP001\"**.\n  - info:\n      name: Browse all events (No filter)\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?page=1&limit=50'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '50'\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse All Events (No Filters)\n\n      Verifies that an authorized user can retrieve a paginated list of all parcel events without applying specific filters. This ensures the baseline retrieval and metadata structure are functioning correctly.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?page=1&limit=50` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 1,\n            \"parcelId\": 101,\n            \"orderCode\": \"ORD-999\",\n            \"actionType\": \"STATUS_UPDATE\",\n            \"awbNumber\": \"AWB12345678\",\n            \"previousStatus\": \"PENDING\",\n            \"newStatus\": \"DISPATCHED\",\n            \"scannedBy\": \"EMP001\",\n            \"timestamp\": \"2026-04-20T09:50:00Z\"\n          }\n        ],\n        \"meta\": {\n          \"page\": 1,\n          \"limit\": 50,\n          \"totalRows\": 150,\n          \"totalPages\": 3\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Metadata Check:** Response must include `page`, `limit`, `totalRows`, and `totalPages`.\n      * **Schema Validation:** Each event object must contain `id`, `parcelId`, `orderCode`, `actionType`, `awbNumber`, `previousStatus`, `newStatus`, `scannedBy`, and `timestamp`.\n  - info:\n      name: Browse events with Date Range\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?dateFrom=2026-03-30&dateTo=2026-04-01'\n      params:\n        - name: dateFrom\n          value: '2026-03-30'\n          type: query\n        - name: dateTo\n          value: '2026-04-01'\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse Events with Date Range\n\n      Verifies that the event logs can be filtered by a specific time window using start and end dates.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?dateFrom=2026-03-30&dateTo=2026-04-01` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** All returned events must fall within the specified date range (**2026-03-30** to **2026-04-01**).\n  - info:\n      name: Export CSV with filters\n      type: http\n      seq: 7\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events/export?actionType=AWB_LINK'\n      params:\n        - name: actionType\n          value: AWB_LINK\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Export CSV with Filters\n\n      Verifies that the system correctly filters the exported CSV data based on the provided query parameters when requested by an authorized role.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events/export?actionType=AWB_LINK` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** The resulting CSV file should only contain events where the `actionType` is `AWB_LINK`.\n  - info:\n      name: Export events as CSV\n      type: http\n      seq: 6\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events/export'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Export Events as CSV\n\n      Verifies that authorized users (OPERATOR/ADMIN) can successfully export the full parcel events log as a downloadable CSV file with the correct headers and content type.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events/export` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Response Header:** `Content-Type` must be `text/csv`\n      * **Response Header:** `Content-Disposition` must be `attachment; filename=\"parcel-events-2026-04-16.csv\"`\n      * **CSV Header Row:** Must contain `EventID,ParcelID,OrderCode,ActionType,AWBNumber,PreviousStatus,NewStatus,ScannedBy,Timestamp`\n      * **Content Validation:** Subsequent rows must contain comma-separated event data.\n  - info:\n      name: '[CR] - Cannot Access Events'\n      type: http\n      seq: 8\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Courier Role \u2014 Cannot Access Events\n\n      This test verifies that the `COURIER` role is restricted from accessing the general parcel events list.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{courierToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * **Note:** Only `ADMIN` and `OPERATOR` roles are authorized to browse events.\n  - info:\n      name: '[CR] - Cannot Export CSV'\n      type: http\n      seq: 9\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events/export'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Courier Role \u2014 Cannot Export CSV\n\n      This test case verifies that the export functionality is restricted and that users with the `COURIER` role are denied access with a forbidden status.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events/export` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{courierToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `403 Forbidden`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": {\n          \"message\": \"Access denied. Only ADMIN and OPERATOR can export data.\",\n          \"code\": \"INSUFFICIENT_PERMISSIONS\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * `res.body.success` should equal **false**\n      * **Validation:** Verify that the error message explicitly states only `ADMIN` and `OPERATOR` roles are authorized.\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:24:31.611Z'\n    exportedUsing: Bruno/3.2.2\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Parcels Retrieval and Label Data-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Parcels Retrieval and Label Data - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Parcels Retrieval and Label Data\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Get Label Data\n      type: http\n      seq: 6\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/label-data'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Get Label Data (pAction=2)\n      Retrieves the flat JSON snapshot required for generating shipping labels. This includes sender snapshots and receiver address details. \n\n      > **Note:** This endpoint does **not** provide QR image data; the frontend is responsible for rendering the QR code using the `parcelId`.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/label-data` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-A1B2C3\",\n          \"senderName\": \"Warehouse Alpha\",\n          \"receiverName\": \"John Doe\",\n          \"addressLine1\": \"123 Maple Street\",\n          \"city\": \"Mumbai\",\n          \"state\": \"Maharashtra\",\n          \"pincode\": \"400001\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Data Validation:** Response must be a flat JSON containing sender snapshot + receiver address + `parcelId`.\n      * **Constraint Check:** Ensure **no QR image data** is present in the response.\n\n      ---\n  - info:\n      name: Get Parcel - Not Found\n      type: http\n      seq: 5\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/9999'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '404'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Get Parcel \u2014 Not Found\n      Verifies the system's error handling when a request is made for a parcel ID that does not exist in the database.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/9999` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `404 Not Found`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Parcel not found\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **404**\n      * `res.body.success` should equal **false**\n      * `res.body.error` should equal **\"Parcel not found\"**\n\n      ---\n  - info:\n      name: Get Parcel Timeline\n      type: http\n      seq: 7\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/timeline'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 7. Get Parcel Timeline\n      Retrieves a chronologically sorted list of all events and status changes associated with a specific parcel.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/timeline` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"actionType\": \"STATUS_UPDATE\",\n            \"newStatus\": \"PENDING\",\n            \"timestamp\": \"2026-04-20T08:00:00Z\"\n          },\n          {\n            \"actionType\": \"AWB_LINK\",\n            \"newStatus\": \"DISPATCHED\",\n            \"timestamp\": \"2026-04-20T10:00:00Z\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Sorting Validation:** Events must be chronologically sorted (oldest first).\n\n      ---\n  - info:\n      name: Get Single Parcel\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1'\n      params:\n        - name: ''\n          value: ''\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Get Single Parcel\n      Retrieves the full detailed record of a specific parcel by its internal ID.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"parcelId\": \"PDS-A1B2C3\",\n          \"status\": \"PENDING\",\n          \"receiverName\": \"Jane Doe\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n\n      ---\n  - info:\n      name: List Parcels with Filter\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/parcels?status=PENDING'\n      params:\n        - name: status\n          value: PENDING\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.data[0].status\n          operator: eq\n          value: PENDING\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. List Parcels with Status Filter\n      Filters the parcel list based on their current lifecycle status.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels?status=PENDING` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** All returned parcels in the `data` array must have `status === \"PENDING\"`.\n\n      ---\n  - info:\n      name: List Parcels with search\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/parcels?search=PDS-A1B2C3'\n      params:\n        - name: search\n          value: PDS-A1B2C3\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. List Parcels with Search\n      Performs a search query to find a specific parcel by its ID or unique identifier.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels?search=PDS-A1B2C3` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** Returns the specific parcel matching the `parcelId` search query.\n\n      ---\n  - info:\n      name: List all Parcels\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/parcels?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 1. List All Parcels\n      Retrieves a paginated list of all parcels in the system.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels?page=1&limit=20` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"parcelId\": \"PDS-12345\",\n            \"trackingNo\": \"TRK789\",\n            \"status\": \"PENDING\",\n            \"receiverName\": \"Jane Doe\",\n            \"orderCode\": \"ORD-001\"\n          }\n        ],\n        \"meta\": {\n          \"page\": 1,\n          \"limit\": 20,\n          \"totalRows\": 100,\n          \"totalPages\": 5\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Metadata Check:** Response must include `page`, `limit`, `totalRows`, and `totalPages`.\n      * **Schema Validation:** Each parcel object must contain `parcelId`, `trackingNo`, `status`, `receiverName`, and `orderCode`.\n\n      ---\n  - info:\n      name: '[CR] - Can List Parcels'\n      type: http\n      seq: 8\n    http:\n      method: GET\n      url: '{{base_url}}/parcels?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 8. COURIER Role \u2014 Can List Parcels\n      Ensures that the `COURIER` role has the necessary read permissions to view the list of parcels.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels?page=1&limit=10` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Access Control:** The system should grant read access to users with the `COURIER` role.\n\n      ---\n  - info:\n      name: '[CR] - Cannot access Label Data'\n      type: http\n      seq: 9\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/label-data'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 9. COURIER Role \u2014 Cannot Access Label Data\n      Verifies that sensitive label information (including sender and receiver snapshots) is restricted and cannot be accessed by users with the `COURIER` role.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/label-data` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `403 Forbidden`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"User role 'COURIER' is not authorized for this route\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * `res.body.success` should equal **false**\n      * `res.body.error` should match the authorization error message.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:22:51.072Z'\n    exportedUsing: Bruno/3.2.2\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Receivers-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receivers - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Receivers\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Create Receiver Address\n      type: http\n      seq: 5\n    http:\n      method: POST\n      url: '{{base_url}}/receivers/:id/addresses'\n      params:\n        - name: id\n          value: '4'\n          type: path\n      body:\n        type: json\n        data: |-\n          {\n            \"address\": \"456 Chotu\",\n            \n            \"city\": \"Mumbai\",\n            \"state\": \"Maharashtra\",\n            \"pincode\": \"400001\"\n          }\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: Get Receiver Addresses\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/receivers/:id/addresses'\n      params:\n        - name: id\n          value: '4'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: Receiver Names\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/receivers/names'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: All Receivers\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/receivers'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: Receiver Phone Numbers\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/receivers/phones'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: Lookup Receivers By Name\n      type: http\n      seq: 6\n    http:\n      method: GET\n      url: '{{base_url}}/receivers/lookup-by-name?name=Aditya'\n      params:\n        - name: name\n          value: Aditya\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: Lookup Receivers By Phone\n      type: http\n      seq: 7\n    http:\n      method: GET\n      url: '{{base_url}}/receivers/lookup-by-phone?phone=+917411236589'\n      params:\n        - name: phone\n          value: '+917411236589'\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-29T08:37:22.523Z'\n    exportedUsing: Bruno/3.3.0\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Two Scan Operations-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Two Scan Operations - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Two Scan Operations\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Scan + Link AWB (Happy Path)\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 1. Scan + Link AWB (OPERATOR \u2014 Happy Path)\n      Handles the physical association of a parcel's internal QR code with an external courier's Air Waybill (AWB) number. When performed by an **OPERATOR**, the parcel moves to an intermediate staging state.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      Parcel `PDS-A1B2C3` must be in the `LABEL_PRINTED` state (achieved via the Label Print module).\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-A1B2C3\",\n        \"awbNumber\": \"AWB-DTDC-001\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-A1B2C3\",\n          \"trackingNo\": \"AWB-DTDC-001\",\n          \"status\": \"AWB_LINKED\",\n          \"dispatchDate\": null\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Role Logic:** Status must be `AWB_LINKED` (not auto-dispatched).\n      * **Field Verification:** `dispatchDate` must be **null**.\n\n      ---\n\n      ### **Post-Request Verification**\n      1.  **GET** `{{baseUrl}}/api/v1/parcels/1/timeline`\n      2.  **Verify:** `actionType` is \"AWB_LINK\".\n      3.  **Check:** `previousStatus` is \"LABEL_PRINTED\" and `newStatus` is \"AWB_LINKED\".\n\n      ---\n  - info:\n      name: Scan - Parcel Not Found\n      type: http\n      seq: 3\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Scan \u2014 Parcel Not Found\n      Validates that the system correctly identifies when a QR code (Parcel ID) does not exist in the database, preventing links to non-existent shipments.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-NONEXISTENT\",\n        \"awbNumber\": \"AWB-TEST-999\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `404 Not Found`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Parcel not found for QR code: PDS-NONEXISTENT\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **404**\n      * `res.body.success` should equal **false**\n      * **Error Verification:** The error message must specifically call out the failing `qrCode`.\n\n      ---\n  - info:\n      name: Scan + Link AWB (COURIER \u2014 Auto-Dispatch)\n      type: http\n      seq: 2\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Scan + Link AWB (COURIER \u2014 Auto-Dispatch)\n      Optimizes the workflow for external couriers. When a user with the **COURIER** role scans the parcel and AWB, the system bypasses the intermediate staging state and moves the parcel directly to the final dispatch status.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      Parcel `PDS-D4E5F6` must be in the `LABEL_PRINTED` state.\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-D4E5F6\",\n        \"awbNumber\": \"AWB-BLUEDART-002\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-D4E5F6\",\n          \"trackingNo\": \"AWB-BLUEDART-002\",\n          \"status\": \"DISPATCHED\",\n          \"dispatchDate\": \"2026-04-20T10:41:48Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Role Logic:** Status must jump directly to **\"DISPATCHED\"**.\n      * **Timestamp Verification:** `dispatchDate` must be populated with a valid timestamp (not null).\n\n      ---\n  - info:\n      name: Scan \u2014 Wrong State (Still PENDING)\n      type: http\n      seq: 4\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Scan \u2014 Wrong State (Still PENDING)\n      Enforces strict workflow sequence. AWB linking is physically impossible until a label has been generated; therefore, the API blocks any scan attempts for parcels still in the `PENDING` state.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      The parcel record exists but has not yet undergone the `log-print` operation.\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-A1B2C3\",\n        \"awbNumber\": \"AWB-TEST-003\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot link AWB: parcel is in 'PENDING' state. AWB linking requires parcel to be in LABEL_PRINTED state.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Business Logic:** The system must reject the request and provide a clear explanation of the state-machine requirement.\n\n      ---\n  - info:\n      name: Scan \u2014 Duplicate AWB (409 Conflict)\n      type: http\n      seq: 5\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Scan \u2014 Duplicate AWB (409 Conflict)\n      Maintains data integrity by ensuring that an Air Waybill (AWB) number is unique across the system. This prevents the same physical tracking number from being assigned to multiple system-generated parcels.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      AWB `AWB-DTDC-001` must have already been successfully linked to a different parcel (as performed in Unit 1).\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-D4E5F6\",\n        \"awbNumber\": \"AWB-DTDC-001\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `409 Conflict`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"AWB number 'AWB-DTDC-001' is already linked to another parcel\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **409**\n      * `res.body.success` should equal **false**\n      * **Integrity Check:** The API must prevent the duplicate assignment and return a conflict error.\n\n      ---\n  - info:\n      name: Scan \u2014 Validation Error (Missing Fields)\n      type: http\n      seq: 6\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Scan \u2014 Validation Error (Missing Fields)\n      Ensures that the API enforces mandatory data requirements. Both the internal QR code and the external AWB number must be provided to complete the link operation.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"\",\n        \"awbNumber\": \"\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Validation Error - qrCode: QR code (parcelId) is required, awbNumber: AWB number is required\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Validation Check:** The error message should list all missing or empty fields required for the scan.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:23:50.011Z'\n    exportedUsing: Bruno/3.2.2\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: src/interfaces/http/controllers/bulk-upload.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/bulk-upload.controller.js
// Description: Express route handlers for Bulk Upload module.
// Uses express-async-handler for automatic error propagation.
// ============================================================================

import asyncHandler from 'express-async-handler';
import bulkUploadService from '../../../modules/bulk-upload/bulk-upload.service.js';

/**
 * POST /api/v1/bulk-uploads
 * Submits bulk order data (JSON).
 */
export const handleBulkUpload = asyncHandler(async (req, res) => {
  const { fileName, rows } = req.body;
  const result = await bulkUploadService.processBulkUpload(rows, req.user, fileName);
  res.status(201).json({ success: true, data: result });
});

/**
 * GET /api/v1/bulk-uploads
 * Lists all upload sessions.
 */
export const handleGetSessions = asyncHandler(async (req, res) => {
  const sessions = await bulkUploadService.getSessions();
  res.json({ success: true, data: sessions });
});

/**
 * GET /api/v1/bulk-uploads/:id
 * Gets specific upload session result with row details.
 */
export const handleGetSessionById = asyncHandler(async (req, res) => {
  const result = await bulkUploadService.getSessionWithDetails(req.params.id);
  res.json({ success: true, data: result });
});
````

## File: src/interfaces/http/controllers/dashboard.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/dashboard.controller.js
// Description: Handles HTTP requests for the Dashboard module.
// Envelops data in the standard { success, data } format.
// ============================================================================

import asyncHandler from 'express-async-handler';
import dashboardService from '../../../modules/dashboard/dashboard.service.js';

/**
 * @desc    Get dashboard metrics
 * @route   GET /api/v1/dashboard/metrics
 * @access  Private/Admin
 */
export const getMetrics = asyncHandler(async (req, res) => {
  const metrics = await dashboardService.getMetrics();

  res.json({
    success: true,
    data: metrics
  });
});
````

## File: src/interfaces/http/controllers/notification.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/notification.controller.js
// Description: Controller layer for Notification module.
// Maps incoming requests to service methods and handles standardized responses.
// ============================================================================

import asyncHandler from 'express-async-handler';
import notificationService from '../../../modules/notification/notification.service.js';

/**
 * @desc    Send dispatch notification to receiver
 * @route   POST /api/v1/parcels/:id/notify
 * @access  Private (Admin, Operator)
 */
export const send = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await notificationService.sendNotification(id, req.user);

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * @desc    Resend a failed notification
 * @route   POST /api/v1/notifications/:id/resend
 * @access  Private (Admin, Operator)
 */
export const resend = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await notificationService.resendNotification(id, req.user);

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * @desc    Get notification history for a parcel
 * @route   GET /api/v1/parcels/:id/notifications
 * @access  Private (Admin, Operator)
 */
export const getHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const history = await notificationService.getParcelNotifications(id);

  res.status(200).json({
    success: true,
    data: history
  });
});

/**
 * @desc    Webhook callback for delivery status (Sent/Failed)
 * @route   POST /api/v1/notifications/webhook
 * @access  Public
 */
export const webhook = asyncHandler(async (req, res) => {
  const result = await notificationService.handleWebhook(req.body);

  res.status(200).json({
    success: true,
    data: result
  });
});
````

## File: src/interfaces/http/controllers/parcel-events.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/parcel-events.controller.js
// Description: Express route handlers for the Parcel Events & Audit Export
// module (API Contract §11). Reads from receiver_status_details.
// Uses express-async-handler (AGENTS.md §3D).
// ============================================================================

import asyncHandler from 'express-async-handler';
import parcelService from '../../../modules/parcel/parcel.service.js';

/**
 * GET /api/v1/parcel-events
 * Browse system-wide events from receiver_status_details (paginated, filtered).
 * Maps to: prc_receiver_status_details_get (pAction=0)
 *
 * Filters: dateFrom, dateTo, actionType, scannedBy
 */
export const browseEvents = asyncHandler(async (req, res) => {
  const filters = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 50,
    dateFrom: req.query.dateFrom || null,
    dateTo: req.query.dateTo || null,
    actionType: req.query.actionType || null,
    scannedBy: req.query.scannedBy || null
  };

  const { data, total } = await parcelService.browseEvents(filters);

  res.json({
    success: true,
    data,
    meta: {
      page: filters.page,
      limit: filters.limit,
      totalRows: total,
      totalPages: Math.ceil(total / filters.limit)
    }
  });
});

/**
 * GET /api/v1/parcel-events/export
 * Download events as CSV file for end-of-day auditing.
 * Columns: EventID, ParcelID, OrderCode, ActionType, AWBNumber,
 *          PreviousStatus, NewStatus, ScannedBy, Timestamp
 */
export const exportCSV = asyncHandler(async (req, res) => {
  const filters = {
    dateFrom: req.query.dateFrom || null,
    dateTo: req.query.dateTo || null,
    actionType: req.query.actionType || null,
    scannedBy: req.query.scannedBy || null
  };

  const { data } = await parcelService.browseEvents(filters);

  // CSV header row
  const csvHeader = 'EventID,ParcelID,OrderCode,ActionType,AWBNumber,PreviousStatus,NewStatus,ScannedBy,Timestamp';

  // CSV data rows — escape commas in values
  const csvRows = data.map((row) => {
    return [
      row.id,
      row.parcelId || '',
      row.orderCode || '',
      row.actionType || '',
      row.awbNumber || '',
      row.previousStatus || '',
      row.newStatus || '',
      row.scannedBy || '',
      row.timestamp ? new Date(row.timestamp).toISOString() : ''
    ].join(',');
  });

  const csvContent = [csvHeader, ...csvRows].join('\n');

  // Set headers for CSV download
  const timestamp = new Date().toISOString().split('T')[0];
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="parcel-events-${timestamp}.csv"`);
  res.send(csvContent);
});
````

## File: src/interfaces/http/controllers/system.controller.js
````javascript
import asyncHandler from 'express-async-handler';
import pool from '../../../infrastructure/database/db.js';

/**
 * @desc    Check application health and database connectivity
 * @route   GET /api/v1/system/health
 * @access  Public
 */
export const checkHealth = asyncHandler(async (req, res) => {
  // 1. Perform a simple database ping
  const startTime = Date.now();
  await pool.query('SELECT 1');
  const dbLatency = `${Date.now() - startTime}ms`;

  // 2. Construct health response
  res.status(200).json({
    success: true,
    data: {
      status: 'UP',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: 'CONNECTED',
        latency: dbLatency
      },
      uptime: `${Math.floor(process.uptime())}s`
    }
  });
});
````

## File: src/interfaces/http/routes/bulk-upload.routes.js
````javascript
// ============================================================================
// File: src/interfaces/http/routes/bulk-upload.routes.js
// Description: Route definitions for Bulk Upload module.
// Applies authentication, RBAC, and Zod validation.
// ============================================================================

import express from 'express';
import {
  handleBulkUpload,
  handleGetSessions,
  handleGetSessionById
} from '../controllers/bulk-upload.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { bulkUploadSchema } from '../validations/bulk-upload.validation.js';

const router = express.Router();

// All bulk upload routes are restricted to ADMIN and OPERATOR
router.use(protect);
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

/**
 * @route   POST /api/v1/bulk-uploads
 * @desc    Submit bulk order data
 */
router.post('/', validate(bulkUploadSchema), handleBulkUpload);

/**
 * @route   GET /api/v1/bulk-uploads
 * @desc    List all upload sessions
 */
router.get('/', handleGetSessions);

/**
 * @route   GET /api/v1/bulk-uploads/:id
 * @desc    Get session result with row details
 */
router.get('/:id', handleGetSessionById);

export default router;
````

## File: src/interfaces/http/routes/dashboard.routes.js
````javascript
// ============================================================================
// File: src/interfaces/http/routes/dashboard.routes.js
// Description: Defines routes for the Dashboard module.
// Applies authentication and authorization (ADMIN only).
// ============================================================================

import express from 'express';
import { getMetrics } from '../controllers/dashboard.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/v1/dashboard/metrics
 * @access  Private/Admin
 */
router.get('/metrics', protect, authorizeRoles('ADMIN'), getMetrics);

export default router;
````

## File: src/interfaces/http/routes/parcel-events.routes.js
````javascript
import express from 'express';
import { browseEvents, exportCSV } from '../controllers/parcel-events.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

// ============================================================================
// Parcel Events & Audit Export Routes — API Contract §11
// Reads from receiver_status_details (unified event log).
// Access: ADMIN, OPERATOR only
// ============================================================================

// GET /api/v1/parcel-events/export → CSV download (must be before /:id-style routes)
router.get('/export', protect, authorizeRoles('ADMIN', 'OPERATOR'), exportCSV);

// GET /api/v1/parcel-events       → Browse system-wide events (paginated, filtered)
router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR'), browseEvents);

export default router;
````

## File: src/interfaces/http/routes/system.routes.js
````javascript
import express from 'express';
import { checkHealth } from '../controllers/system.controller.js';

const router = express.Router();

/**
 * @route   GET /api/v1/system/health
 * @desc    Check application health
 */
router.get('/health', checkHealth);

export default router;
````

## File: src/interfaces/http/validations/bulk-upload.validation.js
````javascript
// ============================================================================
// File: src/interfaces/http/validations/bulk-upload.validation.js
// Description: Zod validation schemas for bulk upload payload.
// ============================================================================

import { z } from 'zod';
import { createOrderSchema } from './validation.schemas.js';

/**
 * Validates the bulk upload request body.
 * Expects an array of orders matching the standard createOrderSchema.
 */
export const bulkUploadSchema = z.object({
  fileName: z.string().optional(),
  rows: z.array(createOrderSchema).min(1, 'At least one order is required for bulk upload')
});
````

## File: src/interfaces/http/validations/parcel.validation.js
````javascript
// ============================================================================
// File: src/interfaces/http/validations/parcel.validation.js
// Description: Zod validation schemas for Parcel module endpoints.
// Enforces strict payload shapes before reaching the Service layer.
// ============================================================================

import { z } from 'zod';

// ----------------------------------------------------------------------------
// POST /parcels/scan — Atomic QR scan + AWB link (API Contract §8.4)
// ----------------------------------------------------------------------------
export const scanParcelSchema = z.object({
  qrCode: z.string().min(1, 'QR code (parcel_id) is required'),
  awbNumber: z.string().min(1, 'AWB number is required')
});

// ----------------------------------------------------------------------------
// POST /parcels/dispatch — Bulk dispatch (API Contract §8.5)
// ----------------------------------------------------------------------------
export const dispatchParcelsSchema = z.object({
  parcelIds: z
    .array(z.number().int().positive('Each parcel ID must be a positive integer'))
    .min(1, 'At least one parcel ID is required')
});
````

## File: src/modules/parcel/parcel.seed.js
````javascript
// ============================================================================
// File: src/modules/parcel/parcel.seed.js
// Description: In-memory seed data for mocking receiver_status_details
// (the append-only event log). Used by parcel module operations.
// Imports parcel/receiver/party data from the order seed module.
// ============================================================================

import {
  seedParcels,
  seedReceivers,
  seedParties,
  seedOrders,
} from '../order/order.seed.js';

/**
 * Mock receiver_status_details entries (append-only event log).
 * Maps to: receiver_status_details table
 * (PkReceiverStatusDetailsId, FkParcelDetailsId, FkReceiverDetailsId,
 *  FkOrderStatusId, ActionType, AWBNumber, PreviousStatus, CreatedDate, CreatedBy)
 *
 * ⚠️ APPEND-ONLY: Never update or delete existing entries.
 */
const seedStatusLog = [
  {
    id: 1,
    fkParcelDetailsId: 1,
    fkReceiverDetailsId: 1,
    actionType: 'STATUS_UPDATE',
    awbNumber: null,
    previousStatus: null,
    newStatus: 'PENDING',
    createdBy: 'EMP001',
    createdDate: new Date('2026-03-30T10:00:00Z')
  },
  {
    id: 2,
    fkParcelDetailsId: 2,
    fkReceiverDetailsId: 2,
    actionType: 'STATUS_UPDATE',
    awbNumber: null,
    previousStatus: null,
    newStatus: 'PENDING',
    createdBy: 'EMP001',
    createdDate: new Date('2026-03-30T10:00:00Z')
  }
];

// Re-export order seeds for cross-module access
export {
  seedParcels,
  seedReceivers,
  seedParties,
  seedOrders,
  seedStatusLog
};
````

## File: src/shared/utils/generateToken.js
````javascript
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign(
    { id },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '30d',
      algorithm: 'HS256', // explicitly define
    }
  )
}

export default generateToken
````

## File: test_data/Address_Test_Data.txt
````
========================================
ADDRESS (PARTY_DETAILS) MODULE — Test Data
Feature A: Address Book APIs
========================================

--- TEST 1: Get All Addresses for Party ---
Method: GET
URL: /api/v1/senders/1/addresses
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>

Assertions:
  - Status: 200
  - Body: { success: true, data: [...] }
  - Each address has: id, address, city, state, pincode, country, isDefault
  - At least one address should have isDefault: true

--- TEST 2: Create New Address for Party ---
Method: POST
URL: /api/v1/senders/1/addresses
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>
  Content-Type: application/json
Body:
{
  "partyName": "John Doe",
  "phoneNo": "9876543210",
  "emailId": "john@example.com",
  "address": "99 New Commerce Hub",
  "city": "Ahmedabad",
  "state": "Gujarat",
  "pincode": "380001",
  "country": "India",
  "isDefault": false
}

Assertions:
  - Status: 201
  - Body: { success: true, data: { id: <new_id>, address: "99 New Commerce Hub", isDefault: false, ... } }

--- TEST 3: Get Addresses — Party Not Found ---
Method: GET
URL: /api/v1/senders/999/addresses
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>

Assertions:
  - Status: 404
  - Body: { success: false, error: "Party not found" }

--- TEST 4: Create Address — Party Not Found ---
Method: POST
URL: /api/v1/senders/999/addresses
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>
  Content-Type: application/json
Body:
{
  "address": "Some Address",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001"
}

Assertions:
  - Status: 404
  - Body: { success: false, error: "Party not found" }

--- TEST 5: Create Address — Validation Failure (Missing Required Fields) ---
Method: POST
URL: /api/v1/senders/1/addresses
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>
  Content-Type: application/json
Body:
{
  "partyName": "John Doe"
}

Assertions:
  - Status: 400
  - Body: { success: false, error: "..." } — missing address, city, state, pincode

--- TEST 6: Create Address with IsDefault Flag ---
Method: POST
URL: /api/v1/senders/2/addresses
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>
  Content-Type: application/json
Body:
{
  "address": "12 Market Street",
  "city": "Jaipur",
  "state": "Rajasthan",
  "pincode": "302001",
  "isDefault": true
}

Assertions:
  - Status: 201
  - Body: { success: true, data: { isDefault: true, ... } }
````

## File: test_data/SenderLookup_Test_Data.txt
````
========================================
SENDER LOOKUP MODULE — Test Data
Feature C: Sender Names, Phones & Lookup-by-Name APIs
========================================

--- TEST 1: Get All Sender Names ---
Method: GET
URL: /api/v1/senders/names
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>

Assertions:
  - Status: 200
  - Body: { success: true, data: ["John Doe", "Jane Smith"] }
  - data is an array of strings

--- TEST 2: Get All Phone Numbers ---
Method: GET
URL: /api/v1/senders/phones
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>

Assertions:
  - Status: 200
  - Body: { success: true, data: ["9876543210", "9876543211"] }
  - data is an array of strings

--- TEST 3: Lookup by Name — Match Found ---
Method: GET
URL: /api/v1/senders/lookup-by-name?name=John
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>

Assertions:
  - Status: 200
  - Body: { success: true, data: [{ id: 1, customerName: "John Doe", ... }] }
  - Partial match, case-insensitive

--- TEST 4: Lookup by Name — No Match ---
Method: GET
URL: /api/v1/senders/lookup-by-name?name=Nonexistent
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>

Assertions:
  - Status: 200
  - Body: { success: true, data: [] }

--- TEST 5: Lookup by Name — Missing Query Param ---
Method: GET
URL: /api/v1/senders/lookup-by-name
Headers:
  Authorization: Bearer <OPERATOR_TOKEN>

Assertions:
  - Status: 400
  - Body: { success: false, error: "Name query parameter is required for lookup" }

--- TEST 6: Unauthenticated Access ---
Method: GET
URL: /api/v1/senders/names
Headers: (none)

Assertions:
  - Status: 401
  - Requires JWT token
````

## File: .editorconfig
````
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.env]
trim_trailing_whitespace = false

[*.sql]
indent_size = 2
````

## File: .gitattributes
````
# Normalize line endings across OS (VERY IMPORTANT)
* text=auto

# Explicit text files

*.js text
*.jsx text
*.ts text
*.tsx text
*.json text
*.css text
*.html text
*.md text


# Binary files (no line ending conversion)

*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.svg binary

# Prevent diff noise for lock files
package-lock.json -diff
````

## File: .nvmrc
````
24
````

## File: Auth_Login_Fix_Test_Data.txt
````
Feature: Auth Login Field Fix
Description: Verification of separated username and email fields in login response.

HTTP Method: POST
URL: {{baseUrl}}/api/v1/auth/login
Headers:
  Content-Type: application/json

Payload:
{
  "email": "admin@example.com",
  "password": "securePass123"
}

Assertions:
1. Status Code: 200 OK
2. success is true
3. data.username is "admin"
4. data.email is "admin@example.com"
5. data.token is present

---

HTTP Method: GET
URL: {{baseUrl}}/api/v1/auth/profile
Headers:
  Authorization: Bearer {{token}}

Assertions:
1. Status Code: 200 OK
2. success is true
3. data.username is "admin"
4. data.email is "admin@example.com"
````

## File: jest.config.js
````javascript
// ============================================================================
// Jest Configuration for SDCMS Backend
// Supports ESM via --experimental-vm-modules Node flag.
// ============================================================================

export default {
  testEnvironment: 'node',
  transform: {},
  // Increase timeout for E2E tests (mock DB init can take time)
  testTimeout: 15000,
};
````

## File: README.md
````markdown
# SDCMS-Server
Node Backend server for the Smart Dispatch and Courier Management System
````

## File: .agent/rules/api_contract_v2.2_p1.md
````markdown
---
trigger: model_decision
description: src/interfaces/http/**/*
---

### SDCMS — API Contract v2.2

**Project:** Smart Dispatch & Courier Management System 
**Date:** 2026-04-28 
**Base URL:** http://localhost:5000/api/v1 
**Total Endpoints:** 55

> v2.2 CHANGES: Product color/size matrix endpoint, color matrix pricing hierarchy.
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
|7|POST|/products/:id/matrix|Add/update color/size matrix variation (v2.2)|

##### 4.3 Product+Category Dropdown (v2.1)

`GET /products/dropdown?search=cotton` Returns all active products JOINed with their `product_category.CategoryName`. Useful for order creation form searchable dropdown.

##### 4.2 Create Product

`POST /products` **Request Body:**

|Field|Type|Required|Notes|
|---|---|---|---|
|materialName|string|✅|Product display name|
|materialRate|decimal|✅|Catalog price (MRP)|
|cuItemCode|string|❌|ERP integration code|

##### 4.4 Get Product by ID (v2.2 Enrichment)

`GET /products/:id` now returns the product **including** an associated `variations` array from `product_color_matrix`, showing all color/size-specific pricing entries.

##### 4.5 Add/Update Product Color Matrix (v2.2)

`POST /products/:id/matrix` — **ADMIN, OPERATOR**

Adds or updates a color/size pricing variation for a product. Maps to `prc_product_color_matrix_set`.

**Request Body:**

|Field|Type|Required|Notes|
|---|---|---|---|
|fkLuColorId|int|✅|FK → lu_color_code|
|materialRate|decimal|✅|Price for this color+size combo|
|size|string|✅|Size label (e.g., S, M, L, XL)|

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
|senderId|int|✅|FK → Party_master. Selected from sender dropdown. v2.3|
|senderName|string|✅|Snapshot for order_master (label display).|
|senderMobile|string|✅|Snapshot for order_master (label display).|
|senderAddress|string|❌|Flat address string (snapshot only).|
|senderCity|string|❌|Structured city for Mode A synthetic receiver. v2.3|
|senderState|string|❌|Structured state for Mode A synthetic receiver. v2.3|
|senderPincode|string|❌|Structured pincode for Mode A synthetic receiver. v2.3|
|courierId|int|✅|FK → courier_partner_master|
|products|array|❌|Root-level products (Mode A/C). v2.1|
|receivers|array|❌|Array of receivers (Mode B/C). v2.1|
|receivers[].receiverName|string|✅||
|receivers[].products|array|✅|Nested products|

> ⚠️ v2.1: `products` and `receivers` are both optional, but at least one must be present (Zod superRefine validation).

**Order Modes (v2.1):**
- **Mode A (Sender-to-Self):** Only root `products[]`. Backend creates synthetic receiver from `senderAddress`, `senderCity`, `senderState`, `senderPincode` fields passed in payload.
- **Mode B (Normal):** Only `receivers[]`. Standard multi-receiver flow.
- **Mode C (Combo):** Both `products[]` and `receivers[]`. Synthetic sender-receiver prepended to receivers list.

**Business Rules:**

- 1 receiver = 1 parcel (auto-generated with unique QR code).
- Order status is implicitly derived as CREATED. All parcel statuses are explicitly set to PENDING. No status is inserted into the order table.
- Mode A uses sender address fields from the payload (`senderCity`, `senderState`, `senderPincode`) for the synthetic receiver. Frontend should populate these from the selected sender's address book.

##### 7.3 List Orders

`GET /orders?page=1&limit=20&status=DISPATCHED` **Filters:**

|Filter|Type|Description|
|---|---|---|
|status|string|The backend dynamically computes this filter across parcel aggregates on the fly using `prc_GetAllOrdersSummary`.|

---
````

## File: .windsurf/memories/api_contract_v2.2_p1.md
````markdown
---
trigger: model_decision
description: src/interfaces/http/**/*
---

### SDCMS — API Contract v2.2

**Project:** Smart Dispatch & Courier Management System 
**Date:** 2026-04-28 
**Base URL:** http://localhost:5000/api/v1 
**Total Endpoints:** 55

> v2.2 CHANGES: Product color/size matrix endpoint, color matrix pricing hierarchy.
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
|7|POST|/products/:id/matrix|Add/update color/size matrix variation (v2.2)|

##### 4.3 Product+Category Dropdown (v2.1)

`GET /products/dropdown?search=cotton` Returns all active products JOINed with their `product_category.CategoryName`. Useful for order creation form searchable dropdown.

##### 4.2 Create Product

`POST /products` **Request Body:**

|Field|Type|Required|Notes|
|---|---|---|---|
|materialName|string|✅|Product display name|
|materialRate|decimal|✅|Catalog price (MRP)|
|cuItemCode|string|❌|ERP integration code|

##### 4.4 Get Product by ID (v2.2 Enrichment)

`GET /products/:id` now returns the product **including** an associated `variations` array from `product_color_matrix`, showing all color/size-specific pricing entries.

##### 4.5 Add/Update Product Color Matrix (v2.2)

`POST /products/:id/matrix` — **ADMIN, OPERATOR**

Adds or updates a color/size pricing variation for a product. Maps to `prc_product_color_matrix_set`.

**Request Body:**

|Field|Type|Required|Notes|
|---|---|---|---|
|fkLuColorId|int|✅|FK → lu_color_code|
|materialRate|decimal|✅|Price for this color+size combo|
|size|string|✅|Size label (e.g., S, M, L, XL)|

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
|senderId|int|✅|FK → Party_master. Selected from sender dropdown. v2.3|
|senderName|string|✅|Snapshot for order_master (label display).|
|senderMobile|string|✅|Snapshot for order_master (label display).|
|senderAddress|string|❌|Flat address string (snapshot only).|
|senderCity|string|❌|Structured city for Mode A synthetic receiver. v2.3|
|senderState|string|❌|Structured state for Mode A synthetic receiver. v2.3|
|senderPincode|string|❌|Structured pincode for Mode A synthetic receiver. v2.3|
|courierId|int|✅|FK → courier_partner_master|
|products|array|❌|Root-level products (Mode A/C). v2.1|
|receivers|array|❌|Array of receivers (Mode B/C). v2.1|
|receivers[].receiverName|string|✅||
|receivers[].products|array|✅|Nested products|

> ⚠️ v2.1: `products` and `receivers` are both optional, but at least one must be present (Zod superRefine validation).

**Order Modes (v2.1):**
- **Mode A (Sender-to-Self):** Only root `products[]`. Backend creates synthetic receiver from `senderAddress`, `senderCity`, `senderState`, `senderPincode` fields passed in payload.
- **Mode B (Normal):** Only `receivers[]`. Standard multi-receiver flow.
- **Mode C (Combo):** Both `products[]` and `receivers[]`. Synthetic sender-receiver prepended to receivers list.

**Business Rules:**

- 1 receiver = 1 parcel (auto-generated with unique QR code).
- Order status is implicitly derived as CREATED. All parcel statuses are explicitly set to PENDING. No status is inserted into the order table.
- Mode A uses sender address fields from the payload (`senderCity`, `senderState`, `senderPincode`) for the synthetic receiver. Frontend should populate these from the selected sender's address book.

##### 7.3 List Orders

`GET /orders?page=1&limit=20&status=DISPATCHED` **Filters:**

|Filter|Type|Description|
|---|---|---|
|status|string|The backend dynamically computes this filter across parcel aggregates on the fly using `prc_GetAllOrdersSummary`.|

---
````

## File: bruno-html-docs/Authentication-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authentication - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Authentication\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Login Users\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/auth/login'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \n            \n            \"email\":\"admin@test.com\",\n            \"password\":\"admin\"\n            \n          }\n\n\n          // // Operator Login\n\n          // {\n          //   \"email\":\"operator@test.com\",\n          //   \"password\":\"user\"\n          // }\n\n          // {\n          //   \"email\": \"john@example.com\",\n          //   \"password\": \"password123\"\n          // }\n    runtime:\n      scripts:\n        - type: after-response\n          code: |-\n            // 1. Parse the JSON response\n            const response = res.getBody();\n\n            // 2. Check if login was successful and token exists\n            if (response.success && response.data && response.data.token) {\n              const token = response.data.token;\n              \n              // 3. Save the token to your environment variable\n              bru.setGlobalEnvVar(\"authToken\", token);\n              \n              console.log(\"Token successfully saved!\");\n            } else {\n              console.error(\"Login failed or token not found in response\");\n            }\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data.token\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 1. Login (Token Generation)\n      Authenticates a user and provides a JWT (JSON Web Token) to be used for subsequent authorized requests.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/auth/login` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"email\": \"admin@example.com\",\n        \"password\": \"securePass123\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\n          \"expiresIn\": \"8h\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Post-Request Script / Assertions**\n      * **Status Check:** `res.status` must be **200**.\n      * **Success Check:** `res.body.success` should be **true**.\n      * **Environment Setup:** Automatically store `res.body.data.token` as the variable `{{authToken}}`.\n\n      ---\n  - info:\n      name: System Health\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/system/health'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: Only Run this if you're in Office, or sure that the MYSQL Database is up & Running\n  - info:\n      name: USER Profile @private\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/auth/profile'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Get Profile Details\n      Retrieves the identity and permission metadata for the currently authenticated user based on the provided Bearer token. This ensures the frontend can adapt the UI based on the user's role.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/auth/profile` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"employeeCode\": \"EMP-001\",\n          \"firstName\": \"Admin\",\n          \"lastName\": \"User\",\n          \"roleCode\": \"ADMIN\",\n          \"permissions\": [\"CREATE_ORDER\", \"MANAGE_EMPLOYEES\"]\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Property Check:** `res.body.data` must contain the keys `employeeCode` and `roleCode`.\n      * **Type Validation:** `res.body.data.firstName` must be a **string**.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-29T08:36:37.763Z'\n    exportedUsing: Bruno/3.3.0\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Courier Partners-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Courier Partners - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Courier Partners\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Create Courier\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/courier-partners'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |\n          {\n            \"courierName\": \"Bacha Bhaya Express\",\n            \"phoneNo\": \"0987542149\",\n            \"trackingUrlTemplate\": \"https://bacha.express/track?awb={AWB}\"\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.success\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data.courierName\n          operator: eq\n          value: '\"Speedy Express\"'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Create Courier Partner\n      Registers a new shipping provider in the system. The `trackingUrlTemplate` is a critical field, as it allows the system to dynamically generate tracking links for customers by replacing the `{AWB}` placeholder with actual tracking numbers.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/courier-partners` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"courierName\": \"Speedy Express\",\n        \"phoneNo\": \"1234567890\",\n        \"trackingUrlTemplate\": \"https://speedy.express/track?awb={AWB}\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"courierName\": \"Speedy Express\",\n          \"phoneNo\": \"1234567890\",\n          \"trackingUrlTemplate\": \"https://speedy.express/track?awb={AWB}\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Data Integrity:** `res.body.data.courierName` must match exactly **\"Speedy Express\"**.\n\n      ---\n  - info:\n      name: Delete Courier\n      type: http\n      seq: 5\n    http:\n      method: DELETE\n      url: '{{base_url}}/courier-partners/:id'\n      params:\n        - name: id\n          value: '7'\n          type: path\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Delete Courier Partner\n      Removes a courier partner from the active rotation. Like other modules in this sprint, this action typically flags the partner as inactive to ensure that historical order tracking links remain functional.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `DELETE` |\n      | **URL** | `{{baseUrl}}/api/v1/courier-partners/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"message\": \"Courier partner deleted successfully\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Persistence Check:** The deleted courier should no longer appear in the results for the **Get All Courier Partners** endpoint.\n\n      ---\n  - info:\n      name: Get Courier By ID\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/courier-partners/:id'\n      params:\n        - name: id\n          value: '7'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: List Couriers\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/courier-partners?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data[0].courierName\n          operator: isDefined\n          value: ''\n        - expression: res.body.data[0].trackingUrlTemplate\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. Get All Courier Partners\n      Retrieves a list of all active courier partners integrated with the platform, including their unique tracking URL templates.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/courier-partners` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 1,\n            \"courierName\": \"Speedy Express\",\n            \"phoneNo\": \"1234567890\",\n            \"trackingUrlTemplate\": \"https://speedy.express/track?awb={AWB}\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Field Validation:** Each record must contain a `courierName` and a `trackingUrlTemplate`.\n\n      ---\n  - info:\n      name: Update Courier\n      type: http\n      seq: 4\n    http:\n      method: PUT\n      url: '{{base_url}}/courier-partners/:id'\n      headers:\n        - name: Content-Type\n          value: application/json\n      params:\n        - name: id\n          value: '7'\n          type: path\n      body:\n        type: json\n        data: |-\n          {\n            \"courierName\": \"Mulay Bhaya\",\n             \"trackingUrlTemplate\": \"https://mulay.express/track?awb={AWB}\"\n          //     \"isActive\": false\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Update Courier Partner\n      Enables the modification of an existing courier partner's details, such as rebranding the partner name or updating contact information.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/courier-partners/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"courierName\": \"Speedy Express Premium\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"courierName\": \"Speedy Express Premium\",\n          \"updatedAt\": \"2026-04-20T10:35:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Verification:** The response body should confirm the name change to **\"Speedy Express Premium\"**.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-29T08:36:56.527Z'\n    exportedUsing: Bruno/3.3.0\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Employee Management (ADMIN)-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management (ADMIN) - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Employee Management (ADMIN)\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Create Employee\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/employees'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |\n          {\n            \"name\": \"Nikhil Swami\",\n            \"email\": \"nikhil@example.com\",\n            \"phoneNo\": \"8404881819\",\n            \"role\": \"ADMIN\",\n            \"password\": \"password123\"\n            \n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '201'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data.employeeCode\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Create Employee\n      Registers a new user into the system with specific access privileges defined by their `roleCode`. This endpoint handles the initial setup of credentials and account status.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/employees` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"employeeName\": \"John Doe\",\n        \"email\": \"john@example.com\",\n        \"phoneNo\": \"9000000000\",\n        \"roleCode\": \"OPERATOR\",\n        \"password\": \"password123\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK` or `201 Created`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 5,\n          \"employeeName\": \"John Doe\",\n          \"roleCode\": \"OPERATOR\",\n          \"createdAt\": \"2026-04-20T10:40:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should be **200** or **201**.\n      * `res.body.success` should equal **true**.\n      * **Data Validation:** The `employeeName` in the response must match **\"John Doe\"**.\n      * **Security Check:** The `password` field should **never** be returned in the response body.\n\n      ---\n  - info:\n      name: Get Employee By ID\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/employees/:id'\n      params:\n        - name: id\n          value: '3'\n          type: path\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: List Employees\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/employees?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. List All Employees\n      Retrieves a comprehensive list of staff members. This is typically restricted to users with **ADMIN** privileges to manage system access.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/employees` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 1,\n            \"employeeName\": \"John Doe\",\n            \"email\": \"john@example.com\",\n            \"roleCode\": \"OPERATOR\",\n            \"allowLogin\": true\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Data Integrity:** The response should return an array of employee objects.\n\n      ---\n  - info:\n      name: Toggle Access\n      type: http\n      seq: 5\n    http:\n      method: PATCH\n      url: '{{base_url}}/employees/3/toggle-access'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |2-\n            {\n              \"allowLogin\": false \n            }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data.allowLogin\n          operator: isFalsy\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Toggle Employee Access\n      Controls an employee's ability to log into the system without deleting their record. This is vital for temporary suspensions or immediate revocation of access upon offboarding.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/employees/1/toggle-access` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"allowLogin\": false\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"employeeName\": \"John Doe Updated\",\n          \"allowLogin\": false,\n          \"statusMessage\": \"Login access has been disabled.\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Logic Check:** The `allowLogin` flag in the response must match the boolean value sent in the payload.\n\n      ---\n  - info:\n      name: Update Employee\n      type: http\n      seq: 4\n    http:\n      method: PUT\n      url: '{{base_url}}/employees/:id'\n      headers:\n        - name: Content-Type\n          value: application/json\n      params:\n        - name: id\n          value: '3'\n          type: path\n      body:\n        type: json\n        data: |-\n          {\n            \"name\": \"Ravi Kumar\",\n            \"phoneNo\": \"1234567890\",\n            \"email\": \"aditb@example.com\"\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Update Employee\n      Modifies the profile information of an existing employee record. This is used for administrative updates such as name changes or contact detail corrections.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/employees/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"employeeName\": \"John Doe Updated\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"employeeName\": \"John Doe Updated\",\n          \"updatedAt\": \"2026-04-20T10:45:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Verification:** The `employeeName` field in the response must reflect the updated value.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-29T08:36:48.231Z'\n    exportedUsing: Bruno/3.3.0\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Product Catalog-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Catalog - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Product Catalog\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Add Product\n      type: http\n      seq: 2\n    http:\n      method: POST\n      url: '{{base_url}}/products'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \"materialName\": \"Product w. variations\",\n            \"categoryId\": 1,\n            \"unitId\": 1,\n            \"materialRate\": 500,\n            \"materialDescription\": \"Testing\",\n            \n            \"variations\": [\n              {\n                \"colorId\": 1,\n                \"size\": \"M\",\n                \"materialRate\": 550\n              },\n              \n              {\n                \"colorId\": 2,\n                \"size\": \"L\",\n                \"materialRate\": 600\n              }\n            ]\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Create Product\n      Adds a new product to the inventory with a defined name and base material rate.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/products` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"productName\": \"Heavy Equipment\",\n        \"materialRate\": 500\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 2,\n          \"productName\": \"Heavy Equipment\",\n          \"materialRate\": 500\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Persistence Check:** The response must return the newly created product's unique ID.\n\n      ---\n  - info:\n      name: Delete Product\n      type: http\n      seq: 5\n    http:\n      method: DELETE\n      url: '{{base_url}}/products/:id'\n      params:\n        - name: id\n          value: '46'\n          type: path\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Delete Product\n      Removes a product from the system. This typically follows soft-delete logic to preserve historical pricing data in existing orders.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `DELETE` |\n      | **URL** | `{{baseUrl}}/api/v1/products/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"message\": \"Product deleted successfully\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Verification:** Future `GET` requests for product ID `1` should return a `404 Not Found` or show the product as inactive.\n\n      ---\n  - info:\n      name: Get Product by ID\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/products/:id'\n      params:\n        - name: id\n          value: '46'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: List Products\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/products'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. List All Products\n      Retrieves a list of all products available in the system, including their associated material rates.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/products` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 1,\n            \"productName\": \"Heavy Equipment\",\n            \"materialRate\": 500,\n            \"updatedAt\": \"2026-04-20T09:00:00Z\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Schema Check:** Each item in the `data` array should contain an `id`, `productName`, and `materialRate`.\n\n      ---\n  - info:\n      name: Product Dropdown\n      type: http\n      seq: 6\n    http:\n      method: GET\n      url: '{{base_url}}/products/dropdown'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: // No Color IN response of product dropdown\n  - info:\n      name: Update Product\n      type: http\n      seq: 3\n    http:\n      method: PUT\n      url: '{{base_url}}/products/:id'\n      headers:\n        - name: Content-Type\n          value: application/json\n      params:\n        - name: id\n          value: '46'\n          type: path\n      body:\n        type: json\n        data: |-\n          {\n            \"materialRate\": 550,\n            \"variations\": [\n              {\n                \"matrixId\": 186,\n                \"colorId\": 1,\n                \"size\": \"M\",\n                \"materialRate\": 560\n              },\n              {\n                \"colorId\": 1,\n                \"size\": \"S\",\n                \"materialRate\": 480\n              },\n              {\n                \"matrixId\": 187,\n                \"isActive\": false\n              }\n              // IsAcive Not running\n            ]\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Update Product\n      Updates specific fields of an existing product, such as adjusting the material rate due to market fluctuations.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/products/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"materialRate\": 550\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"productName\": \"Heavy Equipment\",\n          \"materialRate\": 550,\n          \"updatedAt\": \"2026-04-20T10:30:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Update Verification:** The `materialRate` in the response must match the new value (**550**).\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-29T08:37:07.168Z'\n    exportedUsing: Bruno/3.3.0\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: bruno-html-docs/Senders-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Senders - API Documentation</title>
    <style>
        body { margin: 0; padding: 0; }
        #opencollection-container { width: 100vw; height: 100vh; }
    </style>
    <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
    <script src="https://cdn.opencollection.com/docs.js"></script>
</head>
<body>
    <div id="opencollection-container"></div>
    <script>
        const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Senders\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Create Sender Address\n      type: http\n      seq: 12\n    http:\n      method: POST\n      url: '{{base_url}}/senders/:id/addresses'\n      params:\n        - name: id\n          value: '1'\n          type: path\n      body:\n        type: json\n        data: |-\n          {\n            \"address\": \"456 Khalifa\",\n            \"city\": \"Mumbai\",\n            \"state\": \"Maharashtra\",\n            \"pincode\": \"400001\"\n          }\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: Create Sender\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/senders'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |+\n          {\n            \"customerName\": \"John Doe Enterprises\",\n            \"phoneNo\": \"9876123450\",\n            \"emailId\": \"john.doe@example.com\",\n            \"address\": \"123 Business Park, Sector 62\",\n            \"city\": \"Noida\",\n            \"state\": \"Uttar Pradesh\",\n            \"pincode\": \"201301\"\n          }\n\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. Create Sender\n      Registers a new sender entity in the system with full contact and address details.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"customerName\": \"John Doe Enterprises\",\n        \"phoneNo\": \"9876543210\",\n        \"emailId\": \"john.doe@example.com\",\n        \"addressLine1\": \"123 Business Park\",\n        \"addressLine2\": \"Sector 62\",\n        \"city\": \"Noida\",\n        \"state\": \"Uttar Pradesh\",\n        \"pincode\": \"201301\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `201 Created`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"PkPartyId\": 10,\n          \"customerName\": \"John Doe Enterprises\",\n          \"createdAt\": \"2026-04-20T10:22:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **201**\n      * `res.body.success` should equal **true**\n      * **Persistence Check:** The response should return a unique `PkPartyId`.\n\n      ---\n  - info:\n      name: Delete Specific Sender (Soft Delete)\n      type: http\n      seq: 10\n    http:\n      method: DELETE\n      url: '{{base_url}}/senders/:id'\n      params:\n        - name: id\n          value: '6'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Delete Sender (Soft-Delete)\n      Removes a sender from active use. To maintain data integrity for past orders, the system performs a **soft-delete** (marking the record as inactive) rather than a permanent removal from the database.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `DELETE` |\n      | **URL** | `{{baseUrl}}/api/v1/senders/:id` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"message\": \"Sender deleted successfully\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Inactivity Check:** Subsequent `GET` requests for this ID should return a `404` or indicate the record is inactive, depending on the implementation.\n\n      ---\n  - info:\n      name: Get Specific Sender\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/senders/:id'\n      params:\n        - name: id\n          value: '1'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Get Specific Sender\n      Retrieves the detailed profile of a single sender using their unique primary key.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/senders/:id` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      > **Note:** Replace `:id` with a valid `PkPartyId` (e.g., `10`) obtained from the creation or list response.\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Consistency:** The `PkPartyId` in the response must match the `:id` provided in the URL.\n\n      ---\n  - info:\n      name: Get all senders\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/senders'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Get All Senders\n      Retrieves a list of all registered sender entities in the system.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"PkPartyId\": 10,\n            \"customerName\": \"John Doe Enterprises\",\n            \"phoneNo\": \"9876543210\",\n            \"emailId\": \"john.doe@example.com\",\n            \"city\": \"Noida\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Type Validation:** `customerName`, `phoneNo`, and `emailId` must all be of type **String**.\n      * **Data Check:** The `data` array should contain at least one sender object if the database is seeded.\n\n      ---\n  - info:\n      name: Lookup Sender By Phone\n      type: http\n      seq: 7\n    http:\n      method: GET\n      url: '{{base_url}}/senders/lookup?phone=9876543210'\n      params:\n        - name: phone\n          value: '9876543210'\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Lookup Sender by Phone\n      Enables quick retrieval of a sender's profile using their mobile number. This is typically used in the UI to auto-fill sender details during order creation.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/senders/lookup?phone=9876543210` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"PkPartyId\": 10,\n          \"customerName\": \"John Doe Enterprises\",\n          \"phoneNo\": \"9876543210\",\n          \"addressLine1\": \"123 Business Park\",\n          \"city\": \"Noida\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Verification:** The `phoneNo` in the response must match the query parameter provided.\n\n      ---\n  - info:\n      name: Update Sender\n      type: http\n      seq: 8\n    http:\n      method: PUT\n      url: '{{base_url}}/senders/:id'\n      headers:\n        - name: Content-Type\n          value: application/json\n      params:\n        - name: id\n          value: '6'\n          type: path\n      body:\n        type: json\n        data: |-\n          {\n            \"emailId\": \"udsuds@gmail.com\"\n          }\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Update Sender\n      Updates the information for an existing sender record. Partial updates are supported (e.g., changing just the city and state).\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/senders/:id` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"customerName\": \"John Doe Enterprises Updated\",\n        \"city\": \"Gurugram\",\n        \"state\": \"Haryana\"\n      }\n      ```\n\n      > **Note:** Replace `:id` with the relevant `PkPartyId`.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"PkPartyId\": 10,\n          \"customerName\": \"John Doe Enterprises Updated\",\n          \"city\": \"Gurugram\",\n          \"state\": \"Haryana\",\n          \"updatedAt\": \"2026-04-20T10:25:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Update Verification:** Ensure fields like `customerName` and `city` reflect the new values provided in the payload.\n\n      ---\n  - info:\n      name: Validation - Create Sender\n      type: http\n      seq: 2\n    http:\n      method: POST\n      url: '{{base_url}}/senders'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \"customerName\": \"John Doe Enterprises\",\n            \"phoneNo\": \"9876543210\",\n            \"emailId\": \"INVALID_EMAIL\",\n            //   \"emailId\": \"john.doe@example.com\",\n            \"addressLine1\": \"123 Business Park\",\n            \"addressLine2\": \"Sector 62\",\n            \"city\": \"Noida\",\n            \"state\": \"Uttar Pradesh\",\n            \"pincode\": \"201301\"\n          }\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 7. Validation Test (Missing Required Fields)\n      Verifies that the API correctly identifies and rejects requests that are missing mandatory sender information.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"customerName\": \"Incomplete Sender\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Validation failed\",\n        \"details\": [\n          \"phoneNo is required\",\n          \"addressLine1 is required\",\n          \"city is required\"\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Error Detail:** The response must contain specific error messages pointing out the missing required fields.\n\n      ---\n  - info:\n      name: Validation - Update Sender\n      type: http\n      seq: 9\n    http:\n      method: POST\n      url: '{{base_url}}/senders'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          // These are the required fields\n          // {\n          //   \"customerName\": \"John Doe Enterprises Updated\",\n          //   \"city\": \"Gurugram\",\n          //   \"state\": \"Haryana\"\n          // }\n\n          // Missing Required Fields \n          {\n            \"customerName\": \"John Doe Enterprises Missing\"\n          }\n\n          // Should Throw Error\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 8. Validation Test (Invalid Email)\n      Ensures that the API performs data format validation on specific fields, such as checking for a correctly formatted email address.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"customerName\": \"Jane Smith\",\n        \"phoneNo\": \"1234567890\",\n        \"emailId\": \"invalid-email\",\n        \"addressLine1\": \"A-101\",\n        \"city\": \"Mumbai\",\n        \"state\": \"Maharashtra\",\n        \"pincode\": \"400001\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Validation failed\",\n        \"details\": [\n          \"emailId must be a valid email address\"\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Constraint Check:** The system must reject the payload specifically because the `emailId` does not follow the standard email format (e.g., `user@domain.com`).\n\n      ---\n  - info:\n      name: GET Addresses\n      type: http\n      seq: 11\n    http:\n      method: GET\n      url: '{{base_url}}/senders/:id/addresses'\n      params:\n        - name: id\n          value: '1'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: Get all senders names\n      type: http\n      seq: 5\n    http:\n      method: GET\n      url: '{{base_url}}/senders/names'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Get All Senders\n      Retrieves a list of all registered sender entities in the system.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"PkPartyId\": 10,\n            \"customerName\": \"John Doe Enterprises\",\n            \"phoneNo\": \"9876543210\",\n            \"emailId\": \"john.doe@example.com\",\n            \"city\": \"Noida\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Type Validation:** `customerName`, `phoneNo`, and `emailId` must all be of type **String**.\n      * **Data Check:** The `data` array should contain at least one sender object if the database is seeded.\n\n      ---\n  - info:\n      name: Get all senders Phones\n      type: http\n      seq: 6\n    http:\n      method: GET\n      url: '{{base_url}}/senders/phones'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Get All Senders\n      Retrieves a list of all registered sender entities in the system.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"PkPartyId\": 10,\n            \"customerName\": \"John Doe Enterprises\",\n            \"phoneNo\": \"9876543210\",\n            \"emailId\": \"john.doe@example.com\",\n            \"city\": \"Noida\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Type Validation:** `customerName`, `phoneNo`, and `emailId` must all be of type **String**.\n      * **Data Check:** The `data` array should contain at least one sender object if the database is seeded.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-29T08:37:14.646Z'\n    exportedUsing: Bruno/3.3.0\n";
        new window.OpenCollection({
            target: document.getElementById('opencollection-container'),
            opencollection: collectionData,
            theme: 'light'
        });
    </script>
</body>
</html>
````

## File: src/interfaces/http/controllers/employee.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/employee.controller.js
// Description: HTTP controllers for Employee Management endpoints.
// Formats API responses to match the `{ success: true, data: { ... } }` contract.
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// ============================================================================

import asyncHandler from 'express-async-handler';
import employeeService from '../../../modules/employee/employee.service.js';

// @desc    Get all employees (paginated)
// @route   GET /api/v1/employees
// @access  Private/Admin
export const getEmployees = asyncHandler(async (req, res) => {
  const result = await employeeService.getEmployees(req.query);
  res.json({
    success: true,
    data: result.data,
    meta: result.meta
  });
});

// @desc    Get employee by ID
// @route   GET /api/v1/employees/:id
// @access  Private/Admin
export const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  res.json({
    success: true,
    data: employee
  });
});

// @desc    Create a new employee
// @route   POST /api/v1/employees
// @access  Private/Admin
export const createEmployee = asyncHandler(async (req, res) => {
  const newEmployee = await employeeService.createEmployee(req.body);
  res.status(201).json({
    success: true,
    data: newEmployee
  });
});

// @desc    Update employee details
// @route   PUT /api/v1/employees/:id
// @access  Private/Admin
export const updateEmployee = asyncHandler(async (req, res) => {
  const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
  res.json({
    success: true,
    data: updatedEmployee
  });
});

// @desc    Toggle employee login access
// @route   PATCH /api/v1/employees/:id/toggle-access
// @access  Private/Admin
export const toggleAccess = asyncHandler(async (req, res) => {
  const { allowLogin } = req.body;
  
  if (allowLogin === undefined) {
    const error = new Error('allowLogin boolean is required');
    error.statusCode = 400;
    throw error;
  }

  // Pass the calling user's ID to prevent self-lockout
  const adminId = req.user.id; 
  const employeeIdToToggle = req.params.id;

  const updatedEmployee = await employeeService.toggleAccess(adminId, employeeIdToToggle, allowLogin);
  res.json({
    success: true,
    data: updatedEmployee
  });
});
````

## File: src/interfaces/http/controllers/parcel.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/parcel.controller.js
// Description: Express route handlers for the Parcel module (API Contract §8).
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// All responses use the standard envelope: { success, data?, error? }
//
// Covers Sprint 3 (retrieval, label data, timeline, log-print) and
// Sprint 4 (scan+AWB, dispatch, terminal states).
// ============================================================================

import asyncHandler from 'express-async-handler';
import parcelService from '../../../modules/parcel/parcel.service.js';

/**
 * GET /api/v1/parcels
 * Lists all parcels with pagination and optional filters.
 * Maps to: prc_parcel_details_get (pAction=0)
 */
export const getParcelList = asyncHandler(async (req, res) => {
  const filters = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 20,
    search: req.query.search || null,
    status: req.query.status || null,
    sortBy: req.query.sortBy || 'created_at',
    sortOrder: req.query.sortOrder || 'desc'
  };

  const { data, total } = await parcelService.getParcelList(filters);

  res.json({
    success: true,
    data,
    meta: {
      page: filters.page,
      limit: filters.limit,
      totalRows: total,
      totalPages: Math.ceil(total / filters.limit)
    }
  });
});

/**
 * GET /api/v1/parcels/:id
 * Gets details of a specific parcel.
 * Maps to: prc_parcel_details_get (pAction=1)
 */
export const getParcelById = asyncHandler(async (req, res) => {
  const data = await parcelService.getParcelDetails(req.params.id);
  res.json({ success: true, data });
});

/**
 * GET /api/v1/parcels/:id/label-data
 * Gets stitched label data for frontend rendering.
 * Maps to: prc_parcel_details_get (pAction=2)
 * Backend does NOT generate QR images — frontend responsibility.
 */
export const getLabelData = asyncHandler(async (req, res) => {
  const data = await parcelService.getLabelData(req.params.id);
  res.json({ success: true, data });
});

/**
 * GET /api/v1/parcels/:id/timeline
 * Gets Amazon-style chronological event timeline for a parcel.
 * Maps to: prc_receiver_status_details_get (pAction=1)
 */
export const getTimeline = asyncHandler(async (req, res) => {
  const data = await parcelService.getTimeline(req.params.id);
  res.json({ success: true, data });
});

/**
 * POST /api/v1/parcels/:id/log-print
 * Logs a label print event and transitions parcel to LABEL_PRINTED.
 * Maps to: prc_parcel_details_set
 * Effects: increments LabelPrintCount, triggers prc_receiver_status_details_set.
 */
export const logPrint = asyncHandler(async (req, res) => {
  const data = await parcelService.logLabelPrint(req.params.id, req.user);
  res.json({ success: true, data });
});

/**
 * POST /api/v1/parcels/scan
 * Atomic two-scan operation: QR scan + AWB link.
 * Maps to: prc_parcel_details_set
 * Role-based: COURIER → auto-dispatch, OPERATOR/ADMIN → AWB_LINKED only.
 */
export const scanParcel = asyncHandler(async (req, res) => {
  const data = await parcelService.scanAndLinkAWB(req.body, req.user);
  res.json({ success: true, data });
});

/**
 * POST /api/v1/parcels/dispatch
 * Dispatches parcels in bulk (single or multiple).
 * Maps to: prc_parcel_details_set
 * Updates status to DISPATCHED, stamps DispatchDate.
 */
export const dispatchParcels = asyncHandler(async (req, res) => {
  const data = await parcelService.dispatchParcels(req.body.parcelIds, req.user);
  res.json({ success: true, data });
});

/**
 * PATCH /api/v1/parcels/:id/deliver
 * Marks parcel as DELIVERED (terminal state).
 * Maps to: prc_parcel_details_set
 * Business rule: parcel must be DISPATCHED.
 */
export const deliverParcel = asyncHandler(async (req, res) => {
  const data = await parcelService.deliverParcel(req.params.id, req.user);
  res.json({ success: true, data });
});

/**
 * PATCH /api/v1/parcels/:id/return
 * Marks parcel as RETURNED.
 * Maps to: prc_parcel_details_set
 * Business rule: only after dispatch (DISPATCHED, DELIVERED).
 */
export const returnParcel = asyncHandler(async (req, res) => {
  const data = await parcelService.returnParcel(req.params.id, req.user);
  res.json({ success: true, data });
});
````

## File: src/interfaces/http/controllers/receiver.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/receiver.controller.js
// Description: Lightweight receiver lookup controllers.
//              Reuses SenderService with partyTypeId=2 (Receiver).
// ============================================================================

import asyncHandler from 'express-async-handler';
import senderService from '../../../modules/sender/sender.service.js';

// ============================================================================
// RECEIVER LOOKUP CONTROLLERS (autocomplete dropdowns)
// Shares the same service layer as senders — only partyTypeId differs.
// ============================================================================

/**
 * @desc    Get all distinct active receiver names
 * @route   GET /api/v1/receivers/names
 * @access  Private (ADMIN, OPERATOR)
 */
export const getAllNames = asyncHandler(async (req, res) => {
  const names = await senderService.getAllSenderNames(2);

  res.status(200).json({
    success: true,
    data: names
  });
});

/**
 * @desc    Get all distinct active receiver phone numbers
 * @route   GET /api/v1/receivers/phones
 * @access  Private (ADMIN, OPERATOR)
 */
export const getAllPhones = asyncHandler(async (req, res) => {
  const phones = await senderService.getAllPhoneNumbers(2);

  res.status(200).json({
    success: true,
    data: phones
  });
});

/**
 * @desc    Lookup receivers by name (partial match)
 * @route   GET /api/v1/receivers/lookup-by-name?name=...
 * @access  Private (ADMIN, OPERATOR)
 */
export const lookupByName = asyncHandler(async (req, res) => {
  const receivers = await senderService.lookupByName(req.query.name, 2);

  res.status(200).json({
    success: true,
    data: receivers
  });
});

/**
 * @desc    Lookup receivers by phone number (partial match)
 * @route   GET /api/v1/receivers/lookup-by-phone?phone=...
 * @access  Private (ADMIN, OPERATOR)
 */
export const lookupByPhone = asyncHandler(async (req, res) => {
  const receivers = await senderService.lookupByPhone(req.query.phone, 2);

  res.status(200).json({
    success: true,
    data: receivers
  });
});

/** 
 * @desc Get all addresses for a receiver
 * @route GET /api/v1/receivers/:id/addresses
 * @access Private (ADMIN, OPERATOR)
 */
export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await senderService.getAddressesByPartyId(req.params.id);

  res.status(200).json({
    success: true,
    data: addresses
  });
});

/**
 * @desc Create a new address for a receiver
 * @route POST /api/v1/receivers/:id/addresses
 * @access Private (ADMIN, OPERATOR)
 */
export const createAddress = asyncHandler(async (req, res) => {
  const address = await senderService.createAddress(req.params.id, req.body, req.user);

  res.status(201).json({
    success: true,
    data: address
  });
});
````

## File: src/interfaces/http/routes/auth.routes.js
````javascript
import express from 'express';
import { login, getUserProfile } from '../controllers/auth.controller.js';
import { protect } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { loginSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// Public Routes
router.post('/login', validate(loginSchema), login);

// Protected Routes (Require Token)
// Notice how we put the 'protect' middleware before the controller function
router.get('/profile', protect, getUserProfile);

export default router;
````

## File: src/interfaces/http/routes/employee.routes.js
````javascript
// ============================================================================
// File: src/interfaces/http/routes/employee.routes.js
// Description: Express routes for Employee Management.
// Maps endpoints to controllers and enforces role-based access.
// ============================================================================

import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  toggleAccess
} from '../controllers/employee.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createEmployeeSchema, updateEmployeeSchema, toggleAccessSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// ALL endpoints in the Employee Management module require ADMIN access
// See API Contract: "3. Employee Management > Access: ADMIN only for all endpoints"
router.use(protect);
router.use(authorizeRoles('ADMIN'));

router.route('/')
  .get(getEmployees)
  .post(validate(createEmployeeSchema), createEmployee);

router.route('/:id')
  .get(getEmployeeById)
  .put(validate(updateEmployeeSchema), updateEmployee);

router.patch('/:id/toggle-access', validate(toggleAccessSchema), toggleAccess);

export default router;
````

## File: src/interfaces/http/routes/order.routes.js
````javascript
import express from 'express';
import { createOrder, getOrderList, getOrderById, updateOrder, cancelOrder } from '../controllers/order.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createOrderSchema, updateOrderSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// ============================================================================
// Order Management Routes — API Contract §7
// ============================================================================

// POST   /api/v1/orders           → Create complex order (ADMIN, OPERATOR)
router.post('/', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(createOrderSchema), createOrder);

// GET    /api/v1/orders           → List orders with derived status (ALL roles)
router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getOrderList);

// GET    /api/v1/orders/:id       → Get full order aggregate (ADMIN, OPERATOR)
router.get('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR'), getOrderById);

// PUT    /api/v1/orders/:id       → Update order before dispatch (ADMIN, OPERATOR)
router.put('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(updateOrderSchema), updateOrder);

// PATCH  /api/v1/orders/:id/cancel → Cancel entire order (ADMIN, OPERATOR)
router.patch('/:id/cancel', protect, authorizeRoles('ADMIN', 'OPERATOR'), cancelOrder);

export default router;
````

## File: src/interfaces/http/routes/parcel.routes.js
````javascript
import express from 'express';
import {
  getParcelList,
  getParcelById,
  getLabelData,
  getTimeline,
  logPrint,
  scanParcel,
  dispatchParcels,
  deliverParcel,
  returnParcel,
} from '../controllers/parcel.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { scanParcelSchema, dispatchParcelsSchema } from '../validations/parcel.validation.js';

const router = express.Router();

// ============================================================================
// Parcel Execution Routes — API Contract §8
// "Order = planning, Parcel = execution."
// ============================================================================

// --- STATIC WRITE ROUTES (must come before /:id to prevent Express param capture) ---

// POST   /api/v1/parcels/scan           → QR scan + AWB link (ALL roles)
router.post('/scan', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), validate(scanParcelSchema), scanParcel);

// POST   /api/v1/parcels/dispatch       → Dispatch parcels in bulk (ADMIN, OPERATOR)
router.post('/dispatch', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(dispatchParcelsSchema), dispatchParcels);

// --- READ OPERATIONS ---

// GET    /api/v1/parcels                → List parcels (ALL roles)
router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getParcelList);

// GET    /api/v1/parcels/:id            → Get parcel details (ALL roles)
router.get('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getParcelById);

// GET    /api/v1/parcels/:id/label-data → Get label data for rendering (ADMIN, OPERATOR)
router.get('/:id/label-data', protect, authorizeRoles('ADMIN', 'OPERATOR'), getLabelData);

// GET    /api/v1/parcels/:id/timeline   → Get Amazon-style event timeline (ALL roles)
router.get('/:id/timeline', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getTimeline);

// --- PARAMETERIZED WRITE OPERATIONS ---

// POST   /api/v1/parcels/:id/log-print  → Log label print event (ADMIN, OPERATOR)
router.post('/:id/log-print', protect, authorizeRoles('ADMIN', 'OPERATOR'), logPrint);

// --- TERMINAL STATE TRANSITIONS ---

// PATCH  /api/v1/parcels/:id/deliver    → Mark as delivered (ADMIN, OPERATOR)
router.patch('/:id/deliver', protect, authorizeRoles('ADMIN', 'OPERATOR'), deliverParcel);

// PATCH  /api/v1/parcels/:id/return     → Mark as returned (ADMIN, OPERATOR)
router.patch('/:id/return', protect, authorizeRoles('ADMIN', 'OPERATOR'), returnParcel);

export default router;
````

## File: src/interfaces/http/validations/notification.validation.js
````javascript
// ============================================================================
// File: src/interfaces/http/validations/notification.validation.js
// Description: Zod schema definitions for Notification request payloads.
// Note: validate.middleware.js parses req.body against these schemas.
// ============================================================================

import { z } from 'zod';

/**
 * Validation for sending a notification.
 * (Params only, no body required)
 * Uses z.any() to allow undefined/empty body from Supertest/Clients.
 */
export const sendNotificationSchema = z.any();

/**
 * Validation for resending a notification.
 * (Params only, no body required)
 */
export const resendNotificationSchema = z.any();

/**
 * Validation for external webhooks.
 * This schema matches the structure of req.body directly.
 */
export const webhookSchema = z.object({
  notificationId: z.number().int().positive('Notification ID must be a positive integer'),
  status: z.enum(['sent', 'delivered', 'failed'], {
    errorMap: () => ({ message: "Status must be 'sent', 'delivered', or 'failed'" })
  }),
  externalId: z.string().optional()
});
````

## File: src/modules/bulk-upload/bulk-upload.repository.js
````javascript
// ============================================================================
// File: src/modules/bulk-upload/bulk-upload.repository.js
// Description: Data access layer for Bulk Upload module.
// Documents and executes `CALL prc_...` stored procedures.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention:
//   - prc_bulk_order_upload_log_set / prc_bulk_order_upload_log_get
//   - prc_bulk_order_upload_detail_set / prc_bulk_order_upload_detail_get
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// ============================================================================
let mockSessions = [
  {
    PkBulkUploadId: 1,
    FileName: 'sample_orders.xlsx',
    TotalRows: 5,
    SuccessCount: 4,
    ErrorCount: 1,
    Status: 'COMPLETED',
    CreatedBy: 'admin@example.com',
    CreatedDate: '2026-04-10T10:00:00Z'
  }
];

let mockDetails = [
  { PkDetailId: 1, FkBulkUploadId: 1, RowNumber: 1, Status: 'Success', ResponseJson: '{"orderId":1}' },
  { PkDetailId: 2, FkBulkUploadId: 1, RowNumber: 2, Status: 'Success', ResponseJson: '{"orderId":2}' },
  { PkDetailId: 3, FkBulkUploadId: 1, RowNumber: 3, Status: 'Error', ResponseJson: '{"error":"Invalid sender"}' }
];

class BulkUploadRepository {
  /**
   * Create a bulk upload session log.
   * Procedure: CALL prc_bulk_order_upload_log_set(?, ?, ?, ?)
   * 
   * @param {number} pkId - 0 for insert.
   * @param {string} fileName - Name of the uploaded file.
   * @param {number} totalRows - Total orders in the file.
   * @param {string} createdBy - EmployeeCode of the uploader.
   * @returns {Promise<object>} The created log record.
   */
  async createSession(pkId, fileName, totalRows, createdBy) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_bulk_order_upload_log_set
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_bulk_order_upload_log_set(?, ?, ?, ?)', [
        pkId,
        fileName,
        totalRows,
        createdBy
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory session creation
    // ------------------------------------------------------------------
    const newId = mockSessions.length > 0 ? Math.max(...mockSessions.map(s => s.PkBulkUploadId)) + 1 : 1;
    const session = {
      PkBulkUploadId: newId,
      FileName: fileName,
      TotalRows: totalRows,
      SuccessCount: 0,
      ErrorCount: 0,
      Status: 'PROCESSING',
      CreatedBy: createdBy,
      CreatedDate: new Date().toISOString()
    };
    mockSessions.push(session);
    return session;
  }

  /**
   * Log the status of an individual row (order) in a bulk upload session.
   * Procedure: CALL prc_bulk_order_upload_detail_set(?, ?, ?, ?, ?)
   * 
   * @param {number} pkId - 0 for insert.
   * @param {number} sessionId - FK to bulk_order_upload_log.
   * @param {number} rowNumber - Excel row number.
   * @param {string} status - Result (Success/Error).
   * @param {string} responseJson - JSON string of the order create response or error.
   * @returns {Promise<object>} The created detail record.
   */
  async logRowDetail(pkId, sessionId, rowNumber, status, responseJson) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_bulk_order_upload_detail_set
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_bulk_order_upload_detail_set(?, ?, ?, ?, ?)', [
        pkId,
        sessionId,
        rowNumber,
        status,
        responseJson
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory detail logging
    // ------------------------------------------------------------------
    const newId = mockDetails.length > 0 ? Math.max(...mockDetails.map(d => d.PkDetailId)) + 1 : 1;
    const detail = {
      PkDetailId: newId,
      FkBulkUploadId: sessionId,
      RowNumber: rowNumber,
      Status: status,
      ResponseJson: responseJson
    };
    mockDetails.push(detail);
    return detail;
  }

  /**
   * Get bulk upload sessions.
   * Procedure: CALL prc_bulk_order_upload_log_get(?, ?)
   * 
   * @param {number} pAction - 0: Get all, 1: Get by ID.
   * @param {number|null} pId - Session ID if pAction=1.
   * @returns {Promise<Array|object>} List of sessions or a single session record.
   */
  async getSessions(pAction, pId = null) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_bulk_order_upload_log_get
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_bulk_order_upload_log_get(?, ?)', [
        pAction,
        pId
      ]);
      return pAction === 1 ? rows[0][0] : rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory session retrieval
    // ------------------------------------------------------------------
    if (pAction === 1) {
      return mockSessions.find(s => s.PkBulkUploadId === parseInt(pId)) || null;
    }
    return mockSessions;
  }

  /**
   * Get individual row details for a bulk upload session.
   * Procedure: CALL prc_bulk_order_upload_detail_get(?, ?)
   * 
   * @param {number} pAction - 0: Get by Session ID.
   * @param {number} sessionId - The session ID.
   * @returns {Promise<Array>} List of row details.
   */
  async getSessionDetails(pAction, sessionId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_bulk_order_upload_detail_get
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_bulk_order_upload_detail_get(?, ?)', [
        pAction,
        sessionId
      ]);
      return rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory detail retrieval
    // ------------------------------------------------------------------
    return mockDetails.filter(d => d.FkBulkUploadId === parseInt(sessionId));
  }
}

export default new BulkUploadRepository();
````

## File: src/modules/bulk-upload/bulk-upload.service.js
````javascript
// ============================================================================
// File: src/modules/bulk-upload/bulk-upload.service.js
// Description: Business logic layer for Bulk Upload module.
// Orchestrates session logging and iteration over order creation.
// ============================================================================

import bulkUploadRepository from './bulk-upload.repository.js';
import orderService from '../order/order.service.js';

class BulkUploadService {
  /**
   * Internal mapper for bulk upload session
   */
  _mapSession(session) {
    if (!session) return null;
    return {
      id: session.PkBulkUploadId || session.id,
      fileName: session.FileName || session.fileName,
      totalRows: session.TotalRows || session.totalRows,
      successCount: session.SuccessCount !== undefined ? session.SuccessCount : session.successCount,
      errorCount: session.ErrorCount !== undefined ? session.ErrorCount : session.errorCount,
      status: session.Status || session.status,
      createdBy: session.CreatedBy || session.createdBy,
      createdAt: session.CreatedDate || session.createdDate || session.createdAt
    };
  }

  /**
   * Internal mapper for bulk upload row detail
   */
  _mapDetail(detail) {
    if (!detail) return null;
    
    let responseJson = null;
    const rawJson = detail.ResponseJson || detail.responseJson;
    try {
      responseJson = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;
    } catch (e) {
      responseJson = rawJson;
    }
    
    return {
      id: detail.PkDetailId || detail.id,
      bulkUploadId: detail.FkBulkUploadId || detail.bulkUploadId,
      rowNumber: detail.RowNumber || detail.rowNumber,
      status: detail.Status || detail.status,
      responseJson
    };
  }

  /**
   * Process a list of orders from a bulk upload.
   * 
   * @param {Array} rows - Array of order objects.
   * @param {object} user - Authenticated user.
   * @param {string} fileName - Optional filename if provided by client.
   * @returns {object} The created session ID and execution summary.
   */
  async processBulkUpload(rows, user, fileName = 'bulk_upload.json') {
    const createdBy = user?.employeeCode || 'SYSTEM';
    const totalRows = rows.length;

    // 1. Initialize Session
    const session = await bulkUploadRepository.createSession(0, fileName, totalRows, createdBy);
    const sessionId = session.PkBulkUploadId || session.id;

    const results = {
      sessionId,
      total: totalRows,
      processed: 0,
      success: 0,
      errors: 0
    };

    // 2. Iterate and Process Rows
    for (let i = 0; i < rows.length; i++) {
      const rowData = rows[i];
      const rowNumber = i + 1;
      let status = 'SUCCESS';
      let responseJson = '';

      try {
        const orderResult = await orderService.createOrder(rowData, user);
        responseJson = JSON.stringify(orderResult);
        results.success++;
      } catch (error) {
        status = 'ERROR';
        responseJson = JSON.stringify({
          error: error.message,
          data: error.data || null
        });
        results.errors++;
      }

      // 3. Log row-level execution status
      await bulkUploadRepository.logRowDetail(0, sessionId, rowNumber, status, responseJson);
      results.processed++;
    }

    return results;
  }

  /**
   * Get all bulk upload sessions.
   * @returns {Array}
   */
  async getSessions() {
    const sessions = await bulkUploadRepository.getSessions(0);
    return sessions.map(s => this._mapSession(s));
  }

  /**
   * Get a specific session with its processed row details.
   * @param {number} id - Session ID.
   * @returns {object} { session, details }
   */
  async getSessionWithDetails(id) {
    const session = await bulkUploadRepository.getSessions(1, id);
    if (!session) {
      const error = new Error('Upload session not found');
      error.statusCode = 404;
      throw error;
    }

    const details = await bulkUploadRepository.getSessionDetails(0, id);
    
    return {
      session: this._mapSession(session),
      details: details.map(d => this._mapDetail(d))
    };
  }
}

export default new BulkUploadService();
````

## File: src/shared/middleware/validate.middleware.js
````javascript
// ============================================================================
// File: src/shared/middleware/validate.middleware.js
// Description: Unifies Zod validation for all incoming requests.
// Extracts validation errors into a clean string to match standard API envelope.
// ============================================================================

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // Validates and parses (handles types/defaults)
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      // Zod 3.24+ uses `.issues`; older versions used `.errors`.
      const zodIssues = error.issues || error.errors || [];
      const errorMsg = zodIssues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return res.status(400).json({ success: false, error: `Validation Error - ${errorMsg}` });
    }
    return res.status(400).json({ success: false, error: 'Bad Request Payload' });
  }
};
````

## File: src/server.js
````javascript
import dotenv from 'dotenv';
import app from './app.js'; // Don't forget the .js extension!

// Load environment variables immediately
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
````

## File: test_data/ProductDropdown_Test_Data.txt
````
### Get Product Dropdown
GET /api/v1/products/dropdown

### Get Product Dropdown with Search
GET /api/v1/products/dropdown?search=Cotton
````

## File: test_data/ReceiverLookup_Test_Data.txt
````
==================================================
RECEIVERS — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: Get All Receiver Names ---
Method: GET
URL: /api/v1/receivers/names
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 2: Get All Receiver Phones ---
Method: GET
URL: /api/v1/receivers/phones
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 3: Lookup by Name ---
Method: GET
URL: /api/v1/receivers/lookup-by-name?name=Receiver
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200
````

## File: .env.example
````
# Server
PORT=5000
# Database
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=3306 # why?

# Optional future configs
JWT_SECRET=
API_BASE_URL=

# Fallback to in-memory mock data (true) or use live MySQL stored procedures (false)
USE_MOCK_DB=true
````

## File: API_CHANGELOG.md
````markdown
# SDCMS API Changelog & Bruno Update Guide

This document tracks all API changes and provides a checklist for keeping Bruno Desktop collections and frontend integrations up to date.

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
````

## File: scripts/generate-api-docs.js
````javascript
#!/usr/bin/env node
// ============================================================================
// File: scripts/generate-api-docs.js
// Description: Reads scripts/api-manifest.yaml → generates:
//   1. Premium HTML documentation (docs/api/)
//   2. Test data .txt files (test_data/)
// ============================================================================

import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ============================================================================
// LOAD MANIFEST
// ============================================================================
const manifestPath = path.join(__dirname, 'api-manifest.yaml');
const manifest = YAML.load(manifestPath);

// ============================================================================
// HELPERS
// ============================================================================
const METHOD_COLORS = {
  GET: { bg: '#064e3b', text: '#34d399', border: '#065f46' },
  POST: { bg: '#1e3a5f', text: '#60a5fa', border: '#1e40af' },
  PUT: { bg: '#78350f', text: '#fbbf24', border: '#92400e' },
  PATCH: { bg: '#4c1d95', text: '#a78bfa', border: '#5b21b6' },
  DELETE: { bg: '#7f1d1d', text: '#f87171', border: '#991b1b' },
};

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const highlightJson = (jsonStr) => {
  const escaped = escapeHtml(jsonStr.trim());
  return escaped
    .replace(/"([^"]+)"(\s*:)/g, '<span class="json-key">"$1"</span>$2')
    .replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span class="json-bool">$1</span>')
    .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>');
};

const prettyJson = (jsonStr) => {
  try {
    return JSON.stringify(JSON.parse(jsonStr.trim()), null, 2);
  } catch {
    return jsonStr.trim();
  }
};

const generateCurl = (ep, baseUrl) => {
  let curl = `curl -X ${ep.method} "${baseUrl}${ep.path}" \\\n`;
  if (ep.auth !== 'none') {
    curl += `  -H "Authorization: Bearer {{authToken}}" \\\n`;
  }
  if (ep.headers) {
    Object.entries(ep.headers).forEach(([k, v]) => {
      curl += `  -H "${k}: ${v}" \\\n`;
    });
  }
  if (ep.body) {
    try {
      const compactBody = JSON.stringify(JSON.parse(ep.body.trim()));
      curl += `  -d '${compactBody}'`;
    } catch {
       curl += `  -d '${ep.body.trim()}'`;
    }
  }
  return curl.trim().replace(/\\\n$/, '');
};

// ============================================================================
// HTML GENERATOR
// ============================================================================

const renderEndpoint = (ep, idx, baseUrl) => {
  const colors = METHOD_COLORS[ep.method] || METHOD_COLORS.GET;
  const authLabel = ep.auth === 'none' ? 'Public' : `Bearer Token`;
  const rolesStr = (ep.roles || []).join(', ');
  const curlCmd = generateCurl(ep, baseUrl);

  let bodyHtml = '';
  if (ep.body) {
    const pretty = prettyJson(ep.body);
    bodyHtml = `
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>${highlightJson(pretty)}</code></pre>
      </div>`;
  }

  let responseHtml = '';
  if (ep.responseBody) {
    const pretty = prettyJson(ep.responseBody);
    responseHtml = `
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">${ep.responseStatus || 200}</span></div>
        <pre class="code-block"><code>${highlightJson(pretty)}</code></pre>
      </div>`;
  } else if (ep.responseStatus) {
    responseHtml = `
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">${ep.responseStatus}</span></div>
      </div>`;
  }

  let notesHtml = '';
  if (ep.notes) {
    notesHtml = `
      <div class="note-box">
        <span class="note-icon">💡</span>
        <div class="note-content">
          <strong>Developer Note:</strong> ${escapeHtml(ep.notes)}
        </div>
      </div>`;
  }

  return `
    <div class="endpoint-card" id="ep-${idx}">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:${colors.bg};color:${colors.text};border-color:${colors.border}">${ep.method}</span>
          <code class="endpoint-path">${escapeHtml(ep.path)}</code>
        </div>
        <h3 class="endpoint-name">${escapeHtml(ep.name)}</h3>
        <p class="endpoint-desc">${escapeHtml(ep.description || '')}</p>
        
        ${notesHtml}
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">${authLabel}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">${rolesStr}</span>
            </div>
          </div>

        ${ep.parameters ? `
          <div class="section-label">Parameters</div>
          <table class="params-table">
            <thead>
              <tr><th>Name</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              ${Object.entries(ep.parameters).map(([k, v]) => `
                <tr>
                  <td><code>${k}</code></td>
                  <td><span class="type-tag">${v.type || 'string'}</span></td>
                  <td>${v.description || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>${escapeHtml(curlCmd)}</code></pre>
        ${bodyHtml}
        ${responseHtml}
      </div>
    </div>`;
};

const generateCollectionHtml = (collection, info) => {
  const toc = collection.endpoints
    .map((ep, i) => `<a href="#ep-${i}" class="toc-item"><span class="method-badge-sm ${ep.method.toLowerCase()}">${ep.method}</span>${escapeHtml(ep.name)}</a>`)
    .join('');

  const baseUrl = info.baseUrl || 'http://localhost:5000/api/v1';
  const cards = collection.endpoints.map((ep, i) => renderEndpoint(ep, i, baseUrl)).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escapeHtml(collection.name)} — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>${escapeHtml(collection.name)}</h2>
      </div>
      <div class="toc-list">${toc}</div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>${escapeHtml(collection.name)}</h2>
        <p>${escapeHtml(collection.description || '')}</p>
      </header>

      ${collection.guide ? `
        <div class="guide-box">
          <h4>Integration Guide</h4>
          <p>${escapeHtml(collection.guide)}</p>
        </div>
      ` : ''}

      ${cards}
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v${info.version} — ${new Date().toISOString().split('T')[0]}
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>`;
};

// ============================================================================
// TEST DATA GENERATOR
// ============================================================================

const generateTestData = (collection) => {
  const sep = '='.repeat(50);
  const lines = [sep, `${collection.name.toUpperCase()} — Test Data`, `Generated from api-manifest.yaml`, sep, ''];

  collection.endpoints.forEach((ep, i) => {
    lines.push(`--- TEST ${i + 1}: ${ep.name} ---`);
    lines.push(`Method: ${ep.method}`);
    lines.push(`URL: /api/v1${ep.path}`);
    lines.push(`Auth: ${ep.auth === 'none' ? 'None' : 'Bearer <TOKEN>'}`);
    if (ep.roles) lines.push(`Roles: ${ep.roles.join(', ')}`);
    if (ep.headers) {
      lines.push(`Headers:`);
      Object.entries(ep.headers).forEach(([k, v]) => lines.push(`  ${k}: ${v}`));
    }
    if (ep.body) lines.push(`\nBody:\n${prettyJson(ep.body)}`);
    lines.push(`\nExpected Status: ${ep.responseStatus || 200}\n`);
  });

  return lines.join('\n');
};

const testDataFilename = (slug, name) => {
  const map = {
    'authentication': 'Auth_Test_Data.txt',
    'product-catalog': 'Product_Test_Data.txt',
    'employee-management': 'Employee_Test_Data.txt',
    'courier-partners': 'Courier_Test_Data.txt',
    'senders': 'Sender_Test_Data.txt',
    'receivers': 'ReceiverLookup_Test_Data.txt',
    'order-pipeline': 'Order_Test_Data.txt',
    'parcels-retrieval': 'Parcel_Test_Data.txt',
    'label-print': 'LabelPrint_Test_Data.txt',
    'scan-operations': 'Scan_Test_Data.txt',
    'dispatch-terminal': 'Dispatch_Test_Data.txt',
    'parcel-events': 'ParcelEvents_Test_Data.txt',
    'dashboard': 'Dashboard_Test_Data.txt',
    'bulk-upload': 'BulkUpload_Test_Data.txt',
    'notification': 'Notification_Test_Data.txt',
  };
  return map[slug] || `${name.replace(/\s+/g, '_')}_Test_Data.txt`;
};

// ============================================================================
// MAIN
// ============================================================================

const docsDir = path.join(ROOT, 'docs', 'api');
const testDataDir = path.join(ROOT, 'test_data');

fs.mkdirSync(docsDir, { recursive: true });
fs.mkdirSync(testDataDir, { recursive: true });

for (const collection of manifest.collections) {
  const htmlPath = path.join(docsDir, `${collection.slug}-documentation.html`);
  fs.writeFileSync(htmlPath, generateCollectionHtml(collection, manifest.info), 'utf8');

  const txtPath = path.join(testDataDir, testDataFilename(collection.slug, collection.name));
  fs.writeFileSync(txtPath, generateTestData(collection), 'utf8');
}

console.log(`\n✅ API Documentation & Test Data Generated Successfully\n`);
````

## File: src/infrastructure/database/db.js
````javascript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Execute the config immediately (similar to require('dotenv').config())
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Use 'export default' instead of module.exports
export default pool;
````

## File: src/infrastructure/database/seeders.js
````javascript
import pool from './db.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

// ============================================================================
// SIMPLE SEEDS — Tables with no FK dependencies
// ============================================================================
const simpleSeedData = [
  {
    table: 'lu_user_role',
    columns: ['RoleCode', 'RoleDescription', 'IsActive'],
    data: [
      ['ADMIN', 'The boss. Full access to everything', 1],
      ['OPERATOR', 'Desk staff. Creates orders, prints labels', 1],
      ['COURIER', 'Delivery staff. Scans parcels, links AWBs, dispatches', 1]
    ],
    duplicateCheckColumn: 'RoleCode'
  },
  {
    table: 'lu_unit',
    columns: ['UnitTitle', 'UnitCode', 'ConversionFactor', 'IsActive'],
    data: [
      ['Kilogram',  'KG',  1.000, 1],
      ['Pieces',    'PCS', 1.000, 1],
      ['Litre',     'LTR', 1.000, 1],
      ['Metre',     'MTR', 1.000, 1],
      ['Box',       'BOX', 1.000, 1]
    ],
    duplicateCheckColumn: 'UnitCode'
  },
  {
    table: 'product_category',
    columns: ['CategoryName', 'IsActive'],
    data: [
      ['Electronics',        1],
      ['Clothing',           1],
      ['Documents',          1],
      ['Food & Perishables', 1],
      ['Fragile Items',      1]
    ],
    duplicateCheckColumn: 'CategoryName'
  }
];

// ============================================================================
// UNIFIED LOOKUP SEEDS — lu_master (categories) + lu_details (values)
// Replaces the old lu_order_status, lu_parcel_status, lu_notification_status
// tables with the unified lu_master → lu_details hierarchy from db_schema_v1.
// ============================================================================

/**
 * lu_master categories to seed.
 * Each category groups a set of lu_details entries (e.g., all parcel statuses).
 */
const luMasterCategories = [
  { LuMaster: 'Parcel Status', LuMaster_1: 'PARCEL_STATUS', LuMaster_2: 'Status values for parcel state machine' },
  { LuMaster: 'Notification Status', LuMaster_1: 'NOTIFICATION_STATUS', LuMaster_2: 'Status values for notification delivery tracking' }
];

/**
 * lu_details entries to seed, keyed by their parent lu_master category code (LuMaster_1).
 *
 * Columns mapped:
 *   LuDetails   = Human-readable status name (e.g., "Pending")
 *   LuDetails_1 = Machine-readable status code (e.g., "PENDING")
 *   LuDetails_2 = Description
 *   LuDetails_3 = Sort order (for UI display sequencing)
 */
const luDetailsByCategory = {
  'PARCEL_STATUS': [
    { LuDetails: 'Pending',       LuDetails_1: 'PENDING',       LuDetails_2: 'Parcel created but label not printed',         LuDetails_3: '1' },
    { LuDetails: 'Label Printed', LuDetails_1: 'LABEL_PRINTED', LuDetails_2: 'Label printed, waiting for AWB/dispatch',      LuDetails_3: '2' },
    { LuDetails: 'AWB Linked',    LuDetails_1: 'AWB_LINKED',    LuDetails_2: 'AWB and QR linked together',                   LuDetails_3: '3' },
    { LuDetails: 'Dispatched',    LuDetails_1: 'DISPATCHED',    LuDetails_2: 'Parcel out for delivery',                      LuDetails_3: '4' },
    { LuDetails: 'Delivered',     LuDetails_1: 'DELIVERED',     LuDetails_2: 'Parcel delivered successfully',                LuDetails_3: '5' },
    { LuDetails: 'Cancelled',     LuDetails_1: 'CANCELLED',     LuDetails_2: 'Parcel cancelled before dispatch',             LuDetails_3: '6' },
    { LuDetails: 'Returned',      LuDetails_1: 'RETURNED',      LuDetails_2: 'Parcel returned after dispatch/delivery attempt', LuDetails_3: '7' }
  ],
  'NOTIFICATION_STATUS': [
    { LuDetails: 'Not Sent', LuDetails_1: 'NOT_SENT', LuDetails_2: 'Notification queued but not yet sent',              LuDetails_3: '1' },
    { LuDetails: 'Sent',     LuDetails_1: 'SENT',     LuDetails_2: 'Notification dispatched via channel successfully',  LuDetails_3: '2' },
    { LuDetails: 'Failed',   LuDetails_1: 'FAILED',   LuDetails_2: 'Notification attempt failed',                       LuDetails_3: '3' }
  ]
};

/**
 * Seeds simple tables (no FK dependencies).
 * Uses duplicate-check to avoid re-inserting existing rows.
 */
const seedSimpleTables = async (connection) => {
  for (const seed of simpleSeedData) {
    console.log(`Seeding table: ${seed.table}`);

    const columnsFormatted = seed.columns.join(', ');

    for (const row of seed.data) {
      const placeholders = row.map(() => '?').join(', ');

      // Check if row already exists by its duplicate-check column
      const checkColIndex = seed.columns.indexOf(seed.duplicateCheckColumn);
      const [existing] = await connection.query(
        `SELECT 1 FROM ?? WHERE ?? = ? LIMIT 1`,
        [seed.table, seed.duplicateCheckColumn, row[checkColIndex]]
      );

      if (existing.length === 0) {
        const sql = `INSERT INTO ${seed.table} (${columnsFormatted}) VALUES (${placeholders})`;
        await connection.query(sql, row);
        console.log(`  [+] Inserted: ${row[checkColIndex]}`);
      } else {
        console.log(`  [~] Skipped (already exists): ${row[checkColIndex]}`);
      }
    }
  }
};

/**
 * Seeds the unified lu_master → lu_details lookup hierarchy.
 *
 * Flow:
 * 1. Insert lu_master categories (if not already present).
 * 2. Resolve lu_master PKs by querying back.
 * 3. Insert lu_details entries with the resolved FKs.
 */
const seedLookupHierarchy = async (connection) => {
  console.log('Seeding table: lu_master (categories)');

  // Step 1: Insert lu_master categories
  for (const category of luMasterCategories) {
    const [existing] = await connection.query(
      `SELECT LuMasterId FROM lu_master WHERE LuMaster_1 = ? LIMIT 1`,
      [category.LuMaster_1]
    );

    if (existing.length === 0) {
      await connection.query(
        `INSERT INTO lu_master (LuMaster, LuMaster_1, LuMaster_2) VALUES (?, ?, ?)`,
        [category.LuMaster, category.LuMaster_1, category.LuMaster_2]
      );
      console.log(`  [+] Inserted category: ${category.LuMaster}`);
    } else {
      console.log(`  [~] Skipped category (already exists): ${category.LuMaster}`);
    }
  }

  // Step 2: Resolve lu_master PKs and seed lu_details
  console.log('Seeding table: lu_details (status values)');

  for (const [categoryCode, details] of Object.entries(luDetailsByCategory)) {
    // Look up the parent category ID
    const [categoryRows] = await connection.query(
      `SELECT LuMasterId FROM lu_master WHERE LuMaster_1 = ? LIMIT 1`,
      [categoryCode]
    );

    if (categoryRows.length === 0) {
      console.error(`  [!] FATAL: lu_master category '${categoryCode}' not found. Cannot seed lu_details.`);
      continue;
    }

    const luMasterId = categoryRows[0].LuMasterId;

    for (const detail of details) {
      // Duplicate check by code (LuDetails_1) within the same category
      const [existing] = await connection.query(
        `SELECT 1 FROM lu_details WHERE LuDetails_1 = ? AND LuMasterId = ? LIMIT 1`,
        [detail.LuDetails_1, luMasterId]
      );

      if (existing.length === 0) {
        await connection.query(
          `INSERT INTO lu_details (LuDetails, LuDetails_1, LuDetails_2, LuDetails_3, LuMasterId, IsActive) VALUES (?, ?, ?, ?, ?, 1)`,
          [detail.LuDetails, detail.LuDetails_1, detail.LuDetails_2, detail.LuDetails_3, luMasterId]
        );
        console.log(`  [+] Inserted: ${categoryCode} → ${detail.LuDetails_1}`);
      } else {
        console.log(`  [~] Skipped (already exists): ${categoryCode} → ${detail.LuDetails_1}`);
      }
    }
  }
};

// ============================================================================
// COURIER PARTNER SEEDS — Sample courier companies with tracking URL templates
// ============================================================================
const courierPartnerData = [
  { CourierName: 'BlueDart',     TrackingUrlTemplate: 'https://www.bluedart.com/tracking?awb={AWB}',        IsActive: 1 },
  { CourierName: 'Delhivery',    TrackingUrlTemplate: 'https://www.delhivery.com/track/package/{AWB}',      IsActive: 1 },
  { CourierName: 'DTDC',         TrackingUrlTemplate: 'https://www.dtdc.in/tracking/shipment-tracking/{AWB}', IsActive: 1 }
];

/**
 * Seeds courier_partner_master with sample couriers.
 * Uses CourierName (UNIQUE) for duplicate checking.
 */
const seedCourierPartners = async (connection) => {
  console.log('Seeding table: courier_partner_master');

  for (const courier of courierPartnerData) {
    const [existing] = await connection.query(
      `SELECT 1 FROM courier_partner_master WHERE CourierName = ? LIMIT 1`,
      [courier.CourierName]
    );

    if (existing.length === 0) {
      await connection.query(
        `INSERT INTO courier_partner_master (CourierName, TrackingUrlTemplate, IsActive) VALUES (?, ?, ?)`,
        [courier.CourierName, courier.TrackingUrlTemplate, courier.IsActive]
      );
      console.log(`  [+] Inserted courier: ${courier.CourierName}`);
    } else {
      console.log(`  [~] Skipped (already exists): ${courier.CourierName}`);
    }
  }
};

// ============================================================================
// DEFAULT ADMIN EMPLOYEE — Bootstrap user so the system is usable after seeding
// ============================================================================
const DEFAULT_ADMIN = {
  FullName: 'System Admin',
  ContactNumber: '0000000000',
  EmailAddress: 'admin@sdcms.local',
  UserName: 'admin',
  Password: 'Admin@123',       // Will be bcrypt-hashed before insert
  AllowLogin: 1,
  IsActive: 1
};

// ============================================================================
// MAIN SEEDER RUNNER
// ============================================================================
/**
 * Seeds the default admin employee so the system is usable after fresh setup.
 * Resolves the ADMIN role PK from lu_user_role and bcrypt-hashes the password.
 * EmployeeCode is auto-increment — let MySQL assign it.
 */
const seedDefaultAdmin = async (connection) => {
  console.log('Seeding default admin employee');

  // Check if already exists by UserName (EmployeeCode is auto-increment)
  const [existing] = await connection.query(
    `SELECT 1 FROM employee_master WHERE UserName = ? LIMIT 1`,
    [DEFAULT_ADMIN.UserName]
  );

  if (existing.length > 0) {
    console.log(`  [~] Skipped (already exists): ${DEFAULT_ADMIN.UserName}`);
    return;
  }

  // Resolve ADMIN role PK
  const [roleRows] = await connection.query(
    `SELECT PkUserRoleId FROM lu_user_role WHERE RoleCode = 'ADMIN' LIMIT 1`
  );

  if (roleRows.length === 0) {
    console.error('  [!] FATAL: ADMIN role not found in lu_user_role. Seed roles first.');
    return;
  }

  const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.Password, 10);

  await connection.query(
    `INSERT INTO employee_master
       (FullName, ContactNumber, EmailAddress, UserName, Password, FkRoleId, AllowLogin, IsActive, CreatedDate)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      DEFAULT_ADMIN.FullName,
      DEFAULT_ADMIN.ContactNumber,
      DEFAULT_ADMIN.EmailAddress,
      DEFAULT_ADMIN.UserName,
      hashedPassword,
      roleRows[0].PkUserRoleId,
      DEFAULT_ADMIN.AllowLogin,
      DEFAULT_ADMIN.IsActive
    ]
  );

  console.log(`  [+] Inserted admin: ${DEFAULT_ADMIN.UserName}`);
  console.log(`      Default credentials → username: ${DEFAULT_ADMIN.UserName} / password: ${DEFAULT_ADMIN.Password}`);
};

export async function runAllSeeders() {
  console.log('--- Database Seeding Started ---');
  let connection;

  try {
    connection = await pool.getConnection();

    // Phase 1: Simple tables (lu_user_role, lu_unit, product_category)
    await seedSimpleTables(connection);

    // Phase 2: Unified lookup hierarchy (lu_master → lu_details)
    await seedLookupHierarchy(connection);

    // Phase 3: Courier partners (standalone master data)
    await seedCourierPartners(connection);

    // Phase 4: Default admin employee (depends on lu_user_role from Phase 1)
    await seedDefaultAdmin(connection);

    console.log('--- Database Seeding Completed Successfully ---');
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// For running the script directly from package.json via `node src/infrastructure/database/seeders.js`
if (process.argv[1] && process.argv[1].endsWith('seeders.js')) {
  runAllSeeders().then(() => {
    // Release the main pool to let the script exit gracefully
    pool.end();
    process.exit(0);
  });
}
````

## File: src/interfaces/http/controllers/courier.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/courier.controller.js
// Description: HTTP controllers mapping to Courier service block.
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// ============================================================================

import asyncHandler from 'express-async-handler';
import courierService from '../../../modules/courier/courier.service.js';

// @desc    Get all courier partners
// @route   GET /api/v1/courier-partners
// @access  Private/Admin,Operator,Courier
export const getCouriers = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 20);
  const search = req.query.search || '';

  const couriers = await courierService.getCouriers(page, limit, search);
  
  res.status(200).json({
    success: true,
    data: couriers.data,
    meta: {
      total: couriers.total,
      page,
      limit
    }
  });
});

// @desc    Get courier partner by ID
// @route   GET /api/v1/courier-partners/:id
// @access  Private/Admin,Operator,Courier
export const getCourierById = asyncHandler(async (req, res) => {
  const courier = await courierService.getCourierById(req.params.id);
  
  res.status(200).json({
    success: true,
    data: courier
  });
});

// @desc    Create new courier partner
// @route   POST /api/v1/courier-partners
// @access  Private/Admin
export const createCourier = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const courier = await courierService.createCourier(req.body, adminId);
  
  res.status(201).json({
    success: true,
    data: courier
  });
});

// @desc    Update courier partner
// @route   PUT /api/v1/courier-partners/:id
// @access  Private/Admin
export const updateCourier = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const courier = await courierService.updateCourier(req.params.id, req.body, adminId);
  
  res.status(200).json({
    success: true,
    data: courier
  });
});

// @desc    Delete courier partner
// @route   DELETE /api/v1/courier-partners/:id
// @access  Private/Admin
export const deleteCourier = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  await courierService.deleteCourier(req.params.id, adminId);
  
  res.status(200).json({
    success: true,
    message: 'Courier partner successfully removed'
  });
});
````

## File: src/interfaces/http/routes/courier.routes.js
````javascript
// ============================================================================
// File: src/interfaces/http/routes/courier.routes.js
// Description: Routing and RBAC mapping for Courier Partner endpoints.
// ============================================================================

import express from 'express';
import {
  getCouriers,
  getCourierById,
  createCourier,
  updateCourier,
  deleteCourier
} from '../controllers/courier.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createCourierSchema, updateCourierSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// GET routes are accessible by ADMIN only
router.route('/')
  .get(authorizeRoles('ADMIN'), getCouriers)
  // POST requires ADMIN
  .post(authorizeRoles('ADMIN'), validate(createCourierSchema), createCourier);

router.route('/:id')
  .get(authorizeRoles('ADMIN'), getCourierById)
  // PUT and DELETE require ADMIN
  .put(authorizeRoles('ADMIN'), validate(updateCourierSchema), updateCourier)
  .delete(authorizeRoles('ADMIN'), deleteCourier);

export default router;
````

## File: src/interfaces/http/routes/notification.routes.js
````javascript
// ============================================================================
// File: src/interfaces/http/routes/notification.routes.js
// Description: Route definitions for Notification module.
// Applies authentication, RBAC, and Zod validation.
// ============================================================================

import express from 'express';
import {
  send,
  resend,
  getHistory,
  webhook
} from '../controllers/notification.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import {
  sendNotificationSchema,
  resendNotificationSchema,
  webhookSchema
} from '../validations/notification.validation.js';

const router = express.Router();

// --- Public Routes ---
/**
 * @route   POST /api/v1/notifications/webhook
 * @desc    Webhook callback for delivery status
 */
router.post('/notifications/webhook', validate(webhookSchema), webhook);

// --- Protected Routes (Admin, Operator) ---
// ⚠️ We apply protect + authorizeRoles per-route (not blanket router.use)
//    to prevent this router from intercepting unmatched /api/v1/* paths
//    and blocking the notFound middleware from returning 404.

/**
 * @route   POST /api/v1/parcels/:id/notify
 * @desc    Send dispatch notification to receiver
 */
router.post('/parcels/:id/notify', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(sendNotificationSchema), send);

/**
 * @route   POST /api/v1/notifications/:id/resend
 * @desc    Resend a failed notification
 */
router.post('/notifications/:id/resend', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(resendNotificationSchema), resend);

/**
 * @route   GET /api/v1/parcels/:id/notifications
 * @desc    Get notification history for a parcel
 */
router.get('/parcels/:id/notifications', protect, authorizeRoles('ADMIN', 'OPERATOR'), getHistory);

export default router;
````

## File: src/interfaces/http/routes/receiver.routes.js
````javascript
// ============================================================================
// File: src/interfaces/http/routes/receiver.routes.js
// Description: Route definitions for Receiver lookup endpoints.
//              Reuses SenderService with partyTypeId=2 via receiver controller.
// ============================================================================

import express from 'express';
import * as receiverController from '../controllers/receiver.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

// All receiver routes require authentication + ADMIN/OPERATOR role
router.use(protect);
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

/**
 * @route   GET /api/v1/receivers/names
 * @desc    Get all distinct active receiver names (autocomplete dropdown)
 */
router.get('/names', receiverController.getAllNames);

/**
 * @route   GET /api/v1/receivers/phones
 * @desc    Get all distinct active receiver phone numbers (autocomplete dropdown)
 */
router.get('/phones', receiverController.getAllPhones);

/**
 * @route   GET /api/v1/receivers/lookup-by-name
 * @desc    Search receivers by name (partial match)
 */
router.get('/lookup-by-name', receiverController.lookupByName);

/**
 * @route   GET /api/v1/receivers/lookup-by-phone
 * @desc    Search receivers by phone (partial match)
 */
router.get('/lookup-by-phone', receiverController.lookupByPhone);


/**
 * @route   GET /api/v1/receivers/:id/addresses
 * @desc    Get all addresses for a receiver
 */
router.get('/:id/addresses', receiverController.getAddresses);

/**
 * @route   POST /api/v1/receivers/:id/addresses
 * @desc    Create a new address for a receiver
 */
router.post('/:id/addresses', receiverController.createAddress);

export default router;
````

## File: src/modules/notification/notification.repository.js
````javascript
// ============================================================================
// File: src/modules/notification/notification.repository.js
// Description: Data access layer for the Notification module.
// This repository handles all interactions with the `Notification_log` table
// exclusively via defined stored procedures.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention:
//   - prc_parcel_notification_log_set (append-only log)
//   - prc_parcel_notification_log_search (search by ID or ParcelId)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// ============================================================================
let mockNotifications = [
  {
    PkNotificationLogId: 1,
    FkParcelDetailsId: 1,
    RecipientPhone: '9876543210',
    NotificationChannel: 'SMS',
    MessageContent: 'Your parcel is dispatched. Track here: https://track.it/AWB123',
    FkNotificationStatusId: 1, // Sent
    RequestedBy: 1,
    CreatedDate: '2026-04-10T10:00:00Z'
  }
];

class NotificationRepository {
  /**
   * Retrieve notification history for a specific parcel.
   * Procedure: CALL prc_parcel_notification_log_search(0, parcelId, 0)
   * 
   * @param {number|string} parcelId - The ID of the parcel.
   * @returns {Promise<Array>} List of notification logs.
   */
  async getHistoryByParcelId(parcelId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_notification_log_search
    // REPOSITORY INJECTION SITE:
    // Fetches history using pPkNotificationLogId=0 and pFkParcelId.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_notification_log_search(?, ?, ?)', [
        0, // pPkNotificationLogId
        parcelId, // pFkParcelId
        0  // pFkNotificationStatusId
      ]);
      return rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by parcel
    // ------------------------------------------------------------------
    return mockNotifications.filter(n => n.FkParcelDetailsId === parseInt(parcelId));
  }

  /**
   * Retrieve a specific notification by its ID.
   * Procedure: CALL prc_parcel_notification_log_search(notificationId, 0, 0)
   * 
   * @param {number|string} notificationId - The ID of the notification.
   * @returns {Promise<object>} The notification record.
   */
  async findById(notificationId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_notification_log_search
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_notification_log_search(?, ?, ?)', [
        notificationId, // pPkNotificationLogId
        0, // pFkParcelId
        0  // pFkNotificationStatusId
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by ID
    // ------------------------------------------------------------------
    return mockNotifications.find(n => n.PkNotificationLogId === parseInt(notificationId)) || null;
  }

  /**
   * Log a notification entry.
   * Procedure: CALL prc_parcel_notification_log_set(?, ?, ?, ?, ?, ?)
   * 
   * @param {object} data - Notification parameters.
   * @param {number} adminId - The employee ID who requested the notification.
   * @returns {Promise<object>} The created notification record.
   */
  async logNotification(data, adminId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_notification_log_set
    // REPOSITORY INJECTION SITE:
    // This procedure acts as an append-only log for notifications.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_notification_log_set(?, ?, ?, ?, ?, ?)', [
        data.parcelId,
        data.recipientPhone,
        data.notificationChannel || 'SMS',
        data.messageContent,
        data.statusId || 1, // Default to 1 (Sent)
        adminId
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory append
    // ------------------------------------------------------------------
    const newId = mockNotifications.length > 0 ? Math.max(...mockNotifications.map(n => n.PkNotificationLogId)) + 1 : 1;
    const notification = {
      PkNotificationLogId: newId,
      FkParcelDetailsId: data.parcelId,
      RecipientPhone: data.recipientPhone,
      NotificationChannel: data.notificationChannel || 'SMS',
      MessageContent: data.messageContent,
      FkNotificationStatusId: data.statusId || 1,
      RequestedBy: adminId,
      CreatedDate: new Date().toISOString()
    };
    mockNotifications.push(notification);
    return notification;
  }

  /**
   * Update notification status via webhook (Append-only log).
   * 
   * @param {number} notificationId 
   * @param {number} statusId 
   */
  async updateWebhookStatus(notificationId, statusId) {
    const existing = await this.findById(notificationId);
    if (!existing) return null;

    const data = {
      parcelId: existing.FkParcelDetailsId || existing.parcelId,
      recipientPhone: existing.RecipientPhone || existing.recipientPhone,
      notificationChannel: existing.NotificationChannel || existing.notificationChannel,
      messageContent: existing.MessageContent || existing.messageContent,
      statusId: statusId
    };

    return await this.logNotification(data, existing.RequestedBy || existing.requestedBy || 1);
  }
}

export default new NotificationRepository();
````

## File: src/modules/order/order.seed.js
````javascript
// ============================================================================
// File: src/modules/order/order.seed.js
// Description: In-memory seed data for mocking DB operations in Order module.
// Field names align with db_schema_v1: Party_master, order_master,
// receiver_details, order_items, parcel_details.
// ============================================================================

/**
 * Mock Party_master entries (unified senders/receivers).
 * Maps to: Party_master table (PkPartyId, CustomerName, PhoneNo, Address, City, State, Pincode)
 */
export const seedParties = [
  {
    id: 1,
    customerName: 'Ramesh Textiles',
    phoneNo: '9876543210',
    address: '14, Gandhi Nagar, Near Railway Station',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395002',
    isActive: true
  },
  {
    id: 2,
    customerName: 'Delhi Fabrics Ltd.',
    phoneNo: '9123456780',
    address: '45, Karol Bagh',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110005',
    isActive: true
  }
];

/**
 * Mock order_master entries.
 * Maps to: order_master (PkOrderId, OrderCode, FkSenderId, SenderName, SenderMobile, TotalAmount)
 * ⚠️ NO status column — order status is DERIVED from parcel states.
 */
export const seedOrders = [
  {
    id: 1,
    orderCode: 'ORD-20260330-001',
    fkSenderId: 1,
    senderName: 'Ramesh Textiles',
    senderMobile: '9876543210',
    senderAddress: '14, Gandhi Nagar, Near Railway Station, Surat, Gujarat 395002',
    fkCourierId: 1,
    totalAmount: 3650.00,
    createdBy: 'EMP001',
    createdAt: new Date('2026-03-30T10:00:00Z'),
    isActive: true
  }
];

/**
 * Mock receiver_details entries.
 * Maps to: receiver_details (PkReceiverDetailsId, FkOrderId, ReceiverName, ReceiverPhone, Address, ...)
 */
export const seedReceivers = [
  {
    id: 1,
    fkOrderId: 1,
    receiverName: 'Delhi Fabrics Ltd.',
    receiverPhone: '9123456780',
    address: '45, Karol Bagh',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110005',
    country: 'India',
    isActive: true
  },
  {
    id: 2,
    fkOrderId: 1,
    receiverName: 'Mumbai Silk House',
    receiverPhone: '9988776655',
    address: '22, Linking Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    country: 'India',
    isActive: true
  }
];

/**
 * Mock order_items entries.
 * Maps to: order_items (PkOrderItemId, FkReceiverDetailsId, FkProductId, OutwardQty, UnitPrice)
 */
export const seedOrderItems = [
  { id: 1, fkReceiverDetailsId: 1, fkProductId: 1, outwardQty: 5, unitPrice: 420.00 },
  { id: 2, fkReceiverDetailsId: 1, fkProductId: 3, outwardQty: 2, unitPrice: 1100.00 },
  { id: 3, fkReceiverDetailsId: 2, fkProductId: 1, outwardQty: 3, unitPrice: 450.00 }
];

/**
 * Mock parcel_details entries.
 * Maps to: parcel_details (PkParcelDetailsId, FkReceiverDetailsId, FkCourierId, TrackingNo, QRCode, FkParcelStatusId, LabelPrintCount)
 * ✅ 1 receiver = 1 parcel
 */
export const seedParcels = [
  {
    id: 1,
    fkReceiverDetailsId: 1,
    fkCourierId: 1,
    parcel_id: 'PDS-A1B2C3',
    trackingNo: null,
    fkParcelStatusId: null,    // Will resolve to lu_details.LuDetailsId for "PENDING"
    parcelStatusCode: 'PENDING',
    labelPrintCount: 0,
    dispatchDate: null,
    createdBy: 'EMP001',
    createdAt: new Date('2026-03-30T10:00:00Z')
  },
  {
    id: 2,
    fkReceiverDetailsId: 2,
    fkCourierId: 1,
    parcel_id: 'PDS-D4E5F6',
    trackingNo: null,
    fkParcelStatusId: null,
    parcelStatusCode: 'PENDING',
    labelPrintCount: 0,
    dispatchDate: null,
    createdBy: 'EMP001',
    createdAt: new Date('2026-03-30T10:00:00Z')
  }
];
````

## File: src/shared/middleware/error.middleware.js
````javascript
// ============================================================================
// File: src/shared/middleware/error.middleware.js
// Description: Global error handling middleware.
// Enforces the standard response envelope: { success: false, error: string }
// per API Contract v2.0 §1.2.
//
// MySQL Error Translation (api_procedure_spec_v1.md §12):
//   - prc_check_duplicate_XXX SIGNAL (SQLSTATE 45000 + 'duplicate') → 409
//   - ER_DUP_ENTRY / errno 1062 (hard constraint)                  → 409
//   - Generic SIGNAL / Rollback (SQLSTATE 45000, non-duplicate)     → 400
//   - No rows found (handled by service layer throw)                → 404
// ============================================================================

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  // If the status code is 200 but we threw an error, make it a 500 (Server Error)
  // Otherwise, use the status code defined in your service/controller (like 400 or 401)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // You can also use err.statusCode if you attached it in your Service layer
  if (err.statusCode) statusCode = err.statusCode;

  let message = err.message;

  // ------------------------------------------------------------------
  // MySQL Error Translation Layer
  // Maps stored procedure errors to appropriate HTTP status codes.
  // Order matters: check specific patterns before generic ones.
  // ------------------------------------------------------------------

  // 1. prc_check_duplicate_XXX trigger — SIGNAL SQLSTATE '45000' with 'duplicate' keyword
  //    These are custom duplicate checks fired by the stored procedure.
  if (err.sqlState === '45000' && err.message && err.message.toLowerCase().includes('duplicate')) {
    statusCode = 409;
    message = err.message; // Use the SP's descriptive duplicate message
  }

  // 2. Hard constraint duplicate (ER_DUP_ENTRY / errno 1062)
  //    Fired by MySQL UNIQUE constraints when the SP doesn't catch it first.
  else if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
    statusCode = 409;
    message = 'A record with this value already exists';
  }

  // 3. Generic SIGNAL / Business rule violations (SQLSTATE 45000, non-duplicate)
  //    These are custom business rule errors fired by stored procedures
  //    (e.g., invalid state transitions, blocked operations).
  else if (err.sqlState === '45000') {
    statusCode = 400;
    message = err.message; // Use the SP's custom business rule message
  }

  // 4. Other MySQL errors (connection, syntax, etc.)
  //    Don't expose raw DB internals to the client.
  else if (err.sqlState && statusCode === 500) {
    message = 'A database error occurred. Please try again later.';
  }

  // Standard response envelope: { success: false, error: string }
  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
````

## File: test_data/LabelPrint_Test_Data.txt
````
==================================================
LABEL PRINT LOGGING — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: Log Print ---
Method: POST
URL: /api/v1/parcels/:id/log-print
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200
````

## File: docs/api/authentication-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Authentication — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Authentication</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm post">POST</span>Login</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm get">GET</span>Get Profile</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm get">GET</span>System Health</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Authentication</h2>
        <p>Auth endpoints for login and user profile</p>
      </header>

      
        <div class="guide-box">
          <h4>Integration Guide</h4>
          <p>To authenticate, use the Login endpoint to receive a JWT token. This token must be included in the 'Authorization' header as 'Bearer &lt;token&gt;' for all protected routes. Frontend devs should store this in localStorage or a secure cookie.</p>
        </div>
      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/auth/login</code>
        </div>
        <h3 class="endpoint-name">Login</h3>
        <p class="endpoint-desc">Authenticates a user and provides a JWT token.</p>
        
        
      <div class="note-box">
        <span class="note-icon">💡</span>
        <div class="note-content">
          <strong>Developer Note:</strong> If the login is successful, you'll receive an object containing the user's profile and the token. If the account is locked (allowLogin: false), you will get a 403 error.
        </div>
      </div>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Public</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ALL</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/auth/login&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;email&quot;:&quot;admin@example.com&quot;,&quot;password&quot;:&quot;securePass123&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;email&quot;: &quot;admin@example.com&quot;,
  &quot;password&quot;: &quot;securePass123&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: &quot;EMP-001&quot;,
    &quot;employeeCode&quot;: &quot;EMP-001&quot;,
    &quot;name&quot;: &quot;Admin User&quot;,
    &quot;email&quot;: &quot;admin@example.com&quot;,
    &quot;role&quot;: &quot;ADMIN&quot;,
    &quot;token&quot;: &quot;eyJhbG...&quot;
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/auth/profile</code>
        </div>
        <h3 class="endpoint-name">Get Profile</h3>
        <p class="endpoint-desc">Retrieves the authenticated user's profile and permissions.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ALL</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/auth/profile&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;employeeCode&quot;: &quot;EMP-001&quot;,
    &quot;firstName&quot;: &quot;Admin User&quot;,
    &quot;email&quot;: &quot;admin@example.com&quot;,
    &quot;phoneNo&quot;: &quot;9876543210&quot;,
    &quot;roleCode&quot;: &quot;ADMIN&quot;,
    &quot;allowLogin&quot;: <span class="json-bool">true</span>,
    &quot;createdAt&quot;: &quot;2026-04-20T10: <span class="json-number">00</span>: <span class="json-number">00</span>Z&quot;
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/system/health</code>
        </div>
        <h3 class="endpoint-name">System Health</h3>
        <p class="endpoint-desc">Checks database connectivity and system status.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Public</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ALL</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/system/health&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;status&quot;: &quot;UP&quot;,
    &quot;dbConnected&quot;: <span class="json-bool">true</span>
  }
}</code></pre>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/bulk-upload-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Bulk Upload — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Bulk Upload</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm post">POST</span>Create Bulk Session</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm get">GET</span>List Sessions</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm get">GET</span>Get Session by ID</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Bulk Upload</h2>
        <p>Batch order creation via array upload</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/bulk-uploads</code>
        </div>
        <h3 class="endpoint-name">Create Bulk Session</h3>
        <p class="endpoint-desc">Processes an array of orders in a single batch.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/bulk-uploads&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;rows&quot;:[{&quot;senderName&quot;:&quot;Bulk Sender&quot;,&quot;senderMobile&quot;:&quot;9000000099&quot;,&quot;courierId&quot;:1,&quot;receivers&quot;:[{&quot;receiverName&quot;:&quot;Bulk Receiver&quot;,&quot;receiverPhone&quot;:&quot;9000000098&quot;,&quot;products&quot;:[{&quot;productId&quot;:1,&quot;qty&quot;:1,&quot;unitPrice&quot;:100}]}]}]}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;rows&quot;: [
    {
      &quot;senderName&quot;: &quot;Bulk Sender&quot;,
      &quot;senderMobile&quot;: &quot;9000000099&quot;,
      &quot;courierId&quot;: <span class="json-number">1</span>,
      &quot;receivers&quot;: [
        {
          &quot;receiverName&quot;: &quot;Bulk Receiver&quot;,
          &quot;receiverPhone&quot;: &quot;9000000098&quot;,
          &quot;products&quot;: [
            {
              &quot;productId&quot;: <span class="json-number">1</span>,
              &quot;qty&quot;: <span class="json-number">1</span>,
              &quot;unitPrice&quot;: <span class="json-number">100</span>
            }
          ]
        }
      ]
    }
  ]
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">201</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;sessionId&quot;: <span class="json-number">1</span>,
    &quot;totalOrders&quot;: <span class="json-number">1</span>
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/bulk-uploads</code>
        </div>
        <h3 class="endpoint-name">List Sessions</h3>
        <p class="endpoint-desc">Lists all bulk upload sessions.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/bulk-uploads&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/bulk-uploads/:id</code>
        </div>
        <h3 class="endpoint-name">Get Session by ID</h3>
        <p class="endpoint-desc">Retrieves details of a bulk upload session.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/bulk-uploads/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/courier-partners-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Courier Partners — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Courier Partners</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm get">GET</span>List Couriers</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm post">POST</span>Create Courier</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm get">GET</span>Get Courier by ID</a><a href="#ep-3" class="toc-item"><span class="method-badge-sm put">PUT</span>Update Courier</a><a href="#ep-4" class="toc-item"><span class="method-badge-sm delete">DELETE</span>Delete Courier</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Courier Partners</h2>
        <p>Courier partner CRUD operations</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/courier-partners</code>
        </div>
        <h3 class="endpoint-name">List Couriers</h3>
        <p class="endpoint-desc">Retrieves all courier partners.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR, COURIER</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/courier-partners&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/courier-partners</code>
        </div>
        <h3 class="endpoint-name">Create Courier</h3>
        <p class="endpoint-desc">Registers a new courier partner.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/courier-partners&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;courierName&quot;:&quot;TestCourier Express&quot;,&quot;trackingUrlTemplate&quot;:&quot;https://track.testcourier.com/awb/{AWB}&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;courierName&quot;: &quot;TestCourier Express&quot;,
  &quot;trackingUrlTemplate&quot;: &quot;https://track.testcourier.com/awb/{AWB}&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">201</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/courier-partners/:id</code>
        </div>
        <h3 class="endpoint-name">Get Courier by ID</h3>
        <p class="endpoint-desc">Retrieves a courier partner by ID.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR, COURIER</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/courier-partners/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-3">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#78350f;color:#fbbf24;border-color:#92400e">PUT</span>
          <code class="endpoint-path">/courier-partners/:id</code>
        </div>
        <h3 class="endpoint-name">Update Courier</h3>
        <p class="endpoint-desc">Updates courier partner details.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X PUT &quot;{{base_url}}/courier-partners/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;courierName&quot;:&quot;Updated Courier&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;courierName&quot;: &quot;Updated Courier&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-4">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#7f1d1d;color:#f87171;border-color:#991b1b">DELETE</span>
          <code class="endpoint-path">/courier-partners/:id</code>
        </div>
        <h3 class="endpoint-name">Delete Courier</h3>
        <p class="endpoint-desc">Removes a courier partner.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X DELETE &quot;{{base_url}}/courier-partners/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/dashboard-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Dashboard — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Dashboard</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm get">GET</span>Get Metrics</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Dashboard</h2>
        <p>Admin-only dashboard metrics</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/dashboard/metrics</code>
        </div>
        <h3 class="endpoint-name">Get Metrics</h3>
        <p class="endpoint-desc">Aggregated dashboard statistics.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/dashboard/metrics&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{ 
  &quot;success&quot;: <span class="json-bool">true</span>, 
  &quot;data&quot;: { 
    &quot;TotalOrders&quot;: <span class="json-number">150</span>, &quot;PendingOrders&quot;: <span class="json-number">45</span>, &quot;DispatchedOrders&quot;: <span class="json-number">80</span>, &quot;DeliveredOrders&quot;: <span class="json-number">25</span>,
    &quot;totalOrders&quot;: <span class="json-number">150</span>, // @deprecated
    &quot;parcelsByStatus&quot;: { &quot;PENDING&quot;: <span class="json-number">45</span>, &quot;DISPATCHED&quot;: <span class="json-number">80</span>, &quot;DELIVERED&quot;: <span class="json-number">25</span> } // @deprecated
  } 
}</code></pre>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/employee-management-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Employee Management (ADMIN) — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Employee Management (ADMIN)</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm get">GET</span>List Employees</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm post">POST</span>Create Employee</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm get">GET</span>Get Employee by ID</a><a href="#ep-3" class="toc-item"><span class="method-badge-sm put">PUT</span>Update Employee</a><a href="#ep-4" class="toc-item"><span class="method-badge-sm patch">PATCH</span>Toggle Employee Access</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Employee Management (ADMIN)</h2>
        <p>Employee CRUD and access control (ADMIN only)</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/employees</code>
        </div>
        <h3 class="endpoint-name">List Employees</h3>
        <p class="endpoint-desc">Retrieves all employees.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/employees&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/employees</code>
        </div>
        <h3 class="endpoint-name">Create Employee</h3>
        <p class="endpoint-desc">Creates a new employee account.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/employees&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;name&quot;:&quot;New Emp&quot;,&quot;role&quot;:&quot;OPERATOR&quot;,&quot;email&quot;:&quot;newemp@example.com&quot;,&quot;password&quot;:&quot;Test123456&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;name&quot;: &quot;New Emp&quot;,
  &quot;role&quot;: &quot;OPERATOR&quot;,
  &quot;email&quot;: &quot;newemp@example.com&quot;,
  &quot;password&quot;: &quot;Test123456&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">201</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/employees/:id</code>
        </div>
        <h3 class="endpoint-name">Get Employee by ID</h3>
        <p class="endpoint-desc">Retrieves a single employee by ID.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/employees/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-3">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#78350f;color:#fbbf24;border-color:#92400e">PUT</span>
          <code class="endpoint-path">/employees/:id</code>
        </div>
        <h3 class="endpoint-name">Update Employee</h3>
        <p class="endpoint-desc">Updates employee details.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X PUT &quot;{{base_url}}/employees/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;name&quot;:&quot;Updated Name&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;name&quot;: &quot;Updated Name&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-4">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#4c1d95;color:#a78bfa;border-color:#5b21b6">PATCH</span>
          <code class="endpoint-path">/employees/:id/toggle-access</code>
        </div>
        <h3 class="endpoint-name">Toggle Employee Access</h3>
        <p class="endpoint-desc">Enables or disables an employee's login access.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X PATCH &quot;{{base_url}}/employees/:id/toggle-access&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;allowLogin&quot;:true}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;allowLogin&quot;: <span class="json-bool">true</span>
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/label-print-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Label Print Logging — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Label Print Logging</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm post">POST</span>Log Print</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Label Print Logging</h2>
        <p>Log label print events (PENDING → LABEL_PRINTED)</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/parcels/:id/log-print</code>
        </div>
        <h3 class="endpoint-name">Log Print</h3>
        <p class="endpoint-desc">Transitions parcel from PENDING to LABEL_PRINTED.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/parcels/:id/log-print&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/notification-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Notification — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Notification</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm post">POST</span>Send Notification</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm get">GET</span>Get Notification History</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm post">POST</span>Resend Notification</a><a href="#ep-3" class="toc-item"><span class="method-badge-sm post">POST</span>Webhook</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Notification</h2>
        <p>Parcel notification sending, resending, and webhook</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/parcels/:id/notify</code>
        </div>
        <h3 class="endpoint-name">Send Notification</h3>
        <p class="endpoint-desc">Sends a tracking notification for a parcel.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/parcels/:id/notify&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/parcels/:id/notifications</code>
        </div>
        <h3 class="endpoint-name">Get Notification History</h3>
        <p class="endpoint-desc">Retrieves notification log for a parcel.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/parcels/:id/notifications&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/notifications/:id/resend</code>
        </div>
        <h3 class="endpoint-name">Resend Notification</h3>
        <p class="endpoint-desc">Resends a previously sent notification.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/notifications/:id/resend&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-3">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/notifications/webhook</code>
        </div>
        <h3 class="endpoint-name">Webhook</h3>
        <p class="endpoint-desc">External delivery status webhook endpoint.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Public</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ALL</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/notifications/webhook&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;notificationId&quot;:1,&quot;status&quot;:&quot;delivered&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;notificationId&quot;: <span class="json-number">1</span>,
  &quot;status&quot;: &quot;delivered&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/parcel-events-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Parcel Events &amp; Audit Export — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Parcel Events &amp; Audit Export</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm get">GET</span>List Events</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm get">GET</span>Export CSV</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Parcel Events &amp; Audit Export</h2>
        <p>Parcel event log and CSV export</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/parcel-events</code>
        </div>
        <h3 class="endpoint-name">List Events</h3>
        <p class="endpoint-desc">Paginated event log from receiver_status_details.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/parcel-events&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;id&quot;: <span class="json-number">1</span>,
      &quot;parcelId&quot;: &quot;PDS-A1B2C3&quot;,
      &quot;orderCode&quot;: &quot;ORD-2026-001&quot;,
      &quot;actionType&quot;: &quot;AWB_LINK&quot;,
      &quot;awbNumber&quot;: &quot;AWB-DTDC-001&quot;,
      &quot;previousStatus&quot;: &quot;LABEL_PRINTED&quot;,
      &quot;newStatus&quot;: &quot;AWB_LINKED&quot;,
      &quot;scannedBy&quot;: &quot;EMP-001&quot;,
      &quot;timestamp&quot;: &quot;2026-04-24T12: <span class="json-number">00</span>: <span class="json-number">00</span>Z&quot;
    }
  ],
  &quot;meta&quot;: {
    &quot;totalRows&quot;: <span class="json-number">50</span>
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/parcel-events/export</code>
        </div>
        <h3 class="endpoint-name">Export CSV</h3>
        <p class="endpoint-desc">Downloads event log as CSV file.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/parcel-events/export&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/parcels-retrieval-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Parcels Retrieval and Label Data — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Parcels Retrieval and Label Data</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm get">GET</span>List Parcels</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm get">GET</span>Get Parcel by ID</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm get">GET</span>Get Label Data</a><a href="#ep-3" class="toc-item"><span class="method-badge-sm get">GET</span>Get Timeline</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Parcels Retrieval and Label Data</h2>
        <p>Parcel read operations, label data, and timeline</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/parcels</code>
        </div>
        <h3 class="endpoint-name">List Parcels</h3>
        <p class="endpoint-desc">Paginated parcel list.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR, COURIER</span>
            </div>
          </div>

        
          <div class="section-label">Parameters</div>
          <table class="params-table">
            <thead>
              <tr><th>Name</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              
                <tr>
                  <td><code>page</code></td>
                  <td><span class="type-tag">number</span></td>
                  <td>Page index</td>
                </tr>
              
                <tr>
                  <td><code>limit</code></td>
                  <td><span class="type-tag">number</span></td>
                  <td>Items per page</td>
                </tr>
              
                <tr>
                  <td><code>orderCode</code></td>
                  <td><span class="type-tag">string</span></td>
                  <td>Search by partial Order Code</td>
                </tr>
              
                <tr>
                  <td><code>parcelId</code></td>
                  <td><span class="type-tag">string</span></td>
                  <td>Search by QR code/Parcel ID</td>
                </tr>
              
            </tbody>
          </table>
        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/parcels&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/parcels/:id</code>
        </div>
        <h3 class="endpoint-name">Get Parcel by ID</h3>
        <p class="endpoint-desc">Single parcel details.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR, COURIER</span>
            </div>
          </div>

        
          <div class="section-label">Parameters</div>
          <table class="params-table">
            <thead>
              <tr><th>Name</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              
                <tr>
                  <td><code>id</code></td>
                  <td><span class="type-tag">number</span></td>
                  <td>Unique identifier of the parcel</td>
                </tr>
              
            </tbody>
          </table>
        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/parcels/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: <span class="json-number">1</span>,
    &quot;parcelId&quot;: &quot;PDS-A1B2C3&quot;,
    &quot;trackingNo&quot;: <span class="json-null">null</span>,
    &quot;status&quot;: &quot;PENDING&quot;,
    &quot;labelPrintCount&quot;: <span class="json-number">0</span>,
    &quot;receiverName&quot;: &quot;Delhi Fabrics Ltd.&quot;,
    &quot;receiverPhone&quot;: &quot;9123456780&quot;,
    &quot;address&quot;: &quot;45, Karol Bagh&quot;,
    &quot;city&quot;: &quot;New Delhi&quot;,
    &quot;state&quot;: &quot;Delhi&quot;,
    &quot;pincode&quot;: &quot;110005&quot;,
    &quot;orderCode&quot;: &quot;ORD-2026-001&quot;
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/parcels/:id/label-data</code>
        </div>
        <h3 class="endpoint-name">Get Label Data</h3>
        <p class="endpoint-desc">On-demand label generation data for printing.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/parcels/:id/label-data&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: <span class="json-number">1</span>,
    &quot;parcelId&quot;: &quot;PDS-A1B2C3&quot;,
    &quot;trackingNo&quot;: <span class="json-null">null</span>,
    &quot;status&quot;: &quot;PENDING&quot;,
    &quot;labelPrintCount&quot;: <span class="json-number">0</span>,
    &quot;receiverName&quot;: &quot;Delhi Fabrics Ltd.&quot;,
    &quot;receiverPhone&quot;: &quot;9123456780&quot;,
    &quot;address&quot;: &quot;45, Karol Bagh&quot;,
    &quot;city&quot;: &quot;New Delhi&quot;,
    &quot;state&quot;: &quot;Delhi&quot;,
    &quot;pincode&quot;: &quot;110005&quot;,
    &quot;orderCode&quot;: &quot;ORD-2026-001&quot;
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-3">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/parcels/:id/timeline</code>
        </div>
        <h3 class="endpoint-name">Get Timeline</h3>
        <p class="endpoint-desc">Append-only event timeline for a parcel.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR, COURIER</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/parcels/:id/timeline&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;id&quot;: <span class="json-number">1</span>,
      &quot;parcelId&quot;: &quot;PDS-A1B2C3&quot;,
      &quot;orderCode&quot;: &quot;ORD-2026-001&quot;,
      &quot;actionType&quot;: &quot;STATUS_UPDATE&quot;,
      &quot;awbNumber&quot;: <span class="json-null">null</span>,
      &quot;previousStatus&quot;: &quot;Created&quot;,
      &quot;newStatus&quot;: &quot;PENDING&quot;,
      &quot;scannedBy&quot;: &quot;EMP-001&quot;,
      &quot;timestamp&quot;: &quot;2026-04-24T10: <span class="json-number">05</span>: <span class="json-number">00</span>Z&quot;
    }
  ]
}</code></pre>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/receivers-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Receivers — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Receivers</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm get">GET</span>Get All Receiver Names</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm get">GET</span>Get All Receiver Phones</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm get">GET</span>Lookup by Name</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Receivers</h2>
        <p>Receiver lookup and dropdown endpoints</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/receivers/names</code>
        </div>
        <h3 class="endpoint-name">Get All Receiver Names</h3>
        <p class="endpoint-desc">Distinct receiver names for autocomplete dropdown.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/receivers/names&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/receivers/phones</code>
        </div>
        <h3 class="endpoint-name">Get All Receiver Phones</h3>
        <p class="endpoint-desc">Distinct receiver phone numbers for autocomplete.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/receivers/phones&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/receivers/lookup-by-name?name=Receiver</code>
        </div>
        <h3 class="endpoint-name">Lookup by Name</h3>
        <p class="endpoint-desc">Search receivers by partial name match.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/receivers/lookup-by-name?name=Receiver&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/scan-operations-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Two Scan Operations — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Two Scan Operations</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm post">POST</span>Scan and Link AWB</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Two Scan Operations</h2>
        <p>Atomic QR + AWB scanning flow</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/parcels/scan</code>
        </div>
        <h3 class="endpoint-name">Scan and Link AWB</h3>
        <p class="endpoint-desc">QR identifies parcel, AWB links shipment. OPERATOR → AWB_LINKED, COURIER → auto-DISPATCHED.</p>
        
        
      <div class="note-box">
        <span class="note-icon">💡</span>
        <div class="note-content">
          <strong>Developer Note:</strong> This is an atomic operation. You must scan the QR code first to identify the parcel. If a user with the COURIER role performs this scan, the parcel is automatically moved to the DISPATCHED state, skipping the manual dispatch step.
        </div>
      </div>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR, COURIER</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/parcels/scan&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;qrCode&quot;:&quot;PDS-A1B2C3&quot;,&quot;awbNumber&quot;:&quot;AWB-DTDC-001&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;qrCode&quot;: &quot;PDS-A1B2C3&quot;,
  &quot;awbNumber&quot;: &quot;AWB-DTDC-001&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/senders-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Senders — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Senders</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm get">GET</span>List Senders</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm post">POST</span>Create Sender</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm get">GET</span>Get Sender by ID</a><a href="#ep-3" class="toc-item"><span class="method-badge-sm get">GET</span>Lookup by Phone</a><a href="#ep-4" class="toc-item"><span class="method-badge-sm get">GET</span>Get All Sender Names</a><a href="#ep-5" class="toc-item"><span class="method-badge-sm get">GET</span>Get All Sender Phones</a><a href="#ep-6" class="toc-item"><span class="method-badge-sm get">GET</span>Lookup by Name</a><a href="#ep-7" class="toc-item"><span class="method-badge-sm put">PUT</span>Update Sender</a><a href="#ep-8" class="toc-item"><span class="method-badge-sm delete">DELETE</span>Delete Sender</a><a href="#ep-9" class="toc-item"><span class="method-badge-sm get">GET</span>Get Addresses</a><a href="#ep-10" class="toc-item"><span class="method-badge-sm post">POST</span>Create Address</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Senders</h2>
        <p>Sender (Party) CRUD, lookup, and address book</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/senders</code>
        </div>
        <h3 class="endpoint-name">List Senders</h3>
        <p class="endpoint-desc">Retrieves all active sender entities.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/senders&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;id&quot;: <span class="json-number">1</span>,
      &quot;customerName&quot;: &quot;John Doe&quot;,
      &quot;phoneNo&quot;: &quot;9876543210&quot;,
      &quot;emailId&quot;: &quot;john.doe@example.com&quot;,
      &quot;isActive&quot;: <span class="json-bool">true</span>
    }
  ]
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/senders</code>
        </div>
        <h3 class="endpoint-name">Create Sender</h3>
        <p class="endpoint-desc">Registers a new sender with contact and address info.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/senders&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;customerName&quot;:&quot;John Doe Enterprises&quot;,&quot;phoneNo&quot;:&quot;9876543210&quot;,&quot;emailId&quot;:&quot;john.doe@example.com&quot;,&quot;address&quot;:&quot;123 Business Park, Sector 62&quot;,&quot;city&quot;:&quot;Noida&quot;,&quot;state&quot;:&quot;Uttar Pradesh&quot;,&quot;pincode&quot;:&quot;201301&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;customerName&quot;: &quot;John Doe Enterprises&quot;,
  &quot;phoneNo&quot;: &quot;9876543210&quot;,
  &quot;emailId&quot;: &quot;john.doe@example.com&quot;,
  &quot;address&quot;: &quot;123 Business Park, Sector 62&quot;,
  &quot;city&quot;: &quot;Noida&quot;,
  &quot;state&quot;: &quot;Uttar Pradesh&quot;,
  &quot;pincode&quot;: &quot;201301&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">201</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/senders/:id</code>
        </div>
        <h3 class="endpoint-name">Get Sender by ID</h3>
        <p class="endpoint-desc">Retrieves a single sender profile.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/senders/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-3">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/senders/lookup?phone=9876543210</code>
        </div>
        <h3 class="endpoint-name">Lookup by Phone</h3>
        <p class="endpoint-desc">Quick sender lookup by mobile number for auto-fill.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/senders/lookup?phone=9876543210&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-4">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/senders/names</code>
        </div>
        <h3 class="endpoint-name">Get All Sender Names</h3>
        <p class="endpoint-desc">Distinct sender names for autocomplete dropdown.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/senders/names&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    &quot;John Doe Enterprises&quot;,
    &quot;Ramesh Textiles&quot;
  ]
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-5">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/senders/phones</code>
        </div>
        <h3 class="endpoint-name">Get All Sender Phones</h3>
        <p class="endpoint-desc">Distinct phone numbers for autocomplete dropdown.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/senders/phones&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    &quot;9876543210&quot;,
    &quot;9000000001&quot;
  ]
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-6">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/senders/lookup-by-name?name=John</code>
        </div>
        <h3 class="endpoint-name">Lookup by Name</h3>
        <p class="endpoint-desc">Search senders by partial name match.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/senders/lookup-by-name?name=John&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-7">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#78350f;color:#fbbf24;border-color:#92400e">PUT</span>
          <code class="endpoint-path">/senders/:id</code>
        </div>
        <h3 class="endpoint-name">Update Sender</h3>
        <p class="endpoint-desc">Updates sender information (partial updates supported).</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X PUT &quot;{{base_url}}/senders/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;customerName&quot;:&quot;John Doe Enterprises Updated&quot;,&quot;city&quot;:&quot;Gurugram&quot;,&quot;state&quot;:&quot;Haryana&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;customerName&quot;: &quot;John Doe Enterprises Updated&quot;,
  &quot;city&quot;: &quot;Gurugram&quot;,
  &quot;state&quot;: &quot;Haryana&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-8">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#7f1d1d;color:#f87171;border-color:#991b1b">DELETE</span>
          <code class="endpoint-path">/senders/:id</code>
        </div>
        <h3 class="endpoint-name">Delete Sender</h3>
        <p class="endpoint-desc">Soft-deletes a sender.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X DELETE &quot;{{base_url}}/senders/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-9">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/senders/:id/addresses</code>
        </div>
        <h3 class="endpoint-name">Get Addresses</h3>
        <p class="endpoint-desc">Address book entries for a sender (dropdown).</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/senders/:id/addresses&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;id&quot;: <span class="json-number">10</span>,
      &quot;partyId&quot;: <span class="json-number">1</span>,
      &quot;partyName&quot;: &quot;John Doe Enterprises&quot;,
      &quot;phoneNo&quot;: &quot;9876543210&quot;,
      &quot;address&quot;: &quot;123 Business Park&quot;,
      &quot;city&quot;: &quot;Noida&quot;,
      &quot;state&quot;: &quot;UP&quot;,
      &quot;pincode&quot;: &quot;201301&quot;,
      &quot;isDefault&quot;: <span class="json-bool">true</span>
    }
  ]
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-10">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/senders/:id/addresses</code>
        </div>
        <h3 class="endpoint-name">Create Address</h3>
        <p class="endpoint-desc">Adds a new address to a sender's address book.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/senders/:id/addresses&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;address&quot;:&quot;456 New Location&quot;,&quot;city&quot;:&quot;Mumbai&quot;,&quot;state&quot;:&quot;Maharashtra&quot;,&quot;pincode&quot;:&quot;400001&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;address&quot;: &quot;456 New Location&quot;,
  &quot;city&quot;: &quot;Mumbai&quot;,
  &quot;state&quot;: &quot;Maharashtra&quot;,
  &quot;pincode&quot;: &quot;400001&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">201</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: src/interfaces/http/controllers/auth.controller.js
````javascript
import asyncHandler from 'express-async-handler';
import authService from '../../../modules/auth/auth.service.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Pass the payload to the service
  const result = await authService.loginUser(email, password);

  // Return HTTP response wrapped in success envelope
  res.json({
    success: true,
    data: result
  });
});


// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set by auth.middleware.js. 
  // We extract the identifier (EmployeeCode) which was stored in the token.
  const employeeCode = req.user.EmployeeCode || req.user.employeeCode || req.user.id;

  const profile = await authService.getProfile(employeeCode);

  res.json({
    success: true,
    data: profile
  });
});
````

## File: src/interfaces/http/controllers/order.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/order.controller.js
// Description: Express route handlers for Order module endpoints.
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// All responses use the standard envelope: { success, data?, error? }
// ============================================================================

import asyncHandler from 'express-async-handler';
import orderService from '../../../modules/order/order.service.js';

/**
 * POST /api/v1/orders
 * Creates a complex order (sender → order → receivers → items → parcels).
 */
export const createOrder = asyncHandler(async (req, res) => {
  const result = await orderService.createOrder(req.body, req.user);
  res.status(201).json({ success: true, data: result });
});

/**
 * GET /api/v1/orders
 * Lists all orders with derived statuses, paginated.
 * Maps to: prc_GetAllOrdersSummary
 */
export const getOrderList = asyncHandler(async (req, res) => {
  const filters = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 20,
    search: req.query.search || null,
    sortBy: req.query.sortBy || 'created_at',
    sortOrder: req.query.sortOrder || 'desc'
  };

  const { data, total } = await orderService.getOrderSummaryList(filters);

  res.json({
    success: true,
    data,
    meta: {
      page: filters.page,
      limit: filters.limit,
      totalRows: total,
      totalPages: Math.ceil(total / filters.limit)
    }
  });
});

/**
 * GET /api/v1/orders/:id
 * Gets full order aggregate (nested JSON: Order → Receivers → [Items, Parcel]).
 * Maps to: prc_GetOrderAggregate
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const orderDetails = await orderService.getOrderDetails(req.params.id);
  res.json({ success: true, data: orderDetails });
});

/**
 * PUT /api/v1/orders/:id
 * Updates an existing order (before dispatch threshold).
 * Maps to: prc_UpdateComplexOrder
 * ❗ Fails if any parcel status ≥ AWB_LINKED
 */
export const updateOrder = asyncHandler(async (req, res) => {
  const result = await orderService.updateOrder(req.params.id, req.body, req.user);
  res.json({ success: true, data: result });
});

/**
 * PATCH /api/v1/orders/:id/cancel
 * Cancels entire order and cascades to all parcels.
 * Maps to: prc_CancelOrder
 * ❌ Cannot cancel if any parcel is DISPATCHED or DELIVERED
 */
export const cancelOrder = asyncHandler(async (req, res) => {
  const result = await orderService.cancelOrder(req.params.id, req.user);
  res.json({ success: true, data: result });
});
````

## File: src/modules/courier/courier.service.js
````javascript
// ============================================================================
// File: src/modules/courier/courier.service.js
// Description: Business logic layer for Courier Partners Master Data.
// ============================================================================

import courierRepository from "./courier.repository.js";

class CourierService {
  _mapToApi(courier) {
    if (!courier) return null;
    return {
      id: courier.CourierId,
      courierName: courier.CourierName,
      trackingUrlTemplate: courier.TrackingUrlTemplate,
      isActive: courier.IsActive === 1 || courier.IsActive === true,
      createdAt: courier.CreatedDate
    };
  }

  async getCouriers(page = 1, limit = 20, search = "") {
    const result = await courierRepository.findAll({ page, limit, search });
    return {
      data: result.data.map(c => this._mapToApi(c)),
      meta: result.meta
    };
  }

  async getCourierById(id) {
    const courier = await courierRepository.findById(id);
    if (!courier) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(courier);
  }

  async createCourier(courierData, adminId) {
    if (!courierData.courierName) {
      const error = new Error("Courier Name is required");
      error.statusCode = 400;
      throw error;
    }

    const duplicateCount = await courierRepository.checkDuplicate(0, courierData.courierName);
    if (duplicateCount > 0) {
      const error = new Error("Courier name already exists");
      error.statusCode = 409;
      throw error;
    }

    const courier = await courierRepository.create(courierData, adminId);
    return this._mapToApi(courier);
  }

  async updateCourier(id, updates, adminId) {
    if (updates.courierName) {
      const duplicateCount = await courierRepository.checkDuplicate(id, updates.courierName);
      if (duplicateCount > 0) {
        const error = new Error("Courier name already exists");
        error.statusCode = 409;
        throw error;
      }
    }

    const courier = await courierRepository.update(id, updates, adminId);
    if (!courier) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(courier);
  }

  async deleteCourier(id, adminId) {
    // Business Rule checking - in production, verify courier isn't linked to active orders
    // before allowing even a soft delete.
    const success = await courierRepository.delete(id, adminId);
    if (!success) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }

    return true;
  }
}

export default new CourierService();
````

## File: src/modules/dashboard/dashboard.repository.js
````javascript
// ============================================================================
// File: src/modules/dashboard/dashboard.repository.js
// Description: Data access layer for Dashboard analytics.
// Uses prc_dashboard_metrics_get for obtaining system-wide metrics.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention: prc_dashboard_metrics_get (pAction=0)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Realistic dashboard metrics for frontend development without a live database.
// ============================================================================
const mockMetrics = {
  TotalOrders: 150,
  PendingOrders: 45,
  DispatchedOrders: 80,
  DeliveredOrders: 25
};

class DashboardRepository {
  /**
   * Fetches high-level metrics for the admin dashboard.
   * Calls prc_dashboard_metrics_get with pAction=0.
   *
   * @returns {Promise<Object>} The dashboard metrics data.
   */
  async getMetrics() {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_dashboard_metrics_get (pAction=0)
    // Injection Site: Procedure call for analytics
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_dashboard_metrics_get(?)', [0]);

      // Handle MySQL procedure result format: [ [row], [meta] ]
      const result = Array.isArray(rows) ? rows[0] : null;
      const metrics = Array.isArray(result) ? result[0] : result;

      return metrics || {};
    }

    // ------------------------------------------------------------------
    // MOCK MODE: Return static mock metrics
    // ------------------------------------------------------------------
    return mockMetrics;
  }
}

export default new DashboardRepository();
````

## File: src/modules/notification/notification.service.js
````javascript
// ============================================================================
// File: src/modules/notification/notification.service.js
// Description: Business logic layer for the Notification module.
// Handles {AWB} template replacement and orchestrates notification sending.
// ============================================================================

import notificationRepository from './notification.repository.js';
import parcelRepository from '../parcel/parcel.repository.js';
import db from '../../infrastructure/database/db.js';

class NotificationService {
  /**
   * Internal mapper to standardize PascalCase DB columns to camelCase API structure.
   */
  _mapToApi(log) {
    if (!log) return null;
    return {
      notificationId: log.PkNotificationLogId || log.id || log.notificationId,
      parcelId: log.FkParcelDetailsId || log.parcelId,
      recipientPhone: log.RecipientPhone || log.recipientPhone,
      notificationChannel: log.NotificationChannel || log.notificationChannel,
      messageContent: log.MessageContent || log.messageContent,
      statusId: log.FkNotificationStatusId || log.statusId,
      requestedBy: log.RequestedBy || log.requestedBy,
      createdAt: log.CreatedDate || log.createdAt || log.createdDate
    };
  }

  /**
   * Send a notification for a specific parcel.
   * 
   * @param {number|string} parcelId - The parcel being notified.
   * @param {object} user - The authenticated user triggering the notification.
   * @returns {Promise<object>} Result of the notification attempt.
   */
  async sendNotification(parcelId, user) {
    // ------------------------------------------------------------------
    // SERVICE LOGIC: Orchestration
    // ------------------------------------------------------------------
    const parcel = await this._getAndValidateParcel(parcelId);
    const trackingUrl = await this._generateTrackingUrl(parcel);
    const messageContent = `Your parcel is dispatched. Track here: ${trackingUrl}`;

    // Trigger external SMS/Email gateway API calls (Mocked)
    console.log(`[NOTIFICATION] Sending tracking link: ${trackingUrl} to ${parcel.receiverPhone}`);

    const logEntry = await notificationRepository.logNotification({
      parcelId: parcel.id,
      recipientPhone: parcel.receiverPhone,
      notificationChannel: 'SMS',
      messageContent: messageContent,
      statusId: 1 // Sent
    }, user?.employeeCode || 1);

    return {
      message: 'Notification sent successfully',
      trackingUrl,
      logEntry: this._mapToApi(logEntry)
    };
  }

  /**
   * Internal helper to fetch and validate parcel for notification.
   * @private
   */
  async _getAndValidateParcel(parcelId) {
    const parcel = await parcelRepository.findById(parcelId);
    if (!parcel) throw this._error('Parcel not found', 404);

    const trackingNo = parcel.TrackingNo || parcel.trackingNo;
    if (!trackingNo) throw this._error('No AWB linked to this parcel', 400);

    const receiverPhone = parcel.ReceiverPhone || parcel.receiverPhone;
    if (!receiverPhone) throw this._error('No receiver phone number found', 400);

    return {
      id: parcel.PkParcelDetailsId || parcel.id,
      trackingNo,
      receiverPhone,
      courierId: parcel.FkCourierId || parcel.fkCourierId || parcel.courierId
    };
  }

  /**
   * Internal helper to generate the tracking URL from template.
   * @private
   */
  async _generateTrackingUrl(parcel) {
    let template = 'https://track.it/{AWB}';
    
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('SELECT TrackingUrlTemplate FROM courier_partner_master WHERE CourierId = ?', [parcel.courierId]);
      template = rows[0]?.[0]?.TrackingUrlTemplate || template;
    }

    return template.replace('{AWB}', parcel.trackingNo);
  }

  /**
   * Resend a specific notification.
   * 
   * @param {number|string} notificationId - The ID of the log entry.
   * @param {object} user - The authenticated user.
   */
  async resendNotification(notificationId, user) {
    const log = await notificationRepository.findById(notificationId);
    if (!log) throw this._error('Notification log entry not found', 404);

    return await this.sendNotification(log.FkParcelDetailsId || log.parcelId, user);
  }

  /**
   * Get history for a parcel.
   * @param {number|string} parcelId 
   */
  async getParcelNotifications(parcelId) {
    const logs = await notificationRepository.getHistoryByParcelId(parcelId);
    return logs.map(log => this._mapToApi(log));
  }

  /**
   * Handle incoming webhook updates.
   * @param {object} payload 
   */
  async handleWebhook(payload) {
    const { notificationId, status } = payload;
    const statusMap = { 'sent': 1, 'delivered': 2, 'failed': 3 };
    const statusId = statusMap[(status || '').toLowerCase()] || 1;

    const updatedLog = await notificationRepository.updateWebhookStatus(notificationId, statusId);
    if (!updatedLog) throw this._error('Original notification not found', 404);

    return this._mapToApi(updatedLog);
  }

  /**
   * Internal helper to create structured errors.
   * @private
   */
  _error(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }
}

export default new NotificationService();
````

## File: src/shared/middleware/auth.middleware.js
````javascript
import jwt from 'jsonwebtoken';
import employeeRepository from '../../modules/employee/employee.repository.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract token
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Fetch user from MySQL via the Repository (excluding password)
      // Make sure your sp_get_user_by_id doesn't return the password!
      const user = await employeeRepository.findById(decoded.id);

      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      // 5. Attach normalized user to the request object.
      //    Raw repository data may use PascalCase (mock) or camelCase (live DB).
      //    We normalize to a canonical shape so downstream middleware (authorizeRoles)
      //    and controllers always see consistent field names.
      req.user = {
        id: user.EmployeeCode || user.employeeCode || user.id,
        employeeCode: user.EmployeeCode || user.employeeCode,
        name: user.FullName || user.name,
        email: user.EmailAddress || user.email,
        role: user.RoleCode || user.role,
        allowLogin: user.AllowLogin ?? user.allowLogin,
      };
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  } else {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};

// Flexible Role-Based Access Control (RBAC)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403); // Forbidden
      return next(new Error(`User role '${req.user ? req.user.role : 'GUEST'}' is not authorized for this route`));
    }
    next();
  };
};
````

## File: test_data/Auth_Test_Data.txt
````
==================================================
AUTHENTICATION — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: Login ---
Method: POST
URL: /api/v1/auth/login
Auth: None
Roles: ALL
Headers:
  Content-Type: application/json

Body:
{
  "email": "admin@example.com",
  "password": "securePass123"
}

Expected Status: 200

--- TEST 2: Get Profile ---
Method: GET
URL: /api/v1/auth/profile
Auth: Bearer <TOKEN>
Roles: ALL

Expected Status: 200

--- TEST 3: System Health ---
Method: GET
URL: /api/v1/system/health
Auth: None
Roles: ALL

Expected Status: 200
````

## File: test_data/BulkUpload_Test_Data.txt
````
==================================================
BULK UPLOAD — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: Create Bulk Session ---
Method: POST
URL: /api/v1/bulk-uploads
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "rows": [
    {
      "senderName": "Bulk Sender",
      "senderMobile": "9000000099",
      "courierId": 1,
      "receivers": [
        {
          "receiverName": "Bulk Receiver",
          "receiverPhone": "9000000098",
          "products": [
            {
              "productId": 1,
              "qty": 1,
              "unitPrice": 100
            }
          ]
        }
      ]
    }
  ]
}

Expected Status: 201

--- TEST 2: List Sessions ---
Method: GET
URL: /api/v1/bulk-uploads
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 3: Get Session by ID ---
Method: GET
URL: /api/v1/bulk-uploads/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200
````

## File: test_data/Employee_Test_Data.txt
````
==================================================
EMPLOYEE MANAGEMENT (ADMIN) — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: List Employees ---
Method: GET
URL: /api/v1/employees
Auth: Bearer <TOKEN>
Roles: ADMIN

Expected Status: 200

--- TEST 2: Create Employee ---
Method: POST
URL: /api/v1/employees
Auth: Bearer <TOKEN>
Roles: ADMIN
Headers:
  Content-Type: application/json

Body:
{
  "name": "New Emp",
  "role": "OPERATOR",
  "email": "newemp@example.com",
  "password": "Test123456"
}

Expected Status: 201

--- TEST 3: Get Employee by ID ---
Method: GET
URL: /api/v1/employees/:id
Auth: Bearer <TOKEN>
Roles: ADMIN

Expected Status: 200

--- TEST 4: Update Employee ---
Method: PUT
URL: /api/v1/employees/:id
Auth: Bearer <TOKEN>
Roles: ADMIN
Headers:
  Content-Type: application/json

Body:
{
  "name": "Updated Name"
}

Expected Status: 200

--- TEST 5: Toggle Employee Access ---
Method: PATCH
URL: /api/v1/employees/:id/toggle-access
Auth: Bearer <TOKEN>
Roles: ADMIN
Headers:
  Content-Type: application/json

Body:
{
  "allowLogin": true
}

Expected Status: 200
````

## File: test_data/ParcelEvents_Test_Data.txt
````
==================================================
PARCEL EVENTS & AUDIT EXPORT — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: List Events ---
Method: GET
URL: /api/v1/parcel-events
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 2: Export CSV ---
Method: GET
URL: /api/v1/parcel-events/export
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200
````

## File: .antigravityignore
````
# 1. Credentials and Secrets (CRITICAL SAFETY)
.env
.env.*
*.pem
*.key
credentials.json
service-account.json

# 2. Build Artifacts & Caches
node_modules/
dist/
build/
.next/
out/
coverage/
.turbo/
test_data/
bruno/
sdcms-server.xml

# 3. Lock files (Reduces index bloat)
package-lock.json
yarn.lock
pnpm-lock.yaml

# 4. Generated files & Logs
*.log
**/*.min.js
**/*.min.css
**/*.map

# 5. Media & Assets
public/assets/
**/*.png
**/*.jpg
**/*.svg
**/*.mp4
````

## File: docs/api/dispatch-terminal-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Dispatch and Terminal States — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Dispatch and Terminal States</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm post">POST</span>Batch Dispatch</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm patch">PATCH</span>Mark Delivered</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm patch">PATCH</span>Mark Returned</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Dispatch and Terminal States</h2>
        <p>Dispatch, deliver, and return parcel operations</p>
      </header>

      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/parcels/dispatch</code>
        </div>
        <h3 class="endpoint-name">Batch Dispatch</h3>
        <p class="endpoint-desc">Dispatches one or more AWB_LINKED parcels.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/parcels/dispatch&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;parcelIds&quot;:[1,2,3]}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;parcelIds&quot;: [
    1,
    2,
    3
  ]
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#4c1d95;color:#a78bfa;border-color:#5b21b6">PATCH</span>
          <code class="endpoint-path">/parcels/:id/deliver</code>
        </div>
        <h3 class="endpoint-name">Mark Delivered</h3>
        <p class="endpoint-desc">Terminal state — marks parcel as DELIVERED.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X PATCH &quot;{{base_url}}/parcels/:id/deliver&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#4c1d95;color:#a78bfa;border-color:#5b21b6">PATCH</span>
          <code class="endpoint-path">/parcels/:id/return</code>
        </div>
        <h3 class="endpoint-name">Mark Returned</h3>
        <p class="endpoint-desc">Terminal state — marks parcel as RETURNED.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X PATCH &quot;{{base_url}}/parcels/:id/return&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: src/interfaces/http/routes/product.routes.js
````javascript
// ============================================================================
// File: src/interfaces/http/routes/product.routes.js
// Description: Routing and RBAC mapping for Product endpoints.
// ============================================================================

import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDropdown,
  addProductMatrix,
  getProductCategories,
  createProductCategory,
  getProductUnits,
  createProductUnit,
  getProductColors,
  createProductColor
} from '../controllers/product.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import {
  createProductSchema,
  updateProductSchema,
  productMatrixSchema,
  createCategorySchema,
  createColorSchema,
  createUnitSchema
} from '../validations/validation.schemas.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Products are accessible by ADMIN and OPERATOR
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

// Product metadata endpoints
router.route('/categories')
  .get(getProductCategories)
  .post(validate(createCategorySchema), createProductCategory);

router.route('/units')
  .get(getProductUnits)
  .post(validate(createUnitSchema), createProductUnit);

router.route('/colors')
  .get(getProductColors)
  .post(validate(createColorSchema), createProductColor);

router.route('/')
  .get(getProducts)
  .post(validate(createProductSchema), createProduct);

// Product + Category combined dropdown (Feature E)
router.get('/dropdown', getProductDropdown);

router.route('/:id')
  .get(getProductById)
  .put(validate(updateProductSchema), updateProduct)
  .delete(deleteProduct);

// Color/Size matrix variation for a specific product
router.post('/:id/matrix', validate(productMatrixSchema), addProductMatrix);

export default router;
````

## File: src/interfaces/http/routes/sender.routes.js
````javascript
// ============================================================================
// File: src/interfaces/http/routes/sender.routes.js
// Description: Route definitions for Sender (Party) module.
// ============================================================================

import express from 'express';
import senderController from '../controllers/sender.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createSenderSchema, updateSenderSchema, createAddressSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// All sender routes require authentication + ADMIN/OPERATOR role
router.use(protect);
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

/**
 * @route   GET /api/v1/senders
 * @desc    Get all active senders
 */
router.get('/', senderController.getSenders);

/**
 * @route   GET /api/v1/senders/lookup
 * @desc    Lookup sender by phone number
 */
router.get('/lookup', senderController.lookupByPhone);

/**
 * @route   GET /api/v1/senders/names
 * @desc    Get all distinct active sender names (autocomplete dropdown)
 */
router.get('/names', senderController.getAllNames);

/**
 * @route   GET /api/v1/senders/phones
 * @desc    Get all distinct active phone numbers (autocomplete dropdown)
 */
router.get('/phones', senderController.getAllPhones);

/**
 * @route   GET /api/v1/senders/lookup-by-name
 * @desc    Search senders by name (partial match)
 */
router.get('/lookup-by-name', senderController.lookupByName);

/**
 * @route   GET /api/v1/senders/:id
 * @desc    Get sender by ID
 */
router.get('/:id', senderController.getSenderById);

/**
 * @route   POST /api/v1/senders
 * @desc    Create a new sender
 */
router.post('/', validate(createSenderSchema), senderController.createSender);

/**
 * @route   PUT /api/v1/senders/:id
 * @desc    Update an existing sender
 */
router.put('/:id', validate(updateSenderSchema), senderController.updateSender);

/**
 * @route   DELETE /api/v1/senders/:id
 * @desc    Soft-delete a sender
 */
router.delete('/:id', senderController.deleteSender);

// ============================================================================
// ADDRESS BOOK (PARTY_DETAILS) ROUTES
// ============================================================================

/**
 * @route   GET /api/v1/senders/:id/addresses
 * @desc    Get all addresses for a party (address book dropdown)
 */
router.get('/:id/addresses', senderController.getAddresses);

/**
 * @route   POST /api/v1/senders/:id/addresses
 * @desc    Create a new address for a party
 */
router.post('/:id/addresses', validate(createAddressSchema), senderController.createAddress);

export default router;
````

## File: src/modules/dashboard/dashboard.service.js
````javascript
// ============================================================================
// File: src/modules/dashboard/dashboard.service.js
// Description: Service layer for Dashboard logic.
// Bridges the controller to the dashboard repository.
// ============================================================================

import dashboardRepository from './dashboard.repository.js';

class DashboardService {
  /**
   * Internal mapper to standardize database result set to the API contract.
   * Ensures the result contains totalOrders, pendingOrders, dispatchedOrders, and deliveredOrders.
   *
   * @param {object} rawMetrics - Raw metrics from repository
   * @returns {object} Standardized metrics object (camelCase only)
   */
  _mapToApi(rawMetrics) {
    if (!rawMetrics) return {};

    return {
      totalOrders: rawMetrics.TotalOrders ?? rawMetrics.totalOrders ?? 0,
      pendingOrders: rawMetrics.PendingOrders ?? rawMetrics.pendingOrders ?? 0,
      dispatchedOrders: rawMetrics.DispatchedOrders ?? rawMetrics.dispatchedOrders ?? 0,
      deliveredOrders: rawMetrics.DeliveredOrders ?? rawMetrics.deliveredOrders ?? 0
    };
  }

  /**
   * Retrieves dashboard metrics.
   *
   * @returns {Promise<Object>} Dashboard metrics.
   */
  async getMetrics() {
    const data = await dashboardRepository.getMetrics();
    return this._mapToApi(data);
  }
}

export default new DashboardService();
````

## File: test_data/Courier_Test_Data.txt
````
==================================================
COURIER PARTNERS — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: List Couriers ---
Method: GET
URL: /api/v1/courier-partners
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR, COURIER

Expected Status: 200

--- TEST 2: Create Courier ---
Method: POST
URL: /api/v1/courier-partners
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "courierName": "TestCourier Express",
  "trackingUrlTemplate": "https://track.testcourier.com/awb/{AWB}"
}

Expected Status: 201

--- TEST 3: Get Courier by ID ---
Method: GET
URL: /api/v1/courier-partners/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR, COURIER

Expected Status: 200

--- TEST 4: Update Courier ---
Method: PUT
URL: /api/v1/courier-partners/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "courierName": "Updated Courier"
}

Expected Status: 200

--- TEST 5: Delete Courier ---
Method: DELETE
URL: /api/v1/courier-partners/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200
````

## File: test_data/Dashboard_Test_Data.txt
````
==================================================
DASHBOARD — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: Get Metrics ---
Method: GET
URL: /api/v1/dashboard/metrics
Auth: Bearer <TOKEN>
Roles: ADMIN

Expected Status: 200
````

## File: test_data/Dispatch_Test_Data.txt
````
==================================================
DISPATCH AND TERMINAL STATES — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: Batch Dispatch ---
Method: POST
URL: /api/v1/parcels/dispatch
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "parcelIds": [
    1,
    2,
    3
  ]
}

Expected Status: 200

--- TEST 2: Mark Delivered ---
Method: PATCH
URL: /api/v1/parcels/:id/deliver
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 3: Mark Returned ---
Method: PATCH
URL: /api/v1/parcels/:id/return
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200
````

## File: test_data/Notification_Test_Data.txt
````
==================================================
NOTIFICATION — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: Send Notification ---
Method: POST
URL: /api/v1/parcels/:id/notify
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 2: Get Notification History ---
Method: GET
URL: /api/v1/parcels/:id/notifications
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 3: Resend Notification ---
Method: POST
URL: /api/v1/notifications/:id/resend
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 4: Webhook ---
Method: POST
URL: /api/v1/notifications/webhook
Auth: None
Roles: ALL
Headers:
  Content-Type: application/json

Body:
{
  "notificationId": 1,
  "status": "delivered"
}

Expected Status: 200
````

## File: test_data/Scan_Test_Data.txt
````
==================================================
TWO SCAN OPERATIONS — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: Scan and Link AWB ---
Method: POST
URL: /api/v1/parcels/scan
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR, COURIER
Headers:
  Content-Type: application/json

Body:
{
  "qrCode": "PDS-A1B2C3",
  "awbNumber": "AWB-DTDC-001"
}

Expected Status: 200
````

## File: docs/api/order-pipeline-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Order Pipeline — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Order Pipeline</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm get">GET</span>List Orders</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm post">POST</span>Create Order — Mode B (Sender → Receivers)</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm post">POST</span>Create Order — Mode A (Sender-to-Self)</a><a href="#ep-3" class="toc-item"><span class="method-badge-sm get">GET</span>Get Order Aggregate</a><a href="#ep-4" class="toc-item"><span class="method-badge-sm put">PUT</span>Update Order</a><a href="#ep-5" class="toc-item"><span class="method-badge-sm patch">PATCH</span>Cancel Order</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Order Pipeline</h2>
        <p>Order CRUD with Mode A/B/C support</p>
      </header>

      
        <div class="guide-box">
          <h4>Integration Guide</h4>
          <p>Our system uses 3 creation modes: Mode A (Sender-to-Self), Mode B (Sender-to-Receivers), and Mode C (Combo). The backend automatically detects the mode based on whether 'products' (root) or 'receivers' (array) are provided. Testers should verify that each receiver correctly generates its own unique Parcel ID (PDS-XXX).</p>
        </div>
      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/orders?page=1&amp;limit=20</code>
        </div>
        <h3 class="endpoint-name">List Orders</h3>
        <p class="endpoint-desc">Paginated order list with derived status.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR, COURIER</span>
            </div>
          </div>

        
          <div class="section-label">Parameters</div>
          <table class="params-table">
            <thead>
              <tr><th>Name</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              
                <tr>
                  <td><code>page</code></td>
                  <td><span class="type-tag">number</span></td>
                  <td>Current page number</td>
                </tr>
              
                <tr>
                  <td><code>limit</code></td>
                  <td><span class="type-tag">number</span></td>
                  <td>Number of items per page</td>
                </tr>
              
                <tr>
                  <td><code>status</code></td>
                  <td><span class="type-tag">string</span></td>
                  <td>Filter by derived status (PENDING, DISPATCHED, etc.)</td>
                </tr>
              
            </tbody>
          </table>
        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/orders?page=1&amp;limit=20&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;id&quot;: <span class="json-number">1</span>,
      &quot;orderCode&quot;: &quot;ORD-2026-001&quot;,
      &quot;senderName&quot;: &quot;Ramesh Textiles&quot;,
      &quot;senderMobile&quot;: &quot;9876543210&quot;,
      &quot;totalAmount&quot;: <span class="json-number">2100</span>,
      &quot;derivedStatus&quot;: &quot;PENDING&quot;,
      &quot;createdAt&quot;: &quot;2026-04-24T10: <span class="json-number">00</span>: <span class="json-number">00</span>Z&quot;
    }
  ],
  &quot;meta&quot;: {
    &quot;page&quot;: <span class="json-number">1</span>,
    &quot;limit&quot;: <span class="json-number">20</span>,
    &quot;totalRows&quot;: <span class="json-number">1</span>,
    &quot;totalPages&quot;: <span class="json-number">1</span>
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/orders</code>
        </div>
        <h3 class="endpoint-name">Create Order — Mode B (Sender → Receivers)</h3>
        <p class="endpoint-desc">Creates an order with sender and multiple receivers. Each receiver generates a parcel.</p>
        
        
      <div class="note-box">
        <span class="note-icon">💡</span>
        <div class="note-content">
          <strong>Developer Note:</strong> This is Mode B. Ensure each object in the 'receivers' array has its own 'products' array. The 'courierId' is mandatory to determine the shipping partner.
        </div>
      </div>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/orders&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;senderName&quot;:&quot;Ramesh Textiles&quot;,&quot;senderMobile&quot;:&quot;9876543210&quot;,&quot;senderAddress&quot;:&quot;14, Gandhi Nagar, Surat&quot;,&quot;courierId&quot;:1,&quot;receivers&quot;:[{&quot;receiverName&quot;:&quot;Delhi Fabrics Ltd.&quot;,&quot;receiverPhone&quot;:&quot;9123456780&quot;,&quot;address&quot;:&quot;45, Karol Bagh&quot;,&quot;city&quot;:&quot;New Delhi&quot;,&quot;state&quot;:&quot;Delhi&quot;,&quot;pincode&quot;:&quot;110005&quot;,&quot;products&quot;:[{&quot;productId&quot;:1,&quot;qty&quot;:5,&quot;unitPrice&quot;:420}]}]}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;senderName&quot;: &quot;Ramesh Textiles&quot;,
  &quot;senderMobile&quot;: &quot;9876543210&quot;,
  &quot;senderAddress&quot;: &quot;14, Gandhi Nagar, Surat&quot;,
  &quot;courierId&quot;: <span class="json-number">1</span>,
  &quot;receivers&quot;: [
    {
      &quot;receiverName&quot;: &quot;Delhi Fabrics Ltd.&quot;,
      &quot;receiverPhone&quot;: &quot;9123456780&quot;,
      &quot;address&quot;: &quot;45, Karol Bagh&quot;,
      &quot;city&quot;: &quot;New Delhi&quot;,
      &quot;state&quot;: &quot;Delhi&quot;,
      &quot;pincode&quot;: &quot;110005&quot;,
      &quot;products&quot;: [
        {
          &quot;productId&quot;: <span class="json-number">1</span>,
          &quot;qty&quot;: <span class="json-number">5</span>,
          &quot;unitPrice&quot;: <span class="json-number">420</span>
        }
      ]
    }
  ]
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">201</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/orders</code>
        </div>
        <h3 class="endpoint-name">Create Order — Mode A (Sender-to-Self)</h3>
        <p class="endpoint-desc">Sender-to-self order using top-level products array.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/orders&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;senderName&quot;:&quot;Ramesh Textiles&quot;,&quot;senderMobile&quot;:&quot;9876543210&quot;,&quot;senderAddress&quot;:&quot;14, Gandhi Nagar&quot;,&quot;courierId&quot;:1,&quot;products&quot;:[{&quot;productId&quot;:1,&quot;qty&quot;:10,&quot;unitPrice&quot;:500}]}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;senderName&quot;: &quot;Ramesh Textiles&quot;,
  &quot;senderMobile&quot;: &quot;9876543210&quot;,
  &quot;senderAddress&quot;: &quot;14, Gandhi Nagar&quot;,
  &quot;courierId&quot;: <span class="json-number">1</span>,
  &quot;products&quot;: [
    {
      &quot;productId&quot;: <span class="json-number">1</span>,
      &quot;qty&quot;: <span class="json-number">10</span>,
      &quot;unitPrice&quot;: <span class="json-number">500</span>
    }
  ]
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">201</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-3">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/orders/:id</code>
        </div>
        <h3 class="endpoint-name">Get Order Aggregate</h3>
        <p class="endpoint-desc">Full order with nested receivers, items, and parcels.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR, COURIER</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/orders/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: <span class="json-number">1</span>,
    &quot;orderCode&quot;: &quot;ORD-2026-001&quot;,
    &quot;senderName&quot;: &quot;Ramesh Textiles&quot;,
    &quot;senderMobile&quot;: &quot;9876543210&quot;,
    &quot;totalAmount&quot;: <span class="json-number">2100</span>,
    &quot;derivedStatus&quot;: &quot;PENDING&quot;,
    &quot;senderAddress&quot;: &quot;14, Gandhi Nagar, Surat&quot;,
    &quot;courierId&quot;: <span class="json-number">1</span>,
    &quot;receivers&quot;: [
      {
        &quot;id&quot;: <span class="json-number">1</span>,
        &quot;receiverName&quot;: &quot;Delhi Fabrics Ltd.&quot;,
        &quot;receiverPhone&quot;: &quot;9123456780&quot;,
        &quot;address&quot;: &quot;45, Karol Bagh&quot;,
        &quot;city&quot;: &quot;New Delhi&quot;,
        &quot;state&quot;: &quot;Delhi&quot;,
        &quot;pincode&quot;: &quot;110005&quot;,
        &quot;parcel&quot;: {
          &quot;id&quot;: <span class="json-number">1</span>,
          &quot;parcelId&quot;: &quot;PDS-A1B2C3&quot;,
          &quot;status&quot;: &quot;PENDING&quot;
        },
        &quot;products&quot;: [
          {
            &quot;productId&quot;: <span class="json-number">1</span>,
            &quot;qty&quot;: <span class="json-number">5</span>,
            &quot;unitPrice&quot;: <span class="json-number">420</span>
          }
        ]
      }
    ]
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-4">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#78350f;color:#fbbf24;border-color:#92400e">PUT</span>
          <code class="endpoint-path">/orders/:id</code>
        </div>
        <h3 class="endpoint-name">Update Order</h3>
        <p class="endpoint-desc">Updates order details (blocked if any parcel &gt;= AWB_LINKED).</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X PUT &quot;{{base_url}}/orders/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;senderName&quot;:&quot;Ramesh Textiles Updated&quot;,&quot;courierId&quot;:2}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;senderName&quot;: &quot;Ramesh Textiles Updated&quot;,
  &quot;courierId&quot;: <span class="json-number">2</span>
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-5">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#4c1d95;color:#a78bfa;border-color:#5b21b6">PATCH</span>
          <code class="endpoint-path">/orders/:id/cancel</code>
        </div>
        <h3 class="endpoint-name">Cancel Order</h3>
        <p class="endpoint-desc">Cancels order and all non-dispatched parcels.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X PATCH &quot;{{base_url}}/orders/:id/cancel&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: docs/api/product-catalog-documentation.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Product Catalog — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>Product Catalog</h2>
      </div>
      <div class="toc-list"><a href="#ep-0" class="toc-item"><span class="method-badge-sm get">GET</span>Get Categories</a><a href="#ep-1" class="toc-item"><span class="method-badge-sm post">POST</span>Create Category</a><a href="#ep-2" class="toc-item"><span class="method-badge-sm get">GET</span>Get Units</a><a href="#ep-3" class="toc-item"><span class="method-badge-sm post">POST</span>Create Unit</a><a href="#ep-4" class="toc-item"><span class="method-badge-sm get">GET</span>Get Colors</a><a href="#ep-5" class="toc-item"><span class="method-badge-sm post">POST</span>Create Color</a><a href="#ep-6" class="toc-item"><span class="method-badge-sm get">GET</span>List Products</a><a href="#ep-7" class="toc-item"><span class="method-badge-sm post">POST</span>Create Product</a><a href="#ep-8" class="toc-item"><span class="method-badge-sm get">GET</span>Get Product by ID</a><a href="#ep-9" class="toc-item"><span class="method-badge-sm put">PUT</span>Update Product</a><a href="#ep-10" class="toc-item"><span class="method-badge-sm delete">DELETE</span>Delete Product</a><a href="#ep-11" class="toc-item"><span class="method-badge-sm get">GET</span>Product Dropdown</a><a href="#ep-12" class="toc-item"><span class="method-badge-sm post">POST</span>Add/Update Product Color Matrix (Standalone)</a></div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>Product Catalog</h2>
        <p>Product CRUD with inline variations, lookup CRUD (categories, colors, units), and dropdown endpoints</p>
      </header>

      
        <div class="guide-box">
          <h4>Integration Guide</h4>
          <p>The product form has two sections: (1) Product details — name, category, unit; (2) Variations table — each row has color, size, rate. Categories, colors, and units can be created on the fly from dropdowns. Create/Update Product accepts an optional 'variations' array for atomic product + variation management.</p>
        </div>
      

      
    <div class="endpoint-card" id="ep-0">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/products/categories</code>
        </div>
        <h3 class="endpoint-name">Get Categories</h3>
        <p class="endpoint-desc">Retrieves all active product categories for dropdown.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/products/categories&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;id&quot;: <span class="json-number">1</span>,
      &quot;categoryName&quot;: &quot;Textiles&quot;
    },
    {
      &quot;id&quot;: <span class="json-number">2</span>,
      &quot;categoryName&quot;: &quot;Accessories&quot;
    }
  ]
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-1">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/products/categories</code>
        </div>
        <h3 class="endpoint-name">Create Category</h3>
        <p class="endpoint-desc">Creates a new product category (used when user selects 'Create New' in the dropdown).</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/products/categories&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;categoryName&quot;:&quot;Electronics&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;categoryName&quot;: &quot;Electronics&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">201</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: <span class="json-number">3</span>,
    &quot;categoryName&quot;: &quot;Electronics&quot;
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-2">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/products/units</code>
        </div>
        <h3 class="endpoint-name">Get Units</h3>
        <p class="endpoint-desc">Retrieves all active units for dropdown.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/products/units&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;id&quot;: <span class="json-number">1</span>,
      &quot;unitTitle&quot;: &quot;Kilogram&quot;,
      &quot;unitCode&quot;: &quot;KG&quot;
    }
  ]
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-3">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/products/units</code>
        </div>
        <h3 class="endpoint-name">Create Unit</h3>
        <p class="endpoint-desc">Creates a new unit lookup entry (used when user selects 'Create New' in the dropdown).</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/products/units&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;unitTitle&quot;:&quot;Meter&quot;,&quot;unitCode&quot;:&quot;MTR&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;unitTitle&quot;: &quot;Meter&quot;,
  &quot;unitCode&quot;: &quot;MTR&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">201</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: <span class="json-number">4</span>,
    &quot;unitTitle&quot;: &quot;Meter&quot;,
    &quot;unitCode&quot;: &quot;MTR&quot;
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-4">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/products/colors</code>
        </div>
        <h3 class="endpoint-name">Get Colors</h3>
        <p class="endpoint-desc">Retrieves all active color lookup entries for dropdown.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/products/colors&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;id&quot;: <span class="json-number">1</span>,
      &quot;colorName&quot;: &quot;Red&quot;,
      &quot;colorCode&quot;: &quot;RED&quot;
    }
  ]
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-5">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/products/colors</code>
        </div>
        <h3 class="endpoint-name">Create Color</h3>
        <p class="endpoint-desc">Creates a new color lookup entry (used when user selects 'Create New' in the dropdown).</p>
        
        
      <div class="note-box">
        <span class="note-icon">💡</span>
        <div class="note-content">
          <strong>Developer Note:</strong> colorCode is optional and defaults to an empty string if not provided.
        </div>
      </div>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/products/colors&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;colorName&quot;:&quot;Crimson&quot;,&quot;colorCode&quot;:&quot;CRM&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;colorName&quot;: &quot;Crimson&quot;,
  &quot;colorCode&quot;: &quot;CRM&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">201</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: <span class="json-number">4</span>,
    &quot;colorName&quot;: &quot;Crimson&quot;,
    &quot;colorCode&quot;: &quot;CRM&quot;
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-6">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/products</code>
        </div>
        <h3 class="endpoint-name">List Products</h3>
        <p class="endpoint-desc">Retrieves products filtered by categoryId or unitId.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
          <div class="section-label">Parameters</div>
          <table class="params-table">
            <thead>
              <tr><th>Name</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              
                <tr>
                  <td><code>categoryId</code></td>
                  <td><span class="type-tag">number</span></td>
                  <td>Filter by category primary key</td>
                </tr>
              
                <tr>
                  <td><code>unitId</code></td>
                  <td><span class="type-tag">number</span></td>
                  <td>Filter by unit primary key</td>
                </tr>
              
            </tbody>
          </table>
        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/products&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;id&quot;: <span class="json-number">1</span>,
      &quot;materialName&quot;: &quot;Cotton Roll&quot;,
      &quot;materialRate&quot;: <span class="json-number">500</span>,
      &quot;categoryName&quot;: &quot;Textiles&quot;
    }
  ]
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-7">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/products</code>
        </div>
        <h3 class="endpoint-name">Create Product</h3>
        <p class="endpoint-desc">Creates a new product with optional inline variations. categoryId and unitId are required. materialRate defaults to 0 if omitted (pricing is primarily per-variation).</p>
        
        
      <div class="note-box">
        <span class="note-icon">💡</span>
        <div class="note-content">
          <strong>Developer Note:</strong> categoryId and unitId are required. materialRate is optional (defaults to 0). The variations array is optional — omit it to create a product without variations.
        </div>
      </div>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/products&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;materialName&quot;:&quot;Heavy Equipment&quot;,&quot;categoryId&quot;:1,&quot;unitId&quot;:1,&quot;materialRate&quot;:500,&quot;variations&quot;:[{&quot;colorId&quot;:1,&quot;size&quot;:&quot;M&quot;,&quot;materialRate&quot;:550},{&quot;colorId&quot;:2,&quot;size&quot;:&quot;L&quot;,&quot;materialRate&quot;:600}]}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;materialName&quot;: &quot;Heavy Equipment&quot;,
  &quot;categoryId&quot;: <span class="json-number">1</span>,
  &quot;unitId&quot;: <span class="json-number">1</span>,
  &quot;materialRate&quot;: <span class="json-number">500</span>,
  &quot;variations&quot;: [
    {
      &quot;colorId&quot;: <span class="json-number">1</span>,
      &quot;size&quot;: &quot;M&quot;,
      &quot;materialRate&quot;: <span class="json-number">550</span>
    },
    {
      &quot;colorId&quot;: <span class="json-number">2</span>,
      &quot;size&quot;: &quot;L&quot;,
      &quot;materialRate&quot;: <span class="json-number">600</span>
    }
  ]
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">201</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: <span class="json-number">2</span>,
    &quot;materialName&quot;: &quot;Heavy Equipment&quot;,
    &quot;materialRate&quot;: <span class="json-number">500</span>,
    &quot;categoryId&quot;: <span class="json-number">1</span>,
    &quot;unitId&quot;: <span class="json-number">1</span>,
    &quot;variations&quot;: [
      {
        &quot;id&quot;: <span class="json-number">1</span>,
        &quot;colorId&quot;: <span class="json-number">1</span>,
        &quot;size&quot;: &quot;M&quot;,
        &quot;materialRate&quot;: <span class="json-number">550</span>
      },
      {
        &quot;id&quot;: <span class="json-number">2</span>,
        &quot;colorId&quot;: <span class="json-number">2</span>,
        &quot;size&quot;: &quot;L&quot;,
        &quot;materialRate&quot;: <span class="json-number">600</span>
      }
    ]
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-8">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/products/:id</code>
        </div>
        <h3 class="endpoint-name">Get Product by ID</h3>
        <p class="endpoint-desc">Retrieves a single product by its primary key, including all active variations.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
          <div class="section-label">Parameters</div>
          <table class="params-table">
            <thead>
              <tr><th>Name</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              
                <tr>
                  <td><code>id</code></td>
                  <td><span class="type-tag">number</span></td>
                  <td>Unique identifier of the product</td>
                </tr>
              
            </tbody>
          </table>
        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/products/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: <span class="json-number">1</span>,
    &quot;materialName&quot;: &quot;Cotton Roll&quot;,
    &quot;materialRate&quot;: <span class="json-number">500</span>,
    &quot;categoryId&quot;: <span class="json-number">1</span>,
    &quot;unitId&quot;: <span class="json-number">1</span>,
    &quot;variations&quot;: [
      {
        &quot;id&quot;: <span class="json-number">1</span>,
        &quot;colorId&quot;: <span class="json-number">1</span>,
        &quot;colorName&quot;: &quot;Red&quot;,
        &quot;size&quot;: &quot;M&quot;,
        &quot;materialRate&quot;: <span class="json-number">550</span>
      }
    ]
  }
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-9">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#78350f;color:#fbbf24;border-color:#92400e">PUT</span>
          <code class="endpoint-path">/products/:id</code>
        </div>
        <h3 class="endpoint-name">Update Product</h3>
        <p class="endpoint-desc">Updates product fields and/or manages variations using a diff strategy. All fields are optional (partial update). Variations use matrixId to distinguish: present = update, absent = insert, isActive:false = soft-delete.</p>
        
        
      <div class="note-box">
        <span class="note-icon">💡</span>
        <div class="note-content">
          <strong>Developer Note:</strong> All fields optional. Variations diff: matrixId present → update, matrixId absent → insert new, matrixId + isActive:false → soft-delete. Product fields are merged with existing record to prevent undefined parameter errors.
        </div>
      </div>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X PUT &quot;{{base_url}}/products/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;materialRate&quot;:550,&quot;variations&quot;:[{&quot;matrixId&quot;:1,&quot;colorId&quot;:1,&quot;size&quot;:&quot;M&quot;,&quot;materialRate&quot;:560},{&quot;colorId&quot;:3,&quot;size&quot;:&quot;S&quot;,&quot;materialRate&quot;:480},{&quot;matrixId&quot;:2,&quot;isActive&quot;:false}]}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;materialRate&quot;: <span class="json-number">550</span>,
  &quot;variations&quot;: [
    {
      &quot;matrixId&quot;: <span class="json-number">1</span>,
      &quot;colorId&quot;: <span class="json-number">1</span>,
      &quot;size&quot;: &quot;M&quot;,
      &quot;materialRate&quot;: <span class="json-number">560</span>
    },
    {
      &quot;colorId&quot;: <span class="json-number">3</span>,
      &quot;size&quot;: &quot;S&quot;,
      &quot;materialRate&quot;: <span class="json-number">480</span>
    },
    {
      &quot;matrixId&quot;: <span class="json-number">2</span>,
      &quot;isActive&quot;: <span class="json-bool">false</span>
    }
  ]
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-10">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#7f1d1d;color:#f87171;border-color:#991b1b">DELETE</span>
          <code class="endpoint-path">/products/:id</code>
        </div>
        <h3 class="endpoint-name">Delete Product</h3>
        <p class="endpoint-desc">Soft-deletes a product from the catalog.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X DELETE &quot;{{base_url}}/products/:id&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">200</span></div>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-11">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#064e3b;color:#34d399;border-color:#065f46">GET</span>
          <code class="endpoint-path">/products/dropdown</code>
        </div>
        <h3 class="endpoint-name">Product Dropdown</h3>
        <p class="endpoint-desc">Combined product + category flat dropdown list for order forms.</p>
        
        
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X GET &quot;{{base_url}}/products/dropdown&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \</code></pre>
        
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">200</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: [
    {
      &quot;productId&quot;: <span class="json-number">1</span>,
      &quot;variationId&quot;: <span class="json-number">1</span>,
      &quot;materialName&quot;: &quot;Cotton Roll&quot;,
      &quot;colorName&quot;: &quot;Red&quot;,
      &quot;size&quot;: &quot;M&quot;,
      &quot;materialRate&quot;: <span class="json-number">550</span>,
      &quot;categoryName&quot;: &quot;Textiles&quot;,
      &quot;label&quot;: &quot;Cotton Roll — Red / M (Textiles)&quot;
    }
  ]
}</code></pre>
      </div>
      </div>
    </div>
    <div class="endpoint-card" id="ep-12">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:#1e3a5f;color:#60a5fa;border-color:#1e40af">POST</span>
          <code class="endpoint-path">/products/:id/matrix</code>
        </div>
        <h3 class="endpoint-name">Add/Update Product Color Matrix (Standalone)</h3>
        <p class="endpoint-desc">Standalone endpoint to add or update a single color/size pricing variation. Kept as a fallback for individual variation edits outside the product form.</p>
        
        
      <div class="note-box">
        <span class="note-icon">💡</span>
        <div class="note-content">
          <strong>Developer Note:</strong> Pass matrixId in body for updates. Omit matrixId for new entries. Prefer using the inline variations array on PUT /products/:id for batch operations.
        </div>
      </div>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">Bearer Token</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">ADMIN, OPERATOR</span>
            </div>
          </div>

        
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>curl -X POST &quot;{{base_url}}/products/:id/matrix&quot; \
  -H &quot;Authorization: Bearer {{authToken}}&quot; \
  -H &quot;Content-Type: application/json&quot; \
  -d '{&quot;fkLuColorId&quot;:1,&quot;materialRate&quot;:550,&quot;size&quot;:&quot;M&quot;}'</code></pre>
        
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>{
  &quot;fkLuColorId&quot;: <span class="json-number">1</span>,
  &quot;materialRate&quot;: <span class="json-number">550</span>,
  &quot;size&quot;: &quot;M&quot;
}</code></pre>
      </div>
        
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">201</span></div>
        <pre class="code-block"><code>{
  &quot;success&quot;: <span class="json-bool">true</span>,
  &quot;data&quot;: {
    &quot;id&quot;: <span class="json-number">3</span>,
    &quot;productId&quot;: <span class="json-number">1</span>,
    &quot;colorId&quot;: <span class="json-number">1</span>,
    &quot;materialRate&quot;: <span class="json-number">550</span>,
    &quot;size&quot;: &quot;M&quot;
  }
}</code></pre>
      </div>
      </div>
    </div>
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v1.0.0 — 2026-04-28
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>
````

## File: src/interfaces/http/controllers/product.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/product.controller.js
// Description: HTTP controllers mapping to Product service block.
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// ============================================================================

import asyncHandler from 'express-async-handler';
import productService from '../../../modules/product/product.service.js';

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Private/Admin,Operator
export const getProducts = asyncHandler(async (req, res) => {
  const categoryId = parseInt(req.query.categoryId) || 0;
  const unitId = parseInt(req.query.unitId) || 0;

  const products = await productService.getProducts(categoryId, unitId);
  
  res.status(200).json({
    success: true,
    data: products.data,
    meta: {
      total: products.total,
      categoryId,
      unitId
    }
  });
});

// @desc    Get product by ID
// @route   GET /api/v1/products/:id
// @access  Private/Admin,Operator
export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Admin,Operator
export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body, req.user.id);
  
  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin,Operator
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body, req.user.id);
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Get products + categories combined dropdown (search-friendly)
// @route   GET /api/v1/products/dropdown
// @access  Private/Admin,Operator
export const getProductDropdown = asyncHandler(async (req, res) => {
  const search = req.query.search || '';
  const items = await productService.getProductDropdown(search);

  res.status(200).json({
    success: true,
    data: items
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin,Operator
export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id, req.user.id);
  
  res.status(200).json({
    success: true,
    message: 'Product successfully removed'
  });
});

// @desc    Add or update a product color/size matrix variation
// @route   POST /api/v1/products/:id/matrix
// @access  Private/Admin,Operator
export const addProductMatrix = asyncHandler(async (req, res) => {
  const variation = await productService.addOrUpdateColorMatrix(
    parseInt(req.params.id),
    req.body,
    req.user.id
  );

  const status = req.body.matrixId ? 200 : 201;
  res.status(status).json({
    success: true,
    data: variation
  });
});

// @desc    Get all product categories
// @route   GET /api/v1/products/categories
// @access  Private/Admin,Operator
export const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await productService.getCategories();
  res.status(200).json({
    success: true,
    data: categories
  });
});

// @desc    Get all product units
// @route   GET /api/v1/products/units
// @access  Private/Admin,Operator
export const getProductUnits = asyncHandler(async (req, res) => {
  const units = await productService.getUnits();
  res.status(200).json({
    success: true,
    data: units
  });
});

// @desc    Create a new product category
// @route   POST /api/v1/products/categories
// @access  Private/Admin,Operator
export const createProductCategory = asyncHandler(async (req, res) => {
  const category = await productService.createCategory(req.body.categoryName, req.user.id);
  res.status(201).json({
    success: true,
    data: category
  });
});

// @desc    Get all product colors
// @route   GET /api/v1/products/colors
// @access  Private/Admin,Operator
export const getProductColors = asyncHandler(async (req, res) => {
  const colors = await productService.getColors();
  res.status(200).json({
    success: true,
    data: colors
  });
});

// @desc    Create a new product color
// @route   POST /api/v1/products/colors
// @access  Private/Admin,Operator
export const createProductColor = asyncHandler(async (req, res) => {
  const color = await productService.createColor(
    req.body.colorName, req.body.colorCode || '', req.user.id
  );
  res.status(201).json({
    success: true,
    data: color
  });
});

// @desc    Create a new unit
// @route   POST /api/v1/products/units
// @access  Private/Admin,Operator
export const createProductUnit = asyncHandler(async (req, res) => {
  const unit = await productService.createUnit(req.body.unitTitle, req.body.unitCode);
  res.status(201).json({
    success: true,
    data: unit
  });
});
````

## File: src/modules/courier/courier.repository.js
````javascript
// ============================================================================
// File: src/modules/courier/courier.repository.js
// Description: Data access layer for Courier Partners.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v1.md):
//   - Reads:   prc_courier_partner_master_get (pAction=0 list, pAction=1 specific)
//   - Upserts: prc_courier_partner_master_set (CourierId=0 insert, >0 update, IsActive=0 delete)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
let seedCouriers = [];

const initializeSeedData = () => {
  seedCouriers = [
    {
      CourierId: 1,
      CourierName: 'Delhivery',
      TrackingUrlTemplate: 'https://delhivery.com/track/{AWB}',
      IsActive: true,
      CreatedDate: new Date().toISOString()
    },
    {
      CourierId: 2,
      CourierName: 'BlueDart',
      TrackingUrlTemplate: 'https://bluedart.com/track/{AWB}',
      IsActive: true,
      CreatedDate: new Date().toISOString()
    }
  ];
};

initializeSeedData();

class CourierRepository {
  /**
   * Fetches a paginated list of courier partners with optional search.
   * Procedure: CALL prc_courier_partner_master_get(?, ?)
   * Convention: pAction=0 → list all, pCourierId=0 → no specific filter.
   * Pagination and search filtering are handled in-memory (master data table).
   *
   * @param {object} params - { page, limit, search }
   * @returns {Promise<object>} { data: [...], meta: { page, limit, totalRows, totalPages } }
   */
  async findAll({ page = 1, limit = 20, search } = {}) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_get (pAction=0, pCourierId=0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_get(?, ?)', [
        0, // pAction=0 → Get all couriers
        0  // pCourierId=0 → No specific courier filter
      ]);

      let results = rows[0] || [];

      // In-memory filter for search
      if (search) {
        const s = search.toLowerCase();
        results = results.filter(c =>
          c.CourierName?.toLowerCase().includes(s)
        );
      }

      const totalRows = results.length;
      const startIndex = (page - 1) * limit;
      const paginatedItems = results.slice(startIndex, startIndex + limit);

      return {
        data: paginatedItems,
        meta: { page: parseInt(page), limit: parseInt(limit), totalRows, totalPages: Math.ceil(totalRows / limit) }
      };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory filtering and pagination
    // ------------------------------------------------------------------
    const activeCouriers = seedCouriers.filter(c => c.IsActive);
    let results = [...activeCouriers];

    if (search) {
      const s = search.toLowerCase();
      results = results.filter(c =>
        c.CourierName.toLowerCase().includes(s)
      );
    }

    const totalRows = results.length;
    const startIndex = (page - 1) * limit;
    const paginatedItems = results.slice(startIndex, startIndex + limit);

    return {
      data: paginatedItems,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalRows,
        totalPages: Math.ceil(totalRows / limit)
      }
    };
  }

  /**
   * Fetches a courier partner by ID.
   * Procedure: CALL prc_courier_partner_master_get(?, ?)
   * Convention: pAction=1 → specific record.
   *
   * @param {number|string} id - CourierId.
   * @returns {Promise<object|null>} Courier record or null.
   */
  async findById(id) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_get (pAction=1)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_get(?, ?)', [1, id]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by CourierId
    // ------------------------------------------------------------------
    const courier = seedCouriers.find((c) => c.CourierId.toString() === id.toString() && c.IsActive);
    return courier || null;
  }

  /**
   * Checks if a courier name already exists (excluding a specific ID for updates).
   * Procedure: CALL prc_check_duplicate_courier_partner_master(?, ?)
   *
   * @param {number} id - Courier ID to exclude (0 for inserts)
   * @param {string} name - Courier name to check
   * @returns {Promise<number>} Count of duplicates found
   */
  async checkDuplicate(id, name) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_check_duplicate_courier_partner_master(?, ?)', [
        id || 0,
        name
      ]);
      return rows[0]?.[0]?.DuplicateCount || 0;
    }

    // MOCK MODE
    const duplicate = seedCouriers.find(
      c => c.CourierName.toLowerCase() === name.toLowerCase() && c.CourierId.toString() !== id?.toString() && c.IsActive
    );
    return duplicate ? 1 : 0;
  }

  /**
   * Creates a new courier partner.
   * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)
   * Convention: CourierId=0 triggers insert.
   *
   * @param {object} courierData - { courierName, trackingUrlTemplate }
   * @param {number|string} adminId - ID of the creating admin
   * @returns {Promise<object>} The newly created courier record.
   */
  async create(courierData, adminId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_set (CourierId=0 → Insert)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      // Use a dedicated connection so LAST_INSERT_ID() is reliable
      const connection = await db.getConnection();
      try {
        await connection.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)', [
          0, // CourierId=0 → Insert new courier
          courierData.courierName,
          courierData.trackingUrlTemplate || null,
          adminId || null,
          1  // IsActive=1
        ]);
        // SP may not SELECT after INSERT; re-fetch via LAST_INSERT_ID
        const [[idRow]] = await connection.execute('SELECT LAST_INSERT_ID() AS NewId');
        const newId = idRow?.NewId;
        return newId ? await this.findById(newId) : null;
      } finally {
        connection.release();
      }
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory push
    // ------------------------------------------------------------------
    const newId = seedCouriers.length > 0 ? Math.max(...seedCouriers.map(c => c.CourierId)) + 1 : 1;
    const newCourier = {
      CourierId: newId,
      CourierName: courierData.courierName,
      TrackingUrlTemplate: courierData.trackingUrlTemplate || null,
      IsActive: true,
      CreatedDate: new Date().toISOString()
    };

    seedCouriers.push(newCourier);
    return newCourier;
  }

  /**
   * Updates an existing courier partner.
   * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)
   * Convention: CourierId>0 triggers update.
   *
   * @param {number|string} id - CourierId.
   * @param {object} updates - Fields to update.
   * @param {number|string} adminId - ID of the updating admin
   * @returns {Promise<object|null>} Updated courier record or null.
   */
  async update(id, updates, adminId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_set (CourierId>0 → Update)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      // Fetch existing record to validate existence and preserve unchanged fields
      const existing = await this.findById(id);
      if (!existing) return null;

      await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)', [
        id, // CourierId>0 → Update existing courier
        updates.courierName ?? existing.CourierName,
        updates.trackingUrlTemplate ?? existing.TrackingUrlTemplate ?? null,
        adminId || null,
        updates.isActive !== undefined ? (updates.isActive ? 1 : 0) : 1
      ]);
      // Re-fetch to return the updated record (SP may not SELECT after UPDATE)
      return await this.findById(id);
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory update
    // ------------------------------------------------------------------
    const index = seedCouriers.findIndex(c => c.CourierId.toString() === id.toString() && c.IsActive);
    if (index === -1) return null;

    if (updates.courierName) seedCouriers[index].CourierName = updates.courierName;
    if (updates.trackingUrlTemplate) seedCouriers[index].TrackingUrlTemplate = updates.trackingUrlTemplate;

    return seedCouriers[index];
  }

  /**
   * Soft-deletes a courier partner (sets IsActive=0).
   * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)
   * Convention: Pass IsActive=0 for soft-delete.
   *
   * @param {number|string} id - CourierId.
   * @param {number|string} adminId - ID of the deleting admin
   * @returns {Promise<boolean>} True if deleted, false if not found.
   */
  async delete(id, adminId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_set (IsActive=0 → Soft Delete)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const existing = await this.findById(id);
      if (!existing) return false;

      const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)', [
        id,
        existing.CourierName,
        existing.TrackingUrlTemplate,
        adminId || null,
        0     // IsActive=0 → Soft delete
      ]);
      return true;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory soft delete
    // ------------------------------------------------------------------
    const index = seedCouriers.findIndex(c => c.CourierId.toString() === id.toString() && c.IsActive);
    if (index === -1) return false;

    seedCouriers[index].IsActive = false;
    return true;
  }
}

export default new CourierRepository();
````

## File: src/modules/parcel/parcel.repository.js
````javascript
// ============================================================================
// File: src/modules/parcel/parcel.repository.js
// Description: Data access layer for the Parcel module.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v2.md):
//   - prc_parcel_details_search: List and detail
//   - prc_parcel_details_search_by_qr: Lookup by QR
//   - prc_parcel_details_search_by_awb: Lookup by AWB
//   - prc_parcel_details_set: Upsert/Update state
//   - prc_receiver_status_details_search: Timeline/Browse events
//   - prc_receiver_status_details_set: Append-only log
// ============================================================================

import db from '../../infrastructure/database/db.js';

import {
  seedParcels,
  seedReceivers,
  seedParties,
  seedOrders,
  seedStatusLog,
} from './parcel.seed.js';

/**
 * ParcelRepository
 * 
 * INJECTION SITE:
 * This repository is the sole data access point for the Parcel module.
 * It interacts with the database via 'db' (MySQL2) using stored procedures
 * as defined in 'api_procedure_spec_v2.md'.
 * 
 * In MOCK mode, it uses local seeds from './parcel.seed.js'.
 */
class ParcelRepository {
  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Get all parcels with pagination and optional filtering.
   * Procedure: CALL prc_parcel_details_search(id, receiverId, courierId, statusId)
   * Passing 0 for unused filters.
   *
   * @param {object} filters - { page, limit, search, sortBy, sortOrder, status }
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async findAll(filters = {}) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // Note: prc_parcel_details_search in v2 spec takes (id, receiverId, courierId, statusId)
      // For listing with search/pagination, we might need a more specialized SP or handle in service.
      // The user request says: "Maps to CALL prc_parcel_details_search(id, ...) passing 0 for unused filters."
      const [rows] = await db.execute('CALL prc_parcel_details_search(?, ?, ?, ?)', [
        0, // pPkParcelDetailsId
        0, // pFkReceiverDetailsId
        0, // pFkCourierId
        filters.statusId || 0  // pFkParcelStatusId
      ]);
      
      // Handle pagination and search in JS if SP doesn't support it yet, 
      // but usually we prefer SP-side. For now, following user's mapping.
      let data = rows[0] || [];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        data = data.filter(p => 
          (p.QRCode && p.QRCode.toLowerCase().includes(q)) || 
          (p.TrackingNo && p.TrackingNo.toLowerCase().includes(q))
        );
      }

      const total = data.length;
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const start = (page - 1) * limit;
      const paginatedData = data.slice(start, start + limit);

      return { data: paginatedData, total };
    }

    // MOCK MODE
    const results = this._filterMockParcels(filters);
    const total = results.length;
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const start = (page - 1) * limit;
    const data = results.slice(start, start + limit).map(p => this._mapMockParcel(p));

    return { data, total };
  }

  /**
   * Get a single parcel by ID.
   * Procedure: CALL prc_parcel_details_search(id, 0, 0, 0)
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @returns {Promise<object|null>} Parcel detail, or null if not found.
   */
  async findById(id) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_search(?, ?, ?, ?)', [
        id, 0, 0, 0
      ]);
      return rows[0]?.[0] || null;
    }

    const parcel = seedParcels.find((p) => p.id === parseInt(id));
    return parcel ? this._mapMockParcel(parcel) : null;
  }

  /**
   * Find a parcel by its QR code (parcel_id).
   * Procedure: CALL prc_parcel_details_search_by_qr(?)
   *
   * @param {string} qrCode
   * @returns {Promise<object|null>}
   */
  async findByQR(qrCode) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_search_by_qr(?)', [qrCode]);
      return rows[0]?.[0] || null;
    }
    return seedParcels.find((p) => p.parcel_id === qrCode) || null;
  }

  /**
   * Find a parcel by its AWB number.
   * Procedure: CALL prc_parcel_details_search_by_awb(?)
   *
   * @param {string} awb
   * @returns {Promise<object|null>}
   */
  async findByAWB(awb) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_search_by_awb(?)', [awb]);
      return rows[0]?.[0] || null;
    }
    return seedParcels.find((p) => p.trackingNo === awb) || null;
  }

  /**
   * Get label data for a parcel.
   * Since there is no specific SP for label data in the user request, 
   * we use findById and map it in the service layer.
   *
   * @param {number|string} id
   * @returns {Promise<object|null>}
   */
  async getLabelData(id) {
    // In v2, findById should return enough info for label
    const parcel = await this.findById(id);
    if (!parcel) return null;

    // In LIVE mode, the search SP should join enough tables.
    // If not, we might need a separate SP, but following the "integrate inside existing" rule.
    return parcel;
  }

  /**
   * Get chronological timeline of events.
   * Procedure: CALL prc_receiver_status_details_search(0, receiverDetailsId, 0)
   *
   * @param {number} receiverDetailsId
   * @returns {Promise<Array>}
   */
  async getTimeline(receiverDetailsId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_receiver_status_details_search(?, ?, ?)', [
        0, receiverDetailsId, 0
      ]);
      return rows[0] || [];
    }

    return seedStatusLog
      .filter((log) => log.fkReceiverDetailsId === parseInt(receiverDetailsId))
      .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
  }

  // ============================================================================
  // WRITE OPERATIONS
  // ============================================================================

  /**
   * Update parcel state.
   * Procedure: CALL prc_parcel_details_set(triggerType, parcelId, 0, awbNumber, courierId, adminId)
   *
   * @param {number} parcelId
   * @param {number} triggerType - 1=PRINT, 2=SCAN, 3=DISPATCH, 4=DELIVERED, 5=RETURNED
   * @param {string|null} awbNumber
   * @param {number|null} courierId
   * @param {string} adminId - EmployeeCode
   * @returns {Promise<object>}
   */
  async updateParcelState(parcelId, triggerType, awbNumber, courierId, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?, ?, ?, ?)', [
        triggerType,
        parcelId,
        0, // pFkReceiverDetailsId (usually 0 if updating existing)
        awbNumber || null,
        courierId || 0,
        adminId
      ]);
      return rows[0]?.[0] || null;
    }

    // MOCK MODE
    const index = seedParcels.findIndex((p) => p.id === parseInt(parcelId));
    if (index === -1) return null;

    const parcel = seedParcels[index];
    const previousStatus = parcel.parcelStatusCode;

    let actionType = 'STATUS_UPDATE';

    switch (triggerType) {
      case 1: // PRINT_LABEL
        parcel.labelPrintCount += 1;
        parcel.parcelStatusCode = 'LABEL_PRINTED';
        break;
      case 2: // SCAN_LINK_AWB
        parcel.trackingNo = awbNumber;
        parcel.parcelStatusCode = 'AWB_LINKED';
        actionType = 'AWB_LINK';
        break;
      case 3: // DISPATCH
        parcel.parcelStatusCode = 'DISPATCHED';
        parcel.dispatchDate = new Date();
        break;
      case 4: // DELIVERED
        parcel.parcelStatusCode = 'DELIVERED';
        break;
      case 5: // RETURNED
        parcel.parcelStatusCode = 'RETURNED';
        break;
    }

    // Mock mode auto-logging
    seedStatusLog.push({
      id: seedStatusLog.length + 1,
      fkParcelDetailsId: parseInt(parcelId),
      fkReceiverDetailsId: parseInt(parcel.fkReceiverDetailsId),
      actionType,
      awbNumber: awbNumber || null,
      createdBy: adminId,
      createdDate: new Date()
    });

    return { ...parcel, previousStatus };
  }

  /**
   * Log event to receiver_status_details.
   * Procedure: CALL prc_receiver_status_details_set(parcelId, receiverId, actionType, awbNumber, adminId)
   *
   * @param {number} parcelId
   * @param {number} receiverDetailsId
   * @param {string} actionType - QR_SCAN, AWB_LINK, STATUS_UPDATE, RELINK_AWB
   * @param {string|null} awbNumber
   * @param {string} adminId - EmployeeCode
   */
  async logEvent(parcelId, receiverDetailsId, actionType, awbNumber, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      await db.execute('CALL prc_receiver_status_details_set(?, ?, ?, ?, ?)', [
        parcelId,
        receiverDetailsId,
        actionType,
        awbNumber || null,
        adminId
      ]);
      return;
    }

    // MOCK MODE
    seedStatusLog.push({
      id: seedStatusLog.length + 1,
      fkParcelDetailsId: parseInt(parcelId),
      fkReceiverDetailsId: parseInt(receiverDetailsId),
      actionType,
      awbNumber: awbNumber || null,
      createdBy: adminId,
      createdDate: new Date()
    });
  }

  /**
   * Browse system-wide events.
   * Procedure: CALL prc_receiver_status_details_search(0, 0, 0)
   * (Optionally filtering if SP supports more params)
   */
  async browseEvents(filters = {}) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_receiver_status_details_search(?, ?, ?)', [
        0, 0, 0
      ]);
      
      let data = rows[0] || [];
      // Manual filtering for now if SP is limited
      if (filters.actionType) data = data.filter(e => e.ActionType === filters.actionType);
      
      const total = data.length;
      const page = filters.page || 1;
      const limit = filters.limit || 50;
      const start = (page - 1) * limit;
      const paginatedData = data.slice(start, start + limit);

      return { data: paginatedData, total };
    }

    // MOCK MODE
    let filtered = [...seedStatusLog];
    if (filters.actionType) {
      filtered = filtered.filter((e) => e.actionType === filters.actionType);
    }
    const total = filtered.length;
    const page = filters.page || 1;
    const limit = filters.limit || 50;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    return { data, total };
  }

  // ============================================================================
  // INTERNAL MOCK HELPERS
  // ============================================================================

  /**
   * Internal mapper to enrich mock parcel data with receiver/order info.
   * @private
   */
  _mapMockParcel(parcel) {
    const receiver = seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId);
    const order = receiver ? seedOrders.find((o) => o.id === receiver.fkOrderId) : null;

    return {
      ...parcel,
      parcelId: parcel.parcel_id,
      status: parcel.parcelStatusCode,
      receiverName: receiver?.receiverName || null,
      receiverPhone: receiver?.receiverPhone || null,
      address: receiver?.address || null,
      city: receiver?.city || null,
      state: receiver?.state || null,
      pincode: receiver?.pincode || null,
      orderCode: order?.orderCode || null,
      orderId: order?.id || null
    };
  }

  /**
   * Internal helper to filter mock parcels.
   * @private
   */
  _filterMockParcels(filters) {
    let filtered = [...seedParcels];
    if (filters.status) {
      filtered = filtered.filter((p) => p.parcelStatusCode === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.parcel_id.toLowerCase().includes(q) ||
          (p.trackingNo && p.trackingNo.toLowerCase().includes(q))
      );
    }
    return filtered;
  }
}

export default new ParcelRepository();
````

## File: test_data/Parcel_Test_Data.txt
````
==================================================
PARCELS RETRIEVAL AND LABEL DATA — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: List Parcels ---
Method: GET
URL: /api/v1/parcels
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR, COURIER

Expected Status: 200

--- TEST 2: Get Parcel by ID ---
Method: GET
URL: /api/v1/parcels/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR, COURIER

Expected Status: 200

--- TEST 3: Get Label Data ---
Method: GET
URL: /api/v1/parcels/:id/label-data
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 4: Get Timeline ---
Method: GET
URL: /api/v1/parcels/:id/timeline
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR, COURIER

Expected Status: 200
````

## File: test_data/Sender_Test_Data.txt
````
==================================================
SENDERS — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: List Senders ---
Method: GET
URL: /api/v1/senders
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 2: Create Sender ---
Method: POST
URL: /api/v1/senders
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "customerName": "John Doe Enterprises",
  "phoneNo": "9876543210",
  "emailId": "john.doe@example.com",
  "address": "123 Business Park, Sector 62",
  "city": "Noida",
  "state": "Uttar Pradesh",
  "pincode": "201301"
}

Expected Status: 201

--- TEST 3: Get Sender by ID ---
Method: GET
URL: /api/v1/senders/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 4: Lookup by Phone ---
Method: GET
URL: /api/v1/senders/lookup?phone=9876543210
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 5: Get All Sender Names ---
Method: GET
URL: /api/v1/senders/names
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 6: Get All Sender Phones ---
Method: GET
URL: /api/v1/senders/phones
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 7: Lookup by Name ---
Method: GET
URL: /api/v1/senders/lookup-by-name?name=John
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 8: Update Sender ---
Method: PUT
URL: /api/v1/senders/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "customerName": "John Doe Enterprises Updated",
  "city": "Gurugram",
  "state": "Haryana"
}

Expected Status: 200

--- TEST 9: Delete Sender ---
Method: DELETE
URL: /api/v1/senders/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 10: Get Addresses ---
Method: GET
URL: /api/v1/senders/:id/addresses
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 11: Create Address ---
Method: POST
URL: /api/v1/senders/:id/addresses
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "address": "456 New Location",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001"
}

Expected Status: 201
````

## File: .gitignore
````
# Node modules
node_modules/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env

# Build outputs
build/
dist/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# React Native
.expo/
.expo-shared/

# Coverage
coverage/

#Agents/ LLM
Agents.md
API_Contract.md
Database_Procedures_Requirements.md
Systemflow.md
sdcms-server.xml
.codex
antigravity-output/
````

## File: src/interfaces/http/controllers/sender.controller.js
````javascript
// ============================================================================
// File: src/interfaces/http/controllers/sender.controller.js
// Description: HTTP Controller for Senders (Parties) and Address Book.
//
// [INJECTION SITE] Controller Dependencies:
// - senderService: Encapsulates business logic and uniqueness constraints.
// - express-async-handler: Automates global error catching for async routes.
// ============================================================================

import asyncHandler from 'express-async-handler';
import senderService from '../../../modules/sender/sender.service.js';

/**
 * Controller for managing Senders and Party Address Book entries.
 */
class SenderController {
  /**
   * @route GET /api/v1/senders
   * @desc  Retrieves all active senders.
   */
  getSenders = asyncHandler(async (req, res) => {
    const senders = await senderService.getSenders();
    res.json({ success: true, data: senders });
  });

  /**
   * @route GET /api/v1/senders/:id
   * @desc  Retrieves a specific sender by ID.
   */
  getSenderById = asyncHandler(async (req, res) => {
    const sender = await senderService.getSenderById(req.params.id);
    res.json({ success: true, data: sender });
  });

  /**
   * @route POST /api/v1/senders
   * @desc  Creates a new sender (PartyTypeId=1).
   */
  createSender = asyncHandler(async (req, res) => {
    const sender = await senderService.createSender(req.body, req.user);
    res.status(201).json({ success: true, data: sender });
  });

  /**
   * @route PUT /api/v1/senders/:id
   * @desc  Updates an existing sender.
   */
  updateSender = asyncHandler(async (req, res) => {
    const sender = await senderService.updateSender(req.params.id, req.body, req.user);
    res.json({ success: true, data: sender });
  });

  /**
   * @route DELETE /api/v1/senders/:id
   * @desc  Soft-deletes a sender.
   */
  deleteSender = asyncHandler(async (req, res) => {
    await senderService.deleteSender(req.params.id, req.user);
    res.json({ success: true, message: 'Sender deleted successfully' });
  });

  /**
   * @route GET /api/v1/senders/lookup?phone=...
   * @desc  Finds a sender by phone number for form auto-fill.
   */
  lookupByPhone = asyncHandler(async (req, res) => {
    const sender = await senderService.lookupByPhone(req.query.phone, 1);
    res.json({ success: true, data: sender });
  });

  /**
   * @route GET /api/v1/senders/names
   * @desc  Autocomplete for distinct sender names.
   */
  getAllNames = asyncHandler(async (req, res) => {
    const names = await senderService.getAllSenderNames(1);
    res.json({ success: true, data: names });
  });

  /**
   * @route GET /api/v1/senders/phones
   * @desc  Autocomplete for distinct sender phone numbers.
   */
  getAllPhones = asyncHandler(async (req, res) => {
    const phones = await senderService.getAllPhoneNumbers(1);
    res.json({ success: true, data: phones });
  });

  /**
   * @route GET /api/v1/senders/lookup-by-name?name=...
   * @desc  Partial name search for party suggestions.
   */
  lookupByName = asyncHandler(async (req, res) => {
    const parties = await senderService.lookupByName(req.query.name, 1);
    res.json({ success: true, data: parties });
  });

  /**
   * @route GET /api/v1/senders/:id/addresses
   * @desc  Retrieves secondary addresses from the Address Book.
   */
  getAddresses = asyncHandler(async (req, res) => {
    const addresses = await senderService.getAddressesByPartyId(req.params.id);
    res.json({ success: true, data: addresses });
  });

  /**
   * @route POST /api/v1/senders/:id/addresses
   * @desc  Adds a new secondary address to a sender's profile.
   */
  createAddress = asyncHandler(async (req, res) => {
    const address = await senderService.createAddress(req.params.id, req.body, req.user);
    res.status(201).json({ success: true, data: address });
  });
}

const senderControllerInstance = new SenderController();
export default senderControllerInstance;

// Named exports to support both import styles
export const {
  getSenders, getSenderById, createSender, updateSender, deleteSender,
  lookupByPhone, getAllNames, getAllPhones, lookupByName, getAddresses, createAddress
} = senderControllerInstance;
````

## File: src/modules/employee/employee.service.js
````javascript
// ============================================================================
// File: src/modules/employee/employee.service.js
// Description: Business logic layer for Employee Management.
// Validates data and connects controllers to the repository.
//
// Dual-Mode Mapping: Handles both mock field names and DB column names.
//   - Mock:  { FullName, EmailAddress, RoleCode, AllowLogin, EmployeeCode }
//   - DB SP: { FullName, EmailAddress, RoleCode, AllowLogin, EmployeeCode }
//   - API:   { employeeName, email, roleCode, allowLogin, employeeCode }
// ============================================================================

import bcrypt from 'bcryptjs';
import employeeRepository from './employee.repository.js';

class EmployeeService {

  /**
   * Internal mapper to format DB/mock results for the API layer.
   * Handles both DB column names and legacy mock field names gracefully.
   *
   * @param {object} employee - Raw employee record from repository.
   * @returns {object|null} API-formatted employee object.
   */
  _mapToApi(employee) {
    if (!employee) return null;
    return {
      employeeCode: employee.EmployeeCode || employee.employeeCode,
      name: employee.FullName || employee.name,
      email: employee.EmailAddress || employee.email,
      phoneNo: employee.ContactNumber || employee.contactNumber || null,
      role: employee.RoleCode || employee.role,
      allowLogin: employee.AllowLogin ?? employee.allowLogin,
      isActive: employee.IsActive ?? employee.isActive,
      createdAt: employee.CreatedDate || employee.createdAt
    };
  }

  /**
   * Internal mapper to format API payloads for the Repository layer.
   * Translates API field names to DB-native column names.
   *
   * @param {object} apiData - API payload.
   * @returns {object} Repository-formatted object.
   */
  _mapToInternal(apiData) {
    const internal = {};
    if (apiData.name) internal.FullName = apiData.name;
    if (apiData.email) internal.EmailAddress = apiData.email;
    if (apiData.password) internal.Password = apiData.password;
    if (apiData.role) internal.RoleCode = apiData.role;
    if (apiData.phoneNo) internal.ContactNumber = apiData.phoneNo;
    if (apiData.allowLogin !== undefined) internal.AllowLogin = apiData.allowLogin;
    if (apiData.isActive !== undefined) internal.IsActive = apiData.isActive;
    
    // Map role string to DB FkRoleId
    if (apiData.role) {
      const roleMap = { 'ADMIN': 1, 'OPERATOR': 2, 'COURIER': 3 };
      internal.FkRoleId = roleMap[apiData.role];
    }
    
    return internal;
  }

  /**
   * Get all employees (paginated + filtered)
   */
  async getEmployees(queryParams) {
    // Pass query rules (search, limits) to the repository
    const result = await employeeRepository.findAll(queryParams);
    return {
      ...result,
      data: result.data.map(e => this._mapToApi(e))
    };
  }

  /**
   * Get an employee by ID
   */
  async getEmployeeById(id) {
    const employee = await employeeRepository.findById(id);
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(employee);
  }

  /**
   * Create a new employee
   * Business Rules: Email must be unique. Password must be hashed.
   */
  async createEmployee(employeeData) {
    const internalData = this._mapToInternal(employeeData);

    // 1. Check if email already exists
    const isDuplicate = await employeeRepository.checkDuplicate(
      0, 
      internalData.EmailAddress || internalData.email, 
      internalData.UserName || internalData.EmailAddress || internalData.email
    );
    if (isDuplicate) {
      const error = new Error('An employee with this email or username already exists');
      error.statusCode = 409;
      throw error;
    }

    // 2. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(internalData.Password || internalData.password, salt);

    // 3. Save via repository
    const newEmployee = await employeeRepository.create({
      ...internalData,
      Password: hashedPassword
    });

    return this._mapToApi(newEmployee);
  }

  /**
   * Update an existing employee
   */
  async updateEmployee(id, employeeData) {
    const existingEmployee = await employeeRepository.findById(id);
    if (!existingEmployee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }

    const updates = this._mapToInternal(employeeData);

    // Check for duplicate email/username
    if (updates.EmailAddress || updates.UserName) {
      const isDuplicate = await employeeRepository.checkDuplicate(
        id, 
        updates.EmailAddress || existingEmployee.EmailAddress, 
        updates.UserName || existingEmployee.UserName
      );
      if (isDuplicate) {
        const error = new Error('An employee with this email or username already exists');
        error.statusCode = 409;
        throw error;
      }
    }

    // If password is included in updates, hash it
    if (updates.Password) {
      const salt = await bcrypt.genSalt(10);
      updates.Password = await bcrypt.hash(updates.Password, salt);
    }

    const updatedEmployee = await employeeRepository.update(id, updates);
    return this._mapToApi(updatedEmployee);
  }

  /**
   * Enable or disable an employee's login access
   */
  async toggleAccess(adminId, employeeIdToToggle, allowLogin) {
    // Business Rule: Admins cannot disable their own account
    if (adminId.toString() === employeeIdToToggle.toString() && allowLogin === false) {
      const error = new Error('Cannot disable your own account');
      error.statusCode = 400;
      throw error;
    }

    const employee = await employeeRepository.patchAccess(employeeIdToToggle, allowLogin);
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }

    return this._mapToApi(employee);
  }
}

export default new EmployeeService();
````

## File: src/modules/parcel/parcel.service.js
````javascript
// ============================================================================
// File: src/modules/parcel/parcel.service.js
// Description: Business logic layer for the Parcel module.
// Enforces the strict parcel status flow:
//   Created → Label Printed → AWB Linked → Dispatched → Delivered
// and terminal states (Cancelled, Returned).
// ============================================================================

import parcelRepository from './parcel.repository.js';

// Status constants mapping (from lu_details/system flow)
const STATUS = {
  PENDING: 'PENDING',
  LABEL_PRINTED: 'LABEL_PRINTED',
  AWB_LINKED: 'AWB_LINKED',
  DISPATCHED: 'DISPATCHED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED'
};

// Valid transitions (v2.2 System Flow)
const VALID_TRANSITIONS = {
  [STATUS.PENDING]:       [STATUS.LABEL_PRINTED, STATUS.CANCELLED],
  [STATUS.LABEL_PRINTED]: [STATUS.AWB_LINKED, STATUS.DISPATCHED, STATUS.CANCELLED],
  [STATUS.AWB_LINKED]:    [STATUS.DISPATCHED, STATUS.CANCELLED],
  [STATUS.DISPATCHED]:    [STATUS.DELIVERED, STATUS.RETURNED],
  [STATUS.DELIVERED]:     [STATUS.RETURNED],
  [STATUS.CANCELLED]:     [],
  [STATUS.RETURNED]:      []
};

/**
 * ParcelService
 * 
 * INJECTION SITE:
 * This service depends on 'parcelRepository' for all data persistence and SP execution.
 * All business logic relating to the Parcel lifecycle (v2.2) is orchestrated here.
 * 
 * Rules Enforced:
 * - Order = Planning, Parcel = Execution.
 * - Strict state machine transitions.
 * - Atomic Scan/Link flow with role-based auto-dispatch.
 */
class ParcelService {
  // ============================================================================
  // INTERNAL MAPPERS
  // ============================================================================

  _mapParcel(parcel) {
    if (!parcel) return null;
    return {
      id: parcel.PkParcelDetailsId || parcel.id,
      parcelId: parcel.QRCode || parcel.parcelId || parcel.parcel_id,
      trackingNo: parcel.TrackingNo || parcel.trackingNo,
      status: parcel.StatusDescription || parcel.status || parcel.parcelStatusCode || STATUS.PENDING,
      labelPrintCount: parcel.LabelPrintCount !== undefined ? parcel.LabelPrintCount : parcel.labelPrintCount,
      dispatchDate: parcel.DispatchDate || parcel.dispatchDate,
      receiverName: parcel.ReceiverName || parcel.receiverName,
      receiverPhone: parcel.ReceiverPhone || parcel.receiverPhone,
      address: parcel.Address || parcel.address,
      city: parcel.City || parcel.city,
      state: parcel.State || parcel.state,
      pincode: parcel.Pincode || parcel.pincode,
      orderCode: parcel.OrderCode || parcel.orderCode,
      orderId: parcel.FkOrderId || parcel.orderId,
      receiverDetailsId: parcel.FkReceiverDetailsId || parcel.fkReceiverDetailsId,
      createdAt: parcel.CreatedDate || parcel.createdAt
    };
  }

  _mapEvent(event) {
    if (!event) return null;
    return {
      id: event.PkReceiverStatusDetailsId || event.id,
      parcelId: event.QRCode || event.parcelId,
      orderCode: event.OrderCode || event.orderCode,
      actionType: event.ActionType || event.actionType,
      awbNumber: event.AwbNumber || event.awbNumber,
      previousStatus: event.PreviousStatus || event.previousStatus,
      newStatus: event.StatusDescription || event.newStatus,
      scannedBy: event.CreatedBy || event.scannedBy,
      timestamp: event.CreatedDate || event.timestamp
    };
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  async getParcelList(filters) {
    const { data, total } = await parcelRepository.findAll(filters);
    return { data: data.map(p => this._mapParcel(p)), total };
  }

  async getParcelDetails(id) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapParcel(parcel);
  }

  async getLabelData(id) {
    const data = await parcelRepository.getLabelData(id);
    if (!data) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapParcel(data);
  }

  async getTimeline(id) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    const receiverId = parcel.FkReceiverDetailsId || parcel.fkReceiverDetailsId;
    const timeline = await parcelRepository.getTimeline(receiverId);
    return timeline.map(e => this._mapEvent(e));
  }

  // ============================================================================
  // WRITE OPERATIONS
  // ============================================================================

  async logLabelPrint(id, user) {
    const parcel = await this.getParcelDetails(id);
    const employeeCode = user?.employeeCode || 'SYSTEM';

    // State validation
    const allowed = [STATUS.PENDING, STATUS.LABEL_PRINTED];
    if (!allowed.includes(parcel.status)) {
      const error = new Error(`Cannot print label in '${parcel.status}' state`);
      error.statusCode = 400;
      throw error;
    }

    // Update State (Trigger 1 = PRINT_LABEL)
    const result = await parcelRepository.updateParcelState(id, 1, null, 0, employeeCode);

    return this._mapParcel(result);
  }

  /**
   * QR scan + AWB link atomic two-scan flow (API Contract §10).
   * Orchestrates finding, duplicate checks, and state transitions.
   * 
   * Rule: COURIER role triggers automatic dispatch.
   *
   * @param {object} payload - { qrCode, awbNumber }
   * @param {object} user - Authenticated user.
   * @returns {Promise<object>} Updated parcel.
   */
  async scanAndLinkAWB(payload, user) {
    try {
      const { qrCode, awbNumber } = payload;
      const employeeCode = user?.employeeCode || 'SYSTEM';
      const role = user?.role || 'OPERATOR';

      // 1. Find and Validate Parcel
      const parcel = await this._getAndValidateForLinking(qrCode);

      // 2. Check for Duplicate AWB
      await this._ensureUniqueAWB(awbNumber);

      // 3. Perform linking based on role (Auto-dispatch for Couriers)
      const result = await this._executeLinkingFlow(parcel, awbNumber, role, employeeCode);

      return this._mapParcel(result);
    } catch (error) {
      // Service layer error handling (AGENTS.md §3D)
      throw error;
    }
  }

  async dispatchParcels(parcelIds, user) {
    const employeeCode = user?.employeeCode || 'SYSTEM';
    const dispatched = [];

    for (const id of parcelIds) {
      const parcel = await this.getParcelDetails(id);
      
      if (parcel.status !== STATUS.AWB_LINKED) {
        const error = new Error(`Parcel ${parcel.parcelId} cannot be dispatched (Status: ${parcel.status})`);
        error.statusCode = 400;
        throw error;
      }

      const result = await parcelRepository.updateParcelState(id, 3, parcel.trackingNo, 0, employeeCode);
      dispatched.push(this._mapParcel(result));
    }

    return { dispatched: dispatched.length, parcels: dispatched };
  }

  async deliverParcel(id, user) {
    return await this._transition(id, 4, STATUS.DELIVERED, user);
  }

  async returnParcel(id, user) {
    return await this._transition(id, 5, STATUS.RETURNED, user);
  }

  // ============================================================================
  // BROWSE EVENTS
  // ============================================================================

  async browseEvents(filters) {
    const { data, total } = await parcelRepository.browseEvents(filters);
    return { data: data.map(e => this._mapEvent(e)), total };
  }

  // ============================================================================
  // INTERNAL HELPERS
  // ============================================================================

  async _transition(id, triggerType, targetStatus, user) {
    const parcel = await this.getParcelDetails(id);
    const employeeCode = user?.employeeCode || 'SYSTEM';

    const allowed = VALID_TRANSITIONS[parcel.status] || [];
    if (!allowed.includes(targetStatus)) {
      const error = new Error(`Invalid transition: ${parcel.status} -> ${targetStatus}`);
      error.statusCode = 400;
      throw error;
    }

    const result = await parcelRepository.updateParcelState(id, triggerType, parcel.trackingNo, 0, employeeCode);
    
    return this._mapParcel(result);
  }

  /**
   * Internal helper to find and validate a parcel for the linking flow.
   * @private
   */
  async _getAndValidateForLinking(qrCode) {
    const parcelRaw = await parcelRepository.findByQR(qrCode);
    if (!parcelRaw) {
      const error = new Error(`Parcel not found for QR: ${qrCode}`);
      error.statusCode = 404;
      throw error;
    }
    const parcel = this._mapParcel(parcelRaw);
    if (parcel.status !== STATUS.LABEL_PRINTED) {
      const error = new Error(`Cannot link AWB: parcel is '${parcel.status}', must be '${STATUS.LABEL_PRINTED}'`);
      error.statusCode = 400;
      throw error;
    }
    return parcel;
  }

  /**
   * Internal helper to ensure AWB is not already in use.
   * @private
   */
  async _ensureUniqueAWB(awbNumber) {
    const existingAWB = await parcelRepository.findByAWB(awbNumber);
    if (existingAWB) {
      const error = new Error(`AWB '${awbNumber}' is already linked to another parcel`);
      error.statusCode = 409;
      throw error;
    }
  }

  /**
   * Internal helper to execute the linking database updates.
   * @private
   */
  async _executeLinkingFlow(parcel, awbNumber, role, employeeCode) {
    if (role === 'COURIER') {
      // Auto-dispatch for couriers (Trigger 3)
      return await parcelRepository.updateParcelState(parcel.id, 3, awbNumber, 0, employeeCode);
    } 
    
    // Normal linking (Trigger 2)
    return await parcelRepository.updateParcelState(parcel.id, 2, awbNumber, 0, employeeCode);
  }
}

export default new ParcelService();
````

## File: src/modules/product/product.service.js
````javascript
// ============================================================================
// File: src/modules/product/product.service.js
// Description: Business logic layer for Products Master.
//
// Clean Code Principles:
//   - Implicit Mapping: Mappers decouple API from DB schemas.
//   - Validation: Duplicate checks happen before repository calls.
//   - Consistency: camelCase API contract vs PascalCase DB/Internal.
// ============================================================================

import productRepository from './product.repository.js';

class ProductService {

  // --------------------------------------------------------------------------
  // 1. DATA MAPPERS (API ↔ INTERNAL)
  // --------------------------------------------------------------------------

  /**
   * Translates DB/Internal record to API-friendly camelCase object.
   * @param {object} product - Raw DB record.
   * @returns {object|null} API object.
   */
  _mapToApi(product) {
    if (!product) return null;
    return {
      id: product.PkProductId || product.id,
      materialName: product.MaterialName || product.materialName,
      materialRate: product.MaterialRate || product.materialRate,
      cuItemCode: product.cu_item_code || product.cuItemCode || null,
      materialDescription: product.MaterialDescription || product.materialDescription || product.description || null,
      categoryId: product.FkProductCategoryId || product.categoryId || null,
      unitId: product.FkUnitId || product.unitId || null,
      categoryName: product.CategoryName || null,
      unitTitle: product.UnitTitle || null,
      isActive: product.IsActive !== undefined ? product.IsActive : product.isActive,
      createdAt: product.CreatedDate || product.createdAt
    };
  }

  /**
   * Translates API payload to DB-native PascalCase object.
   * @param {object} apiData - Payload from request.
   * @returns {object} DB-friendly object.
   */
  _mapToInternal(apiData) {
    const internal = {};
    if (apiData.materialName) internal.MaterialName = apiData.materialName;
    if (apiData.materialRate !== undefined) internal.MaterialRate = apiData.materialRate;
    if (apiData.cuItemCode) internal.cu_item_code = apiData.cuItemCode;
    if (apiData.materialDescription) internal.MaterialDescription = apiData.materialDescription;
    if (apiData.categoryId) internal.FkProductCategoryId = apiData.categoryId;
    if (apiData.unitId) internal.FkUnitId = apiData.unitId;
    return internal;
  }

  /**
   * Translates a color matrix DB record to API-friendly camelCase.
   * @param {object} row - Raw color matrix record.
   * @returns {object} API-friendly matrix entry.
   */
  _mapMatrixToApi(row) {
    if (!row) return null;
    return {
      id: row.PkProductColorId || row.id,
      productId: row.FkProductId || row.productId,
      colorId: row.FkLuColorId || row.colorId,
      colorName: row.ColorName || row.colorName || null,
      materialRate: row.MaterialRate || row.materialRate,
      size: row.Size || row.size,
      isActive: row.IsActive !== undefined ? row.IsActive : row.isActive,
      createdAt: row.CreatedDate || row.createdAt
    };
  }

  /**
   * Translates color matrix API payload to DB-native PascalCase.
   * @param {object} apiData - { fkLuColorId, materialRate, size }.
   * @returns {object} DB-friendly object.
   */
  _mapMatrixToInternal(apiData) {
    const internal = {};
    if (apiData.fkLuColorId !== undefined) internal.FkLuColorId = apiData.fkLuColorId;
    if (apiData.materialRate !== undefined) internal.MaterialRate = apiData.materialRate;
    if (apiData.size !== undefined) internal.Size = apiData.size;
    return internal;
  }

  /**
   * Translates a raw product_category DB record to API-friendly camelCase.
   * @param {object} cat - Raw category record.
   * @returns {object} API object { id, categoryName }.
   */
  _mapCategoryToApi(cat) {
    if (!cat) return null;
    return {
      id: cat.PkProductCategoryId || cat.id,
      categoryName: cat.CategoryName || cat.categoryName
    };
  }

  /**
   * Translates a raw lu_unit DB record to API-friendly camelCase.
   * @param {object} unit - Raw unit record.
   * @returns {object} API object { id, unitTitle, unitCode }.
   */
  _mapUnitToApi(unit) {
    if (!unit) return null;
    return {
      id: unit.PkUnitId || unit.id,
      unitTitle: unit.UnitTitle || unit.unitTitle,
      unitCode: unit.UnitCode || unit.unitCode
    };
  }

  /**
   * Translates a raw lu_color_code DB record to API-friendly camelCase.
   * @param {object} color - Raw color record.
   * @returns {object} API object { id, colorName, colorCode }.
   */
  _mapColorToApi(color) {
    if (!color) return null;
    return {
      id: color.PkLuColorId || color.id,
      colorName: color.ColorName || color.colorName,
      colorCode: color.ColorCode || color.colorCode || null
    };
  }

  // --------------------------------------------------------------------------
  // 2. RETRIEVAL METHODS
  // --------------------------------------------------------------------------

  /**
   * Retrieves all products with optional filters.
   */
  async getProducts(categoryId = 0, unitId = 0) {
    const data = await productRepository.findAll(categoryId, unitId);
    return {
      data: data.map(p => this._mapToApi(p)),
      total: data.length
    };
  }

  /**
   * Retrieves a specific product by ID.
   */
  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    const mapped = this._mapToApi(product);
    mapped.variations = (product.variations || []).map(v => this._mapMatrixToApi(v));
    return mapped;
  }

  /**
   * Fetches search-friendly dropdown items.
   */
  async getProductDropdown(search = '') {
    const items = await productRepository.getDropdown(search);
    return items.map(item => {
      const labelParts = [item.MaterialName];
      if (item.ColorName || item.Size) {
        const specs = [item.ColorName, item.Size].filter(Boolean).join(' / ');
        labelParts.push(`— ${specs}`);
      }
      if (item.CategoryName) {
        labelParts.push(`(${item.CategoryName})`);
      }
      
      return {
        productId: item.PkProductId,
        variationId: item.PkProductColorId || null,
        materialName: item.MaterialName,
        colorName: item.ColorName,
        size: item.Size,
        materialRate: item.MaterialRate,
        cuItemCode: item.cu_item_code,
        categoryName: item.CategoryName,
        unitTitle: item.UnitTitle,
        label: labelParts.join(' ')
      };
    });
  }

  /**
   * Retrieves all product categories mapped to camelCase.
   * @returns {Promise<Array>} List of { id, categoryName } objects.
   */
  async getCategories() {
    const raw = await productRepository.getCategories();
    return raw.map(c => this._mapCategoryToApi(c));
  }

  /**
   * Retrieves all product units mapped to camelCase.
   * @returns {Promise<Array>} List of { id, unitTitle, unitCode } objects.
   */
  async getUnits() {
    const raw = await productRepository.getUnits();
    return raw.map(u => this._mapUnitToApi(u));
  }

  /**
   * Retrieves all active colors mapped to camelCase.
   * @returns {Promise<Array>} List of { id, colorName, colorCode } objects.
   */
  async getColors() {
    const raw = await productRepository.getColors();
    return raw.map(c => this._mapColorToApi(c));
  }

  /**
   * Creates a new product category.
   * @param {string} categoryName - Name of the category.
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object>} API-friendly category object.
   */
  async createCategory(categoryName, adminId) {
    const result = await productRepository.createCategory(categoryName, adminId);
    if (!result) {
      // Re-fetch by name as fallback (SP may not return the inserted row)
      const all = await productRepository.getCategories();
      const created = all.find(c => (c.CategoryName || '').toLowerCase() === categoryName.toLowerCase());
      return this._mapCategoryToApi(created);
    }
    return this._mapCategoryToApi(result);
  }

  /**
   * Creates a new color lookup entry.
   * @param {string} colorName - Display name of the color.
   * @param {string} colorCode - Short code (e.g., 'RED').
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object>} API-friendly color object.
   */
  async createColor(colorName, colorCode, adminId) {
    const result = await productRepository.createColor(colorName, colorCode, adminId);
    if (!result) {
      // Re-fetch by name as fallback (SP may not return the inserted row)
      const all = await productRepository.getColors();
      const created = all.find(c => (c.ColorName || '').toLowerCase() === colorName.toLowerCase());
      return this._mapColorToApi(created);
    }
    return this._mapColorToApi(result);
  }

  /**
   * Creates a new unit lookup entry.
   * @param {string} unitTitle - Display name (e.g., 'Kilogram').
   * @param {string} unitCode - Short code (e.g., 'KG').
   * @returns {Promise<object>} API-friendly unit object.
   */
  async createUnit(unitTitle, unitCode) {
    const result = await productRepository.createUnit(unitTitle, unitCode);
    if (!result) {
      // Re-fetch by code as fallback (SP may not return the inserted row)
      const all = await productRepository.getUnits();
      const created = all.find(u => (u.UnitCode || '').toLowerCase() === unitCode.toLowerCase());
      return this._mapUnitToApi(created);
    }
    return this._mapUnitToApi(result);
  }

  // --------------------------------------------------------------------------
  // 3. MUTATION METHODS
  // --------------------------------------------------------------------------

  /**
   * Creates a new product with uniqueness validation and optional inline variations.
   * @param {object} productData - API payload { materialName, categoryId, unitId, materialRate?, variations?[] }.
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object>} API-friendly product with variations.
   */
  async createProduct(productData, adminId) {
    const internalData = this._mapToInternal(productData);

    // Auto-generate MaterialCode / cu_item_code
    if (!internalData.cu_item_code) {
      const nextCode = await productRepository.getNextItemCode();
      internalData.cu_item_code = nextCode.padStart(4, '0');
      internalData.MaterialCode = internalData.cu_item_code;
    } else {
      internalData.MaterialCode = internalData.cu_item_code;
    }

    // Business Rule: Prevent duplicate products in the same category/unit
    const duplicateCount = await productRepository.checkDuplicate(
      0,
      internalData.FkProductCategoryId,
      internalData.FkUnitId,
      internalData.MaterialName
    );

    if (duplicateCount > 0) {
      const error = new Error('A product with this name already exists in the selected category/unit.');
      error.statusCode = 409;
      throw error;
    }

    let newProduct = await productRepository.create(internalData, adminId);

    // Re-fetch fallback if SP returned null or incomplete data
    const insertedId = newProduct?.InsertedId || newProduct?.PkProductId || newProduct?.id;
    if (insertedId) {
      newProduct = await productRepository.findById(insertedId) || newProduct;
    } else if (!newProduct || (!newProduct.PkProductId && !newProduct.id)) {
      const searchRes = await productRepository.findAll(0, 0);
      newProduct = searchRes.find(p => p.cu_item_code === internalData.cu_item_code) || newProduct;
    }

    const productId = newProduct?.PkProductId || newProduct?.id;

    // Process inline variations if provided
    const variations = await this._processCreateVariations(
      productData.variations || [], productId, adminId
    );

    const mapped = this._mapToApi(newProduct);
    mapped.variations = variations;
    return mapped;
  }

  /**
   * Updates product details with uniqueness validation and optional variation diff.
   * Merges partial updates with existing DB record to prevent undefined SP params.
   * @param {number|string} id - PkProductId.
   * @param {object} updates - API payload (all fields optional).
   * @param {number} adminId - User ID.
   * @returns {Promise<object>} API-friendly product with variations.
   */
  async updateProduct(id, updates, adminId) {
    const existing = await this.getProductById(id);
    const internalUpdates = this._mapToInternal(updates);

    // Merge partial updates with existing record to prevent undefined SP params
    const merged = {
      MaterialName: internalUpdates.MaterialName ?? existing.materialName,
      MaterialRate: internalUpdates.MaterialRate ?? existing.materialRate,
      FkProductCategoryId: internalUpdates.FkProductCategoryId ?? existing.categoryId,
      FkUnitId: internalUpdates.FkUnitId ?? existing.unitId,
      MaterialCode: internalUpdates.MaterialCode ?? existing.cuItemCode,
      cu_item_code: internalUpdates.cu_item_code ?? existing.cuItemCode,
      MaterialDescription: internalUpdates.MaterialDescription ?? existing.materialDescription
    };

    // Business Rule: Check for name collision upon update
    const duplicateCount = await productRepository.checkDuplicate(
      id, merged.FkProductCategoryId, merged.FkUnitId, merged.MaterialName
    );
    if (duplicateCount > 0) {
      const error = new Error('Another product already uses this name in the selected category/unit.');
      error.statusCode = 409;
      throw error;
    }

    let updatedProduct = await productRepository.update(id, merged, adminId);

    // Re-fetch fallback
    if (!updatedProduct || (!updatedProduct.PkProductId && !updatedProduct.id)) {
      updatedProduct = await productRepository.findById(id) || updatedProduct;
    }

    // Process inline variation diff if provided
    if (Array.isArray(updates.variations)) {
      await this._processUpdateVariations(updates.variations, id, adminId);
    }

    // Re-fetch full product with variations for response
    const full = await this.getProductById(id);
    return full;
  }

  /**
   * Processes inline variations for product creation (all inserts).
   * @param {Array} variations - Array of { colorId, size, materialRate }.
   * @param {number} productId - Newly created product PK.
   * @param {number} adminId - User ID.
   * @returns {Promise<Array>} API-friendly variation records.
   */
  async _processCreateVariations(variations, productId, adminId) {
    const results = [];
    for (const v of variations) {
      const internalData = {
        FkLuColorId: v.colorId,
        MaterialRate: v.materialRate,
        Size: v.size
      };
      const result = await productRepository.setColorMatrix(
        0, productId, internalData, adminId, 1
      );
      results.push(this._mapMatrixToApi(result));
    }
    return results;
  }

  /**
   * Processes inline variation diff for product updates.
   * Diff strategy:
   *   - matrixId present + isActive:false → soft-delete
   *   - matrixId present → update existing
   *   - matrixId absent/0 → insert new
   * @param {Array} variations - Array of variation diff items.
   * @param {number} productId - Product PK.
   * @param {number} adminId - User ID.
   */
  async _processUpdateVariations(variations, productId, adminId) {
    for (const v of variations) {
      const matrixId = v.matrixId || 0;
      const isActive = v.isActive === false ? 0 : 1;

      if (matrixId > 0 && isActive === 0) {
        // Soft-delete: fetch existing to fill required SP params
        const existingVariations = await productRepository.getColorMatrix(productId);
        const existing = existingVariations.find(
          row => row.PkProductColorId === matrixId
        );
        if (existing) {
          await productRepository.setColorMatrix(matrixId, productId, {
            FkLuColorId: existing.FkLuColorId,
            MaterialRate: existing.MaterialRate,
            Size: existing.Size
          }, adminId, 0);
        }
      } else {
        // Insert or update
        const internalData = {
          FkLuColorId: v.colorId,
          MaterialRate: v.materialRate,
          Size: v.size
        };
        await productRepository.setColorMatrix(
          matrixId, productId, internalData, adminId, isActive
        );
      }
    }
  }

  /**
   * Adds or updates a color/size matrix entry for a product.
   * @param {number} productId - Product PK.
   * @param {object} matrixData - { fkLuColorId, materialRate, size, matrixId? }.
   * @param {number} adminId - User ID.
   * @returns {Promise<object>} API-friendly matrix record.
   */
  async addOrUpdateColorMatrix(productId, matrixData, adminId) {
    // Verify the product exists first
    await this.getProductById(productId);

    const internalData = this._mapMatrixToInternal(matrixData);
    const matrixId = matrixData.matrixId || 0;
    const result = await productRepository.setColorMatrix(
      matrixId, productId, internalData, adminId
    );
    return this._mapMatrixToApi(result);
  }

  /**
   * Soft-deletes a product.
   */
  async deleteProduct(id, adminId) {
    const success = await productRepository.delete(id, adminId);
    if (!success) {
      const error = new Error('Product not found or deletion failed.');
      error.statusCode = 404;
      throw error;
    }
    return true;
  }
}

export default new ProductService();
````

## File: test_data/Order_Test_Data.txt
````
==================================================
ORDER PIPELINE — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: List Orders ---
Method: GET
URL: /api/v1/orders?page=1&limit=20
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR, COURIER

Expected Status: 200

--- TEST 2: Create Order — Mode B (Sender → Receivers) ---
Method: POST
URL: /api/v1/orders
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "senderName": "Ramesh Textiles",
  "senderMobile": "9876543210",
  "senderAddress": "14, Gandhi Nagar, Surat",
  "courierId": 1,
  "receivers": [
    {
      "receiverName": "Delhi Fabrics Ltd.",
      "receiverPhone": "9123456780",
      "address": "45, Karol Bagh",
      "city": "New Delhi",
      "state": "Delhi",
      "pincode": "110005",
      "products": [
        {
          "productId": 1,
          "qty": 5,
          "unitPrice": 420
        }
      ]
    }
  ]
}

Expected Status: 201

--- TEST 3: Create Order — Mode A (Sender-to-Self) ---
Method: POST
URL: /api/v1/orders
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "senderName": "Ramesh Textiles",
  "senderMobile": "9876543210",
  "senderAddress": "14, Gandhi Nagar",
  "courierId": 1,
  "products": [
    {
      "productId": 1,
      "qty": 10,
      "unitPrice": 500
    }
  ]
}

Expected Status: 201

--- TEST 4: Get Order Aggregate ---
Method: GET
URL: /api/v1/orders/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR, COURIER

Expected Status: 200

--- TEST 5: Update Order ---
Method: PUT
URL: /api/v1/orders/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "senderName": "Ramesh Textiles Updated",
  "courierId": 2
}

Expected Status: 200

--- TEST 6: Cancel Order ---
Method: PATCH
URL: /api/v1/orders/:id/cancel
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200
````

## File: test_data/Product_Test_Data.txt
````
==================================================
PRODUCT CATALOG — Test Data
Generated from api-manifest.yaml
==================================================

--- TEST 1: Get Categories ---
Method: GET
URL: /api/v1/products/categories
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 2: Create Category ---
Method: POST
URL: /api/v1/products/categories
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "categoryName": "Electronics"
}

Expected Status: 201

--- TEST 3: Get Units ---
Method: GET
URL: /api/v1/products/units
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 4: Create Unit ---
Method: POST
URL: /api/v1/products/units
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "unitTitle": "Meter",
  "unitCode": "MTR"
}

Expected Status: 201

--- TEST 5: Get Colors ---
Method: GET
URL: /api/v1/products/colors
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 6: Create Color ---
Method: POST
URL: /api/v1/products/colors
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "colorName": "Crimson",
  "colorCode": "CRM"
}

Expected Status: 201

--- TEST 7: List Products ---
Method: GET
URL: /api/v1/products
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 8: Create Product ---
Method: POST
URL: /api/v1/products
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "materialName": "Heavy Equipment",
  "categoryId": 1,
  "unitId": 1,
  "materialRate": 500,
  "variations": [
    {
      "colorId": 1,
      "size": "M",
      "materialRate": 550
    },
    {
      "colorId": 2,
      "size": "L",
      "materialRate": 600
    }
  ]
}

Expected Status: 201

--- TEST 9: Get Product by ID ---
Method: GET
URL: /api/v1/products/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 10: Update Product ---
Method: PUT
URL: /api/v1/products/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "materialRate": 550,
  "variations": [
    {
      "matrixId": 1,
      "colorId": 1,
      "size": "M",
      "materialRate": 560
    },
    {
      "colorId": 3,
      "size": "S",
      "materialRate": 480
    },
    {
      "matrixId": 2,
      "isActive": false
    }
  ]
}

Expected Status: 200

--- TEST 11: Delete Product ---
Method: DELETE
URL: /api/v1/products/:id
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 12: Product Dropdown ---
Method: GET
URL: /api/v1/products/dropdown
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR

Expected Status: 200

--- TEST 13: Add/Update Product Color Matrix (Standalone) ---
Method: POST
URL: /api/v1/products/:id/matrix
Auth: Bearer <TOKEN>
Roles: ADMIN, OPERATOR
Headers:
  Content-Type: application/json

Body:
{
  "fkLuColorId": 1,
  "materialRate": 550,
  "size": "M"
}

Expected Status: 201
````

## File: scripts/api-manifest.yaml
````yaml
# ============================================================================
# SDCMS Backend — API Manifest (Source of Truth for Doc Generation)
# Run: node scripts/generate-api-docs.js
# ============================================================================
info:
  title: SDCMS Backend API
  version: "1.0.0"
  baseUrl: "{{base_url}}"

collections:
  # ========== 1. AUTHENTICATION ==========
  - name: Authentication
    slug: authentication
    description: Auth endpoints for login and user profile
    guide: "To authenticate, use the Login endpoint to receive a JWT token. This token must be included in the 'Authorization' header as 'Bearer <token>' for all protected routes. Frontend devs should store this in localStorage or a secure cookie."
    endpoints:
      - name: Login
        method: POST
        path: /auth/login
        auth: none
        roles: [ALL]
        description: Authenticates a user and provides a JWT token.
        notes: "If the login is successful, you'll receive an object containing the user's profile and the token. If the account is locked (allowLogin: false), you will get a 403 error."
        headers: { Content-Type: application/json }
        body: |
          { "email": "admin@example.com", "password": "securePass123" }
        responseStatus: 200
        responseBody: |
          { "success": true, "data": { "id": "EMP-001", "employeeCode": "EMP-001", "name": "Admin User", "email": "admin@example.com", "role": "ADMIN", "token": "eyJhbG..." } }
        assertions:
          - "res.status equals 200"
          - "res.body.success is true"
          - "Store res.body.data.token as {{authToken}}"

      - name: Get Profile
        method: GET
        path: /auth/profile
        roles: [ALL]
        description: Retrieves the authenticated user's profile and permissions.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": { "employeeCode": "EMP-001", "firstName": "Admin User", "email": "admin@example.com", "phoneNo": "9876543210", "roleCode": "ADMIN", "allowLogin": true, "createdAt": "2026-04-20T10:00:00Z" } }
        assertions:
          - "res.status equals 200"
          - "res.body.success is true"
          - "res.body.data contains employeeCode, roleCode"

      - name: System Health
        method: GET
        path: /system/health
        auth: none
        roles: [ALL]
        description: Checks database connectivity and system status.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": { "status": "UP", "dbConnected": true } }
        assertions:
          - "res.status equals 200"
          - "res.body.data.status equals UP"

  # ========== 2. PRODUCT CATALOG ==========
  - name: Product Catalog
    slug: product-catalog
    description: Product CRUD with inline variations, lookup CRUD (categories, colors, units), and dropdown endpoints
    guide: "The product form has two sections: (1) Product details — name, category, unit; (2) Variations table — each row has color, size, rate. Categories, colors, and units can be created on the fly from dropdowns. Create/Update Product accepts an optional 'variations' array for atomic product + variation management."
    endpoints:
      # --- Lookup Endpoints ---
      - name: Get Categories
        method: GET
        path: /products/categories
        roles: [ADMIN, OPERATOR]
        description: Retrieves all active product categories for dropdown.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "id": 1, "categoryName": "Textiles" }, { "id": 2, "categoryName": "Accessories" }] }
        assertions:
          - "res.status equals 200"
          - "res.body.data is Array"

      - name: Create Category
        method: POST
        path: /products/categories
        roles: [ADMIN, OPERATOR]
        description: Creates a new product category (used when user selects 'Create New' in the dropdown).
        headers: { Content-Type: application/json }
        body: |
          { "categoryName": "Electronics" }
        responseStatus: 201
        responseBody: |
          { "success": true, "data": { "id": 3, "categoryName": "Electronics" } }
        assertions:
          - "res.status equals 201"
          - "res.body.data.categoryName equals Electronics"

      - name: Get Units
        method: GET
        path: /products/units
        roles: [ADMIN, OPERATOR]
        description: Retrieves all active units for dropdown.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "id": 1, "unitTitle": "Kilogram", "unitCode": "KG" }] }
        assertions:
          - "res.status equals 200"
          - "res.body.data is Array"

      - name: Create Unit
        method: POST
        path: /products/units
        roles: [ADMIN, OPERATOR]
        description: Creates a new unit lookup entry (used when user selects 'Create New' in the dropdown).
        headers: { Content-Type: application/json }
        body: |
          { "unitTitle": "Meter", "unitCode": "MTR" }
        responseStatus: 201
        responseBody: |
          { "success": true, "data": { "id": 4, "unitTitle": "Meter", "unitCode": "MTR" } }
        assertions:
          - "res.status equals 201"
          - "res.body.data.unitCode equals MTR"

      - name: Get Colors
        method: GET
        path: /products/colors
        roles: [ADMIN, OPERATOR]
        description: Retrieves all active color lookup entries for dropdown.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "id": 1, "colorName": "Red", "colorCode": "RED" }] }
        assertions:
          - "res.status equals 200"
          - "res.body.data is Array"

      - name: Create Color
        method: POST
        path: /products/colors
        roles: [ADMIN, OPERATOR]
        description: Creates a new color lookup entry (used when user selects 'Create New' in the dropdown).
        headers: { Content-Type: application/json }
        body: |
          { "colorName": "Crimson", "colorCode": "CRM" }
        responseStatus: 201
        responseBody: |
          { "success": true, "data": { "id": 4, "colorName": "Crimson", "colorCode": "CRM" } }
        notes: "colorCode is optional and defaults to an empty string if not provided."
        assertions:
          - "res.status equals 201"
          - "res.body.data.colorName equals Crimson"

      # --- Product CRUD ---
      - name: List Products
        method: GET
        path: /products
        roles: [ADMIN, OPERATOR]
        description: Retrieves products filtered by categoryId or unitId.
        parameters:
          categoryId: { type: 'number', description: 'Filter by category primary key' }
          unitId: { type: 'number', description: 'Filter by unit primary key' }
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "id": 1, "materialName": "Cotton Roll", "materialRate": 500, "categoryName": "Textiles" }] }
        assertions:
          - "res.status equals 200"
          - "res.body.data is Array"

      - name: Create Product
        method: POST
        path: /products
        roles: [ADMIN, OPERATOR]
        description: Creates a new product with optional inline variations. categoryId and unitId are required. materialRate defaults to 0 if omitted (pricing is primarily per-variation).
        headers: { Content-Type: application/json }
        body: |
          { "materialName": "Heavy Equipment", "categoryId": 1, "unitId": 1, "materialRate": 500, "variations": [{ "colorId": 1, "size": "M", "materialRate": 550 }, { "colorId": 2, "size": "L", "materialRate": 600 }] }
        responseStatus: 201
        responseBody: |
          { "success": true, "data": { "id": 2, "materialName": "Heavy Equipment", "materialRate": 500, "categoryId": 1, "unitId": 1, "variations": [{ "id": 1, "colorId": 1, "size": "M", "materialRate": 550 }, { "id": 2, "colorId": 2, "size": "L", "materialRate": 600 }] } }
        notes: "categoryId and unitId are required. materialRate is optional (defaults to 0). The variations array is optional — omit it to create a product without variations."
        assertions:
          - "res.status equals 201"
          - "res.body.success is true"
          - "res.body.data.variations is Array"

      - name: Get Product by ID
        method: GET
        path: /products/:id
        roles: [ADMIN, OPERATOR]
        description: Retrieves a single product by its primary key, including all active variations.
        parameters:
          id: { type: 'number', description: 'Unique identifier of the product' }
        responseStatus: 200
        responseBody: |
          { "success": true, "data": { "id": 1, "materialName": "Cotton Roll", "materialRate": 500, "categoryId": 1, "unitId": 1, "variations": [{ "id": 1, "colorId": 1, "colorName": "Red", "size": "M", "materialRate": 550 }] } }

      - name: Update Product
        method: PUT
        path: /products/:id
        roles: [ADMIN, OPERATOR]
        description: "Updates product fields and/or manages variations using a diff strategy. All fields are optional (partial update). Variations use matrixId to distinguish: present = update, absent = insert, isActive:false = soft-delete."
        headers: { Content-Type: application/json }
        body: |
          { "materialRate": 550, "variations": [{ "matrixId": 1, "colorId": 1, "size": "M", "materialRate": 560 }, { "colorId": 3, "size": "S", "materialRate": 480 }, { "matrixId": 2, "isActive": false }] }
        responseStatus: 200
        notes: "All fields optional. Variations diff: matrixId present → update, matrixId absent → insert new, matrixId + isActive:false → soft-delete. Product fields are merged with existing record to prevent undefined parameter errors."
        assertions:
          - "res.status equals 200"
          - "res.body.success is true"

      - name: Delete Product
        method: DELETE
        path: /products/:id
        roles: [ADMIN, OPERATOR]
        description: Soft-deletes a product from the catalog.
        responseStatus: 200

      - name: Product Dropdown
        method: GET
        path: /products/dropdown
        roles: [ADMIN, OPERATOR]
        description: Combined product + category flat dropdown list for order forms.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "productId": 1, "variationId": 1, "materialName": "Cotton Roll", "colorName": "Red", "size": "M", "materialRate": 550, "categoryName": "Textiles", "label": "Cotton Roll — Red / M (Textiles)" }] }
        assertions:
          - "res.status equals 200"
          - "res.body.data is Array"

      - name: Add/Update Product Color Matrix (Standalone)
        method: POST
        path: /products/:id/matrix
        roles: [ADMIN, OPERATOR]
        description: Standalone endpoint to add or update a single color/size pricing variation. Kept as a fallback for individual variation edits outside the product form.
        headers: { Content-Type: application/json }
        body: |
          { "fkLuColorId": 1, "materialRate": 550, "size": "M" }
        responseStatus: 201
        responseBody: |
          { "success": true, "data": { "id": 3, "productId": 1, "colorId": 1, "materialRate": 550, "size": "M" } }
        notes: "Pass matrixId in body for updates. Omit matrixId for new entries. Prefer using the inline variations array on PUT /products/:id for batch operations."
        assertions:
          - "res.status equals 201"
          - "res.body.data.materialRate equals 550"

  # ========== 3. EMPLOYEE MANAGEMENT ==========
  - name: Employee Management (ADMIN)
    slug: employee-management
    description: Employee CRUD and access control (ADMIN only)
    endpoints:
      - name: List Employees
        method: GET
        path: /employees
        roles: [ADMIN]
        description: Retrieves all employees.
        responseStatus: 200

      - name: Create Employee
        method: POST
        path: /employees
        roles: [ADMIN]
        description: Creates a new employee account.
        headers: { Content-Type: application/json }
        body: |
          { "name": "New Emp", "role": "OPERATOR", "email": "newemp@example.com", "password": "Test123456" }
        responseStatus: 201

      - name: Get Employee by ID
        method: GET
        path: /employees/:id
        roles: [ADMIN]
        description: Retrieves a single employee by ID.
        responseStatus: 200

      - name: Update Employee
        method: PUT
        path: /employees/:id
        roles: [ADMIN]
        description: Updates employee details.
        headers: { Content-Type: application/json }
        body: |
          { "name": "Updated Name" }
        responseStatus: 200

      - name: Toggle Employee Access
        method: PATCH
        path: /employees/:id/toggle-access
        roles: [ADMIN]
        description: Enables or disables an employee's login access.
        headers: { Content-Type: application/json }
        body: |
          { "allowLogin": true }
        responseStatus: 200

  # ========== 4. COURIER PARTNERS ==========
  - name: Courier Partners
    slug: courier-partners
    description: Courier partner CRUD operations
    endpoints:
      - name: List Couriers
        method: GET
        path: /courier-partners
        roles: [ADMIN, OPERATOR, COURIER]
        description: Retrieves all courier partners.
        responseStatus: 200

      - name: Create Courier
        method: POST
        path: /courier-partners
        roles: [ADMIN, OPERATOR]
        description: Registers a new courier partner.
        headers: { Content-Type: application/json }
        body: |
          { "courierName": "TestCourier Express", "trackingUrlTemplate": "https://track.testcourier.com/awb/{AWB}" }
        responseStatus: 201

      - name: Get Courier by ID
        method: GET
        path: /courier-partners/:id
        roles: [ADMIN, OPERATOR, COURIER]
        description: Retrieves a courier partner by ID.
        responseStatus: 200

      - name: Update Courier
        method: PUT
        path: /courier-partners/:id
        roles: [ADMIN, OPERATOR]
        description: Updates courier partner details.
        headers: { Content-Type: application/json }
        body: |
          { "courierName": "Updated Courier" }
        responseStatus: 200

      - name: Delete Courier
        method: DELETE
        path: /courier-partners/:id
        roles: [ADMIN, OPERATOR]
        description: Removes a courier partner.
        responseStatus: 200

  # ========== 5. SENDERS ==========
  - name: Senders
    slug: senders
    description: Sender (Party) CRUD, lookup, and address book
    endpoints:
      - name: List Senders
        method: GET
        path: /senders
        roles: [ADMIN, OPERATOR]
        description: Retrieves all active sender entities.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "id": 1, "customerName": "John Doe", "phoneNo": "9876543210", "emailId": "john.doe@example.com", "isActive": true }] }

      - name: Create Sender
        method: POST
        path: /senders
        roles: [ADMIN, OPERATOR]
        description: Registers a new sender with contact and address info.
        headers: { Content-Type: application/json }
        body: |
          { "customerName": "John Doe Enterprises", "phoneNo": "9876543210", "emailId": "john.doe@example.com", "address": "123 Business Park, Sector 62", "city": "Noida", "state": "Uttar Pradesh", "pincode": "201301" }
        responseStatus: 201

      - name: Get Sender by ID
        method: GET
        path: /senders/:id
        roles: [ADMIN, OPERATOR]
        description: Retrieves a single sender profile.
        responseStatus: 200

      - name: Lookup by Phone
        method: GET
        path: /senders/lookup?phone=9876543210
        roles: [ADMIN, OPERATOR]
        description: Quick sender lookup by mobile number for auto-fill.
        responseStatus: 200

      - name: Get All Sender Names
        method: GET
        path: /senders/names
        roles: [ADMIN, OPERATOR]
        description: Distinct sender names for autocomplete dropdown.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": ["John Doe Enterprises", "Ramesh Textiles"] }

      - name: Get All Sender Phones
        method: GET
        path: /senders/phones
        roles: [ADMIN, OPERATOR]
        description: Distinct phone numbers for autocomplete dropdown.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": ["9876543210", "9000000001"] }

      - name: Lookup by Name
        method: GET
        path: /senders/lookup-by-name?name=John
        roles: [ADMIN, OPERATOR]
        description: Search senders by partial name match.
        responseStatus: 200

      - name: Update Sender
        method: PUT
        path: /senders/:id
        roles: [ADMIN, OPERATOR]
        description: Updates sender information (partial updates supported).
        headers: { Content-Type: application/json }
        body: |
          { "customerName": "John Doe Enterprises Updated", "city": "Gurugram", "state": "Haryana" }
        responseStatus: 200

      - name: Delete Sender
        method: DELETE
        path: /senders/:id
        roles: [ADMIN, OPERATOR]
        description: Soft-deletes a sender.
        responseStatus: 200

      - name: Get Addresses
        method: GET
        path: /senders/:id/addresses
        roles: [ADMIN, OPERATOR]
        description: Address book entries for a sender (dropdown).
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "id": 10, "partyId": 1, "partyName": "John Doe Enterprises", "phoneNo": "9876543210", "address": "123 Business Park", "city": "Noida", "state": "UP", "pincode": "201301", "isDefault": true }] }

      - name: Create Address
        method: POST
        path: /senders/:id/addresses
        roles: [ADMIN, OPERATOR]
        description: Adds a new address to a sender's address book.
        headers: { Content-Type: application/json }
        body: |
          { "address": "456 New Location", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001" }
        responseStatus: 201

  # ========== 6. RECEIVERS ==========
  - name: Receivers
    slug: receivers
    description: Receiver lookup and dropdown endpoints
    endpoints:
      - name: Get All Receiver Names
        method: GET
        path: /receivers/names
        roles: [ADMIN, OPERATOR]
        description: Distinct receiver names for autocomplete dropdown.
        responseStatus: 200

      - name: Get All Receiver Phones
        method: GET
        path: /receivers/phones
        roles: [ADMIN, OPERATOR]
        description: Distinct receiver phone numbers for autocomplete.
        responseStatus: 200

      - name: Lookup by Name
        method: GET
        path: /receivers/lookup-by-name?name=Receiver
        roles: [ADMIN, OPERATOR]
        description: Search receivers by partial name match.
        responseStatus: 200

  # ========== 7. ORDER PIPELINE ==========
  - name: Order Pipeline
    slug: order-pipeline
    description: Order CRUD with Mode A/B/C support
    guide: "Our system uses 3 creation modes: Mode A (Sender-to-Self), Mode B (Sender-to-Receivers), and Mode C (Combo). The backend automatically detects the mode based on whether 'products' (root) or 'receivers' (array) are provided. Testers should verify that each receiver correctly generates its own unique Parcel ID (PDS-XXX)."
    endpoints:
      - name: List Orders
        method: GET
        path: /orders?page=1&limit=20
        roles: [ADMIN, OPERATOR, COURIER]
        description: Paginated order list with derived status.
        parameters:
          page: { type: 'number', description: 'Current page number' }
          limit: { type: 'number', description: 'Number of items per page' }
          status: { type: 'string', description: 'Filter by derived status (PENDING, DISPATCHED, etc.)' }
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "id": 1, "orderCode": "ORD-2026-001", "senderName": "Ramesh Textiles", "senderMobile": "9876543210", "totalAmount": 2100.00, "derivedStatus": "PENDING", "createdAt": "2026-04-24T10:00:00Z" }], "meta": { "page": 1, "limit": 20, "totalRows": 1, "totalPages": 1 } }

      - name: "Create Order — Mode B (Sender → Receivers)"
        method: POST
        path: /orders
        roles: [ADMIN, OPERATOR]
        description: Creates an order with sender and multiple receivers. Each receiver generates a parcel.
        notes: "This is Mode B. Ensure each object in the 'receivers' array has its own 'products' array. The 'courierId' is mandatory to determine the shipping partner."
        headers: { Content-Type: application/json }
        body: |
          { "senderName": "Ramesh Textiles", "senderMobile": "9876543210", "senderAddress": "14, Gandhi Nagar, Surat", "courierId": 1, "receivers": [{ "receiverName": "Delhi Fabrics Ltd.", "receiverPhone": "9123456780", "address": "45, Karol Bagh", "city": "New Delhi", "state": "Delhi", "pincode": "110005", "products": [{ "productId": 1, "qty": 5, "unitPrice": 420.00 }] }] }
        responseStatus: 201
        assertions:
          - "res.status equals 201"
          - "Each receiver has a nested parcel with parcelId starting with PDS-"
          - "Parcel status is PENDING"
          - "Mode B detected: multiple receivers created"

      - name: "Create Order — Mode A (Sender-to-Self)"
        method: POST
        path: /orders
        roles: [ADMIN, OPERATOR]
        description: Sender-to-self order using top-level products array.
        headers: { Content-Type: application/json }
        body: |
          { "senderName": "Ramesh Textiles", "senderMobile": "9876543210", "senderAddress": "14, Gandhi Nagar", "courierId": 1, "products": [{ "productId": 1, "qty": 10, "unitPrice": 500.00 }] }
        responseStatus: 201

      - name: Get Order Aggregate
        method: GET
        path: /orders/:id
        roles: [ADMIN, OPERATOR, COURIER]
        description: Full order with nested receivers, items, and parcels.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": { "id": 1, "orderCode": "ORD-2026-001", "senderName": "Ramesh Textiles", "senderMobile": "9876543210", "totalAmount": 2100.00, "derivedStatus": "PENDING", "senderAddress": "14, Gandhi Nagar, Surat", "courierId": 1, "receivers": [{ "id": 1, "receiverName": "Delhi Fabrics Ltd.", "receiverPhone": "9123456780", "address": "45, Karol Bagh", "city": "New Delhi", "state": "Delhi", "pincode": "110005", "parcel": { "id": 1, "parcelId": "PDS-A1B2C3", "status": "PENDING" }, "products": [{ "productId": 1, "qty": 5, "unitPrice": 420.00 }] }] } }

      - name: Update Order
        method: PUT
        path: /orders/:id
        roles: [ADMIN, OPERATOR]
        description: Updates order details (blocked if any parcel >= AWB_LINKED).
        headers: { Content-Type: application/json }
        body: |
          { "senderName": "Ramesh Textiles Updated", "courierId": 2 }
        responseStatus: 200

      - name: Cancel Order
        method: PATCH
        path: /orders/:id/cancel
        roles: [ADMIN, OPERATOR]
        description: Cancels order and all non-dispatched parcels.
        responseStatus: 200

  # ========== 8. PARCELS RETRIEVAL ==========
  - name: Parcels Retrieval and Label Data
    slug: parcels-retrieval
    description: Parcel read operations, label data, and timeline
    endpoints:
      - name: List Parcels
        method: GET
        path: /parcels
        roles: [ADMIN, OPERATOR, COURIER]
        description: Paginated parcel list.
        parameters:
          page: { type: 'number', description: 'Page index' }
          limit: { type: 'number', description: 'Items per page' }
          orderCode: { type: 'string', description: 'Search by partial Order Code' }
          parcelId: { type: 'string', description: 'Search by QR code/Parcel ID' }
        responseStatus: 200

      - name: Get Parcel by ID
        method: GET
        path: /parcels/:id
        roles: [ADMIN, OPERATOR, COURIER]
        description: Single parcel details.
        parameters:
          id: { type: 'number', description: 'Unique identifier of the parcel' }
        responseStatus: 200
        responseBody: |
          { "success": true, "data": { "id": 1, "parcelId": "PDS-A1B2C3", "trackingNo": null, "status": "PENDING", "labelPrintCount": 0, "receiverName": "Delhi Fabrics Ltd.", "receiverPhone": "9123456780", "address": "45, Karol Bagh", "city": "New Delhi", "state": "Delhi", "pincode": "110005", "orderCode": "ORD-2026-001" } }

      - name: Get Label Data
        method: GET
        path: /parcels/:id/label-data
        roles: [ADMIN, OPERATOR]
        description: On-demand label generation data for printing.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": { "id": 1, "parcelId": "PDS-A1B2C3", "trackingNo": null, "status": "PENDING", "labelPrintCount": 0, "receiverName": "Delhi Fabrics Ltd.", "receiverPhone": "9123456780", "address": "45, Karol Bagh", "city": "New Delhi", "state": "Delhi", "pincode": "110005", "orderCode": "ORD-2026-001" } }

      - name: Get Timeline
        method: GET
        path: /parcels/:id/timeline
        roles: [ADMIN, OPERATOR, COURIER]
        description: Append-only event timeline for a parcel.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "id": 1, "parcelId": "PDS-A1B2C3", "orderCode": "ORD-2026-001", "actionType": "STATUS_UPDATE", "awbNumber": null, "previousStatus": "Created", "newStatus": "PENDING", "scannedBy": "EMP-001", "timestamp": "2026-04-24T10:05:00Z" }] }

  # ========== 9. LABEL PRINT LOGGING ==========
  - name: Label Print Logging
    slug: label-print
    description: Log label print events (PENDING → LABEL_PRINTED)
    endpoints:
      - name: Log Print
        method: POST
        path: /parcels/:id/log-print
        roles: [ADMIN, OPERATOR]
        description: Transitions parcel from PENDING to LABEL_PRINTED.
        responseStatus: 200
        assertions:
          - "res.body.data.status equals LABEL_PRINTED"

  # ========== 10. TWO SCAN OPERATIONS ==========
  - name: Two Scan Operations
    slug: scan-operations
    description: Atomic QR + AWB scanning flow
    endpoints:
      - name: Scan and Link AWB
        method: POST
        path: /parcels/scan
        roles: [ADMIN, OPERATOR, COURIER]
        description: "QR identifies parcel, AWB links shipment. OPERATOR → AWB_LINKED, COURIER → auto-DISPATCHED."
        notes: "This is an atomic operation. You must scan the QR code first to identify the parcel. If a user with the COURIER role performs this scan, the parcel is automatically moved to the DISPATCHED state, skipping the manual dispatch step."
        headers: { Content-Type: application/json }
        body: |
          { "qrCode": "PDS-A1B2C3", "awbNumber": "AWB-DTDC-001" }
        responseStatus: 200
        assertions:
          - "OPERATOR scan → status AWB_LINKED"
          - "COURIER scan → status DISPATCHED (auto-dispatch)"

  # ========== 11. DISPATCH AND TERMINAL STATES ==========
  - name: Dispatch and Terminal States
    slug: dispatch-terminal
    description: Dispatch, deliver, and return parcel operations
    endpoints:
      - name: Batch Dispatch
        method: POST
        path: /parcels/dispatch
        roles: [ADMIN, OPERATOR]
        description: Dispatches one or more AWB_LINKED parcels.
        headers: { Content-Type: application/json }
        body: |
          { "parcelIds": [1, 2, 3] }
        responseStatus: 200

      - name: Mark Delivered
        method: PATCH
        path: /parcels/:id/deliver
        roles: [ADMIN, OPERATOR]
        description: Terminal state — marks parcel as DELIVERED.
        responseStatus: 200

      - name: Mark Returned
        method: PATCH
        path: /parcels/:id/return
        roles: [ADMIN, OPERATOR]
        description: Terminal state — marks parcel as RETURNED.
        responseStatus: 200


  # ========== 12. PARCEL EVENTS ==========
  - name: Parcel Events & Audit Export
    slug: parcel-events
    description: Parcel event log and CSV export
    endpoints:
      - name: List Events
        method: GET
        path: /parcel-events
        roles: [ADMIN, OPERATOR]
        description: Paginated event log from receiver_status_details.
        responseStatus: 200
        responseBody: |
          { "success": true, "data": [{ "id": 1, "parcelId": "PDS-A1B2C3", "orderCode": "ORD-2026-001", "actionType": "AWB_LINK", "awbNumber": "AWB-DTDC-001", "previousStatus": "LABEL_PRINTED", "newStatus": "AWB_LINKED", "scannedBy": "EMP-001", "timestamp": "2026-04-24T12:00:00Z" }], "meta": { "totalRows": 50 } }

      - name: Export CSV
        method: GET
        path: /parcel-events/export
        roles: [ADMIN, OPERATOR]
        description: Downloads event log as CSV file.
        responseStatus: 200
        assertions:
          - "Content-Type is text/csv"
          - "Body contains EventID header"

  # ========== 13. DASHBOARD ==========
  - name: Dashboard
    slug: dashboard
    description: Admin-only dashboard metrics
    endpoints:
      - name: Get Metrics
        method: GET
        path: /dashboard/metrics
        roles: [ADMIN]
        description: Aggregated dashboard statistics.
        responseStatus: 200
        responseBody: |
          { 
            "success": true, 
            "data": { 
              "TotalOrders": 150, "PendingOrders": 45, "DispatchedOrders": 80, "DeliveredOrders": 25,
              "totalOrders": 150, // @deprecated
              "parcelsByStatus": { "PENDING": 45, "DISPATCHED": 80, "DELIVERED": 25 } // @deprecated
            } 
          }

  # ========== 14. BULK UPLOAD ==========
  - name: Bulk Upload
    slug: bulk-upload
    description: Batch order creation via array upload
    endpoints:
      - name: Create Bulk Session
        method: POST
        path: /bulk-uploads
        roles: [ADMIN, OPERATOR]
        description: Processes an array of orders in a single batch.
        headers: { Content-Type: application/json }
        body: |
          { "rows": [{ "senderName": "Bulk Sender", "senderMobile": "9000000099", "courierId": 1, "receivers": [{ "receiverName": "Bulk Receiver", "receiverPhone": "9000000098", "products": [{ "productId": 1, "qty": 1, "unitPrice": 100 }] }] }] }
        responseStatus: 201
        responseBody: |
          { "success": true, "data": { "sessionId": 1, "totalOrders": 1 } }

      - name: List Sessions
        method: GET
        path: /bulk-uploads
        roles: [ADMIN, OPERATOR]
        description: Lists all bulk upload sessions.
        responseStatus: 200

      - name: Get Session by ID
        method: GET
        path: /bulk-uploads/:id
        roles: [ADMIN, OPERATOR]
        description: Retrieves details of a bulk upload session.
        responseStatus: 200

  # ========== 15. NOTIFICATION ==========
  - name: Notification
    slug: notification
    description: Parcel notification sending, resending, and webhook
    endpoints:
      - name: Send Notification
        method: POST
        path: /parcels/:id/notify
        roles: [ADMIN, OPERATOR]
        description: Sends a tracking notification for a parcel.
        responseStatus: 200

      - name: Get Notification History
        method: GET
        path: /parcels/:id/notifications
        roles: [ADMIN, OPERATOR]
        description: Retrieves notification log for a parcel.
        responseStatus: 200

      - name: Resend Notification
        method: POST
        path: /notifications/:id/resend
        roles: [ADMIN, OPERATOR]
        description: Resends a previously sent notification.
        responseStatus: 200

      - name: Webhook
        method: POST
        path: /notifications/webhook
        auth: none
        roles: [ALL]
        description: External delivery status webhook endpoint.
        headers: { Content-Type: application/json }
        body: |
          { "notificationId": 1, "status": "delivered" }
        responseStatus: 200
````

## File: src/modules/auth/auth.service.js
````javascript
// ============================================================================
// File: src/modules/auth/auth.service.js
// Description: Unifies authentication logic (Login) using the centralized 
// Employee Repository, removing the legacy duplicate User dependency.
// ============================================================================

import bcrypt from 'bcryptjs';
import employeeRepository from '../employee/employee.repository.js';
import generateToken from '../../shared/utils/generateToken.js';

class AuthService {
  /**
   * Orchestrates the login flow by validating credentials and generating a JWT.
   * 
   * @param {string} email - User's login email.
   * @param {string} password - User's plain-text password.
   * @returns {Promise<Object>} Object containing profile data and token.
   */
  async loginUser(email, password) {
    const employee = await employeeRepository.findByEmail(email);
    
    // Compare the raw password with the hashed password.
    // Dual-case access: mock seed uses PascalCase (Password), live DB may use camelCase.
    const storedPassword = employee?.Password || employee?.password;

    if (employee && storedPassword && (await bcrypt.compare(password, storedPassword))) {
      
      // Enforce the Toggle-Access restriction
      const canLogin = employee.AllowLogin ?? employee.allowLogin;
      if (canLogin === false) {
        const error = new Error('Your account has been locked. Contact your Admin.');
        error.statusCode = 403;
        throw error;
      }

      const empCode = employee.EmployeeCode || employee.employeeCode;
      
      // Fetch full profile to ensure all fields (like EmailAddress) are included.
      // prc_authenticate_employee may return a limited set of fields.
      const fullEmployee = await employeeRepository.findById(empCode);
      const profile = fullEmployee || employee;

      return {
        id: empCode,
        employeeCode: empCode,
        name: profile.FullName || profile.name,
        username: profile.UserName || profile.userName || '',
        email: profile.EmailAddress || profile.email || '',
        role: profile.RoleCode || profile.role,
        token: generateToken(empCode), // Using employeeCode as identifier in JWT
      };
    } else {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
  }

  /**
   * Internal mapper to standardize Profile queries to the camelCase API contract.
   * Leverages Employee schema properties.
   */
  _mapToApi(profile) {
    if (!profile) return null;
    return {
      employeeCode: profile.EmployeeCode || profile.employeeCode,
      name: profile.FullName || profile.name || profile.firstName,
      username: profile.UserName || profile.userName || '',
      email: profile.EmailAddress || profile.email,
      phoneNo: profile.ContactNumber || profile.contactNumber || null,
      roleCode: profile.RoleCode || profile.role,
      allowLogin: profile.AllowLogin !== undefined ? profile.AllowLogin : profile.allowLogin,
      createdAt: profile.CreatedDate || profile.createdAt
    };
  }

  /**
   * Retrieves fresh profile data from the database.
   * Ensures the data is up-to-date even if the JWT is old.
   * 
   * @param {string} employeeCode - The unique identifier from the JWT.
   * @returns {Promise<Object>} The employee profile data.
   */
  async getProfile(employeeCode) {
    const profile = await employeeRepository.findById(employeeCode);
    
    if (!profile) {
      const error = new Error('Employee profile not found');
      error.statusCode = 404;
      throw error;
    }

    return this._mapToApi(profile);
  }
}

export default new AuthService();
````

## File: src/modules/employee/employee.repository.js
````javascript
// ============================================================================
// File: src/modules/employee/employee.repository.js
// Description: Data access layer for Employee Management.
// Handles interactions with the 'employee_master' table.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v1.md):
//   - Reads:   prc_employee_master_get (pAction=0 list, pAction=1 specific)
//   - Upserts: prc_employee_master_set (EmployeeCode=0 insert, >0 update)
// ============================================================================

import db from '../../infrastructure/database/db.js';
import bcrypt from 'bcryptjs';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
// Use a hardcoded hash for 'securePass123' to avoid async bcrypt during module initialization
const HASHED_MOCK_PASSWORD = '$2b$10$3a6myMEFAljTFDVh3agsAuQ0euXF0v6pUOA.Hw.oeIZEjncNsDn3W'; // hash for 'securePass123'

let seedEmployees = [
  {
    EmployeeCode: 1,
    FullName: 'Admin User',
    UserName: 'admin',
    EmailAddress: 'admin@example.com',
    Password: HASHED_MOCK_PASSWORD,
    RoleCode: 'ADMIN',
    AllowLogin: true,
    CreatedDate: '2026-04-03T08:52:00Z'
  },
  {
    EmployeeCode: 2,
    FullName: 'Test Operator',
    UserName: 'operator',
    EmailAddress: 'operator@example.com',
    Password: HASHED_MOCK_PASSWORD,
    RoleCode: 'OPERATOR',
    AllowLogin: false,
    CreatedDate: '2026-04-03T08:52:00Z'
  },
  {
    EmployeeCode: 3,
    FullName: 'Test Courier',
    UserName: 'courier',
    EmailAddress: 'courier@example.com',
    Password: HASHED_MOCK_PASSWORD,
    RoleCode: 'COURIER',
    AllowLogin: true,
    CreatedDate: '2026-04-03T08:52:00Z'
  }
];

class EmployeeRepository {

  /**
   * Checks if an employee with the same email or username already exists.
   * Procedure: CALL prc_check_duplicate_employee_master(?,?,?)
   * 
   * @param {number} id - EmployeeCode (0 for new, ID for update)
   * @param {string} email - Email address
   * @param {string} username - Username
   * @returns {Promise<boolean>} True if duplicate exists, false otherwise.
   */
  async checkDuplicate(id, email, username) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_check_duplicate_employee_master(?, ?, ?)', [
        id || 0,
        email || null,
        username || null
      ]);
      // Assuming SP returns a count or a record
      // Let's assume it returns { DuplicateCount: 1 } or similar, but typically checking if there's any row returned
      if (rows && rows[0] && rows[0][0]) {
        const row = rows[0][0];
        // Could be a field like 'Count' or simply presence of row means duplicate
        return (row.DuplicateCount > 0 || row.Count > 0 || Object.values(row)[0] > 0);
      }
      return false;
    }

    // MOCK MODE
    const existing = seedEmployees.find(e => 
      e.EmployeeCode.toString() !== (id || 0).toString() &&
      (e.EmailAddress === email || e.UserName === username)
    );
    return !!existing;
  }

  /**
   * Fetches an employee by their email for authentication.
   * Procedure: CALL prc_authenticate_employee(?)
   *
   * @param {string} email - Employee email address.
   * @returns {Promise<Object|null>} { EmployeeCode, FullName, UserName, Password, RoleCode, AllowLogin } or null.
   */
  async findByEmail(email) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_authenticate_employee (by email)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_authenticate_employee(?)', [email]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by email
    // ------------------------------------------------------------------
    const emp = seedEmployees.find((e) => e.EmailAddress === email);
    return emp || null;
  }

  /**
   * Fetches a paginated list of employees with optional filtering.
   * Procedure: CALL prc_employee_master_get(?, ?, ?, ?, ?)
   * Convention: pAction=0, paginated list with optional search/role/allowLogin filters.
   *
   * @param {object} params - { page, limit, search, role, allowLogin }
   * @returns {Promise<object>} { data: [...], meta: { page, limit, totalRows, totalPages } }
   */
  async findAll({ page = 1, limit = 20, search, role, allowLogin }) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_search (EmployeeCode=0, RoleId filtering logic)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const roleMap = { 'ADMIN': 1, 'OPERATOR': 2, 'COURIER': 3 };
      const roleId = roleMap[role] || 0;

      const [rows] = await db.execute('CALL prc_employee_master_search(?, ?)', [
        0, // pEmployeeCode=0 -> Get all
        roleId // pFkRoleId
      ]);
      
      let results = rows[0] || [];
      
      // In-memory filter for search and allowLogin if they are not handled by SP
      if (search) {
        const s = search.toLowerCase();
        results = results.filter(e => 
          (e.FullName?.toLowerCase().includes(s)) || 
          (e.EmailAddress?.toLowerCase().includes(s))
        );
      }
      if (allowLogin !== undefined) {
        const allowLoginBool = allowLogin === 'true' || allowLogin === true;
        results = results.filter(e => e.AllowLogin === allowLoginBool);
      }

      const totalRows = results.length;
      const startIndex = (page - 1) * limit;
      const paginatedItems = results.slice(startIndex, startIndex + limit);

      return {
        data: paginatedItems,
        meta: { page: parseInt(page), limit: parseInt(limit), totalRows, totalPages: Math.ceil(totalRows / limit) }
      };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory filtering and pagination
    // ------------------------------------------------------------------
    let results = [...seedEmployees];

    if (role) results = results.filter(e => e.RoleCode === role);
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(e => e.FullName.toLowerCase().includes(s) || e.EmailAddress.toLowerCase().includes(s));
    }
    if (allowLogin !== undefined) {
      results = results.filter(e => e.AllowLogin === (allowLogin === 'true' || allowLogin === true));
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedItems = results.slice(startIndex, startIndex + limit);

    return {
      data: paginatedItems,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalRows: results.length,
        totalPages: Math.ceil(results.length / limit)
      }
    };
  }

  /**
   * Fetches an employee by their EmployeeCode.
   * Procedure: CALL prc_employee_master_get(?, ?)
   * Convention: pAction=1, pass EmployeeCode.
   *
   * @param {number|string} id - EmployeeCode.
   * @returns {Promise<Object|null>} Employee record or null.
   */
  async findById(id) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_search (pEmployeeCode, 0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_search(?, ?)', [id, 0]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by EmployeeCode
    // ------------------------------------------------------------------
    const emp = seedEmployees.find((e) => e.EmployeeCode.toString() === id.toString());
    return emp || null;
  }

  /**
   * Creates a new employee record.
   * Procedure: CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: EmployeeCode=0 triggers insert. No pAction on _set calls.
   *
   * @param {object} employeeData - { FullName, EmailAddress, Password, RoleCode, ... }
   * @returns {Promise<object>} The newly created employee record.
   */
  async create(employeeData) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_set (EmployeeCode=0 → Insert)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        0, // pEmployeeCode=0 → Insert
        employeeData.FullName,
        employeeData.ContactNumber || null,
        employeeData.EmailAddress,
        employeeData.UserName || employeeData.EmailAddress,
        employeeData.Password,
        employeeData.FkRoleId || null,
        employeeData.AllowLogin !== undefined ? (employeeData.AllowLogin ? 1 : 0) : 1, // pAllowLogin
        employeeData.CreatedBy || 1, // pCreatedBy
        employeeData.IsActive !== undefined ? (employeeData.IsActive ? 1 : 0) : 1 // pIsActive
      ]);
      
      // Return newly created record via SELECT output
      return rows[0]?.[0] || employeeData;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory push
    // ------------------------------------------------------------------
    const newId = seedEmployees.length > 0 ? Math.max(...seedEmployees.map(e => e.EmployeeCode)) + 1 : 1;

    const newEmployee = {
      EmployeeCode: newId,
      FullName: employeeData.FullName,
      EmailAddress: employeeData.EmailAddress,
      Password: employeeData.Password,
      RoleCode: employeeData.RoleCode,
      AllowLogin: true,
      CreatedDate: new Date().toISOString()
    };

    seedEmployees.push(newEmployee);
    return newEmployee;
  }

  /**
   * Updates an employee record entirely.
   * Procedure: CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: EmployeeCode>0 triggers update. No pAction on _set calls.
   *
   * @param {number|string} id - EmployeeCode.
   * @param {object} updateData - Fields to update.
   * @returns {Promise<object|null>} Updated employee record or null.
   */
  async update(id, updateData) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_set (EmployeeCode>0 → Update)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      // First fetch existing to retain values not being updated
      const existing = await this.findById(id);
      if (!existing) return null;

      const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id, // pEmployeeCode
        updateData.FullName !== undefined ? updateData.FullName : existing.FullName,
        updateData.ContactNumber !== undefined ? updateData.ContactNumber : existing.ContactNumber,
        updateData.EmailAddress !== undefined ? updateData.EmailAddress : existing.EmailAddress,
        updateData.UserName !== undefined ? updateData.UserName : existing.UserName,
        updateData.Password !== undefined ? updateData.Password : existing.Password, // Hashed in service layer
        updateData.FkRoleId !== undefined ? updateData.FkRoleId : existing.FkRoleId,
        updateData.AllowLogin !== undefined ? (updateData.AllowLogin ? 1 : 0) : existing.AllowLogin,
        1, // pCreatedBy
        updateData.IsActive !== undefined ? (updateData.IsActive ? 1 : 0) : existing.IsActive
      ]);
      
      return rows[0]?.[0] || await this.findById(id);
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory update
    // ------------------------------------------------------------------
    const index = seedEmployees.findIndex((e) => e.EmployeeCode.toString() === id.toString());
    if (index === -1) return null;

    seedEmployees[index] = { ...seedEmployees[index], ...updateData };
    return seedEmployees[index];
  }

  /**
   * Toggles login access for an employee.
   * Procedure: CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: EmployeeCode>0 with AllowLogin flag. No pAction on _set calls.
   *
   * @param {number|string} id - EmployeeCode.
   * @param {boolean} allowLogin - New access state.
   * @returns {Promise<object|null>} Updated employee record or null.
   */
  async patchAccess(id, allowLogin) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: toggle access via findById + prc_employee_master_set
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const existing = await this.findById(id);
      if (!existing) return null;

      await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id,
        existing.FullName,
        existing.ContactNumber,
        existing.EmailAddress,
        existing.UserName,
        existing.Password,
        existing.FkRoleId,
        allowLogin ? 1 : 0,
        1, // pCreatedBy
        existing.IsActive
      ]);
      
      return await this.findById(id);
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory toggle
    // ------------------------------------------------------------------
    const index = seedEmployees.findIndex((e) => e.EmployeeCode.toString() === id.toString());
    if (index === -1) return null;

    seedEmployees[index].AllowLogin = allowLogin;
    return seedEmployees[index];
  }
}

export default new EmployeeRepository();
````

## File: src/modules/order/order.repository.js
````javascript
// ============================================================================
// File: src/modules/order/order.repository.js
// Description: Data access layer for the Order module.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// Architecture Rule (AGENTS.md): 
// - Zero Direct Database Operations. All mutations use prc_..._set.
// - All scans/actions must be logged in receiver_status_details (cascaded via SPs).
// ============================================================================

import { v4 as uuidv4 } from 'uuid';
import db from '../../infrastructure/database/db.js';

import {
  seedOrderItems,
  seedOrders,
  seedParcels,
  seedReceivers,
} from './order.seed.js';

class OrderRepository {
  // ============================================================================
  // ORDER OPERATIONS
  // ============================================================================

  /**
   * Create a new order atomically using a managed transaction.
   * Orchestrates multiple SP calls to maintain referential integrity.
   * 
   * @param {object} orderData - Normalized payload containing receivers and items.
   * @param {number|string} adminId - The employee code for the creator.
   * @returns {Promise<object>} Created order metadata { orderId, orderCode }.
   */
  async createOrder(orderData, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      return this._createOrderLive(orderData, adminId);
    }
    return this._createOrderMock(orderData, adminId);
  }

  /**
   * Managed transaction flow for LIVE database creation.
   * OrderMaster -> ReceiverDetails -> OrderItems -> ParcelDetails.
   * @private
   */
  async _createOrderLive(orderData, adminId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Step 1: Insert Order Header
      const orderResult = await this._executeOrderMaster(connection, orderData, adminId);
      const orderId = orderResult.PkOrderId;

      // Step 2: Loop through receivers (Mode B/C)
      for (const rec of orderData.receivers) {
        const receiverDetailsId = await this._executeReceiverDetails(connection, orderId, rec, adminId);

        // Step 3: Insert items for this receiver
        for (const prod of rec.products) {
          await this._executeOrderItem(connection, receiverDetailsId, prod, adminId);
        }

        // Step 4: Generate Parcel execution unit for this receiver
        await this._executeParcelDetails(connection, receiverDetailsId, orderData.courierId, adminId);
      }

      await connection.commit();
      return { orderId, orderCode: orderResult.OrderCode };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Internal wrapper for prc_order_master_set.
   * @private
   */
  async _executeOrderMaster(connection, data, adminId) {
    const [rows] = await connection.execute(
      'CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        0, // pPkOrderId=0 for creation
        data.senderId || null, 
        data.senderName, 
        data.senderMobile, 
        data.senderAddress || null, 
        null, null, null, // pCity, pState, pPincode (inherited from Party)
        data.totalAmount || 0, 
        adminId, 
        1 // pIsActive
      ]
    );
    return rows[0][0];
  }

  /**
   * Internal wrapper for prc_receiver_details_set.
   * @private
   */
  async _executeReceiverDetails(connection, orderId, rec, adminId) {
    const [rows] = await connection.execute(
      'CALL prc_receiver_details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        0, // pPkReceiverDetailsId
        orderId, 
        rec.receiverId || null, 
        rec.receiverName, 
        rec.receiverPhone || null, 
        rec.receiverEmail || null, 
        rec.address || null, 
        rec.city || null, 
        rec.state || null, 
        rec.pincode || null, 
        rec.country || 'India', 
        adminId, 
        1 // pIsActive
      ]
    );
    return rows[0][0].PkReceiverDetailsId;
  }

  /**
   * Internal wrapper for prc_order_items_set.
   * @private
   */
  async _executeOrderItem(connection, receiverDetailsId, prod, adminId) {
    await connection.execute(
      'CALL prc_order_items_set(?, ?, ?, ?, ?, ?, ?, ?)',
      [
        0, // pPkOrderItemId
        receiverDetailsId, 
        prod.productId, 
        prod.qty, 
        null, // pFkUnitId
        prod.unitPrice || null, 
        adminId, 
        1 // pIsActive
      ]
    );
  }

  /**
   * Internal wrapper for prc_parcel_details_set.
   * @private
   */
  async _executeParcelDetails(connection, receiverDetailsId, courierId, adminId) {
    await connection.execute(
      'CALL prc_parcel_details_set(?, ?, ?, ?, ?, ?)',
      [
        0, // pTriggerType: 0 (CREATE)
        0, // pPkParcelDetailsId
        receiverDetailsId, 
        null, // pAWBNumber
        courierId, 
        adminId
      ]
    );
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Get all orders summary list using centralized search procedure.
   * Procedure: prc_order_master_search
   * 
   * @param {object} filters - Pagination and status filters.
   * @returns {Promise<object>} { data, total }
   */
  async findAllOrders(filters = {}) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_search(?, ?, ?, ?)', [
        0, // pPkOrderId: 0 for list
        0, // pFkPartyId: 0
        filters.courierId || 0, 
        filters.statusId || 0
      ]);
      // Pagination is handled in-memory for this module's search results.
      return this._paginateData(rows[0] || [], filters);
    }
    return this._findAllOrdersMock(filters);
  }

  /**
   * Internal pagination and search logic for summary lists.
   * @private
   */
  _paginateData(data, filters) {
    let result = data;
    if (filters.search) {
      const s = filters.search.toLowerCase();
      // Handle dual-case naming convention: OrderCode (Live) vs orderCode (Mock)
      result = result.filter(o => {
        const code = (o.OrderCode || o.orderCode || '').toLowerCase();
        const name = (o.SenderName || o.senderName || '').toLowerCase();
        return code.includes(s) || name.includes(s);
      });
    }
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    return {
      data: result.slice((page - 1) * limit, page * limit),
      total: result.length
    };
  }

  /**
   * Get full order aggregate via search procedure.
   * 
   * @param {number|string} orderId - Primary identifier.
   * @returns {Promise<object|null>} Aggregated order record.
   */
  async findById(orderId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_search(?, ?, ?, ?)', [orderId, 0, 0, 0]);
      return rows[0]?.[0] || null;
    }
    return this._findByIdMock(orderId);
  }

  // ============================================================================
  // UPDATE & CANCEL OPERATIONS
  // ============================================================================

  /**
   * Update order master details.
   * 
   * @param {number|string} orderId
   * @param {object} payload
   * @param {number|string} adminId
   * @returns {Promise<object|null>} Updated record.
   */
  async updateOrder(orderId, payload, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        orderId, 
        null, // pSenderId: null (do not update FK)
        payload.senderName || null, 
        payload.senderMobile || null, 
        payload.senderAddress || null, 
        null, null, null, // Address components
        null, // pTotalAmount
        adminId, 
        1 // pIsActive
      ]);
      return rows[0]?.[0] || null;
    }
    return this._updateOrderMock(orderId, payload);
  }

  /**
   * Logic for cancelling an order by setting IsActive=0.
   * Cascaded logic for parcels is handled by DB triggers/procedures.
   * 
   * @param {number|string} orderId
   * @param {number|string} adminId
   */
  async cancelOrder(orderId, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        orderId, 
        null, null, null, null, null, null, null, null,
        adminId, 
        0 // pIsActive=0 signifies cancellation
      ]);
      return rows[0]?.[0] || null;
    }
    return this._cancelOrderMock(orderId);
  }

  // ============================================================================
  // MOCK IMPLEMENTATIONS (Clean Code separation)
  // ============================================================================

  /** @private */
  _createOrderMock(data, adminId) {
    const order = { id: seedOrders.length + 1, orderCode: `ORD-${Date.now()}`, fkSenderId: data.senderId, senderName: data.senderName, senderMobile: data.senderMobile, senderAddress: data.senderAddress, fkCourierId: data.courierId, totalAmount: 0, createdBy: adminId || null, createdAt: new Date(), isActive: true };
    seedOrders.push(order);
    return order;
  }

  /** @private */
  _findAllOrdersMock(filters) {
    const activeOrders = seedOrders.filter((o) => o.isActive);
    const data = activeOrders.map((order) => {
      const receivers = seedReceivers.filter((r) => r.fkOrderId === order.id);
      const parcels = seedParcels.filter((p) => receivers.some((r) => r.id === p.fkReceiverDetailsId));
      return { id: order.id, orderCode: order.orderCode, senderName: order.senderName, senderMobile: order.senderMobile, totalAmount: order.totalAmount, totalReceivers: receivers.length, totalParcels: parcels.length, derivedStatus: this._deriveOrderStatus(parcels), createdAt: order.createdAt };
    });
    return this._paginateData(data, filters);
  }

  /** @private */
  _findByIdMock(orderId) {
    const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
    if (!order) return null;
    const receivers = seedReceivers.filter((r) => r.fkOrderId === order.id).map(r => ({
      ...r,
      items: seedOrderItems.filter(i => i.fkReceiverDetailsId === r.id),
      parcel: seedParcels.find(p => p.fkReceiverDetailsId === r.id)
    }));
    return { ...order, derivedStatus: this._deriveOrderStatus(receivers.map(r => r.parcel).filter(Boolean)), receivers };
  }

  /** @private */
  _updateOrderMock(orderId, payload) {
    const orderIndex = seedOrders.findIndex((o) => o.id === parseInt(orderId) && o.isActive);
    if (orderIndex === -1) return null;
    this._checkUpdateBlocked(orderId);
    seedOrders[orderIndex] = { ...seedOrders[orderIndex], ...payload };
    return seedOrders[orderIndex];
  }

  /** @private */
  _checkUpdateBlocked(orderId) {
    const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
    const parcels = seedParcels.filter((p) => receivers.some((r) => r.id === p.fkReceiverDetailsId));
    // Blocking logic: No updates after label printing/scanning begins
    if (parcels.some((p) => ['AWB_LINKED', 'DISPATCHED', 'DELIVERED'].includes(p.parcelStatusCode))) {
      const error = new Error('Cannot update order: physical execution has begun.');
      error.statusCode = 400;
      throw error;
    }
  }

  /** @private */
  _cancelOrderMock(orderId) {
    const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
    if (!order) return null;
    const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
    const parcels = seedParcels.filter((p) => receivers.some((r) => r.id === p.fkReceiverDetailsId));
    if (parcels.some((p) => ['DISPATCHED', 'DELIVERED'].includes(p.parcelStatusCode))) {
      const error = new Error('Cannot cancel order: already dispatched.');
      error.statusCode = 400;
      throw error;
    }
    parcels.forEach(p => { p.parcelStatusCode = 'CANCELLED'; });
    return { orderId: order.id, cancelledCount: parcels.length };
  }

  /**
   * Mathematical status derivation from parcel lifecycle states.
   * Source of Truth: Parcel execution state.
   * @private
   */
  _deriveOrderStatus(parcels) {
    if (!parcels || parcels.length === 0) return 'Created';
    const s = parcels.map((p) => p.parcelStatusCode);
    if (s.every((x) => x === 'CANCELLED')) return 'Cancelled';
    if (s.every((x) => x === 'DELIVERED')) return 'Completed';
    if (s.every((x) => x === 'DISPATCHED')) return 'Dispatched';
    if (s.some((x) => ['DISPATCHED', 'DELIVERED'].includes(x))) return 'Partially Dispatched';
    if (s.every((x) => ['LABEL_PRINTED', 'AWB_LINKED'].includes(x))) return 'Label Printed';
    if (s.some((x) => ['LABEL_PRINTED', 'AWB_LINKED'].includes(x))) return 'Partially Printed';
    return 'Created';
  }

  // MOCK sub-methods used by service
  async createReceiver(orderId, data) {
    const r = { id: seedReceivers.length + 1, fkOrderId: orderId, ...data, isActive: true };
    seedReceivers.push(r); return r;
  }
  async createOrderItem(recId, prodId, qty, price) {
    const i = { id: seedOrderItems.length + 1, fkReceiverDetailsId: recId, fkProductId: prodId, outwardQty: qty, unitPrice: price || 0 };
    seedOrderItems.push(i); return i;
  }
  async createParcel(recId, courierId) {
    const p = { id: seedParcels.length + 1, fkReceiverDetailsId: recId, fkCourierId: courierId, parcel_id: `PDS-${uuidv4().split('-')[0].toUpperCase()}`, trackingNo: null, parcelStatusCode: 'PENDING', labelPrintCount: 0, dispatchDate: null, createdAt: new Date() };
    seedParcels.push(p); return p;
  }
}

export default new OrderRepository();
````

## File: src/modules/product/product.repository.js
````javascript
// ============================================================================
// File: src/modules/product/product.repository.js
// Description: Data access layer for Products Master.
//
// Stored Procedures (api_procedure_spec_v2.1.md):
//   - prc_product_master_search: Retrieval & ID lookup
//   - prc_product_master_set: Insert (ID=0), Update (ID>0), Delete (IsActive=0)
//   - prc_check_duplicate_product_master: Uniqueness validation
//   - prc_product_color_matrix_get: Color/size matrix retrieval
//   - prc_product_color_matrix_set: Color/size matrix upsert
//   - prc_product_category_get: Category lookup (pAction=0: all active)
//   - prc_product_category_set: Category upsert (ID=0: insert, ID>0: update)
//   - prc_lu_unit_get: Unit lookup (pAction=0: all active)
//   - prc_lu_unit_set: Unit upsert (ID=0: insert, ID>0: update)
//   - prc_lu_color_code_get: Color lookup (pAction=0: all active)
//   - prc_lu_color_code_set: Color upsert (ID=0: insert, ID>0: update)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK DATA STORE (For USE_MOCK_DB=true)
// ============================================================================
let seedCategories = [
  { PkProductCategoryId: 1, CategoryName: 'Textiles', IsActive: true },
  { PkProductCategoryId: 2, CategoryName: 'Accessories', IsActive: true }
];

let seedUnits = [
  { PkUnitId: 1, UnitTitle: 'Kilogram', UnitCode: 'KG', IsActive: 1 },
  { PkUnitId: 2, UnitTitle: 'Pieces', UnitCode: 'PCS', IsActive: 1 },
  { PkUnitId: 3, UnitTitle: 'Litre', UnitCode: 'LTR', IsActive: 1 }
];

let seedColors = [
  { PkLuColorId: 1, ColorName: 'Red', ColorCode: 'RED', IsActive: 1 },
  { PkLuColorId: 2, ColorName: 'Blue', ColorCode: 'BLU', IsActive: 1 },
  { PkLuColorId: 3, ColorName: 'Green', ColorCode: 'GRN', IsActive: 1 }
];

let seedColorMatrix = [
  {
    PkProductColorId: 1,
    FkProductId: 1,
    FkLuColorId: 1,
    ColorName: 'Red',
    MaterialRate: 550.00,
    Size: 'M',
    IsActive: 1,
    CreatedDate: new Date().toISOString()
  },
  {
    PkProductColorId: 2,
    FkProductId: 1,
    FkLuColorId: 2,
    ColorName: 'Blue',
    MaterialRate: 520.00,
    Size: 'L',
    IsActive: 1,
    CreatedDate: new Date().toISOString()
  }
];

let seedProducts = [
  {
    PkProductId: 1,
    MaterialName: 'Cotton Fiber',
    MaterialRate: 500.50,
    cu_item_code: 'CF-001',
    FkProductCategoryId: 1,
    FkUnitId: 1,
    IsActive: true,
    CreatedDate: new Date().toISOString()
  },
  {
    PkProductId: 2,
    MaterialName: 'Polyester Yarn',
    MaterialRate: 300.00,
    cu_item_code: 'PY-002',
    FkProductCategoryId: 1,
    FkUnitId: 1,
    IsActive: true,
    CreatedDate: new Date().toISOString()
  },
  {
    PkProductId: 3,
    MaterialName: 'Silk Thread',
    MaterialRate: 1500.00,
    cu_item_code: 'ST-003',
    FkProductCategoryId: 1,
    FkUnitId: 1,
    IsActive: true,
    CreatedDate: new Date().toISOString()
  }
];

class ProductRepository {

  // --------------------------------------------------------------------------
  // 1. VALIDATION PROCEDURES
  // --------------------------------------------------------------------------

  /**
   * Checks if a product with the same name exists in a specific category/unit.
   * @param {number} id - PkProductId (0 for new records).
   * @param {number} categoryId - FkProductCategoryId.
   * @param {number} unitId - FkUnitId.
   * @param {string} name - MaterialName.
   * @returns {Promise<number>} Number of duplicates found.
   */
  async checkDuplicate(id, categoryId, unitId, name) {
    // --- LIVE DB EXECUTION ---
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_check_duplicate_product_master(?, ?, ?, ?)', [
        id || 0,
        categoryId || 0,
        unitId || 0,
        name
      ]);
      return rows[0]?.[0]?.duplicate_count || 0;
    }

    // --- MOCK IN-MEMORY LOGIC ---
    const isDuplicate = seedProducts.some(p => 
      p.MaterialName.toLowerCase() === name.toLowerCase() && 
      p.PkProductId !== id && 
      p.IsActive
    );
    return isDuplicate ? 1 : 0;
  }

  // --------------------------------------------------------------------------
  // 2. LOOKUP PROCEDURES (Categories, Units & Colors)
  // --------------------------------------------------------------------------

  /**
   * Fetches all active product categories.
   * CALL prc_product_category_get(pAction=0)
   * @returns {Promise<Array>} List of category records.
   */
  async getCategories() {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_category_get(?, ?)', [0, 0]);
      return rows[0] || [];
    }
    return seedCategories.filter(c => c.IsActive);
  }

  /**
   * Fetches a single category by its name (case-insensitive).
   * CALL prc_product_category_get(pAction=0) — filtered in JS.
   * @param {string} name - CategoryName to search.
   * @returns {Promise<object|null>} Matching category or null.
   */
  async getCategoryByName(name) {
    const categories = await this.getCategories();
    const lower = name.toLowerCase();
    return categories.find(c => (c.CategoryName || '').toLowerCase() === lower) || null;
  }

  /**
   * Fetches all active units.
   * CALL prc_lu_unit_get(pAction=0)
   * @returns {Promise<Array>} List of unit records.
   */
  async getUnits() {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_lu_unit_get(?)', [0]);
      return rows[0] || [];
    }
    return seedUnits.filter(u => u.IsActive);
  }

  /**
   * Fetches a single unit by its code (case-insensitive).
   * CALL prc_lu_unit_get(pAction=0) — filtered in JS.
   * @param {string} code - UnitCode to search (e.g., 'PCS', 'KG').
   * @returns {Promise<object|null>} Matching unit or null.
   */
  async getUnitByCode(code) {
    const units = await this.getUnits();
    const lower = code.toLowerCase();
    return units.find(u => (u.UnitCode || '').toLowerCase() === lower) || null;
  }

  /**
   * Fetches all active colors.
   * CALL prc_lu_color_code_get(pAction=0)
   * @returns {Promise<Array>} List of color records.
   */
  async getColors() {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_lu_color_code_get(?, ?)', [0, 0]);
      return rows[0] || [];
    }
    return seedColors.filter(c => c.IsActive);
  }

  /**
   * Creates a new product category.
   * CALL prc_product_category_set(0, pCategoryName, pIsActive)
   * @param {string} categoryName - Name of the category.
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object|null>} Created category or null.
   */
  async createCategory(categoryName, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_category_set(?, ?, ?, ?)', [
        0,
        categoryName,
        adminId,
        1
      ]);
      return rows[0]?.[0] || null;
    }
    const newCat = {
      PkProductCategoryId: seedCategories.length + 1,
      CategoryName: categoryName,
      IsActive: true
    };
    seedCategories.push(newCat);
    return newCat;
  }

  /**
   * Creates a new color lookup entry.
   * CALL prc_lu_color_code_set(0, pColorName, pColorCode, pCreatedBy, pIsActive)
   * @param {string} colorName - Display name of the color.
   * @param {string} colorCode - Short code (e.g., 'RED').
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object|null>} Created color or null.
   */
  async createColor(colorName, colorCode, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_lu_color_code_set(?, ?, ?, ?, ?)', [
        0,
        colorName,
        colorCode || '',
        adminId,
        1
      ]);
      return rows[0]?.[0] || null;
    }
    const newColor = {
      PkLuColorId: seedColors.length + 1,
      ColorName: colorName,
      ColorCode: colorCode || '',
      IsActive: 1
    };
    seedColors.push(newColor);
    return newColor;
  }

  /**
   * Creates a new unit lookup entry.
   * CALL prc_lu_unit_set(0, pUnitTitle, pUnitCode, pIsActive)
   * @param {string} unitTitle - Display name (e.g., 'Kilogram').
   * @param {string} unitCode - Short code (e.g., 'KG').
   * @returns {Promise<object|null>} Created unit or null.
   */
  async createUnit(unitTitle, unitCode) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_lu_unit_set(?, ?, ?, ?)', [
        0,
        unitTitle,
        unitCode,
        1
      ]);
      return rows[0]?.[0] || null;
    }
    const newUnit = {
      PkUnitId: seedUnits.length + 1,
      UnitTitle: unitTitle,
      UnitCode: unitCode,
      IsActive: 1
    };
    seedUnits.push(newUnit);
    return newUnit;
  }

  /**
   * Determines the next sequential cu_item_code / MaterialCode.
   * Queries MAX(cu_item_code) from product_master and increments.
   * CALL prc_product_master_search(0, 0, 0) — reads all products to find max code.
   * @returns {Promise<string>} Next available code (e.g., '1002').
   */
  async getNextItemCode() {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [0, 0, 0]);
      const products = rows[0] || [];
      const maxCode = products.reduce((max, p) => {
        const num = parseInt(p.cu_item_code, 10);
        return (!isNaN(num) && num > max) ? num : max;
      }, 1000);
      return String(maxCode + 1);
    }

    const maxCode = seedProducts.reduce((max, p) => {
      const num = parseInt(p.cu_item_code, 10);
      return (!isNaN(num) && num > max) ? num : max;
    }, 1000);
    return String(maxCode + 1);
  }

  // --------------------------------------------------------------------------
  // 3. RETRIEVAL PROCEDURES
  // --------------------------------------------------------------------------

  /**
   * Fetches the product catalog with optional category/unit filters.
   * @param {number} categoryId - Filter by Category PK.
   * @param {number} unitId - Filter by Unit PK.
   * @returns {Promise<Array>} List of product records.
   */
  async findAll(categoryId = 0, unitId = 0) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [0, categoryId, unitId]);
      return rows[0];
    }

    return seedProducts.filter(p => 
      p.IsActive && 
      (!categoryId || p.FkProductCategoryId === categoryId) &&
      (!unitId || p.FkUnitId === unitId)
    );
  }

  /**
   * Fetches a single product by its primary key, enriched with color matrix variations.
   * @param {number|string} id - PkProductId.
   * @returns {Promise<object|null>} Product record (with variations) or null.
   */
  async findById(id) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [id, 0, 0]);
      const product = rows[0]?.[0] || null;
      if (product) {
        product.variations = await this.getColorMatrix(id);
      }
      return product;
    }

    const product = seedProducts.find(p => p.PkProductId.toString() === id.toString() && p.IsActive) || null;
    if (product) {
      product.variations = seedColorMatrix.filter(
        m => m.FkProductId.toString() === id.toString() && m.IsActive
      );
    }
    return product;
  }

  /**
   * Fetches products joined with category names for selection dropdowns.
   * @param {string} search - Partial match for name or category.
   */
  async getDropdown(search = '') {
    let products = [];
    let matrices = [];

    if (process.env.USE_MOCK_DB !== 'true') {
      const [pRows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [0, 0, 0]);
      products = pRows[0] || [];
      matrices = await this.getAllColorMatrix();
    } else {
      products = seedProducts.filter(p => p.IsActive).map(p => {
        const cat = seedCategories.find(c => c.PkProductCategoryId === p.FkProductCategoryId);
        const unit = seedUnits.find(u => u.PkUnitId === p.FkUnitId);
        return { ...p, CategoryName: cat?.CategoryName || 'N/A', UnitTitle: unit?.UnitTitle || 'N/A' };
      });
      matrices = seedColorMatrix.filter(m => m.IsActive);
    }

    let flatList = [];
    for (const p of products) {
      const pVariations = matrices.filter(m => String(m.FkProductId) === String(p.PkProductId));
      
      if (pVariations.length > 0) {
        for (const v of pVariations) {
          flatList.push({
            PkProductId: p.PkProductId,
            PkProductColorId: v.PkProductColorId,
            MaterialName: p.MaterialName,
            ColorName: v.ColorName || null,
            Size: v.Size || null,
            MaterialRate: v.MaterialRate || p.MaterialRate, // Override with variation rate
            cu_item_code: p.cu_item_code,
            CategoryName: p.CategoryName || null,
            UnitTitle: p.UnitTitle || null
          });
        }
      } else {
        flatList.push({
          PkProductId: p.PkProductId,
          PkProductColorId: null,
          MaterialName: p.MaterialName,
          ColorName: null,
          Size: null,
          MaterialRate: p.MaterialRate,
          cu_item_code: p.cu_item_code,
          CategoryName: p.CategoryName || null,
          UnitTitle: p.UnitTitle || null
        });
      }
    }

    if (search) {
      const q = search.toLowerCase();
      flatList = flatList.filter(item => 
        (item.MaterialName && item.MaterialName.toLowerCase().includes(q)) || 
        (item.CategoryName && item.CategoryName.toLowerCase().includes(q)) ||
        (item.ColorName && item.ColorName.toLowerCase().includes(q))
      );
    }

    return flatList;
  }

  // --------------------------------------------------------------------------
  // 4. MUTATION PROCEDURES (Upsert & Soft Delete)
  // --------------------------------------------------------------------------

  /**
   * Inserts a new product record.
   * @param {object} data - Internal field mapping.
   * @param {number} adminId - User ID of creator.
   */
  async create(data, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        0, // Insert mode
        data.FkProductCategoryId || 0,
        data.FkUnitId || 0,
        data.MaterialCode || null,
        data.MaterialName,
        data.cu_item_code || null,
        data.MaterialRate,
        data.MaterialDescription || null,
        adminId,
        1 // Active
      ]);
      return rows[0]?.[0];
    }

    const newProduct = {
      PkProductId: seedProducts.length + 1,
      ...data,
      IsActive: true,
      CreatedDate: new Date().toISOString()
    };
    seedProducts.push(newProduct);
    return newProduct;
  }

  /**
   * Updates an existing product record.
   */
  async update(id, data, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id,
        data.FkProductCategoryId || 0,
        data.FkUnitId || 0,
        data.MaterialCode || null,
        data.MaterialName,
        data.cu_item_code || null,
        data.MaterialRate,
        data.MaterialDescription || null,
        adminId,
        1
      ]);
      return rows[0]?.[0] || null;
    }

    const idx = seedProducts.findIndex(p => p.PkProductId.toString() === id.toString());
    if (idx === -1) return null;
    seedProducts[idx] = { ...seedProducts[idx], ...data };
    return seedProducts[idx];
  }

  // --------------------------------------------------------------------------
  // 5. COLOR MATRIX PROCEDURES
  // --------------------------------------------------------------------------

  /**
   * Retrieves all color/size matrix variations for a given product.
   * @param {number|string} productId - FkProductId.
   * @returns {Promise<Array>} List of color matrix records.
   */
  async getColorMatrix(productId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_color_matrix_get(?, ?)', [0, productId]);
      const allRows = rows[0] || [];
      // Defensive JS-side filter: SP pAction=0 may return all rows if
      // the WHERE clause for FkProductId is missing (known SP bug).
      return allRows.filter(
        r => String(r.FkProductId) === String(productId)
      );
    }

    return seedColorMatrix.filter(
      m => m.FkProductId.toString() === productId.toString() && m.IsActive
    );
  }

  /**
   * Retrieves ALL color/size matrix variations across all products.
   * Used by the flat-variation dropdown (Bug 4).
   * CALL prc_product_color_matrix_get(pAction=0, 0)
   * @returns {Promise<Array>} All color matrix records.
   */
  async getAllColorMatrix() {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_color_matrix_get(?, ?)', [0, 0]);
      return rows[0] || [];
    }
    return seedColorMatrix.filter(m => m.IsActive);
  }

  /**
   * Creates or updates a color/size matrix entry for a product.
   * @param {number} matrixId - PkProductColorId (0 = insert, >0 = update).
   * @param {number} productId - FkProductId.
   * @param {object} data - { FkLuColorId, MaterialRate, Size }.
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object>} The upserted matrix record.
   */
  async setColorMatrix(matrixId, productId, data, adminId, isActive = 1) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_color_matrix_set(?, ?, ?, ?, ?, ?, ?)', [
        matrixId || 0,
        productId,
        data.FkLuColorId,
        data.MaterialRate,
        data.Size,
        adminId,
        isActive
      ]);
      return rows[0]?.[0] || null;
    }

    // --- MOCK IN-MEMORY LOGIC ---
    if (matrixId && matrixId > 0) {
      const idx = seedColorMatrix.findIndex(m => m.PkProductColorId === matrixId);
      if (idx !== -1) {
        seedColorMatrix[idx] = { ...seedColorMatrix[idx], ...data, FkProductId: productId, IsActive: isActive };
        return seedColorMatrix[idx];
      }
      return null;
    }
    const newEntry = {
      PkProductColorId: seedColorMatrix.length + 1,
      FkProductId: productId,
      ...data,
      IsActive: isActive,
      CreatedDate: new Date().toISOString()
    };
    seedColorMatrix.push(newEntry);
    return newEntry;
  }

  // --------------------------------------------------------------------------
  // 6. SOFT DELETE
  // --------------------------------------------------------------------------

  /**
   * Soft-deletes a product by setting IsActive to 0.
   * Requires fetching current state to satisfy the full SP parameter list.
   */
  async delete(id, adminId) {
    const current = await this.findById(id);
    if (!current) return false;

    if (process.env.USE_MOCK_DB !== 'true') {
      await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id,
        current.FkProductCategoryId,
        current.FkUnitId,
        current.MaterialCode,
        current.MaterialName,
        current.cu_item_code,
        current.MaterialRate,
        current.MaterialDescription,
        adminId,
        0 // Soft Delete
      ]);
      return true;
    }

    const idx = seedProducts.findIndex(p => p.PkProductId.toString() === id.toString());
    if (idx !== -1) seedProducts[idx].IsActive = false;
    return true;
  }
}

export default new ProductRepository();
````

## File: package.json
````json
{
  "name": "sdcms-server",
  "version": "1.0.0",
  "type": "module",
  "description": "Node Backend server for the Smart Dispatch and Courier Management System",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "setup": "npm install",
    "clean": "rm -rf node_modules package-lock.json",
    "reinstall": "npm run clean && npm install",
    "check:env": "node -e \"If(!process.version.startsWith('v24')){console.error('!!! Use Node 24');process.exit(1)} else {console.log('Node Version OK')}\"",
    "start": "node src/server.js",
    "server": "nodemon --ext js,yaml src/server.js",
    "dev:mock": "USE_MOCK_DB=true nodemon --ext js,yaml src/server.js",
    "seed": "node src/infrastructure/database/seeders.js",
    "test": "jest",
    "test:e2e": "USE_MOCK_DB=true jest tests/e2e/mock_api.test.js",
    "docs": "node scripts/generate-api-docs.js"
  },
  "repository": {
    "type": "git",
    "url": "y"
  },
  "engines": {
    "node": ">= 24 <25",
    "npm": ">=11"
  },
  "author": "Aditya Bachawad",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "express-async-handler": "^1.2.0",
    "jsonwebtoken": "^9.0.3",
    "mysql2": "^3.20.0",
    "uuid": "^13.0.0",
    "yamljs": "^0.3.0",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "jest": "^30.3.0",
    "nodemon": "^3.1.14",
    "supertest": "^7.2.2"
  }
}
````

## File: src/modules/order/order.service.js
````javascript
// ============================================================================
// File: src/modules/order/order.service.js
// Description: Business logic layer for the Order module.
// Orchestrates Mode A (Self), Mode B (External), and Mode C (Combo) creation flows.
// Standardizes database results (PascalCase/camelCase) for the API contract.
// ============================================================================

import orderRepository from './order.repository.js';
import productRepository from '../product/product.repository.js';

class OrderService {
  /**
   * Orchestrates the creation of an order based on the identified Mode.
   * 
   * @param {object} payload - Zod-validated order payload.
   * @param {object} user - Authenticated user context from auth middleware.
   * @returns {Promise<object>} Created order aggregate or receiver array.
   */
  async createOrder(payload, user) {
    const { senderId, senderName, senderMobile, senderAddress, senderCity, senderState, senderPincode, courierId, products, receivers } = payload;
    const createdBy = user?.employeeCode || null;

    // Detect Modes:
    // Mode A: root products only.
    // Mode B: receivers only.
    // Mode C: both.
    const hasRootProducts = Array.isArray(products) && products.length > 0;
    const hasReceivers = Array.isArray(receivers) && receivers.length > 0;

    const ctx = { senderId, senderName, senderMobile, senderAddress, senderCity, senderState, senderPincode, courierId, products, receivers, hasRootProducts, hasReceivers, createdBy };

    if (process.env.USE_MOCK_DB !== 'true') {
      return this._createOrderLive(ctx);
    }

    return this._createOrderMock(ctx);
  }

  /**
   * Orchestration for LIVE database via managed repository transaction.
   * senderId is passed directly from the frontend dropdown (no find-or-create).
   * @private
   */
  async _createOrderLive(ctx) {
    // Step 1: Build sender context from payload (frontend already selected sender)
    const senderCtx = {
      address: ctx.senderAddress || null,
      city: ctx.senderCity || null,
      state: ctx.senderState || null,
      pincode: ctx.senderPincode || null
    };

    // Step 2: Unify root products and external receivers into a single array
    const normalizedReceivers = this._buildReceiversList(
      ctx.hasRootProducts, ctx.hasReceivers, ctx.products, ctx.receivers,
      ctx.senderName, ctx.senderMobile, senderCtx
    );

    // Step 3: Resolve pricing for items missing unitPrice (v2.3 fallback chain)
    await this._resolvePricing(normalizedReceivers);

    // Step 4: Build the aggregate graph for the repository
    const orderPayload = {
      senderId: ctx.senderId,
      senderName: ctx.senderName,
      senderMobile: ctx.senderMobile,
      senderAddress: ctx.senderAddress,
      courierId: ctx.courierId,
      totalAmount: this._calculateTotalAmount(normalizedReceivers),
      receivers: normalizedReceivers
    };

    // Repository handles the atomic transaction across 4 tables
    return orderRepository.createOrder(orderPayload, ctx.createdBy);
  }

  /**
   * Orchestration for MOCK mode via individual repository calls.
   * senderId is passed directly from the frontend dropdown (no find-or-create).
   * @private
   */
  async _createOrderMock(ctx) {
    // Step 1: Create Order Header (senderId already known from dropdown)
    const order = await orderRepository.createOrder({
      senderId: ctx.senderId,
      senderName: ctx.senderName,
      senderMobile: ctx.senderMobile,
      senderAddress: ctx.senderAddress,
      courierId: ctx.courierId
    }, ctx.createdBy);

    // Step 2: Build sender context from payload for Mode A synthetic receiver
    const senderCtx = {
      address: ctx.senderAddress || null,
      city: ctx.senderCity || null,
      state: ctx.senderState || null,
      pincode: ctx.senderPincode || null
    };

    // Step 3: Normalize receivers based on Mode A/B/C
    const receiversList = this._buildReceiversList(
      ctx.hasRootProducts, ctx.hasReceivers, ctx.products, ctx.receivers,
      ctx.senderName, ctx.senderMobile, senderCtx
    );

    // Step 4: Resolve pricing for items missing unitPrice (v2.3 fallback chain)
    await this._resolvePricing(receiversList);

    // Step 5: Iteratively build the mock graph (receivers -> items -> parcels)
    const aggregatedReceivers = await this._processMockReceivers(order.id, receiversList, ctx.courierId);

    return {
      ...order,
      receivers: aggregatedReceivers
    };
  }

  /**
   * Iterative processor for Mock mode creation.
   * @private
   */
  async _processMockReceivers(orderId, list, courierId) {
    const aggregated = [];
    for (const rec of list) {
      // 1 receiver record
      const recRecord = await orderRepository.createReceiver(orderId, rec);
      const items = [];
      // multiple items
      for (const prod of rec.products || []) {
        items.push(await orderRepository.createOrderItem(recRecord.id, prod.productId, prod.qty, prod.unitPrice));
      }
      // 1 parcel execution unit (standard)
      const parcel = await orderRepository.createParcel(recRecord.id, courierId);
      aggregated.push({ ...recRecord, items, parcel });
    }
    return aggregated;
  }

  /**
   * Pricing Hierarchy (v2.3):
   *   1. Explicit unitPrice from payload
   *   2. product_color_matrix.MaterialRate (if colorId + size specified)
   *   3. product_master.MaterialRate (catalog fallback)
   * Mutates the products array in-place to fill in resolved unitPrice.
   * @private
   */
  async _resolvePricing(receivers) {
    for (const rec of receivers) {
      for (const prod of (rec.products || [])) {
        if (prod.unitPrice != null && prod.unitPrice > 0) continue;

        // Try color matrix pricing if colorId + size provided
        if (prod.colorId && prod.size) {
          const matrix = await productRepository.getColorMatrix(prod.productId);
          const match = matrix.find(
            m => (m.FkLuColorId === prod.colorId || m.colorId === prod.colorId) &&
                 (m.Size === prod.size || m.size === prod.size)
          );
          if (match) {
            prod.unitPrice = match.MaterialRate || match.materialRate;
            continue;
          }
        }

        // Catalog fallback from product_master
        const product = await productRepository.findById(prod.productId);
        prod.unitPrice = product?.MaterialRate || product?.materialRate || 0;
      }
    }
  }

  /**
   * Business Logic: Calculate total order value across all items.
   * @private
   */
  _calculateTotalAmount(receivers) {
    return receivers.reduce((total, rec) => {
      return total + (rec.products || []).reduce((sub, p) => sub + (p.unitPrice || 0) * (p.qty || 0), 0);
    }, 0);
  }

  /**
   * Domain Logic: Resolves Order Modes into a unified receiver array.
   * Mode A: root products → synthetic receiver (self)
   * Mode B: external receivers → list of receivers
   * Mode C: both → synthetic receiver + external receivers
   * @private
   */
  _buildReceiversList(hasRoot, hasRecs, rootProds, recs, sName, sPhone, senderCtx) {
    const list = [];
    // If root products exist, the sender is also a receiver (Mode A/C)
    if (hasRoot) {
      list.push({
        receiverName: sName,
        receiverPhone: sPhone,
        address: senderCtx.address || null,
        city: senderCtx.city || null,
        state: senderCtx.state || null,
        pincode: senderCtx.pincode || null,
        products: rootProds
      });
    }
    // External receivers (Mode B/C)
    if (hasRecs) {
      list.push(...recs);
    }
    return list;
  }

  /**
   * Fetches paginated order summary list.
   * Standardizes response to the API Contract.
   */
  async getOrderSummaryList(filters) {
    const result = await orderRepository.findAllOrders(filters);
    return {
      data: result.data.map((o) => this._mapOrderSummary(o)),
      total: result.total
    };
  }

  /**
   * Fetches full aggregate graph for a single order.
   * Standardizes response to the API Contract.
   */
  async getOrderDetails(orderId) {
    const order = await orderRepository.findById(orderId);
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapOrderAggregate(order);
  }

  /**
   * Updates core order metadata before physical execution threshold.
   */
  async updateOrder(orderId, payload, user) {
    const adminId = user?.employeeCode || null;
    const result = await orderRepository.updateOrder(orderId, payload, adminId);
    if (!result) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapOrderSummary(result);
  }

  /**
   * Cancels entire order flow.
   */
  async cancelOrder(orderId, user) {
    const adminId = user?.employeeCode || null;
    const result = await orderRepository.cancelOrder(orderId, adminId);
    if (!result) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return result;
  }

  /**
   * Internal mapper for Order Summary objects.
   * Handles dual-case naming from Live DB vs Mock seeds.
   * @private
   */
  _mapOrderSummary(o) {
    return {
      id: o.PkOrderId || o.id,
      orderCode: o.OrderCode || o.orderCode,
      senderName: o.SenderName || o.senderName,
      senderMobile: o.SenderMobile || o.senderMobile,
      totalAmount: o.TotalAmount || o.totalAmount,
      derivedStatus: o.DerivedStatus || o.derivedStatus || 'Created',
      createdAt: o.CreatedAt || o.createdAt
    };
  }

  /**
   * Internal mapper for Order Aggregate objects.
   * Cascades through receivers, items, and parcels.
   * @private
   */
  _mapOrderAggregate(o) {
    return {
      ...this._mapOrderSummary(o),
      senderAddress: o.SenderAddress || o.senderAddress,
      courierId: o.FkCourierId || o.fkCourierId,
      receivers: (o.receivers || []).map((r) => ({
        id: r.PkReceiverDetailsId || r.id,
        receiverName: r.ReceiverName || r.receiverName,
        receiverPhone: r.ReceiverPhone || r.receiverPhone,
        address: r.Address || r.address,
        city: r.City || r.city,
        state: r.State || r.state,
        pincode: r.Pincode || r.pincode,
        parcel: r.parcel ? {
          id: r.parcel.PkParcelDetailsId || r.parcel.id,
          parcelId: r.parcel.ParcelID || r.parcel.parcel_id,
          status: r.parcel.ParcelStatus || r.parcel.parcelStatusCode || 'PENDING'
        } : null,
        products: (r.items || []).map((i) => ({
          productId: i.FkProductId || i.fkProductId,
          qty: i.OutwardQty || i.outwardQty,
          unitPrice: i.UnitPrice || i.unitPrice
        }))
      }))
    };
  }
}

export default new OrderService();
````

## File: src/modules/sender/sender.repository.js
````javascript
// ============================================================================
// File: src/modules/sender/sender.repository.js
// Description: Data access layer for Senders (Parties), using stored procedures.
//
// [INJECTION SITE] Repository Dependencies:
// - db: Centralized MySQL connection pool for executing stored procedures.
// - process.env.USE_MOCK_DB: Toggles between Live MySQL and In-Memory seed data.
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
let mockParties = [
  {
    PkPartyId: 1,
    PartyTypeId: 1, // 1 for Senders in DB
    CustomerName: 'John Doe',
    PhoneNo: '9876543210',
    EmailId: 'john@example.com',
    Address: '123 Test Street',
    City: 'Mumbai',
    State: 'Maharashtra',
    Pincode: '400001',
    IsActive: 1,
    CreatedDate: '2026-04-03T08:52:00Z'
  },
  {
    PkPartyId: 2,
    PartyTypeId: 1,
    CustomerName: 'Jane Smith',
    PhoneNo: '9876543211',
    EmailId: 'jane@example.com',
    Address: '456 Sample Road',
    City: 'Delhi',
    State: 'Delhi',
    Pincode: '110001',
    IsActive: 1,
    CreatedDate: '2026-04-03T08:52:00Z'
  }
];

let mockPartyDetails = [
  {
    PkPartyDetailsId: 1,
    FkPartyId: 1,
    PartyName: 'John Doe',
    PhoneNo: '9876543210',
    EmailId: 'john@example.com',
    Address: '123 Test Street',
    City: 'Mumbai',
    State: 'Maharashtra',
    Pincode: '400001',
    Country: 'India',
    IsActive: 1,
    IsDefault: 1,
    CreatedDate: '2026-04-03T08:52:00Z'
  }
];

class SenderRepository {
  /**
   * Checks if a phone number already exists for a different party.
   * @param {number|string} id - Current PkPartyId (0 for new).
   * @param {string} phone - Phone number to check.
   * @returns {Promise<number>} Count of duplicates found.
   */
  async checkDuplicate(id, phone) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_check_duplicate_Party_master(?, ?)', [id, phone]);
      return (rows?.[0]?.[0] ? Object.values(rows[0][0])[0] : 0);
    }
    return mockParties.filter(s => s.PhoneNo === phone && s.PkPartyId !== parseInt(id) && s.IsActive === 1).length;
  }

  /**
   * Retrieves all active parties of a specific type.
   * @param {number} partyTypeId - 1 for Sender, 2 for Receiver.
   * @returns {Promise<Array>} List of raw party records.
   */
  async findAll(partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // pAction=2: Get all parties filtered by FkPartyTypeId
      // Signature: prc_Party_master_get(pAction, pFkPartyTypeId, pPkPartyId)
      // pAction=0 has no type filter (WHERE commented out), so we use pAction=2
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [2, partyTypeId, 0]);
      return rows?.[0] || [];
    }
    return mockParties.filter(s => s.IsActive === 1 && (partyTypeId === null || s.PartyTypeId === partyTypeId));
  }

  /**
   * Retrieves a party by ID and type.
   * @param {number|string} id - PkPartyId.
   * @param {number} partyTypeId - Type filter.
   * @returns {Promise<object|null>} Party record or null.
   */
  async findById(id, partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // pAction=1: Get specific party by PkPartyId
      // Signature: prc_Party_master_get(pAction, pFkPartyTypeId, pPkPartyId)
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [1, partyTypeId ?? null, id]);
      return rows?.[0]?.[0] || null;
    }
    const match = mockParties.find(s => s.PkPartyId === parseInt(id) && s.IsActive === 1 && (partyTypeId === null || s.PartyTypeId === partyTypeId));
    return match || null;
  }

  /**
   * Creates a new Party record.
   * @param {object} data - Party master fields.
   * @param {number|string} adminId - PkEmployeeId of creator.
   * @param {number} partyTypeId - 1 (Sender) or 2 (Receiver).
   * @returns {Promise<object>} Created record.
   */
  async create(data, adminId, partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // Step 1: Create the party in Party_master (11 params)
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [0, partyTypeId, data.customerName, data.phoneNo, data.emailId || null, data.address, data.city, data.state, data.pincode, adminId, 1]
      );
      const party = rows?.[0]?.[0];

      // Step 2: Seed the default address record in party_details
      if (party && party.IsNewParty === 1) {
        await db.execute(
          'CALL prc_party_details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            0,                          // pPkPartyDetailsId=0 for insert
            party.PkPartyId,            // pFkPartyId
            data.emailId || null,       // pEmailId
            data.address || null,       // pAddress
            data.city || null,          // pCity
            data.state || null,         // pState
            data.pincode || null,       // pPincode
            'India',                    // pCountry
            1,                          // pIsDefault: 1 (primary address)
            adminId,                    // pCreatedBy
            1                           // pIsActive
          ]
        );
      }

      return party;
    }
    const newId = mockParties.length > 0 ? Math.max(...mockParties.map(s => s.PkPartyId)) + 1 : 1;
    const newSender = { PkPartyId: newId, PartyTypeId: partyTypeId, CustomerName: data.customerName, PhoneNo: data.phoneNo, EmailId: data.emailId || null, Address: data.address, City: data.city, State: data.state, Pincode: data.pincode, IsActive: 1, CreatedDate: new Date().toISOString() };
    mockParties.push(newSender);
    // Also seed the default address in mockPartyDetails
    const newDetailId = mockPartyDetails.length > 0 ? Math.max(...mockPartyDetails.map(d => d.PkPartyDetailsId)) + 1 : 1;
    mockPartyDetails.push({ PkPartyDetailsId: newDetailId, FkPartyId: newId, PartyName: data.customerName, PhoneNo: data.phoneNo, EmailId: data.emailId || null, Address: data.address, City: data.city, State: data.state, Pincode: data.pincode, Country: 'India', IsActive: 1, IsDefault: 1, CreatedDate: new Date().toISOString() });
    return newSender;
  }

  /**
   * Updates an existing Party record.
   * @param {number|string} id - PkPartyId.
   * @param {object} data - Fields to update.
   * @param {number|string} adminId - PkEmployeeId of modifier.
   * @param {number} partyTypeId - Type filter.
   * @returns {Promise<object>} Updated record.
   */
  async update(id, data, adminId, partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, partyTypeId, data.customerName, data.phoneNo, data.emailId || null, data.address, data.city, data.state, data.pincode, adminId, 1]
      );
      return rows?.[0]?.[0] || { PkPartyId: id, ...data };
    }
    const idx = mockParties.findIndex(s => s.PkPartyId === parseInt(id));
    if (idx === -1) return null;
    mockParties[idx] = { ...mockParties[idx], ...data };
    return mockParties[idx];
  }

  /**
   * Soft-deletes a Party record (IsActive=0).
   * @param {number|string} id - PkPartyId.
   * @param {number|string} adminId - PkEmployeeId of modifier.
   * @param {number} partyTypeId - Type filter.
   * @returns {Promise<object>} Deleted record summary.
   */
  async delete(id, adminId, partyTypeId) {
    const existing = await this.findById(id, partyTypeId);
    if (!existing) return null;
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, partyTypeId, existing.CustomerName, existing.PhoneNo, existing.EmailId, existing.Address, existing.City, existing.State, existing.Pincode, adminId, 0]
      );
      return rows?.[0]?.[0] || { ...existing, IsActive: 0 };
    }
    const idx = mockParties.findIndex(s => s.PkPartyId === parseInt(id));
    mockParties[idx].IsActive = 0;
    return mockParties[idx];
  }

  /**
   * Retrieves unique names for autocomplete.
   * @param {number|null} partyTypeId - Optional type filter.
   * @returns {Promise<Array<string>>}
   */
  async findAllNames(partyTypeId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // pAction=2: Fetch type-filtered parties, extract distinct names in JS
      // Signature: prc_Party_master_get(pAction, pFkPartyTypeId, pPkPartyId)
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [2, partyTypeId ?? null, 0]);
      const results = rows?.[0] || [];
      return [...new Set(results.map(r => r.CustomerName))];
    }
    let list = mockParties.filter(s => s.IsActive === 1);
    if (partyTypeId) list = list.filter(s => s.PartyTypeId === partyTypeId);
    return [...new Set(list.map(s => s.CustomerName))];
  }

  /**
   * Retrieves unique phones for autocomplete.
   * @param {number|null} partyTypeId - Optional type filter.
   * @returns {Promise<Array<string>>}
   */
  async findAllPhones(partyTypeId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // pAction=2: Fetch type-filtered parties, extract distinct phones in JS
      // Signature: prc_Party_master_get(pAction, pFkPartyTypeId, pPkPartyId)
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [2, partyTypeId ?? null, 0]);
      const results = rows?.[0] || [];
      return [...new Set(results.map(r => r.PhoneNo))];
    }
    let list = mockParties.filter(s => s.IsActive === 1);
    if (partyTypeId) list = list.filter(s => s.PartyTypeId === partyTypeId);
    return [...new Set(list.map(s => s.PhoneNo))];
  }

  /**
   * Partial name match for search suggestions.
   * @param {string} name - Partial query.
   * @param {number|null} partyTypeId - Type filter.
   * @returns {Promise<Array>}
   */
  async findByName(name, partyTypeId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // pAction=2: Fetch type-filtered parties, filter by name in JS
      // Signature: prc_Party_master_get(pAction, pFkPartyTypeId, pPkPartyId)
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [2, partyTypeId ?? null, 0]);
      const results = rows?.[0] || [];
      const q = name.toLowerCase();
      return results.filter(s => s.CustomerName && s.CustomerName.toLowerCase().includes(q));
    }
    const q = name.toLowerCase();
    let list = mockParties.filter(s => s.IsActive === 1 && s.CustomerName.toLowerCase().includes(q));
    if (partyTypeId) list = list.filter(s => s.PartyTypeId === partyTypeId);
    return list;
  }

  /**
   * Retrieves address book for a specific party.
   * @param {number|string} partyId - PkPartyId.
   * @returns {Promise<Array>}
   */
  async findAddressesByPartyId(partyId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // pAction=1: Get all addresses filtered by FkPartyId
      // Signature: prc_party_details_get(pAction, pLookupId)
      const [rows] = await db.execute('CALL prc_party_details_get(?, ?)', [1, partyId]);
      return rows?.[0] || [];
    }
    return mockPartyDetails.filter(d => d.FkPartyId === parseInt(partyId) && d.IsActive === 1);
  }

  /**
   * Creates a detailed address record (Address Book).
   * @param {number|string} partyId - Parent PkPartyId.
   * @param {object} data - Address details.
   * @param {object} user - Creator context.
   * @returns {Promise<object>}
   */
  async createPartyDetail(partyId, data, user) {
    const creator = user?.id || user?.employeeCode || null;
    if (process.env.USE_MOCK_DB !== 'true') {
      // Signature: prc_party_details_set(pPkPartyDetailsId, pFkPartyId, pEmailId, pAddress, pCity, pState, pPincode, pCountry, pIsDefault, pCreatedBy, pIsActive)
      const [rows] = await db.execute('CALL prc_party_details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [0, partyId, data.emailId, data.address, data.city, data.state, data.pincode, data.country, data.isDefault ? 1 : 0, creator, 1]);
      return rows?.[0]?.[0] || null;
    }
    const newId = mockPartyDetails.length > 0 ? Math.max(...mockPartyDetails.map(d => d.PkPartyDetailsId)) + 1 : 1;
    const newDet = { PkPartyDetailsId: newId, FkPartyId: parseInt(partyId), PartyName: data.partyName, PhoneNo: data.phoneNo, EmailId: data.emailId, Address: data.address, City: data.city, State: data.state, Pincode: data.pincode, Country: data.country || null, IsActive: 1, IsDefault: data.isDefault ? 1 : 0, CreatedDate: new Date().toISOString() };
    mockPartyDetails.push(newDet);
    return newDet;
  }
}

export default new SenderRepository();
````

## File: src/modules/sender/sender.service.js
````javascript
// ============================================================================
// File: src/modules/sender/sender.service.js
// Description: Business logic layer for Senders (Parties).
//
// [INJECTION SITE] Service Dependencies:
// - senderRepository: Handles all direct database / stored procedure interactions.
// - partyTypeId: Enforced as 1 for Senders and 2 for Receivers.
// ============================================================================

import senderRepository from './sender.repository.js';

class SenderService {
  /**
   * Internal mapper to standardize Party DB records to the camelCase API contract.
   * @param {object} sender - Raw database record from Party_master.
   * @returns {object} API-formatted sender object.
   */
  _mapToApi(sender) {
    if (!sender) return null;
    return {
      id: sender.PkPartyId,
      customerName: sender.CustomerName,
      phoneNo: sender.PhoneNo,
      emailId: sender.EmailId || null,
      address: sender.Address || null,
      city: sender.City || null,
      state: sender.State || null,
      pincode: sender.Pincode || null,
      isActive: sender.IsActive === 1 || sender.IsActive === true,
      createdAt: sender.CreatedDate
    };
  }

  /**
   * Internal mapper for Address Book entries.
   * @param {object} detail - Raw database record from Party_Details.
   * @returns {object} API-formatted address object.
   */
  _mapAddressToApi(detail) {
    if (!detail) return null;
    return {
      id: detail.PkPartyDetailsId,
      partyId: detail.FkPartyId,
      customerName: detail.CustomerName || null,
      emailId: detail.EmailId || null,
      address: detail.Address,
      city: detail.City,
      state: detail.State,
      pincode: detail.Pincode,
      country: detail.Country || null,
      isDefault: detail.IsDefault === 1 || detail.IsDefault === true,
      isActive: detail.IsActive === 1 || detail.IsActive === true,
      createdAt: detail.CreatedDate
    };
  }

  /**
   * Retrieves all active senders (PartyTypeId=1).
   * @returns {Promise<Array<object>>} List of senders in API format.
   */
  async getSenders() {
    const senders = await senderRepository.findAll(1);
    return senders.map(s => this._mapToApi(s));
  }

  /**
   * Retrieves a specific sender by ID.
   * @param {number|string} id - PkPartyId.
   * @returns {Promise<object>} API-formatted sender object.
   * @throws {Error} 404 if sender not found or is not a sender type.
   */
  async getSenderById(id) {
    const sender = await senderRepository.findById(id, 1);
    if (!sender) {
      const error = new Error('Sender not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(sender);
  }

  /**
   * Creates a new sender after uniqueness validation.
   * @param {object} senderData - Payload from client.
   * @param {object} user - Authenticated user context.
   * @returns {Promise<object>} Created sender in API format.
   * @throws {Error} 409 if phone number is duplicated.
   */
  async createSender(senderData, user) {
    const count = await senderRepository.checkDuplicate(0, senderData.phoneNo);
    if (count > 0) {
      const error = new Error('Sender phone number already exists');
      error.statusCode = 409;
      throw error;
    }
    const adminId = user?.id || user?.employeeCode || 1;
    const result = await senderRepository.create(senderData, adminId, 1);
    return this._mapToApi(result);
  }

  /**
   * Updates sender details with conditional duplicate checking.
   * @param {number|string} id - PkPartyId.
   * @param {object} senderData - Partial updates.
   * @param {object} user - Authenticated user context.
   * @returns {Promise<object>} Updated sender.
   */
  async updateSender(id, senderData, user) {
    const existing = await this.getSenderById(id);
    if (senderData.phoneNo && senderData.phoneNo !== existing.phoneNo) {
      const count = await senderRepository.checkDuplicate(id, senderData.phoneNo);
      if (count > 0) {
        const error = new Error('Sender phone number already exists');
        error.statusCode = 409;
        throw error;
      }
    }
    const adminId = user?.id || user?.employeeCode || 1;
    const result = await senderRepository.update(id, { ...existing, ...senderData }, adminId, 1);
    return this._mapToApi(result);
  }

  /**
   * Performs soft-delete by deactivating the Party record.
   * @param {number|string} id - PkPartyId.
   * @param {object} user - Authenticated user context.
   * @returns {Promise<boolean>} True on success.
   */
  async deleteSender(id, user) {
    await this.getSenderById(id);
    const adminId = user?.id || user?.employeeCode || 1;
    await senderRepository.delete(id, adminId, 1);
    return true;
  }

  /**
   * Auto-fill lookup using phone number as unique key.
   * @param {string} phone - Target phone number.
   * @returns {Promise<object>} Matching sender.
   */
  async lookupByPhone(phone, partyTypeId) {
    if (!phone) {
      const error = new Error('Phone number is required for lookup');
      error.statusCode = 400;
      throw error;
    }
    const senders = await senderRepository.findAll(partyTypeId);
    const sender = senders.find(s => s.PhoneNo === phone);
    if (!sender) {
      const error = new Error(`No sender found for phone: ${phone}`);
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(sender);
  }

  /**
   * Autocomplete lookup for party names.
   * @param {number|null} [partyTypeId=null] - Optional filter.
   * @returns {Promise<Array<string>>}
   */
  async getAllSenderNames(partyTypeId = null) {
    const typeId = partyTypeId === 1 ? 1 : partyTypeId === 2 ? 2 : partyTypeId;
    return await senderRepository.findAllNames(typeId);
  }

  /**
   * Autocomplete lookup for phone numbers.
   * @param {number|null} [partyTypeId=null] - Optional filter.
   * @returns {Promise<Array<string>>}
   */
  async getAllPhoneNumbers(partyTypeId = null) {
    const typeId = partyTypeId === 1 ? 1 : partyTypeId === 2 ? 2 : partyTypeId;
    return await senderRepository.findAllPhones(typeId);
  }

  /**
   * Search parties by name prefix/partial.
   * @param {string} name - Partial name.
   * @param {number|null} [partyTypeId=null] - Optional filter.
   * @returns {Promise<Array<object>>}
   */
  async lookupByName(name, partyTypeId = null) {
    if (!name) {
      const error = new Error('Name query parameter is required for lookup');
      error.statusCode = 400;
      throw error;
    }
    const typeId = partyTypeId === 1 ? 1 : partyTypeId === 2 ? 2 : partyTypeId;
    const parties = await senderRepository.findByName(name, typeId);
    return parties.map((s) => this._mapToApi(s));
  }

  /**
   * Retrieves all secondary addresses from the Address Book.
   * @param {number|string} partyId - PkPartyId.
   * @returns {Promise<Array<object>>} API-formatted addresses.
   */
  async getAddressesByPartyId(partyId) {
    const addresses = await senderRepository.findAddressesByPartyId(partyId);
    return addresses.map((d) => this._mapAddressToApi(d));
  }

  /**
   * Adds a new entry to the Party's Address Book.
   * @param {number|string} partyId - Parent Party ID.
   * @param {object} data - Address fields.
   * @param {object} user - Creator context.
   * @returns {Promise<object>} Created address object.
   */
  async createAddress(partyId, data, user) {
    const party = await senderRepository.findById(partyId, null);
    if (!party) {
      const error = new Error('Party not found');
      error.statusCode = 404;
      throw error;
    }
    const payload = {
      emailId: party.EmailId,
      address: data.address, city: data.city, state: data.state, pincode: data.pincode,
      country: data.country || 'India', isDefault: data.isDefault
    };
    const result = await senderRepository.createPartyDetail(partyId, payload, user);
    return this._mapAddressToApi(result);
  }
}

export default new SenderService();
````

## File: tests/e2e/mock_api.test.js
````javascript
// ============================================================================
// File: tests/e2e/mock_api.test.js
// Description: End-to-End mock-mode test suite for SDCMS Backend.
// Environment: USE_MOCK_DB=true (no live MySQL required).
// Framework: Jest + Supertest
// Targets: Auth (Login/Profile), System (Health), Master Data (Products,
//          Employees, Couriers), Orders, Parcel Lifecycle.
// ============================================================================

import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import jwt from 'jsonwebtoken';

// ============================================================================
// ENV SETUP — Must be set BEFORE dynamic import of app
// ============================================================================
process.env.USE_MOCK_DB = 'true';
process.env.JWT_SECRET = 'e2e-test-secret-key-sdcms-2026';
process.env.JWT_EXPIRES_IN = '1h';
process.env.NODE_ENV = 'test';

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Generate a JWT directly (bypasses login API for isolated endpoint testing).
 * Uses the same signing logic as shared/utils/generateToken.js.
 *
 * @param {number} employeeCode - EmployeeCode to encode in the token.
 * @returns {string} Signed JWT.
 */
const generateTestToken = (employeeCode) =>
  jwt.sign({ id: employeeCode }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

// Pre-generated tokens matching mock seed EmployeeCodes:
//   EmployeeCode 1 = Admin User   (RoleCode: ADMIN)
//   EmployeeCode 2 = Test Operator (RoleCode: OPERATOR)
//   EmployeeCode 3 = Test Courier  (RoleCode: COURIER)
const ADMIN_TOKEN = generateTestToken(1);
const OPERATOR_TOKEN = generateTestToken(2);
const COURIER_TOKEN = generateTestToken(3);

// Token for a non-existent employee (for 401 tests)
const INVALID_USER_TOKEN = generateTestToken(99999);

// ============================================================================
// APP IMPORT (dynamic — env vars must be set first)
// ============================================================================
let app;

beforeAll(async () => {
  const module = await import('../../src/app.js');
  app = module.default;
});

// ============================================================================
// ██████ 1. SYSTEM HEALTH ██████
// ============================================================================
describe('1. System Health', () => {
  it.skip('1.1  GET /api/v1/system/health → 200 with status UP (skipped: checks live DB connection)', async () => {
    const res = await request(app).get('/api/v1/system/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.status).toBe('UP');
  });

  it('1.2  GET /api/v1/nonexistent → 404 from notFound middleware', async () => {
    const res = await request(app).get('/api/v1/nonexistent');

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 2. AUTH — LOGIN ██████
// ============================================================================
describe('2. Auth — Login', () => {
  it('2.1  POST /api/v1/auth/login → 200 with valid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@example.com', password: 'securePass123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.email).toBe('admin@example.com');
  });

  it('2.2  POST /api/v1/auth/login → 401 with wrong password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@example.com', password: 'wrongPassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('2.3  POST /api/v1/auth/login → 400 with missing password (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@example.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('2.4  POST /api/v1/auth/login → 401 with non-existent email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nobody@example.com', password: 'anyPassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 3. AUTH — PROFILE ██████
// ============================================================================
describe('3. Auth — Profile', () => {
  it('3.1  GET /api/v1/auth/profile → 401 without token', async () => {
    const res = await request(app).get('/api/v1/auth/profile');

    expect(res.statusCode).toBe(401);
  });

  it('3.2  GET /api/v1/auth/profile → 200 with valid ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('3.3  GET /api/v1/auth/profile → 401 with token for non-existent user', async () => {
    const res = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${INVALID_USER_TOKEN}`);

    expect(res.statusCode).toBe(401);
  });
});

// ============================================================================
// ██████ 4. MASTER DATA — PRODUCTS ██████
// ============================================================================
describe('4. Products CRUD', () => {
  it('4.1  GET /api/v1/products → 200 with list', async () => {
    const res = await request(app)
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('4.2  POST /api/v1/products → 201 creates a new product', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ materialName: 'Test Widget', materialRate: 99.99, categoryId: 1, unitId: 1 });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.materialName).toBe('Test Widget');
  });

  it('4.3  GET /api/v1/products/1 → 200 gets product by ID', async () => {
    const res = await request(app)
      .get('/api/v1/products/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('4.4  GET /api/v1/products → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });

  it('4.5  GET /api/v1/products/99999 → 404 on non-existent product', async () => {
    const res = await request(app)
      .get('/api/v1/products/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('4.6  POST /api/v1/products → 400 with missing materialName (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('4.7  PUT /api/v1/products/1 → 200 updates product', async () => {
    const res = await request(app)
      .put('/api/v1/products/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ materialName: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.materialName).toBe('Updated');
  });

  it('4.8  DELETE /api/v1/products/3 → 200 soft-deletes product', async () => {
    const res = await request(app)
      .delete('/api/v1/products/3')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('4.9  GET /api/v1/products/dropdown → 200 returns dropdown list', async () => {
    const res = await request(app)
      .get('/api/v1/products/dropdown')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toHaveProperty('label');
    }
  });

  it('4.10 POST /api/v1/products → 409 on duplicate product', async () => {
    // Create a product
    await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ materialName: 'Duplicate Test', materialRate: 10, categoryId: 1 });

    // Try to create it again
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ materialName: 'Duplicate Test', materialRate: 10, categoryId: 1 });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('already exists');
  });

  it('4.11 POST /api/v1/products/1/matrix → 201 creates a color variation', async () => {
    const res = await request(app)
      .post('/api/v1/products/1/matrix')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ fkLuColorId: 3, materialRate: 600, size: 'XL' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.size).toBe('XL');
    expect(res.body.data.materialRate).toBe(600);
  });

  it('4.12 GET /api/v1/products/1 → 200 includes variations array', async () => {
    const res = await request(app)
      .get('/api/v1/products/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.variations).toBeInstanceOf(Array);
    expect(res.body.data.variations.length).toBeGreaterThan(0);
  });

  it('4.13 POST /api/v1/products/1/matrix → 200 updates existing variation', async () => {
    const res = await request(app)
      .post('/api/v1/products/1/matrix')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ fkLuColorId: 1, materialRate: 575, size: 'M', matrixId: 1 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.materialRate).toBe(575);
  });

  it('4.14 POST /api/v1/products/1/matrix → 400 with missing fields (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/products/1/matrix')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('4.15 POST /api/v1/products/99999/matrix → 404 on non-existent product', async () => {
    const res = await request(app)
      .post('/api/v1/products/99999/matrix')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ fkLuColorId: 1, materialRate: 100, size: 'S' });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 5. MASTER DATA — EMPLOYEES ██████
// ============================================================================
describe('5. Employees', () => {
  it('5.1  GET /api/v1/employees → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('5.2  GET /api/v1/employees/1 → 200 gets employee by ID', async () => {
    const res = await request(app)
      .get('/api/v1/employees/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('5.3  GET /api/v1/employees → 403 with OPERATOR token (ADMIN only)', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${OPERATOR_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });

  it('5.4  GET /api/v1/employees → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });

  it('5.5  GET /api/v1/employees/99999 → 404 on non-existent employee', async () => {
    const res = await request(app)
      .get('/api/v1/employees/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('5.6  POST /api/v1/employees → 201 creates a new employee', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ name: 'New Emp', role: 'OPERATOR', email: 'newemp@example.com', password: 'Test123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('5.7  POST /api/v1/employees → 400 with missing name (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ role: 'OPERATOR', email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('5.8  POST /api/v1/employees → 403 with OPERATOR token', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${OPERATOR_TOKEN}`)
      .send({ name: 'New Emp', role: 'OPERATOR', email: 'test2@example.com', password: 'password123' });

    expect(res.statusCode).toBe(403);
  });

  it('5.9  PUT /api/v1/employees/1 → 200 updates employee', async () => {
    const res = await request(app)
      .put('/api/v1/employees/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ name: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('5.10 PATCH /api/v1/employees/1/toggle-access → 200 toggles access', async () => {
    const res = await request(app)
      .patch('/api/v1/employees/1/toggle-access')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ allowLogin: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('5.11 PATCH /api/v1/employees/1/toggle-access → 400 with missing allowLogin (Zod)', async () => {
    const res = await request(app)
      .patch('/api/v1/employees/1/toggle-access')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });
});

// ============================================================================
// ██████ 6. MASTER DATA — COURIERS ██████
// ============================================================================
describe('6. Couriers', () => {
  it('6.1  GET /api/v1/courier-partners → 200 with authenticated token', async () => {
    const res = await request(app)
      .get('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('6.2  POST /api/v1/courier-partners → 201 creates a new courier', async () => {
    const res = await request(app)
      .post('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        courierName: 'TestCourier Express',
        trackingUrlTemplate: 'https://track.testcourier.com/awb/{AWB}',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('6.3  GET /api/v1/courier-partners/1 → 200 gets courier by ID', async () => {
    const res = await request(app)
      .get('/api/v1/courier-partners/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('6.4  GET /api/v1/courier-partners/99999 → 404 on non-existent courier', async () => {
    const res = await request(app)
      .get('/api/v1/courier-partners/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('6.5  PUT /api/v1/courier-partners/1 → 200 updates courier', async () => {
    const res = await request(app)
      .put('/api/v1/courier-partners/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ courierName: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('6.6  DELETE /api/v1/courier-partners/2 → 200 deletes courier', async () => {
    const res = await request(app)
      .delete('/api/v1/courier-partners/2')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('6.7  POST /api/v1/courier-partners → 403 with COURIER token', async () => {
    const res = await request(app)
      .post('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`)
      .send({
        courierName: 'TestCourier Express',
        trackingUrlTemplate: 'https://track.testcourier.com/awb/{AWB}',
      });

    expect(res.statusCode).toBe(403);
  });

  it('6.8  GET /api/v1/courier-partners → 403 with COURIER token (read not allowed)', async () => {
    const res = await request(app)
      .get('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });

  it('6.9  POST /api/v1/courier-partners → 409 on duplicate courier name', async () => {
    const res = await request(app)
      .post('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        courierName: 'Updated', // Changed from Delhivery in 6.5
        trackingUrlTemplate: 'https://track.test.com/awb/{AWB}',
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Courier name already exists');
  });
});

// ============================================================================
// ██████ 7. ORDERS ██████
// ============================================================================
describe('7. Orders', () => {
  it('7.1  GET /api/v1/orders → 200 with paginated list', async () => {
    const res = await request(app)
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('7.2  POST /api/v1/orders → 201 creates a new order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        senderId: 1,
        senderName: 'E2E Test Sender',
        senderMobile: '9000000001',
        courierId: 1,
        receivers: [
          {
            receiverName: 'E2E Test Receiver',
            receiverPhone: '9000000002',
            addressLine1: '1 Test Street',
            city: 'TestCity',
            state: 'TestState',
            pincode: '100001',
            products: [{ productId: 1, qty: 2, unitPrice: 100 }],
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('7.3  GET /api/v1/orders/1 → 200 gets order aggregate by ID', async () => {
    const res = await request(app)
      .get('/api/v1/orders/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('7.4  GET /api/v1/orders → 401 without token', async () => {
    const res = await request(app).get('/api/v1/orders');

    expect(res.statusCode).toBe(401);
  });

  it('7.5  POST /api/v1/orders → 400 with missing required fields (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ courierId: 1 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('7.6  PUT /api/v1/orders/1 → 200 updates order', async () => {
    const res = await request(app)
      .put('/api/v1/orders/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ senderName: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('7.7  POST /api/v1/orders → 403 with COURIER token', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`)
      .send({
        senderId: 1,
        senderName: 'E2E Test Sender',
        senderMobile: '9000000001',
        courierId: 1,
        receivers: [
          {
            receiverName: 'E2E Test Receiver',
            receiverPhone: '9000000002',
            address: '1 Test Street',
            city: 'TestCity',
            state: 'TestState',
            pincode: '100001',
            products: [{ productId: 1, qty: 2, unitPrice: 100 }],
          },
        ],
      });

    expect(res.statusCode).toBe(403);
  });

  it('7.8  POST /api/v1/orders (Mode A) → 201 creates sender-to-self order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        senderId: 1,
        senderName: 'Mode A Sender',
        senderMobile: '9111111111',
        senderAddress: '14, Gandhi Nagar, Near Railway Station',
        senderCity: 'Surat',
        senderState: 'Gujarat',
        senderPincode: '395002',
        courierId: 1,
        products: [{ productId: 1, qty: 10, unitPrice: 500 }],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.receivers).toHaveLength(1);
    expect(res.body.data.receivers[0].receiverName).toBe('Mode A Sender');
  });

  it('7.9  POST /api/v1/orders (Mode C) → 201 creates combo order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        senderId: 1,
        senderName: 'Mode C Sender',
        senderMobile: '9222222222',
        senderAddress: '14, Gandhi Nagar, Near Railway Station',
        senderCity: 'Surat',
        senderState: 'Gujarat',
        senderPincode: '395002',
        courierId: 1,
        products: [{ productId: 1, qty: 5, unitPrice: 500 }],
        receivers: [
          {
            receiverName: 'External Receiver',
            receiverPhone: '9333333333',
            address: 'Ext Addr',
            city: 'City',
            state: 'State',
            pincode: '123456',
            products: [{ productId: 1, qty: 2, unitPrice: 500 }],
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    // Mode C should have 2 receivers: 1 synthetic + 1 external
    expect(res.body.data.receivers).toHaveLength(2);
  });

  it('7.10 PATCH /api/v1/orders/:id/cancel (Fresh) → 200 succeeds for pending parcels', async () => {
    // First create a fresh order
    const createRes = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        senderId: 1,
        senderName: 'Cancel Test',
        senderMobile: '9444444444',
        courierId: 1,
        products: [{ productId: 1, qty: 1 }],
      });

    const orderId = createRes.body.data.orderId || createRes.body.data.id;

    const res = await request(app)
      .patch(`/api/v1/orders/${orderId}/cancel`)
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('7.11 GET /api/v1/orders → 200 succeeds with COURIER token (read-only)', async () => {
    const res = await request(app)
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ============================================================================
// ██████ 7B. ORDER CANCEL (runs after parcel lifecycle) ██████
// Parcel 1 is DELIVERED after section 9 → cancellation blocked.
// ============================================================================

// ============================================================================
// ██████ 8. PARCELS — READ ██████
// ============================================================================
describe('8. Parcels — Read', () => {
  it('8.1  GET /api/v1/parcels → 200 with paginated list', async () => {
    const res = await request(app)
      .get('/api/v1/parcels')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('8.2  GET /api/v1/parcels/1 → 200 gets parcel by ID', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('8.3  GET /api/v1/parcels/1/label-data → 200 gets label data', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/1/label-data')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('8.4  GET /api/v1/parcels/1/timeline → 200 gets event timeline', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/1/timeline')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('8.5  GET /api/v1/parcels/99999 → 404 on non-existent parcel', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
  });
});

// ============================================================================
// ██████ 9. PARCELS — LIFECYCLE (State Transitions) ██████
// Exercises the full state machine:
//   PENDING → LABEL_PRINTED → AWB_LINKED → DISPATCHED → DELIVERED
// Uses seed parcel ID 1 (PDS-A1B2C3, status: PENDING)
// ============================================================================
describe('9. Parcels — Lifecycle', () => {
  it('9.1  POST /api/v1/parcels/1/log-print → 200 transitions to LABEL_PRINTED', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/1/log-print')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    // Verify the status changed
    if (res.body.data) {
      expect(res.body.data.status).toBe('LABEL_PRINTED');
    }
  });

  it('9.2  POST /api/v1/parcels/scan → 200 links AWB to LABEL_PRINTED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        qrCode: 'PDS-A1B2C3',     // seed parcel_id for parcel 1
        awbNumber: 'AWB-E2E-001',  // unique AWB
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('9.3  POST /api/v1/parcels/dispatch → 200 dispatches AWB_LINKED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [1] });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('9.4  PATCH /api/v1/parcels/1/deliver → 200 marks as DELIVERED', async () => {
    const res = await request(app)
      .patch('/api/v1/parcels/1/deliver')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ============================================================================
// ██████ 7B. ORDER CANCEL — post-lifecycle ██████
// Parcel 1 is now DELIVERED → TERMINAL_BLOCKING prevents order cancel.
// ============================================================================
describe('7B. Order Cancel — post-lifecycle', () => {
  it('7B.1 PATCH /api/v1/orders/1/cancel → 400 (parcels past cancellation threshold)', async () => {
    const res = await request(app)
      .patch('/api/v1/orders/1/cancel')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 10. PARCELS — VALIDATION / NEGATIVE PATHS ██████
// ============================================================================
describe('10. Parcels — Validation', () => {
  it('10.1 POST /api/v1/parcels/scan → 400 with missing qrCode (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ awbNumber: 'AWB-ZZZ' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('10.2 POST /api/v1/parcels/dispatch → 400 with empty parcelIds', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // Parcel 2 is still PENDING — cannot dispatch without AWB
  it('10.3 POST /api/v1/parcels/dispatch → 400 dispatching PENDING parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [2] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // Parcel 1 is DELIVERED after section 9 — cancel is blocked for terminal states
  it('10.4 PATCH /api/v1/parcels/1/cancel → 400 (parcel is DELIVERED, terminal)', async () => {
    const res = await request(app)
      .patch('/api/v1/parcels/1/cancel')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 17. PARCELS — LIFECYCLE VIA PARCEL 2 ██████
// Uses parcel 2 (PDS-D4E5F6) which starts PENDING
// ============================================================================
describe('17. Parcels — Lifecycle via Parcel 2', () => {
  it('17.1 POST /api/v1/parcels/2/log-print → 200 transitions to LABEL_PRINTED', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/2/log-print')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    if (res.body.data) {
      expect(res.body.data.status).toBe('LABEL_PRINTED');
    }
  });

  it('17.2 POST /api/v1/parcels/scan → 200 links AWB to LABEL_PRINTED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        qrCode: 'PDS-D4E5F6',
        awbNumber: 'AWB-E2E-002',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('17.3 POST /api/v1/parcels/dispatch → 200 dispatches AWB_LINKED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [2] });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('17.4 PATCH /api/v1/parcels/2/return → 200 marks as RETURNED', async () => {
    const res = await request(app)
      .patch('/api/v1/parcels/2/return')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    if (res.body.data) {
      expect(res.body.data.status).toBe('RETURNED');
    }
  });
});

// ============================================================================
// ██████ 18. PARCELS — NEGATIVE & EDGE CASES ██████
// ============================================================================
describe('18. Parcels — Negative & Edge Cases', () => {
  it('18.1 POST /api/v1/parcels/scan → 404 with non-existent QR code', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ qrCode: 'NONEXISTENT', awbNumber: 'AWB-X' });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('18.2 POST /api/v1/parcels/scan → 400 with missing qrCode (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ awbNumber: 'AWB-X' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('18.3 POST /api/v1/parcels/dispatch → 400 with empty parcelIds (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('18.4 POST /api/v1/parcels/dispatch → 400 dispatching RETURNED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [2] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('18.5 PATCH /api/v1/parcels/2/deliver → 400 (parcel is RETURNED, terminal)', async () => {
    const res = await request(app)
      .patch('/api/v1/parcels/2/deliver')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 11. MASTER DATA — SENDERS (ADMIN, OPERATOR) ██████
// ============================================================================
describe('11. Senders', () => {
  it('11.1 GET /api/v1/senders → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/senders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.2 POST /api/v1/senders → 201 creates a new sender', async () => {
    const res = await request(app)
      .post('/api/v1/senders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        customerName: 'Test Co',
        phoneNo: '9999999999',
        address: '1 St',
        city: 'C',
        state: 'S',
        pincode: '100001'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('11.3 POST /api/v1/senders → 400 with missing required fields (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/senders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ customerName: 'Test' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('11.4 GET /api/v1/senders/1 → 200 gets sender by ID', async () => {
    const res = await request(app)
      .get('/api/v1/senders/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('11.5 GET /api/v1/senders/99999 → 404 on non-existent sender', async () => {
    const res = await request(app)
      .get('/api/v1/senders/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('11.6 GET /api/v1/senders/lookup?phone=9876543210 → 200 finds sender by phone', async () => {
    const res = await request(app)
      .get('/api/v1/senders/lookup?phone=9876543210')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('11.7 GET /api/v1/senders/lookup?phone=0000000000 → 404 for unknown phone', async () => {
    const res = await request(app)
      .get('/api/v1/senders/lookup?phone=0000000000')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('11.8 GET /api/v1/senders/names → 200 returns array of names', async () => {
    const res = await request(app)
      .get('/api/v1/senders/names')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.9 GET /api/v1/senders/phones → 200 returns array of phones', async () => {
    const res = await request(app)
      .get('/api/v1/senders/phones')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.10 GET /api/v1/senders/lookup-by-name?name=John → 200 returns array', async () => {
    const res = await request(app)
      .get('/api/v1/senders/lookup-by-name?name=John')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.11 PUT /api/v1/senders/1 → 200 updates sender', async () => {
    const res = await request(app)
      .put('/api/v1/senders/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ customerName: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('11.12 POST /api/v1/senders → 409 on duplicate phone number', async () => {
    const res = await request(app)
      .post('/api/v1/senders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        customerName: 'Duplicate Phone Inc',
        phoneNo: '9876543210', // Exists in seed data
        address: 'Test Addr',
        city: 'City',
        state: 'State',
        pincode: '123456'
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Sender phone number already exists');
  });

  it('11.13 PUT /api/v1/senders/2 → 409 when updating to an existing phone number', async () => {
    const res = await request(app)
      .put('/api/v1/senders/2')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        phoneNo: '9876543210' // Phone of sender 1
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Sender phone number already exists');
  });

  it('11.14 DELETE /api/v1/senders/2 → 200 deletes sender', async () => {
    const res = await request(app)
      .delete('/api/v1/senders/2')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('11.15 GET /api/v1/senders/1/addresses → 200 returns addresses', async () => {
    const res = await request(app)
      .get('/api/v1/senders/1/addresses')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.16 POST /api/v1/senders/1/addresses → 201 creates address', async () => {
    const res = await request(app)
      .post('/api/v1/senders/1/addresses')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        address: '1 St',
        city: 'C',
        state: 'S',
        pincode: '100001'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('11.17 POST /api/v1/senders/1/addresses → 400 with missing required fields (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/senders/1/addresses')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });
});

// ============================================================================
// ██████ 12. MASTER DATA — RECEIVERS (ADMIN, OPERATOR) ██████
// ============================================================================
describe('12. Receivers', () => {
  it('12.1 GET /api/v1/receivers/names → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/receivers/names')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('12.2 GET /api/v1/receivers/phones → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/receivers/phones')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('12.3 GET /api/v1/receivers/lookup-by-name?name=Receiver → 200 returns array', async () => {
    const res = await request(app)
      .get('/api/v1/receivers/lookup-by-name?name=Receiver')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('12.4 GET /api/v1/receivers/names → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/receivers/names')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });
});

// ============================================================================
// ██████ 13. PARCEL EVENTS (ADMIN, OPERATOR) ██████
// ============================================================================
describe('13. Parcel Events', () => {
  it('13.1 GET /api/v1/parcel-events → 200 with paginated list', async () => {
    const res = await request(app)
      .get('/api/v1/parcel-events')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.meta).toBeDefined();
    expect(res.body.meta).toHaveProperty('totalRows');
  });

  it('13.2 GET /api/v1/parcel-events/export → 200 returns CSV', async () => {
    const res = await request(app)
      .get('/api/v1/parcel-events/export')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/csv/);
    expect(typeof res.text).toBe('string');
    expect(res.text).toContain('EventID,');
  });

  it('13.3 GET /api/v1/parcel-events → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/parcel-events')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });
});

// ============================================================================
// ██████ 14. DASHBOARD (ADMIN only) ██████
// ============================================================================
describe('14. Dashboard', () => {
  it('14.1 GET /api/v1/dashboard/metrics → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/metrics')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data).toHaveProperty('TotalOrders');
    expect(res.body.data).toHaveProperty('totalOrders');
    expect(res.body.data).toHaveProperty('parcelsByStatus');
    expect(res.body.data.parcelsByStatus).toHaveProperty('PENDING');
    expect(res.body.data.TotalOrders).toBe(150);
    expect(res.body.data.totalOrders).toBe(150);
  });

  it('14.2 GET /api/v1/dashboard/metrics → 403 with OPERATOR token', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/metrics')
      .set('Authorization', `Bearer ${OPERATOR_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });

  it('14.3 GET /api/v1/dashboard/metrics → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/metrics')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });
});

// ============================================================================
// ██████ 15. BULK UPLOAD (ADMIN, OPERATOR) ██████
// ============================================================================
describe('15. Bulk Upload', () => {
  it('15.1 POST /api/v1/bulk-uploads → 201 creates bulk upload session', async () => {
    const res = await request(app)
      .post('/api/v1/bulk-uploads')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        rows: [{
          senderId: 1,
          senderName: 'Bulk Sender',
          senderMobile: '9000000099',
          courierId: 1,
          receivers: [{
            receiverName: 'Bulk Receiver',
            receiverPhone: '9000000098',
            products: [{ productId: 1, qty: 1, unitPrice: 100 }]
          }]
        }]
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.sessionId).toBeDefined();
  });

  it('15.2 POST /api/v1/bulk-uploads → 400 with empty rows (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/bulk-uploads')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ rows: [] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('15.3 GET /api/v1/bulk-uploads → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/bulk-uploads')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('15.4 GET /api/v1/bulk-uploads/1 → 200 gets session by ID', async () => {
    const res = await request(app)
      .get('/api/v1/bulk-uploads/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.session).toBeDefined();
  });

  it('15.5 GET /api/v1/bulk-uploads/99999 → 404 on non-existent session', async () => {
    const res = await request(app)
      .get('/api/v1/bulk-uploads/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('15.6 POST /api/v1/bulk-uploads → 403 with COURIER token', async () => {
    const res = await request(app)
      .post('/api/v1/bulk-uploads')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`)
      .send({
        rows: [{
          senderName: 'Bulk Sender',
          senderMobile: '9000000099',
          courierId: 1,
          receivers: [{
            receiverName: 'Bulk Receiver',
            receiverPhone: '9000000098',
            products: [{ productId: 1, qty: 1, unitPrice: 100 }]
          }]
        }]
      });

    expect(res.statusCode).toBe(403);
  });
});

// ============================================================================
// ██████ 16. NOTIFICATIONS (PARTIAL — SEE §5 BLOCKERS) ██████
// ============================================================================
describe('16. Notifications', () => {
  it('16.1 POST /api/v1/parcels/1/notify → 200 sends notification', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/1/notify')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message).toContain('sent successfully');
  });

  it('16.2 GET /api/v1/parcels/1/notifications → 200 returns notification history', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/1/notifications')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('16.3 POST /api/v1/notifications/1/resend → 200 resends notification', async () => {
    const res = await request(app)
      .post('/api/v1/notifications/1/resend')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message).toContain('sent successfully');
  });

  it('16.4 POST /api/v1/notifications/webhook → 200 succeeds with valid payload', async () => {
    const res = await request(app)
      .post('/api/v1/notifications/webhook')
      .send({ notificationId: 1, status: 'delivered' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.statusId).toBe(2); // 2 = Delivered
  });
});
````

## File: src/interfaces/http/validations/validation.schemas.js
````javascript
// ============================================================================
// File: src/interfaces/http/validations/validation.schemas.js
// Description: Zod validation schemas for all modules payload validation.
// ============================================================================

import { z } from 'zod';

// ----------------------------------------------------------------------------
// AUTH SCHEMAS
// ----------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  employeeCode: z.string().min(1, 'EmployeeCode or Email is required').optional(),
  password: z.string().min(1, 'Password is required')
});

// ----------------------------------------------------------------------------
// EMPLOYEE SCHEMAS
// ----------------------------------------------------------------------------
export const createEmployeeSchema = z.object({
  name: z.string().min(1, 'Employee name is required'),
  email: z.string().email('Invalid email format'),
  phoneNo: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'OPERATOR', 'COURIER']),
  isActive: z.boolean().optional()
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export const toggleAccessSchema = z.object({
  allowLogin: z.boolean({ required_error: 'allowLogin boolean is required' })
});

// ----------------------------------------------------------------------------
// COURIER SCHEMAS
// ----------------------------------------------------------------------------
export const createCourierSchema = z.object({
  courierName: z.string().min(1, 'Courier name is required'),
  contactPerson: z.string().optional(),
  phoneNo: z.string().optional(),
  email: z.string().email().optional(),
  trackingUrlTemplate: z.string().optional()
});

export const updateCourierSchema = createCourierSchema.partial();

// ----------------------------------------------------------------------------
// PRODUCT SCHEMAS
// ----------------------------------------------------------------------------

// Variation item shape for creating new variations (all fields required)
const createVariationItemSchema = z.object({
  colorId: z.number({ required_error: 'Color ID is required' }).int().positive('Valid color ID is required'),
  size: z.string({ required_error: 'Size is required' }).min(1, 'Size is required'),
  materialRate: z.number({ required_error: 'Material rate is required' }).nonnegative('Rate cannot be negative')
});

// Variation item shape for updates (diff strategy: matrixId present = update, absent = insert, isActive:false = delete)
const updateVariationItemSchema = z.object({
  matrixId: z.number().int().nonnegative().optional(),
  colorId: z.number().int().positive('Valid color ID is required').optional(),
  size: z.string().min(1, 'Size is required').optional(),
  materialRate: z.number().nonnegative('Rate cannot be negative').optional(),
  isActive: z.boolean().optional()
});

export const createProductSchema = z.object({
  materialName: z.string().min(1, 'Material name is required'),
  materialRate: z.number().nonnegative('Rate cannot be negative').optional().default(0),
  cuItemCode: z.string().optional(),
  categoryId: z.number({ required_error: 'Category ID is required' }).int().positive('Valid category ID is required'),
  unitId: z.number({ required_error: 'Unit ID is required' }).int().positive('Valid unit ID is required'),
  materialDescription: z.string().optional(),
  variations: z.array(createVariationItemSchema).optional()
});

export const updateProductSchema = z.object({
  materialName: z.string().min(1, 'Material name is required').optional(),
  materialRate: z.number().nonnegative('Rate cannot be negative').optional(),
  cuItemCode: z.string().optional(),
  categoryId: z.number().int().positive().optional(),
  unitId: z.number().int().positive().optional(),
  materialDescription: z.string().optional(),
  isActive: z.boolean().optional(),
  variations: z.array(updateVariationItemSchema).optional()
});

export const productMatrixSchema = z.object({
  fkLuColorId: z.number({ required_error: 'Color ID is required' }).int().positive('Valid color ID is required'),
  materialRate: z.number({ required_error: 'Material rate is required' }).nonnegative('Rate cannot be negative'),
  size: z.string({ required_error: 'Size is required' }).min(1, 'Size is required'),
  matrixId: z.number().int().nonnegative().optional()
});

// ----------------------------------------------------------------------------
// PRODUCT LOOKUP SCHEMAS (Category, Color, Unit creation)
// ----------------------------------------------------------------------------
export const createCategorySchema = z.object({
  categoryName: z.string({ required_error: 'Category name is required' }).min(1, 'Category name is required')
});

export const createColorSchema = z.object({
  colorName: z.string({ required_error: 'Color name is required' }).min(1, 'Color name is required'),
  colorCode: z.string().optional().default('')
});

export const createUnitSchema = z.object({
  unitTitle: z.string({ required_error: 'Unit title is required' }).min(1, 'Unit title is required'),
  unitCode: z.string({ required_error: 'Unit code is required' }).min(1, 'Unit code is required')
});

// ----------------------------------------------------------------------------
// ORDER SCHEMAS
// ----------------------------------------------------------------------------
// Product item shape (shared between root-level and receiver-level products)
const productItemSchema = z.object({
  productId: z.number().int().positive('Valid product ID is required'),
  qty: z.number().int().positive('Quantity must be positive'),
  unitPrice: z.number().nonnegative().nullable().optional(),
  colorId: z.number().int().positive().optional(),
  size: z.string().min(1).optional()
});

const baseOrderSchema = z.object({
  senderId: z.number().int().positive('Valid sender ID is required'),
  senderName: z.string().min(1, 'Sender name is required'),
  senderMobile: z.string().min(1, 'Sender mobile is required'),
  senderAddress: z.string().optional(),
  senderCity: z.string().optional(),
  senderState: z.string().optional(),
  senderPincode: z.string().optional(),
  courierId: z.number().int().positive('Valid courier ID is required'),
  // Root-level products: used in Mode A (sender-to-self) and Mode C (combo)
  products: z.array(productItemSchema).optional(),
  // Receivers array: used in Mode B (normal) and Mode C (combo)
  receivers: z.array(
    z.object({
      receiverName: z.string().min(1, 'Receiver name is required'),
      receiverPhone: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
      products: z.array(productItemSchema)
        .min(1, 'At least one product is required for each receiver')
    })
  ).optional()
});

export const createOrderSchema = baseOrderSchema.superRefine((data, ctx) => {
  const hasRootProducts = Array.isArray(data.products) && data.products.length > 0;
  const hasReceivers = Array.isArray(data.receivers) && data.receivers.length > 0;

  if (!hasRootProducts && !hasReceivers) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Order must have at least one of: root-level products (Mode A) or receivers (Mode B/C)',
      path: ['products']
    });
  }
});

export const updateOrderSchema = baseOrderSchema.partial();

// ----------------------------------------------------------------------------
// SENDER (PARTY) SCHEMAS
// ----------------------------------------------------------------------------
export const createSenderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  phoneNo: z.string().min(10, 'Valid phone number is required'),
  emailId: z.string().email('Invalid email format').optional().nullable(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(1, 'Pincode is required')
});

export const updateSenderSchema = createSenderSchema.partial();

// ----------------------------------------------------------------------------
// ADDRESS (PARTY_DETAILS) SCHEMAS
// ----------------------------------------------------------------------------
export const createAddressSchema = z.object({
  partyName: z.string().optional(),
  phoneNo: z.string().optional(),
  emailId: z.string().email('Invalid email format').optional().nullable(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(1, 'Pincode is required'),
  country: z.string().optional(),
  isDefault: z.boolean().optional()
});
````

## File: src/app.js
````javascript
import express from 'express';
import cors from 'cors';
import yaml from 'yamljs';

// Import Domain Routes (Note the mandatory .js extension)
import authRoutes from './interfaces/http/routes/auth.routes.js';
import employeeRoutes from './interfaces/http/routes/employee.routes.js';
import courierRoutes from './interfaces/http/routes/courier.routes.js';
import productRoutes from './interfaces/http/routes/product.routes.js';
import orderRoutes from './interfaces/http/routes/order.routes.js';
import senderRoutes from './interfaces/http/routes/sender.routes.js';
import receiverRoutes from './interfaces/http/routes/receiver.routes.js';
import parcelRoutes from './interfaces/http/routes/parcel.routes.js';
import parcelEventsRoutes from './interfaces/http/routes/parcel-events.routes.js';
import bulkUploadRoutes from './interfaces/http/routes/bulk-upload.routes.js';
import systemRoutes from './interfaces/http/routes/system.routes.js';
import dashboardRoutes from './interfaces/http/routes/dashboard.routes.js';
import notificationRoutes from './interfaces/http/routes/notification.routes.js';

// Import Error Middlewares
import { notFound, errorHandler } from './shared/middleware/error.middleware.js';


// running server
const app = express();

// ----------------------------------------------------
// Top-Level Middlewares (Parsers and CORS)
// ----------------------------------------------------
app.use(cors());
app.use(express.json()); // Essential so that req.body works in your controllers!
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------
// Application Routes
// ----------------------------------------------------
// Standard practice: group routes by their domain module
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/courier-partners', courierRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/senders', senderRoutes);
app.use('/api/v1/receivers', receiverRoutes);
app.use('/api/v1/parcels', parcelRoutes);
app.use('/api/v1/parcel-events', parcelEventsRoutes);
app.use('/api/v1/bulk-uploads', bulkUploadRoutes);
app.use('/api/v1/system', systemRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1', notificationRoutes);

// SwaggerUI Documentation
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// ----------------------------------------------------
// Error Middlewares (MUST BE ABSOLUTE LAST)
// ----------------------------------------------------
app.use(notFound);       // If the URL didn't match /api/users or /api-docs, it hits this 404
app.use(errorHandler);   // If a controller throws an Error, this catches it

// Exporting using ES Module syntax
export default app;
````
