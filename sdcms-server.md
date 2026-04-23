This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where line numbers have been added.

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
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.agent/
  agents/
    documentation-writer.md
  rules/
    api_contract_v2.0_p1.md
    api_contract_v2.0_p2.md
    api_procedure_spec_v1.md
    backend_implementation_plan_v3.md
    db_schema_v1.md
    system_flow_v2.1.md
  workflows/
    retrofit_backend_v1.md
    sync_artifact_v1.md
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
  Senders-documentation.html
  Two Scan Operations-documentation.html
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
  Scan_Test_Data.txt
  Sender_Test_Data.txt
tests/
  e2e/
    mock_api.test.js
.antigravityignore
.editorconfig
.env.example
.gitattributes
.gitignore
.nvmrc
jest.config.js
package.json
README.md
```

# Files

## File: .agent/agents/documentation-writer.md
````markdown
  1: ---
  2: name: documentation-writer
  3: description: Expert in technical documentation. Use ONLY when user explicitly requests documentation (README, API docs, changelog). DO NOT auto-invoke during normal development.
  4: tools: Read, Grep, Glob, Bash, Edit, Write
  5: model: inherit
  6: skills: clean-code, documentation-templates
  7: ---
  8: 
  9: # Documentation Writer
 10: 
 11: You are an expert technical writer specializing in clear, comprehensive documentation.
 12: 
 13: ## Core Philosophy
 14: 
 15: > "Documentation is a gift to your future self and your team."
 16: 
 17: ## Your Mindset
 18: 
 19: - **Clarity over completeness**: Better short and clear than long and confusing
 20: - **Examples matter**: Show, don't just tell
 21: - **Keep it updated**: Outdated docs are worse than no docs
 22: - **Audience first**: Write for who will read it
 23: 
 24: ---
 25: 
 26: ## Documentation Type Selection
 27: 
 28: ### Decision Tree
 29: 
 30: ```
 31: What needs documenting?
 32: │
 33: ├── New project / Getting started
 34: │   └── README with Quick Start
 35: │
 36: ├── API endpoints
 37: │   └── OpenAPI/Swagger or dedicated API docs
 38: │
 39: ├── Complex function / Class
 40: │   └── JSDoc/TSDoc/Docstring
 41: │
 42: ├── Architecture decision
 43: │   └── ADR (Architecture Decision Record)
 44: │
 45: ├── Release changes
 46: │   └── Changelog
 47: │
 48: └── AI/LLM discovery
 49:     └── llms.txt + structured headers
 50: ```
 51: 
 52: ---
 53: 
 54: ## Documentation Principles
 55: 
 56: ### README Principles
 57: 
 58: | Section | Why It Matters |
 59: |---------|---------------|
 60: | **One-liner** | What is this? |
 61: | **Quick Start** | Get running in <5 min |
 62: | **Features** | What can I do? |
 63: | **Configuration** | How to customize? |
 64: 
 65: ### Code Comment Principles
 66: 
 67: | Comment When | Don't Comment |
 68: |--------------|---------------|
 69: | **Why** (business logic) | What (obvious from code) |
 70: | **Gotchas** (surprising behavior) | Every line |
 71: | **Complex algorithms** | Self-explanatory code |
 72: | **API contracts** | Implementation details |
 73: 
 74: ### API Documentation Principles
 75: 
 76: - Every endpoint documented
 77: - Request/response examples
 78: - Error cases covered
 79: - Authentication explained
 80: 
 81: ---
 82: 
 83: ## Quality Checklist
 84: 
 85: - [ ] Can someone new get started in 5 minutes?
 86: - [ ] Are examples working and tested?
 87: - [ ] Is it up to date with the code?
 88: - [ ] Is the structure scannable?
 89: - [ ] Are edge cases documented?
 90: 
 91: ---
 92: 
 93: ## When You Should Be Used
 94: 
 95: - Writing README files
 96: - Documenting APIs
 97: - Adding code comments (JSDoc, TSDoc)
 98: - Creating tutorials
 99: - Writing changelogs
100: - Setting up llms.txt for AI discovery
101: 
102: ---
103: 
104: > **Remember:** The best documentation is the one that gets read. Keep it short, clear, and useful.
````

## File: .agent/rules/api_contract_v2.0_p1.md
````markdown
  1: ---
  2: trigger: model_decision
  3: description: src/interfaces/http/**/*
  4: ---
  5: 
  6: ### SDCMS — API Contract v2.0
  7: 
  8: **Project:** Smart Dispatch & Courier Management System 
  9: **Date:** 2026-04-13 
 10: **Base URL:** http://localhost:5000/api/v1 
 11: **Total Endpoints:** 48
 12: 
 13: ---
 14: 
 15: #### 1. Conventions
 16: 
 17: ##### 1.1 Authentication
 18: 
 19: All endpoints (except Login) require a JWT token in the Authorization header: Token 
 20: payload contains: `{ id, role }`. Token expiry: configurable via `JWT_EXPIRY` env var.
 21: 
 22: ##### 1.2 Response Envelope
 23: 
 24: **Success:** `{ "success": true, "data": { ... } }` 
 25: **Success (paginated list):** `{ "success": true, "data": [...], "meta": { "page": 1, "total": 50 } }` 
 26: **Error:** `{ "success": false, "error": "Message" }`
 27: 
 28: ##### 1.3 Pagination & Filtering
 29: 
 30: All list endpoints support these query parameters:
 31: 
 32: |Param|Type|Default|Description|
 33: |---|---|---|---|
 34: |page|int|1|Page number (1-indexed)|
 35: |limit|int|20|Rows per page (max: 100)|
 36: |search|string|—|Free-text search (resource-specific fields)|
 37: |sortBy|string|created_at|Column to sort by|
 38: |sortOrder|string|desc|asc or desc|
 39: 
 40: ##### 1.4 Standard HTTP Status Codes
 41: 
 42: |Code|Meaning|
 43: |---|---|
 44: |200|Success|
 45: |201|Resource created|
 46: |400|Bad Request — validation failure or business rule violation|
 47: |401|Unauthorized — missing or invalid JWT token|
 48: |403|Forbidden — user role not authorized for this endpoint|
 49: |404|Resource not found|
 50: |409|Conflict — duplicate entry (e.g., duplicate AWB, duplicate email)|
 51: |500|Internal server error|
 52: 
 53: ##### 1.5 Role Definitions
 54: 
 55: |Role|Code|Description|
 56: |---|---|---|
 57: |Admin|ADMIN|Full system access. Manages employees, master data, and dashboard.|
 58: |Operator|OPERATOR|Creates orders, prints labels, dispatches parcels, sends notifications.|
 59: |Courier|COURIER|Scans QR codes, links AWBs. Limited read-only access to orders/parcels.|
 60: 
 61: ---
 62: 
 63: #### 2. Auth Module
 64: 
 65: ##### 2.1 Login
 66: 
 67: `POST /auth/login` — **Public (no token required)** **Request Body:**
 68: 
 69: |Field|Type|Required|Validation|
 70: |---|---|---|---|
 71: |email|string|✅|Valid email format|
 72: |password|string|✅|Non-empty|
 73: 
 74: ##### 2.2 Get Profile
 75: 
 76: `GET /auth/profile` — **ADMIN, OPERATOR, COURIER**
 77: 
 78: ---
 79: 
 80: #### 3. Employee Management
 81: 
 82: **Access:** ADMIN only for all endpoints
 83: 
 84: ##### 3.1 Endpoint Summary
 85: 
 86: |#|Method|Endpoint|Description|
 87: |---|---|---|---|
 88: |1|POST|/employees|Create a new employee account|
 89: |2|GET|/employees|List all employees (paginated)|
 90: |3|GET|/employees/:id|Get employee by ID|
 91: |4|PUT|/employees/:id|Update employee details|
 92: |5|PATCH|/employees/:id/toggle-access|Enable or disable login access|
 93: 
 94: ##### 3.2 Create Employee
 95: 
 96: `POST /employees` **Request Body:**
 97: 
 98: |Field|Type|Required|Validation|
 99: |---|---|---|---|
100: |name|string|✅|Min 2 chars|
101: |email|string|✅|Valid email, must be unique|
102: |password|string|✅|Min 6 chars|
103: |role|string|✅|One of: ADMIN, OPERATOR, COURIER|
104: 
105: ##### 3.3 List Employees
106: 
107: `GET /employees?page=1&limit=20&search=ravi&role=OPERATOR`
108: 
109: ##### 3.4 - 3.6 Get / Update / Toggle Access
110: 
111: Standard CRUD patterns. Password updates are re-hashed server-side. An admin cannot disable their own account.
112: 
113: ---
114: 
115: #### 4. Master Data — Products
116: 
117: **Access:** ADMIN, OPERATOR
118: 
119: ##### 4.1 Endpoint Summary
120: 
121: |#|Method|Endpoint|Description|
122: |---|---|---|---|
123: |1|POST|/products|Create a product|
124: |2|GET|/products|List products (paginated)|
125: |3|GET|/products/:id|Get product by ID|
126: |4|PUT|/products/:id|Update product|
127: |5|DELETE|/products/:id|Soft-delete product|
128: 
129: ##### 4.2 Create Product
130: 
131: `POST /products` **Request Body:**
132: 
133: |Field|Type|Required|Notes|
134: |---|---|---|---|
135: |materialName|string|✅|Product display name|
136: |materialRate|decimal|✅|Catalog price (MRP)|
137: |cuItemCode|string|❌|ERP integration code|
138: 
139: ---
140: 
141: #### 5. Master Data — Courier Partners
142: 
143: **Access:** ADMIN only
144: 
145: ##### 5.1 Endpoint Summary
146: 
147: |#|Method|Endpoint|Description|
148: |---|---|---|---|
149: |1|POST|/courier-partners|Create courier partner|
150: |2|GET|/courier-partners|List courier partners|
151: |3|GET|/courier-partners/:id|Get by ID|
152: |4|PUT|/courier-partners/:id|Update|
153: |5|DELETE|/courier-partners/:id|Soft-delete|
154: 
155: ##### 5.2 Create Courier Partner
156: 
157: `POST /courier-partners` **Request Body:**
158: 
159: |Field|Type|Required|Notes|
160: |---|---|---|---|
161: |courierName|string|✅|Display name|
162: |trackingUrlTemplate|string|❌|Use {AWB} as placeholder for tracking number|
163: 
164: ---
165: 
166: #### 6. Master Data — Senders (Frontend Abstraction for Parties)
167: 
168: **Access:** ADMIN, OPERATOR _Note: The frontend continues to use the `/senders` abstraction. The backend automatically maps this data to the unified `Party_master` table using the appropriate FkPartyTypeId._
169: 
170: ##### 6.1 Endpoint Summary
171: 
172: |#|Method|Endpoint|Description|
173: |---|---|---|---|
174: |1|POST|/senders|Create sender|
175: |2|GET|/senders|List senders (paginated)|
176: |3|GET|/senders/:id|Get by ID|
177: |4|PUT|/senders/:id|Update|
178: |5|DELETE|/senders/:id|Soft-delete|
179: |6|GET|/senders/lookup|Find sender by phone (order form auto-fill)|
180: 
181: ##### 6.2 Create Sender
182: 
183: `POST /senders` **Request Body:**
184: 
185: |Field|Type|Required|
186: |---|---|---|
187: |customerName|string|✅|
188: |phoneNo|string|✅|
189: |addressLine1|string|✅|
190: |addressLine2|string|❌|
191: |city|string|✅|
192: |state|string|✅|
193: |pincode|string|✅|
194: 
195: ##### 6.3 Sender Lookup (Auto-fill)
196: 
197: `GET /senders/lookup?phone=9876543210` Used by the order creation form. Returns 200 with null data if not found, allowing operator to type details manually.
198: 
199: ---
200: 
201: #### 7. Order Management
202: 
203: **Access:** ADMIN, OPERATOR (create/edit/cancel) | COURIER (list only, read-only) _Note: Order status is strictly derived dynamically from parcel states and never stored in the database._
204: 
205: ##### 7.1 Endpoint Summary
206: 
207: |#|Method|Endpoint|Roles|Description|
208: |---|---|---|---|---|
209: |1|POST|/orders|ADMIN, OPERATOR|Create complex order|
210: |2|GET|/orders|ALL|List orders (paginated, filtered)|
211: |3|GET|/orders/:id|ADMIN, OPERATOR|Get full order aggregate|
212: |4|PUT|/orders/:id|ADMIN, OPERATOR|Update order (before dispatch)|
213: |5|PATCH|/orders/:id/cancel|ADMIN, OPERATOR|Cancel entire order|
214: 
215: ##### 7.2 Create Order (Complex)
216: 
217: `POST /orders` This creates the full order graph in one transaction via `prc_CreateComplexOrder`. **Request Body:**
218: 
219: |Field|Type|Required|Notes|
220: |---|---|---|---|
221: |senderName|string|✅||
222: |senderMobile|string|✅|Used to dynamically find or create in `Party_master`.|
223: |courierId|int|✅|FK → courier_partner_master|
224: |receivers|array|✅|Array of receivers|
225: |receivers[].receiverName|string|✅||
226: |receivers[].products|array|✅|Nested products|
227: 
228: **Business Rules:**
229: 
230: - 1 receiver = 1 parcel (auto-generated with unique QR code).
231: - Order status is implicitly derived as CREATED. All parcel statuses are explicitly set to PENDING. No status is inserted into the order table.
232: 
233: ##### 7.3 List Orders
234: 
235: `GET /orders?page=1&limit=20&status=DISPATCHED` **Filters:**
236: 
237: |Filter|Type|Description|
238: |---|---|---|
239: |status|string|The backend dynamically computes this filter across parcel aggregates on the fly using `prc_GetAllOrdersSummary`.|
240: 
241: ---
````

## File: .agent/rules/api_contract_v2.0_p2.md
````markdown
  1: ---
  2: trigger: model_decision
  3: description: src/interfaces/http/**/*
  4: ---
  5: 
  6: 
  7: #### 8. Parcel Execution
  8: 
  9: The core execution engine. All real-world actions happen at the parcel level. **Principle:** _"Order = planning, Parcel = execution."_
 10: 
 11: ##### 8.1 Endpoint Summary
 12: 
 13: |#|Method|Endpoint|Roles|Description|
 14: |---|---|---|---|---|
 15: |1|GET|/parcels|ALL|List parcels (paginated, filtered)|
 16: |2|GET|/parcels/:id|ALL|Get parcel details|
 17: |3|GET|/parcels/:id/label-data|ADMIN, OPERATOR|Get data for frontend label rendering|
 18: |4|GET|/parcels/:id/timeline|ALL|**[NEW]** Get chronological events from event log|
 19: |5|POST|/parcels/:id/log-print|ADMIN, OPERATOR|Log a label print event|
 20: |6|POST|/parcels/scan|ALL|QR scan + AWB link (atomic two-scan flow)|
 21: |7|POST|/parcels/dispatch|ADMIN, OPERATOR|Dispatch parcels (single or bulk)|
 22: |8|PATCH|/parcels/:id/deliver|ADMIN, OPERATOR|Mark parcel as delivered|
 23: |9|PATCH|/parcels/:id/cancel|ADMIN, OPERATOR|Cancel individual parcel|
 24: |10|PATCH|/parcels/:id/return|ADMIN, OPERATOR|Mark parcel as returned|
 25: 
 26: ##### 8.2 Get Parcel Timeline **[NEW]**
 27: 
 28: `GET /parcels/:id/timeline` Returns a chronological timeline of all events for a specific parcel, queried directly from the `receiver_status_details` event log. Used for visual tracking.
 29: 
 30: ##### 8.3 Log Label Print
 31: 
 32: `POST /parcels/:id/log-print` — **ADMIN, OPERATOR** **Effects (server-side):**
 33: 
 34: 1. Increments `parcel_details.LabelPrintCount`.
 35: 2. Transitions parcel to LABEL_PRINTED.
 36: 3. Calls `prc_LogReceiverStatus` to append an event log to `receiver_status_details`.
 37: 
 38: ##### 8.4 QR Scan + AWB Link (Atomic Two-Scan Flow)
 39: 
 40: `POST /parcels/scan` — **ADMIN, OPERATOR, COURIER** **Request Body:**
 41: 
 42: |Field|Type|Required|Validation|
 43: |---|---|---|---|
 44: |qrCode|string|✅|Must match an existing parcel|
 45: |awbNumber|string|✅|Must be unique per courier|
 46: 
 47: **Business Rules:**
 48: 
 49: 1. Both scan events are appended to `receiver_status_details`.
 50: 2. **Role-based auto-dispatch:** If scanner role is COURIER → status jumps directly to DISPATCHED. Otherwise, goes to AWB_LINKED.
 51: 
 52: ##### 8.5 Dispatch Parcels (Single + Bulk)
 53: 
 54: `POST /parcels/dispatch` — **ADMIN, OPERATOR** **Request Body:**
 55: 
 56: |Field|Type|Required|
 57: |---|---|---|
 58: |parcelIds|int[]|✅ (min 1 element)|
 59: 
 60: Updates status to 'Dispatched', sets DispatchDate, and appends to `receiver_status_details` via `prc_DispatchParcels`.
 61: 
 62: ---
 63: 
 64: #### 9. Notifications
 65: 
 66: **Access:** ADMIN, OPERATOR
 67: 
 68: ##### 9.1 Endpoint Summary
 69: 
 70: |#|Method|Endpoint|Description|
 71: |---|---|---|---|
 72: |1|POST|/parcels/:id/notify|Send dispatch notification to receiver|
 73: |2|POST|/notifications/:id/resend|Resend a failed notification|
 74: |3|GET|/parcels/:id/notifications|Get notification history for a parcel|
 75: |4|POST|/notifications/webhook|Webhook callback for delivery status (Sent/Failed)|
 76: 
 77: ---
 78: 
 79: #### 10. Bulk Upload
 80: 
 81: **Access:** ADMIN, OPERATOR
 82: 
 83: ##### 10.1 Endpoint Summary
 84: 
 85: |#|Method|Endpoint|Description|
 86: |---|---|---|---|
 87: |1|POST|/bulk-uploads|Submit bulk order data (JSON, parsed by frontend)|
 88: |2|GET|/bulk-uploads|List all upload sessions (paginated)|
 89: |3|GET|/bulk-uploads/:id|Get upload result with per-row detail|
 90: 
 91: ---
 92: 
 93: #### 11. Parcel Events & Export (Formerly Scan Logs)
 94: 
 95: **Access:** ADMIN, OPERATOR. Replaces the old scan logs API. Pulls directly from the unified `receiver_status_details` event log.
 96: 
 97: ##### 11.1 Endpoint Summary
 98: 
 99: |#|Method|Endpoint|Description|
100: |---|---|---|---|
101: |1|GET|/parcel-events|Browse system-wide events (paginated, filtered)|
102: |2|GET|/parcel-events/export|Download events as CSV file|
103: 
104: ##### 11.2 Browse Parcel Events
105: 
106: `GET /parcel-events?page=1&limit=50&actionType=AWB_LINK&scannedBy=EMP003` **Filters:**
107: 
108: |Filter|Type|Description|
109: |---|---|---|
110: |dateFrom|date|Logs on or after this date|
111: |dateTo|date|Logs on or before this date|
112: |actionType|string|Enum: QR_SCAN, AWB_LINK, STATUS_UPDATE, RELINK_AWB|
113: |scannedBy|string|EmployeeCode of the person who scanned|
114: 
115: ---
116: 
117: #### 12. Dashboard Metrics
118: 
119: **Access:** ADMIN only
120: 
121: ##### 12.1 Get Dashboard Metrics
122: 
123: `GET /dashboard/metrics` Metrics are dynamically calculated via the new `prc_GetDashboardMetrics` database aggregation, deriving counts purely from the parcel-level logic.
124: 
125: ---
126: 
127: #### Appendix A: Parcel Status Lifecycle
128: 
129: **Transition Rules:**
130: 
131: |From|To|Trigger|
132: |---|---|---|
133: |PENDING|LABEL_PRINTED|POST /parcels/:id/log-print|
134: |LABEL_PRINTED|AWB_LINKED|POST /parcels/scan (by OPERATOR/ADMIN)|
135: |LABEL_PRINTED|DISPATCHED|POST /parcels/scan (by COURIER — auto-dispatch)|
136: |AWB_LINKED|DISPATCHED|POST /parcels/dispatch|
137: |DISPATCHED|DELIVERED|PATCH /parcels/:id/deliver|
138: |PENDING / LABEL_PRINTED / AWB_LINKED|CANCELLED|PATCH /parcels/:id/cancel|
139: |DISPATCHED / DELIVERED|RETURNED|PATCH /parcels/:id/return|
140: 
141: **Hard Rules:**
142: 
143: - No AWB linking before QR/label is printed.
144: - No dispatch before AWB is linked.
145: - No skipping states.
146: - Logs are append-only.
147: 
148: ---
149: 
150: #### Appendix B: Order Status Lifecycle (Derived)
151: 
152: Order status is **strictly computed from parcels** (not stored):
153: 
154: |Condition|Derived Order Status|
155: |---|---|
156: |All pending|Created|
157: |Some printed|Partially Printed|
158: |All printed|Label Printed|
159: |Some dispatched|Partially Dispatched|
160: |All dispatched|Dispatched|
161: |All delivered|Completed|
162: 
163: ---
164: 
165: #### Appendix C: RBAC Access Matrix
166: 
167: |Endpoint Group|ADMIN|OPERATOR|COURIER|
168: |---|---|---|---|
169: |Login|✅|✅|✅|
170: |Get Profile|✅|✅|✅|
171: |Employee Management (CRUD)|✅|❌|❌|
172: |Products (CRUD)|✅|✅|❌|
173: |Courier Partners (CRUD)|✅|❌|❌|
174: |Senders (Parties CRUD)|✅|✅|❌|
175: |Create / Edit / Cancel Order|✅|✅|❌|
176: |List Orders|✅|✅|✅ (read-only)|
177: |Get Order Detail|✅|✅|❌|
178: |Label Data + Log Print|✅|✅|❌|
179: |QR Scan + AWB Link|✅|✅|✅|
180: |Dispatch Parcels|✅|✅|❌|
181: |Deliver / Cancel / Return Parcel|✅|✅|❌|
182: |Send / Resend Notification|✅|✅|❌|
183: |Bulk Upload|✅|✅|❌|
184: |Parcel Events (Browse + Export)|✅|✅|❌|
185: |Dashboard Metrics|✅|❌|❌|
186: 
187: ---
188: 
189: #### Appendix D: Complete Endpoint Index
190: 
191: |#|Method|Endpoint|Section|
192: |---|---|---|---|
193: |1|POST|/api/v1/auth/login|2.1|
194: |2|GET|/api/v1/auth/profile|2.2|
195: |3|POST|/api/v1/employees|3.2|
196: |4|GET|/api/v1/employees|3.3|
197: |5|GET|/api/v1/employees/:id|3.4|
198: |6|PUT|/api/v1/employees/:id|3.5|
199: |7|PATCH|/api/v1/employees/:id/toggle-access|3.6|
200: |8|POST|/api/v1/products|4.2|
201: |9|GET|/api/v1/products|4.3|
202: |10|GET|/api/v1/products/:id|4.4|
203: |11|PUT|/api/v1/products/:id|4.4|
204: |12|DELETE|/api/v1/products/:id|4.4|
205: |13|POST|/api/v1/courier-partners|5.2|
206: |14|GET|/api/v1/courier-partners|5.3|
207: |15|GET|/api/v1/courier-partners/:id|5.3|
208: |16|PUT|/api/v1/courier-partners/:id|5.3|
209: |17|DELETE|/api/v1/courier-partners/:id|5.3|
210: |18|POST|/api/v1/senders|6.2|
211: |19|GET|/api/v1/senders|6.2|
212: |20|GET|/api/v1/senders/:id|6.2|
213: |21|PUT|/api/v1/senders/:id|6.2|
214: |22|DELETE|/api/v1/senders/:id|6.2|
215: |23|GET|/api/v1/senders/lookup|6.3|
216: |24|POST|/api/v1/orders|7.2|
217: |25|GET|/api/v1/orders|7.3|
218: |26|GET|/api/v1/orders/:id|7.4|
219: |27|PUT|/api/v1/orders/:id|7.5|
220: |28|PATCH|/api/v1/orders/:id/cancel|7.6|
221: |29|GET|/api/v1/parcels|8.1|
222: |30|GET|/api/v1/parcels/:id|8.1|
223: |31|GET|/api/v1/parcels/:id/label-data|8.1|
224: |32|GET|/api/v1/parcels/:id/timeline|8.2|
225: |33|POST|/api/v1/parcels/:id/log-print|8.3|
226: |34|POST|/api/v1/parcels/scan|8.4|
227: |35|POST|/api/v1/parcels/dispatch|8.5|
228: |36|PATCH|/api/v1/parcels/:id/deliver|8.1|
229: |37|PATCH|/api/v1/parcels/:id/cancel|8.1|
230: |38|PATCH|/api/v1/parcels/:id/return|8.1|
231: |39|POST|/api/v1/parcels/:id/notify|9.2|
232: |40|POST|/api/v1/notifications/:id/resend|9.3|
233: |41|GET|/api/v1/parcels/:id/notifications|9.4|
234: |42|POST|/api/v1/bulk-uploads|10.2|
235: |43|GET|/api/v1/bulk-uploads|10.3|
236: |44|GET|/api/v1/bulk-uploads/:id|10.4|
237: |45|GET|/api/v1/parcel-events|11.2|
238: |46|GET|/api/v1/parcel-events/export|11.2|
239: |47|GET|/api/v1/dashboard/metrics|12.1|
240: |48|POST|/api/v1/notifications/webhook|9.1|
````

## File: .agent/rules/api_procedure_spec_v1.md
````markdown
  1: ---
  2: trigger: model_decision
  3: description: Defines API-to-MySQL stored procedure contracts. Outlines backend vs DB responsibilities (validation vs transactions) and prc_LogReceiverStatus logging. Load when writing Repositories, mapping payloads, or translating MySQL errors.
  4: ---
  5: 
  6: # SDCMS — API ↔ Stored Procedure Contract Specification
  7: 
  8: ---
  9: 
 10: ## 1. Purpose
 11: 
 12: This document defines the **authoritative contract** between REST APIs and MySQL stored procedures.
 13: 
 14: It explicitly governs:
 15: - API → Procedure invocation mapping
 16: - Request → Parameter transformation
 17: - Procedure → Response mapping
 18: - Transaction ownership
 19: - Error handling standardization
 20: - State transition enforcement
 21: 
 22: This document is the **single source of truth** for backend engineers following the `_set` and `_get` standard.
 23: 
 24: ---
 25: 
 26: ## 2. Global Execution Rules
 27: 
 28: ### 2.1 Procedure Invocation Standard
 29: 
 30: All stored procedures MUST be invoked using:
 31: ```javascript
 32: // Example for a _get operation with pAction
 33: const [rows] = await db.execute('CALL prc_employee_master_get(?, ?, ...)', [0, params]); // 0 = GetAll
 34: 
 35: // Example for an Upsert (_set) operation
 36: const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ...)', [params]);
 37: ```
 38: 
 39: ### 2.2 Responsibility Matrix
 40: 
 41: | Concern | Owner |
 42: |---|---|
 43: | Input validation | Backend |
 44: | Authentication | Backend |
 45: | Transaction control | Stored Procedures (`_set` specifically) |
 46: | Business logic | Stored Procedures |
 47: | Status computation | Database (derived dynamically via `_get` and `_set` states)|
 48: 
 49: ### 2.4 Transaction Policy & Naming Rules
 50: - **Upsert (`_set`):** Handles all Inserts, Updates, Deletions. **NO** `pAction` parameter is used here. Controlled by passing ID=0 (Insert) or ID>0 (Update).
 51: - **Read (`_get`):** Handles all queries. **MUST** use the `pAction` integer parameter. (`0` = get all, `1` = get specific).
 52: - **Transactions:** `_set` procedures are fully atomic wrappers. Backend MUST NOT wrap them in additional transactions.
 53: 
 54: ### 2.5 Logging Rule (Non-Negotiable)
 55: Every state-changing operations within `prc_parcel_details_set`, `prc_order_master_set` or similar must invoke `prc_receiver_status_details_set`.
 56: 
 57: ---
 58: 
 59: ## 3. Shared Data Contracts
 60: 
 61: ### 3.1 OrderPayload (Canonical Input Model)
 62: ```json
 63: {
 64:   "senderName": "string",
 65:   "senderMobile": "string",
 66:   "courierId": "number",
 67:   "receivers": [
 68:     {
 69:       "receiverName": "string",
 70:       "products": [{ "productId": "number", "qty": "number", "unitPrice": "number|null" }]
 71:     }
 72:   ]
 73: }
 74: ```
 75: 
 76: ---
 77: 
 78: ## 4. AUTH & EMPLOYEE APIs
 79: 
 80: ### API: Login
 81: **Endpoint:** `POST /api/v1/auth/login`  
 82: **Procedure:** `prc_employee_master_get` (`pAction = 1`, passing email)
 83: 
 84: ### API: Create Employee
 85: **Endpoint:** `POST /api/v1/employees`  
 86: **Procedure:** `prc_employee_master_set` (Passing `0` for EmployeeCode)
 87: 
 88: ### API: Get Employees
 89: **Endpoint:** `GET /api/v1/employees`  
 90: **Procedure:** `prc_employee_master_get` (`pAction = 0`)
 91: 
 92: ### API: Update / Toggle Employee
 93: **Endpoint:** `PUT /api/v1/employees/:id` & `PATCH /api/v1/employees/:id/toggle-access`  
 94: **Procedure:** `prc_employee_master_set` (Passing the specific `EmployeeCode`)
 95: 
 96: ---
 97: 
 98: ## 5. PRODUCT APIs
 99: 
100: | API | Endpoint | Procedure |
101: |---|---|---|
102: | Create/Update Product | POST / PUT /products | `prc_product_master_set` (0 = Create) |
103: | Get Products | GET /products | `prc_product_master_get` (`pAction = 0`) |
104: | Get Product Info | GET /products/:id | `prc_product_master_get` (`pAction = 1`) |
105: | Soft Delete Product | DELETE /products/:id | `prc_product_master_set` (Passing `IsActive = 0`) |
106: 
107: ---
108: 
109: ## 6. COURIER APIs
110: 
111: | API | Endpoint | Procedure |
112: |---|---|---|
113: | Create/Update Courier | POST / PUT /courier-partners | `prc_courier_partner_master_set` |
114: | Get Couriers | GET /courier-partners | `prc_courier_partner_master_get` (`pAction = 0`) |
115: | Delete Courier | DELETE /courier-partners/:id | `prc_courier_partner_master_set` |
116: 
117: ---
118: 
119: ## 7. PARTY APIs
120: 
121: ### API: Find or Create Party (Upsert)
122: **Endpoint:** `POST /api/v1/senders`  
123: **Procedure:** `prc_Party_master_set`
124: - Evaluates if logical sender exists by phone; if yes updates/returns, else inserts.
125: 
126: ### Standard Operations
127: | API | Procedure |
128: |---|---|
129: | Get Parties | `prc_Party_master_get` (`pAction = 0`) |
130: | Get Specific Party | `prc_Party_master_get` (`pAction = 1`) |
131: | Update/Delete Party| `prc_Party_master_set` |
132: 
133: ---
134: 
135: ## 8. ORDER APIs (Transactional Core)
136: 
137: ### API: Create/Update Order
138: **Endpoint:** `POST /api/v1/orders` / `PUT /api/v1/orders/:id`  
139: **Procedure:** `prc_order_master_set`
140: - **Body:** `pOrderPayload` mapping JSON directly into DB. Creates `order_master` -> `receiver_details` -> `parcel_details` inside transaction (ID=0 triggers Insert).
141: 
142: ### API: Cancel Orderapi_pr
143: **Endpoint:** `PATCH /api/v1/orders/:id/cancel`  
144: **Procedure:** `prc_order_master_set` (Passing `pCancelRequested = 1`)
145: 
146: ### API: Read Orders
147: **Endpoint:** `GET /api/v1/orders/:id`  
148: **Procedure:** `prc_order_master_get` (`pAction = 1` for Aggregate JSON response specific to ID)
149: 
150: **Endpoint:** `GET /api/v1/orders`  
151: **Procedure:** `prc_order_master_get` (`pAction = 0` for paginated summaries that calculate Order Status dynamically).
152: 
153: ---
154: 
155: ## 9. PARCEL APIs
156: 
157: ### Read APIs
158: | Endpoint | Procedure |
159: |---|---|
160: | GET /parcels | `prc_parcel_details_get` (`pAction = 0`) |
161: | GET /parcels/:id | `prc_parcel_details_get` (`pAction = 1`) |
162: | GET /parcels/:id/label-data| `prc_parcel_details_get` (`pAction = 2`) |
163: | GET /parcels/:id/timeline | `prc_receiver_status_details_get` (`pAction = 1`) |
164: | GET /parcel-events | `prc_receiver_status_details_get` (`pAction = 0`) |
165: 
166: ### Execution Logic APIs (Updates physical status & tracking)
167: | API Capability | Endpoint Mapping | Procedure execution |
168: |---|---|---|
169: | Print Label | POST /parcels/:id/log-print | `prc_parcel_details_set` |
170: | Scan & Link AWB | POST /parcels/scan | `prc_parcel_details_set` |
171: | Dispatch Parcels | POST /parcels/dispatch | `prc_parcel_details_set` |
172: | Update End Status | PATCH /parcels/:id/{status}| `prc_parcel_details_set` |
173: 
174: *(Note: All executions through `prc_parcel_details_set` inevitably trigger `prc_receiver_status_details_set` to strictly build out the audit timeline).*
175: 
176: ---
177: 
178: ## 10. NOTIFICATION / BULK APIs
179: 
180: | Protocol Area | Procedure |
181: |---|---|
182: | Notification Sender & Hook | `prc_Notification_log_set` |
183: | Retrieve Notifications | `prc_Notification_log_get` (`pAction = 1`) |
184: | Bulk Excel Log Initiation | `prc_bulk_order_upload_log_set` |
185: | Bulk Excel Row Status | `prc_bulk_order_upload_detail_set` |
186: 
187: ---
188: 
189: ## 11. ANALYTICS
190: 
191: ### API: Dashboard Metrics
192: **Endpoint:** `GET /api/v1/dashboard/metrics`  
193: **Procedure:** `prc_dashboard_metrics_get` (`pAction = 0`)
194: 
195: ---
196: 
197: ## 12. ERROR CONTRACT
198: 
199: | MySQL Code / Cause | Meaning | API Response |
200: |---|---|---|
201: | `prc_check_duplicate_XXX` Trigger | Duplicate entity found | 409 Conflict |
202: | 1062 ER_DUP_ENTRY | Hard constraint duplicate | 409 Conflict |
203: | SIGNAL / Rollback | Business rule violation | 400 Bad Request |
204: | No rows | Not found | 404 |
205: 
206: ---
207: 
208: ## 13. ANTI-PATTERNS (STRICTLY FORBIDDEN)
209: - ❌ Passing `pAction` to `_set` procedures instead of checking primary keys against `0` (Insert) or `>0` (update).
210: - ❌ Using old semantic procedure names (e.g. `prc_CreateProduct`).
211: - ❌ Wrapping `_set` API handlers in NodeJS transactions. Database holds the ultimate boundaries.
212: - ❌ Computing order status in JS.
````

## File: .agent/rules/system_flow_v2.1.md
````markdown
  1: ---
  2: trigger: model_decision
  3: description: Defines the strict Parcel and Order state transitions (e.g., Created -> Label Printed -> Dispatched). Load this when building or validating status flows and state changes
  4: ---
  5: 
  6: **Document Type:** Schema Walkthrough & Design Decisions **Project:** Smart Dispatch & Courier Management System **Context:** This document captures the complete logical walkthrough of how every table in the SDCMS schema is used, organized in sequence to understand the application flow. It heavily enforces the new core principle: **“Order = planning, Parcel = execution”** and the unified event-logging paradigm.
  7: 
  8: ---
  9: 
 10: #### Part 1: Before Anything Works — System Setup
 11: 
 12: Before a single order can be created, the system needs foundation data.
 13: 
 14: ##### The Very First Thing: Roles & Status Lookups
 15: 
 16: **Table:** **`lu_user_role`** This table holds exactly 3 roles: ADMIN, OPERATOR, and COURIER. Every single person who logs into the system must be one of these three. **Table:** **`lu_details`** Instead of hardcoding status strings, the database uses a master lookup table for all statuses (e.g., Pending, Label Printed, Dispatched). The backend and database procedures resolve integer foreign keys (`LuDetailsId`) from this table to maintain strict referential integrity.
 17: 
 18: ##### The Second Thing: Creating User Accounts
 19: 
 20: **Table:** **`employee_master`** This is the **login table**. Every admin, operator, and courier gets a row here.
 21: 
 22: - `UserName` + `Password` (hashed) → what they type to log in.
 23: - `FkRoleId` → points back to `lu_user_role`.
 24: - `EmployeeCode` → the primary key (e.g., EMP001). This shows up everywhere as the `CreatedBy` value.
 25: 
 26: ---
 27: 
 28: #### Part 2: Setting Up Master Data
 29: 
 30: Before you can create an order, you need to know who is involved, what is being shipped, and who is delivering it.
 31: 
 32: ##### Parties (Unified Address Book)
 33: 
 34: **Table:** **`Party_master`** The old customer and sender tables have been unified into `Party_master`. The frontend still calls them "Senders" for user-friendliness, but the backend maps them here.
 35: 
 36: - `CustomerName`, `PhoneNo` → identifies the party.
 37: - `FkPartyTypeId` → distinguishes if this is a Sender or Receiver.
 38: - Contains full structured address fields (`AddressLine1`, `City`, `State`, `Pincode`).
 39: 
 40: ##### Products (What's Being Shipped)
 41: 
 42: **Table:** **`product_master`** The catalog of items that can go into an order.
 43: 
 44: - `MaterialName` → product display name.
 45: - `MaterialRate` → catalog list price, which acts as a fallback during order creation.
 46: 
 47: ##### Courier Partners (Who Delivers)
 48: 
 49: **Table:** **`courier_partner_master`** The list of courier companies.
 50: 
 51: - `TrackingUrlTemplate` → Stores templates like `https://domain.com?awb={AWB}`. The system replaces `{AWB}` with the real tracking number later.
 52: 
 53: ---
 54: 
 55: #### Part 3: Creating an Order (The Planning Layer)
 56: 
 57: This is the heart of the system. An Operator creates a complex order in a single atomic transaction.
 58: 
 59: ##### Step 1: Identify the Sender
 60: 
 61: **Table hit:** **`Party_master`** The operator types the sender's phone number. The system runs a **find-or-create**:
 62: 
 63: - **Found?** → Pre-fill their details.
 64: - **Not found?** → Create a new row.
 65: 
 66: ##### Step 2: Create the Order
 67: 
 68: **Table hit:** **`order_master`** A new row is inserted to hold the order. **Crucial Architectural Rule:** **NO order status is inserted into the database**. Order status is entirely derived.
 69: 
 70: - `FkSenderId` → Points to the Party.
 71: - `SenderName`, `SenderMobile`, etc. → **Snapshot** of the sender at this exact moment in time so future edits to the Party don't alter past labels.
 72: - `TotalAmount` → Starts at 0, updated AFTER items are added.
 73: 
 74: ##### Step 3: Add Receivers
 75: 
 76: **Table hit:** **`receiver_details`** One order can have multiple receivers. A row is created for each delivery destination.
 77: 
 78: - **Mixed Orders (Sender as Receiver):** If the sender also receives items (e.g., returning stock), or if no explicit receivers are provided, the system creates an additional receiver row by copying the sender's structured address from `Party_master` into `receiver_details`.
 79: 
 80: ##### Step 4: Add Products to Each Receiver
 81: 
 82: **Table hit:** **`order_items`** Each receiver gets their own list of products.
 83: 
 84: - Items are strictly linked to the receiver, NOT the order, to prevent mismatches.
 85: - **Pricing Fallback:** The backend captures the `UnitPrice`. If a custom price is not provided, the system automatically falls back to the `MaterialRate` defined in the product catalog.
 86: - The `TotalAmount` is calculated (`SUM(UnitPrice × OutwardQty)`) and updates the `order_master`.
 87: 
 88: ##### Step 5: Generate Parcels (The Execution Layer Begins)
 89: 
 90: **Table hit:** **`parcel_details`** This happens **automatically**. **1 receiver = 1 parcel**.
 91: 
 92: - `parcel_id` → System-generated unique string (Frontend uses this to visually render the QR code).
 93: - `TrackingNo` → **NULL** (courier provides this later).
 94: - `FkParcelStatusId` → Maps to **"Pending"** via `lu_details`.
 95: - `LabelPrintCount` → Starts at 0.
 96: 
 97: ---
 98: 
 99: #### Part 4: Order Editing & Cancellations
100: 
101: Orders are not locked immediately, but there are strict thresholds governing edits and cancellations.
102: 
103: ##### Editing an Order
104: 
105: If the operator realizes a mistake, they can edit the order (`PUT /orders/:id`).
106: 
107: - **The Threshold Rule:** An order can only be edited if **all** of its parcels are below the "AWB Linked" status. Once physical execution (linking tracking numbers) begins, the database transaction (`prc_UpdateComplexOrder`) strictly rejects updates.
108: 
109: ##### Cancelling an Order
110: 
111: If an order is aborted (`PATCH /orders/:id/cancel`), the system runs a cascading transaction (`prc_CancelOrder`).
112: 
113: - The system checks that no parcel is "Dispatched" or "Delivered".
114: - If safe, it bulk-updates all associated `parcel_details` rows to "Cancelled" and appends a cancellation event log to `receiver_status_details` for every single box.
115: 
116: ---
117: 
118: #### Part 5: Label Printing
119: 
120: The order is planned. Now the operator prints physical labels.
121: 
122: **Tables hit:** **`parcel_details`** + **`receiver_status_details`** _Note: The old `parcel_label_print_log` table was deleted. Logs are now unified._
123: 
124: 1. **Fetch Data:** The system pulls the `parcel_id`, sender snapshot, and structured receiver address (`prc_GetLabelData`).
125: 2. **Update Parcel:** Increments `LabelPrintCount` by 1 and updates status to **"Label Printed"**.
126: 3. **Log the Event:** Appends a new row to `receiver_status_details` tracking the print action (`ActionType = 'STATUS_UPDATE'`).
127: 
128: ---
129: 
130: #### Part 6: Courier Scanning — AWB Linking
131: 
132: The courier arrives and performs the **Atomic Two-Scan Flow**.
133: 
134: **Tables hit:** **`parcel_details`** + **`receiver_status_details`** **Scan 1:** The printed **QR code** (which extracts the hidden `parcel_id` to identify the parcel). **Scan 2:** The courier's **AWB barcode** (assigns the tracking number).
135: 
136: **What happens in the DB (`prc_ScanAndLinkAWB`):**
137: 
138: 1. System validates the `parcel_id` and ensures `TrackingNo` is perfectly unique to prevent delivery chaos.
139: 2. **Role-Based Auto-Dispatch:**
140:     - If scanned by **COURIER** → Status jumps directly to **"Dispatched"** and `DispatchDate` is stamped.
141:     - If scanned by **OPERATOR** → Status changes to **"AWB Linked"** (dispatch happens separately).
142: 3. **Audit Trail:** An append-only event log is added to `receiver_status_details` with `ActionType = 'AWB_LINK'`.
143: 
144: ---
145: 
146: #### Part 7: Dispatch
147: 
148: If parcels were scanned by an Operator (AWB Linked), they must be manually dispatched.
149: 
150: **Tables hit:** **`parcel_details`** + **`receiver_status_details`** The operator selects an array of `parcelIds` (bulk dispatch) (`POST /parcels/dispatch`). The system resolves the `lu_details` ID for "Dispatched", stamps the `DispatchDate`, and logs the action as a new append-only row in `receiver_status_details`.
151: 
152: ---
153: 
154: #### Part 8: Terminal States (Delivery & Returns)
155: 
156: The final phases of a physical box's journey.
157: 
158: **Tables hit:** **`parcel_details`** + **`receiver_status_details`**
159: 
160: - **Delivery:** Once the courier confirms delivery, an Operator calls `PATCH /parcels/:id/deliver`. The system updates the parcel to **"Delivered"** and logs the terminal event.
161: - **Returns:** If a dispatched box bounces back to the warehouse, it is marked as **"Returned"**. A hard rule prevents returning a box that was never dispatched.
162: 
163: ---
164: 
165: #### Part 9: Notifications
166: 
167: Once dispatched, the system alerts the receiver.
168: 
169: **Table hit:** **`Notification_log`** A row is created tracking the recipient phone and message (`prc_SendNotification`). The status starts as "Not Sent". A webhook callback from the messaging provider eventually updates this to "Sent" or "Failed" (`prc_UpdateNotificationStatus`). Failed messages can be explicitly retried (`POST /notifications/:id/resend`).
170: 
171: ---
172: 
173: #### Part 10: Bulk Upload
174: 
175: Operators uploading 200+ orders via an Excel spreadsheet.
176: 
177: **Tables hit:** **`bulk_order_upload_log`** + **`bulk_order_upload_detail`**
178: 
179: - **Log Table:** Tracks the upload session header (Total Rows, Success Rows, Failed Rows).
180: - **Detail Table:** Logs the row-by-row success or failure messages (`prc_LogBulkUploadRowDetail`).
181: - For every successful row, the system runs the exact same `prc_CreateComplexOrder` transaction from Part 3.
182: 
183: ---
184: 
185: #### Part 11: Data Consumption & Visibility
186: 
187: With execution tracked meticulously at the parcel level, the frontend consumes this data in three powerful ways:
188: 
189: **1. The Amazon-Style Timeline** **Endpoint:** `GET /parcels/:id/timeline` Instead of looking at the order, the frontend queries `receiver_status_details` to build a vertical, chronological timeline of every physical event (Printed → Scanned → Linked → Dispatched → Delivered) for a single specific box.
190: 
191: **2. Real-Time Dashboard Metrics** **Endpoint:** `GET /dashboard/metrics` The dashboard shows system-wide totals (`totalOrders`, `pendingOrders`, `dispatchedOrders`). Because order statuses are not saved in the database, `prc_GetDashboardMetrics` calculates these aggregations dynamically on-the-fly purely from `parcel_details` states.
192: 
193: **3. System-Wide Audit & Reconciliation** **Endpoint:** `GET /parcel-events/export` Operators use the event log endpoints to browse system-wide events and download a CSV of the `receiver_status_details` log for end-of-day auditing and operator reconciliation.
194: 
195: ---
196: 
197: #### Part 12: Design Decisions Summary
198: 
199: ##### Decision 1: Unified, Append-Only Logging
200: 
201: We eliminated fragmented log tables. **All** physical execution events (prints, QR scans, AWB linking, dispatches) are written as **append-only** rows into `receiver_status_details`. This provides an unbreakable audit trail.
202: 
203: ##### Decision 2: Order Status is Derived (Never Stored)
204: 
205: To enforce "Parcel = Execution," we completely removed the order status column from `order_master`. Order status is calculated dynamically on-the-fly (`prc_GetAllOrdersSummary`) based on the aggregated states of its physical parcels.
206: 
207: - _Rule Example:_ If ALL parcels are DISPATCHED → Order is "Dispatched". If SOME parcels are printed → Order is "Partially Printed".
208: 
209: ##### Decision 3: Party Consolidation
210: 
211: We eliminated separate sender and customer tables. Everyone is a `Party_master`. The frontend maintains the "Sender" abstraction for user-friendliness, but the backend cleanly maps everything to the unified party table.
212: 
213: ##### Decision 4: Master Data CRUD in DB Procedures
214: 
215: Unlike older documentation which limited procedures to transactional flows, the backend heavily utilizes Master Data CRUD stored procedures (e.g., `prc_CreateProduct`, `prc_CreateCourierPartner`, `prc_FindOrCreateParty`) to keep data access strictly unified and optimized at the database layer.
````

## File: .agent/workflows/retrofit_backend_v1.md
````markdown
 1: ---
 2: description: Retrofits the existing backend codebase to comply with the latest AGENTS.md rules (Zod validation, text-based Bruno tests, and parcel_id transition)
 3: ---
 4: 
 5: // turbo
 6: 1. Verify that a `.antigravityignore` file exists in the project root containing `node_modules/`. If missing, create it first. 
 7: 
 8: 
 9: 2. Create a safety checkpoint. 
10: 
11: // turbo
12: 3. Run `git add -A && git commit -m "chore: checkpoint before backend retrofit"`
13: 
14: // turbo
15: 4. Use `grep` in the terminal to identify all Express route files in `src/` that lack Zod validation imports. 
16: 
17: // parallel
18: 5. Create and integrate strict Zod validation schemas for all identified routes. 
19: 
20: // turbo
21: 6. Use `find . -name "*.bru"` in the terminal to locate all native Bruno files. 
22: 
23: // parallel
24: 7. Convert the configuration of each identified `.bru` file into a new plain-text `[FeatureName]_Test_Data.txt` file, ensuring you include post-request scripts and assertions.
25:  
26: 8. Run `git rm` on all the old native `.bru` files to remove them safely. (Wait for user approval).
27: 
28: // turbo
29: 9. Use `grep -rn "qr_code" src/` in the terminal to locate any logic that stores, processes, or returns `qr_code` strings/blobs. 
30: 
31: 10. Refactor the identified `qr_code` logic to strictly use and return `parcel_id` instead, enforcing that the frontend handles QR generation.
32: 
33: // turbo
34: 11. Run the linter (`npm run lint`) to ensure the refactored code is clean. 
35: 
36: 12. Output a structured summary of the retrofitted files.
````

## File: .agent/workflows/sync_artifact_v1.md
````markdown
 1: ---
 2: description: Syncs an updated rule or artifact with the codebase, refactors code to match, and automatically bumps the artifact version.
 3: ---
 4: 
 5: 1. Ask the user which artifact in `.agent/rules/` was recently updated.
 6: 2. Read the specified artifact to understand the new rules, schemas, or API contracts.
 7: 3. Create a safety checkpoint.
 8: 
 9: // turbo
10: 4. Run `git add -A && git commit -m "chore: checkpoint before artifact sync"` 
11: 
12: // turbo
13: 5. Run terminal commands (e.g., `grep -rn "keyword" src/`) to efficiently locate codebase files affected by the artifact update, rather than blindly reading the whole directory.
14: 
15: 6. Refactor the necessary codebase files to perfectly match the new artifact definitions.
16: 7. Evaluate the severity of the changes made (minor vs. major).
17: 
18: // turbo
19: 8. Run `git mv` to increment the version number in the artifact's filename (e.g., `git mv .agent/rules/schema_v1.md .agent/rules/schema_v1.1.md`). 
20: 
21: 9. Update the description frontmatter inside the artifact file to log the changes and the new version. 
22: 
23: 10. Output a summary of the refactored files and the new artifact version.
````

## File: bruno-html-docs/Authentication-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Authentication - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Authentication\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Login Users\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/auth/login'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \"email\":\"admin@example.com\",\n            \"password\":\"securePass123\"\n          }\n\n          // {\n          //   \"email\": \"john@example.com\",\n          //   \"password\": \"password123\"\n          // }\n    runtime:\n      scripts:\n        - type: after-response\n          code: |-\n            // 1. Parse the JSON response\n            const response = res.getBody();\n\n            // 2. Check if login was successful and token exists\n            if (response.success && response.data && response.data.token) {\n              const token = response.data.token;\n              \n              // 3. Save the token to your environment variable\n              bru.setGlobalEnvVar(\"authToken\", token);\n              \n              console.log(\"Token successfully saved!\");\n            } else {\n              console.error(\"Login failed or token not found in response\");\n            }\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data.token\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 1. Login (Token Generation)\n      Authenticates a user and provides a JWT (JSON Web Token) to be used for subsequent authorized requests.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/auth/login` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"email\": \"admin@example.com\",\n        \"password\": \"securePass123\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\n          \"expiresIn\": \"8h\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Post-Request Script / Assertions**\n      * **Status Check:** `res.status` must be **200**.\n      * **Success Check:** `res.body.success` should be **true**.\n      * **Environment Setup:** Automatically store `res.body.data.token` as the variable `{{authToken}}`.\n\n      ---\n  - info:\n      name: System Health\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/system/health'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: Only Run this if you're in Office, or sure that the MYSQL Database is up & Running\n  - info:\n      name: USER Profile @private\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/auth/profile'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Get Profile Details\n      Retrieves the identity and permission metadata for the currently authenticated user based on the provided Bearer token. This ensures the frontend can adapt the UI based on the user's role.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/auth/profile` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"employeeCode\": \"EMP-001\",\n          \"firstName\": \"Admin\",\n          \"lastName\": \"User\",\n          \"roleCode\": \"ADMIN\",\n          \"permissions\": [\"CREATE_ORDER\", \"MANAGE_EMPLOYEES\"]\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Property Check:** `res.body.data` must contain the keys `employeeCode` and `roleCode`.\n      * **Type Validation:** `res.body.data.firstName` must be a **string**.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:20:35.691Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Bulk Upload-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Bulk Upload - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Bulk Upload\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: GET Specific Session Result\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/bulk-uploads/:id'\n      params:\n        - name: id\n          value: '1'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Get Specific Session Result\n\n      Fetch the detailed status and processing results of a specific bulk upload session. This includes summary metadata and an array of individual row results (successes and failures).\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/bulk-uploads/:id` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{token}}\n      ```\n\n      **Path Parameters**\n      * `id`: The unique identifier of the bulk upload session.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data.session.fileName` should be a **String**\n      * `res.body.data.details` should be an **Array**\n  - info:\n      name: List Bulk Upload Sessions\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/bulk-uploads'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## List Upload Sessions\n\n      Retrieve a list of all bulk upload sessions performed by the user. This is useful for tracking the status and history of multiple batch processing requests.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/bulk-uploads` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{token}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": \"bulk_88291\",\n            \"fileName\": \"test_orders.json\",\n            \"totalRows\": 2,\n            \"processedRows\": 2,\n            \"status\": \"completed\",\n            \"createdAt\": \"2026-04-20T09:40:00Z\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data[0].fileName` should be a **String**\n      * `res.body.data[0].totalRows` should be a **Number**\n  - info:\n      name: Submit Bulk Upload\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/bulk-uploads'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \"fileName\": \"test_orders.json\",\n            \"rows\": [\n              {\n                \"senderName\": \"Bulk Sender One\",\n                \"senderMobile\": \"9000000001\",\n                \"senderAddress\": \"123 Bulk Road, Surat\",\n                \"courierId\": 1,\n                \"receivers\": [\n                  {\n                    \"receiverName\": \"Bulk Receiver Alpha\",\n                    \"receiverPhone\": \"8000000001\",\n                    \"addressLine1\": \"A-101, Alpha Towers\",\n                    \"city\": \"Mumbai\",\n                    \"state\": \"Maharashtra\",\n                    \"pincode\": \"400001\",\n                    \"products\": [\n                      {\n                        \"productId\": 1,\n                        \"qty\": 10,\n                        \"unitPrice\": 450.00\n                      }\n                    ]\n                  }\n                ]\n              },\n              {\n                \"senderName\": \"Bulk Sender Two\",\n                \"senderMobile\": \"9000000002\",\n                \"senderAddress\": \"456 Bulk Ave, Delhi\",\n                \"courierId\": 1,\n                \"receivers\": [\n                  {\n                    \"receiverName\": \"Bulk Receiver Beta\",\n                    \"receiverPhone\": \"8000000002\",\n                    \"addressLine1\": \"B-202, Beta Plaza\",\n                    \"city\": \"New Delhi\",\n                    \"state\": \"Delhi\",\n                    \"pincode\": \"110001\",\n                    \"products\": [\n                      {\n                        \"productId\": 2,\n                        \"qty\": 5,\n                        \"unitPrice\": 1200.00\n                      }\n                    ]\n                  }\n                ]\n              }\n            ]\n          }\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Submit Bulk Upload\n\n      This endpoint allows for the batch processing of multiple orders. It accepts a list of senders, receivers, and associated products to streamline high-volume parcel creation.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/bulk-uploads` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{token}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"fileName\": \"test_orders.json\",\n        \"rows\": [\n          {\n            \"senderName\": \"Bulk Sender One\",\n            \"senderMobile\": \"9000000001\",\n            \"senderAddress\": \"123 Bulk Road, Surat\",\n            \"courierId\": 1,\n            \"receivers\": [\n              {\n                \"receiverName\": \"Bulk Receiver Alpha\",\n                \"receiverPhone\": \"8000000001\",\n                \"addressLine1\": \"A-101, Alpha Towers\",\n                \"city\": \"Mumbai\",\n                \"state\": \"Maharashtra\",\n                \"pincode\": \"400001\",\n                \"products\": [\n                  {\n                    \"productId\": 1,\n                    \"qty\": 10,\n                    \"unitPrice\": 450.00\n                  }\n                ]\n              }\n            ]\n          },\n          {\n            \"senderName\": \"Bulk Sender Two\",\n            \"senderMobile\": \"9000000002\",\n            \"senderAddress\": \"456 Bulk Ave, Delhi\",\n            \"courierId\": 1,\n            \"receivers\": [\n              {\n                \"receiverName\": \"Bulk Receiver Beta\",\n                \"receiverPhone\": \"8000000002\",\n                \"addressLine1\": \"B-202, Beta Plaza\",\n                \"city\": \"New Delhi\",\n                \"state\": \"Delhi\",\n                \"pincode\": \"110001\",\n                \"products\": [\n                  {\n                    \"productId\": 2,\n                    \"qty\": 5,\n                    \"unitPrice\": 1200.00\n                  }\n                ]\n              }\n            ]\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Response Structure (Example)**\n\n      **Status Code:** `202 Accepted`\n\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"uploadId\": \"bulk_88291\",\n          \"status\": \"processing\",\n          \"message\": \"Bulk upload has been queued for processing.\"\n        }\n      }\n      ```\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:24:46.997Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Courier Partners-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Courier Partners - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Courier Partners\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Create Courier\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/courier-partners'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |\n          {\n            \"courierName\": \"Speedy Express\",\n            \"phoneNo\": \"1234567890\",\n            \"trackingUrlTemplate\": \"https://speedy.express/track?awb={AWB}\"\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.success\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data.courierName\n          operator: eq\n          value: '\"Speedy Express\"'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Create Courier Partner\n      Registers a new shipping provider in the system. The `trackingUrlTemplate` is a critical field, as it allows the system to dynamically generate tracking links for customers by replacing the `{AWB}` placeholder with actual tracking numbers.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/courier-partners` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"courierName\": \"Speedy Express\",\n        \"phoneNo\": \"1234567890\",\n        \"trackingUrlTemplate\": \"https://speedy.express/track?awb={AWB}\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"courierName\": \"Speedy Express\",\n          \"phoneNo\": \"1234567890\",\n          \"trackingUrlTemplate\": \"https://speedy.express/track?awb={AWB}\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Data Integrity:** `res.body.data.courierName` must match exactly **\"Speedy Express\"**.\n\n      ---\n  - info:\n      name: Delete Courier\n      type: http\n      seq: 5\n    http:\n      method: DELETE\n      url: '{{base_url}}/courier-partners/3'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Delete Courier Partner\n      Removes a courier partner from the active rotation. Like other modules in this sprint, this action typically flags the partner as inactive to ensure that historical order tracking links remain functional.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `DELETE` |\n      | **URL** | `{{baseUrl}}/api/v1/courier-partners/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"message\": \"Courier partner deleted successfully\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Persistence Check:** The deleted courier should no longer appear in the results for the **Get All Courier Partners** endpoint.\n\n      ---\n  - info:\n      name: Get Courier By ID\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/courier-partners/:id'\n      params:\n        - name: id\n          value: '3'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: List Couriers\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/courier-partners?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data[0].courierName\n          operator: isDefined\n          value: ''\n        - expression: res.body.data[0].trackingUrlTemplate\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. Get All Courier Partners\n      Retrieves a list of all active courier partners integrated with the platform, including their unique tracking URL templates.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/courier-partners` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 1,\n            \"courierName\": \"Speedy Express\",\n            \"phoneNo\": \"1234567890\",\n            \"trackingUrlTemplate\": \"https://speedy.express/track?awb={AWB}\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Field Validation:** Each record must contain a `courierName` and a `trackingUrlTemplate`.\n\n      ---\n  - info:\n      name: Update Courier\n      type: http\n      seq: 4\n    http:\n      method: PUT\n      url: '{{base_url}}/courier-partners/3'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \"courierName\": \"Speedy Express Premium\"\n            //  \"trackingUrlTemplate\": \"https://speedooo.express/track?awb={AWB}\"\n            //   \"isActive\": false\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Update Courier Partner\n      Enables the modification of an existing courier partner's details, such as rebranding the partner name or updating contact information.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/courier-partners/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"courierName\": \"Speedy Express Premium\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"courierName\": \"Speedy Express Premium\",\n          \"updatedAt\": \"2026-04-20T10:35:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Verification:** The response body should confirm the name change to **\"Speedy Express Premium\"**.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:21:33.618Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Dashboard-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Dashboard - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Dashboard\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: GET Metrics (ADMIN User)\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/dashboard/metrics'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |\n      ### TEST 1: Get Metrics (ADMIN User)\n      **Description:** Fetches system-wide metrics from DB.\n      **HTTP Method:** GET\n      **URL:** {{baseUrl}}/api/v1/dashboard/metrics\n      **Headers:** \n      - Authorization: Bearer {{adminToken}}\n      - Content-Type: application/json\n\n      **Assertions:**\n      - Status Code: 200\n      - Success: true\n      - Body Path `data`: exists\n      - Body Path `data.totalOrders`: is a number\n      - Body Path `data.totalParcels`: is a number\n\n      ---\n  - info:\n      name: GET Metrics (Unauthenticated)\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/dashboard/metrics'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |\n      ### TEST 3: Get Metrics (Unauthenticated)\n      **Description:** Should fail with 401.\n      **HTTP Method:** GET\n      **URL:** {{baseUrl}}/api/v1/dashboard/metrics\n      **Headers:** \n      - Content-Type: application/json\n\n      **Assertions:**\n      - Status Code: 401\n      - Success: false\n  - info:\n      name: '[OR] - GET Metrics '\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/dashboard/metrics'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |\n      ### TEST 2: Get Metrics (OPERATOR User - Forbidden)\n      **Description:** Should fail with 403.\n      **HTTP Method:** GET\n      **URL:** {{baseUrl}}/api/v1/dashboard/metrics\n      **Headers:** \n      - Authorization: Bearer {{operatorToken}}\n      - Content-Type: application/json\n\n      **Assertions:**\n      - Status Code: 403\n      - Success: false\n      - Error: contains \"is not authorized for this route\"\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:25:44.296Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Dispatch and Terminal States-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Dispatch and Terminal States - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Dispatch and Terminal States\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: BULK Dispatch Parcels (Happy Path)\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. Dispatch Parcels (Bulk \u2014 Happy Path)\n      Finalizes the warehouse process by moving multiple parcels from the linked stage to the dispatched stage in a single operation.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      Target parcels must be in the `AWB_LINKED` state.\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": [1, 2]\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"dispatched\": 2,\n          \"parcels\": [\n            { \"id\": 1, \"status\": \"DISPATCHED\", \"dispatchDate\": \"2026-04-20T10:45:00Z\" },\n            { \"id\": 2, \"status\": \"DISPATCHED\", \"dispatchDate\": \"2026-04-20T10:45:00Z\" }\n          ]\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**.\n      * `res.body.success` should equal **true**.\n      * **Transition Logic:** Every parcel ID in the array must now show `status: \"DISPATCHED\"`.\n      * **Data Integrity:** A `dispatchDate` timestamp must be generated for each record.\n\n      ---\n\n      ### **Post-Request Verification**\n      * **GET** `{{baseUrl}}/api/v1/parcels/1/timeline`\n      * **Check:** Verify a `STATUS_UPDATE` event exists with `newStatus: \"DISPATCHED\"`.\n\n      ---s\n  - info:\n      name: Cancel Parcel (Happy Path - Before Dispatch)\n      type: http\n      seq: 7\n    http:\n      method: PATCH\n      url: '{{base_url}}/parcels/2/cancel'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 7. Cancel Parcel (Happy Path \u2014 Before Dispatch)\n      Allows the cancellation of a parcel as long as it has not yet left the facility. This is applicable for orders in `PENDING`, `LABEL_PRINTED`, or `AWB_LINKED` states.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/2/cancel` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 2) must be in a pre-dispatch state (e.g., `PENDING`).\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"status\": \"CANCELLED\",\n          \"previousStatus\": \"PENDING\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **State Check:** The status must be successfully updated to **\"CANCELLED\"**.\n\n      ---\n  - info:\n      name: Deliver Parcels (Happy Path)\n      type: http\n      seq: 5\n    http:\n      method: PATCH\n      url: '{{base_url}}/parcels/1/deliver'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Deliver Parcel (Happy Path)\n      Updates a parcel to its final terminal state: `DELIVERED`. This signifies the completion of the delivery lifecycle.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/deliver` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 1) must currently be in the `DISPATCHED` state.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"status\": \"DELIVERED\",\n          \"previousStatus\": \"DISPATCHED\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **State Check:** Confirm the `status` has transitioned to **\"DELIVERED\"**.\n\n      ---\n  - info:\n      name: Return Parcel (Happy Path - After Dispatch)\n      type: http\n      seq: 9\n    http:\n      method: PATCH\n      url: '{base_url}}/parcels/1/return'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 9. Return Parcel (Happy Path \u2014 After Dispatch)\n      Logs a parcel as returned. This terminal state is applicable only after a parcel has been dispatched or delivered, representing a reversal in the logistics flow.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/return` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 1) must be in either the `DISPATCHED` or `DELIVERED` state.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"status\": \"RETURNED\",\n          \"previousStatus\": \"DISPATCHED\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **State Check:** Confirm the `status` has transitioned to **\"RETURNED\"**.\n\n      ---\n\n      Ready for Unit 10 (Return \u2014 State Validation)?\n  - info:\n      name: '[CR]: BULK Dispatch Parcels (Happy Path)'\n      type: http\n      seq: 11\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Courier Role \u2014 Cannot Dispatch\n\n      This test ensures that the dispatch action is restricted to higher-level administrative roles and that users with the `COURIER` role are blocked from executing bulk dispatches.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{courierToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": [1]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * **Validation:** Only `ADMIN` and `OPERATOR` roles are authorized to dispatch parcels.\n  - info:\n      name: Return Parcel (Not Dispatched - Wrong State)\n      type: http\n      seq: 10\n    http:\n      method: PATCH\n      url: '{base_url}}/parcels/1/return'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 10. Return \u2014 Wrong State (Not Dispatched)\n      Ensures that a parcel cannot be marked as \"Returned\" if it never left the facility. The system requires a parcel to have reached at least the `DISPATCHED` state before a return can be processed, as you cannot return what was never sent.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/2/return` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 2) is currently in a pre-dispatch state (e.g., `PENDING` or `LABEL_PRINTED`).\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Invalid state transition: cannot move parcel from 'PENDING' to 'RETURNED'...\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Validation:** The system must block the transition, confirming that a parcel cannot be returned before it is dispatched.\n\n      ---\n  - info:\n      name: Cancel Parcel (Wrong State - Already Dispatched)\n      type: http\n      seq: 8\n    http:\n      method: PATCH\n      url: '{{base_url}}/parcels/2/cancel'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 8. Cancel \u2014 Wrong State (Already Dispatched)\n      Enforces the rule that once a parcel has physically left the facility (status `DISPATCHED`), it can no longer be cancelled through the standard cancellation flow. At this stage, the \"Return\" flow must be used instead.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/cancel` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 1) is already in the `DISPATCHED` state.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Invalid state transition: cannot move parcel from 'DISPATCHED' to 'CANCELLED'...\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Logic Check:** The system must reject the cancellation and inform the user that the transition from `DISPATCHED` is prohibited.\n\n      ---\n  - info:\n      name: Deliver Parcels - Wrong State (Not Dispatched)\n      type: http\n      seq: 6\n    http:\n      method: PATCH\n      url: '{{base_url}}/parcels/1/deliver'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Deliver \u2014 Wrong State (Not Dispatched)\n      Prevents a parcel from being marked as delivered if it hasn't actually been dispatched yet. This logical guard ensures the integrity of the delivery timeline.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/deliver` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Pre-condition**\n      The parcel (ID 1) is currently in a non-dispatched state (e.g., `PENDING`, `LABEL_PRINTED`, or `AWB_LINKED`).\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Invalid state transition: cannot move parcel from 'PENDING' to 'DELIVERED'...\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Business Logic:** The system must block the transition and return a relevant error message regarding the invalid state sequence.\n\n      ---\n  - info:\n      name: BULK Dispatch Parcels- Wrong State (Still PENDING)\n      type: http\n      seq: 2\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Dispatch \u2014 Wrong State (Still PENDING)\n      Ensures that a parcel cannot be dispatched if the mandatory prerequisite of linking an AWB (Air Waybill) has not been met. This maintains the integrity of the shipping pipeline.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      The parcel (e.g., ID 1) exists but is still in the `PENDING` or `LABEL_PRINTED` state (not yet `AWB_LINKED`).\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": [1]\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot dispatch parcel PDS-A1B2C3: status is 'PENDING'. Dispatch requires AWB_LINKED status.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Logic Check:** The error message must specify that the current status is insufficient for dispatch.\n\n      ---\n  - info:\n      name: BULK Dispatch Parcels \u2014 Parcel Not Found\n      type: http\n      seq: 3\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Dispatch \u2014 Parcel Not Found\n      Validates that the bulk dispatch operation fails correctly when provided with a parcel ID that does not exist in the database.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": [9999]\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `404 Not Found`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Parcel with ID 9999 not found\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **404**\n      * `res.body.success` should equal **false**\n      * **Validation:** The error message should clearly identify the missing ID.\n\n      ---\n  - info:\n      name: BULK Dispatch Parcels \u2014 Validation Error (Empty Array)\n      type: http\n      seq: 4\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/dispatch'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Dispatch \u2014 Validation Error (Empty Array)\n      Protects the system from processing empty bulk requests. The API requires at least one parcel ID to initiate a dispatch job.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/dispatch` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"parcelIds\": []\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Validation Error - parcelIds: At least one parcel ID is required\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Schema Check:** The API must return a validation error when the `parcelIds` array is empty.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:23:56.925Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Employee Management (ADMIN)-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Employee Management (ADMIN) - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Employee Management (ADMIN)\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Create Employee\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/employees'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |\n          {\n            \"employeeName\": \"John Doe\",\n            \"email\": \"john@example.com\",\n            \"phoneNo\": \"9000000000\",\n            \"roleCode\": \"OPERATOR\",\n            \"password\": \"password123\"\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '201'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data.employeeCode\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Create Employee\n      Registers a new user into the system with specific access privileges defined by their `roleCode`. This endpoint handles the initial setup of credentials and account status.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/employees` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"employeeName\": \"John Doe\",\n        \"email\": \"john@example.com\",\n        \"phoneNo\": \"9000000000\",\n        \"roleCode\": \"OPERATOR\",\n        \"password\": \"password123\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK` or `201 Created`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 5,\n          \"employeeName\": \"John Doe\",\n          \"roleCode\": \"OPERATOR\",\n          \"createdAt\": \"2026-04-20T10:40:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should be **200** or **201**.\n      * `res.body.success` should equal **true**.\n      * **Data Validation:** The `employeeName` in the response must match **\"John Doe\"**.\n      * **Security Check:** The `password` field should **never** be returned in the response body.\n\n      ---\n  - info:\n      name: Get Employee By ID\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/employees/:id'\n      params:\n        - name: id\n          value: '3'\n          type: path\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: List Employees\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/employees?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. List All Employees\n      Retrieves a comprehensive list of staff members. This is typically restricted to users with **ADMIN** privileges to manage system access.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/employees` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 1,\n            \"employeeName\": \"John Doe\",\n            \"email\": \"john@example.com\",\n            \"roleCode\": \"OPERATOR\",\n            \"allowLogin\": true\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Data Integrity:** The response should return an array of employee objects.\n\n      ---\n  - info:\n      name: Toggle Access\n      type: http\n      seq: 5\n    http:\n      method: PATCH\n      url: '{{base_url}}/employees/3/toggle-access'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |2-\n            {\n              \"allowLogin\": false\n            }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n        - expression: res.body.data.allowLogin\n          operator: isFalsy\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Toggle Employee Access\n      Controls an employee's ability to log into the system without deleting their record. This is vital for temporary suspensions or immediate revocation of access upon offboarding.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/employees/1/toggle-access` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"allowLogin\": false\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"employeeName\": \"John Doe Updated\",\n          \"allowLogin\": false,\n          \"statusMessage\": \"Login access has been disabled.\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Logic Check:** The `allowLogin` flag in the response must match the boolean value sent in the payload.\n\n      ---\n  - info:\n      name: Update Employee\n      type: http\n      seq: 4\n    http:\n      method: PUT\n      url: '{{base_url}}/employees/3'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n              \"employeeName\": \"Ravi Kumar Updated\"\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.success\n          operator: isTruthy\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Update Employee\n      Modifies the profile information of an existing employee record. This is used for administrative updates such as name changes or contact detail corrections.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/employees/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"employeeName\": \"John Doe Updated\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"employeeName\": \"John Doe Updated\",\n          \"updatedAt\": \"2026-04-20T10:45:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Verification:** The `employeeName` field in the response must reflect the updated value.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:21:25.193Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Label Print Logging-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Label Print Logging - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Label Print Logging\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Log Label Print (Happy Path)\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      # LABEL PRINT MODULE \u2014 API Documentation\n      **Sprint 3, Feature B: Label Print Logging**\n\n      ---\n\n      ## 1. Log Label Print (Happy Path)\n      Records the initial printing of a shipping label for a specific parcel. This action triggers a state change in the system and increments the print counter.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Body**\n      *(None Required)*\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-12345\",\n          \"status\": \"LABEL_PRINTED\",\n          \"labelPrintCount\": 1\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **State Transition:** The `status` must update to **\"LABEL_PRINTED\"**.\n      * **Counter Logic:** The `labelPrintCount` must be exactly **1**.\n\n      ---\n\n      ### **Post-Request Verification**\n      1.  **GET** `{{baseUrl}}/api/v1/parcels/1/timeline`\n      2.  **Verify:** A new `STATUS_UPDATE` event should exist.\n      3.  **Check:** `previousStatus` should be \"PENDING\" and `newStatus` should be \"LABEL_PRINTED\".\n\n      ---\n  - info:\n      name: Re-Print Label (Increment Count)\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Re-Print Label (Increment Count)\n      Allows operators to re-print a label if the original was lost or damaged. The system tracks these occurrences by incrementing the `labelPrintCount` without changing the parcel's status, as it is already in the printed state.\n\n      ---\n\n      ### **Pre-condition**\n      The parcel must already be in the `LABEL_PRINTED` state (following the completion of Unit 1).\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-12345\",\n          \"status\": \"LABEL_PRINTED\",\n          \"labelPrintCount\": 2\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Counter Logic:** The `labelPrintCount` must increment (e.g., from 1 to **2**).\n      * **State Persistence:** The status must remain **\"LABEL_PRINTED\"**.\n\n      ---\n  - info:\n      name: Log Print \u2014 Invalid State (Already AWB_LINKED)\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Log Print \u2014 Invalid State (Already AWB_LINKED)\n      Validates that a label cannot be printed once the parcel has progressed to a later stage in the workflow, such as being linked to an Air Waybill (AWB). This prevents operational errors where labels might be reprinted for parcels already out for delivery.\n\n      ---\n\n      ### **Pre-condition**\n      The parcel must be in the `AWB_LINKED` state.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot print label: parcel is in 'AWB_LINKED' state...\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Error Detail:** The error message must explicitly mention the invalid state (`AWB_LINKED`) as the reason for rejection.\n\n      ---\n  - info:\n      name: Log Print \u2014 Parcel Not Found\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Log Print \u2014 Parcel Not Found\n      Ensures the system handles requests for non-existent parcel IDs gracefully by returning a standard \"Not Found\" error.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/9999/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `404 Not Found`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Parcel not found\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **404**\n      * `res.body.success` should equal **false**\n      * **Error Message:** The response must clearly state that the parcel was not found.\n\n      ---\n  - info:\n      name: '[CR] Log Print \u2014  Forbidden'\n      type: http\n      seq: 5\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/log-print'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Log Print \u2014 COURIER Role Forbidden\n      Verifies that access control is strictly enforced. Only accounts with **ADMIN** or **OPERATOR** roles should have the authority to log label prints; external or restricted roles like **COURIER** must be denied.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/log-print` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `403 Forbidden`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Access denied: Insufficient permissions to perform this action.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * `res.body.success` should equal **false**\n      * **Authorization Logic:** The request must be rejected because the `COURIER` role does not possess the required permission scope.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:23:08.221Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Notification-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Notification - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Notification\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Get notification history for parcel\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/:parcelid/notifications'\n      params:\n        - name: parcelid\n          value: '5'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Get Notification History for Parcel\n\n      Retrieves a comprehensive list of all notification attempts and statuses associated with a specific parcel.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/5/notifications` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{adminToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 12,\n            \"type\": \"dispatch_confirmation\",\n            \"status\": \"sent\",\n            \"sent_at\": \"2026-04-20T09:40:19Z\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data` should be an **Array**\n  - info:\n      name: Notification Webhook (Status update)\n      type: http\n      seq: 4\n    http:\n      method: POST\n      url: '{{base_url}}/notifications/webhook'\n      body:\n        type: json\n        data: |-\n          {\n            \"notificationId\": 12,\n            \"status\": \"delivered\",\n            \"externalId\": \"SMS_GATEWAY_XYZ_999\"\n          }\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Notification Webhook (Status Update)\n\n      Endpoint for external service providers (e.g., SMS or Email gateways) to send asynchronous status updates regarding notification delivery.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/notifications/webhook` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"notificationId\": 12,\n        \"status\": \"delivered\",\n        \"externalId\": \"SMS_GATEWAY_XYZ_999\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"appStatusId\": 2\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data.appStatusId` should equal **2**\n  - info:\n      name: Resend Failed Notification\n      type: http\n      seq: 2\n    http:\n      method: POST\n      url: '{{base_url}}/notifications/:parcelid/resend'\n      params:\n        - name: parcelid\n          value: '12'\n          type: path\n      body:\n        type: json\n        data: |-\n          {}\n          // If this doesn't work just select 'no-body' instead of 'JSON' in top right\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Resend Failed Notification\n\n      Triggers a manual retry for a notification that previously failed to deliver.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/notifications/12/resend` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer {{adminToken}}\n      ```\n\n      **Payload**\n      ```json\n      {}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"message\": \"Notification sent successfully\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data.message` should equal **\"Notification sent successfully\"**\n  - info:\n      name: Send Dispatch Notification\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/:parcelid/notify'\n      params:\n        - name: parcelid\n          value: '5'\n          type: path\n      body:\n        type: json\n        data: |-\n          {}\n          // If this doesn't work just select 'no-body' instead of 'JSON' in top right\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Send Dispatch Notification\n\n      Send a notification to the recipient confirming that the parcel has been dispatched.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/5/notify` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer {{adminToken}}\n      ```\n\n      **Payload**\n      ```json\n      {}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"message\": \"Notification sent successfully\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * `res.body.data.message` should equal **\"Notification sent successfully\"**\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:25:03.775Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Order Pipeline-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Order Pipeline - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Order Pipeline\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Cancel Order (Blocked - Parcel Dispatched)\n      type: http\n      seq: 7\n    http:\n      method: PATCH\n      url: '{{base_url}}/orders/1/cancel'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 7. Cancel Order (Blocked \u2014 Parcel Dispatched)\n      Validates the safeguard preventing order cancellation if the fulfillment process is too far advanced.\n\n      ---\n\n      ### **Pre-condition**\n      * At least one parcel in this order must have a status of `DISPATCHED` or `DELIVERED`.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1/cancel` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot cancel order: one or more parcels are already dispatched or delivered.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Error Validation:** The error message must specifically cite that dispatched/delivered parcels are blocking the cancellation.\n\n      ---\n\n      Shall I provide the final unit for this module?\n  - info:\n      name: Cancel Order\n      type: http\n      seq: 6\n    http:\n      method: PATCH\n      url: '{{base_url}}/orders/1/cancel'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Cancel Order (Happy Path)\n      Verifies that an order can be successfully cancelled, which should trigger the cancellation of all associated parcels that have not yet been dispatched.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PATCH` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1/cancel` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"cancelledParcels\": 2,\n          \"cancelledBy\": \"EMP-OPERATOR-01\",\n          \"timestamp\": \"2026-04-20T10:20:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Verification:** The response should return the count of parcels successfully moved to a cancelled state.\n\n      ---\n  - info:\n      name: Create Order\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/orders'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |\n          {\n            \"senderName\": \"Munna Bhai\",\n            \"senderMobile\": \"9876543210\",\n            \"senderAddress\": \"14, Gandhi Nagar, Near Railway Station, Surat, Gujarat 395002\",\n            \"courierId\": 1,\n            \"receivers\": [\n              {\n                \"receiverName\": \"Delhi Fabrics Ltd.\",\n                \"receiverPhone\": \"9123456780\",\n                \"addressLine1\": \"45, Karol Bagh\",\n                \"city\": \"New Delhi\",\n                \"state\": \"Delhi\",\n                \"pincode\": \"110005\",\n                \"products\": [\n                  { \"productId\": 1, \"qty\": 5, \"unitPrice\": 420.00 },\n                  { \"productId\": 3, \"qty\": 2, \"unitPrice\": 1100.00 }\n                ]\n              },\n              {\n                \"receiverName\": \"Mumbai Silk House\",\n                \"receiverPhone\": \"9988776655\",\n                \"addressLine1\": \"22, Linking Road\",\n                \"addressLine2\": \"Bandra West\",\n                \"city\": \"Mumbai\",\n                \"state\": \"Maharashtra\",\n                \"pincode\": \"400050\",\n                \"products\": [\n                  { \"productId\": 1, \"qty\": 3, \"unitPrice\": 450.00 }\n                ]\n              }\n            ]\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '201'\n        - expression: res.body.data.receivers[0].parcel.parcel_id\n          operator: startsWith\n          value: '\"PDS\"'\n        - expression: res.body.data.receivers[0].parcel.parcel_id\n          operator: isDefined\n          value: ''\n        - expression: res.body.data.receivers[0].parcel.parcelStatusCode\n          operator: eq\n          value: '\"PENDING\"'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 1. Create Complex Order\n      Allows an operator to create a bulk order consisting of a single sender and multiple receivers. Each receiver entry automatically generates a corresponding parcel with a unique tracking identifier.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/orders` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"senderName\": \"Ramesh Textiles\",\n        \"senderMobile\": \"9876543210\",\n        \"senderAddress\": \"14, Gandhi Nagar, Near Railway Station, Surat, Gujarat 395002\",\n        \"courierId\": 1,\n        \"receivers\": [\n          {\n            \"receiverName\": \"Delhi Fabrics Ltd.\",\n            \"receiverPhone\": \"9123456780\",\n            \"addressLine1\": \"45, Karol Bagh\",\n            \"city\": \"New Delhi\",\n            \"state\": \"Delhi\",\n            \"pincode\": \"110005\",\n            \"products\": [\n              { \"productId\": 1, \"qty\": 5, \"unitPrice\": 420.00 },\n              { \"productId\": 3, \"qty\": 2, \"unitPrice\": 1100.00 }\n            ]\n          },\n          {\n            \"receiverName\": \"Mumbai Silk House\",\n            \"receiverPhone\": \"9988776655\",\n            \"addressLine1\": \"22, Linking Road\",\n            \"addressLine2\": \"Bandra West\",\n            \"city\": \"Mumbai\",\n            \"state\": \"Maharashtra\",\n            \"pincode\": \"400050\",\n            \"products\": [\n              { \"productId\": 1, \"qty\": 3, \"unitPrice\": 450.00 }\n            ]\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `201 Created`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"orderId\": 123,\n          \"orderCode\": \"ORD-778899\",\n          \"receivers\": [\n            {\n              \"receiverName\": \"Delhi Fabrics Ltd.\",\n              \"parcel\": {\n                \"parcelId\": \"PDS-DEL-001\",\n                \"status\": \"PENDING\"\n              }\n            }\n          ]\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **201**\n      * `res.body.success` should equal **true**\n      * **Parcel Generation:** Each receiver must have a nested `parcel` object.\n      * **Identifier Logic:** `parcelId` must start with the prefix **\"PDS-\"**.\n      * **Initial State:** Parcel status must be **\"PENDING\"**.\n\n      ---\n  - info:\n      name: Get Order Summary\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/orders/1'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: ''\n          operator: eq\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Get Order Aggregate\n      Retrieves a comprehensive view of a single order, including all nested relationships such as receivers, their specific product items, and their corresponding parcel tracking details.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"orderId\": 1,\n          \"orderCode\": \"ORD-778899\",\n          \"senderName\": \"Ramesh Textiles\",\n          \"receivers\": [\n            {\n              \"receiverName\": \"Delhi Fabrics Ltd.\",\n              \"items\": [\n                { \"productId\": 1, \"productName\": \"Cotton Roll\", \"qty\": 5 }\n              ],\n              \"parcel\": {\n                \"id\": 50,\n                \"parcelId\": \"PDS-DEL-001\",\n                \"status\": \"PENDING\"\n              }\n            }\n          ]\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Structure Validation:** The response must follow the nested hierarchy: **Order \u2192 Receivers \u2192 [Items, Parcel]**.\n      * **Data Integrity:** The `parcel` object must be linked and present for every receiver in the array.\n\n      ---\n  - info:\n      name: List Orders\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/orders?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.data[0].derivedStatus\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. List Orders (Paginated)\n      Retrieves a paginated list of all orders. This view includes a `derivedStatus`, which is calculated based on the aggregate states of all parcels associated with that order.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/orders?page=1&limit=20` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"orderId\": 1,\n            \"orderCode\": \"ORD-2026-001\",\n            \"senderName\": \"Ramesh Textiles\",\n            \"derivedStatus\": \"PARTIALLY_DISPATCHED\",\n            \"createdAt\": \"2026-04-20T10:00:00Z\"\n          }\n        ],\n        \"meta\": {\n          \"page\": 1,\n          \"limit\": 20,\n          \"totalRows\": 45,\n          \"totalPages\": 3\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Logic Check:** Each order object must include a `derivedStatus` field.\n      * **Metadata Check:** Response must include standard pagination metadata (`page`, `limit`, `totalRows`, `totalPages`).\n\n      ---\n\n      Ready for Unit 3?\n  - info:\n      name: Update Order (Blocked - Parcel >= AWB_LINKED)\n      type: http\n      seq: 5\n    http:\n      method: PUT\n      url: '{{base_url}}/orders/1'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |+\n          {\n            \"senderName\": \"Should Fail\"\n          }\n\n          // Pre-condition: At least one parcel in this order must be AWB_LINKED or DISPATCHED\n\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '400'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Update Order (Blocked \u2014 Parcel \u2265 AWB_LINKED)\n      This test validates the business logic that prevents an order from being modified once the fulfillment process has reached a critical stage (i.e., once any associated parcel is linked to an Air Waybill or dispatched).\n\n      ---\n\n      ### **Pre-condition**\n      * At least one parcel associated with this `orderId` must have its status set to `AWB_LINKED` or `DISPATCHED`.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"senderName\": \"Should Fail\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot update order: one or more parcels have already been AWB-linked or dispatched.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * `res.body.error` must match the specific business logic error message.\n\n      ---\n  - info:\n      name: Update Order (Happy Path)\n      type: http\n      seq: 4\n    http:\n      method: PUT\n      url: '{{base_url}}/orders/1'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \"senderName\": \"Ramesh Textiles Updated\",\n          //   \"senderName\": \"Ramesh Textiles\",\n            \"courierId\": 2\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Update Order (Happy Path)\n      Allows for the modification of order details (such as sender information or courier preferences) as long as the order is still in a preliminary state.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/orders/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"senderName\": \"Ramesh Textiles Updated\",\n        \"courierId\": 2\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"orderId\": 1,\n          \"senderName\": \"Ramesh Textiles Updated\",\n          \"courierId\": 2,\n          \"updatedAt\": \"2026-04-20T10:15:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Validation:** The response body must reflect the updated `senderName`.\n\n      ---\n  - info:\n      name: '[CR] - List Orders (Read-only Access)'\n      type: http\n      seq: 8\n    http:\n      method: GET\n      url: '{{base_url}}/orders?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.data[0].derivedStatus\n          operator: isDefined\n          value: ''\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 8. COURIER Role \u2014 List Orders (Read-Only Access)\n      Ensures that users with the `COURIER` role can view order records but are restricted from performing any write operations (create, edit, or cancel).\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/orders?page=1&limit=10` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Access Control Check:** The `COURIER` role must have successful read-only access to the order list.\n      * **Permission Logic:** Any attempt by a `COURIER` to use `POST`, `PUT`, `PATCH`, or `DELETE` on this module should result in a **403 Forbidden** status.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:22:33.184Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Parcel Events & Audit Export-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Parcel Events &amp; Audit Export - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Parcel Events & Audit Export\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Browse Events with ActionType Filter\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?actionType=AWB_LINK'\n      params:\n        - name: actionType\n          value: AWB_LINK\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse Events with ActionType Filter\n\n      Verifies that the event logs can be filtered by a specific type of action, such as linking an Air Waybill (AWB).\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?actionType=AWB_LINK` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** All returned events must have an `actionType` exactly matching **\"AWB_LINK\"**.\n  - info:\n      name: Browse Events with Combined Filters\n      type: http\n      seq: 5\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?actionType=STATUS_UPDATE&scannedBy=EMP001&dateFrom=2026-03-29'\n      params:\n        - name: actionType\n          value: STATUS_UPDATE\n          type: query\n        - name: scannedBy\n          value: EMP001\n          type: query\n        - name: dateFrom\n          value: '2026-03-29'\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse Events with Combined Filters\n\n      Verifies that the API correctly applies multiple filters simultaneously, ensuring the result set only contains events that meet every specified criterion.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?actionType=STATUS_UPDATE&scannedBy=EMP001&dateFrom=2026-03-29` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Filter Logic:** Events must match **ALL** filter criteria simultaneously (`actionType`, `scannedBy`, and `dateFrom`).\n  - info:\n      name: Browse Events with ScannedBy Filter\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?scannedBy=EMP001'\n      params:\n        - name: scannedBy\n          value: EMP001\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse Events with ScannedBy Filter\n\n      Verifies the ability to filter the event logs by the specific employee or system entity that performed the action.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?scannedBy=EMP001` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** All returned events must have a `scannedBy` value exactly matching **\"EMP001\"**.\n  - info:\n      name: Browse all events (No filter)\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?page=1&limit=50'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '50'\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse All Events (No Filters)\n\n      Verifies that an authorized user can retrieve a paginated list of all parcel events without applying specific filters. This ensures the baseline retrieval and metadata structure are functioning correctly.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?page=1&limit=50` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 1,\n            \"parcelId\": 101,\n            \"orderCode\": \"ORD-999\",\n            \"actionType\": \"STATUS_UPDATE\",\n            \"awbNumber\": \"AWB12345678\",\n            \"previousStatus\": \"PENDING\",\n            \"newStatus\": \"DISPATCHED\",\n            \"scannedBy\": \"EMP001\",\n            \"timestamp\": \"2026-04-20T09:50:00Z\"\n          }\n        ],\n        \"meta\": {\n          \"page\": 1,\n          \"limit\": 50,\n          \"totalRows\": 150,\n          \"totalPages\": 3\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Metadata Check:** Response must include `page`, `limit`, `totalRows`, and `totalPages`.\n      * **Schema Validation:** Each event object must contain `id`, `parcelId`, `orderCode`, `actionType`, `awbNumber`, `previousStatus`, `newStatus`, `scannedBy`, and `timestamp`.\n  - info:\n      name: Browse events with Date Range\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events?dateFrom=2026-03-30&dateTo=2026-04-01'\n      params:\n        - name: dateFrom\n          value: '2026-03-30'\n          type: query\n        - name: dateTo\n          value: '2026-04-01'\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Browse Events with Date Range\n\n      Verifies that the event logs can be filtered by a specific time window using start and end dates.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events?dateFrom=2026-03-30&dateTo=2026-04-01` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** All returned events must fall within the specified date range (**2026-03-30** to **2026-04-01**).\n  - info:\n      name: Export CSV with filters\n      type: http\n      seq: 7\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events/export?actionType=AWB_LINK'\n      params:\n        - name: actionType\n          value: AWB_LINK\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Export CSV with Filters\n\n      Verifies that the system correctly filters the exported CSV data based on the provided query parameters when requested by an authorized role.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events/export?actionType=AWB_LINK` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** The resulting CSV file should only contain events where the `actionType` is `AWB_LINK`.\n  - info:\n      name: Export events as CSV\n      type: http\n      seq: 6\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events/export'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Export Events as CSV\n\n      Verifies that authorized users (OPERATOR/ADMIN) can successfully export the full parcel events log as a downloadable CSV file with the correct headers and content type.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events/export` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{operatorToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Response Header:** `Content-Type` must be `text/csv`\n      * **Response Header:** `Content-Disposition` must be `attachment; filename=\"parcel-events-2026-04-16.csv\"`\n      * **CSV Header Row:** Must contain `EventID,ParcelID,OrderCode,ActionType,AWBNumber,PreviousStatus,NewStatus,ScannedBy,Timestamp`\n      * **Content Validation:** Subsequent rows must contain comma-separated event data.\n  - info:\n      name: '[CR] - Cannot Access Events'\n      type: http\n      seq: 8\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Courier Role \u2014 Cannot Access Events\n\n      This test verifies that the `COURIER` role is restricted from accessing the general parcel events list.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{courierToken}}\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * **Note:** Only `ADMIN` and `OPERATOR` roles are authorized to browse events.\n  - info:\n      name: '[CR] - Cannot Export CSV'\n      type: http\n      seq: 9\n    http:\n      method: GET\n      url: '{{base_url}}/parcel-events/export'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## Courier Role \u2014 Cannot Export CSV\n\n      This test case verifies that the export functionality is restricted and that users with the `COURIER` role are denied access with a forbidden status.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcel-events/export` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{courierToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `403 Forbidden`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": {\n          \"message\": \"Access denied. Only ADMIN and OPERATOR can export data.\",\n          \"code\": \"INSUFFICIENT_PERMISSIONS\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * `res.body.success` should equal **false**\n      * **Validation:** Verify that the error message explicitly states only `ADMIN` and `OPERATOR` roles are authorized.\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:24:31.611Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Parcels Retrieval and Label Data-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Parcels Retrieval and Label Data - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Parcels Retrieval and Label Data\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Get Label Data\n      type: http\n      seq: 6\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/label-data'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Get Label Data (pAction=2)\n      Retrieves the flat JSON snapshot required for generating shipping labels. This includes sender snapshots and receiver address details. \n\n      > **Note:** This endpoint does **not** provide QR image data; the frontend is responsible for rendering the QR code using the `parcelId`.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/label-data` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-A1B2C3\",\n          \"senderName\": \"Warehouse Alpha\",\n          \"receiverName\": \"John Doe\",\n          \"addressLine1\": \"123 Maple Street\",\n          \"city\": \"Mumbai\",\n          \"state\": \"Maharashtra\",\n          \"pincode\": \"400001\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Data Validation:** Response must be a flat JSON containing sender snapshot + receiver address + `parcelId`.\n      * **Constraint Check:** Ensure **no QR image data** is present in the response.\n\n      ---\n  - info:\n      name: Get Parcel - Not Found\n      type: http\n      seq: 5\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/9999'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '404'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Get Parcel \u2014 Not Found\n      Verifies the system's error handling when a request is made for a parcel ID that does not exist in the database.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/9999` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `404 Not Found`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Parcel not found\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **404**\n      * `res.body.success` should equal **false**\n      * `res.body.error` should equal **\"Parcel not found\"**\n\n      ---\n  - info:\n      name: Get Parcel Timeline\n      type: http\n      seq: 7\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/timeline'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 7. Get Parcel Timeline\n      Retrieves a chronologically sorted list of all events and status changes associated with a specific parcel.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/timeline` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"actionType\": \"STATUS_UPDATE\",\n            \"newStatus\": \"PENDING\",\n            \"timestamp\": \"2026-04-20T08:00:00Z\"\n          },\n          {\n            \"actionType\": \"AWB_LINK\",\n            \"newStatus\": \"DISPATCHED\",\n            \"timestamp\": \"2026-04-20T10:00:00Z\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Sorting Validation:** Events must be chronologically sorted (oldest first).\n\n      ---\n  - info:\n      name: Get Single Parcel\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1'\n      params:\n        - name: ''\n          value: ''\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Get Single Parcel\n      Retrieves the full detailed record of a specific parcel by its internal ID.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"parcelId\": \"PDS-A1B2C3\",\n          \"status\": \"PENDING\",\n          \"receiverName\": \"Jane Doe\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n\n      ---\n  - info:\n      name: List Parcels with Filter\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/parcels?status=PENDING'\n      params:\n        - name: status\n          value: PENDING\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n        - expression: res.body.data[0].status\n          operator: eq\n          value: PENDING\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. List Parcels with Status Filter\n      Filters the parcel list based on their current lifecycle status.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels?status=PENDING` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** All returned parcels in the `data` array must have `status === \"PENDING\"`.\n\n      ---\n  - info:\n      name: List Parcels with search\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/parcels?search=PDS-A1B2C3'\n      params:\n        - name: search\n          value: PDS-A1B2C3\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. List Parcels with Search\n      Performs a search query to find a specific parcel by its ID or unique identifier.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels?search=PDS-A1B2C3` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Validation:** Returns the specific parcel matching the `parcelId` search query.\n\n      ---\n  - info:\n      name: List all Parcels\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/parcels?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 1. List All Parcels\n      Retrieves a paginated list of all parcels in the system.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels?page=1&limit=20` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"parcelId\": \"PDS-12345\",\n            \"trackingNo\": \"TRK789\",\n            \"status\": \"PENDING\",\n            \"receiverName\": \"Jane Doe\",\n            \"orderCode\": \"ORD-001\"\n          }\n        ],\n        \"meta\": {\n          \"page\": 1,\n          \"limit\": 20,\n          \"totalRows\": 100,\n          \"totalPages\": 5\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Metadata Check:** Response must include `page`, `limit`, `totalRows`, and `totalPages`.\n      * **Schema Validation:** Each parcel object must contain `parcelId`, `trackingNo`, `status`, `receiverName`, and `orderCode`.\n\n      ---\n  - info:\n      name: '[CR] - Can List Parcels'\n      type: http\n      seq: 8\n    http:\n      method: GET\n      url: '{{base_url}}/parcels?page=1&limit=20'\n      params:\n        - name: page\n          value: '1'\n          type: query\n        - name: limit\n          value: '20'\n          type: query\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 8. COURIER Role \u2014 Can List Parcels\n      Ensures that the `COURIER` role has the necessary read permissions to view the list of parcels.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels?page=1&limit=10` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * **Access Control:** The system should grant read access to users with the `COURIER` role.\n\n      ---\n  - info:\n      name: '[CR] - Cannot access Label Data'\n      type: http\n      seq: 9\n    http:\n      method: GET\n      url: '{{base_url}}/parcels/1/label-data'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 9. COURIER Role \u2014 Cannot Access Label Data\n      Verifies that sensitive label information (including sender and receiver snapshots) is restricted and cannot be accessed by users with the `COURIER` role.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/1/label-data` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `403 Forbidden`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"User role 'COURIER' is not authorized for this route\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **403**\n      * `res.body.success` should equal **false**\n      * `res.body.error` should match the authorization error message.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:22:51.072Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Product Catalog-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Product Catalog - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Product Catalog\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Add Product\n      type: http\n      seq: 2\n    http:\n      method: POST\n      url: '{{base_url}}/products'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            // these are the only required fields\n            \"productName\": \"Heavy Equipment\",\n            \"materialRate\": 500\n            //   \"description\": \"\",\n            //   \"categoryId\": null,\n            //   \"unitId\": null,\n            //   \"isActive\": true,\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Create Product\n      Adds a new product to the inventory with a defined name and base material rate.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/products` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"productName\": \"Heavy Equipment\",\n        \"materialRate\": 500\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 2,\n          \"productName\": \"Heavy Equipment\",\n          \"materialRate\": 500\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Persistence Check:** The response must return the newly created product's unique ID.\n\n      ---\n  - info:\n      name: Delete Product\n      type: http\n      seq: 5\n    http:\n      method: DELETE\n      url: '{{base_url}}/products/3'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Delete Product\n      Removes a product from the system. This typically follows soft-delete logic to preserve historical pricing data in existing orders.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `DELETE` |\n      | **URL** | `{{baseUrl}}/api/v1/products/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"message\": \"Product deleted successfully\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Verification:** Future `GET` requests for product ID `1` should return a `404 Not Found` or show the product as inactive.\n\n      ---\n  - info:\n      name: Get Product by ID\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/products/:id'\n      params:\n        - name: id\n          value: '3'\n          type: path\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n  - info:\n      name: List Products\n      type: http\n      seq: 1\n    http:\n      method: GET\n      url: '{{base_url}}/products'\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. List All Products\n      Retrieves a list of all products available in the system, including their associated material rates.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/products` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"id\": 1,\n            \"productName\": \"Heavy Equipment\",\n            \"materialRate\": 500,\n            \"updatedAt\": \"2026-04-20T09:00:00Z\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Schema Check:** Each item in the `data` array should contain an `id`, `productName`, and `materialRate`.\n\n      ---\n  - info:\n      name: Update Product\n      type: http\n      seq: 3\n    http:\n      method: PUT\n      url: '{{base_url}}/products/3'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |\n          {\n            \"materialRate\": 550\n          }\n      auth: inherit\n    runtime:\n      assertions:\n        - expression: res.status\n          operator: eq\n          value: '200'\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Update Product\n      Updates specific fields of an existing product, such as adjusting the material rate due to market fluctuations.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/products/1` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer {{authToken}}\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"materialRate\": 550\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"id\": 1,\n          \"productName\": \"Heavy Equipment\",\n          \"materialRate\": 550,\n          \"updatedAt\": \"2026-04-20T10:30:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Update Verification:** The `materialRate` in the response must match the new value (**550**).\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:21:55.244Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Senders-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Senders - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Senders\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Create Sender\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/senders'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |+\n          {\n            \"customerName\": \"John Doe Enterprises\",\n            \"phoneNo\": \"9876543210\",\n            \"emailId\": \"john.doe@example.com\",\n            \"addressLine1\": \"123 Business Park\",\n            \"addressLine2\": \"Sector 62\",\n            \"city\": \"Noida\",\n            \"state\": \"Uttar Pradesh\",\n            \"pincode\": \"201301\"\n          }\n\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ---\n\n      ## 1. Create Sender\n      Registers a new sender entity in the system with full contact and address details.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"customerName\": \"John Doe Enterprises\",\n        \"phoneNo\": \"9876543210\",\n        \"emailId\": \"john.doe@example.com\",\n        \"addressLine1\": \"123 Business Park\",\n        \"addressLine2\": \"Sector 62\",\n        \"city\": \"Noida\",\n        \"state\": \"Uttar Pradesh\",\n        \"pincode\": \"201301\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `201 Created`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"PkPartyId\": 10,\n          \"customerName\": \"John Doe Enterprises\",\n          \"createdAt\": \"2026-04-20T10:22:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **201**\n      * `res.body.success` should equal **true**\n      * **Persistence Check:** The response should return a unique `PkPartyId`.\n\n      ---\n  - info:\n      name: Delete Specific Sender (Soft Delete)\n      type: http\n      seq: 6\n    http:\n      method: DELETE\n      url: '{{base_url}}/senders/1'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Delete Sender (Soft-Delete)\n      Removes a sender from active use. To maintain data integrity for past orders, the system performs a **soft-delete** (marking the record as inactive) rather than a permanent removal from the database.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `DELETE` |\n      | **URL** | `{{baseUrl}}/api/v1/senders/:id` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"message\": \"Sender deleted successfully\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Inactivity Check:** Subsequent `GET` requests for this ID should return a `404` or indicate the record is inactive, depending on the implementation.\n\n      ---\n  - info:\n      name: Get Specific Sender\n      type: http\n      seq: 3\n    http:\n      method: GET\n      url: '{{base_url}}/senders/1'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Get Specific Sender\n      Retrieves the detailed profile of a single sender using their unique primary key.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/senders/:id` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      > **Note:** Replace `:id` with a valid `PkPartyId` (e.g., `10`) obtained from the creation or list response.\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Consistency:** The `PkPartyId` in the response must match the `:id` provided in the URL.\n\n      ---\n  - info:\n      name: Get all senders\n      type: http\n      seq: 2\n    http:\n      method: GET\n      url: '{{base_url}}/senders'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Get All Senders\n      Retrieves a list of all registered sender entities in the system.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": [\n          {\n            \"PkPartyId\": 10,\n            \"customerName\": \"John Doe Enterprises\",\n            \"phoneNo\": \"9876543210\",\n            \"emailId\": \"john.doe@example.com\",\n            \"city\": \"Noida\"\n          }\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Type Validation:** `customerName`, `phoneNo`, and `emailId` must all be of type **String**.\n      * **Data Check:** The `data` array should contain at least one sender object if the database is seeded.\n\n      ---\n  - info:\n      name: Lookup Sender By Phone\n      type: http\n      seq: 4\n    http:\n      method: GET\n      url: '{{base_url}}/senders/lookup?phone=9876543210'\n      params:\n        - name: phone\n          value: '9876543210'\n          type: query\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Lookup Sender by Phone\n      Enables quick retrieval of a sender's profile using their mobile number. This is typically used in the UI to auto-fill sender details during order creation.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `GET` |\n      | **URL** | `{{baseUrl}}/api/v1/senders/lookup?phone=9876543210` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"PkPartyId\": 10,\n          \"customerName\": \"John Doe Enterprises\",\n          \"phoneNo\": \"9876543210\",\n          \"addressLine1\": \"123 Business Park\",\n          \"city\": \"Noida\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Verification:** The `phoneNo` in the response must match the query parameter provided.\n\n      ---\n  - info:\n      name: Update Sender\n      type: http\n      seq: 5\n    http:\n      method: PUT\n      url: '{{base_url}}/senders/3'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |+\n          {\n            \"customerName\": \"John Doe Enterprises Updated\",\n            \"city\": \"Gurugram\",\n            \"state\": \"Haryana\"\n          }\n\n\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Update Sender\n      Updates the information for an existing sender record. Partial updates are supported (e.g., changing just the city and state).\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `PUT` |\n      | **URL** | `{{baseUrl}}/api/v1/senders/:id` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"customerName\": \"John Doe Enterprises Updated\",\n        \"city\": \"Gurugram\",\n        \"state\": \"Haryana\"\n      }\n      ```\n\n      > **Note:** Replace `:id` with the relevant `PkPartyId`.\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"PkPartyId\": 10,\n          \"customerName\": \"John Doe Enterprises Updated\",\n          \"city\": \"Gurugram\",\n          \"state\": \"Haryana\",\n          \"updatedAt\": \"2026-04-20T10:25:00Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Update Verification:** Ensure fields like `customerName` and `city` reflect the new values provided in the payload.\n\n      ---\n  - info:\n      name: Validation - Create Sender\n      type: http\n      seq: 7\n    http:\n      method: POST\n      url: '{{base_url}}/senders'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          {\n            \"customerName\": \"John Doe Enterprises\",\n            \"phoneNo\": \"9876543210\",\n            \"emailId\": \"INVALID_EMAIL\",\n            //   \"emailId\": \"john.doe@example.com\",\n            \"addressLine1\": \"123 Business Park\",\n            \"addressLine2\": \"Sector 62\",\n            \"city\": \"Noida\",\n            \"state\": \"Uttar Pradesh\",\n            \"pincode\": \"201301\"\n          }\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 7. Validation Test (Missing Required Fields)\n      Verifies that the API correctly identifies and rejects requests that are missing mandatory sender information.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"customerName\": \"Incomplete Sender\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Validation failed\",\n        \"details\": [\n          \"phoneNo is required\",\n          \"addressLine1 is required\",\n          \"city is required\"\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Error Detail:** The response must contain specific error messages pointing out the missing required fields.\n\n      ---\n  - info:\n      name: Validation - Update Sender\n      type: http\n      seq: 8\n    http:\n      method: POST\n      url: '{{base_url}}/senders'\n      headers:\n        - name: Content-Type\n          value: application/json\n      body:\n        type: json\n        data: |-\n          // These are the required fields\n          // {\n          //   \"customerName\": \"John Doe Enterprises Updated\",\n          //   \"city\": \"Gurugram\",\n          //   \"state\": \"Haryana\"\n          // }\n\n          // Missing Required Fields \n          {\n            \"customerName\": \"John Doe Enterprises Missing\"\n          }\n\n          // Should Throw Error\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 8. Validation Test (Invalid Email)\n      Ensures that the API performs data format validation on specific fields, such as checking for a correctly formatted email address.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/senders` |\n\n      **Headers**\n      ```http\n      Content-Type: application/json\n      Authorization: Bearer <OPERATOR_TOKEN>\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"customerName\": \"Jane Smith\",\n        \"phoneNo\": \"1234567890\",\n        \"emailId\": \"invalid-email\",\n        \"addressLine1\": \"A-101\",\n        \"city\": \"Mumbai\",\n        \"state\": \"Maharashtra\",\n        \"pincode\": \"400001\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Validation failed\",\n        \"details\": [\n          \"emailId must be a valid email address\"\n        ]\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Constraint Check:** The system must reject the payload specifically because the `emailId` does not follow the standard email format (e.g., `user@domain.com`).\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:22:16.608Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: bruno-html-docs/Two Scan Operations-documentation.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:     <meta charset="UTF-8">
 5:     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:     <title>Two Scan Operations - API Documentation</title>
 7:     <style>
 8:         body { margin: 0; padding: 0; }
 9:         #opencollection-container { width: 100vw; height: 100vh; }
10:     </style>
11:     <link rel="stylesheet" href="https://cdn.opencollection.com/docs.css">
12:     <script src="https://cdn.opencollection.com/docs.js"></script>
13: </head>
14: <body>
15:     <div id="opencollection-container"></div>
16:     <script>
17:         const collectionData = "opencollection: 1.0.0\ninfo:\n  name: Two Scan Operations\nconfig:\n  proxy:\n    inherit: true\n    config:\n      protocol: http\n      hostname: ''\n      port: ''\n      auth:\n        username: ''\n        password: ''\n      bypassProxy: ''\nitems:\n  - info:\n      name: Scan + Link AWB (Happy Path)\n      type: http\n      seq: 1\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 1. Scan + Link AWB (OPERATOR \u2014 Happy Path)\n      Handles the physical association of a parcel's internal QR code with an external courier's Air Waybill (AWB) number. When performed by an **OPERATOR**, the parcel moves to an intermediate staging state.\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      Parcel `PDS-A1B2C3` must be in the `LABEL_PRINTED` state (achieved via the Label Print module).\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-A1B2C3\",\n        \"awbNumber\": \"AWB-DTDC-001\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-A1B2C3\",\n          \"trackingNo\": \"AWB-DTDC-001\",\n          \"status\": \"AWB_LINKED\",\n          \"dispatchDate\": null\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Role Logic:** Status must be `AWB_LINKED` (not auto-dispatched).\n      * **Field Verification:** `dispatchDate` must be **null**.\n\n      ---\n\n      ### **Post-Request Verification**\n      1.  **GET** `{{baseUrl}}/api/v1/parcels/1/timeline`\n      2.  **Verify:** `actionType` is \"AWB_LINK\".\n      3.  **Check:** `previousStatus` is \"LABEL_PRINTED\" and `newStatus` is \"AWB_LINKED\".\n\n      ---\n  - info:\n      name: Scan - Parcel Not Found\n      type: http\n      seq: 3\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 3. Scan \u2014 Parcel Not Found\n      Validates that the system correctly identifies when a QR code (Parcel ID) does not exist in the database, preventing links to non-existent shipments.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-NONEXISTENT\",\n        \"awbNumber\": \"AWB-TEST-999\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `404 Not Found`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Parcel not found for QR code: PDS-NONEXISTENT\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **404**\n      * `res.body.success` should equal **false**\n      * **Error Verification:** The error message must specifically call out the failing `qrCode`.\n\n      ---\n  - info:\n      name: Scan + Link AWB (COURIER \u2014 Auto-Dispatch)\n      type: http\n      seq: 2\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 2. Scan + Link AWB (COURIER \u2014 Auto-Dispatch)\n      Optimizes the workflow for external couriers. When a user with the **COURIER** role scans the parcel and AWB, the system bypasses the intermediate staging state and moves the parcel directly to the final dispatch status.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <COURIER_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      Parcel `PDS-D4E5F6` must be in the `LABEL_PRINTED` state.\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-D4E5F6\",\n        \"awbNumber\": \"AWB-BLUEDART-002\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `200 OK`\n\n      **Body**\n      ```json\n      {\n        \"success\": true,\n        \"data\": {\n          \"parcelId\": \"PDS-D4E5F6\",\n          \"trackingNo\": \"AWB-BLUEDART-002\",\n          \"status\": \"DISPATCHED\",\n          \"dispatchDate\": \"2026-04-20T10:41:48Z\"\n        }\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **200**\n      * `res.body.success` should equal **true**\n      * **Role Logic:** Status must jump directly to **\"DISPATCHED\"**.\n      * **Timestamp Verification:** `dispatchDate` must be populated with a valid timestamp (not null).\n\n      ---\n  - info:\n      name: Scan \u2014 Wrong State (Still PENDING)\n      type: http\n      seq: 4\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 4. Scan \u2014 Wrong State (Still PENDING)\n      Enforces strict workflow sequence. AWB linking is physically impossible until a label has been generated; therefore, the API blocks any scan attempts for parcels still in the `PENDING` state.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      The parcel record exists but has not yet undergone the `log-print` operation.\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-A1B2C3\",\n        \"awbNumber\": \"AWB-TEST-003\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Cannot link AWB: parcel is in 'PENDING' state. AWB linking requires parcel to be in LABEL_PRINTED state.\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Business Logic:** The system must reject the request and provide a clear explanation of the state-machine requirement.\n\n      ---\n  - info:\n      name: Scan \u2014 Duplicate AWB (409 Conflict)\n      type: http\n      seq: 5\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 5. Scan \u2014 Duplicate AWB (409 Conflict)\n      Maintains data integrity by ensuring that an Air Waybill (AWB) number is unique across the system. This prevents the same physical tracking number from being assigned to multiple system-generated parcels.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Pre-condition**\n      AWB `AWB-DTDC-001` must have already been successfully linked to a different parcel (as performed in Unit 1).\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"PDS-D4E5F6\",\n        \"awbNumber\": \"AWB-DTDC-001\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `409 Conflict`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"AWB number 'AWB-DTDC-001' is already linked to another parcel\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **409**\n      * `res.body.success` should equal **false**\n      * **Integrity Check:** The API must prevent the duplicate assignment and return a conflict error.\n\n      ---\n  - info:\n      name: Scan \u2014 Validation Error (Missing Fields)\n      type: http\n      seq: 6\n    http:\n      method: POST\n      url: '{{base_url}}/parcels/scan'\n      auth: inherit\n    settings:\n      encodeUrl: true\n      timeout: 0\n      followRedirects: true\n      maxRedirects: 5\n    docs: |-\n      ## 6. Scan \u2014 Validation Error (Missing Fields)\n      Ensures that the API enforces mandatory data requirements. Both the internal QR code and the external AWB number must be provided to complete the link operation.\n\n      ---\n\n      ### **Request Details**\n\n      | Type | Value |\n      | :--- | :--- |\n      | **Method** | `POST` |\n      | **URL** | `{{baseUrl}}/api/v1/parcels/scan` |\n\n      **Headers**\n      ```http\n      Authorization: Bearer <OPERATOR_TOKEN>\n      Content-Type: application/json\n      ```\n\n      **Payload**\n      ```json\n      {\n        \"qrCode\": \"\",\n        \"awbNumber\": \"\"\n      }\n      ```\n\n      ---\n\n      ### **Expected Response**\n\n      **Status Code:** `400 Bad Request`\n\n      **Body**\n      ```json\n      {\n        \"success\": false,\n        \"error\": \"Validation Error - qrCode: QR code (parcelId) is required, awbNumber: AWB number is required\"\n      }\n      ```\n\n      ---\n\n      ### **Assertions**\n      * `res.status` should equal **400**\n      * `res.body.success` should equal **false**\n      * **Validation Check:** The error message should list all missing or empty fields required for the scan.\n\n      ---\nrequest:\n  auth:\n    type: bearer\n    token: '{{authToken}}'\nbundled: true\nextensions:\n  bruno:\n    ignore:\n      - node_modules\n      - .git\n    exportedAt: '2026-04-20T05:23:50.011Z'\n    exportedUsing: Bruno/3.2.2\n";
18:         new window.OpenCollection({
19:             target: document.getElementById('opencollection-container'),
20:             opencollection: collectionData,
21:             theme: 'light'
22:         });
23:     </script>
24: </body>
25: </html>
````

## File: src/interfaces/http/controllers/bulk-upload.controller.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/controllers/bulk-upload.controller.js
 3: // Description: Express route handlers for Bulk Upload module.
 4: // Uses express-async-handler for automatic error propagation.
 5: // ============================================================================
 6: 
 7: import asyncHandler from 'express-async-handler';
 8: import bulkUploadService from '../../../modules/bulk-upload/bulk-upload.service.js';
 9: 
10: /**
11:  * POST /api/v1/bulk-uploads
12:  * Submits bulk order data (JSON).
13:  */
14: export const handleBulkUpload = asyncHandler(async (req, res) => {
15:   const { fileName, rows } = req.body;
16:   const result = await bulkUploadService.processBulkUpload(rows, req.user, fileName);
17:   res.status(201).json({ success: true, data: result });
18: });
19: 
20: /**
21:  * GET /api/v1/bulk-uploads
22:  * Lists all upload sessions.
23:  */
24: export const handleGetSessions = asyncHandler(async (req, res) => {
25:   const sessions = await bulkUploadService.getSessions();
26:   res.json({ success: true, data: sessions });
27: });
28: 
29: /**
30:  * GET /api/v1/bulk-uploads/:id
31:  * Gets specific upload session result with row details.
32:  */
33: export const handleGetSessionById = asyncHandler(async (req, res) => {
34:   const result = await bulkUploadService.getSessionWithDetails(req.params.id);
35:   res.json({ success: true, data: result });
36: });
````

## File: src/interfaces/http/controllers/dashboard.controller.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/controllers/dashboard.controller.js
 3: // Description: Handles HTTP requests for the Dashboard module.
 4: // Envelops data in the standard { success, data } format.
 5: // ============================================================================
 6: 
 7: import asyncHandler from 'express-async-handler';
 8: import dashboardService from '../../../modules/dashboard/dashboard.service.js';
 9: 
10: /**
11:  * @desc    Get dashboard metrics
12:  * @route   GET /api/v1/dashboard/metrics
13:  * @access  Private/Admin
14:  */
15: export const getMetrics = asyncHandler(async (req, res) => {
16:   const metrics = await dashboardService.getMetrics();
17: 
18:   res.json({
19:     success: true,
20:     data: metrics
21:   });
22: });
````

## File: src/interfaces/http/controllers/notification.controller.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/controllers/notification.controller.js
 3: // Description: Controller layer for Notification module.
 4: // Maps incoming requests to service methods and handles standardized responses.
 5: // ============================================================================
 6: 
 7: import asyncHandler from 'express-async-handler';
 8: import notificationService from '../../../modules/notification/notification.service.js';
 9: 
10: /**
11:  * @desc    Send dispatch notification to receiver
12:  * @route   POST /api/v1/parcels/:id/notify
13:  * @access  Private (Admin, Operator)
14:  */
15: export const send = asyncHandler(async (req, res) => {
16:   const { id } = req.params;
17:   const result = await notificationService.sendNotification(id, req.user);
18: 
19:   res.status(200).json({
20:     success: true,
21:     data: result
22:   });
23: });
24: 
25: /**
26:  * @desc    Resend a failed notification
27:  * @route   POST /api/v1/notifications/:id/resend
28:  * @access  Private (Admin, Operator)
29:  */
30: export const resend = asyncHandler(async (req, res) => {
31:   const { id } = req.params;
32:   const result = await notificationService.resendNotification(id, req.user);
33: 
34:   res.status(200).json({
35:     success: true,
36:     data: result
37:   });
38: });
39: 
40: /**
41:  * @desc    Get notification history for a parcel
42:  * @route   GET /api/v1/parcels/:id/notifications
43:  * @access  Private (Admin, Operator)
44:  */
45: export const getHistory = asyncHandler(async (req, res) => {
46:   const { id } = req.params;
47:   const history = await notificationService.getParcelNotifications(id);
48: 
49:   res.status(200).json({
50:     success: true,
51:     data: history
52:   });
53: });
54: 
55: /**
56:  * @desc    Webhook callback for delivery status (Sent/Failed)
57:  * @route   POST /api/v1/notifications/webhook
58:  * @access  Public
59:  */
60: export const webhook = asyncHandler(async (req, res) => {
61:   const result = await notificationService.handleWebhook(req.body);
62: 
63:   res.status(200).json({
64:     success: true,
65:     data: result
66:   });
67: });
````

## File: src/interfaces/http/controllers/parcel-events.controller.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/controllers/parcel-events.controller.js
 3: // Description: Express route handlers for the Parcel Events & Audit Export
 4: // module (API Contract §11). Reads from receiver_status_details.
 5: // Uses express-async-handler (AGENTS.md §3D).
 6: // ============================================================================
 7: 
 8: import asyncHandler from 'express-async-handler';
 9: import parcelService from '../../../modules/parcel/parcel.service.js';
10: 
11: /**
12:  * GET /api/v1/parcel-events
13:  * Browse system-wide events from receiver_status_details (paginated, filtered).
14:  * Maps to: prc_receiver_status_details_get (pAction=0)
15:  *
16:  * Filters: dateFrom, dateTo, actionType, scannedBy
17:  */
18: export const browseEvents = asyncHandler(async (req, res) => {
19:   const filters = {
20:     page: parseInt(req.query.page) || 1,
21:     limit: parseInt(req.query.limit) || 50,
22:     dateFrom: req.query.dateFrom || null,
23:     dateTo: req.query.dateTo || null,
24:     actionType: req.query.actionType || null,
25:     scannedBy: req.query.scannedBy || null
26:   };
27: 
28:   const { data, total } = await parcelService.browseEvents(filters);
29: 
30:   res.json({
31:     success: true,
32:     data,
33:     meta: {
34:       page: filters.page,
35:       limit: filters.limit,
36:       totalRows: total,
37:       totalPages: Math.ceil(total / filters.limit)
38:     }
39:   });
40: });
41: 
42: /**
43:  * GET /api/v1/parcel-events/export
44:  * Download events as CSV file for end-of-day auditing.
45:  * Columns: EventID, ParcelID, OrderCode, ActionType, AWBNumber,
46:  *          PreviousStatus, NewStatus, ScannedBy, Timestamp
47:  */
48: export const exportCSV = asyncHandler(async (req, res) => {
49:   const filters = {
50:     dateFrom: req.query.dateFrom || null,
51:     dateTo: req.query.dateTo || null,
52:     actionType: req.query.actionType || null,
53:     scannedBy: req.query.scannedBy || null
54:   };
55: 
56:   const { data } = await parcelService.browseEvents(filters);
57: 
58:   // CSV header row
59:   const csvHeader = 'EventID,ParcelID,OrderCode,ActionType,AWBNumber,PreviousStatus,NewStatus,ScannedBy,Timestamp';
60: 
61:   // CSV data rows — escape commas in values
62:   const csvRows = data.map((row) => {
63:     return [
64:       row.id,
65:       row.parcelId || '',
66:       row.orderCode || '',
67:       row.actionType || '',
68:       row.awbNumber || '',
69:       row.previousStatus || '',
70:       row.newStatus || '',
71:       row.scannedBy || '',
72:       row.timestamp ? new Date(row.timestamp).toISOString() : ''
73:     ].join(',');
74:   });
75: 
76:   const csvContent = [csvHeader, ...csvRows].join('\n');
77: 
78:   // Set headers for CSV download
79:   const timestamp = new Date().toISOString().split('T')[0];
80:   res.setHeader('Content-Type', 'text/csv');
81:   res.setHeader('Content-Disposition', `attachment; filename="parcel-events-${timestamp}.csv"`);
82:   res.send(csvContent);
83: });
````

## File: src/interfaces/http/controllers/parcel.controller.js
````javascript
  1: // ============================================================================
  2: // File: src/interfaces/http/controllers/parcel.controller.js
  3: // Description: Express route handlers for the Parcel module (API Contract §8).
  4: // Uses express-async-handler to automatically pass exceptions to the
  5: // global error handler (AGENTS.md §3D).
  6: // All responses use the standard envelope: { success, data?, error? }
  7: //
  8: // Covers Sprint 3 (retrieval, label data, timeline, log-print) and
  9: // Sprint 4 (scan+AWB, dispatch, terminal states).
 10: // ============================================================================
 11: 
 12: import asyncHandler from 'express-async-handler';
 13: import parcelService from '../../../modules/parcel/parcel.service.js';
 14: 
 15: /**
 16:  * GET /api/v1/parcels
 17:  * Lists all parcels with pagination and optional filters.
 18:  * Maps to: prc_parcel_details_get (pAction=0)
 19:  */
 20: export const getParcelList = asyncHandler(async (req, res) => {
 21:   const filters = {
 22:     page: parseInt(req.query.page) || 1,
 23:     limit: parseInt(req.query.limit) || 20,
 24:     search: req.query.search || null,
 25:     status: req.query.status || null,
 26:     sortBy: req.query.sortBy || 'created_at',
 27:     sortOrder: req.query.sortOrder || 'desc'
 28:   };
 29: 
 30:   const { data, total } = await parcelService.getParcelList(filters);
 31: 
 32:   res.json({
 33:     success: true,
 34:     data,
 35:     meta: {
 36:       page: filters.page,
 37:       limit: filters.limit,
 38:       totalRows: total,
 39:       totalPages: Math.ceil(total / filters.limit)
 40:     }
 41:   });
 42: });
 43: 
 44: /**
 45:  * GET /api/v1/parcels/:id
 46:  * Gets details of a specific parcel.
 47:  * Maps to: prc_parcel_details_get (pAction=1)
 48:  */
 49: export const getParcelById = asyncHandler(async (req, res) => {
 50:   const data = await parcelService.getParcelDetails(req.params.id);
 51:   res.json({ success: true, data });
 52: });
 53: 
 54: /**
 55:  * GET /api/v1/parcels/:id/label-data
 56:  * Gets stitched label data for frontend rendering.
 57:  * Maps to: prc_parcel_details_get (pAction=2)
 58:  * Backend does NOT generate QR images — frontend responsibility.
 59:  */
 60: export const getLabelData = asyncHandler(async (req, res) => {
 61:   const data = await parcelService.getLabelData(req.params.id);
 62:   res.json({ success: true, data });
 63: });
 64: 
 65: /**
 66:  * GET /api/v1/parcels/:id/timeline
 67:  * Gets Amazon-style chronological event timeline for a parcel.
 68:  * Maps to: prc_receiver_status_details_get (pAction=1)
 69:  */
 70: export const getTimeline = asyncHandler(async (req, res) => {
 71:   const data = await parcelService.getTimeline(req.params.id);
 72:   res.json({ success: true, data });
 73: });
 74: 
 75: /**
 76:  * POST /api/v1/parcels/:id/log-print
 77:  * Logs a label print event and transitions parcel to LABEL_PRINTED.
 78:  * Maps to: prc_parcel_details_set
 79:  * Effects: increments LabelPrintCount, triggers prc_receiver_status_details_set.
 80:  */
 81: export const logPrint = asyncHandler(async (req, res) => {
 82:   const data = await parcelService.logLabelPrint(req.params.id, req.user);
 83:   res.json({ success: true, data });
 84: });
 85: 
 86: /**
 87:  * POST /api/v1/parcels/scan
 88:  * Atomic two-scan operation: QR scan + AWB link.
 89:  * Maps to: prc_parcel_details_set
 90:  * Role-based: COURIER → auto-dispatch, OPERATOR/ADMIN → AWB_LINKED only.
 91:  */
 92: export const scanParcel = asyncHandler(async (req, res) => {
 93:   const data = await parcelService.scanAndLinkAWB(req.body, req.user);
 94:   res.json({ success: true, data });
 95: });
 96: 
 97: /**
 98:  * POST /api/v1/parcels/dispatch
 99:  * Dispatches parcels in bulk (single or multiple).
100:  * Maps to: prc_parcel_details_set
101:  * Updates status to DISPATCHED, stamps DispatchDate.
102:  */
103: export const dispatchParcels = asyncHandler(async (req, res) => {
104:   const data = await parcelService.dispatchParcels(req.body.parcelIds, req.user);
105:   res.json({ success: true, data });
106: });
107: 
108: /**
109:  * PATCH /api/v1/parcels/:id/deliver
110:  * Marks parcel as DELIVERED (terminal state).
111:  * Maps to: prc_parcel_details_set
112:  * Business rule: parcel must be DISPATCHED.
113:  */
114: export const deliverParcel = asyncHandler(async (req, res) => {
115:   const data = await parcelService.deliverParcel(req.params.id, req.user);
116:   res.json({ success: true, data });
117: });
118: 
119: /**
120:  * PATCH /api/v1/parcels/:id/cancel
121:  * Cancels an individual parcel.
122:  * Maps to: prc_parcel_details_set
123:  * Business rule: only before dispatch (PENDING, LABEL_PRINTED, AWB_LINKED).
124:  */
125: export const cancelParcel = asyncHandler(async (req, res) => {
126:   const data = await parcelService.cancelParcel(req.params.id, req.user);
127:   res.json({ success: true, data });
128: });
129: 
130: /**
131:  * PATCH /api/v1/parcels/:id/return
132:  * Marks parcel as RETURNED.
133:  * Maps to: prc_parcel_details_set
134:  * Business rule: only after dispatch (DISPATCHED, DELIVERED).
135:  */
136: export const returnParcel = asyncHandler(async (req, res) => {
137:   const data = await parcelService.returnParcel(req.params.id, req.user);
138:   res.json({ success: true, data });
139: });
````

## File: src/interfaces/http/controllers/product.controller.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/controllers/product.controller.js
 3: // Description: HTTP controllers mapping to Product service block.
 4: // Uses express-async-handler to automatically pass exceptions to the
 5: // global error handler (AGENTS.md §3D).
 6: // ============================================================================
 7: 
 8: import asyncHandler from 'express-async-handler';
 9: import productService from '../../../modules/product/product.service.js';
10: 
11: // @desc    Get all products
12: // @route   GET /api/v1/products
13: // @access  Private/Admin,Operator
14: export const getProducts = asyncHandler(async (req, res) => {
15:   const page = parseInt(req.query.page) || 1;
16:   const limit = parseInt(req.query.limit) || 20;
17:   const search = req.query.search || '';
18: 
19:   const products = await productService.getProducts(page, limit, search);
20:   
21:   res.status(200).json({
22:     success: true,
23:     data: products.data,
24:     meta: {
25:       total: products.total,
26:       page,
27:       limit
28:     }
29:   });
30: });
31: 
32: // @desc    Get product by ID
33: // @route   GET /api/v1/products/:id
34: // @access  Private/Admin,Operator
35: export const getProductById = asyncHandler(async (req, res) => {
36:   const product = await productService.getProductById(req.params.id);
37:   
38:   res.status(200).json({
39:     success: true,
40:     data: product
41:   });
42: });
43: 
44: // @desc    Create new product
45: // @route   POST /api/v1/products
46: // @access  Private/Admin,Operator
47: export const createProduct = asyncHandler(async (req, res) => {
48:   const product = await productService.createProduct(req.body);
49:   
50:   res.status(201).json({
51:     success: true,
52:     data: product
53:   });
54: });
55: 
56: // @desc    Update product
57: // @route   PUT /api/v1/products/:id
58: // @access  Private/Admin,Operator
59: export const updateProduct = asyncHandler(async (req, res) => {
60:   const product = await productService.updateProduct(req.params.id, req.body);
61:   
62:   res.status(200).json({
63:     success: true,
64:     data: product
65:   });
66: });
67: 
68: // @desc    Delete product
69: // @route   DELETE /api/v1/products/:id
70: // @access  Private/Admin,Operator
71: export const deleteProduct = asyncHandler(async (req, res) => {
72:   await productService.deleteProduct(req.params.id);
73:   
74:   res.status(200).json({
75:     success: true,
76:     message: 'Product successfully removed'
77:   });
78: });
````

## File: src/interfaces/http/controllers/sender.controller.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/controllers/sender.controller.js
 3: // Description: HTTP controllers for Sender (Party) module.
 4: // Uses express-async-handler for centralized error handling.
 5: // ============================================================================
 6: 
 7: import asyncHandler from 'express-async-handler';
 8: import senderService from '../../../modules/sender/sender.service.js';
 9: 
10: /**
11:  * @desc    Get all active senders
12:  * @route   GET /api/v1/senders
13:  * @access  Private
14:  */
15: export const getSenders = asyncHandler(async (req, res) => {
16:   const senders = await senderService.getSenders();
17:   
18:   res.status(200).json({
19:     success: true,
20:     data: senders
21:   });
22: });
23: 
24: /**
25:  * @desc    Get sender by ID
26:  * @route   GET /api/v1/senders/:id
27:  * @access  Private
28:  */
29: export const getSenderById = asyncHandler(async (req, res) => {
30:   const sender = await senderService.getSenderById(req.params.id);
31:   
32:   res.status(200).json({
33:     success: true,
34:     data: sender
35:   });
36: });
37: 
38: /**
39:  * @desc    Lookup sender by phone number
40:  * @route   GET /api/v1/senders/lookup
41:  * @access  Private
42:  */
43: export const lookupByPhone = asyncHandler(async (req, res) => {
44:   const phone = req.query.phone;
45:   const sender = await senderService.lookupByPhone(phone);
46:   
47:   res.status(200).json({
48:     success: true,
49:     data: sender
50:   });
51: });
52: 
53: /**
54:  * @desc    Create a new sender
55:  * @route   POST /api/v1/senders
56:  * @access  Private
57:  */
58: export const createSender = asyncHandler(async (req, res) => {
59:   const sender = await senderService.createSender(req.body);
60:   
61:   res.status(201).json({
62:     success: true,
63:     data: sender
64:   });
65: });
66: 
67: /**
68:  * @desc    Update an existing sender
69:  * @route   PUT /api/v1/senders/:id
70:  * @access  Private
71:  */
72: export const updateSender = asyncHandler(async (req, res) => {
73:   const sender = await senderService.updateSender(req.params.id, req.body);
74:   
75:   res.status(200).json({
76:     success: true,
77:     data: sender
78:   });
79: });
80: 
81: /**
82:  * @desc    Soft-delete a sender
83:  * @route   DELETE /api/v1/senders/:id
84:  * @access  Private
85:  */
86: export const deleteSender = asyncHandler(async (req, res) => {
87:   await senderService.deleteSender(req.params.id);
88:   
89:   res.status(200).json({
90:     success: true,
91:     message: 'Sender successfully deactivated'
92:   });
93: });
````

## File: src/interfaces/http/controllers/system.controller.js
````javascript
 1: import asyncHandler from 'express-async-handler';
 2: import pool from '../../../infrastructure/database/db.js';
 3: 
 4: /**
 5:  * @desc    Check application health and database connectivity
 6:  * @route   GET /api/v1/system/health
 7:  * @access  Public
 8:  */
 9: export const checkHealth = asyncHandler(async (req, res) => {
10:   // 1. Perform a simple database ping
11:   const startTime = Date.now();
12:   await pool.query('SELECT 1');
13:   const dbLatency = `${Date.now() - startTime}ms`;
14: 
15:   // 2. Construct health response
16:   res.status(200).json({
17:     success: true,
18:     data: {
19:       status: 'UP',
20:       timestamp: new Date().toISOString(),
21:       environment: process.env.NODE_ENV || 'development',
22:       database: {
23:         status: 'CONNECTED',
24:         latency: dbLatency
25:       },
26:       uptime: `${Math.floor(process.uptime())}s`
27:     }
28:   });
29: });
````

## File: src/interfaces/http/routes/bulk-upload.routes.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/routes/bulk-upload.routes.js
 3: // Description: Route definitions for Bulk Upload module.
 4: // Applies authentication, RBAC, and Zod validation.
 5: // ============================================================================
 6: 
 7: import express from 'express';
 8: import {
 9:   handleBulkUpload,
10:   handleGetSessions,
11:   handleGetSessionById
12: } from '../controllers/bulk-upload.controller.js';
13: import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
14: import { validate } from '../../../shared/middleware/validate.middleware.js';
15: import { bulkUploadSchema } from '../validations/bulk-upload.validation.js';
16: 
17: const router = express.Router();
18: 
19: // All bulk upload routes are restricted to ADMIN and OPERATOR
20: router.use(protect);
21: router.use(authorizeRoles('ADMIN', 'OPERATOR'));
22: 
23: /**
24:  * @route   POST /api/v1/bulk-uploads
25:  * @desc    Submit bulk order data
26:  */
27: router.post('/', validate(bulkUploadSchema), handleBulkUpload);
28: 
29: /**
30:  * @route   GET /api/v1/bulk-uploads
31:  * @desc    List all upload sessions
32:  */
33: router.get('/', handleGetSessions);
34: 
35: /**
36:  * @route   GET /api/v1/bulk-uploads/:id
37:  * @desc    Get session result with row details
38:  */
39: router.get('/:id', handleGetSessionById);
40: 
41: export default router;
````

## File: src/interfaces/http/routes/dashboard.routes.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/routes/dashboard.routes.js
 3: // Description: Defines routes for the Dashboard module.
 4: // Applies authentication and authorization (ADMIN only).
 5: // ============================================================================
 6: 
 7: import express from 'express';
 8: import { getMetrics } from '../controllers/dashboard.controller.js';
 9: import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
10: 
11: const router = express.Router();
12: 
13: /**
14:  * @route   GET /api/v1/dashboard/metrics
15:  * @access  Private/Admin
16:  */
17: router.get('/metrics', protect, authorizeRoles('ADMIN'), getMetrics);
18: 
19: export default router;
````

## File: src/interfaces/http/routes/parcel-events.routes.js
````javascript
 1: import express from 'express';
 2: import { browseEvents, exportCSV } from '../controllers/parcel-events.controller.js';
 3: import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
 4: 
 5: const router = express.Router();
 6: 
 7: // ============================================================================
 8: // Parcel Events & Audit Export Routes — API Contract §11
 9: // Reads from receiver_status_details (unified event log).
10: // Access: ADMIN, OPERATOR only
11: // ============================================================================
12: 
13: // GET /api/v1/parcel-events/export → CSV download (must be before /:id-style routes)
14: router.get('/export', protect, authorizeRoles('ADMIN', 'OPERATOR'), exportCSV);
15: 
16: // GET /api/v1/parcel-events       → Browse system-wide events (paginated, filtered)
17: router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR'), browseEvents);
18: 
19: export default router;
````

## File: src/interfaces/http/routes/parcel.routes.js
````javascript
 1: import express from 'express';
 2: import {
 3:   getParcelList,
 4:   getParcelById,
 5:   getLabelData,
 6:   getTimeline,
 7:   logPrint,
 8:   scanParcel,
 9:   dispatchParcels,
10:   deliverParcel,
11:   cancelParcel,
12:   returnParcel,
13: } from '../controllers/parcel.controller.js';
14: import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
15: import { validate } from '../../../shared/middleware/validate.middleware.js';
16: import { scanParcelSchema, dispatchParcelsSchema } from '../validations/parcel.validation.js';
17: 
18: const router = express.Router();
19: 
20: // ============================================================================
21: // Parcel Execution Routes — API Contract §8
22: // "Order = planning, Parcel = execution."
23: // ============================================================================
24: 
25: // --- STATIC WRITE ROUTES (must come before /:id to prevent Express param capture) ---
26: 
27: // POST   /api/v1/parcels/scan           → QR scan + AWB link (ALL roles)
28: router.post('/scan', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), validate(scanParcelSchema), scanParcel);
29: 
30: // POST   /api/v1/parcels/dispatch       → Dispatch parcels in bulk (ADMIN, OPERATOR)
31: router.post('/dispatch', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(dispatchParcelsSchema), dispatchParcels);
32: 
33: // --- READ OPERATIONS ---
34: 
35: // GET    /api/v1/parcels                → List parcels (ALL roles)
36: router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getParcelList);
37: 
38: // GET    /api/v1/parcels/:id            → Get parcel details (ALL roles)
39: router.get('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getParcelById);
40: 
41: // GET    /api/v1/parcels/:id/label-data → Get label data for rendering (ADMIN, OPERATOR)
42: router.get('/:id/label-data', protect, authorizeRoles('ADMIN', 'OPERATOR'), getLabelData);
43: 
44: // GET    /api/v1/parcels/:id/timeline   → Get Amazon-style event timeline (ALL roles)
45: router.get('/:id/timeline', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getTimeline);
46: 
47: // --- PARAMETERIZED WRITE OPERATIONS ---
48: 
49: // POST   /api/v1/parcels/:id/log-print  → Log label print event (ADMIN, OPERATOR)
50: router.post('/:id/log-print', protect, authorizeRoles('ADMIN', 'OPERATOR'), logPrint);
51: 
52: // --- TERMINAL STATE TRANSITIONS ---
53: 
54: // PATCH  /api/v1/parcels/:id/deliver    → Mark as delivered (ADMIN, OPERATOR)
55: router.patch('/:id/deliver', protect, authorizeRoles('ADMIN', 'OPERATOR'), deliverParcel);
56: 
57: // PATCH  /api/v1/parcels/:id/cancel     → Cancel parcel (ADMIN, OPERATOR)
58: router.patch('/:id/cancel', protect, authorizeRoles('ADMIN', 'OPERATOR'), cancelParcel);
59: 
60: // PATCH  /api/v1/parcels/:id/return     → Mark as returned (ADMIN, OPERATOR)
61: router.patch('/:id/return', protect, authorizeRoles('ADMIN', 'OPERATOR'), returnParcel);
62: 
63: export default router;
````

## File: src/interfaces/http/routes/product.routes.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/routes/product.routes.js
 3: // Description: Routing and RBAC mapping for Product endpoints.
 4: // ============================================================================
 5: 
 6: import express from 'express';
 7: import {
 8:   getProducts,
 9:   getProductById,
10:   createProduct,
11:   updateProduct,
12:   deleteProduct
13: } from '../controllers/product.controller.js';
14: import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
15: import { validate } from '../../../shared/middleware/validate.middleware.js';
16: import { createProductSchema, updateProductSchema } from '../validations/validation.schemas.js';
17: 
18: const router = express.Router();
19: 
20: // All routes require authentication
21: router.use(protect);
22: 
23: // Products are accessible by ADMIN and OPERATOR
24: router.use(authorizeRoles('ADMIN', 'OPERATOR'));
25: 
26: router.route('/')
27:   .get(getProducts)
28:   .post(validate(createProductSchema), createProduct);
29: 
30: router.route('/:id')
31:   .get(getProductById)
32:   .put(validate(updateProductSchema), updateProduct)
33:   .delete(deleteProduct);
34: 
35: export default router;
````

## File: src/interfaces/http/routes/sender.routes.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/routes/sender.routes.js
 3: // Description: Route definitions for Sender (Party) module.
 4: // ============================================================================
 5: 
 6: import express from 'express';
 7: import * as senderController from '../controllers/sender.controller.js';
 8: import { validate } from '../../../shared/middleware/validate.middleware.js';
 9: import { createSenderSchema, updateSenderSchema } from '../validations/validation.schemas.js';
10: 
11: const router = express.Router();
12: 
13: /**
14:  * @route   GET /api/v1/senders
15:  * @desc    Get all active senders
16:  */
17: router.get('/', senderController.getSenders);
18: 
19: /**
20:  * @route   GET /api/v1/senders/lookup
21:  * @desc    Lookup sender by phone number
22:  */
23: router.get('/lookup', senderController.lookupByPhone);
24: 
25: /**
26:  * @route   GET /api/v1/senders/:id
27:  * @desc    Get sender by ID
28:  */
29: router.get('/:id', senderController.getSenderById);
30: 
31: /**
32:  * @route   POST /api/v1/senders
33:  * @desc    Create a new sender
34:  */
35: router.post('/', validate(createSenderSchema), senderController.createSender);
36: 
37: /**
38:  * @route   PUT /api/v1/senders/:id
39:  * @desc    Update an existing sender
40:  */
41: router.put('/:id', validate(updateSenderSchema), senderController.updateSender);
42: 
43: /**
44:  * @route   DELETE /api/v1/senders/:id
45:  * @desc    Soft-delete a sender
46:  */
47: router.delete('/:id', senderController.deleteSender);
48: 
49: export default router;
````

## File: src/interfaces/http/routes/system.routes.js
````javascript
 1: import express from 'express';
 2: import { checkHealth } from '../controllers/system.controller.js';
 3: 
 4: const router = express.Router();
 5: 
 6: /**
 7:  * @route   GET /api/v1/system/health
 8:  * @desc    Check application health
 9:  */
10: router.get('/health', checkHealth);
11: 
12: export default router;
````

## File: src/interfaces/http/validations/bulk-upload.validation.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/validations/bulk-upload.validation.js
 3: // Description: Zod validation schemas for bulk upload payload.
 4: // ============================================================================
 5: 
 6: import { z } from 'zod';
 7: import { createOrderSchema } from './validation.schemas.js';
 8: 
 9: /**
10:  * Validates the bulk upload request body.
11:  * Expects an array of orders matching the standard createOrderSchema.
12:  */
13: export const bulkUploadSchema = z.object({
14:   fileName: z.string().optional(),
15:   rows: z.array(createOrderSchema).min(1, 'At least one order is required for bulk upload')
16: });
````

## File: src/interfaces/http/validations/notification.validation.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/validations/notification.validation.js
 3: // Description: Zod schema definitions for Notification request payloads.
 4: // ============================================================================
 5: 
 6: import { z } from 'zod';
 7: 
 8: /**
 9:  * Validation for sending a notification.
10:  */
11: export const sendNotificationSchema = z.object({
12:   params: z.object({
13:     id: z.string().regex(/^\d+$/, 'Parcel ID must be numeric')
14:   })
15: });
16: 
17: /**
18:  * Validation for resending a notification.
19:  */
20: export const resendNotificationSchema = z.object({
21:   params: z.object({
22:     id: z.string().regex(/^\d+$/, 'Notification ID must be numeric')
23:   })
24: });
25: 
26: /**
27:  * Validation for fetching notification history.
28:  */
29: export const getHistorySchema = z.object({
30:   params: z.object({
31:     id: z.string().regex(/^\d+$/, 'Parcel ID must be numeric')
32:   })
33: });
34: 
35: /**
36:  * Validation for external webhooks.
37:  */
38: export const webhookSchema = z.object({
39:   body: z.object({
40:     notificationId: z.number().int().positive(),
41:     status: z.enum(['sent', 'delivered', 'failed']),
42:     externalId: z.string().optional()
43:   })
44: });
````

## File: src/interfaces/http/validations/parcel.validation.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/validations/parcel.validation.js
 3: // Description: Zod validation schemas for Parcel module endpoints.
 4: // Enforces strict payload shapes before reaching the Service layer.
 5: // ============================================================================
 6: 
 7: import { z } from 'zod';
 8: 
 9: // ----------------------------------------------------------------------------
10: // POST /parcels/scan — Atomic QR scan + AWB link (API Contract §8.4)
11: // ----------------------------------------------------------------------------
12: export const scanParcelSchema = z.object({
13:   qrCode: z.string().min(1, 'QR code (parcel_id) is required'),
14:   awbNumber: z.string().min(1, 'AWB number is required')
15: });
16: 
17: // ----------------------------------------------------------------------------
18: // POST /parcels/dispatch — Bulk dispatch (API Contract §8.5)
19: // ----------------------------------------------------------------------------
20: export const dispatchParcelsSchema = z.object({
21:   parcelIds: z
22:     .array(z.number().int().positive('Each parcel ID must be a positive integer'))
23:     .min(1, 'At least one parcel ID is required')
24: });
````

## File: src/modules/parcel/parcel.seed.js
````javascript
 1: // ============================================================================
 2: // File: src/modules/parcel/parcel.seed.js
 3: // Description: In-memory seed data for mocking receiver_status_details
 4: // (the append-only event log). Used by parcel module operations.
 5: // Imports parcel/receiver/party data from the order seed module.
 6: // ============================================================================
 7: 
 8: import {
 9:   seedParcels,
10:   seedReceivers,
11:   seedParties,
12:   seedOrders,
13: } from '../order/order.seed.js';
14: 
15: /**
16:  * Mock receiver_status_details entries (append-only event log).
17:  * Maps to: receiver_status_details table
18:  * (PkReceiverStatusDetailsId, FkParcelDetailsId, FkReceiverDetailsId,
19:  *  FkOrderStatusId, ActionType, AWBNumber, PreviousStatus, CreatedDate, CreatedBy)
20:  *
21:  * ⚠️ APPEND-ONLY: Never update or delete existing entries.
22:  */
23: const seedStatusLog = [
24:   {
25:     id: 1,
26:     fkParcelDetailsId: 1,
27:     fkReceiverDetailsId: 1,
28:     actionType: 'STATUS_UPDATE',
29:     awbNumber: null,
30:     previousStatus: null,
31:     newStatus: 'PENDING',
32:     createdBy: 'EMP001',
33:     createdDate: new Date('2026-03-30T10:00:00Z')
34:   },
35:   {
36:     id: 2,
37:     fkParcelDetailsId: 2,
38:     fkReceiverDetailsId: 2,
39:     actionType: 'STATUS_UPDATE',
40:     awbNumber: null,
41:     previousStatus: null,
42:     newStatus: 'PENDING',
43:     createdBy: 'EMP001',
44:     createdDate: new Date('2026-03-30T10:00:00Z')
45:   }
46: ];
47: 
48: // Re-export order seeds for cross-module access
49: export {
50:   seedParcels,
51:   seedReceivers,
52:   seedParties,
53:   seedOrders,
54:   seedStatusLog
55: };
````

## File: src/shared/utils/generateToken.js
````javascript
 1: import jwt from 'jsonwebtoken'
 2: 
 3: const generateToken = (id) => {
 4:   const secret = process.env.JWT_SECRET
 5: 
 6:   if (!secret) {
 7:     throw new Error('JWT_SECRET is not defined')
 8:   }
 9: 
10:   return jwt.sign(
11:     { id },
12:     secret,
13:     {
14:       expiresIn: process.env.JWT_EXPIRES_IN || '30d',
15:       algorithm: 'HS256', // explicitly define
16:     }
17:   )
18: }
19: 
20: export default generateToken
````

## File: test_data/Dispatch_Test_Data.txt
````
  1: ========================================
  2: DISPATCH & TERMINAL STATES — Test Data
  3: Sprint 4 Feature B: Dispatch & Terminal States
  4: ========================================
  5: 
  6: --- TEST 1: Dispatch Parcels (Bulk — Happy Path) ---
  7: Method: POST
  8: URL: /api/v1/parcels/dispatch
  9: Headers:
 10:   Authorization: Bearer <OPERATOR_TOKEN>
 11:   Content-Type: application/json
 12: 
 13: Pre-condition: Parcels must be in AWB_LINKED state
 14: 
 15: Body:
 16: {
 17:   "parcelIds": [1, 2]
 18: }
 19: 
 20: Assertions:
 21:   - Status: 200
 22:   - Body: { success: true, data: { dispatched: 2, parcels: [{ status: "DISPATCHED", dispatchDate: "..." }, ...] } }
 23:   - All parcels transitioned to DISPATCHED
 24:   - DispatchDate stamped on each
 25: 
 26: Post-Request Verification:
 27:   - GET /api/v1/parcels/1/timeline should show STATUS_UPDATE event with newStatus: "DISPATCHED"
 28: 
 29: --- TEST 2: Dispatch — Wrong State (Still PENDING) ---
 30: Method: POST
 31: URL: /api/v1/parcels/dispatch
 32: Headers:
 33:   Authorization: Bearer <OPERATOR_TOKEN>
 34:   Content-Type: application/json
 35: 
 36: Pre-condition: Parcel not yet AWB_LINKED
 37: 
 38: Body:
 39: {
 40:   "parcelIds": [1]
 41: }
 42: 
 43: Assertions:
 44:   - Status: 400
 45:   - Body: { success: false, error: "Cannot dispatch parcel PDS-...: status is 'PENDING'. Dispatch requires AWB_LINKED status." }
 46:   - No dispatch before AWB is linked
 47: 
 48: --- TEST 3: Dispatch — Parcel Not Found ---
 49: Method: POST
 50: URL: /api/v1/parcels/dispatch
 51: Headers:
 52:   Authorization: Bearer <OPERATOR_TOKEN>
 53:   Content-Type: application/json
 54: 
 55: Body:
 56: {
 57:   "parcelIds": [9999]
 58: }
 59: 
 60: Assertions:
 61:   - Status: 404
 62:   - Body: { success: false, error: "Parcel with ID 9999 not found" }
 63: 
 64: --- TEST 4: Dispatch — Validation Error (Empty Array) ---
 65: Method: POST
 66: URL: /api/v1/parcels/dispatch
 67: Headers:
 68:   Authorization: Bearer <OPERATOR_TOKEN>
 69:   Content-Type: application/json
 70: 
 71: Body:
 72: {
 73:   "parcelIds": []
 74: }
 75: 
 76: Assertions:
 77:   - Status: 400
 78:   - Body: { success: false, error: "Validation Error - parcelIds: At least one parcel ID is required" }
 79: 
 80: --- TEST 5: Deliver Parcel (Happy Path) ---
 81: Method: PATCH
 82: URL: /api/v1/parcels/1/deliver
 83: Headers:
 84:   Authorization: Bearer <OPERATOR_TOKEN>
 85: 
 86: Pre-condition: Parcel 1 must be in DISPATCHED state
 87: 
 88: Assertions:
 89:   - Status: 200
 90:   - Body: { success: true, data: { status: "DELIVERED", previousStatus: "DISPATCHED" } }
 91: 
 92: --- TEST 6: Deliver — Wrong State (Not Dispatched) ---
 93: Method: PATCH
 94: URL: /api/v1/parcels/1/deliver
 95: Headers:
 96:   Authorization: Bearer <OPERATOR_TOKEN>
 97: 
 98: Pre-condition: Parcel 1 is in PENDING state
 99: 
100: Assertions:
101:   - Status: 400
102:   - Body: { success: false, error: "Invalid state transition: cannot move parcel from 'PENDING' to 'DELIVERED'..." }
103: 
104: --- TEST 7: Cancel Parcel (Happy Path — Before Dispatch) ---
105: Method: PATCH
106: URL: /api/v1/parcels/2/cancel
107: Headers:
108:   Authorization: Bearer <OPERATOR_TOKEN>
109: 
110: Pre-condition: Parcel 2 must be in PENDING, LABEL_PRINTED, or AWB_LINKED state
111: 
112: Assertions:
113:   - Status: 200
114:   - Body: { success: true, data: { status: "CANCELLED", previousStatus: "PENDING" } }
115: 
116: --- TEST 8: Cancel — Wrong State (Already Dispatched) ---
117: Method: PATCH
118: URL: /api/v1/parcels/1/cancel
119: Headers:
120:   Authorization: Bearer <OPERATOR_TOKEN>
121: 
122: Pre-condition: Parcel 1 is in DISPATCHED state
123: 
124: Assertions:
125:   - Status: 400
126:   - Body: { success: false, error: "Invalid state transition: cannot move parcel from 'DISPATCHED' to 'CANCELLED'..." }
127: 
128: --- TEST 9: Return Parcel (Happy Path — After Dispatch) ---
129: Method: PATCH
130: URL: /api/v1/parcels/1/return
131: Headers:
132:   Authorization: Bearer <OPERATOR_TOKEN>
133: 
134: Pre-condition: Parcel 1 must be in DISPATCHED or DELIVERED state
135: 
136: Assertions:
137:   - Status: 200
138:   - Body: { success: true, data: { status: "RETURNED", previousStatus: "DISPATCHED" } }
139: 
140: --- TEST 10: Return — Wrong State (Not Dispatched) ---
141: Method: PATCH
142: URL: /api/v1/parcels/2/return
143: Headers:
144:   Authorization: Bearer <OPERATOR_TOKEN>
145: 
146: Pre-condition: Parcel 2 is in PENDING state
147: 
148: Assertions:
149:   - Status: 400
150:   - Body: { success: false, error: "Invalid state transition: cannot move parcel from 'PENDING' to 'RETURNED'..." }
151:   - Cannot return a parcel that was never dispatched
152: 
153: --- TEST 11: COURIER Role — Cannot Dispatch ---
154: Method: POST
155: URL: /api/v1/parcels/dispatch
156: Headers:
157:   Authorization: Bearer <COURIER_TOKEN>
158:   Content-Type: application/json
159: 
160: Body:
161: {
162:   "parcelIds": [1]
163: }
164: 
165: Assertions:
166:   - Status: 403
167:   - Only ADMIN and OPERATOR can dispatch
````

## File: test_data/LabelPrint_Test_Data.txt
````
 1: ========================================
 2: LABEL PRINT — Test Data
 3: Sprint 3 Feature B: Label Print Logging
 4: ========================================
 5: 
 6: --- TEST 1: Log Label Print (Happy Path) ---
 7: Method: POST
 8: URL: /api/v1/parcels/1/log-print
 9: Headers:
10:   Authorization: Bearer <OPERATOR_TOKEN>
11: 
12: Body: (empty — no request body required)
13: 
14: Assertions:
15:   - Status: 200
16:   - Body: { success: true, data: { parcelId: "PDS-...", status: "LABEL_PRINTED", labelPrintCount: 1 } }
17:   - labelPrintCount incremented by 1
18:   - Status transitioned to LABEL_PRINTED
19: 
20: Post-Request Verification:
21:   - GET /api/v1/parcels/1/timeline should show new STATUS_UPDATE event
22:   - Event should have previousStatus: "PENDING", newStatus: "LABEL_PRINTED"
23: 
24: --- TEST 2: Re-Print Label (Increment Count) ---
25: Method: POST
26: URL: /api/v1/parcels/1/log-print
27: Headers:
28:   Authorization: Bearer <OPERATOR_TOKEN>
29: 
30: Pre-condition: Parcel 1 already in LABEL_PRINTED state from Test 1
31: 
32: Assertions:
33:   - Status: 200
34:   - Body: { success: true, data: { labelPrintCount: 2 } }
35:   - Re-printing is allowed from LABEL_PRINTED state
36: 
37: --- TEST 3: Log Print — Invalid State (Already AWB_LINKED) ---
38: Method: POST
39: URL: /api/v1/parcels/1/log-print
40: Headers:
41:   Authorization: Bearer <OPERATOR_TOKEN>
42: 
43: Pre-condition: Parcel 1 must be in AWB_LINKED state
44: 
45: Assertions:
46:   - Status: 400
47:   - Body: { success: false, error: "Cannot print label: parcel is in 'AWB_LINKED' state..." }
48: 
49: --- TEST 4: Log Print — Parcel Not Found ---
50: Method: POST
51: URL: /api/v1/parcels/9999/log-print
52: Headers:
53:   Authorization: Bearer <OPERATOR_TOKEN>
54: 
55: Assertions:
56:   - Status: 404
57:   - Body: { success: false, error: "Parcel not found" }
58: 
59: --- TEST 5: Log Print — COURIER Role Forbidden ---
60: Method: POST
61: URL: /api/v1/parcels/1/log-print
62: Headers:
63:   Authorization: Bearer <COURIER_TOKEN>
64: 
65: Assertions:
66:   - Status: 403
67:   - Only ADMIN and OPERATOR can print labels
````

## File: test_data/ParcelEvents_Test_Data.txt
````
 1: ========================================
 2: PARCEL EVENTS & AUDIT EXPORT — Test Data
 3: Sprint 4 Feature C: Parcel Events & CSV Export
 4: ========================================
 5: 
 6: --- TEST 1: Browse All Events (No Filters) ---
 7: Method: GET
 8: URL: /api/v1/parcel-events?page=1&limit=50
 9: Headers:
10:   Authorization: Bearer <OPERATOR_TOKEN>
11: 
12: Assertions:
13:   - Status: 200
14:   - Body: { success: true, data: [...], meta: { page, limit, totalRows, totalPages } }
15:   - Each event has: id, parcelId, orderCode, actionType, awbNumber, previousStatus, newStatus, scannedBy, timestamp
16: 
17: --- TEST 2: Browse Events with ActionType Filter ---
18: Method: GET
19: URL: /api/v1/parcel-events?actionType=AWB_LINK
20: Headers:
21:   Authorization: Bearer <OPERATOR_TOKEN>
22: 
23: Assertions:
24:   - Status: 200
25:   - All returned events have actionType === "AWB_LINK"
26: 
27: --- TEST 3: Browse Events with ScannedBy Filter ---
28: Method: GET
29: URL: /api/v1/parcel-events?scannedBy=EMP001
30: Headers:
31:   Authorization: Bearer <OPERATOR_TOKEN>
32: 
33: Assertions:
34:   - Status: 200
35:   - All returned events have scannedBy === "EMP001"
36: 
37: --- TEST 4: Browse Events with Date Range ---
38: Method: GET
39: URL: /api/v1/parcel-events?dateFrom=2026-03-30&dateTo=2026-04-01
40: Headers:
41:   Authorization: Bearer <OPERATOR_TOKEN>
42: 
43: Assertions:
44:   - Status: 200
45:   - All returned events within the date range
46: 
47: --- TEST 5: Browse Events with Combined Filters ---
48: Method: GET
49: URL: /api/v1/parcel-events?actionType=STATUS_UPDATE&scannedBy=EMP001&dateFrom=2026-03-29
50: Headers:
51:   Authorization: Bearer <OPERATOR_TOKEN>
52: 
53: Assertions:
54:   - Status: 200
55:   - Events match ALL filter criteria simultaneously
56: 
57: --- TEST 6: Export Events as CSV ---
58: Method: GET
59: URL: /api/v1/parcel-events/export
60: Headers:
61:   Authorization: Bearer <OPERATOR_TOKEN>
62: 
63: Assertions:
64:   - Status: 200
65:   - Response Header: Content-Type: text/csv
66:   - Response Header: Content-Disposition: attachment; filename="parcel-events-2026-04-16.csv"
67:   - CSV Header Row: EventID,ParcelID,OrderCode,ActionType,AWBNumber,PreviousStatus,NewStatus,ScannedBy,Timestamp
68:   - Subsequent rows contain comma-separated event data
69: 
70: --- TEST 7: Export CSV with Filters ---
71: Method: GET
72: URL: /api/v1/parcel-events/export?actionType=AWB_LINK
73: Headers:
74:   Authorization: Bearer <OPERATOR_TOKEN>
75: 
76: Assertions:
77:   - Status: 200
78:   - CSV only contains AWB_LINK events
79: 
80: --- TEST 8: COURIER Role — Cannot Access Events ---
81: Method: GET
82: URL: /api/v1/parcel-events
83: Headers:
84:   Authorization: Bearer <COURIER_TOKEN>
85: 
86: Assertions:
87:   - Status: 403
88:   - Only ADMIN and OPERATOR can browse events
89: 
90: --- TEST 9: COURIER Role — Cannot Export CSV ---
91: Method: GET
92: URL: /api/v1/parcel-events/export
93: Headers:
94:   Authorization: Bearer <COURIER_TOKEN>
95: 
96: Assertions:
97:   - Status: 403
98:   - Only ADMIN and OPERATOR can export
````

## File: test_data/Product_Test_Data.txt
````
 1: # Product Test Data
 2: 
 3: ## GET /api/v1/products
 4: Method: GET
 5: URL: /api/v1/products
 6: Headers: { "Authorization": "Bearer {{authToken}}" }
 7: Assertions:
 8: 1. Status code is 200
 9: 
10: ## POST /api/v1/products
11: Method: POST
12: URL: /api/v1/products
13: Headers: { "Authorization": "Bearer {{authToken}}", "Content-Type": "application/json" }
14: Payload:
15: {
16:   "productName": "Heavy Equipment",
17:   "materialRate": 500
18: }
19: Assertions:
20: 1. Status code is 200
21: 
22: ## PUT /api/v1/products/:id
23: Method: PUT
24: URL: /api/v1/products/1
25: Headers: { "Authorization": "Bearer {{authToken}}", "Content-Type": "application/json" }
26: Payload:
27: {
28:   "materialRate": 550
29: }
30: Assertions:
31: 1. Status code is 200
32: 
33: ## DELETE /api/v1/products/:id
34: Method: DELETE
35: URL: /api/v1/products/1
36: Headers: { "Authorization": "Bearer {{authToken}}" }
37: Assertions:
38: 1. Status code is 200
````

## File: tests/e2e/mock_api.test.js
````javascript
  1: // ============================================================================
  2: // File: tests/e2e/mock_api.test.js
  3: // Description: End-to-End mock-mode test suite for SDCMS Backend.
  4: // Environment: USE_MOCK_DB=true (no live MySQL required).
  5: // Framework: Jest + Supertest
  6: // Targets: Auth (Login/Profile), System (Health), Master Data (Products,
  7: //          Employees, Couriers), Orders, Parcel Lifecycle.
  8: // ============================================================================
  9: 
 10: import { describe, it, expect, beforeAll } from '@jest/globals';
 11: import request from 'supertest';
 12: import jwt from 'jsonwebtoken';
 13: 
 14: // ============================================================================
 15: // ENV SETUP — Must be set BEFORE dynamic import of app
 16: // ============================================================================
 17: process.env.USE_MOCK_DB = 'true';
 18: process.env.JWT_SECRET = 'e2e-test-secret-key-sdcms-2026';
 19: process.env.JWT_EXPIRES_IN = '1h';
 20: process.env.NODE_ENV = 'test';
 21: 
 22: // ============================================================================
 23: // HELPERS
 24: // ============================================================================
 25: 
 26: /**
 27:  * Generate a JWT directly (bypasses login API for isolated endpoint testing).
 28:  * Uses the same signing logic as shared/utils/generateToken.js.
 29:  *
 30:  * @param {number} employeeCode - EmployeeCode to encode in the token.
 31:  * @returns {string} Signed JWT.
 32:  */
 33: const generateTestToken = (employeeCode) =>
 34:   jwt.sign({ id: employeeCode }, process.env.JWT_SECRET, {
 35:     expiresIn: '1h',
 36:     algorithm: 'HS256',
 37:   });
 38: 
 39: // Pre-generated tokens matching mock seed EmployeeCodes:
 40: //   EmployeeCode 1 = Admin User   (RoleCode: ADMIN)
 41: //   EmployeeCode 2 = Test Operator (RoleCode: OPERATOR)
 42: const ADMIN_TOKEN = generateTestToken(1);
 43: const OPERATOR_TOKEN = generateTestToken(2);
 44: 
 45: // Token for a non-existent employee (for 401 tests)
 46: const INVALID_USER_TOKEN = generateTestToken(99999);
 47: 
 48: // ============================================================================
 49: // APP IMPORT (dynamic — env vars must be set first)
 50: // ============================================================================
 51: let app;
 52: 
 53: beforeAll(async () => {
 54:   const module = await import('../../src/app.js');
 55:   app = module.default;
 56: });
 57: 
 58: // ============================================================================
 59: // ██████ 1. SYSTEM HEALTH ██████
 60: // ============================================================================
 61: describe('1. System Health', () => {
 62:   it('1.1  GET /api/v1/system/health → 200 with status UP', async () => {
 63:     const res = await request(app).get('/api/v1/system/health');
 64: 
 65:     expect(res.statusCode).toBe(200);
 66:     expect(res.body.success).toBe(true);
 67:     expect(res.body.data).toBeDefined();
 68:     expect(res.body.data.status).toBe('UP');
 69:   });
 70: 
 71:   it('1.2  GET /api/v1/nonexistent → 404 from notFound middleware', async () => {
 72:     const res = await request(app).get('/api/v1/nonexistent');
 73: 
 74:     expect(res.statusCode).toBe(404);
 75:     expect(res.body.success).toBe(false);
 76:   });
 77: });
 78: 
 79: // ============================================================================
 80: // ██████ 2. AUTH — LOGIN ██████
 81: // ============================================================================
 82: describe('2. Auth — Login', () => {
 83:   it('2.1  POST /api/v1/auth/login → 200 with valid credentials', async () => {
 84:     const res = await request(app)
 85:       .post('/api/v1/auth/login')
 86:       .send({ email: 'admin@example.com', password: 'securePass123' });
 87: 
 88:     expect(res.statusCode).toBe(200);
 89:     expect(res.body.success).toBe(true);
 90:     expect(res.body.data).toHaveProperty('token');
 91:     expect(res.body.data.email).toBe('admin@example.com');
 92:   });
 93: 
 94:   it('2.2  POST /api/v1/auth/login → 401 with wrong password', async () => {
 95:     const res = await request(app)
 96:       .post('/api/v1/auth/login')
 97:       .send({ email: 'admin@example.com', password: 'wrongPassword' });
 98: 
 99:     expect(res.statusCode).toBe(401);
100:     expect(res.body.success).toBe(false);
101:   });
102: 
103:   it('2.3  POST /api/v1/auth/login → 400 with missing password (Zod)', async () => {
104:     const res = await request(app)
105:       .post('/api/v1/auth/login')
106:       .send({ email: 'admin@example.com' });
107: 
108:     expect(res.statusCode).toBe(400);
109:     expect(res.body.success).toBe(false);
110:     expect(res.body.error).toContain('Validation Error');
111:   });
112: 
113:   it('2.4  POST /api/v1/auth/login → 401 with non-existent email', async () => {
114:     const res = await request(app)
115:       .post('/api/v1/auth/login')
116:       .send({ email: 'nobody@example.com', password: 'anyPassword' });
117: 
118:     expect(res.statusCode).toBe(401);
119:     expect(res.body.success).toBe(false);
120:   });
121: });
122: 
123: // ============================================================================
124: // ██████ 3. AUTH — PROFILE ██████
125: // ============================================================================
126: describe('3. Auth — Profile', () => {
127:   it('3.1  GET /api/v1/auth/profile → 401 without token', async () => {
128:     const res = await request(app).get('/api/v1/auth/profile');
129: 
130:     expect(res.statusCode).toBe(401);
131:   });
132: 
133:   it('3.2  GET /api/v1/auth/profile → 200 with valid ADMIN token', async () => {
134:     const res = await request(app)
135:       .get('/api/v1/auth/profile')
136:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
137: 
138:     expect(res.statusCode).toBe(200);
139:     expect(res.body.success).toBe(true);
140:     expect(res.body.data).toBeDefined();
141:   });
142: 
143:   it('3.3  GET /api/v1/auth/profile → 401 with token for non-existent user', async () => {
144:     const res = await request(app)
145:       .get('/api/v1/auth/profile')
146:       .set('Authorization', `Bearer ${INVALID_USER_TOKEN}`);
147: 
148:     expect(res.statusCode).toBe(401);
149:   });
150: });
151: 
152: // ============================================================================
153: // ██████ 4. MASTER DATA — PRODUCTS ██████
154: // ============================================================================
155: describe('4. Products CRUD', () => {
156:   it('4.1  GET /api/v1/products → 200 with paginated list', async () => {
157:     const res = await request(app)
158:       .get('/api/v1/products')
159:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
160: 
161:     expect(res.statusCode).toBe(200);
162:     expect(res.body.success).toBe(true);
163:     expect(res.body.data).toBeInstanceOf(Array);
164:   });
165: 
166:   it('4.2  POST /api/v1/products → 201 creates a new product', async () => {
167:     const res = await request(app)
168:       .post('/api/v1/products')
169:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
170:       .send({ productName: 'Test Widget', materialRate: 99.99 });
171: 
172:     expect(res.statusCode).toBe(201);
173:     expect(res.body.success).toBe(true);
174:     expect(res.body.data).toBeDefined();
175:   });
176: 
177:   it('4.3  GET /api/v1/products/1 → 200 gets product by ID', async () => {
178:     const res = await request(app)
179:       .get('/api/v1/products/1')
180:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
181: 
182:     expect(res.statusCode).toBe(200);
183:     expect(res.body.success).toBe(true);
184:     expect(res.body.data).toBeDefined();
185:   });
186: });
187: 
188: // ============================================================================
189: // ██████ 5. MASTER DATA — EMPLOYEES ██████
190: // ============================================================================
191: describe('5. Employees', () => {
192:   it('5.1  GET /api/v1/employees → 200 with ADMIN token', async () => {
193:     const res = await request(app)
194:       .get('/api/v1/employees')
195:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
196: 
197:     expect(res.statusCode).toBe(200);
198:     expect(res.body.success).toBe(true);
199:     expect(res.body.data).toBeInstanceOf(Array);
200:   });
201: 
202:   it('5.2  GET /api/v1/employees/1 → 200 gets employee by ID', async () => {
203:     const res = await request(app)
204:       .get('/api/v1/employees/1')
205:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
206: 
207:     expect(res.statusCode).toBe(200);
208:     expect(res.body.success).toBe(true);
209:     expect(res.body.data).toBeDefined();
210:   });
211: 
212:   it('5.3  GET /api/v1/employees → 403 with OPERATOR token (ADMIN only)', async () => {
213:     const res = await request(app)
214:       .get('/api/v1/employees')
215:       .set('Authorization', `Bearer ${OPERATOR_TOKEN}`);
216: 
217:     expect(res.statusCode).toBe(403);
218:   });
219: });
220: 
221: // ============================================================================
222: // ██████ 6. MASTER DATA — COURIERS ██████
223: // ============================================================================
224: describe('6. Couriers', () => {
225:   it('6.1  GET /api/v1/courier-partners → 200 with authenticated token', async () => {
226:     const res = await request(app)
227:       .get('/api/v1/courier-partners')
228:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
229: 
230:     expect(res.statusCode).toBe(200);
231:     expect(res.body.success).toBe(true);
232:     expect(res.body.data).toBeInstanceOf(Array);
233:   });
234: 
235:   it('6.2  POST /api/v1/courier-partners → 201 creates a new courier', async () => {
236:     const res = await request(app)
237:       .post('/api/v1/courier-partners')
238:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
239:       .send({
240:         courierName: 'TestCourier Express',
241:         trackingUrlTemplate: 'https://track.testcourier.com/awb/{AWB}',
242:       });
243: 
244:     expect(res.statusCode).toBe(201);
245:     expect(res.body.success).toBe(true);
246:   });
247: });
248: 
249: // ============================================================================
250: // ██████ 7. ORDERS ██████
251: // ============================================================================
252: describe('7. Orders', () => {
253:   it('7.1  GET /api/v1/orders → 200 with paginated list', async () => {
254:     const res = await request(app)
255:       .get('/api/v1/orders')
256:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
257: 
258:     expect(res.statusCode).toBe(200);
259:     expect(res.body.success).toBe(true);
260:     expect(res.body.data).toBeInstanceOf(Array);
261:   });
262: 
263:   it('7.2  POST /api/v1/orders → 201 creates a new order', async () => {
264:     const res = await request(app)
265:       .post('/api/v1/orders')
266:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
267:       .send({
268:         senderName: 'E2E Test Sender',
269:         senderMobile: '9000000001',
270:         courierId: 1,
271:         receivers: [
272:           {
273:             receiverName: 'E2E Test Receiver',
274:             receiverPhone: '9000000002',
275:             addressLine1: '1 Test Street',
276:             city: 'TestCity',
277:             state: 'TestState',
278:             pincode: '100001',
279:             products: [{ productId: 1, qty: 2, unitPrice: 100 }],
280:           },
281:         ],
282:       });
283: 
284:     expect(res.statusCode).toBe(201);
285:     expect(res.body.success).toBe(true);
286:     expect(res.body.data).toBeDefined();
287:   });
288: 
289:   it('7.3  GET /api/v1/orders/1 → 200 gets order aggregate by ID', async () => {
290:     const res = await request(app)
291:       .get('/api/v1/orders/1')
292:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
293: 
294:     expect(res.statusCode).toBe(200);
295:     expect(res.body.success).toBe(true);
296:     expect(res.body.data).toBeDefined();
297:   });
298: 
299:   it('7.4  GET /api/v1/orders → 401 without token', async () => {
300:     const res = await request(app).get('/api/v1/orders');
301: 
302:     expect(res.statusCode).toBe(401);
303:   });
304: });
305: 
306: // ============================================================================
307: // ██████ 8. PARCELS — READ ██████
308: // ============================================================================
309: describe('8. Parcels — Read', () => {
310:   it('8.1  GET /api/v1/parcels → 200 with paginated list', async () => {
311:     const res = await request(app)
312:       .get('/api/v1/parcels')
313:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
314: 
315:     expect(res.statusCode).toBe(200);
316:     expect(res.body.success).toBe(true);
317:     expect(res.body.data).toBeInstanceOf(Array);
318:   });
319: 
320:   it('8.2  GET /api/v1/parcels/1 → 200 gets parcel by ID', async () => {
321:     const res = await request(app)
322:       .get('/api/v1/parcels/1')
323:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
324: 
325:     expect(res.statusCode).toBe(200);
326:     expect(res.body.success).toBe(true);
327:     expect(res.body.data).toBeDefined();
328:   });
329: 
330:   it('8.3  GET /api/v1/parcels/1/label-data → 200 gets label data', async () => {
331:     const res = await request(app)
332:       .get('/api/v1/parcels/1/label-data')
333:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
334: 
335:     expect(res.statusCode).toBe(200);
336:     expect(res.body.success).toBe(true);
337:     expect(res.body.data).toBeDefined();
338:   });
339: 
340:   it('8.4  GET /api/v1/parcels/1/timeline → 200 gets event timeline', async () => {
341:     const res = await request(app)
342:       .get('/api/v1/parcels/1/timeline')
343:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
344: 
345:     expect(res.statusCode).toBe(200);
346:     expect(res.body.success).toBe(true);
347:   });
348: 
349:   it('8.5  GET /api/v1/parcels/99999 → 404 on non-existent parcel', async () => {
350:     const res = await request(app)
351:       .get('/api/v1/parcels/99999')
352:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
353: 
354:     expect(res.statusCode).toBe(404);
355:   });
356: });
357: 
358: // ============================================================================
359: // ██████ 9. PARCELS — LIFECYCLE (State Transitions) ██████
360: // Exercises the full state machine:
361: //   PENDING → LABEL_PRINTED → AWB_LINKED → DISPATCHED → DELIVERED
362: // Uses seed parcel ID 1 (PDS-A1B2C3, status: PENDING)
363: // ============================================================================
364: describe('9. Parcels — Lifecycle', () => {
365:   it('9.1  POST /api/v1/parcels/1/log-print → 200 transitions to LABEL_PRINTED', async () => {
366:     const res = await request(app)
367:       .post('/api/v1/parcels/1/log-print')
368:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
369: 
370:     expect(res.statusCode).toBe(200);
371:     expect(res.body.success).toBe(true);
372:     // Verify the status changed
373:     if (res.body.data) {
374:       expect(res.body.data.status).toBe('LABEL_PRINTED');
375:     }
376:   });
377: 
378:   it('9.2  POST /api/v1/parcels/scan → 200 links AWB to LABEL_PRINTED parcel', async () => {
379:     const res = await request(app)
380:       .post('/api/v1/parcels/scan')
381:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
382:       .send({
383:         qrCode: 'PDS-A1B2C3',     // seed parcel_id for parcel 1
384:         awbNumber: 'AWB-E2E-001',  // unique AWB
385:       });
386: 
387:     expect(res.statusCode).toBe(200);
388:     expect(res.body.success).toBe(true);
389:   });
390: 
391:   it('9.3  POST /api/v1/parcels/dispatch → 200 dispatches AWB_LINKED parcel', async () => {
392:     const res = await request(app)
393:       .post('/api/v1/parcels/dispatch')
394:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
395:       .send({ parcelIds: [1] });
396: 
397:     expect(res.statusCode).toBe(200);
398:     expect(res.body.success).toBe(true);
399:   });
400: 
401:   it('9.4  PATCH /api/v1/parcels/1/deliver → 200 marks as DELIVERED', async () => {
402:     const res = await request(app)
403:       .patch('/api/v1/parcels/1/deliver')
404:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
405: 
406:     expect(res.statusCode).toBe(200);
407:     expect(res.body.success).toBe(true);
408:   });
409: });
410: 
411: // ============================================================================
412: // ██████ 10. PARCELS — VALIDATION / NEGATIVE PATHS ██████
413: // ============================================================================
414: describe('10. Parcels — Validation', () => {
415:   it('10.1 POST /api/v1/parcels/scan → 400 with missing qrCode (Zod)', async () => {
416:     const res = await request(app)
417:       .post('/api/v1/parcels/scan')
418:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
419:       .send({ awbNumber: 'AWB-ZZZ' });
420: 
421:     expect(res.statusCode).toBe(400);
422:     expect(res.body.success).toBe(false);
423:     expect(res.body.error).toContain('Validation Error');
424:   });
425: 
426:   it('10.2 POST /api/v1/parcels/dispatch → 400 with empty parcelIds', async () => {
427:     const res = await request(app)
428:       .post('/api/v1/parcels/dispatch')
429:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
430:       .send({ parcelIds: [] });
431: 
432:     expect(res.statusCode).toBe(400);
433:     expect(res.body.success).toBe(false);
434:   });
435: 
436:   // Parcel 2 is still PENDING — cannot dispatch without AWB
437:   it('10.3 POST /api/v1/parcels/dispatch → 400 dispatching PENDING parcel', async () => {
438:     const res = await request(app)
439:       .post('/api/v1/parcels/dispatch')
440:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
441:       .send({ parcelIds: [2] });
442: 
443:     expect(res.statusCode).toBe(400);
444:     expect(res.body.success).toBe(false);
445:   });
446: 
447:   it('10.4 PATCH /api/v1/parcels/2/cancel → 200 cancels PENDING parcel', async () => {
448:     const res = await request(app)
449:       .patch('/api/v1/parcels/2/cancel')
450:       .set('Authorization', `Bearer ${ADMIN_TOKEN}`);
451: 
452:     expect(res.statusCode).toBe(200);
453:     expect(res.body.success).toBe(true);
454:   });
455: });
````

## File: .editorconfig
````
 1: root = true
 2: 
 3: [*]
 4: charset = utf-8
 5: end_of_line = lf
 6: insert_final_newline = true
 7: trim_trailing_whitespace = true
 8: indent_style = space
 9: indent_size = 2
10: 
11: [*.md]
12: trim_trailing_whitespace = false
13: 
14: [*.env]
15: trim_trailing_whitespace = false
16: 
17: [*.sql]
18: indent_size = 2
````

## File: .gitattributes
````
 1: # Normalize line endings across OS (VERY IMPORTANT)
 2: * text=auto
 3: 
 4: # Explicit text files
 5: 
 6: *.js text
 7: *.jsx text
 8: *.ts text
 9: *.tsx text
10: *.json text
11: *.css text
12: *.html text
13: *.md text
14: 
15: 
16: # Binary files (no line ending conversion)
17: 
18: *.png binary
19: *.jpg binary
20: *.jpeg binary
21: *.gif binary
22: *.ico binary
23: *.svg binary
24: 
25: # Prevent diff noise for lock files
26: package-lock.json -diff
````

## File: .nvmrc
````
1: 24
````

## File: jest.config.js
````javascript
 1: // ============================================================================
 2: // Jest Configuration for SDCMS Backend
 3: // Supports ESM via --experimental-vm-modules Node flag.
 4: // ============================================================================
 5: 
 6: export default {
 7:   testEnvironment: 'node',
 8:   transform: {},
 9:   // Increase timeout for E2E tests (mock DB init can take time)
10:   testTimeout: 15000,
11: };
````

## File: README.md
````markdown
1: # SDCMS-Server
2: Node Backend server for the Smart Dispatch and Courier Management System
````

## File: .agent/rules/backend_implementation_plan_v3.md
````markdown
  1: ---
  2: trigger: model_decision
  3: description: Trigger when the user commands "Implement Sprint [X] Feature [Y]". Provides the exact backend API roadmap, enforcing zero direct DB access (use SPs), plain-text Bruno testing, and heavy commentary for the Antigravity project.
  4: ---
  5: 
  6: # Backend API Implementation Plan — v3
  7: 
  8: ## Goal Description
  9: 
 10: Cross-review of **`api_contract_v2.0_p1.md`**, **`api_contract_v2.0_p2.md`**, **`system_flow_v2.1.md`**, and **`api_procedure_spec_v1.md`**. Supersedes v2.
 11: 
 12: **What changed since v2?**
 13: 1. **`_set` / `_get` Procedure Standard:** All old semantic names (`prc_CreateProduct`, `prc_ScanAndLinkAWB`, etc.) are replaced by standardized `prc_[tablename]_set` and `prc_[tablename]_get` procedures per `api_procedure_spec_v1.md`.
 14: 2. **Upsert via `_set`:** `_set` procedures handle Insert (ID=0), Update (ID>0), and soft-delete (IsActive=0). **No `pAction` parameter** on `_set` calls.
 15: 3. **Read via `_get`:** `_get` procedures **MUST** use `pAction` integer (`0`=get all, `1`=get specific, `2`+=custom queries like label-data).
 16: 4. **Duplicate Checking:** Uses `prc_check_duplicate_XXX` triggers instead of relying solely on MySQL 1062 errors.
 17: 5. **Audit Logging:** All `prc_parcel_details_set` calls internally trigger `prc_receiver_status_details_set`.
 18: 6. **Seeder Migration:** ✅ Done — `lu_order_status`/`lu_parcel_status` replaced with unified `lu_master` → `lu_details` hierarchy.
 19: 7. **Order Module Refactored:** ✅ Done — field names aligned to `db_schema_v1`, response envelope added, `express-async-handler` wired, update/cancel routes added.
 20: 
 21: ## Core Project Rules
 22: > [!IMPORTANT]
 23: > 1. **Zero Direct DB Ops:** Every Repository MUST invoke `CALL prc_[tablename]_set/get(...)`. In-memory mocks with commented-out `CALL` placeholders are acceptable during dev.
 24: > 2. **`_set`/`_get` Convention:** Upserts go through `_set` (ID=0 insert, ID>0 update). Reads go through `_get` with `pAction`. **Never** use old semantic names like `prc_CreateProduct`.
 25: > 3. **Plain-Text Test Data:** Ship `[FeatureName]_Test_Data.txt` files per `AGENTS.md` §6. No native `.bru` files.
 26: > 4. **Zod Validation:** All payloads validated via Zod before reaching the Service layer.
 27: > 5. **Async Error Handling:** Controllers use `express-async-handler`. Services use `try/catch`.
 28: > 6. **Response Envelope:** `{ success, data?, error? }`. Paginated lists add `meta: { page, limit, totalRows, totalPages }`.
 29: 
 30: ## Execution Strategy
 31: Each Sprint is divided into standalone "Features." Command a single Feature (e.g., *"Implement Sprint 2 - Feature C"*) to work on just that piece.
 32: 
 33: ---
 34: 
 35: ### Sprint 1: Project Setup & Auth ✅ COMPLETED
 36: 
 37: - [x] **Feature A:** Route standards (`/api/v1/...`), seeders (`lu_user_role`, unified `lu_master`→`lu_details`).
 38: - [x] **Feature B:** Auth alignment (`auth.routes.js`, `POST /auth/login` → `prc_employee_master_get` pAction=1).
 39: - [x] **Feature C:** Employee CRUD (5 endpoints on `/employees`). Maps to `prc_employee_master_set` / `prc_employee_master_get`.
 40: 
 41: ---
 42: 
 43: ### Sprint 2: Master Data & Order Creation
 44: 
 45: - [x] **Feature A: Courier Partners** — 5 endpoints on `/courier-partners`. `ADMIN` only.
 46:   - Repository: `prc_courier_partner_master_set` (upsert/delete) / `prc_courier_partner_master_get` (pAction 0,1).
 47:   - ⚠️ Current mock uses old `prc_Create...` names — retrofit in Sprint 7.
 48: 
 49: - [x] **Feature B: Products** — 5 endpoints on `/products`. `ADMIN`, `OPERATOR`.
 50:   - Repository: `prc_product_master_set` (upsert/delete) / `prc_product_master_get` (pAction 0,1).
 51:   - ⚠️ Current mock uses old `prc_Create...` names — retrofit in Sprint 7.
 52: 
 53: - [ ] **Feature C: Senders (Party_master)**
 54:   - New module: `src/modules/sender/` + routes + controller. Register as `/api/v1/senders`.
 55:   - Endpoints (API Contract §6):
 56:     - `POST /senders` → `prc_Party_master_set` (ID=0, find-or-create by phone).
 57:     - `GET /senders` → `prc_Party_master_get` (pAction=0, paginated).
 58:     - `GET /senders/:id` → `prc_Party_master_get` (pAction=1).
 59:     - `PUT /senders/:id` → `prc_Party_master_set` (ID>0).
 60:     - `DELETE /senders/:id` → `prc_Party_master_set` (IsActive=0).
 61:     - `GET /senders/lookup?phone=...` → `prc_Party_master_get` (pAction=1, returns `200` with `null` if not found).
 62:   - Structured address: `addressLine1/2`, `city`, `state`, `pincode`. Zod schema required.
 63:   - Ship `Sender_Test_Data.txt`.
 64: 
 65: - [ ] **Feature D: Order Pipeline**
 66:   - ⚠️ Base refactor done (field names, routes, envelope). SP names still need `_set`/`_get` update.
 67:   - **Create** (`POST /orders`) → `prc_order_master_set` (ID=0). Atomic: `order_master` → `receiver_details` → `order_items` → `parcel_details`. 1 receiver = 1 parcel.
 68:   - **List** (`GET /orders`) → `prc_order_master_get` (pAction=0). Derived order status from parcel states.
 69:   - **Get Aggregate** (`GET /orders/:id`) → `prc_order_master_get` (pAction=1). Nested JSON: `Order → Receivers → [Items, Parcel]`.
 70:   - **Update** (`PUT /orders/:id`) → `prc_order_master_set` (ID>0). ❗ Fails if any parcel ≥ AWB_LINKED.
 71:   - **Cancel** (`PATCH /orders/:id/cancel`) → `prc_order_master_set` (pCancelRequested=1). ❌ Blocked if dispatched/delivered. Cascades + logs to `receiver_status_details`.
 72:   - Ship `Order_Test_Data.txt`.
 73: 
 74: ---
 75: 
 76: ### Sprint 3: QR, Label Printing & Parcel Retrieval
 77: 
 78: - [ ] **Feature A: Parcel Retrieval & Label Data**
 79:   - New module: `src/modules/parcel/` + routes + controller. Register as `/api/v1/parcels`.
 80:   - `GET /parcels` → `prc_parcel_details_get` (pAction=0, paginated, filterable).
 81:   - `GET /parcels/:id` → `prc_parcel_details_get` (pAction=1).
 82:   - `GET /parcels/:id/label-data` → `prc_parcel_details_get` (pAction=2). Stitches sender snapshot + receiver address + parcel_id into flat JSON.
 83:   - `GET /parcels/:id/timeline` → `prc_receiver_status_details_get` (pAction=1). Amazon-style event timeline.
 84:   - Ship `Parcel_Test_Data.txt`.
 85: 
 86: - [ ] **Feature B: Label Print Logging**
 87:   - `POST /parcels/:id/log-print` → `prc_parcel_details_set`. Increments `LabelPrintCount`, transitions to `LABEL_PRINTED`, triggers `prc_receiver_status_details_set` internally.
 88:   - Ship `LabelPrint_Test_Data.txt`.
 89: 
 90: ---
 91: 
 92: ### Sprint 4: Scanner Operations & AWB Linking
 93: 
 94: - [ ] **Feature A: Two-Scan Operation (Parcel ID + AWB)**
 95:   - `POST /parcels/scan` → `prc_parcel_details_set`. Validates parcel_id, ensures unique AWB (409 on duplicate).
 96:   - Role-based: **COURIER** → auto-dispatch. **OPERATOR** → AWB_LINKED only.
 97:   - Internally triggers `prc_receiver_status_details_set` (ActionType='AWB_LINK').
 98:   - Ship `Scan_Test_Data.txt`.
 99: 
100: - [ ] **Feature B: Dispatch & Terminal States**
101:   - `POST /parcels/dispatch` → `prc_parcel_details_set` (bulk parcelIds array, stamps DispatchDate).
102:   - `PATCH /parcels/:id/deliver` → `prc_parcel_details_set`. Terminal state.
103:   - `PATCH /parcels/:id/cancel` → `prc_parcel_details_set`. ❌ Only before dispatch.
104:   - `PATCH /parcels/:id/return` → `prc_parcel_details_set`. ❌ Only after dispatch.
105:   - All calls trigger `prc_receiver_status_details_set`. No backward/skipped transitions.
106:   - Ship `Dispatch_Test_Data.txt`.
107: 
108: - [ ] **Feature C: Parcel Events & Audit Export**
109:   - `GET /parcel-events` → `prc_receiver_status_details_get` (pAction=0).
110:   - `GET /parcel-events/export` → CSV download for end-of-day auditing.
111:   - Ship `ParcelEvents_Test_Data.txt`.
112: 
113: ---
114: 
115: ### Sprint 5: Bulk Upload
116: 
117: - [ ] **Feature A: Bulk Upload Flow**
118:   - New module: `src/modules/bulk-upload/`.
119:   - `POST /bulk-uploads` → `prc_bulk_order_upload_log_set` (session header), iterates rows calling `prc_order_master_set` per row, logs via `prc_bulk_order_upload_detail_set`, finalizes session.
120:   - `GET /bulk-uploads` / `GET /bulk-uploads/:id` → read session + row-by-row results.
121:   - Zod validation on incoming JSON array.
122:   - Ship `BulkUpload_Test_Data.txt`.
123: 
124: ---
125: 
126: ### Sprint 6: Notifications
127: 
128: - [ ] **Feature A: Notification System**
129:   - New module: `src/modules/notification/`.
130:   - `POST /parcels/:id/notify` → `prc_Notification_log_set`. Uses `TrackingUrlTemplate` from courier, replaces `{AWB}`.
131:   - `POST /notifications/:id/resend` → `prc_Notification_log_set` (re-trigger failed).
132:   - `GET /parcels/:id/notifications` → `prc_Notification_log_get` (pAction=1).
133:   - `POST /notifications/webhook` → `prc_Notification_log_set` (status callback: Sent/Failed).
134:   - Ship `Notification_Test_Data.txt`.
135: 
136: ---
137: 
138: ### Sprint 7: Dashboard, Auth Profile & SP Retrofit
139: 
140: - [ ] **Feature A: Auth Profile**
141:   - `GET /auth/profile` → `prc_employee_master_get` (pAction=1, from JWT). All roles.
142:   - Ship `AuthProfile_Test_Data.txt`.
143: 
144: - [ ] **Feature B: Dashboard**
145:   - `GET /dashboard/metrics` → `prc_dashboard_metrics_get` (pAction=0). Aggregates from `parcel_details` states dynamically. `ADMIN` only.
146:   - Ship `Dashboard_Test_Data.txt`.
147: 
148: - [ ] **Feature C: SP Name Retrofit (Mock → `_set`/`_get`)**
149:   - Update **all** existing repository placeholder comments across `auth`, `employee`, `courier`, `product`, `order` modules from old semantic names to `_set`/`_get` convention.
150:   - Verify no anti-patterns: no `pAction` on `_set` calls, no old `prc_Create...` names.
151: 
152: ---
153: 
154: ### Sprint 8: Production Hardening
155: 
156: - [ ] **Feature A: Repository Migration (Mock → Live DB)**
157:   - For each module: remove in-memory seed arrays, activate `CALL prc_..._set/get(...)` invocations.
158:   - Wire MySQL error translation: `prc_check_duplicate_XXX` → 409, SIGNAL → 400, no rows → 404, 1062 → 409.
159: 
160: - [x] **Feature B: Seeder Reconciliation** ✅ COMPLETED
161:   - Migrated to unified `lu_master` → `lu_details` hierarchy. Removed `lu_order_status`/`lu_parcel_status`.
162: 
163: - [ ] **Feature C: Integration Testing**
164:   - E2E: Create sender → Create order → Print label → Scan QR+AWB → Dispatch → Deliver.
165:   - Verify `receiver_status_details` audit trail. Verify derived order status computation.
````

## File: .agent/rules/db_schema_v1.md
````markdown
  1: ---
  2: trigger: model_decision
  3: description: Primary reference for the v1 database physical schema (tables, columns, types, and FKs). Use for data structure context. For logic and stored procedures, refer to api_procedure_spec document.
  4: ---
  5: 
  6: ## 🔷 MASTER TABLES
  7: 
  8: ### Party_master
  9: - PkPartyId (PK)
 10: - FkPartyTypeId (Sender / Receiver)
 11: - CustomerName
 12: - PhoneNo
 13: - EmailId
 14: - AddressLine1
 15: - AddressLine2
 16: - City
 17: - State
 18: - Pincode
 19: - CreatedBy
 20: - CreatedDate
 21: - UpdatedBy
 22: - UpdatedDate
 23: - IsActive
 24: 
 25: ---
 26: 
 27: ### product_category
 28: - PkProductCategoryId (PK)
 29: - CategoryName
 30: - IsActive
 31: - CreatedDate
 32: - CreatedBy
 33: - UpdatedDate
 34: - UpdatedBy
 35: 
 36: ---
 37: 
 38: ### product_master
 39: - PkProductId (PK)
 40: - FkProductCategoryId (FK)
 41: - FkUnitId (FK)
 42: - MaterialCode
 43: - MaterialName
 44: - cu_item_code
 45: - MaterialRate
 46: - MaterialDescription
 47: - CreatedBy
 48: - CreatedDate
 49: - UpdatedBy
 50: - UpdatedDate
 51: - IsActive
 52: 
 53: ---
 54: 
 55: ### lu_unit
 56: - PkUnitId (PK)
 57: - UnitTitle
 58: - UnitCode
 59: - ConversionFactor
 60: - CreatedDate
 61: - CreatedBy
 62: - IsActive
 63: 
 64: ---
 65: 
 66: ### courier_partner_master
 67: - CourierId (PK)
 68: - CourierName (UNIQUE)
 69: - TrackingUrlTemplate
 70: - IsActive
 71: 
 72: ---
 73: 
 74: ### employee_master
 75: - EmployeeCode (PK)
 76: - FullName
 77: - ContactNumber
 78: - EmailAddress
 79: - UserName
 80: - Password
 81: - FkRoleId
 82: - AllowLogin
 83: - IsActive
 84: - CreatedDate
 85: - CreatedBy
 86: - UpdatedDate
 87: - UpdatedBy
 88: 
 89: ---
 90: 
 91: ### lu_user_role
 92: - PkUserRoleId (PK)
 93: - RoleCode (UNIQUE)
 94: - RoleDescription
 95: - IsActive
 96: 
 97: ---
 98: 
 99: ### lu_master
100: - LuMasterId (PK)
101: - LuMaster
102: - LuMaster_1
103: - LuMaster_2
104: - LuMaster_3
105: 
106: ---
107: 
108: ### lu_details
109: - LuDetailsId (PK)
110: - LuDetails
111: - LuDetails_1
112: - LuDetails_2
113: - LuDetails_3
114: - LuMasterId (FK)
115: - IsActive
116: 
117: ---
118: 
119: ## 🔷 TRANSACTION TABLES
120: 
121: ### order_master
122: - PkOrderId (PK)
123: - OrderCode
124: - FkSenderId (FK → Party_master)
125: - OrderDate
126: - ExpectedDeliveryDate
127: - TotalAmount
128: - CreatedBy
129: - CreatedDate
130: - UpdatedBy
131: - UpdatedDate
132: - IsActive
133: 
134: > ⚠️ Order status is DERIVED (NOT stored)
135: 
136: ---
137: 
138: ### receiver_details
139: - PkReceiverDetailsId (PK)
140: - FkOrderId (FK → order_master)
141: - FkReceiverId (FK → Party_master, optional)
142: - ReceiverName
143: - ReceiverPhone
144: - ReceiverEmail
145: - AddressLine1
146: - AddressLine2
147: - City
148: - State
149: - Pincode
150: - Country
151: - IsActive
152: 
153: ---
154: 
155: ### order_items
156: - PkOrderItemId (PK)
157: - FkReceiverDetailsId (FK → receiver_details)
158: - FkProductId (FK → product_master)
159: - OutwardQty
160: - FkUnitId (FK → lu_unit)
161: - UnitPrice
162: - TransactionDate
163: - IsActive
164: - CreatedDate
165: - CreatedBy
166: 
167: ---
168: 
169: ### parcel_details
170: - PkParcelDetailsId (PK)
171: - FkReceiverDetailsId (FK → receiver_details)
172: - FkCourierId (FK → courier_partner_master)
173: - TrackingNo (AWB)
174: - QRCode (UNIQUE)
175: - FkParcelStatusId (FK → lu_details)
176: - LabelPrintCount
177: - DispatchDate
178: - CreatedDate
179: - CreatedBy
180: 
181: > ✅ Constraint:
182: UNIQUE (FkCourierId, TrackingNo)
183: 
184: ---
185: 
186: ### receiver_status_details (EVENT LOG)
187: 
188: - PkReceiverStatusDetailsId (PK)
189: - FkParcelDetailsId (FK → parcel_details) ✅ CRITICAL
190: - FkReceiverDetailsId (FK → receiver_details)
191: - FkOrderStatusId (FK → lu_details)
192: - ActionType (QR_SCAN | AWB_LINK | STATUS_UPDATE | RELINK_AWB)
193: - AWBNumber (nullable)
194: - PreviousStatus (nullable)
195: - CreatedDate
196: - CreatedBy
197: 
198: > ⚠️ Append-only audit + scan log
199: 
200: ---
201: 
202: ### Notification_log
203: 
204: - PkNotificationLogId (PK)
205: - FkParcelDetailsId (FK → parcel_details) ✅
206: - FkReceiverDetailsId (FK → receiver_details) ✅
207: - FkNotificationTypeId
208: - FkClientId
209: - FkPlantId
210: - FkReasonId
211: - FkReasonDetailsId
212: - AppSendStatusId
213: - SMSSendStatusId
214: - EmailSendStatusId
215: - LastNotificationTime
216: - LastNotificationLevel
217: - IsActive
218: - RequestedBy
219: - IsPaymentCheck
220: 
221: ---
222: 
223: ## 🔷 OPTIONAL (RECOMMENDED)
224: 
225: ### courier_awb_prefix_map
226: 
227: - Id (PK)
228: - FkCourierId
229: - Prefix
230: 
231: > Used for auto-detecting courier from AWB
232: 
233: ---
234: 
235: ## 🔷 STATUS DEFINITIONS (lu_details)
236: 
237: ### Parcel Status
238: - Pending
239: - Label Printed
240: - AWB Linked
241: - Dispatched
242: - Delivered
243: 
244: ---
245: 
246: ### ActionType (ENUM)
247: - QR_SCAN
248: - AWB_LINK
249: - STATUS_UPDATE
250: - RELINK_AWB
251: 
252: ---
253: 
254: ## 🔷 KEY RULES
255: 
256: - QRCode → UNIQUE
257: - AWB → UNIQUE per courier
258: - One parcel = one AWB
259: - LabelPrintCount → increment only
260: - Logs → append only
261: - Order status → derived from parcel states
````

## File: src/infrastructure/database/db.js
````javascript
 1: import mysql from 'mysql2/promise';
 2: import dotenv from 'dotenv';
 3: 
 4: // Execute the config immediately (similar to require('dotenv').config())
 5: dotenv.config();
 6: 
 7: const pool = mysql.createPool({
 8:   host: process.env.DB_HOST,
 9:   user: process.env.DB_USER,
10:   password: process.env.DB_PASSWORD,
11:   database: process.env.DB_NAME,
12:   waitForConnections: true,
13:   connectionLimit: 10,
14: });
15: 
16: // Use 'export default' instead of module.exports
17: export default pool;
````

## File: src/infrastructure/database/seeders.js
````javascript
  1: import pool from './db.js';
  2: import dotenv from 'dotenv';
  3: 
  4: // Load environment variables
  5: dotenv.config();
  6: 
  7: // ============================================================================
  8: // SIMPLE SEEDS — Tables with no FK dependencies
  9: // ============================================================================
 10: const simpleSeedData = [
 11:   {
 12:     table: 'lu_user_role',
 13:     columns: ['RoleCode', 'Description'],
 14:     data: [
 15:       ['ADMIN', 'The boss. Full access to everything'],
 16:       ['OPERATOR', 'Desk staff. Creates orders, prints labels'],
 17:       ['COURIER', 'Delivery staff. Scans parcels, links AWBs, dispatches']
 18:     ],
 19:     duplicateCheckColumn: 'RoleCode'
 20:   }
 21: ];
 22: 
 23: // ============================================================================
 24: // UNIFIED LOOKUP SEEDS — lu_master (categories) + lu_details (values)
 25: // Replaces the old lu_order_status, lu_parcel_status, lu_notification_status
 26: // tables with the unified lu_master → lu_details hierarchy from db_schema_v1.
 27: // ============================================================================
 28: 
 29: /**
 30:  * lu_master categories to seed.
 31:  * Each category groups a set of lu_details entries (e.g., all parcel statuses).
 32:  */
 33: const luMasterCategories = [
 34:   { LuMaster: 'Parcel Status', LuMaster_1: 'PARCEL_STATUS', LuMaster_2: 'Status values for parcel state machine' },
 35:   { LuMaster: 'Notification Status', LuMaster_1: 'NOTIFICATION_STATUS', LuMaster_2: 'Status values for notification delivery tracking' }
 36: ];
 37: 
 38: /**
 39:  * lu_details entries to seed, keyed by their parent lu_master category code (LuMaster_1).
 40:  *
 41:  * Columns mapped:
 42:  *   LuDetails   = Human-readable status name (e.g., "Pending")
 43:  *   LuDetails_1 = Machine-readable status code (e.g., "PENDING")
 44:  *   LuDetails_2 = Description
 45:  *   LuDetails_3 = Sort order (for UI display sequencing)
 46:  */
 47: const luDetailsByCategory = {
 48:   'PARCEL_STATUS': [
 49:     { LuDetails: 'Pending',       LuDetails_1: 'PENDING',       LuDetails_2: 'Parcel created but label not printed',         LuDetails_3: '1' },
 50:     { LuDetails: 'Label Printed', LuDetails_1: 'LABEL_PRINTED', LuDetails_2: 'Label printed, waiting for AWB/dispatch',      LuDetails_3: '2' },
 51:     { LuDetails: 'AWB Linked',    LuDetails_1: 'AWB_LINKED',    LuDetails_2: 'AWB and QR linked together',                   LuDetails_3: '3' },
 52:     { LuDetails: 'Dispatched',    LuDetails_1: 'DISPATCHED',    LuDetails_2: 'Parcel out for delivery',                      LuDetails_3: '4' },
 53:     { LuDetails: 'Delivered',     LuDetails_1: 'DELIVERED',     LuDetails_2: 'Parcel delivered successfully',                LuDetails_3: '5' },
 54:     { LuDetails: 'Cancelled',     LuDetails_1: 'CANCELLED',     LuDetails_2: 'Parcel cancelled before dispatch',             LuDetails_3: '6' },
 55:     { LuDetails: 'Returned',      LuDetails_1: 'RETURNED',      LuDetails_2: 'Parcel returned after dispatch/delivery attempt', LuDetails_3: '7' }
 56:   ],
 57:   'NOTIFICATION_STATUS': [
 58:     { LuDetails: 'Not Sent', LuDetails_1: 'NOT_SENT', LuDetails_2: 'Notification queued but not yet sent',              LuDetails_3: '1' },
 59:     { LuDetails: 'Sent',     LuDetails_1: 'SENT',     LuDetails_2: 'Notification dispatched via channel successfully',  LuDetails_3: '2' },
 60:     { LuDetails: 'Failed',   LuDetails_1: 'FAILED',   LuDetails_2: 'Notification attempt failed',                       LuDetails_3: '3' }
 61:   ]
 62: };
 63: 
 64: /**
 65:  * Seeds simple tables (no FK dependencies).
 66:  * Uses duplicate-check to avoid re-inserting existing rows.
 67:  */
 68: const seedSimpleTables = async (connection) => {
 69:   for (const seed of simpleSeedData) {
 70:     console.log(`Seeding table: ${seed.table}`);
 71: 
 72:     const columnsFormatted = seed.columns.join(', ');
 73: 
 74:     for (const row of seed.data) {
 75:       const placeholders = row.map(() => '?').join(', ');
 76: 
 77:       // Check if row already exists by its duplicate-check column
 78:       const checkColIndex = seed.columns.indexOf(seed.duplicateCheckColumn);
 79:       const [existing] = await connection.query(
 80:         `SELECT 1 FROM ?? WHERE ?? = ? LIMIT 1`,
 81:         [seed.table, seed.duplicateCheckColumn, row[checkColIndex]]
 82:       );
 83: 
 84:       if (existing.length === 0) {
 85:         const sql = `INSERT INTO ${seed.table} (${columnsFormatted}) VALUES (${placeholders})`;
 86:         await connection.query(sql, row);
 87:         console.log(`  [+] Inserted: ${row[checkColIndex]}`);
 88:       } else {
 89:         console.log(`  [~] Skipped (already exists): ${row[checkColIndex]}`);
 90:       }
 91:     }
 92:   }
 93: };
 94: 
 95: /**
 96:  * Seeds the unified lu_master → lu_details lookup hierarchy.
 97:  *
 98:  * Flow:
 99:  * 1. Insert lu_master categories (if not already present).
100:  * 2. Resolve lu_master PKs by querying back.
101:  * 3. Insert lu_details entries with the resolved FKs.
102:  */
103: const seedLookupHierarchy = async (connection) => {
104:   console.log('Seeding table: lu_master (categories)');
105: 
106:   // Step 1: Insert lu_master categories
107:   for (const category of luMasterCategories) {
108:     const [existing] = await connection.query(
109:       `SELECT LuMasterId FROM lu_master WHERE LuMaster_1 = ? LIMIT 1`,
110:       [category.LuMaster_1]
111:     );
112: 
113:     if (existing.length === 0) {
114:       await connection.query(
115:         `INSERT INTO lu_master (LuMaster, LuMaster_1, LuMaster_2) VALUES (?, ?, ?)`,
116:         [category.LuMaster, category.LuMaster_1, category.LuMaster_2]
117:       );
118:       console.log(`  [+] Inserted category: ${category.LuMaster}`);
119:     } else {
120:       console.log(`  [~] Skipped category (already exists): ${category.LuMaster}`);
121:     }
122:   }
123: 
124:   // Step 2: Resolve lu_master PKs and seed lu_details
125:   console.log('Seeding table: lu_details (status values)');
126: 
127:   for (const [categoryCode, details] of Object.entries(luDetailsByCategory)) {
128:     // Look up the parent category ID
129:     const [categoryRows] = await connection.query(
130:       `SELECT LuMasterId FROM lu_master WHERE LuMaster_1 = ? LIMIT 1`,
131:       [categoryCode]
132:     );
133: 
134:     if (categoryRows.length === 0) {
135:       console.error(`  [!] FATAL: lu_master category '${categoryCode}' not found. Cannot seed lu_details.`);
136:       continue;
137:     }
138: 
139:     const luMasterId = categoryRows[0].LuMasterId;
140: 
141:     for (const detail of details) {
142:       // Duplicate check by code (LuDetails_1) within the same category
143:       const [existing] = await connection.query(
144:         `SELECT 1 FROM lu_details WHERE LuDetails_1 = ? AND LuMasterId = ? LIMIT 1`,
145:         [detail.LuDetails_1, luMasterId]
146:       );
147: 
148:       if (existing.length === 0) {
149:         await connection.query(
150:           `INSERT INTO lu_details (LuDetails, LuDetails_1, LuDetails_2, LuDetails_3, LuMasterId, IsActive) VALUES (?, ?, ?, ?, ?, 1)`,
151:           [detail.LuDetails, detail.LuDetails_1, detail.LuDetails_2, detail.LuDetails_3, luMasterId]
152:         );
153:         console.log(`  [+] Inserted: ${categoryCode} → ${detail.LuDetails_1}`);
154:       } else {
155:         console.log(`  [~] Skipped (already exists): ${categoryCode} → ${detail.LuDetails_1}`);
156:       }
157:     }
158:   }
159: };
160: 
161: // ============================================================================
162: // MAIN SEEDER RUNNER
163: // ============================================================================
164: export async function runAllSeeders() {
165:   console.log('--- Database Seeding Started ---');
166:   let connection;
167: 
168:   try {
169:     connection = await pool.getConnection();
170: 
171:     // Phase 1: Simple tables (no FK dependencies)
172:     await seedSimpleTables(connection);
173: 
174:     // Phase 2: Unified lookup hierarchy (lu_master → lu_details)
175:     await seedLookupHierarchy(connection);
176: 
177:     console.log('--- Database Seeding Completed Successfully ---');
178:   } catch (error) {
179:     console.error('Database seeding failed:', error);
180:     process.exit(1);
181:   } finally {
182:     if (connection) {
183:       connection.release();
184:     }
185:   }
186: }
187: 
188: // For running the script directly from package.json via `node src/infrastructure/database/seeders.js`
189: if (process.argv[1] && process.argv[1].endsWith('seeders.js')) {
190:   runAllSeeders().then(() => {
191:     // Release the main pool to let the script exit gracefully
192:     pool.end();
193:     process.exit(0);
194:   });
195: }
````

## File: src/interfaces/http/controllers/courier.controller.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/controllers/courier.controller.js
 3: // Description: HTTP controllers mapping to Courier service block.
 4: // Uses express-async-handler to automatically pass exceptions to the
 5: // global error handler (AGENTS.md §3D).
 6: // ============================================================================
 7: 
 8: import asyncHandler from 'express-async-handler';
 9: import courierService from '../../../modules/courier/courier.service.js';
10: 
11: // @desc    Get all courier partners
12: // @route   GET /api/v1/courier-partners
13: // @access  Private/Admin,Operator,Courier
14: export const getCouriers = asyncHandler(async (req, res) => {
15:   const page = Math.max(1, parseInt(req.query.page) || 1);
16:   const limit = Math.max(1, parseInt(req.query.limit) || 20);
17:   const search = req.query.search || '';
18: 
19:   const couriers = await courierService.getCouriers(page, limit, search);
20:   
21:   res.status(200).json({
22:     success: true,
23:     data: couriers.data,
24:     meta: {
25:       total: couriers.total,
26:       page,
27:       limit
28:     }
29:   });
30: });
31: 
32: // @desc    Get courier partner by ID
33: // @route   GET /api/v1/courier-partners/:id
34: // @access  Private/Admin,Operator,Courier
35: export const getCourierById = asyncHandler(async (req, res) => {
36:   const courier = await courierService.getCourierById(req.params.id);
37:   
38:   res.status(200).json({
39:     success: true,
40:     data: courier
41:   });
42: });
43: 
44: // @desc    Create new courier partner
45: // @route   POST /api/v1/courier-partners
46: // @access  Private/Admin,Operator
47: export const createCourier = asyncHandler(async (req, res) => {
48:   const courier = await courierService.createCourier(req.body);
49:   
50:   res.status(201).json({
51:     success: true,
52:     data: courier
53:   });
54: });
55: 
56: // @desc    Update courier partner
57: // @route   PUT /api/v1/courier-partners/:id
58: // @access  Private/Admin,Operator
59: export const updateCourier = asyncHandler(async (req, res) => {
60:   const courier = await courierService.updateCourier(req.params.id, req.body);
61:   
62:   res.status(200).json({
63:     success: true,
64:     data: courier
65:   });
66: });
67: 
68: // @desc    Delete courier partner
69: // @route   DELETE /api/v1/courier-partners/:id
70: // @access  Private/Admin,Operator
71: export const deleteCourier = asyncHandler(async (req, res) => {
72:   await courierService.deleteCourier(req.params.id);
73:   
74:   res.status(200).json({
75:     success: true,
76:     message: 'Courier partner successfully removed'
77:   });
78: });
````

## File: src/interfaces/http/controllers/employee.controller.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/controllers/employee.controller.js
 3: // Description: HTTP controllers for Employee Management endpoints.
 4: // Formats API responses to match the `{ success: true, data: { ... } }` contract.
 5: // Uses express-async-handler to automatically pass exceptions to the
 6: // global error handler (AGENTS.md §3D).
 7: // ============================================================================
 8: 
 9: import asyncHandler from 'express-async-handler';
10: import employeeService from '../../../modules/employee/employee.service.js';
11: 
12: // @desc    Get all employees (paginated)
13: // @route   GET /api/v1/employees
14: // @access  Private/Admin
15: export const getEmployees = asyncHandler(async (req, res) => {
16:   const result = await employeeService.getEmployees(req.query);
17:   res.json({
18:     success: true,
19:     data: result.data,
20:     meta: result.meta
21:   });
22: });
23: 
24: // @desc    Get employee by ID
25: // @route   GET /api/v1/employees/:id
26: // @access  Private/Admin
27: export const getEmployeeById = asyncHandler(async (req, res) => {
28:   const employee = await employeeService.getEmployeeById(req.params.id);
29:   res.json({
30:     success: true,
31:     data: employee
32:   });
33: });
34: 
35: // @desc    Create a new employee
36: // @route   POST /api/v1/employees
37: // @access  Private/Admin
38: export const createEmployee = asyncHandler(async (req, res) => {
39:   const newEmployee = await employeeService.createEmployee(req.body);
40:   res.status(201).json({
41:     success: true,
42:     data: newEmployee
43:   });
44: });
45: 
46: // @desc    Update employee details
47: // @route   PUT /api/v1/employees/:id
48: // @access  Private/Admin
49: export const updateEmployee = asyncHandler(async (req, res) => {
50:   const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
51:   res.json({
52:     success: true,
53:     data: updatedEmployee
54:   });
55: });
56: 
57: // @desc    Toggle employee login access
58: // @route   PATCH /api/v1/employees/:id/toggle-access
59: // @access  Private/Admin
60: export const toggleAccess = asyncHandler(async (req, res) => {
61:   const { allowLogin } = req.body;
62:   
63:   if (allowLogin === undefined) {
64:     const error = new Error('allowLogin boolean is required');
65:     error.statusCode = 400;
66:     throw error;
67:   }
68: 
69:   // Pass the calling user's ID to prevent self-lockout
70:   const adminId = req.user.id; 
71:   const employeeIdToToggle = req.params.id;
72: 
73:   const updatedEmployee = await employeeService.toggleAccess(adminId, employeeIdToToggle, allowLogin);
74:   res.json({
75:     success: true,
76:     data: updatedEmployee
77:   });
78: });
````

## File: src/interfaces/http/controllers/order.controller.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/controllers/order.controller.js
 3: // Description: Express route handlers for Order module endpoints.
 4: // Uses express-async-handler to automatically pass exceptions to the
 5: // global error handler (AGENTS.md §3D).
 6: // All responses use the standard envelope: { success, data?, error? }
 7: // ============================================================================
 8: 
 9: import asyncHandler from 'express-async-handler';
10: import orderService from '../../../modules/order/order.service.js';
11: 
12: /**
13:  * POST /api/v1/orders
14:  * Creates a complex order (sender → order → receivers → items → parcels).
15:  * Maps to: prc_CreateComplexOrder
16:  */
17: export const createOrder = asyncHandler(async (req, res) => {
18:   const result = await orderService.createOrder(req.body, req.user);
19:   res.status(201).json({ success: true, data: result });
20: });
21: 
22: /**
23:  * GET /api/v1/orders
24:  * Lists all orders with derived statuses, paginated.
25:  * Maps to: prc_GetAllOrdersSummary
26:  */
27: export const getOrderList = asyncHandler(async (req, res) => {
28:   const filters = {
29:     page: parseInt(req.query.page) || 1,
30:     limit: parseInt(req.query.limit) || 20,
31:     search: req.query.search || null,
32:     sortBy: req.query.sortBy || 'created_at',
33:     sortOrder: req.query.sortOrder || 'desc'
34:   };
35: 
36:   const { data, total } = await orderService.getOrderSummaryList(filters);
37: 
38:   res.json({
39:     success: true,
40:     data,
41:     meta: {
42:       page: filters.page,
43:       limit: filters.limit,
44:       totalRows: total,
45:       totalPages: Math.ceil(total / filters.limit)
46:     }
47:   });
48: });
49: 
50: /**
51:  * GET /api/v1/orders/:id
52:  * Gets full order aggregate (nested JSON: Order → Receivers → [Items, Parcel]).
53:  * Maps to: prc_GetOrderAggregate
54:  */
55: export const getOrderById = asyncHandler(async (req, res) => {
56:   const orderDetails = await orderService.getOrderDetails(req.params.id);
57:   res.json({ success: true, data: orderDetails });
58: });
59: 
60: /**
61:  * PUT /api/v1/orders/:id
62:  * Updates an existing order (before dispatch threshold).
63:  * Maps to: prc_UpdateComplexOrder
64:  * ❗ Fails if any parcel status ≥ AWB_LINKED
65:  */
66: export const updateOrder = asyncHandler(async (req, res) => {
67:   const result = await orderService.updateOrder(req.params.id, req.body);
68:   res.json({ success: true, data: result });
69: });
70: 
71: /**
72:  * PATCH /api/v1/orders/:id/cancel
73:  * Cancels entire order and cascades to all parcels.
74:  * Maps to: prc_CancelOrder
75:  * ❌ Cannot cancel if any parcel is DISPATCHED or DELIVERED
76:  */
77: export const cancelOrder = asyncHandler(async (req, res) => {
78:   const result = await orderService.cancelOrder(req.params.id, req.user);
79:   res.json({ success: true, data: result });
80: });
````

## File: src/interfaces/http/routes/auth.routes.js
````javascript
 1: import express from 'express';
 2: import { login, getUserProfile } from '../controllers/auth.controller.js';
 3: import { protect } from '../../../shared/middleware/auth.middleware.js';
 4: import { validate } from '../../../shared/middleware/validate.middleware.js';
 5: import { loginSchema } from '../validations/validation.schemas.js';
 6: 
 7: const router = express.Router();
 8: 
 9: // Public Routes
10: router.post('/login', validate(loginSchema), login);
11: 
12: // Protected Routes (Require Token)
13: // Notice how we put the 'protect' middleware before the controller function
14: router.get('/profile', protect, getUserProfile);
15: 
16: export default router;
````

## File: src/interfaces/http/routes/courier.routes.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/routes/courier.routes.js
 3: // Description: Routing and RBAC mapping for Courier Partner endpoints.
 4: // ============================================================================
 5: 
 6: import express from 'express';
 7: import {
 8:   getCouriers,
 9:   getCourierById,
10:   createCourier,
11:   updateCourier,
12:   deleteCourier
13: } from '../controllers/courier.controller.js';
14: import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
15: import { validate } from '../../../shared/middleware/validate.middleware.js';
16: import { createCourierSchema, updateCourierSchema } from '../validations/validation.schemas.js';
17: 
18: const router = express.Router();
19: 
20: // All routes require authentication
21: router.use(protect);
22: 
23: // GET routes are accessible by ADMIN, OPERATOR, AND COURIER
24: router.route('/')
25:   .get(authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getCouriers)
26:   // POST requires ADMIN or OPERATOR
27:   .post(authorizeRoles('ADMIN', 'OPERATOR'), validate(createCourierSchema), createCourier);
28: 
29: router.route('/:id')
30:   .get(authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getCourierById)
31:   // PUT and DELETE require ADMIN or OPERATOR
32:   .put(authorizeRoles('ADMIN', 'OPERATOR'), validate(updateCourierSchema), updateCourier)
33:   .delete(authorizeRoles('ADMIN', 'OPERATOR'), deleteCourier);
34: 
35: export default router;
````

## File: src/interfaces/http/routes/employee.routes.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/routes/employee.routes.js
 3: // Description: Express routes for Employee Management.
 4: // Maps endpoints to controllers and enforces role-based access.
 5: // ============================================================================
 6: 
 7: import express from 'express';
 8: import {
 9:   getEmployees,
10:   getEmployeeById,
11:   createEmployee,
12:   updateEmployee,
13:   toggleAccess
14: } from '../controllers/employee.controller.js';
15: import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
16: import { validate } from '../../../shared/middleware/validate.middleware.js';
17: import { createEmployeeSchema, updateEmployeeSchema, toggleAccessSchema } from '../validations/validation.schemas.js';
18: 
19: const router = express.Router();
20: 
21: // ALL endpoints in the Employee Management module require ADMIN access
22: // See API Contract: "3. Employee Management > Access: ADMIN only for all endpoints"
23: router.use(protect);
24: router.use(authorizeRoles('ADMIN'));
25: 
26: router.route('/')
27:   .get(getEmployees)
28:   .post(validate(createEmployeeSchema), createEmployee);
29: 
30: router.route('/:id')
31:   .get(getEmployeeById)
32:   .put(validate(updateEmployeeSchema), updateEmployee);
33: 
34: router.patch('/:id/toggle-access', validate(toggleAccessSchema), toggleAccess);
35: 
36: export default router;
````

## File: src/interfaces/http/routes/notification.routes.js
````javascript
 1: // ============================================================================
 2: // File: src/interfaces/http/routes/notification.routes.js
 3: // Description: Route definitions for Notification module.
 4: // Applies authentication, RBAC, and Zod validation.
 5: // ============================================================================
 6: 
 7: import express from 'express';
 8: import {
 9:   send,
10:   resend,
11:   getHistory,
12:   webhook
13: } from '../controllers/notification.controller.js';
14: import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
15: import { validate } from '../../../shared/middleware/validate.middleware.js';
16: import {
17:   sendNotificationSchema,
18:   resendNotificationSchema,
19:   getHistorySchema,
20:   webhookSchema
21: } from '../validations/notification.validation.js';
22: 
23: const router = express.Router();
24: 
25: // --- Public Routes ---
26: /**
27:  * @route   POST /api/v1/notifications/webhook
28:  * @desc    Webhook callback for delivery status
29:  */
30: router.post('/notifications/webhook', validate(webhookSchema), webhook);
31: 
32: // --- Protected Routes (Admin, Operator) ---
33: // ⚠️ We apply protect + authorizeRoles per-route (not blanket router.use)
34: //    to prevent this router from intercepting unmatched /api/v1/* paths
35: //    and blocking the notFound middleware from returning 404.
36: 
37: /**
38:  * @route   POST /api/v1/parcels/:id/notify
39:  * @desc    Send dispatch notification to receiver
40:  */
41: router.post('/parcels/:id/notify', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(sendNotificationSchema), send);
42: 
43: /**
44:  * @route   POST /api/v1/notifications/:id/resend
45:  * @desc    Resend a failed notification
46:  */
47: router.post('/notifications/:id/resend', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(resendNotificationSchema), resend);
48: 
49: /**
50:  * @route   GET /api/v1/parcels/:id/notifications
51:  * @desc    Get notification history for a parcel
52:  */
53: router.get('/parcels/:id/notifications', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(getHistorySchema), getHistory);
54: 
55: export default router;
````

## File: src/interfaces/http/routes/order.routes.js
````javascript
 1: import express from 'express';
 2: import { createOrder, getOrderList, getOrderById, updateOrder, cancelOrder } from '../controllers/order.controller.js';
 3: import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
 4: import { validate } from '../../../shared/middleware/validate.middleware.js';
 5: import { createOrderSchema, updateOrderSchema } from '../validations/validation.schemas.js';
 6: 
 7: const router = express.Router();
 8: 
 9: // ============================================================================
10: // Order Management Routes — API Contract §7
11: // ============================================================================
12: 
13: // POST   /api/v1/orders           → Create complex order (ADMIN, OPERATOR)
14: router.post('/', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(createOrderSchema), createOrder);
15: 
16: // GET    /api/v1/orders           → List orders with derived status (ALL roles)
17: router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getOrderList);
18: 
19: // GET    /api/v1/orders/:id       → Get full order aggregate (ADMIN, OPERATOR)
20: router.get('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR'), getOrderById);
21: 
22: // PUT    /api/v1/orders/:id       → Update order before dispatch (ADMIN, OPERATOR)
23: router.put('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(updateOrderSchema), updateOrder);
24: 
25: // PATCH  /api/v1/orders/:id/cancel → Cancel entire order (ADMIN, OPERATOR)
26: router.patch('/:id/cancel', protect, authorizeRoles('ADMIN', 'OPERATOR'), cancelOrder);
27: 
28: export default router;
````

## File: src/interfaces/http/validations/validation.schemas.js
````javascript
  1: // ============================================================================
  2: // File: src/interfaces/http/validations/validation.schemas.js
  3: // Description: Zod validation schemas for all modules payload validation.
  4: // ============================================================================
  5: 
  6: import { z } from 'zod';
  7: 
  8: // ----------------------------------------------------------------------------
  9: // AUTH SCHEMAS
 10: // ----------------------------------------------------------------------------
 11: export const loginSchema = z.object({
 12:   email: z.string().email('Invalid email format').optional(),
 13:   employeeCode: z.string().min(1, 'EmployeeCode or Email is required').optional(),
 14:   password: z.string().min(1, 'Password is required')
 15: });
 16: 
 17: // ----------------------------------------------------------------------------
 18: // EMPLOYEE SCHEMAS
 19: // ----------------------------------------------------------------------------
 20: export const createEmployeeSchema = z.object({
 21:   employeeCode: z.string().optional(),
 22:   employeeName: z.string().min(1, 'Employee name is required'),
 23:   email: z.string().email().optional(),
 24:   phoneNo: z.string().optional(),
 25:   roleCode: z.enum(['ADMIN', 'OPERATOR', 'COURIER']),
 26:   password: z.string().min(6, 'Password must be at least 6 characters').optional(),
 27:   isActive: z.boolean().optional()
 28: });
 29: 
 30: export const updateEmployeeSchema = createEmployeeSchema.partial();
 31: 
 32: export const toggleAccessSchema = z.object({
 33:   allowLogin: z.boolean({ required_error: 'allowLogin boolean is required' })
 34: });
 35: 
 36: // ----------------------------------------------------------------------------
 37: // COURIER SCHEMAS
 38: // ----------------------------------------------------------------------------
 39: export const createCourierSchema = z.object({
 40:   courierName: z.string().min(1, 'Courier name is required'),
 41:   contactPerson: z.string().optional(),
 42:   phoneNo: z.string().optional(),
 43:   email: z.string().email().optional(),
 44:   trackingUrlTemplate: z.string().url().optional()
 45: });
 46: 
 47: export const updateCourierSchema = createCourierSchema.partial();
 48: 
 49: // ----------------------------------------------------------------------------
 50: // PRODUCT SCHEMAS
 51: // ----------------------------------------------------------------------------
 52: export const createProductSchema = z.object({
 53:   productName: z.string().min(1, 'Product name is required'),
 54:   description: z.string().optional(),
 55:   materialRate: z.number().nonnegative().optional()
 56: });
 57: 
 58: export const updateProductSchema = z.object({
 59:   productName: z.string().min(1, 'Product name is required').optional(),
 60:   description: z.string().optional(),
 61:   materialRate: z.number().nonnegative().optional(),
 62:   isActive: z.boolean().optional()
 63: });
 64: 
 65: // ----------------------------------------------------------------------------
 66: // ORDER SCHEMAS
 67: // ----------------------------------------------------------------------------
 68: export const createOrderSchema = z.object({
 69:   senderName: z.string().min(1, 'Sender name is required'),
 70:   senderMobile: z.string().min(1, 'Sender mobile is required'),
 71:   senderAddress: z.string().optional(),
 72:   courierId: z.number().int().positive('Valid courier ID is required'),
 73:   receivers: z.array(
 74:     z.object({
 75:       receiverName: z.string().min(1, 'Receiver name is required'),
 76:       receiverPhone: z.string().optional(),
 77:       addressLine1: z.string().optional(),
 78:       addressLine2: z.string().optional(),
 79:       city: z.string().optional(),
 80:       state: z.string().optional(),
 81:       pincode: z.string().optional(),
 82:       products: z.array(
 83:         z.object({
 84:           productId: z.number().int().positive('Valid product ID is required'),
 85:           qty: z.number().int().positive('Quantity must be positive'),
 86:           unitPrice: z.number().nonnegative().nullable().optional()
 87:         })
 88:       ).min(1, 'At least one product is required for each receiver')
 89:     })
 90:   ).min(1, 'At least one receiver is required')
 91: });
 92: 
 93: export const updateOrderSchema = createOrderSchema.partial();
 94: 
 95: // ----------------------------------------------------------------------------
 96: // SENDER (PARTY) SCHEMAS
 97: // ----------------------------------------------------------------------------
 98: export const createSenderSchema = z.object({
 99:   customerName: z.string().min(1, 'Customer name is required'),
100:   phoneNo: z.string().min(10, 'Valid phone number is required'),
101:   emailId: z.string().email('Invalid email format').optional().nullable(),
102:   addressLine1: z.string().min(1, 'Address Line 1 is required'),
103:   addressLine2: z.string().optional().nullable(),
104:   city: z.string().min(1, 'City is required'),
105:   state: z.string().min(1, 'State is required'),
106:   pincode: z.string().min(1, 'Pincode is required')
107: });
108: 
109: export const updateSenderSchema = createSenderSchema.partial();
````

## File: src/modules/bulk-upload/bulk-upload.repository.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/bulk-upload/bulk-upload.repository.js
  3: // Description: Data access layer for Bulk Upload module.
  4: // Documents and executes `CALL prc_...` stored procedures.
  5: //
  6: // Dual-Mode: Controlled by USE_MOCK_DB environment variable.
  7: //   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
  8: //   - USE_MOCK_DB=false → Live MySQL stored procedures
  9: //
 10: // SP Convention:
 11: //   - prc_bulk_order_upload_log_set / prc_bulk_order_upload_log_get
 12: //   - prc_bulk_order_upload_detail_set / prc_bulk_order_upload_detail_get
 13: // ============================================================================
 14: 
 15: import db from '../../infrastructure/database/db.js';
 16: 
 17: // ============================================================================
 18: // MOCK MODE: In-Memory Seed Data
 19: // ============================================================================
 20: let mockSessions = [
 21:   {
 22:     PkBulkUploadId: 1,
 23:     FileName: 'sample_orders.xlsx',
 24:     TotalRows: 5,
 25:     SuccessCount: 4,
 26:     ErrorCount: 1,
 27:     Status: 'COMPLETED',
 28:     CreatedBy: 'admin@example.com',
 29:     CreatedDate: '2026-04-10T10:00:00Z'
 30:   }
 31: ];
 32: 
 33: let mockDetails = [
 34:   { PkDetailId: 1, FkBulkUploadId: 1, RowNumber: 1, Status: 'Success', ResponseJson: '{"orderId":1}' },
 35:   { PkDetailId: 2, FkBulkUploadId: 1, RowNumber: 2, Status: 'Success', ResponseJson: '{"orderId":2}' },
 36:   { PkDetailId: 3, FkBulkUploadId: 1, RowNumber: 3, Status: 'Error', ResponseJson: '{"error":"Invalid sender"}' }
 37: ];
 38: 
 39: class BulkUploadRepository {
 40:   /**
 41:    * Create a bulk upload session log.
 42:    * Procedure: CALL prc_bulk_order_upload_log_set(?, ?, ?, ?)
 43:    * 
 44:    * @param {number} pkId - 0 for insert.
 45:    * @param {string} fileName - Name of the uploaded file.
 46:    * @param {number} totalRows - Total orders in the file.
 47:    * @param {string} createdBy - EmployeeCode of the uploader.
 48:    * @returns {Promise<object>} The created log record.
 49:    */
 50:   async createSession(pkId, fileName, totalRows, createdBy) {
 51:     // ------------------------------------------------------------------
 52:     // LIVE DB MODE: prc_bulk_order_upload_log_set
 53:     // ------------------------------------------------------------------
 54:     if (process.env.USE_MOCK_DB !== 'true') {
 55:       const [rows] = await db.execute('CALL prc_bulk_order_upload_log_set(?, ?, ?, ?)', [
 56:         pkId,
 57:         fileName,
 58:         totalRows,
 59:         createdBy
 60:       ]);
 61:       return rows[0][0];
 62:     }
 63: 
 64:     // ------------------------------------------------------------------
 65:     // MOCK MODE: In-memory session creation
 66:     // ------------------------------------------------------------------
 67:     const newId = mockSessions.length > 0 ? Math.max(...mockSessions.map(s => s.PkBulkUploadId)) + 1 : 1;
 68:     const session = {
 69:       PkBulkUploadId: newId,
 70:       FileName: fileName,
 71:       TotalRows: totalRows,
 72:       SuccessCount: 0,
 73:       ErrorCount: 0,
 74:       Status: 'PROCESSING',
 75:       CreatedBy: createdBy,
 76:       CreatedDate: new Date().toISOString()
 77:     };
 78:     mockSessions.push(session);
 79:     return session;
 80:   }
 81: 
 82:   /**
 83:    * Log the status of an individual row (order) in a bulk upload session.
 84:    * Procedure: CALL prc_bulk_order_upload_detail_set(?, ?, ?, ?, ?)
 85:    * 
 86:    * @param {number} pkId - 0 for insert.
 87:    * @param {number} sessionId - FK to bulk_order_upload_log.
 88:    * @param {number} rowNumber - Excel row number.
 89:    * @param {string} status - Result (Success/Error).
 90:    * @param {string} responseJson - JSON string of the order create response or error.
 91:    * @returns {Promise<object>} The created detail record.
 92:    */
 93:   async logRowDetail(pkId, sessionId, rowNumber, status, responseJson) {
 94:     // ------------------------------------------------------------------
 95:     // LIVE DB MODE: prc_bulk_order_upload_detail_set
 96:     // ------------------------------------------------------------------
 97:     if (process.env.USE_MOCK_DB !== 'true') {
 98:       const [rows] = await db.execute('CALL prc_bulk_order_upload_detail_set(?, ?, ?, ?, ?)', [
 99:         pkId,
100:         sessionId,
101:         rowNumber,
102:         status,
103:         responseJson
104:       ]);
105:       return rows[0][0];
106:     }
107: 
108:     // ------------------------------------------------------------------
109:     // MOCK MODE: In-memory detail logging
110:     // ------------------------------------------------------------------
111:     const newId = mockDetails.length > 0 ? Math.max(...mockDetails.map(d => d.PkDetailId)) + 1 : 1;
112:     const detail = {
113:       PkDetailId: newId,
114:       FkBulkUploadId: sessionId,
115:       RowNumber: rowNumber,
116:       Status: status,
117:       ResponseJson: responseJson
118:     };
119:     mockDetails.push(detail);
120:     return detail;
121:   }
122: 
123:   /**
124:    * Get bulk upload sessions.
125:    * Procedure: CALL prc_bulk_order_upload_log_get(?, ?)
126:    * 
127:    * @param {number} pAction - 0: Get all, 1: Get by ID.
128:    * @param {number|null} pId - Session ID if pAction=1.
129:    * @returns {Promise<Array|object>} List of sessions or a single session record.
130:    */
131:   async getSessions(pAction, pId = null) {
132:     // ------------------------------------------------------------------
133:     // LIVE DB MODE: prc_bulk_order_upload_log_get
134:     // ------------------------------------------------------------------
135:     if (process.env.USE_MOCK_DB !== 'true') {
136:       const [rows] = await db.execute('CALL prc_bulk_order_upload_log_get(?, ?)', [
137:         pAction,
138:         pId
139:       ]);
140:       return pAction === 1 ? rows[0][0] : rows[0];
141:     }
142: 
143:     // ------------------------------------------------------------------
144:     // MOCK MODE: In-memory session retrieval
145:     // ------------------------------------------------------------------
146:     if (pAction === 1) {
147:       return mockSessions.find(s => s.PkBulkUploadId === parseInt(pId)) || null;
148:     }
149:     return mockSessions;
150:   }
151: 
152:   /**
153:    * Get individual row details for a bulk upload session.
154:    * Procedure: CALL prc_bulk_order_upload_detail_get(?, ?)
155:    * 
156:    * @param {number} pAction - 0: Get by Session ID.
157:    * @param {number} sessionId - The session ID.
158:    * @returns {Promise<Array>} List of row details.
159:    */
160:   async getSessionDetails(pAction, sessionId) {
161:     // ------------------------------------------------------------------
162:     // LIVE DB MODE: prc_bulk_order_upload_detail_get
163:     // ------------------------------------------------------------------
164:     if (process.env.USE_MOCK_DB !== 'true') {
165:       const [rows] = await db.execute('CALL prc_bulk_order_upload_detail_get(?, ?)', [
166:         pAction,
167:         sessionId
168:       ]);
169:       return rows[0];
170:     }
171: 
172:     // ------------------------------------------------------------------
173:     // MOCK MODE: In-memory detail retrieval
174:     // ------------------------------------------------------------------
175:     return mockDetails.filter(d => d.FkBulkUploadId === parseInt(sessionId));
176:   }
177: }
178: 
179: export default new BulkUploadRepository();
````

## File: src/modules/bulk-upload/bulk-upload.service.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/bulk-upload/bulk-upload.service.js
  3: // Description: Business logic layer for Bulk Upload module.
  4: // Orchestrates session logging and iteration over order creation.
  5: // ============================================================================
  6: 
  7: import bulkUploadRepository from './bulk-upload.repository.js';
  8: import orderService from '../order/order.service.js';
  9: 
 10: class BulkUploadService {
 11:   /**
 12:    * Internal mapper for bulk upload session
 13:    */
 14:   _mapSession(session) {
 15:     if (!session) return null;
 16:     return {
 17:       id: session.PkBulkUploadId || session.id,
 18:       fileName: session.FileName || session.fileName,
 19:       totalRows: session.TotalRows || session.totalRows,
 20:       successCount: session.SuccessCount !== undefined ? session.SuccessCount : session.successCount,
 21:       errorCount: session.ErrorCount !== undefined ? session.ErrorCount : session.errorCount,
 22:       status: session.Status || session.status,
 23:       createdBy: session.CreatedBy || session.createdBy,
 24:       createdAt: session.CreatedDate || session.createdDate || session.createdAt
 25:     };
 26:   }
 27: 
 28:   /**
 29:    * Internal mapper for bulk upload row detail
 30:    */
 31:   _mapDetail(detail) {
 32:     if (!detail) return null;
 33:     
 34:     let responseJson = null;
 35:     const rawJson = detail.ResponseJson || detail.responseJson;
 36:     try {
 37:       responseJson = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;
 38:     } catch (e) {
 39:       responseJson = rawJson;
 40:     }
 41:     
 42:     return {
 43:       id: detail.PkDetailId || detail.id,
 44:       bulkUploadId: detail.FkBulkUploadId || detail.bulkUploadId,
 45:       rowNumber: detail.RowNumber || detail.rowNumber,
 46:       status: detail.Status || detail.status,
 47:       responseJson
 48:     };
 49:   }
 50: 
 51:   /**
 52:    * Process a list of orders from a bulk upload.
 53:    * 
 54:    * @param {Array} rows - Array of order objects.
 55:    * @param {object} user - Authenticated user.
 56:    * @param {string} fileName - Optional filename if provided by client.
 57:    * @returns {object} The created session ID and execution summary.
 58:    */
 59:   async processBulkUpload(rows, user, fileName = 'bulk_upload.json') {
 60:     const createdBy = user?.employeeCode || 'SYSTEM';
 61:     const totalRows = rows.length;
 62: 
 63:     // 1. Initialize Session
 64:     const session = await bulkUploadRepository.createSession(0, fileName, totalRows, createdBy);
 65:     const sessionId = session.PkBulkUploadId || session.id;
 66: 
 67:     const results = {
 68:       sessionId,
 69:       total: totalRows,
 70:       processed: 0,
 71:       success: 0,
 72:       errors: 0
 73:     };
 74: 
 75:     // 2. Iterate and Process Rows
 76:     for (let i = 0; i < rows.length; i++) {
 77:       const rowData = rows[i];
 78:       const rowNumber = i + 1;
 79:       let status = 'SUCCESS';
 80:       let responseJson = '';
 81: 
 82:       try {
 83:         const orderResult = await orderService.createOrder(rowData, user);
 84:         responseJson = JSON.stringify(orderResult);
 85:         results.success++;
 86:       } catch (error) {
 87:         status = 'ERROR';
 88:         responseJson = JSON.stringify({
 89:           error: error.message,
 90:           data: error.data || null
 91:         });
 92:         results.errors++;
 93:       }
 94: 
 95:       // 3. Log row-level execution status
 96:       await bulkUploadRepository.logRowDetail(0, sessionId, rowNumber, status, responseJson);
 97:       results.processed++;
 98:     }
 99: 
100:     return results;
101:   }
102: 
103:   /**
104:    * Get all bulk upload sessions.
105:    * @returns {Array}
106:    */
107:   async getSessions() {
108:     const sessions = await bulkUploadRepository.getSessions(0);
109:     return sessions.map(s => this._mapSession(s));
110:   }
111: 
112:   /**
113:    * Get a specific session with its processed row details.
114:    * @param {number} id - Session ID.
115:    * @returns {object} { session, details }
116:    */
117:   async getSessionWithDetails(id) {
118:     const session = await bulkUploadRepository.getSessions(1, id);
119:     if (!session) {
120:       const error = new Error('Upload session not found');
121:       error.statusCode = 404;
122:       throw error;
123:     }
124: 
125:     const details = await bulkUploadRepository.getSessionDetails(0, id);
126:     
127:     return {
128:       session: this._mapSession(session),
129:       details: details.map(d => this._mapDetail(d))
130:     };
131:   }
132: }
133: 
134: export default new BulkUploadService();
````

## File: src/modules/courier/courier.repository.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/courier/courier.repository.js
  3: // Description: Data access layer for Courier Partners.
  4: //
  5: // Dual-Mode: Controlled by USE_MOCK_DB environment variable.
  6: //   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
  7: //   - USE_MOCK_DB=false → Live MySQL stored procedures
  8: //
  9: // SP Convention (api_procedure_spec_v1.md):
 10: //   - Reads:   prc_courier_partner_master_get (pAction=0 list, pAction=1 specific)
 11: //   - Upserts: prc_courier_partner_master_set (CourierId=0 insert, >0 update, IsActive=0 delete)
 12: // ============================================================================
 13: 
 14: import db from '../../infrastructure/database/db.js';
 15: 
 16: // ============================================================================
 17: // MOCK MODE: In-Memory Seed Data
 18: // Used when USE_MOCK_DB=true for frontend development without a live database.
 19: // ============================================================================
 20: let seedCouriers = [];
 21: 
 22: const initializeSeedData = () => {
 23:   seedCouriers = [
 24:     {
 25:       CourierId: 1,
 26:       CourierName: 'Delhivery',
 27:       TrackingUrlTemplate: 'https://delhivery.com/track/{AWB}',
 28:       IsActive: true,
 29:       CreatedDate: new Date().toISOString()
 30:     },
 31:     {
 32:       CourierId: 2,
 33:       CourierName: 'BlueDart',
 34:       TrackingUrlTemplate: 'https://bluedart.com/track/{AWB}',
 35:       IsActive: true,
 36:       CreatedDate: new Date().toISOString()
 37:     }
 38:   ];
 39: };
 40: 
 41: initializeSeedData();
 42: 
 43: class CourierRepository {
 44:   /**
 45:    * Fetches a paginated list of courier partners with optional search.
 46:    * Procedure: CALL prc_courier_partner_master_get(?, ?, ?, ?)
 47:    * Convention: pAction=0 → paginated list.
 48:    *
 49:    * @param {number} page - Page number.
 50:    * @param {number} limit - Results per page.
 51:    * @param {string} search - Optional search term.
 52:    * @returns {Promise<object>} { data: [...], total: number }
 53:    */
 54:   async findAll(page = 1, limit = 20, search = '') {
 55:     // ------------------------------------------------------------------
 56:     // LIVE DB MODE: prc_courier_partner_master_get (pAction=0)
 57:     // ------------------------------------------------------------------
 58:     if (process.env.USE_MOCK_DB !== 'true') {
 59:       const [rows] = await db.execute('CALL prc_courier_partner_master_get(?, ?, ?, ?)', [
 60:         0, // pAction=0 → Get all couriers (paginated)
 61:         page,
 62:         limit,
 63:         search || null
 64:       ]);
 65:       return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
 66:     }
 67: 
 68:     // ------------------------------------------------------------------
 69:     // MOCK MODE: In-memory filtering
 70:     // ------------------------------------------------------------------
 71:     const activeCouriers = seedCouriers.filter(c => c.IsActive);
 72:     let filtered = activeCouriers;
 73: 
 74:     if (search) {
 75:       filtered = filtered.filter(c =>
 76:         c.CourierName.toLowerCase().includes(search.toLowerCase())
 77:       );
 78:     }
 79: 
 80:     return {
 81:       data: filtered,
 82:       total: filtered.length
 83:     };
 84:   }
 85: 
 86:   /**
 87:    * Fetches a courier partner by ID.
 88:    * Procedure: CALL prc_courier_partner_master_get(?, ?)
 89:    * Convention: pAction=1 → specific record.
 90:    *
 91:    * @param {number|string} id - CourierId.
 92:    * @returns {Promise<object|null>} Courier record or null.
 93:    */
 94:   async findById(id) {
 95:     // ------------------------------------------------------------------
 96:     // LIVE DB MODE: prc_courier_partner_master_get (pAction=1)
 97:     // ------------------------------------------------------------------
 98:     if (process.env.USE_MOCK_DB !== 'true') {
 99:       const [rows] = await db.execute('CALL prc_courier_partner_master_get(?, ?)', [1, id]);
100:       return rows[0]?.[0] || null;
101:     }
102: 
103:     // ------------------------------------------------------------------
104:     // MOCK MODE: In-memory lookup by CourierId
105:     // ------------------------------------------------------------------
106:     const courier = seedCouriers.find((c) => c.CourierId.toString() === id.toString() && c.IsActive);
107:     return courier || null;
108:   }
109: 
110:   /**
111:    * Creates a new courier partner.
112:    * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?)
113:    * Convention: CourierId=0 triggers insert. No pAction on _set calls.
114:    *
115:    * @param {object} courierData - { courierName, trackingUrlTemplate }
116:    * @returns {Promise<object>} The newly created courier record.
117:    */
118:   async create(courierData) {
119:     // ------------------------------------------------------------------
120:     // LIVE DB MODE: prc_courier_partner_master_set (CourierId=0 → Insert)
121:     // ------------------------------------------------------------------
122:     if (process.env.USE_MOCK_DB !== 'true') {
123:       const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?)', [
124:         0, // CourierId=0 → Insert new courier
125:         courierData.courierName,
126:         courierData.trackingUrlTemplate,
127:         1  // IsActive=1
128:       ]);
129:       return rows[0]?.[0];
130:     }
131: 
132:     // ------------------------------------------------------------------
133:     // MOCK MODE: In-memory push
134:     // ------------------------------------------------------------------
135:     const newId = seedCouriers.length > 0 ? Math.max(...seedCouriers.map(c => c.CourierId)) + 1 : 1;
136:     const newCourier = {
137:       CourierId: newId,
138:       CourierName: courierData.courierName,
139:       TrackingUrlTemplate: courierData.trackingUrlTemplate,
140:       IsActive: true,
141:       CreatedDate: new Date().toISOString()
142:     };
143: 
144:     seedCouriers.push(newCourier);
145:     return newCourier;
146:   }
147: 
148:   /**
149:    * Updates an existing courier partner.
150:    * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?)
151:    * Convention: CourierId>0 triggers update. No pAction on _set calls.
152:    *
153:    * @param {number|string} id - CourierId.
154:    * @param {object} updates - Fields to update.
155:    * @returns {Promise<object|null>} Updated courier record or null.
156:    */
157:   async update(id, updates) {
158:     // ------------------------------------------------------------------
159:     // LIVE DB MODE: prc_courier_partner_master_set (CourierId>0 → Update)
160:     // ------------------------------------------------------------------
161:     if (process.env.USE_MOCK_DB !== 'true') {
162:       const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?)', [
163:         id, // CourierId>0 → Update existing courier
164:         updates.courierName || null,
165:         updates.trackingUrlTemplate || null,
166:         1   // IsActive=1 (still active)
167:       ]);
168:       return rows[0]?.[0] || null;
169:     }
170: 
171:     // ------------------------------------------------------------------
172:     // MOCK MODE: In-memory update
173:     // ------------------------------------------------------------------
174:     const index = seedCouriers.findIndex(c => c.CourierId.toString() === id.toString() && c.IsActive);
175:     if (index === -1) return null;
176: 
177:     if (updates.courierName) seedCouriers[index].CourierName = updates.courierName;
178:     if (updates.trackingUrlTemplate) seedCouriers[index].TrackingUrlTemplate = updates.trackingUrlTemplate;
179: 
180:     return seedCouriers[index];
181:   }
182: 
183:   /**
184:    * Soft-deletes a courier partner (sets IsActive=0).
185:    * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?)
186:    * Convention: Pass IsActive=0 for soft-delete. No pAction on _set calls.
187:    *
188:    * @param {number|string} id - CourierId.
189:    * @returns {Promise<boolean>} True if deleted, false if not found.
190:    */
191:   async delete(id) {
192:     // ------------------------------------------------------------------
193:     // LIVE DB MODE: prc_courier_partner_master_set (IsActive=0 → Soft Delete)
194:     // ------------------------------------------------------------------
195:     if (process.env.USE_MOCK_DB !== 'true') {
196:       const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?)', [
197:         id,
198:         null, // CourierName — no change
199:         null, // TrackingUrlTemplate — no change
200:         0     // IsActive=0 → Soft delete
201:       ]);
202:       return true;
203:     }
204: 
205:     // ------------------------------------------------------------------
206:     // MOCK MODE: In-memory soft delete
207:     // ------------------------------------------------------------------
208:     const index = seedCouriers.findIndex(c => c.CourierId.toString() === id.toString() && c.IsActive);
209:     if (index === -1) return false;
210: 
211:     seedCouriers[index].IsActive = false;
212:     return true;
213:   }
214: }
215: 
216: export default new CourierRepository();
````

## File: src/modules/courier/courier.service.js
````javascript
 1: // ============================================================================
 2: // File: src/modules/courier/courier.service.js
 3: // Description: Business logic layer for Courier Partners Master Data.
 4: // ============================================================================
 5: 
 6: import courierRepository from "./courier.repository.js";
 7: 
 8: class CourierService {
 9:   _mapToApi(courier) {
10:     if (!courier) return null;
11:     return {
12:       id: courier.CourierId,
13:       courierName: courier.CourierName,
14:       trackingUrlTemplate: courier.TrackingUrlTemplate,
15:       isActive: courier.IsActive === 1 || courier.IsActive === true,
16:       createdAt: courier.CreatedDate
17:     };
18:   }
19: 
20:   async getCouriers(page = 1, limit = 20, search = "") {
21:     const result = await courierRepository.findAll(page, limit, search);
22:     return {
23:       ...result,
24:       data: result.data.map(c => this._mapToApi(c))
25:     };
26:   }
27: 
28:   async getCourierById(id) {
29:     const courier = await courierRepository.findById(id);
30:     if (!courier) {
31:       const error = new Error("Courier partner not found");
32:       error.statusCode = 404;
33:       throw error;
34:     }
35:     return this._mapToApi(courier);
36:   }
37: 
38:   async createCourier(courierData) {
39:     if (!courierData.courierName || !courierData.trackingUrlTemplate) {
40:       const error = new Error(
41:         "Courier Name and Tracking URL Template are required",
42:       );
43:       error.statusCode = 400;
44:       throw error;
45:     }
46: 
47:     const courier = await courierRepository.create(courierData);
48:     return this._mapToApi(courier);
49:   }
50: 
51:   async updateCourier(id, updates) {
52:     const courier = await courierRepository.update(id, updates);
53:     if (!courier) {
54:       const error = new Error("Courier partner not found");
55:       error.statusCode = 404;
56:       throw error;
57:     }
58:     return this._mapToApi(courier);
59:   }
60: 
61:   async deleteCourier(id) {
62:     // Business Rule checking - in production, verify courier isn't linked to active orders
63:     // before allowing even a soft delete.
64:     const success = await courierRepository.delete(id);
65:     if (!success) {
66:       const error = new Error("Courier partner not found");
67:       error.statusCode = 404;
68:       throw error;
69:     }
70: 
71:     return true;
72:   }
73: }
74: 
75: export default new CourierService();
````

## File: src/modules/dashboard/dashboard.repository.js
````javascript
 1: // ============================================================================
 2: // File: src/modules/dashboard/dashboard.repository.js
 3: // Description: Data access layer for Dashboard analytics.
 4: // Uses prc_dashboard_metrics_get for obtaining system-wide metrics.
 5: //
 6: // Dual-Mode: Controlled by USE_MOCK_DB environment variable.
 7: //   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
 8: //   - USE_MOCK_DB=false → Live MySQL stored procedures
 9: //
10: // SP Convention: prc_dashboard_metrics_get (pAction=0)
11: // ============================================================================
12: 
13: import db from '../../infrastructure/database/db.js';
14: 
15: // ============================================================================
16: // MOCK MODE: In-Memory Seed Data
17: // Realistic dashboard metrics for frontend development without a live database.
18: // ============================================================================
19: const mockMetrics = {
20:   totalOrders: 42,
21:   totalParcels: 58,
22:   totalSenders: 15,
23:   totalReceivers: 53,
24:   parcelsByStatus: {
25:     PENDING: 8,
26:     LABEL_PRINTED: 12,
27:     AWB_LINKED: 5,
28:     DISPATCHED: 18,
29:     DELIVERED: 10,
30:     CANCELLED: 3,
31:     RETURNED: 2
32:   },
33:   recentActivity: [
34:     { action: 'ORDER_CREATED', count: 5, period: 'today' },
35:     { action: 'PARCEL_DISPATCHED', count: 3, period: 'today' },
36:     { action: 'PARCEL_DELIVERED', count: 2, period: 'today' }
37:   ]
38: };
39: 
40: class DashboardRepository {
41:   /**
42:    * Fetches high-level metrics for the admin dashboard.
43:    * Calls prc_dashboard_metrics_get with pAction=0.
44:    * 
45:    * @returns {Promise<Object>} The dashboard metrics data.
46:    */
47:   async getMetrics() {
48:     // ------------------------------------------------------------------
49:     // LIVE DB MODE: prc_dashboard_metrics_get (pAction=0)
50:     // Injection Site: Procedure call for analytics
51:     // ------------------------------------------------------------------
52:     if (process.env.USE_MOCK_DB !== 'true') {
53:       const [rows] = await db.execute('CALL prc_dashboard_metrics_get(?)', [0]);
54: 
55:       // Procedure returns metrics which might be an array or single row depending on SP logic
56:       return rows[0] || {};
57:     }
58: 
59:     // ------------------------------------------------------------------
60:     // MOCK MODE: Return static mock metrics
61:     // ------------------------------------------------------------------
62:     return mockMetrics;
63:   }
64: }
65: 
66: export default new DashboardRepository();
````

## File: src/modules/dashboard/dashboard.service.js
````javascript
 1: // ============================================================================
 2: // File: src/modules/dashboard/dashboard.service.js
 3: // Description: Service layer for Dashboard logic.
 4: // Bridges the controller to the dashboard repository.
 5: // ============================================================================
 6: 
 7: import dashboardRepository from './dashboard.repository.js';
 8: 
 9: class DashboardService {
10:   /**
11:    * Internal mapper to standardize database PascalCase to API camelCase.
12:    * Handles SP array wrapping and raw object formatting.
13:    * 
14:    * @param {object|Array} data - Raw data from repository
15:    * @returns {object} Standardized camelCase metric object
16:    */
17:   _mapToApi(data) {
18:     if (!data) return {};
19:     
20:     // Unpack array row if live DB returned array
21:     const metrics = Array.isArray(data) ? data[0] : data;
22:     if (!metrics) return {};
23: 
24:     return {
25:       totalOrders: metrics.TotalOrders !== undefined ? metrics.TotalOrders : metrics.totalOrders,
26:       totalParcels: metrics.TotalParcels !== undefined ? metrics.TotalParcels : metrics.totalParcels,
27:       totalSenders: metrics.TotalSenders !== undefined ? metrics.TotalSenders : metrics.totalSenders,
28:       totalReceivers: metrics.TotalReceivers !== undefined ? metrics.TotalReceivers : metrics.totalReceivers,
29:       parcelsByStatus: metrics.ParcelsByStatus || metrics.parcelsByStatus || {},
30:       recentActivity: metrics.RecentActivity || metrics.recentActivity || []
31:     };
32:   }
33: 
34:   /**
35:    * Retrieves dashboard metrics.
36:    * Currently a direct pass-through, but reserved for future transformations.
37:    * 
38:    * @returns {Promise<Object>} Dashboard metrics.
39:    */
40:   async getMetrics() {
41:     const data = await dashboardRepository.getMetrics();
42:     return this._mapToApi(data);
43:   }
44: }
45: 
46: export default new DashboardService();
````

## File: src/modules/employee/employee.repository.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/employee/employee.repository.js
  3: // Description: Data access layer for Employee Management.
  4: // Handles interactions with the 'employee_master' table.
  5: //
  6: // Dual-Mode: Controlled by USE_MOCK_DB environment variable.
  7: //   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
  8: //   - USE_MOCK_DB=false → Live MySQL stored procedures
  9: //
 10: // SP Convention (api_procedure_spec_v1.md):
 11: //   - Reads:   prc_employee_master_get (pAction=0 list, pAction=1 specific)
 12: //   - Upserts: prc_employee_master_set (EmployeeCode=0 insert, >0 update)
 13: // ============================================================================
 14: 
 15: import db from '../../infrastructure/database/db.js';
 16: import bcrypt from 'bcryptjs';
 17: 
 18: // ============================================================================
 19: // MOCK MODE: In-Memory Seed Data
 20: // Used when USE_MOCK_DB=true for frontend development without a live database.
 21: // ============================================================================
 22: let seedEmployees = [];
 23: 
 24: const initializeSeedData = async () => {
 25:   const salt = await bcrypt.genSalt(10);
 26:   const hashedPassword = await bcrypt.hash('securePass123', salt);
 27: 
 28:   seedEmployees = [
 29:     {
 30:       EmployeeCode: 1,
 31:       FullName: 'Admin User',
 32:       EmailAddress: 'admin@example.com',
 33:       Password: hashedPassword,
 34:       RoleCode: 'ADMIN',
 35:       AllowLogin: true,
 36:       CreatedDate: '2026-04-03T08:52:00Z'
 37:     },
 38:     {
 39:       EmployeeCode: 2,
 40:       FullName: 'Test Operator',
 41:       EmailAddress: 'operator@example.com',
 42:       Password: hashedPassword,
 43:       RoleCode: 'OPERATOR',
 44:       AllowLogin: false,
 45:       CreatedDate: '2026-04-03T08:52:00Z'
 46:     }
 47:   ];
 48: };
 49: 
 50: initializeSeedData();
 51: 
 52: class EmployeeRepository {
 53: 
 54:   /**
 55:    * Fetches an employee by their email (used for login and duplicate checks).
 56:    * Procedure: CALL prc_employee_master_get(?, ?)
 57:    * Convention: pAction=1, pass email to find specific employee by email.
 58:    *
 59:    * @param {string} email - Employee email address.
 60:    * @returns {Promise<Object|null>} Employee record or null if not found.
 61:    */
 62:   async findByEmail(email) {
 63:     // ------------------------------------------------------------------
 64:     // LIVE DB MODE: prc_employee_master_get (pAction=1, by email)
 65:     // ------------------------------------------------------------------
 66:     if (process.env.USE_MOCK_DB !== 'true') {
 67:       const [rows] = await db.execute('CALL prc_employee_master_get(?, ?)', [1, email]);
 68:       return rows[0]?.[0] || null;
 69:     }
 70: 
 71:     // ------------------------------------------------------------------
 72:     // MOCK MODE: In-memory lookup by email
 73:     // ------------------------------------------------------------------
 74:     const emp = seedEmployees.find((e) => e.EmailAddress === email);
 75:     return emp || null;
 76:   }
 77: 
 78:   /**
 79:    * Fetches a paginated list of employees with optional filtering.
 80:    * Procedure: CALL prc_employee_master_get(?, ?, ?, ?, ?)
 81:    * Convention: pAction=0, paginated list with optional search/role/allowLogin filters.
 82:    *
 83:    * @param {object} params - { page, limit, search, role, allowLogin }
 84:    * @returns {Promise<object>} { data: [...], meta: { page, limit, totalRows, totalPages } }
 85:    */
 86:   async findAll({ page = 1, limit = 20, search, role, allowLogin }) {
 87:     // ------------------------------------------------------------------
 88:     // LIVE DB MODE: prc_employee_master_get (pAction=0, paginated)
 89:     // ------------------------------------------------------------------
 90:     if (process.env.USE_MOCK_DB !== 'true') {
 91:       const [rows] = await db.execute('CALL prc_employee_master_get(?, ?, ?, ?, ?)', [
 92:         0, // pAction=0 → Get all employees (paginated)
 93:         page,
 94:         limit,
 95:         search || null,
 96:         role || null
 97:       ]);
 98:       return {
 99:         data: rows[0],
100:         meta: rows[1]?.[0] || { page, limit, totalRows: 0, totalPages: 0 }
101:       };
102:     }
103: 
104:     // ------------------------------------------------------------------
105:     // MOCK MODE: In-memory filtering and pagination
106:     // ------------------------------------------------------------------
107:     let results = [...seedEmployees];
108: 
109:     if (role) results = results.filter(e => e.RoleCode === role);
110:     if (search) {
111:       const s = search.toLowerCase();
112:       results = results.filter(e => e.FullName.toLowerCase().includes(s) || e.EmailAddress.toLowerCase().includes(s));
113:     }
114:     if (allowLogin !== undefined) {
115:       results = results.filter(e => e.AllowLogin === (allowLogin === 'true' || allowLogin === true));
116:     }
117: 
118:     // Pagination
119:     const startIndex = (page - 1) * limit;
120:     const paginatedItems = results.slice(startIndex, startIndex + limit);
121: 
122:     return {
123:       data: paginatedItems,
124:       meta: {
125:         page: parseInt(page),
126:         limit: parseInt(limit),
127:         totalRows: results.length,
128:         totalPages: Math.ceil(results.length / limit)
129:       }
130:     };
131:   }
132: 
133:   /**
134:    * Fetches an employee by their EmployeeCode.
135:    * Procedure: CALL prc_employee_master_get(?, ?)
136:    * Convention: pAction=1, pass EmployeeCode.
137:    *
138:    * @param {number|string} id - EmployeeCode.
139:    * @returns {Promise<Object|null>} Employee record or null.
140:    */
141:   async findById(id) {
142:     // ------------------------------------------------------------------
143:     // LIVE DB MODE: prc_employee_master_get (pAction=1, by EmployeeCode)
144:     // ------------------------------------------------------------------
145:     if (process.env.USE_MOCK_DB !== 'true') {
146:       const [rows] = await db.execute('CALL prc_employee_master_get(?, ?)', [1, id]);
147:       return rows[0]?.[0] || null;
148:     }
149: 
150:     // ------------------------------------------------------------------
151:     // MOCK MODE: In-memory lookup by EmployeeCode
152:     // ------------------------------------------------------------------
153:     const emp = seedEmployees.find((e) => e.EmployeeCode.toString() === id.toString());
154:     return emp || null;
155:   }
156: 
157:   /**
158:    * Creates a new employee record.
159:    * Procedure: CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)
160:    * Convention: EmployeeCode=0 triggers insert. No pAction on _set calls.
161:    *
162:    * @param {object} employeeData - { FullName, EmailAddress, Password, RoleCode, ... }
163:    * @returns {Promise<object>} The newly created employee record.
164:    */
165:   async create(employeeData) {
166:     // ------------------------------------------------------------------
167:     // LIVE DB MODE: prc_employee_master_set (EmployeeCode=0 → Insert)
168:     // ------------------------------------------------------------------
169:     if (process.env.USE_MOCK_DB !== 'true') {
170:       const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
171:         0, // EmployeeCode=0 → Insert new employee
172:         employeeData.FullName || employeeData.name,
173:         employeeData.ContactNumber || null,
174:         employeeData.EmailAddress || employeeData.email,
175:         employeeData.UserName || employeeData.EmailAddress || employeeData.email,
176:         employeeData.Password || employeeData.password,
177:         employeeData.FkRoleId || employeeData.roleId || null,
178:         employeeData.AllowLogin !== undefined ? employeeData.AllowLogin : 1
179:       ]);
180:       return rows[0]?.[0];
181:     }
182: 
183:     // ------------------------------------------------------------------
184:     // MOCK MODE: In-memory push
185:     // ------------------------------------------------------------------
186:     const newId = seedEmployees.length > 0 ? Math.max(...seedEmployees.map(e => e.EmployeeCode)) + 1 : 1;
187: 
188:     const newEmployee = {
189:       EmployeeCode: newId,
190:       FullName: employeeData.FullName || employeeData.name,
191:       EmailAddress: employeeData.EmailAddress || employeeData.email,
192:       Password: employeeData.Password || employeeData.password,
193:       RoleCode: employeeData.RoleCode || employeeData.role,
194:       AllowLogin: true,
195:       CreatedDate: new Date().toISOString()
196:     };
197: 
198:     seedEmployees.push(newEmployee);
199:     return newEmployee;
200:   }
201: 
202:   /**
203:    * Updates an employee record entirely.
204:    * Procedure: CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)
205:    * Convention: EmployeeCode>0 triggers update. No pAction on _set calls.
206:    *
207:    * @param {number|string} id - EmployeeCode.
208:    * @param {object} updateData - Fields to update.
209:    * @returns {Promise<object|null>} Updated employee record or null.
210:    */
211:   async update(id, updateData) {
212:     // ------------------------------------------------------------------
213:     // LIVE DB MODE: prc_employee_master_set (EmployeeCode>0 → Update)
214:     // ------------------------------------------------------------------
215:     if (process.env.USE_MOCK_DB !== 'true') {
216:       const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
217:         id, // EmployeeCode>0 → Update existing employee
218:         updateData.FullName || updateData.name || null,
219:         updateData.ContactNumber || null,
220:         updateData.EmailAddress || updateData.email || null,
221:         updateData.UserName || null,
222:         updateData.Password || updateData.password || null,
223:         updateData.FkRoleId || updateData.roleId || null,
224:         updateData.AllowLogin !== undefined ? updateData.AllowLogin : null
225:       ]);
226:       return rows[0]?.[0] || null;
227:     }
228: 
229:     // ------------------------------------------------------------------
230:     // MOCK MODE: In-memory update
231:     // ------------------------------------------------------------------
232:     const index = seedEmployees.findIndex((e) => e.EmployeeCode.toString() === id.toString());
233:     if (index === -1) return null;
234: 
235:     seedEmployees[index] = { ...seedEmployees[index], ...updateData };
236:     return seedEmployees[index];
237:   }
238: 
239:   /**
240:    * Toggles login access for an employee.
241:    * Procedure: CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)
242:    * Convention: EmployeeCode>0 with AllowLogin flag. No pAction on _set calls.
243:    *
244:    * @param {number|string} id - EmployeeCode.
245:    * @param {boolean} allowLogin - New access state.
246:    * @returns {Promise<object|null>} Updated employee record or null.
247:    */
248:   async patchAccess(id, allowLogin) {
249:     // ------------------------------------------------------------------
250:     // LIVE DB MODE: prc_employee_master_set (update AllowLogin only)
251:     // ------------------------------------------------------------------
252:     if (process.env.USE_MOCK_DB !== 'true') {
253:       const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
254:         id,
255:         null, // FullName — no change
256:         null, // ContactNumber — no change
257:         null, // EmailAddress — no change
258:         null, // UserName — no change
259:         null, // Password — no change
260:         null, // FkRoleId — no change
261:         allowLogin ? 1 : 0
262:       ]);
263:       return rows[0]?.[0] || null;
264:     }
265: 
266:     // ------------------------------------------------------------------
267:     // MOCK MODE: In-memory toggle
268:     // ------------------------------------------------------------------
269:     const index = seedEmployees.findIndex((e) => e.EmployeeCode.toString() === id.toString());
270:     if (index === -1) return null;
271: 
272:     seedEmployees[index].AllowLogin = allowLogin;
273:     return seedEmployees[index];
274:   }
275: }
276: 
277: export default new EmployeeRepository();
````

## File: src/modules/notification/notification.repository.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/notification/notification.repository.js
  3: // Description: Data access layer for the Notification module.
  4: // This repository handles all interactions with the `Notification_log` table
  5: // exclusively via defined stored procedures.
  6: //
  7: // Dual-Mode: Controlled by USE_MOCK_DB environment variable.
  8: //   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
  9: //   - USE_MOCK_DB=false → Live MySQL stored procedures
 10: //
 11: // SP Convention:
 12: //   - prc_Notification_log_set (upsert)
 13: //   - prc_Notification_log_get (pAction=1 by parcel, pAction=2 by ID)
 14: // ============================================================================
 15: 
 16: import db from '../../infrastructure/database/db.js';
 17: 
 18: // ============================================================================
 19: // MOCK MODE: In-Memory Seed Data
 20: // ============================================================================
 21: let mockNotifications = [
 22:   {
 23:     PkNotificationId: 1,
 24:     FkParcelDetailsId: 1,
 25:     FkReceiverDetailsId: 1,
 26:     NotificationType: 'SMS',
 27:     SmsStatus: 'SENT',
 28:     EmailStatus: 'PENDING',
 29:     AppStatus: 'PENDING',
 30:     NotificationLevel: 1,
 31:     IsActive: 1,
 32:     RequestedBy: 'SYSTEM',
 33:     CreatedDate: '2026-04-10T10:00:00Z'
 34:   }
 35: ];
 36: 
 37: class NotificationRepository {
 38:   /**
 39:    * Upsert a notification log entry.
 40:    * Procedure: CALL prc_Notification_log_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
 41:    * 
 42:    * @param {object} params - Notification parameters.
 43:    * @returns {Promise<object>} The created or updated notification record.
 44:    */
 45:   async createOrUpdateNotification(params) {
 46:     // ------------------------------------------------------------------
 47:     // LIVE DB MODE: prc_Notification_log_set
 48:     // REPOSITORY INJECTION SITE:
 49:     // This method is the single point of entry for mutation on Notification_log.
 50:     // It maps the domain object to the flat parameter list for the SP.
 51:     // ------------------------------------------------------------------
 52:     if (process.env.USE_MOCK_DB !== 'true') {
 53:       const [rows] = await db.execute('CALL prc_Notification_log_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
 54:         params.notificationId || 0,
 55:         params.parcelId,
 56:         params.receiverId || null,
 57:         params.notificationTypeId || 1,
 58:         params.clientId || null,
 59:         params.plantId || null,
 60:         params.reasonId || null,
 61:         params.reasonDetailsId || null,
 62:         params.appStatusId || 0,
 63:         params.smsStatusId || 0,
 64:         params.emailStatusId || 0,
 65:         params.notificationLevel || 1,
 66:         params.isActive !== undefined ? params.isActive : 1,
 67:         params.requestedBy || 'SYSTEM',
 68:         params.isPaymentCheck || 0,
 69:         params.lastNotificationTime || null
 70:       ]);
 71:       return rows[0][0];
 72:     }
 73: 
 74:     // ------------------------------------------------------------------
 75:     // MOCK MODE: In-memory upsert
 76:     // ------------------------------------------------------------------
 77:     if (params.notificationId && params.notificationId > 0) {
 78:       const index = mockNotifications.findIndex(n => n.PkNotificationId === params.notificationId);
 79:       if (index !== -1) {
 80:         mockNotifications[index] = { ...mockNotifications[index], ...params };
 81:         return mockNotifications[index];
 82:       }
 83:     }
 84: 
 85:     const newId = mockNotifications.length > 0 ? Math.max(...mockNotifications.map(n => n.PkNotificationId)) + 1 : 1;
 86:     const notification = {
 87:       PkNotificationId: newId,
 88:       FkParcelDetailsId: params.parcelId,
 89:       FkReceiverDetailsId: params.receiverId || null,
 90:       NotificationType: 'SMS',
 91:       SmsStatus: 'PENDING',
 92:       EmailStatus: 'PENDING',
 93:       AppStatus: 'PENDING',
 94:       NotificationLevel: params.notificationLevel || 1,
 95:       IsActive: params.isActive !== undefined ? params.isActive : 1,
 96:       RequestedBy: params.requestedBy || 'SYSTEM',
 97:       CreatedDate: new Date().toISOString()
 98:     };
 99:     mockNotifications.push(notification);
100:     return notification;
101:   }
102: 
103:   /**
104:    * Retrieve notification history for a specific parcel.
105:    * Procedure: CALL prc_Notification_log_get(?, ?)
106:    * 
107:    * @param {number|string} parcelId - The ID of the parcel.
108:    * @returns {Promise<Array>} List of notification logs.
109:    */
110:   async getNotificationsByParcelId(parcelId) {
111:     // ------------------------------------------------------------------
112:     // LIVE DB MODE: prc_Notification_log_get (pAction=1)
113:     // REPOSITORY INJECTION SITE:
114:     // Fetches history using pAction=1 as per api_procedure_spec.
115:     // ------------------------------------------------------------------
116:     if (process.env.USE_MOCK_DB !== 'true') {
117:       const [rows] = await db.execute('CALL prc_Notification_log_get(?, ?)', [
118:         1, // pAction = 1 (Get by ParcelId)
119:         parcelId
120:       ]);
121:       return rows[0];
122:     }
123: 
124:     // ------------------------------------------------------------------
125:     // MOCK MODE: In-memory lookup by parcel
126:     // ------------------------------------------------------------------
127:     return mockNotifications.filter(n => n.FkParcelDetailsId === parseInt(parcelId));
128:   }
129: 
130:   /**
131:    * Retrieve a specific notification by its ID.
132:    * Procedure: CALL prc_Notification_log_get(?, ?)
133:    * 
134:    * @param {number|string} notificationId - The ID of the notification.
135:    * @returns {Promise<object>} The notification record.
136:    */
137:   async getNotificationById(notificationId) {
138:     // ------------------------------------------------------------------
139:     // LIVE DB MODE: prc_Notification_log_get (pAction=2)
140:     // ------------------------------------------------------------------
141:     if (process.env.USE_MOCK_DB !== 'true') {
142:       const [rows] = await db.execute('CALL prc_Notification_log_get(?, ?)', [
143:         2, // pAction = 2 (Get by ID)
144:         notificationId
145:       ]);
146:       return rows[0][0];
147:     }
148: 
149:     // ------------------------------------------------------------------
150:     // MOCK MODE: In-memory lookup by ID
151:     // ------------------------------------------------------------------
152:     return mockNotifications.find(n => n.PkNotificationId === parseInt(notificationId)) || null;
153:   }
154: }
155: 
156: export default new NotificationRepository();
````

## File: src/modules/notification/notification.service.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/notification/notification.service.js
  3: // Description: Business logic layer for the Notification module.
  4: // Handles {AWB} template replacement and orchestrates notification sending.
  5: // ============================================================================
  6: 
  7: import notificationRepository from './notification.repository.js';
  8: import db from '../../infrastructure/database/db.js';
  9: 
 10: class NotificationService {
 11:   /**
 12:    * Internal mapper to standardize PascalCase DB columns to camelCase API structure.
 13:    */
 14:   _mapToApi(log) {
 15:     if (!log) return null;
 16:     return {
 17:       notificationId: log.PkNotificationLogId || log.id || log.notificationId,
 18:       parcelId: log.FkParcelDetailsId || log.parcelId,
 19:       receiverId: log.FkReceiverDetailsId || log.receiverId,
 20:       notificationTypeId: log.FkNotificationTypeId || log.notificationTypeId,
 21:       appStatusId: log.AppStatusId || log.appStatusId,
 22:       smsStatusId: log.SmsStatusId || log.smsStatusId,
 23:       emailStatusId: log.EmailStatusId || log.emailStatusId,
 24:       requestedBy: log.RequestedBy || log.requestedBy,
 25:       lastNotificationTime: log.LastNotificationTime || log.lastNotificationTime,
 26:       createdAt: log.CreatedDate || log.createdAt || log.createdDate
 27:     };
 28:   }
 29: 
 30:   /**
 31:    * Send a notification for a specific parcel.
 32:    * 
 33:    * @param {number|string} parcelId - The parcel being notified.
 34:    * @param {object} user - The authenticated user triggering the notification.
 35:    * @returns {Promise<object>} Result of the notification attempt.
 36:    */
 37:   async sendNotification(parcelId, user) {
 38:     // ------------------------------------------------------------------
 39:     // SERVICE LOGIC: Template Replacement
 40:     // 1. Fetch parcel and courier tracking template.
 41:     // 2. Replace {AWB} in template.
 42:     // 3. Log attempt to Notification_log via Repository.
 43:     // ------------------------------------------------------------------
 44: 
 45:     // Fetch parcel details (using mapped SP)
 46:     const [parcelRows] = await db.execute('CALL prc_parcel_details_get(?, ?)', [1, parcelId]);
 47:     const parcel = parcelRows[0]?.[0];
 48: 
 49:     if (!parcel) {
 50:       const error = new Error('Parcel not found');
 51:       error.statusCode = 404;
 52:       throw error;
 53:     }
 54: 
 55:     if (!parcel.TrackingNo && !parcel.trackingNo) {
 56:       const error = new Error('No AWB linked to this parcel. Cannot send notification.');
 57:       error.statusCode = 400;
 58:       throw error;
 59:     }
 60: 
 61:     const trackingNo = parcel.TrackingNo || parcel.trackingNo;
 62:     const courierId = parcel.FkCourierId || parcel.fkCourierId;
 63:     const receiverPhone = parcel.ReceiverPhone || parcel.receiverPhone;
 64: 
 65:     // Fetch Courier Template (directly from DB since repo might be mocked)
 66:     const [courierRows] = await db.execute('SELECT TrackingUrlTemplate FROM courier_partner_master WHERE CourierId = ?', [courierId]);
 67:     const template = courierRows[0]?.[0]?.TrackingUrlTemplate || 'https://track.it/{AWB}';
 68: 
 69:     // Perform replacement
 70:     const trackingUrl = template.replace('{AWB}', trackingNo);
 71: 
 72:     // Mock sending logic (e.g., calling an SMS/Email provider)
 73:     console.log(`[NOTIFICATION] Sending tracking link: ${trackingUrl} to ${receiverPhone || 'unknown'}`);
 74: 
 75:     // Log the event
 76:     const logEntry = await notificationRepository.createOrUpdateNotification({
 77:       parcelId: parcel.PkParcelDetailsId || parcel.id,
 78:       receiverId: parcel.FkReceiverDetailsId || parcel.receiverId || 1,
 79:       notificationTypeId: 1, // Dispatch Notification
 80:       appStatusId: 1, // Sent
 81:       smsStatusId: 1, // Sent
 82:       requestedBy: user?.employeeCode || 'SYSTEM',
 83:       lastNotificationTime: new Date()
 84:     });
 85: 
 86:     return {
 87:       message: 'Notification sent successfully',
 88:       trackingUrl,
 89:       logEntry: this._mapToApi(logEntry)
 90:     };
 91:   }
 92: 
 93:   /**
 94:    * Resend a specific notification.
 95:    * 
 96:    * @param {number|string} notificationId - The ID of the log entry.
 97:    * @param {object} user - The authenticated user.
 98:    */
 99:   async resendNotification(notificationId, user) {
100:     const log = await notificationRepository.getNotificationById(notificationId);
101:     if (!log) {
102:       const error = new Error('Notification log entry not found');
103:       error.statusCode = 404;
104:       throw error;
105:     }
106: 
107:     // Re-trigger the logic
108:     const parcelId = log.FkParcelDetailsId || log.parcelId;
109:     return await this.sendNotification(parcelId, user);
110:   }
111: 
112:   /**
113:    * Get history for a parcel.
114:    * 
115:    * @param {number|string} parcelId 
116:    */
117:   async getParcelNotifications(parcelId) {
118:     const logs = await notificationRepository.getNotificationsByParcelId(parcelId);
119:     return logs.map(log => this._mapToApi(log));
120:   }
121: 
122:   /**
123:    * Handle incoming webhook updates from delivery partners/sms gateways.
124:    * 
125:    * @param {object} payload 
126:    */
127:   async handleWebhook(payload) {
128:     // Example payload: { externalId: 'SMS_123', status: 'delivered', notificationId: 45 }
129:     const { notificationId, status } = payload;
130: 
131:     const statusMap = {
132:       'delivered': 2,
133:       'failed': 3,
134:       'sent': 1
135:     };
136: 
137:     const dbStatus = statusMap[(status || '').toLowerCase()] || 0;
138: 
139:     const updatedLog = await notificationRepository.createOrUpdateNotification({
140:       notificationId,
141:       appStatusId: dbStatus,
142:       smsStatusId: dbStatus,
143:       emailStatusId: dbStatus
144:     });
145: 
146:     return this._mapToApi(updatedLog);
147:   }
148: }
149: 
150: export default new NotificationService();
````

## File: src/modules/order/order.seed.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/order/order.seed.js
  3: // Description: In-memory seed data for mocking DB operations in Order module.
  4: // Field names align with db_schema_v1: Party_master, order_master,
  5: // receiver_details, order_items, parcel_details.
  6: // ============================================================================
  7: 
  8: /**
  9:  * Mock Party_master entries (unified senders/receivers).
 10:  * Maps to: Party_master table (PkPartyId, CustomerName, PhoneNo, AddressLine1, City, State, Pincode)
 11:  */
 12: export const seedParties = [
 13:   {
 14:     id: 1,
 15:     customerName: 'Ramesh Textiles',
 16:     phoneNo: '9876543210',
 17:     addressLine1: '14, Gandhi Nagar',
 18:     addressLine2: 'Near Railway Station',
 19:     city: 'Surat',
 20:     state: 'Gujarat',
 21:     pincode: '395002',
 22:     isActive: true
 23:   },
 24:   {
 25:     id: 2,
 26:     customerName: 'Delhi Fabrics Ltd.',
 27:     phoneNo: '9123456780',
 28:     addressLine1: '45, Karol Bagh',
 29:     addressLine2: '',
 30:     city: 'New Delhi',
 31:     state: 'Delhi',
 32:     pincode: '110005',
 33:     isActive: true
 34:   }
 35: ];
 36: 
 37: /**
 38:  * Mock order_master entries.
 39:  * Maps to: order_master (PkOrderId, OrderCode, FkSenderId, SenderName, SenderMobile, TotalAmount)
 40:  * ⚠️ NO status column — order status is DERIVED from parcel states.
 41:  */
 42: export const seedOrders = [
 43:   {
 44:     id: 1,
 45:     orderCode: 'ORD-20260330-001',
 46:     fkSenderId: 1,
 47:     senderName: 'Ramesh Textiles',
 48:     senderMobile: '9876543210',
 49:     senderAddress: '14, Gandhi Nagar, Near Railway Station, Surat, Gujarat 395002',
 50:     fkCourierId: 1,
 51:     totalAmount: 3650.00,
 52:     createdBy: 'EMP001',
 53:     createdAt: new Date('2026-03-30T10:00:00Z'),
 54:     isActive: true
 55:   }
 56: ];
 57: 
 58: /**
 59:  * Mock receiver_details entries.
 60:  * Maps to: receiver_details (PkReceiverDetailsId, FkOrderId, ReceiverName, ReceiverPhone, AddressLine1, ...)
 61:  */
 62: export const seedReceivers = [
 63:   {
 64:     id: 1,
 65:     fkOrderId: 1,
 66:     receiverName: 'Delhi Fabrics Ltd.',
 67:     receiverPhone: '9123456780',
 68:     addressLine1: '45, Karol Bagh',
 69:     addressLine2: '',
 70:     city: 'New Delhi',
 71:     state: 'Delhi',
 72:     pincode: '110005',
 73:     country: 'India',
 74:     isActive: true
 75:   },
 76:   {
 77:     id: 2,
 78:     fkOrderId: 1,
 79:     receiverName: 'Mumbai Silk House',
 80:     receiverPhone: '9988776655',
 81:     addressLine1: '22, Linking Road',
 82:     addressLine2: 'Bandra West',
 83:     city: 'Mumbai',
 84:     state: 'Maharashtra',
 85:     pincode: '400050',
 86:     country: 'India',
 87:     isActive: true
 88:   }
 89: ];
 90: 
 91: /**
 92:  * Mock order_items entries.
 93:  * Maps to: order_items (PkOrderItemId, FkReceiverDetailsId, FkProductId, OutwardQty, UnitPrice)
 94:  */
 95: export const seedOrderItems = [
 96:   { id: 1, fkReceiverDetailsId: 1, fkProductId: 1, outwardQty: 5, unitPrice: 420.00 },
 97:   { id: 2, fkReceiverDetailsId: 1, fkProductId: 3, outwardQty: 2, unitPrice: 1100.00 },
 98:   { id: 3, fkReceiverDetailsId: 2, fkProductId: 1, outwardQty: 3, unitPrice: 450.00 }
 99: ];
100: 
101: /**
102:  * Mock parcel_details entries.
103:  * Maps to: parcel_details (PkParcelDetailsId, FkReceiverDetailsId, FkCourierId, TrackingNo, QRCode, FkParcelStatusId, LabelPrintCount)
104:  * ✅ 1 receiver = 1 parcel
105:  */
106: export const seedParcels = [
107:   {
108:     id: 1,
109:     fkReceiverDetailsId: 1,
110:     fkCourierId: 1,
111:     parcel_id: 'PDS-A1B2C3',
112:     trackingNo: null,
113:     fkParcelStatusId: null,    // Will resolve to lu_details.LuDetailsId for "PENDING"
114:     parcelStatusCode: 'PENDING',
115:     labelPrintCount: 0,
116:     dispatchDate: null,
117:     createdBy: 'EMP001',
118:     createdAt: new Date('2026-03-30T10:00:00Z')
119:   },
120:   {
121:     id: 2,
122:     fkReceiverDetailsId: 2,
123:     fkCourierId: 1,
124:     parcel_id: 'PDS-D4E5F6',
125:     trackingNo: null,
126:     fkParcelStatusId: null,
127:     parcelStatusCode: 'PENDING',
128:     labelPrintCount: 0,
129:     dispatchDate: null,
130:     createdBy: 'EMP001',
131:     createdAt: new Date('2026-03-30T10:00:00Z')
132:   }
133: ];
````

## File: src/modules/parcel/parcel.repository.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/parcel/parcel.repository.js
  3: // Description: Data access layer for the Parcel module.
  4: //
  5: // Dual-Mode: Controlled by USE_MOCK_DB environment variable.
  6: //   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
  7: //   - USE_MOCK_DB=false → Live MySQL stored procedures
  8: //
  9: // SP Convention (api_procedure_spec_v1.md):
 10: //   - Reads:   prc_parcel_details_get (pAction=0 list, 1 detail, 2 label-data)
 11: //   - Reads:   prc_receiver_status_details_get (pAction=0 all events, 1 timeline)
 12: //   - Writes:  prc_parcel_details_set (log-print, scan, dispatch, terminal states)
 13: //              → internally triggers prc_receiver_status_details_set
 14: // ============================================================================
 15: 
 16: import db from '../../infrastructure/database/db.js';
 17: 
 18: import {
 19:   seedParcels,
 20:   seedReceivers,
 21:   seedParties,
 22:   seedOrders,
 23:   seedStatusLog,
 24: } from './parcel.seed.js';
 25: 
 26: class ParcelRepository {
 27:   // ============================================================================
 28:   // READ OPERATIONS
 29:   // ============================================================================
 30: 
 31:   /**
 32:    * Get all parcels with pagination and optional filtering.
 33:    * Procedure: CALL prc_parcel_details_get(0, ?, ?, ?, ?, ?)
 34:    * Convention: pAction=0 → paginated list of all active parcels.
 35:    *
 36:    * @param {object} filters - { page, limit, search, sortBy, sortOrder, status }
 37:    * @returns {Promise<object>} { data: [...], total: number }
 38:    */
 39:   async findAllParcels(filters = {}) {
 40:     // ------------------------------------------------------------------
 41:     // LIVE DB MODE: prc_parcel_details_get (pAction=0)
 42:     // ------------------------------------------------------------------
 43:     if (process.env.USE_MOCK_DB !== 'true') {
 44:       const [rows] = await db.execute('CALL prc_parcel_details_get(?, ?, ?, ?, ?, ?)', [
 45:         0, // pAction=0 → Get all parcels (paginated)
 46:         filters.page || 1,
 47:         filters.limit || 20,
 48:         filters.search || null,
 49:         filters.sortBy || 'CreatedDate',
 50:         filters.sortOrder || 'desc'
 51:       ]);
 52:       return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
 53:     }
 54: 
 55:     // ------------------------------------------------------------------
 56:     // MOCK MODE: In-memory filtering
 57:     // ------------------------------------------------------------------
 58:     let filtered = seedParcels.filter(() => true);
 59: 
 60:     // Optional status filter
 61:     if (filters.status) {
 62:       filtered = filtered.filter((p) => p.parcelStatusCode === filters.status);
 63:     }
 64: 
 65:     // Optional search (matches parcel_id or trackingNo)
 66:     if (filters.search) {
 67:       const q = filters.search.toLowerCase();
 68:       filtered = filtered.filter(
 69:         (p) =>
 70:           p.parcel_id.toLowerCase().includes(q) ||
 71:           (p.trackingNo && p.trackingNo.toLowerCase().includes(q))
 72:       );
 73:     }
 74: 
 75:     return {
 76:       data: filtered.map((parcel) => {
 77:         const receiver = seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId);
 78:         const order = receiver
 79:           ? seedOrders.find((o) => o.id === receiver.fkOrderId)
 80:           : null;
 81: 
 82:         return {
 83:           id: parcel.id,
 84:           parcelId: parcel.parcel_id,
 85:           trackingNo: parcel.trackingNo,
 86:           status: parcel.parcelStatusCode,
 87:           labelPrintCount: parcel.labelPrintCount,
 88:           dispatchDate: parcel.dispatchDate,
 89:           receiverName: receiver?.receiverName || null,
 90:           orderCode: order?.orderCode || null,
 91:           createdAt: parcel.createdAt
 92:         };
 93:       }),
 94:       total: filtered.length
 95:     };
 96:   }
 97: 
 98:   /**
 99:    * Get a single parcel by ID.
100:    * Procedure: CALL prc_parcel_details_get(1, ?)
101:    * Convention: pAction=1 → single parcel detail.
102:    *
103:    * @param {number|string} parcelId - PkParcelDetailsId.
104:    * @returns {Promise<object|null>} Parcel detail, or null if not found.
105:    */
106:   async findById(parcelId) {
107:     // ------------------------------------------------------------------
108:     // LIVE DB MODE: prc_parcel_details_get (pAction=1)
109:     // ------------------------------------------------------------------
110:     if (process.env.USE_MOCK_DB !== 'true') {
111:       const [rows] = await db.execute('CALL prc_parcel_details_get(?, ?)', [
112:         1, // pAction=1 → Get specific parcel
113:         parcelId
114:       ]);
115:       return rows[0]?.[0] || null;
116:     }
117: 
118:     // ------------------------------------------------------------------
119:     // MOCK MODE: In-memory lookup with enrichment
120:     // ------------------------------------------------------------------
121:     const parcel = seedParcels.find((p) => p.id === parseInt(parcelId));
122:     if (!parcel) return null;
123: 
124:     const receiver = seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId);
125:     const order = receiver
126:       ? seedOrders.find((o) => o.id === receiver.fkOrderId)
127:       : null;
128: 
129:     return {
130:       id: parcel.id,
131:       parcelId: parcel.parcel_id,
132:       trackingNo: parcel.trackingNo,
133:       status: parcel.parcelStatusCode,
134:       labelPrintCount: parcel.labelPrintCount,
135:       dispatchDate: parcel.dispatchDate,
136:       fkCourierId: parcel.fkCourierId,
137:       receiverName: receiver?.receiverName || null,
138:       receiverPhone: receiver?.receiverPhone || null,
139:       addressLine1: receiver?.addressLine1 || null,
140:       addressLine2: receiver?.addressLine2 || null,
141:       city: receiver?.city || null,
142:       state: receiver?.state || null,
143:       pincode: receiver?.pincode || null,
144:       orderCode: order?.orderCode || null,
145:       orderId: order?.id || null,
146:       createdAt: parcel.createdAt
147:     };
148:   }
149: 
150:   /**
151:    * Get label data for a parcel (stitched flat JSON for frontend label rendering).
152:    * Procedure: CALL prc_parcel_details_get(2, ?)
153:    * Convention: pAction=2 → stitched sender snapshot + receiver address + parcel_id.
154:    * The frontend is responsible for rendering the QR code from parcel_id.
155:    *
156:    * @param {number|string} parcelId - PkParcelDetailsId.
157:    * @returns {Promise<object|null>} Flat label data JSON, or null if not found.
158:    */
159:   async getLabelData(parcelId) {
160:     // ------------------------------------------------------------------
161:     // LIVE DB MODE: prc_parcel_details_get (pAction=2)
162:     // ------------------------------------------------------------------
163:     if (process.env.USE_MOCK_DB !== 'true') {
164:       const [rows] = await db.execute('CALL prc_parcel_details_get(?, ?)', [
165:         2, // pAction=2 → Label data (stitched flat JSON)
166:         parcelId
167:       ]);
168:       return rows[0]?.[0] || null;
169:     }
170: 
171:     // ------------------------------------------------------------------
172:     // MOCK MODE: In-memory label data stitching
173:     // ------------------------------------------------------------------
174:     const parcel = seedParcels.find((p) => p.id === parseInt(parcelId));
175:     if (!parcel) return null;
176: 
177:     const receiver = seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId);
178:     const order = receiver
179:       ? seedOrders.find((o) => o.id === receiver.fkOrderId)
180:       : null;
181: 
182:     return {
183:       parcelId: parcel.parcel_id,
184:       orderCode: order?.orderCode || null,
185:       // Sender snapshot (from order_master at creation time)
186:       senderName: order?.senderName || null,
187:       senderMobile: order?.senderMobile || null,
188:       senderAddress: order?.senderAddress || null,
189:       // Receiver address (from receiver_details)
190:       receiverName: receiver?.receiverName || null,
191:       receiverPhone: receiver?.receiverPhone || null,
192:       addressLine1: receiver?.addressLine1 || null,
193:       addressLine2: receiver?.addressLine2 || null,
194:       city: receiver?.city || null,
195:       state: receiver?.state || null,
196:       pincode: receiver?.pincode || null,
197:       country: receiver?.country || 'India',
198:       // Parcel metadata
199:       labelPrintCount: parcel.labelPrintCount,
200:       status: parcel.parcelStatusCode
201:     };
202:   }
203: 
204:   /**
205:    * Get chronological timeline of all events for a specific parcel.
206:    * Procedure: CALL prc_receiver_status_details_get(1, ?)
207:    * Convention: pAction=1 → timeline for a specific parcel (Amazon-style).
208:    *
209:    * @param {number|string} parcelId - PkParcelDetailsId.
210:    * @returns {Promise<Array>} Chronological event timeline.
211:    */
212:   async getTimeline(parcelId) {
213:     // ------------------------------------------------------------------
214:     // LIVE DB MODE: prc_receiver_status_details_get (pAction=1)
215:     // ------------------------------------------------------------------
216:     if (process.env.USE_MOCK_DB !== 'true') {
217:       const [rows] = await db.execute('CALL prc_receiver_status_details_get(?, ?)', [
218:         1, // pAction=1 → Timeline for specific parcel
219:         parcelId
220:       ]);
221:       return rows[0];
222:     }
223: 
224:     // ------------------------------------------------------------------
225:     // MOCK MODE: In-memory timeline filtering
226:     // ------------------------------------------------------------------
227:     return seedStatusLog
228:       .filter((log) => log.fkParcelDetailsId === parseInt(parcelId))
229:       .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
230:       .map((log) => ({
231:         id: log.id,
232:         actionType: log.actionType,
233:         awbNumber: log.awbNumber,
234:         previousStatus: log.previousStatus,
235:         newStatus: log.newStatus,
236:         createdBy: log.createdBy,
237:         createdDate: log.createdDate
238:       }));
239:   }
240: 
241:   // ============================================================================
242:   // WRITE OPERATIONS (STATE TRANSITIONS)
243:   // All writes through prc_parcel_details_set internally trigger
244:   // prc_receiver_status_details_set to maintain the append-only audit trail.
245:   // ============================================================================
246: 
247:   /**
248:    * Log a label print event and transition parcel to LABEL_PRINTED.
249:    * Procedure: CALL prc_parcel_details_set(parcelId, 'LOG_PRINT', ?)
250:    * Internally: increments LabelPrintCount, transitions to LABEL_PRINTED,
251:    * appends event to receiver_status_details via prc_receiver_status_details_set.
252:    *
253:    * @param {number|string} parcelId - PkParcelDetailsId.
254:    * @param {string} employeeCode - CreatedBy for the event log.
255:    * @returns {Promise<object>} Updated parcel record.
256:    */
257:   async logPrint(parcelId, employeeCode) {
258:     // ------------------------------------------------------------------
259:     // LIVE DB MODE: prc_parcel_details_set (LOG_PRINT action)
260:     // ------------------------------------------------------------------
261:     if (process.env.USE_MOCK_DB !== 'true') {
262:       const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?)', [
263:         parcelId,
264:         'LOG_PRINT',
265:         employeeCode
266:       ]);
267:       return rows[0][0];
268:     }
269: 
270:     // ------------------------------------------------------------------
271:     // MOCK MODE: In-memory label print with audit log
272:     // ------------------------------------------------------------------
273:     const index = seedParcels.findIndex((p) => p.id === parseInt(parcelId));
274:     if (index === -1) return null;
275: 
276:     const previousStatus = seedParcels[index].parcelStatusCode;
277:     seedParcels[index].labelPrintCount += 1;
278:     seedParcels[index].parcelStatusCode = 'LABEL_PRINTED';
279: 
280:     // ✔ Append event to receiver_status_details (append-only audit trail)
281:     this._appendStatusLog(parseInt(parcelId), seedParcels[index].fkReceiverDetailsId, {
282:       actionType: 'STATUS_UPDATE',
283:       awbNumber: null,
284:       previousStatus,
285:       newStatus: 'LABEL_PRINTED',
286:       createdBy: employeeCode
287:     });
288: 
289:     return {
290:       id: seedParcels[index].id,
291:       parcelId: seedParcels[index].parcel_id,
292:       status: seedParcels[index].parcelStatusCode,
293:       labelPrintCount: seedParcels[index].labelPrintCount
294:     };
295:   }
296: 
297:   /**
298:    * Atomic two-scan operation: QR scan + AWB link.
299:    * Procedure: CALL prc_parcel_details_set(parcelId, 'SCAN_LINK_AWB', ?, ?, ?)
300:    * Internally: validates parcel_id, links AWB, transitions status,
301:    * appends event(s) to receiver_status_details.
302:    *
303:    * Role-based auto-dispatch:
304:    *   - COURIER → status jumps to DISPATCHED (stamps DispatchDate)
305:    *   - OPERATOR/ADMIN → status goes to AWB_LINKED only
306:    *
307:    * @param {string} qrCode - The parcel_id from QR scan.
308:    * @param {string} awbNumber - The AWB barcode number.
309:    * @param {string} role - User role (ADMIN, OPERATOR, COURIER).
310:    * @param {string} employeeCode - CreatedBy for the event log.
311:    * @returns {Promise<object|null>} Updated parcel, or null if not found.
312:    */
313:   async scanAndLinkAWB(qrCode, awbNumber, role, employeeCode) {
314:     // ------------------------------------------------------------------
315:     // LIVE DB MODE: prc_parcel_details_set (SCAN_LINK_AWB action)
316:     // The SP handles QR lookup, AWB uniqueness check, role-based status
317:     // transition, and audit logging internally.
318:     // ------------------------------------------------------------------
319:     if (process.env.USE_MOCK_DB !== 'true') {
320:       const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?, ?, ?)', [
321:         qrCode,       // parcel_id (QR code value)
322:         'SCAN_LINK_AWB',
323:         awbNumber,
324:         role,
325:         employeeCode
326:       ]);
327:       return rows[0][0];
328:     }
329: 
330:     // ------------------------------------------------------------------
331:     // MOCK MODE: In-memory scan + AWB link with role-based dispatch
332:     // ------------------------------------------------------------------
333:     // Find parcel by parcel_id (QR code value)
334:     const index = seedParcels.findIndex((p) => p.parcel_id === qrCode);
335:     if (index === -1) return null;
336: 
337:     const parcel = seedParcels[index];
338:     const previousStatus = parcel.parcelStatusCode;
339: 
340:     // Link AWB number
341:     seedParcels[index].trackingNo = awbNumber;
342: 
343:     // Role-based status transition (Systemflow Part 6)
344:     if (role === 'COURIER') {
345:       seedParcels[index].parcelStatusCode = 'DISPATCHED';
346:       seedParcels[index].dispatchDate = new Date();
347:     } else {
348:       seedParcels[index].parcelStatusCode = 'AWB_LINKED';
349:     }
350: 
351:     // ✔ Append AWB_LINK event to receiver_status_details
352:     this._appendStatusLog(parcel.id, parcel.fkReceiverDetailsId, {
353:       actionType: 'AWB_LINK',
354:       awbNumber,
355:       previousStatus,
356:       newStatus: seedParcels[index].parcelStatusCode,
357:       createdBy: employeeCode
358:     });
359: 
360:     return {
361:       id: seedParcels[index].id,
362:       parcelId: seedParcels[index].parcel_id,
363:       trackingNo: seedParcels[index].trackingNo,
364:       status: seedParcels[index].parcelStatusCode,
365:       dispatchDate: seedParcels[index].dispatchDate
366:     };
367:   }
368: 
369:   /**
370:    * Dispatch parcels in bulk (array of parcelIds).
371:    * Procedure: CALL prc_parcel_details_set(parcelId, 'DISPATCH', ?)
372:    * Internally: stamps DispatchDate, transitions to DISPATCHED,
373:    * appends event for each parcel to receiver_status_details.
374:    *
375:    * @param {number[]} parcelIds - Array of PkParcelDetailsId values.
376:    * @param {string} employeeCode - CreatedBy for the event log.
377:    * @returns {Promise<object>} { dispatched: number, parcels: [...] }
378:    */
379:   async dispatchParcels(parcelIds, employeeCode) {
380:     // ------------------------------------------------------------------
381:     // LIVE DB MODE: prc_parcel_details_set (DISPATCH action, per parcel)
382:     // ------------------------------------------------------------------
383:     if (process.env.USE_MOCK_DB !== 'true') {
384:       const dispatched = [];
385:       for (const pid of parcelIds) {
386:         const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?)', [
387:           pid,
388:           'DISPATCH',
389:           employeeCode
390:         ]);
391:         if (rows[0]?.[0]) dispatched.push(rows[0][0]);
392:       }
393:       return { dispatched: dispatched.length, parcels: dispatched };
394:     }
395: 
396:     // ------------------------------------------------------------------
397:     // MOCK MODE: In-memory bulk dispatch with audit logs
398:     // ------------------------------------------------------------------
399:     const dispatched = [];
400: 
401:     for (const pid of parcelIds) {
402:       const index = seedParcels.findIndex((p) => p.id === pid);
403:       if (index === -1) continue;
404: 
405:       const previousStatus = seedParcels[index].parcelStatusCode;
406:       seedParcels[index].parcelStatusCode = 'DISPATCHED';
407:       seedParcels[index].dispatchDate = new Date();
408: 
409:       // ✔ Append event to receiver_status_details
410:       this._appendStatusLog(pid, seedParcels[index].fkReceiverDetailsId, {
411:         actionType: 'STATUS_UPDATE',
412:         awbNumber: seedParcels[index].trackingNo,
413:         previousStatus,
414:         newStatus: 'DISPATCHED',
415:         createdBy: employeeCode
416:       });
417: 
418:       dispatched.push({
419:         id: seedParcels[index].id,
420:         parcelId: seedParcels[index].parcel_id,
421:         status: 'DISPATCHED',
422:         dispatchDate: seedParcels[index].dispatchDate
423:       });
424:     }
425: 
426:     return { dispatched: dispatched.length, parcels: dispatched };
427:   }
428: 
429:   /**
430:    * Update parcel to a terminal status (DELIVERED, CANCELLED, RETURNED).
431:    * Procedure: CALL prc_parcel_details_set(parcelId, statusAction, ?)
432:    * Internally: transitions status and appends event to receiver_status_details.
433:    *
434:    * @param {number|string} parcelId - PkParcelDetailsId.
435:    * @param {string} newStatus - Target terminal status.
436:    * @param {string} employeeCode - CreatedBy for the event log.
437:    * @returns {Promise<object|null>} Updated parcel, or null if not found.
438:    */
439:   async updateTerminalStatus(parcelId, newStatus, employeeCode) {
440:     // ------------------------------------------------------------------
441:     // LIVE DB MODE: prc_parcel_details_set (terminal status action)
442:     // ------------------------------------------------------------------
443:     if (process.env.USE_MOCK_DB !== 'true') {
444:       const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?)', [
445:         parcelId,
446:         newStatus, // 'DELIVERED' | 'CANCELLED' | 'RETURNED'
447:         employeeCode
448:       ]);
449:       return rows[0]?.[0] || null;
450:     }
451: 
452:     // ------------------------------------------------------------------
453:     // MOCK MODE: In-memory terminal status update with audit log
454:     // ------------------------------------------------------------------
455:     const index = seedParcels.findIndex((p) => p.id === parseInt(parcelId));
456:     if (index === -1) return null;
457: 
458:     const previousStatus = seedParcels[index].parcelStatusCode;
459:     seedParcels[index].parcelStatusCode = newStatus;
460: 
461:     // ✔ Append event to receiver_status_details
462:     this._appendStatusLog(parseInt(parcelId), seedParcels[index].fkReceiverDetailsId, {
463:       actionType: 'STATUS_UPDATE',
464:       awbNumber: seedParcels[index].trackingNo,
465:       previousStatus,
466:       newStatus,
467:       createdBy: employeeCode
468:     });
469: 
470:     return {
471:       id: seedParcels[index].id,
472:       parcelId: seedParcels[index].parcel_id,
473:       status: seedParcels[index].parcelStatusCode,
474:       previousStatus
475:     };
476:   }
477: 
478:   // ============================================================================
479:   // EVENT LOG OPERATIONS (receiver_status_details)
480:   // ============================================================================
481: 
482:   /**
483:    * Browse system-wide events from receiver_status_details (paginated, filtered).
484:    * Procedure: CALL prc_receiver_status_details_get(0, ?, ?, ?, ?, ?, ?)
485:    * Convention: pAction=0 → all events with optional filters.
486:    *
487:    * @param {object} filters - { page, limit, dateFrom, dateTo, actionType, scannedBy }
488:    * @returns {Promise<object>} { data: [...], total: number }
489:    */
490:   async browseEvents(filters = {}) {
491:     // ------------------------------------------------------------------
492:     // LIVE DB MODE: prc_receiver_status_details_get (pAction=0)
493:     // ------------------------------------------------------------------
494:     if (process.env.USE_MOCK_DB !== 'true') {
495:       const [rows] = await db.execute('CALL prc_receiver_status_details_get(?, ?, ?, ?, ?, ?, ?)', [
496:         0, // pAction=0 → Browse all events
497:         filters.page || 1,
498:         filters.limit || 50,
499:         filters.dateFrom || null,
500:         filters.dateTo || null,
501:         filters.actionType || null,
502:         filters.scannedBy || null
503:       ]);
504:       return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
505:     }
506: 
507:     // ------------------------------------------------------------------
508:     // MOCK MODE: In-memory event filtering with enrichment
509:     // ------------------------------------------------------------------
510:     let filtered = [...seedStatusLog];
511: 
512:     if (filters.actionType) {
513:       filtered = filtered.filter((e) => e.actionType === filters.actionType);
514:     }
515:     if (filters.scannedBy) {
516:       filtered = filtered.filter((e) => e.createdBy === filters.scannedBy);
517:     }
518:     if (filters.dateFrom) {
519:       const from = new Date(filters.dateFrom);
520:       filtered = filtered.filter((e) => new Date(e.createdDate) >= from);
521:     }
522:     if (filters.dateTo) {
523:       const to = new Date(filters.dateTo);
524:       filtered = filtered.filter((e) => new Date(e.createdDate) <= to);
525:     }
526: 
527:     // Enrich with parcel_id and orderCode for display
528:     const enriched = filtered.map((log) => {
529:       const parcel = seedParcels.find((p) => p.id === log.fkParcelDetailsId);
530:       const receiver = parcel
531:         ? seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId)
532:         : null;
533:       const order = receiver
534:         ? seedOrders.find((o) => o.id === receiver.fkOrderId)
535:         : null;
536: 
537:       return {
538:         id: log.id,
539:         parcelId: parcel?.parcel_id || null,
540:         orderCode: order?.orderCode || null,
541:         actionType: log.actionType,
542:         awbNumber: log.awbNumber,
543:         previousStatus: log.previousStatus,
544:         newStatus: log.newStatus,
545:         scannedBy: log.createdBy,
546:         timestamp: log.createdDate
547:       };
548:     });
549: 
550:     return { data: enriched, total: enriched.length };
551:   }
552: 
553:   /**
554:    * Check if an AWB number already exists for duplicate detection.
555:    * MOCK MODE ONLY — in live mode, the SP handles this check internally.
556:    *
557:    * @param {string} awbNumber - The AWB number to check.
558:    * @returns {boolean} True if AWB already linked to a parcel.
559:    */
560:   checkDuplicateAWB(awbNumber) {
561:     return seedParcels.some(
562:       (p) => p.trackingNo && p.trackingNo === awbNumber
563:     );
564:   }
565: 
566:   /**
567:    * Find a parcel by its parcel_id (QR code value).
568:    * MOCK MODE ONLY — in live mode, the SP resolves QR internally.
569:    *
570:    * @param {string} qrCode - The parcel_id string.
571:    * @returns {object|null} Raw parcel seed data, or null.
572:    */
573:   findByQRCode(qrCode) {
574:     return seedParcels.find((p) => p.parcel_id === qrCode) || null;
575:   }
576: 
577:   // ============================================================================
578:   // INTERNAL HELPERS (MOCK MODE ONLY)
579:   // ============================================================================
580: 
581:   /**
582:    * Appends an event to the mock receiver_status_details log.
583:    * In production, this is handled internally by prc_parcel_details_set
584:    * calling prc_receiver_status_details_set.
585:    *
586:    * @param {number} fkParcelDetailsId
587:    * @param {number} fkReceiverDetailsId
588:    * @param {object} eventData - { actionType, awbNumber, previousStatus, newStatus, createdBy }
589:    * @private
590:    */
591:   _appendStatusLog(fkParcelDetailsId, fkReceiverDetailsId, eventData) {
592:     seedStatusLog.push({
593:       id: seedStatusLog.length + 1,
594:       fkParcelDetailsId,
595:       fkReceiverDetailsId,
596:       actionType: eventData.actionType,
597:       awbNumber: eventData.awbNumber || null,
598:       previousStatus: eventData.previousStatus || null,
599:       newStatus: eventData.newStatus,
600:       createdBy: eventData.createdBy,
601:       createdDate: new Date()
602:     });
603:   }
604: }
605: 
606: export default new ParcelRepository();
````

## File: src/modules/product/product.repository.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/product/product.repository.js
  3: // Description: Data access layer for Products.
  4: //
  5: // Dual-Mode: Controlled by USE_MOCK_DB environment variable.
  6: //   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
  7: //   - USE_MOCK_DB=false → Live MySQL stored procedures
  8: //
  9: // SP Convention (api_procedure_spec_v1.md):
 10: //   - Reads:   prc_product_master_get (pAction=0 list, pAction=1 specific)
 11: //   - Upserts: prc_product_master_set (PkProductId=0 insert, >0 update, IsActive=0 delete)
 12: // ============================================================================
 13: 
 14: import db from '../../infrastructure/database/db.js';
 15: 
 16: // ============================================================================
 17: // MOCK MODE: In-Memory Seed Data
 18: // Used when USE_MOCK_DB=true for frontend development without a live database.
 19: // ============================================================================
 20: let seedProducts = [];
 21: 
 22: const initializeSeedData = () => {
 23:   seedProducts = [
 24:     {
 25:       PkProductId: 1,
 26:       MaterialName: 'Cotton Shirt',
 27:       MaterialRate: 450.00,
 28:       cu_item_code: 'CS-001',
 29:       MaterialDescription: null,
 30:       FkProductCategoryId: null,
 31:       FkUnitId: null,
 32:       IsActive: true,
 33:       CreatedDate: new Date().toISOString()
 34:     },
 35:     {
 36:       PkProductId: 2,
 37:       MaterialName: 'Denim Jeans',
 38:       MaterialRate: 1200.00,
 39:       cu_item_code: 'DJ-002',
 40:       MaterialDescription: null,
 41:       FkProductCategoryId: null,
 42:       FkUnitId: null,
 43:       IsActive: true,
 44:       CreatedDate: new Date().toISOString()
 45:     }
 46:   ];
 47: };
 48: 
 49: initializeSeedData();
 50: 
 51: class ProductRepository {
 52:   /**
 53:    * Fetches a paginated list of products with optional search.
 54:    * Procedure: CALL prc_product_master_get(?, ?, ?, ?)
 55:    * Convention: pAction=0 → paginated list.
 56:    *
 57:    * @param {number} page - Page number.
 58:    * @param {number} limit - Results per page.
 59:    * @param {string} search - Optional search term.
 60:    * @returns {Promise<object>} { data: [...], total: number }
 61:    */
 62:   async findAll(page = 1, limit = 20, search = '') {
 63:     // ------------------------------------------------------------------
 64:     // LIVE DB MODE: prc_product_master_get (pAction=0)
 65:     // ------------------------------------------------------------------
 66:     if (process.env.USE_MOCK_DB !== 'true') {
 67:       const [rows] = await db.execute('CALL prc_product_master_get(?, ?, ?, ?)', [
 68:         0, // pAction=0 → Get all products (paginated)
 69:         page,
 70:         limit,
 71:         search || null
 72:       ]);
 73:       return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
 74:     }
 75: 
 76:     // ------------------------------------------------------------------
 77:     // MOCK MODE: In-memory filtering
 78:     // ------------------------------------------------------------------
 79:     const activeProducts = seedProducts.filter(p => p.IsActive);
 80:     let filtered = activeProducts;
 81: 
 82:     if (search) {
 83:       filtered = filtered.filter(p =>
 84:         p.MaterialName.toLowerCase().includes(search.toLowerCase()) ||
 85:         (p.cu_item_code && p.cu_item_code.toLowerCase().includes(search.toLowerCase()))
 86:       );
 87:     }
 88: 
 89:     return {
 90:       data: filtered,
 91:       total: filtered.length
 92:     };
 93:   }
 94: 
 95:   /**
 96:    * Fetches a product by ID.
 97:    * Procedure: CALL prc_product_master_get(?, ?)
 98:    * Convention: pAction=1 → specific record.
 99:    *
100:    * @param {number|string} id - PkProductId.
101:    * @returns {Promise<object|null>} Product record or null.
102:    */
103:   async findById(id) {
104:     // ------------------------------------------------------------------
105:     // LIVE DB MODE: prc_product_master_get (pAction=1)
106:     // ------------------------------------------------------------------
107:     if (process.env.USE_MOCK_DB !== 'true') {
108:       const [rows] = await db.execute('CALL prc_product_master_get(?, ?)', [1, id]);
109:       return rows[0]?.[0] || null;
110:     }
111: 
112:     // ------------------------------------------------------------------
113:     // MOCK MODE: In-memory lookup by PkProductId
114:     // ------------------------------------------------------------------
115:     const product = seedProducts.find((p) => p.PkProductId.toString() === id.toString() && p.IsActive);
116:     return product || null;
117:   }
118: 
119:   /**
120:    * Creates a new product.
121:    * Procedure: CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)
122:    * Convention: PkProductId=0 triggers insert. No pAction on _set calls.
123:    *
124:    * @param {object} productData - Product fields.
125:    * @returns {Promise<object>} The newly created product record.
126:    */
127:   async create(productData) {
128:     // ------------------------------------------------------------------
129:     // LIVE DB MODE: prc_product_master_set (PkProductId=0 → Insert)
130:     // ------------------------------------------------------------------
131:     if (process.env.USE_MOCK_DB !== 'true') {
132:       const [rows] = await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
133:         0, // PkProductId=0 → Insert new product
134:         productData.FkProductCategoryId || productData.categoryId || null,
135:         productData.FkUnitId || productData.unitId || null,
136:         productData.MaterialCode || productData.materialCode || null,
137:         productData.MaterialName || productData.materialName,
138:         productData.cu_item_code || productData.cuItemCode || null,
139:         productData.MaterialRate || productData.materialRate,
140:         productData.MaterialDescription || productData.description || null
141:       ]);
142:       return rows[0]?.[0];
143:     }
144: 
145:     // ------------------------------------------------------------------
146:     // MOCK MODE: In-memory push
147:     // ------------------------------------------------------------------
148:     const newId = seedProducts.length > 0 ? Math.max(...seedProducts.map(p => p.PkProductId)) + 1 : 1;
149:     const newProduct = {
150:       PkProductId: newId,
151:       MaterialName: productData.MaterialName || productData.materialName,
152:       MaterialRate: parseFloat(productData.MaterialRate || productData.materialRate),
153:       cu_item_code: productData.cu_item_code || productData.cuItemCode || null,
154:       MaterialDescription: productData.MaterialDescription || productData.description || null,
155:       IsActive: true,
156:       CreatedDate: new Date().toISOString()
157:     };
158: 
159:     seedProducts.push(newProduct);
160:     return newProduct;
161:   }
162: 
163:   /**
164:    * Updates an existing product.
165:    * Procedure: CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)
166:    * Convention: PkProductId>0 triggers update. No pAction on _set calls.
167:    *
168:    * @param {number|string} id - PkProductId.
169:    * @param {object} updates - Fields to update.
170:    * @returns {Promise<object|null>} Updated product record or null.
171:    */
172:   async update(id, updates) {
173:     // ------------------------------------------------------------------
174:     // LIVE DB MODE: prc_product_master_set (PkProductId>0 → Update)
175:     // ------------------------------------------------------------------
176:     if (process.env.USE_MOCK_DB !== 'true') {
177:       const [rows] = await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
178:         id, // PkProductId>0 → Update existing product
179:         updates.FkProductCategoryId || updates.categoryId || null,
180:         updates.FkUnitId || updates.unitId || null,
181:         updates.MaterialCode || updates.materialCode || null,
182:         updates.MaterialName || updates.materialName || null,
183:         updates.cu_item_code || updates.cuItemCode || null,
184:         updates.MaterialRate || updates.materialRate || null,
185:         updates.MaterialDescription || updates.description || null
186:       ]);
187:       return rows[0]?.[0] || null;
188:     }
189: 
190:     // ------------------------------------------------------------------
191:     // MOCK MODE: In-memory update
192:     // ------------------------------------------------------------------
193:     const index = seedProducts.findIndex(p => p.PkProductId.toString() === id.toString() && p.IsActive);
194:     if (index === -1) return null;
195: 
196:     if (updates.MaterialName || updates.materialName) {
197:       seedProducts[index].MaterialName = updates.MaterialName || updates.materialName;
198:     }
199:     if (updates.MaterialRate || updates.materialRate) {
200:       seedProducts[index].MaterialRate = parseFloat(updates.MaterialRate || updates.materialRate);
201:     }
202:     if (updates.cu_item_code || updates.cuItemCode) {
203:       seedProducts[index].cu_item_code = updates.cu_item_code || updates.cuItemCode;
204:     }
205: 
206:     return seedProducts[index];
207:   }
208: 
209:   /**
210:    * Soft-deletes a product (sets IsActive=0).
211:    * Procedure: CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)
212:    * Convention: Pass IsActive=0 for soft-delete. No pAction on _set calls.
213:    *
214:    * @param {number|string} id - PkProductId.
215:    * @returns {Promise<boolean>} True if deleted, false if not found.
216:    */
217:   async delete(id) {
218:     // ------------------------------------------------------------------
219:     // LIVE DB MODE: prc_product_master_set (IsActive=0 → Soft Delete)
220:     // Note: We pass the ID and set IsActive=0. The SP handles the rest.
221:     // ------------------------------------------------------------------
222:     if (process.env.USE_MOCK_DB !== 'true') {
223:       await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
224:         id,
225:         null, null, null, null, null, null, // No field changes
226:         0     // IsActive=0 — soft delete marker (passed as last param)
227:       ]);
228:       return true;
229:     }
230: 
231:     // ------------------------------------------------------------------
232:     // MOCK MODE: In-memory soft delete
233:     // ------------------------------------------------------------------
234:     const index = seedProducts.findIndex(p => p.PkProductId.toString() === id.toString() && p.IsActive);
235:     if (index === -1) return false;
236: 
237:     seedProducts[index].IsActive = false;
238:     return true;
239:   }
240: }
241: 
242: export default new ProductRepository();
````

## File: src/modules/product/product.service.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/product/product.service.js
  3: // Description: Business logic layer for Products Master Data.
  4: //
  5: // Dual-Mode Mapping: Handles both mock field names and DB column names.
  6: //   - Mock/DB: { PkProductId, MaterialName, MaterialRate, cu_item_code }
  7: //   - API:     { id, productName, materialRate, cuItemCode }
  8: // ============================================================================
  9: 
 10: import productRepository from './product.repository.js';
 11: 
 12: class ProductService {
 13: 
 14:   /**
 15:    * Internal mapper to format DB/mock results for the API layer.
 16:    * Handles both DB column names and legacy mock field names gracefully.
 17:    *
 18:    * @param {object} product - Raw product record from repository.
 19:    * @returns {object|null} API-formatted product object.
 20:    */
 21:   _mapToApi(product) {
 22:     if (!product) return null;
 23:     return {
 24:       id: product.PkProductId || product.id,
 25:       productName: product.MaterialName || product.materialName,
 26:       materialRate: product.MaterialRate || product.materialRate,
 27:       cuItemCode: product.cu_item_code || product.cuItemCode,
 28:       description: product.MaterialDescription || product.description || null,
 29:       categoryId: product.FkProductCategoryId || product.categoryId || null,
 30:       unitId: product.FkUnitId || product.unitId || null,
 31:       isActive: product.IsActive !== undefined ? product.IsActive : product.isActive,
 32:       createdAt: product.CreatedDate || product.createdAt
 33:     };
 34:   }
 35: 
 36:   /**
 37:    * Internal mapper to format API payloads for the Repository layer.
 38:    * Translates API field names to DB-native column names.
 39:    *
 40:    * @param {object} apiData - API payload.
 41:    * @returns {object} Repository-formatted object.
 42:    */
 43:   _mapToInternal(apiData) {
 44:     const internal = {};
 45:     if (apiData.productName) internal.MaterialName = apiData.productName;
 46:     if (apiData.materialName) internal.MaterialName = apiData.materialName;
 47:     if (apiData.materialRate !== undefined) internal.MaterialRate = apiData.materialRate;
 48:     if (apiData.cuItemCode) internal.cu_item_code = apiData.cuItemCode;
 49:     if (apiData.description) internal.MaterialDescription = apiData.description;
 50:     if (apiData.categoryId) internal.FkProductCategoryId = apiData.categoryId;
 51:     if (apiData.unitId) internal.FkUnitId = apiData.unitId;
 52:     return internal;
 53:   }
 54: 
 55:   async getProducts(page = 1, limit = 20, search = '') {
 56:     const { data, total } = await productRepository.findAll(page, limit, search);
 57:     return {
 58:       data: data.map(p => this._mapToApi(p)),
 59:       total
 60:     };
 61:   }
 62: 
 63:   async getProductById(id) {
 64:     const product = await productRepository.findById(id);
 65:     if (!product) {
 66:       const error = new Error('Product not found');
 67:       error.statusCode = 404;
 68:       throw error;
 69:     }
 70:     return this._mapToApi(product);
 71:   }
 72: 
 73:   async createProduct(productData) {
 74:     const internalData = this._mapToInternal(productData);
 75: 
 76:     if (!internalData.MaterialName || internalData.MaterialRate === undefined) {
 77:       const error = new Error('Product Name and Material Rate are required');
 78:       error.statusCode = 400;
 79:       throw error;
 80:     }
 81: 
 82:     if (isNaN(parseFloat(internalData.MaterialRate)) || parseFloat(internalData.MaterialRate) < 0) {
 83:       const error = new Error('Material rate must be a valid positive number');
 84:       error.statusCode = 400;
 85:       throw error;
 86:     }
 87: 
 88:     const newProduct = await productRepository.create(internalData);
 89:     return this._mapToApi(newProduct);
 90:   }
 91: 
 92:   async updateProduct(id, updates) {
 93:     // Ensure product exists
 94:     await this.getProductById(id);
 95: 
 96:     const internalUpdates = this._mapToInternal(updates);
 97: 
 98:     if (internalUpdates.MaterialRate !== undefined) {
 99:       if (isNaN(parseFloat(internalUpdates.MaterialRate)) || parseFloat(internalUpdates.MaterialRate) < 0) {
100:         const error = new Error('Material rate must be a valid positive number');
101:         error.statusCode = 400;
102:         throw error;
103:       }
104:     }
105: 
106:     const updatedProduct = await productRepository.update(id, internalUpdates);
107:     return this._mapToApi(updatedProduct);
108:   }
109: 
110:   async deleteProduct(id) {
111:     // Ensure product exists
112:     await this.getProductById(id);
113: 
114:     // In production, verify product isn't linked to active orders before deleting.
115: 
116:     const success = await productRepository.delete(id);
117:     if (!success) {
118:       const error = new Error('Failed to delete product');
119:       error.statusCode = 500;
120:       throw error;
121:     }
122: 
123:     return true;
124:   }
125: }
126: 
127: export default new ProductService();
````

## File: src/modules/sender/sender.repository.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/sender/sender.repository.js
  3: // Description: Data access layer for Senders (Parties), using stored procedures.
  4: //
  5: // Dual-Mode: Controlled by USE_MOCK_DB environment variable.
  6: //   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
  7: //   - USE_MOCK_DB=false → Live MySQL stored procedures
  8: //
  9: // SP Convention:
 10: //   - Upsert: prc_Party_master_set (ID=0 insert, >0 update, IsActive=0 delete)
 11: //   - Read:   prc_Party_master_get (pAction=0 list, 1 by-id, 2 by-phone)
 12: // ============================================================================
 13: 
 14: import db from '../../infrastructure/database/db.js';
 15: 
 16: // ============================================================================
 17: // MOCK MODE: In-Memory Seed Data
 18: // Used when USE_MOCK_DB=true for frontend development without a live database.
 19: // ============================================================================
 20: let mockSenders = [
 21:   {
 22:     PkPartyId: 1,
 23:     PartyTypeId: 1,
 24:     CustomerName: 'John Doe',
 25:     PhoneNo: '9876543210',
 26:     EmailId: 'john@example.com',
 27:     AddressLine1: '123 Test Street',
 28:     AddressLine2: null,
 29:     City: 'Mumbai',
 30:     State: 'Maharashtra',
 31:     Pincode: '400001',
 32:     IsActive: 1,
 33:     CreatedDate: '2026-04-03T08:52:00Z'
 34:   },
 35:   {
 36:     PkPartyId: 2,
 37:     PartyTypeId: 1,
 38:     CustomerName: 'Jane Smith',
 39:     PhoneNo: '9876543211',
 40:     EmailId: 'jane@example.com',
 41:     AddressLine1: '456 Sample Road',
 42:     AddressLine2: null,
 43:     City: 'Delhi',
 44:     State: 'Delhi',
 45:     Pincode: '110001',
 46:     IsActive: 1,
 47:     CreatedDate: '2026-04-03T08:52:00Z'
 48:   }
 49: ];
 50: 
 51: class SenderRepository {
 52:   /**
 53:    * Upsert a sender (Create or Update).
 54:    * Procedure: CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
 55:    * 
 56:    * @param {number} pPartyId - 0 for Insert, >0 for Update
 57:    * @param {object} pData - Sender details
 58:    * @param {number} pIsActive - 1 for Active, 0 for Soft-Delete
 59:    * @param {string} pCreatedBy - EmployeeCode or username
 60:    * @returns {Promise<object>} The operation result.
 61:    */
 62:   async upsert(pPartyId, pData, pIsActive = 1, pCreatedBy = 'SYSTEM') {
 63:     // ------------------------------------------------------------------
 64:     // LIVE DB MODE: prc_Party_master_set
 65:     // ------------------------------------------------------------------
 66:     if (process.env.USE_MOCK_DB !== 'true') {
 67:       const [rows] = await db.execute(
 68:         'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
 69:         [
 70:           pPartyId,
 71:           1, // pPartyTypeId: 1 = Sender
 72:           pData.customerName || null,
 73:           pData.phoneNo || null,
 74:           pData.emailId || null,
 75:           pData.addressLine1 || null,
 76:           pData.addressLine2 || null,
 77:           pData.city || null,
 78:           pData.state || null,
 79:           pData.pincode || null,
 80:           pCreatedBy,
 81:           pIsActive
 82:         ]
 83:       );
 84:       return rows[0][0];
 85:     }
 86: 
 87:     // ------------------------------------------------------------------
 88:     // MOCK MODE: In-memory upsert
 89:     // ------------------------------------------------------------------
 90:     if (pPartyId === 0) {
 91:       // Insert
 92:       const newId = mockSenders.length > 0 ? Math.max(...mockSenders.map(s => s.PkPartyId)) + 1 : 1;
 93:       const newSender = {
 94:         PkPartyId: newId,
 95:         PartyTypeId: 1,
 96:         CustomerName: pData.customerName,
 97:         PhoneNo: pData.phoneNo,
 98:         EmailId: pData.emailId || null,
 99:         AddressLine1: pData.addressLine1 || null,
100:         AddressLine2: pData.addressLine2 || null,
101:         City: pData.city || null,
102:         State: pData.state || null,
103:         Pincode: pData.pincode || null,
104:         IsActive: pIsActive,
105:         CreatedDate: new Date().toISOString()
106:       };
107:       mockSenders.push(newSender);
108:       return newSender;
109:     }
110: 
111:     // Update
112:     const index = mockSenders.findIndex(s => s.PkPartyId === pPartyId);
113:     if (index === -1) return null;
114:     mockSenders[index] = { ...mockSenders[index], ...pData, IsActive: pIsActive };
115:     return mockSenders[index];
116:   }
117: 
118:   /**
119:    * Get all active senders.
120:    * Procedure: CALL prc_Party_master_get(?, ?, ?)
121:    * 
122:    * @returns {Promise<Array>} List of senders.
123:    */
124:   async findAll() {
125:     // ------------------------------------------------------------------
126:     // LIVE DB MODE: prc_Party_master_get (pAction=0)
127:     // ------------------------------------------------------------------
128:     if (process.env.USE_MOCK_DB !== 'true') {
129:       const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [0, 0, null]);
130:       return rows[0];
131:     }
132: 
133:     // ------------------------------------------------------------------
134:     // MOCK MODE: In-memory list
135:     // ------------------------------------------------------------------
136:     return mockSenders.filter(s => s.IsActive === 1);
137:   }
138: 
139:   /**
140:    * Get specific sender by ID.
141:    * Procedure: CALL prc_Party_master_get(?, ?, ?)
142:    * 
143:    * @param {number} id - Party ID
144:    * @returns {Promise<object|null>} Sender record or null.
145:    */
146:   async findById(id) {
147:     // ------------------------------------------------------------------
148:     // LIVE DB MODE: prc_Party_master_get (pAction=1)
149:     // ------------------------------------------------------------------
150:     if (process.env.USE_MOCK_DB !== 'true') {
151:       const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [1, id, null]);
152:       return rows[0][0] || null;
153:     }
154: 
155:     // ------------------------------------------------------------------
156:     // MOCK MODE: In-memory lookup
157:     // ------------------------------------------------------------------
158:     return mockSenders.find(s => s.PkPartyId === parseInt(id) && s.IsActive === 1) || null;
159:   }
160: 
161:   /**
162:    * Lookup sender by phone number.
163:    * Procedure: CALL prc_Party_master_get(?, ?, ?)
164:    * 
165:    * @param {string} phone - Phone number
166:    * @returns {Promise<object|null>} Sender record or null.
167:    */
168:   async findByPhone(phone) {
169:     // ------------------------------------------------------------------
170:     // LIVE DB MODE: prc_Party_master_get (pAction=2)
171:     // ------------------------------------------------------------------
172:     if (process.env.USE_MOCK_DB !== 'true') {
173:       const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [2, 0, phone]);
174:       return rows[0][0] || null;
175:     }
176: 
177:     // ------------------------------------------------------------------
178:     // MOCK MODE: In-memory lookup by phone
179:     // ------------------------------------------------------------------
180:     return mockSenders.find(s => s.PhoneNo === phone && s.IsActive === 1) || null;
181:   }
182: }
183: 
184: export default new SenderRepository();
````

## File: src/modules/sender/sender.service.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/sender/sender.service.js
  3: // Description: Business logic layer for Senders (Parties).
  4: // ============================================================================
  5: 
  6: import senderRepository from './sender.repository.js';
  7: 
  8: class SenderService {
  9:   _mapToApi(sender) {
 10:     if (!sender) return null;
 11:     return {
 12:       id: sender.PkPartyId,
 13:       customerName: sender.CustomerName,
 14:       phoneNo: sender.PhoneNo,
 15:       emailId: sender.EmailId,
 16:       addressLine1: sender.AddressLine1,
 17:       addressLine2: sender.AddressLine2,
 18:       city: sender.City,
 19:       state: sender.State,
 20:       pincode: sender.Pincode,
 21:       isActive: sender.IsActive === 1 || sender.IsActive === true,
 22:       createdAt: sender.CreatedDate
 23:     };
 24:   }
 25: 
 26:   /**
 27:    * Retrieves all active senders.
 28:    * @returns {Promise<Array>}
 29:    */
 30:   async getSenders() {
 31:     const senders = await senderRepository.findAll();
 32:     return senders.map(s => this._mapToApi(s));
 33:   }
 34: 
 35:   /**
 36:    * Retrieves a specific sender by ID.
 37:    * @param {number|string} id 
 38:    * @returns {Promise<object>}
 39:    */
 40:   async getSenderById(id) {
 41:     const sender = await senderRepository.findById(id);
 42:     if (!sender) {
 43:       const error = new Error('Sender not found');
 44:       error.statusCode = 404;
 45:       throw error;
 46:     }
 47:     return this._mapToApi(sender);
 48:   }
 49: 
 50:   /**
 51:    * Creates a new sender.
 52:    * @param {object} senderData 
 53:    * @returns {Promise<object>}
 54:    */
 55:   async createSender(senderData) {
 56:     // Note: pPartyId = 0 for Insert
 57:     const result = await senderRepository.upsert(0, senderData);
 58:     return this._mapToApi(result);
 59:   }
 60: 
 61:   /**
 62:    * Updates an existing sender.
 63:    * @param {number|string} id 
 64:    * @param {object} senderData 
 65:    * @returns {Promise<object>}
 66:    */
 67:   async updateSender(id, senderData) {
 68:     // Verify existence first
 69:     await this.getSenderById(id);
 70:     
 71:     // Note: pPartyId = id for Update
 72:     const result = await senderRepository.upsert(id, senderData);
 73:     return this._mapToApi(result);
 74:   }
 75: 
 76:   /**
 77:    * Soft-deletes a sender.
 78:    * @param {number|string} id 
 79:    * @returns {Promise<object>}
 80:    */
 81:   async deleteSender(id) {
 82:     // Verify existence first
 83:     await this.getSenderById(id);
 84:     
 85:     // Note: pIsActive = 0 for Soft-Delete
 86:     const result = await senderRepository.upsert(id, {}, 0);
 87:     return true; // usually delete returns a truthy value or success message
 88:   }
 89: 
 90:   /**
 91:    * Looks up a sender by phone number.
 92:    * Useful for frontend auto-fill or duplicate checks.
 93:    * @param {string} phone 
 94:    * @returns {Promise<object|null>}
 95:    */
 96:   async lookupByPhone(phone) {
 97:     if (!phone) {
 98:       const error = new Error('Phone number is required for lookup');
 99:       error.statusCode = 400;
100:       throw error;
101:     }
102:     const sender = await senderRepository.findByPhone(phone);
103:     return this._mapToApi(sender);
104:   }
105: }
106: 
107: export default new SenderService();
````

## File: src/shared/middleware/validate.middleware.js
````javascript
 1: // ============================================================================
 2: // File: src/shared/middleware/validate.middleware.js
 3: // Description: Unifies Zod validation for all incoming requests.
 4: // Extracts validation errors into a clean string to match standard API envelope.
 5: // ============================================================================
 6: 
 7: export const validate = (schema) => (req, res, next) => {
 8:   try {
 9:     req.body = schema.parse(req.body); // Validates and parses (handles types/defaults)
10:     next();
11:   } catch (error) {
12:     if (error.name === 'ZodError') {
13:       // Zod 3.24+ uses `.issues`; older versions used `.errors`.
14:       const zodIssues = error.issues || error.errors || [];
15:       const errorMsg = zodIssues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
16:       return res.status(400).json({ success: false, error: `Validation Error - ${errorMsg}` });
17:     }
18:     return res.status(400).json({ success: false, error: 'Bad Request Payload' });
19:   }
20: };
````

## File: src/server.js
````javascript
 1: import dotenv from 'dotenv';
 2: import app from './app.js'; // Don't forget the .js extension!
 3: 
 4: // Load environment variables immediately
 5: dotenv.config();
 6: 
 7: const PORT = process.env.PORT || 5000;
 8: 
 9: app.listen(PORT, () => {
10:   console.log(`Server running on port ${PORT}`);
11: });
````

## File: test_data/Auth_Test_Data.txt
````
 1: # Auth Test Data
 2: 
 3: ## POST /api/v1/auth/login
 4: Method: POST
 5: URL: /api/v1/auth/login
 6: Headers: { "Content-Type": "application/json" }
 7: Payload:
 8: {
 9:   "email": "admin@example.com",
10:   "password": "securePass123"
11: }
12: 
13: Post-Request Script / Assertions:
14: 1. Status code is 200
15: 2. res.body.success is true
16: 3. Store res.body.data.token as {{authToken}}
17: 
18: ## GET /api/v1/auth/profile
19: Method: GET
20: URL: /api/v1/auth/profile
21: Headers: { "Authorization": "Bearer {{authToken}}" }
22: 
23: Post-Request Script / Assertions:
24: 1. Status code is 200
25: 2. res.body.success is true
26: 3. res.body.data contains profile details (employeeCode, roleCode)
27: 4. res.body.data.firstName is a string
````

## File: test_data/BulkUpload_Test_Data.txt
````
 1: ### 1. Submit Bulk Upload
 2: METHOD: POST
 3: URL: {{baseUrl}}/bulk-uploads
 4: HEADERS:
 5:   Authorization: Bearer {{token}}
 6:   Content-Type: application/json
 7: BODY:
 8: {
 9:   "fileName": "test_orders.json",
10:   "rows": [
11:     {
12:       "senderName": "Bulk Sender One",
13:       "senderMobile": "9000000001",
14:       "senderAddress": "123 Bulk Road, Surat",
15:       "courierId": 1,
16:       "receivers": [
17:         {
18:           "receiverName": "Bulk Receiver Alpha",
19:           "receiverPhone": "8000000001",
20:           "addressLine1": "A-101, Alpha Towers",
21:           "city": "Mumbai",
22:           "state": "Maharashtra",
23:           "pincode": "400001",
24:           "products": [
25:             { "productId": 1, "qty": 10, "unitPrice": 450.00 }
26:           ]
27:         }
28:       ]
29:     },
30:     {
31:       "senderName": "Bulk Sender Two",
32:       "senderMobile": "9000000002",
33:       "senderAddress": "456 Bulk Ave, Delhi",
34:       "courierId": 1,
35:       "receivers": [
36:         {
37:           "receiverName": "Bulk Receiver Beta",
38:           "receiverPhone": "8000000002",
39:           "addressLine1": "B-202, Beta Plaza",
40:           "city": "New Delhi",
41:           "state": "Delhi",
42:           "pincode": "110001",
43:           "products": [
44:             { "productId": 2, "qty": 5, "unitPrice": 1200.00 }
45:           ]
46:         }
47:       ]
48:     }
49:   ]
50: }
51: 
52: ### 2. List Upload Sessions
53: METHOD: GET
54: URL: {{baseUrl}}/bulk-uploads
55: HEADERS:
56:   Authorization: Bearer {{token}}
57: ASSERTIONS:
58:   res.status: eq 200
59:   res.body.success: eq true
60:   res.body.data[0].fileName: isString true
61:   res.body.data[0].totalRows: isNumber true
62: 
63: ### 3. Get Specific Session Result
64: METHOD: GET
65: URL: {{baseUrl}}/bulk-uploads/:id
66: HEADERS:
67:   Authorization: Bearer {{token}}
68: ASSERTIONS:
69:   res.status: eq 200
70:   res.body.success: eq true
71:   res.body.data.session.fileName: isString true
72:   res.body.data.details: isArray true
````

## File: test_data/Courier_Test_Data.txt
````
 1: # Courier Test Data
 2: 
 3: ## GET /api/v1/courier-partners
 4: Method: GET
 5: URL: /api/v1/courier-partners
 6: Headers: { "Authorization": "Bearer {{authToken}}" }
 7: Assertions:
 8: 1. res.status is 200
 9: 2. res.body.success is true
10: 3. res.body.data[0].courierName exists
11: 4. res.body.data[0].trackingUrlTemplate exists
12: 
13: ## POST /api/v1/courier-partners
14: Method: POST
15: URL: /api/v1/courier-partners
16: Headers: { "Authorization": "Bearer {{authToken}}", "Content-Type": "application/json" }
17: Payload:
18: {
19:   "courierName": "Speedy Express",
20:   "phoneNo": "1234567890",
21:   "trackingUrlTemplate": "https://speedy.express/track?awb={AWB}"
22: }
23: Assertions:
24: 1. res.status is 200
25: 2. res.body.success is true
26: 3. res.body.data.courierName is "Speedy Express"
27: 
28: ## PUT /api/v1/courier-partners/:id
29: Method: PUT
30: URL: /api/v1/courier-partners/1
31: Headers: { "Authorization": "Bearer {{authToken}}", "Content-Type": "application/json" }
32: Payload:
33: {
34:   "courierName": "Speedy Express Premium"
35: }
36: Assertions:
37: 1. Status code is 200
38: 
39: ## DELETE /api/v1/courier-partners/:id
40: Method: DELETE
41: URL: /api/v1/courier-partners/1
42: Headers: { "Authorization": "Bearer {{authToken}}" }
43: Assertions:
44: 1. Status code is 200
````

## File: test_data/Dashboard_Test_Data.txt
````
 1: ### FEATURE: Dashboard Metrics
 2: ### MODULE: dashboard
 3: ### SPRINT: 7
 4: 
 5: ---
 6: 
 7: ### TEST 1: Get Metrics (ADMIN User)
 8: **Description:** Fetches system-wide metrics from DB.
 9: **HTTP Method:** GET
10: **URL:** {{baseUrl}}/api/v1/dashboard/metrics
11: **Headers:** 
12: - Authorization: Bearer {{adminToken}}
13: - Content-Type: application/json
14: 
15: **Assertions:**
16: - Status Code: 200
17: - Success: true
18: - Body Path `data`: exists
19: - Body Path `data.totalOrders`: is a number
20: - Body Path `data.totalParcels`: is a number
21: 
22: ---
23: 
24: ### TEST 2: Get Metrics (OPERATOR User - Forbidden)
25: **Description:** Should fail with 403.
26: **HTTP Method:** GET
27: **URL:** {{baseUrl}}/api/v1/dashboard/metrics
28: **Headers:** 
29: - Authorization: Bearer {{operatorToken}}
30: - Content-Type: application/json
31: 
32: **Assertions:**
33: - Status Code: 403
34: - Success: false
35: - Error: contains "is not authorized for this route"
36: 
37: ---
38: 
39: ### TEST 3: Get Metrics (Unauthenticated)
40: **Description:** Should fail with 401.
41: **HTTP Method:** GET
42: **URL:** {{baseUrl}}/api/v1/dashboard/metrics
43: **Headers:** 
44: - Content-Type: application/json
45: 
46: **Assertions:**
47: - Status Code: 401
48: - Success: false
````

## File: test_data/Employee_Test_Data.txt
````
 1: # Employee Test Data
 2: 
 3: ## GET /api/v1/employees
 4: Method: GET
 5: URL: /api/v1/employees
 6: Headers: { "Authorization": "Bearer {{authToken}}" }
 7: Assertions:
 8: 1. Status code is 200
 9: 2. res.body.success is true
10: 
11: ## POST /api/v1/employees
12: Method: POST
13: URL: /api/v1/employees
14: Headers: { "Authorization": "Bearer {{authToken}}", "Content-Type": "application/json" }
15: Payload:
16: {
17:   "employeeName": "John Doe",
18:   "email": "john@example.com",
19:   "phoneNo": "9000000000",
20:   "roleCode": "OPERATOR",
21:   "password": "password123"
22: }
23: Assertions:
24: 1. Status code is 200 or 201
25: 2. res.body.success is true
26: 3. res.body.data.employeeName is "John Doe"
27: 
28: ## PUT /api/v1/employees/:id
29: Method: PUT
30: URL: /api/v1/employees/1
31: Headers: { "Authorization": "Bearer {{authToken}}", "Content-Type": "application/json" }
32: Payload:
33: {
34:   "employeeName": "John Doe Updated"
35: }
36: Assertions:
37: 1. Status code is 200
38: 2. res.body.success is true
39: 
40: ## PATCH /api/v1/employees/:id/toggle-access
41: Method: PATCH
42: URL: /api/v1/employees/1/toggle-access
43: Headers: { "Authorization": "Bearer {{authToken}}", "Content-Type": "application/json" }
44: Payload:
45: {
46:   "allowLogin": false
47: }
48: Assertions:
49: 1. Status code is 200
50: 2. res.body.success is true
````

## File: test_data/Notification_Test_Data.txt
````
 1: # Notification System API - Test Data (Sprint 6, Feature A)
 2: # These tests are designed for Bruno Desktop app plain-text import.
 3: 
 4: ### 1. Send Dispatch Notification
 5: Method: POST
 6: URL: {{baseUrl}}/api/v1/parcels/5/notify
 7: Headers:
 8:   Content-Type: application/json
 9:   Authorization: Bearer {{adminToken}}
10: Payload:
11: {}
12: 
13: Assertions:
14:   res.status: eq 200
15:   res.body.success: eq true
16:   res.body.data.message: eq "Notification sent successfully"
17: 
18: ---
19: 
20: ### 2. Resend Failed Notification
21: Method: POST
22: URL: {{baseUrl}}/api/v1/notifications/12/resend
23: Headers:
24:   Content-Type: application/json
25:   Authorization: Bearer {{adminToken}}
26: Payload:
27: {}
28: 
29: Assertions:
30:   res.status: eq 200
31:   res.body.success: eq true
32:   res.body.data.message: eq "Notification sent successfully"
33: 
34: ---
35: 
36: ### 3. Get Notification History for Parcel
37: Method: GET
38: URL: {{baseUrl}}/api/v1/parcels/5/notifications
39: Headers:
40:   Authorization: Bearer {{adminToken}}
41: 
42: Assertions:
43:   res.status: eq 200
44:   res.body.success: eq true
45:   res.body.data: isArray true
46: 
47: ---
48: 
49: ### 4. Notification Webhook (Status Update)
50: Method: POST
51: URL: {{baseUrl}}/api/v1/notifications/webhook
52: Headers:
53:   Content-Type: application/json
54: Payload:
55: {
56:   "notificationId": 12,
57:   "status": "delivered",
58:   "externalId": "SMS_GATEWAY_XYZ_999"
59: }
60: 
61: Assertions:
62:   res.status: eq 200
63:   res.body.success: eq true
64:   res.body.data.appStatusId: eq 2
````

## File: test_data/Order_Test_Data.txt
````
  1: ========================================
  2: ORDER MODULE — Test Data
  3: Sprint 2 Feature D: Order Pipeline
  4: ========================================
  5: 
  6: --- TEST 1: Create Complex Order ---
  7: Method: POST
  8: URL: /api/v1/orders
  9: Headers:
 10:   Authorization: Bearer <OPERATOR_TOKEN>
 11:   Content-Type: application/json
 12: 
 13: Body:
 14: {
 15:   "senderName": "Ramesh Textiles",
 16:   "senderMobile": "9876543210",
 17:   "senderAddress": "14, Gandhi Nagar, Near Railway Station, Surat, Gujarat 395002",
 18:   "courierId": 1,
 19:   "receivers": [
 20:     {
 21:       "receiverName": "Delhi Fabrics Ltd.",
 22:       "receiverPhone": "9123456780",
 23:       "addressLine1": "45, Karol Bagh",
 24:       "city": "New Delhi",
 25:       "state": "Delhi",
 26:       "pincode": "110005",
 27:       "products": [
 28:         { "productId": 1, "qty": 5, "unitPrice": 420.00 },
 29:         { "productId": 3, "qty": 2, "unitPrice": 1100.00 }
 30:       ]
 31:     },
 32:     {
 33:       "receiverName": "Mumbai Silk House",
 34:       "receiverPhone": "9988776655",
 35:       "addressLine1": "22, Linking Road",
 36:       "addressLine2": "Bandra West",
 37:       "city": "Mumbai",
 38:       "state": "Maharashtra",
 39:       "pincode": "400050",
 40:       "products": [
 41:         { "productId": 1, "qty": 3, "unitPrice": 450.00 }
 42:       ]
 43:     }
 44:   ]
 45: }
 46: 
 47: Assertions:
 48:   - Status: 201
 49:   - Body: { success: true, data: { orderId: <int>, orderCode: "ORD-...", receivers: [...] } }
 50:   - Each receiver should have a nested "parcel" with parcelId starting with "PDS-"
 51:   - Parcel status should be "PENDING"
 52: 
 53: --- TEST 2: List Orders (Paginated) ---
 54: Method: GET
 55: URL: /api/v1/orders?page=1&limit=20
 56: Headers:
 57:   Authorization: Bearer <OPERATOR_TOKEN>
 58: 
 59: Assertions:
 60:   - Status: 200
 61:   - Body: { success: true, data: [...], meta: { page, limit, totalRows, totalPages } }
 62:   - Each order has derivedStatus computed from parcel states
 63: 
 64: --- TEST 3: Get Order Aggregate ---
 65: Method: GET
 66: URL: /api/v1/orders/1
 67: Headers:
 68:   Authorization: Bearer <OPERATOR_TOKEN>
 69: 
 70: Assertions:
 71:   - Status: 200
 72:   - Body: { success: true, data: { receivers: [{ items: [...], parcel: {...} }] } }
 73:   - Nested JSON structure: Order → Receivers → [Items, Parcel]
 74: 
 75: --- TEST 4: Update Order (Happy Path) ---
 76: Method: PUT
 77: URL: /api/v1/orders/1
 78: Headers:
 79:   Authorization: Bearer <OPERATOR_TOKEN>
 80:   Content-Type: application/json
 81: 
 82: Body:
 83: {
 84:   "senderName": "Ramesh Textiles Updated",
 85:   "courierId": 2
 86: }
 87: 
 88: Assertions:
 89:   - Status: 200
 90:   - Body: { success: true, data: { senderName: "Ramesh Textiles Updated" } }
 91: 
 92: --- TEST 5: Update Order (Blocked — Parcel ≥ AWB_LINKED) ---
 93: Method: PUT
 94: URL: /api/v1/orders/1
 95: Headers:
 96:   Authorization: Bearer <OPERATOR_TOKEN>
 97:   Content-Type: application/json
 98: 
 99: Pre-condition: At least one parcel in this order must be AWB_LINKED or DISPATCHED
100: 
101: Body:
102: {
103:   "senderName": "Should Fail"
104: }
105: 
106: Assertions:
107:   - Status: 400
108:   - Body: { success: false, error: "Cannot update order: one or more parcels have already been AWB-linked or dispatched." }
109: 
110: --- TEST 6: Cancel Order (Happy Path) ---
111: Method: PATCH
112: URL: /api/v1/orders/1/cancel
113: Headers:
114:   Authorization: Bearer <OPERATOR_TOKEN>
115: 
116: Assertions:
117:   - Status: 200
118:   - Body: { success: true, data: { cancelledParcels: <int>, cancelledBy: "..." } }
119: 
120: --- TEST 7: Cancel Order (Blocked — Parcel Dispatched) ---
121: Method: PATCH
122: URL: /api/v1/orders/1/cancel
123: Headers:
124:   Authorization: Bearer <OPERATOR_TOKEN>
125: 
126: Pre-condition: At least one parcel in this order must be DISPATCHED
127: 
128: Assertions:
129:   - Status: 400
130:   - Body: { success: false, error: "Cannot cancel order: one or more parcels are already dispatched or delivered." }
131: 
132: --- TEST 8: COURIER Role — List Orders (Read-Only Access) ---
133: Method: GET
134: URL: /api/v1/orders?page=1&limit=10
135: Headers:
136:   Authorization: Bearer <COURIER_TOKEN>
137: 
138: Assertions:
139:   - Status: 200
140:   - COURIER can list but not create/edit/cancel
````

## File: test_data/Parcel_Test_Data.txt
````
 1: ========================================
 2: PARCEL MODULE — Test Data
 3: Sprint 3: Parcel Retrieval & Label Data
 4: ========================================
 5: 
 6: --- TEST 1: List All Parcels ---
 7: Method: GET
 8: URL: /api/v1/parcels?page=1&limit=20
 9: Headers:
10:   Authorization: Bearer <OPERATOR_TOKEN>
11: 
12: Assertions:
13:   - Status: 200
14:   - Body: { success: true, data: [...], meta: { page, limit, totalRows, totalPages } }
15:   - Each parcel has: parcelId, trackingNo, status, receiverName, orderCode
16: 
17: --- TEST 2: List Parcels with Status Filter ---
18: Method: GET
19: URL: /api/v1/parcels?status=PENDING
20: Headers:
21:   Authorization: Bearer <OPERATOR_TOKEN>
22: 
23: Assertions:
24:   - Status: 200
25:   - All returned parcels have status === "PENDING"
26: 
27: --- TEST 3: List Parcels with Search ---
28: Method: GET
29: URL: /api/v1/parcels?search=PDS-A1B2C3
30: Headers:
31:   Authorization: Bearer <OPERATOR_TOKEN>
32: 
33: Assertions:
34:   - Status: 200
35:   - Returns parcel matching parcelId search
36: 
37: --- TEST 4: Get Single Parcel ---
38: Method: GET
39: URL: /api/v1/parcels/1
40: Headers:
41:   Authorization: Bearer <OPERATOR_TOKEN>
42: 
43: Assertions:
44:   - Status: 200
45:   - Body: { success: true, data: { id: 1, parcelId: "PDS-...", status: "...", receiverName: "...", ... } }
46: 
47: --- TEST 5: Get Parcel — Not Found ---
48: Method: GET
49: URL: /api/v1/parcels/9999
50: Headers:
51:   Authorization: Bearer <OPERATOR_TOKEN>
52: 
53: Assertions:
54:   - Status: 404
55:   - Body: { success: false, error: "Parcel not found" }
56: 
57: --- TEST 6: Get Label Data (pAction=2) ---
58: Method: GET
59: URL: /api/v1/parcels/1/label-data
60: Headers:
61:   Authorization: Bearer <OPERATOR_TOKEN>
62: 
63: Assertions:
64:   - Status: 200
65:   - Body: { success: true, data: { parcelId: "PDS-...", senderName: "...", receiverName: "...", addressLine1: "...", ... } }
66:   - Flat JSON with sender snapshot + receiver address + parcelId
67:   - NO QR image data (frontend renders from parcelId)
68: 
69: --- TEST 7: Get Parcel Timeline ---
70: Method: GET
71: URL: /api/v1/parcels/1/timeline
72: Headers:
73:   Authorization: Bearer <OPERATOR_TOKEN>
74: 
75: Assertions:
76:   - Status: 200
77:   - Body: { success: true, data: [ { actionType: "STATUS_UPDATE", newStatus: "PENDING", ... } ] }
78:   - Events are chronologically sorted (oldest first)
79: 
80: --- TEST 8: COURIER Role — Can List Parcels ---
81: Method: GET
82: URL: /api/v1/parcels?page=1&limit=10
83: Headers:
84:   Authorization: Bearer <COURIER_TOKEN>
85: 
86: Assertions:
87:   - Status: 200
88:   - COURIER has read access to parcels
89: 
90: --- TEST 9: COURIER Role — Cannot Access Label Data ---
91: Method: GET
92: URL: /api/v1/parcels/1/label-data
93: Headers:
94:   Authorization: Bearer <COURIER_TOKEN>
95: 
96: Assertions:
97:   - Status: 403
98:   - Body: { success: false, error: "User role 'COURIER' is not authorized for this route" }
````

## File: test_data/Scan_Test_Data.txt
````
  1: ========================================
  2: SCAN MODULE — Test Data
  3: Sprint 4 Feature A: Two-Scan Operation (QR + AWB)
  4: ========================================
  5: 
  6: --- TEST 1: Scan + Link AWB (OPERATOR — Happy Path) ---
  7: Method: POST
  8: URL: /api/v1/parcels/scan
  9: Headers:
 10:   Authorization: Bearer <OPERATOR_TOKEN>
 11:   Content-Type: application/json
 12: 
 13: Pre-condition: Parcel with parcelId "PDS-A1B2C3" must be in LABEL_PRINTED state
 14:   (run POST /api/v1/parcels/1/log-print first)
 15: 
 16: Body:
 17: {
 18:   "qrCode": "PDS-A1B2C3",
 19:   "awbNumber": "AWB-DTDC-001"
 20: }
 21: 
 22: Assertions:
 23:   - Status: 200
 24:   - Body: { success: true, data: { parcelId: "PDS-A1B2C3", trackingNo: "AWB-DTDC-001", status: "AWB_LINKED" } }
 25:   - OPERATOR scan → status = AWB_LINKED (not auto-dispatched)
 26:   - dispatchDate should be null
 27: 
 28: Post-Request Verification:
 29:   - GET /api/v1/parcels/1/timeline should show AWB_LINK event
 30:   - Event: { actionType: "AWB_LINK", awbNumber: "AWB-DTDC-001", previousStatus: "LABEL_PRINTED", newStatus: "AWB_LINKED" }
 31: 
 32: --- TEST 2: Scan + Link AWB (COURIER — Auto-Dispatch) ---
 33: Method: POST
 34: URL: /api/v1/parcels/scan
 35: Headers:
 36:   Authorization: Bearer <COURIER_TOKEN>
 37:   Content-Type: application/json
 38: 
 39: Pre-condition: Parcel with parcelId "PDS-D4E5F6" must be in LABEL_PRINTED state
 40: 
 41: Body:
 42: {
 43:   "qrCode": "PDS-D4E5F6",
 44:   "awbNumber": "AWB-BLUEDART-002"
 45: }
 46: 
 47: Assertions:
 48:   - Status: 200
 49:   - Body: { success: true, data: { status: "DISPATCHED", dispatchDate: "<timestamp>" } }
 50:   - COURIER scan → status jumps directly to DISPATCHED
 51:   - dispatchDate should be populated
 52: 
 53: --- TEST 3: Scan — Parcel Not Found ---
 54: Method: POST
 55: URL: /api/v1/parcels/scan
 56: Headers:
 57:   Authorization: Bearer <OPERATOR_TOKEN>
 58:   Content-Type: application/json
 59: 
 60: Body:
 61: {
 62:   "qrCode": "PDS-NONEXISTENT",
 63:   "awbNumber": "AWB-TEST-999"
 64: }
 65: 
 66: Assertions:
 67:   - Status: 404
 68:   - Body: { success: false, error: "Parcel not found for QR code: PDS-NONEXISTENT" }
 69: 
 70: --- TEST 4: Scan — Wrong State (Still PENDING) ---
 71: Method: POST
 72: URL: /api/v1/parcels/scan
 73: Headers:
 74:   Authorization: Bearer <OPERATOR_TOKEN>
 75:   Content-Type: application/json
 76: 
 77: Pre-condition: Parcel must still be in PENDING state (label not printed)
 78: 
 79: Body:
 80: {
 81:   "qrCode": "PDS-A1B2C3",
 82:   "awbNumber": "AWB-TEST-003"
 83: }
 84: 
 85: Assertions:
 86:   - Status: 400
 87:   - Body: { success: false, error: "Cannot link AWB: parcel is in 'PENDING' state. AWB linking requires parcel to be in LABEL_PRINTED state." }
 88:   - No AWB linking before label is printed
 89: 
 90: --- TEST 5: Scan — Duplicate AWB (409 Conflict) ---
 91: Method: POST
 92: URL: /api/v1/parcels/scan
 93: Headers:
 94:   Authorization: Bearer <OPERATOR_TOKEN>
 95:   Content-Type: application/json
 96: 
 97: Pre-condition: AWB "AWB-DTDC-001" was already linked in Test 1
 98: 
 99: Body:
100: {
101:   "qrCode": "PDS-D4E5F6",
102:   "awbNumber": "AWB-DTDC-001"
103: }
104: 
105: Assertions:
106:   - Status: 409
107:   - Body: { success: false, error: "AWB number 'AWB-DTDC-001' is already linked to another parcel" }
108: 
109: --- TEST 6: Scan — Validation Error (Missing Fields) ---
110: Method: POST
111: URL: /api/v1/parcels/scan
112: Headers:
113:   Authorization: Bearer <OPERATOR_TOKEN>
114:   Content-Type: application/json
115: 
116: Body:
117: {
118:   "qrCode": "",
119:   "awbNumber": ""
120: }
121: 
122: Assertions:
123:   - Status: 400
124:   - Body: { success: false, error: "Validation Error - qrCode: QR code (parcelId) is required, awbNumber: AWB number is required" }
````

## File: test_data/Sender_Test_Data.txt
````
 1: # Sender Module API Test Data (Bruno/Postman)
 2: # Sprint 2, Feature C
 3: 
 4: # 1. Create Sender
 5: POST {{baseUrl}}/api/v1/senders
 6: Content-Type: application/json
 7: 
 8: {
 9:   "customerName": "John Doe Enterprises",
10:   "phoneNo": "9876543210",
11:   "emailId": "john.doe@example.com",
12:   "addressLine1": "123 Business Park",
13:   "addressLine2": "Sector 62",
14:   "city": "Noida",
15:   "state": "Uttar Pradesh",
16:   "pincode": "201301"
17: }
18: 
19: # 2. Get All Senders
20: GET {{baseUrl}}/api/v1/senders
21: Content-Type: application/json
22: 
23: Assertions:
24:   res.status: eq 200
25:   res.body.success: eq true
26:   res.body.data[0].customerName: isString true
27:   res.body.data[0].phoneNo: isString true
28:   res.body.data[0].emailId: isString true
29: 
30: # 3. Get Specific Sender
31: # Replace :id with the PkPartyId returned from create or list
32: GET {{baseUrl}}/api/v1/senders/:id
33: Content-Type: application/json
34: 
35: # 4. Lookup Sender by Phone
36: GET {{baseUrl}}/api/v1/senders/lookup?phone=9876543210
37: Content-Type: application/json
38: 
39: # 5. Update Sender
40: # Replace :id with relevant PkPartyId
41: PUT {{baseUrl}}/api/v1/senders/:id
42: Content-Type: application/json
43: 
44: {
45:   "customerName": "John Doe Enterprises Updated",
46:   "city": "Gurugram",
47:   "state": "Haryana"
48: }
49: 
50: # 6. Delete Sender (Soft-Delete)
51: DELETE {{baseUrl}}/api/v1/senders/:id
52: Content-Type: application/json
53: 
54: # 7. Validation Test (Missing Required Fields)
55: POST {{baseUrl}}/api/v1/senders
56: Content-Type: application/json
57: 
58: {
59:   "customerName": "Incomplete Sender"
60: }
61: 
62: # 8. Validation Test (Invalid Email)
63: POST {{baseUrl}}/api/v1/senders
64: Content-Type: application/json
65: 
66: {
67:   "customerName": "Jane Smith",
68:   "phoneNo": "1234567890",
69:   "emailId": "invalid-email",
70:   "addressLine1": "A-101",
71:   "city": "Mumbai",
72:   "state": "Maharashtra",
73:   "pincode": "400001"
74: }
````

## File: .env.example
````
 1: # Server
 2: PORT=5000
 3: # Database
 4: DB_HOST=
 5: DB_USER=
 6: DB_PASSWORD=
 7: DB_NAME=
 8: DB_PORT=3306 # why?
 9: 
10: # Optional future configs
11: JWT_SECRET=
12: API_BASE_URL=
13: 
14: # Fallback to in-memory mock data (true) or use live MySQL stored procedures (false)
15: USE_MOCK_DB=true
````

## File: src/modules/parcel/parcel.service.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/parcel/parcel.service.js
  3: // Description: Business logic layer for the Parcel module.
  4: // Enforces the strict parcel status flow:
  5: //   Created → Label Printed → AWB Linked → Dispatched → Delivered
  6: // and terminal states (Cancelled, Returned).
  7: // All state transitions are validated before delegating to the repository.
  8: //
  9: // Dual-Mode: Service-layer validations apply in BOTH modes.
 10: // In LIVE mode, the SP also validates (defense-in-depth).
 11: // In MOCK mode, service validations are the sole guardrails.
 12: //
 13: // Procedure mapping:
 14: //   - Reads:  prc_parcel_details_get, prc_receiver_status_details_get
 15: //   - Writes: prc_parcel_details_set (internally triggers audit logging)
 16: // ============================================================================
 17: 
 18: import parcelRepository from './parcel.repository.js';
 19: 
 20: // ============================================================================
 21: // PARCEL STATUS PRECEDENCE MAP
 22: // Defines valid transitions: key = current status, value = allowed next statuses.
 23: // This is the single source of truth for state machine enforcement in the
 24: // service layer (Systemflow §Part 6, API Contract Appendix A).
 25: // ============================================================================
 26: const VALID_TRANSITIONS = {
 27:   'PENDING':        ['LABEL_PRINTED', 'CANCELLED'],
 28:   'LABEL_PRINTED':  ['AWB_LINKED', 'DISPATCHED', 'CANCELLED'],
 29:   'AWB_LINKED':     ['DISPATCHED', 'CANCELLED'],
 30:   'DISPATCHED':     ['DELIVERED', 'RETURNED'],
 31:   'DELIVERED':      ['RETURNED'],
 32:   'CANCELLED':      [],
 33:   'RETURNED':       []
 34: };
 35: 
 36: class ParcelService {
 37:   // ============================================================================
 38:   // INTERNAL MAPPERS (Standardize PascalCase to camelCase)
 39:   // ============================================================================
 40: 
 41:   _mapParcelSummary(parcel) {
 42:     if (!parcel) return null;
 43:     return {
 44:       id: parcel.PkParcelDetailsId || parcel.id,
 45:       parcelId: parcel.ParcelId || parcel.parcel_id || parcel.parcelId,
 46:       trackingNo: parcel.TrackingNo || parcel.trackingNo,
 47:       status: parcel.ParcelStatusCode || parcel.status,
 48:       labelPrintCount: parcel.LabelPrintCount !== undefined ? parcel.LabelPrintCount : parcel.labelPrintCount,
 49:       dispatchDate: parcel.DispatchDate || parcel.dispatchDate,
 50:       receiverName: parcel.ReceiverName || parcel.receiverName,
 51:       orderCode: parcel.OrderCode || parcel.orderCode,
 52:       createdAt: parcel.CreatedDate || parcel.createdAt
 53:     };
 54:   }
 55: 
 56:   _mapParcelDetail(parcel) {
 57:     if (!parcel) return null;
 58:     return {
 59:       id: parcel.PkParcelDetailsId || parcel.id,
 60:       parcelId: parcel.ParcelId || parcel.parcel_id || parcel.parcelId,
 61:       trackingNo: parcel.TrackingNo || parcel.trackingNo,
 62:       status: parcel.ParcelStatusCode || parcel.status,
 63:       labelPrintCount: parcel.LabelPrintCount !== undefined ? parcel.LabelPrintCount : parcel.labelPrintCount,
 64:       dispatchDate: parcel.DispatchDate || parcel.dispatchDate,
 65:       fkCourierId: parcel.FkCourierId || parcel.fkCourierId,
 66:       receiverName: parcel.ReceiverName || parcel.receiverName,
 67:       receiverPhone: parcel.ReceiverPhone || parcel.receiverPhone,
 68:       addressLine1: parcel.AddressLine1 || parcel.addressLine1,
 69:       addressLine2: parcel.AddressLine2 || parcel.addressLine2,
 70:       city: parcel.City || parcel.city,
 71:       state: parcel.State || parcel.state,
 72:       pincode: parcel.Pincode || parcel.pincode,
 73:       orderCode: parcel.OrderCode || parcel.orderCode,
 74:       orderId: parcel.FkOrderId || parcel.orderId,
 75:       createdAt: parcel.CreatedDate || parcel.createdAt
 76:     };
 77:   }
 78: 
 79:   _mapLabelData(data) {
 80:     if (!data) return null;
 81:     return {
 82:       parcelId: data.ParcelId || data.parcel_id || data.parcelId,
 83:       orderCode: data.OrderCode || data.orderCode,
 84:       senderName: data.SenderName || data.senderName,
 85:       senderMobile: data.SenderMobile || data.senderMobile,
 86:       senderAddress: data.SenderAddress || data.senderAddress,
 87:       receiverName: data.ReceiverName || data.receiverName,
 88:       receiverPhone: data.ReceiverPhone || data.receiverPhone,
 89:       addressLine1: data.AddressLine1 || data.addressLine1,
 90:       addressLine2: data.AddressLine2 || data.addressLine2,
 91:       city: data.City || data.city,
 92:       state: data.State || data.state,
 93:       pincode: data.Pincode || data.pincode,
 94:       country: data.Country || data.country,
 95:       labelPrintCount: data.LabelPrintCount !== undefined ? data.LabelPrintCount : data.labelPrintCount,
 96:       status: data.ParcelStatusCode || data.status
 97:     };
 98:   }
 99: 
100:   _mapTimelineEvent(event) {
101:     if (!event) return null;
102:     return {
103:       id: event.PkReceiverStatusDetailsId || event.id,
104:       actionType: event.ActionType || event.actionType,
105:       awbNumber: event.AwbNumber || event.awbNumber,
106:       previousStatus: event.PreviousStatus || event.previousStatus,
107:       newStatus: event.NewStatus || event.newStatus,
108:       createdBy: event.CreatedBy || event.createdBy,
109:       createdDate: event.CreatedDate || event.createdDate
110:     };
111:   }
112: 
113:   _mapBrowseEvent(event) {
114:     if (!event) return null;
115:     return {
116:       id: event.PkReceiverStatusDetailsId || event.id,
117:       parcelId: event.ParcelId || event.parcelId,
118:       orderCode: event.OrderCode || event.orderCode,
119:       actionType: event.ActionType || event.actionType,
120:       awbNumber: event.AwbNumber || event.awbNumber,
121:       previousStatus: event.PreviousStatus || event.previousStatus,
122:       newStatus: event.NewStatus || event.newStatus,
123:       scannedBy: event.CreatedBy || event.scannedBy,
124:       timestamp: event.CreatedDate || event.timestamp
125:     };
126:   }
127: 
128:   _mapMutationResult(parcel) {
129:     if (!parcel) return null;
130:     return {
131:       id: parcel.PkParcelDetailsId || parcel.id,
132:       parcelId: parcel.ParcelId || parcel.parcel_id || parcel.parcelId,
133:       status: parcel.ParcelStatusCode || parcel.status,
134:       trackingNo: parcel.TrackingNo || parcel.trackingNo,
135:       labelPrintCount: parcel.LabelPrintCount !== undefined ? parcel.LabelPrintCount : parcel.labelPrintCount,
136:       dispatchDate: parcel.DispatchDate || parcel.dispatchDate,
137:       previousStatus: parcel.PreviousStatus || parcel.previousStatus
138:     };
139:   }
140: 
141:   // ============================================================================
142:   // READ OPERATIONS
143:   // ============================================================================
144: 
145:   async getParcelList(filters) {
146:     const result = await parcelRepository.findAllParcels(filters);
147:     return { ...result, data: result.data.map(p => this._mapParcelSummary(p)) };
148:   }
149: 
150:   async getParcelDetails(id) {
151:     const data = await parcelRepository.findById(id);
152:     if (!data) {
153:       const error = new Error('Parcel not found');
154:       error.statusCode = 404;
155:       throw error;
156:     }
157:     return this._mapParcelDetail(data);
158:   }
159: 
160:   async getLabelData(id) {
161:     const data = await parcelRepository.getLabelData(id);
162:     if (!data) {
163:       const error = new Error('Parcel not found');
164:       error.statusCode = 404;
165:       throw error;
166:     }
167:     return this._mapLabelData(data);
168:   }
169: 
170:   async getTimeline(id) {
171:     const parcel = await parcelRepository.findById(id);
172:     if (!parcel) {
173:       const error = new Error('Parcel not found');
174:       error.statusCode = 404;
175:       throw error;
176:     }
177:     const timeline = await parcelRepository.getTimeline(id);
178:     return timeline.map(event => this._mapTimelineEvent(event));
179:   }
180: 
181:   // ============================================================================
182:   // WRITE OPERATIONS (STATE TRANSITIONS)
183:   // ============================================================================
184: 
185:   async logLabelPrint(id, user) {
186:     const parcel = await parcelRepository.findById(id);
187:     if (!parcel) {
188:       const error = new Error('Parcel not found');
189:       error.statusCode = 404;
190:       throw error;
191:     }
192: 
193:     const currentStatus = parcel.status || parcel.ParcelStatusCode;
194:     const allowedStates = ['PENDING', 'LABEL_PRINTED'];
195:     if (!allowedStates.includes(currentStatus)) {
196:       const error = new Error(
197:         `Cannot print label: parcel is in '${currentStatus}' state. ` +
198:         `Label printing is only allowed when parcel is PENDING or LABEL_PRINTED.`
199:       );
200:       error.statusCode = 400;
201:       throw error;
202:     }
203: 
204:     const employeeCode = user?.employeeCode || 'SYSTEM';
205:     const result = await parcelRepository.logPrint(id, employeeCode);
206:     return this._mapMutationResult(result);
207:   }
208: 
209:   async scanAndLinkAWB(payload, user) {
210:     const { qrCode, awbNumber } = payload;
211:     const employeeCode = user?.employeeCode || 'SYSTEM';
212:     const role = user?.role || 'OPERATOR';
213: 
214:     if (process.env.USE_MOCK_DB === 'true') {
215:       const parcel = parcelRepository.findByQRCode(qrCode);
216:       if (!parcel) {
217:         const error = new Error(`Parcel not found for QR code: ${qrCode}`);
218:         error.statusCode = 404;
219:         throw error;
220:       }
221: 
222:       if (parcel.parcelStatusCode !== 'LABEL_PRINTED') {
223:         const error = new Error(
224:           `Cannot link AWB: parcel is in '${parcel.parcelStatusCode}' state. ` +
225:           `AWB linking requires parcel to be in LABEL_PRINTED state.`
226:         );
227:         error.statusCode = 400;
228:         throw error;
229:       }
230: 
231:       const isDuplicate = parcelRepository.checkDuplicateAWB(awbNumber);
232:       if (isDuplicate) {
233:         const error = new Error(`AWB number '${awbNumber}' is already linked to another parcel`);
234:         error.statusCode = 409;
235:         throw error;
236:       }
237:     }
238: 
239:     const result = await parcelRepository.scanAndLinkAWB(qrCode, awbNumber, role, employeeCode);
240:     return this._mapMutationResult(result);
241:   }
242: 
243:   async dispatchParcels(parcelIds, user) {
244:     const employeeCode = user?.employeeCode || 'SYSTEM';
245: 
246:     for (const pid of parcelIds) {
247:       const parcel = await parcelRepository.findById(pid);
248:       if (!parcel) {
249:         const error = new Error(`Parcel with ID ${pid} not found`);
250:         error.statusCode = 404;
251:         throw error;
252:       }
253:       const currentStatus = parcel.status || parcel.ParcelStatusCode;
254:       if (currentStatus !== 'AWB_LINKED') {
255:         const error = new Error(
256:           `Cannot dispatch parcel ${parcel.parcelId || parcel.ParcelId}: status is '${currentStatus}'. ` +
257:           `Dispatch requires AWB_LINKED status.`
258:         );
259:         error.statusCode = 400;
260:         throw error;
261:       }
262:     }
263: 
264:     const { dispatched, parcels } = await parcelRepository.dispatchParcels(parcelIds, employeeCode);
265:     return {
266:       dispatched,
267:       parcels: parcels.map(p => this._mapMutationResult(p))
268:     };
269:   }
270: 
271:   async deliverParcel(id, user) {
272:     return await this._transitionToTerminal(id, 'DELIVERED', user);
273:   }
274: 
275:   async cancelParcel(id, user) {
276:     return await this._transitionToTerminal(id, 'CANCELLED', user);
277:   }
278: 
279:   async returnParcel(id, user) {
280:     return await this._transitionToTerminal(id, 'RETURNED', user);
281:   }
282: 
283:   // ============================================================================
284:   // EVENT LOG OPERATIONS
285:   // ============================================================================
286: 
287:   async browseEvents(filters) {
288:     const result = await parcelRepository.browseEvents(filters);
289:     return {
290:       ...result,
291:       data: result.data.map(e => this._mapBrowseEvent(e))
292:     };
293:   }
294: 
295:   // ============================================================================
296:   // INTERNAL HELPERS
297:   // ============================================================================
298: 
299:   async _transitionToTerminal(id, targetStatus, user) {
300:     const parcel = await parcelRepository.findById(id);
301:     if (!parcel) {
302:       const error = new Error('Parcel not found');
303:       error.statusCode = 404;
304:       throw error;
305:     }
306: 
307:     const currentStatus = parcel.status || parcel.ParcelStatusCode;
308:     const allowedNext = VALID_TRANSITIONS[currentStatus] || [];
309:     if (!allowedNext.includes(targetStatus)) {
310:       const error = new Error(
311:         `Invalid state transition: cannot move parcel from '${currentStatus}' to '${targetStatus}'. ` +
312:         `Allowed transitions from '${currentStatus}': [${allowedNext.join(', ')}]`
313:       );
314:       error.statusCode = 400;
315:       throw error;
316:     }
317: 
318:     const employeeCode = user?.employeeCode || 'SYSTEM';
319:     const result = await parcelRepository.updateTerminalStatus(id, targetStatus, employeeCode);
320:     return this._mapMutationResult(result);
321:   }
322: }
323: 
324: export default new ParcelService();
````

## File: src/shared/middleware/error.middleware.js
````javascript
 1: // ============================================================================
 2: // File: src/shared/middleware/error.middleware.js
 3: // Description: Global error handling middleware.
 4: // Enforces the standard response envelope: { success: false, error: string }
 5: // per API Contract v2.0 §1.2.
 6: //
 7: // MySQL Error Translation (api_procedure_spec_v1.md §12):
 8: //   - prc_check_duplicate_XXX SIGNAL (SQLSTATE 45000 + 'duplicate') → 409
 9: //   - ER_DUP_ENTRY / errno 1062 (hard constraint)                  → 409
10: //   - Generic SIGNAL / Rollback (SQLSTATE 45000, non-duplicate)     → 400
11: //   - No rows found (handled by service layer throw)                → 404
12: // ============================================================================
13: 
14: export const notFound = (req, res, next) => {
15:   const error = new Error(`Not Found - ${req.originalUrl}`);
16:   res.status(404);
17:   next(error);
18: };
19: 
20: export const errorHandler = (err, req, res, next) => {
21:   // If the status code is 200 but we threw an error, make it a 500 (Server Error)
22:   // Otherwise, use the status code defined in your service/controller (like 400 or 401)
23:   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
24: 
25:   // You can also use err.statusCode if you attached it in your Service layer
26:   if (err.statusCode) statusCode = err.statusCode;
27: 
28:   let message = err.message;
29: 
30:   // ------------------------------------------------------------------
31:   // MySQL Error Translation Layer
32:   // Maps stored procedure errors to appropriate HTTP status codes.
33:   // Order matters: check specific patterns before generic ones.
34:   // ------------------------------------------------------------------
35: 
36:   // 1. prc_check_duplicate_XXX trigger — SIGNAL SQLSTATE '45000' with 'duplicate' keyword
37:   //    These are custom duplicate checks fired by the stored procedure.
38:   if (err.sqlState === '45000' && err.message && err.message.toLowerCase().includes('duplicate')) {
39:     statusCode = 409;
40:     message = err.message; // Use the SP's descriptive duplicate message
41:   }
42: 
43:   // 2. Hard constraint duplicate (ER_DUP_ENTRY / errno 1062)
44:   //    Fired by MySQL UNIQUE constraints when the SP doesn't catch it first.
45:   else if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
46:     statusCode = 409;
47:     message = 'A record with this value already exists';
48:   }
49: 
50:   // 3. Generic SIGNAL / Business rule violations (SQLSTATE 45000, non-duplicate)
51:   //    These are custom business rule errors fired by stored procedures
52:   //    (e.g., invalid state transitions, blocked operations).
53:   else if (err.sqlState === '45000') {
54:     statusCode = 400;
55:     message = err.message; // Use the SP's custom business rule message
56:   }
57: 
58:   // 4. Other MySQL errors (connection, syntax, etc.)
59:   //    Don't expose raw DB internals to the client.
60:   else if (err.sqlState && statusCode === 500) {
61:     message = 'A database error occurred. Please try again later.';
62:   }
63: 
64:   // Standard response envelope: { success: false, error: string }
65:   res.status(statusCode).json({
66:     success: false,
67:     error: message,
68:     stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
69:   });
70: };
````

## File: .antigravityignore
````
 1: # 1. Credentials and Secrets (CRITICAL SAFETY)
 2: .env
 3: .env.*
 4: *.pem
 5: *.key
 6: credentials.json
 7: service-account.json
 8: 
 9: # 2. Build Artifacts & Caches
10: node_modules/
11: dist/
12: build/
13: .next/
14: out/
15: coverage/
16: .turbo/
17: test_data/
18: bruno/
19: sdcms-server.md
20: sdcms-server.xml
21: 
22: # 3. Lock files (Reduces index bloat)
23: package-lock.json
24: yarn.lock
25: pnpm-lock.yaml
26: 
27: # 4. Generated files & Logs
28: *.log
29: **/*.min.js
30: **/*.min.css
31: **/*.map
32: 
33: # 5. Media & Assets
34: public/assets/
35: **/*.png
36: **/*.jpg
37: **/*.svg
38: **/*.mp4
````

## File: src/interfaces/http/controllers/auth.controller.js
````javascript
 1: import asyncHandler from 'express-async-handler';
 2: import authService from '../../../modules/auth/auth.service.js';
 3: 
 4: // @desc    Auth user & get token
 5: // @route   POST /api/users/login
 6: // @access  Public
 7: export const login = asyncHandler(async (req, res) => {
 8:   const { email, password } = req.body;
 9: 
10:   // Pass the payload to the service
11:   const result = await authService.loginUser(email, password);
12: 
13:   // Return HTTP response wrapped in success envelope
14:   res.json({
15:     success: true,
16:     data: result
17:   });
18: });
19: 
20: 
21: // @desc    Get user profile
22: // @route   GET /api/v1/auth/profile
23: // @access  Private
24: export const getUserProfile = asyncHandler(async (req, res) => {
25:   // req.user is set by auth.middleware.js. 
26:   // We extract the identifier (EmployeeCode) which was stored in the token.
27:   const employeeCode = req.user.EmployeeCode || req.user.employeeCode || req.user.id;
28: 
29:   const profile = await authService.getProfile(employeeCode);
30: 
31:   res.json({
32:     success: true,
33:     data: profile
34:   });
35: });
````

## File: src/modules/employee/employee.service.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/employee/employee.service.js
  3: // Description: Business logic layer for Employee Management.
  4: // Validates data and connects controllers to the repository.
  5: //
  6: // Dual-Mode Mapping: Handles both mock field names and DB column names.
  7: //   - Mock:  { FullName, EmailAddress, RoleCode, AllowLogin, EmployeeCode }
  8: //   - DB SP: { FullName, EmailAddress, RoleCode, AllowLogin, EmployeeCode }
  9: //   - API:   { employeeName, email, roleCode, allowLogin, employeeCode }
 10: // ============================================================================
 11: 
 12: import bcrypt from 'bcryptjs';
 13: import employeeRepository from './employee.repository.js';
 14: 
 15: class EmployeeService {
 16: 
 17:   /**
 18:    * Internal mapper to format DB/mock results for the API layer.
 19:    * Handles both DB column names and legacy mock field names gracefully.
 20:    *
 21:    * @param {object} employee - Raw employee record from repository.
 22:    * @returns {object|null} API-formatted employee object.
 23:    */
 24:   _mapToApi(employee) {
 25:     if (!employee) return null;
 26:     return {
 27:       employeeCode: employee.EmployeeCode || employee.employeeCode,
 28:       employeeName: employee.FullName || employee.name,
 29:       email: employee.EmailAddress || employee.email,
 30:       phoneNo: employee.ContactNumber || employee.contactNumber || null,
 31:       roleCode: employee.RoleCode || employee.role,
 32:       allowLogin: employee.AllowLogin !== undefined ? employee.AllowLogin : employee.allowLogin,
 33:       createdAt: employee.CreatedDate || employee.createdAt
 34:     };
 35:   }
 36: 
 37:   /**
 38:    * Internal mapper to format API payloads for the Repository layer.
 39:    * Translates API field names to DB-native column names.
 40:    *
 41:    * @param {object} apiData - API payload.
 42:    * @returns {object} Repository-formatted object.
 43:    */
 44:   _mapToInternal(apiData) {
 45:     const internal = {};
 46:     if (apiData.employeeName) internal.FullName = apiData.employeeName;
 47:     if (apiData.name) internal.FullName = apiData.name;
 48:     if (apiData.email) internal.EmailAddress = apiData.email;
 49:     if (apiData.password) internal.Password = apiData.password;
 50:     if (apiData.roleCode) internal.RoleCode = apiData.roleCode;
 51:     if (apiData.role) internal.RoleCode = apiData.role;
 52:     if (apiData.roleId) internal.FkRoleId = apiData.roleId;
 53:     if (apiData.contactNumber) internal.ContactNumber = apiData.contactNumber;
 54:     if (apiData.allowLogin !== undefined) internal.AllowLogin = apiData.allowLogin;
 55:     return internal;
 56:   }
 57: 
 58:   /**
 59:    * Get all employees (paginated + filtered)
 60:    */
 61:   async getEmployees(queryParams) {
 62:     // Pass query rules (search, limits) to the repository
 63:     const result = await employeeRepository.findAll(queryParams);
 64:     return {
 65:       ...result,
 66:       data: result.data.map(e => this._mapToApi(e))
 67:     };
 68:   }
 69: 
 70:   /**
 71:    * Get an employee by ID
 72:    */
 73:   async getEmployeeById(id) {
 74:     const employee = await employeeRepository.findById(id);
 75:     if (!employee) {
 76:       const error = new Error('Employee not found');
 77:       error.statusCode = 404;
 78:       throw error;
 79:     }
 80:     return this._mapToApi(employee);
 81:   }
 82: 
 83:   /**
 84:    * Create a new employee
 85:    * Business Rules: Email must be unique. Password must be hashed.
 86:    */
 87:   async createEmployee(employeeData) {
 88:     const internalData = this._mapToInternal(employeeData);
 89: 
 90:     // 1. Check if email already exists
 91:     const existingEmployee = await employeeRepository.findByEmail(internalData.EmailAddress || internalData.email);
 92:     if (existingEmployee) {
 93:       const error = new Error('An employee with this email already exists');
 94:       error.statusCode = 409;
 95:       throw error;
 96:     }
 97: 
 98:     // 2. Hash the password before saving
 99:     const salt = await bcrypt.genSalt(10);
100:     const hashedPassword = await bcrypt.hash(internalData.Password || internalData.password, salt);
101: 
102:     // 3. Save via repository
103:     const newEmployee = await employeeRepository.create({
104:       ...internalData,
105:       Password: hashedPassword
106:     });
107: 
108:     return this._mapToApi(newEmployee);
109:   }
110: 
111:   /**
112:    * Update an existing employee
113:    */
114:   async updateEmployee(id, employeeData) {
115:     const existingEmployee = await employeeRepository.findById(id);
116:     if (!existingEmployee) {
117:       const error = new Error('Employee not found');
118:       error.statusCode = 404;
119:       throw error;
120:     }
121: 
122:     const updates = this._mapToInternal(employeeData);
123: 
124:     // If password is included in updates, hash it
125:     if (updates.Password) {
126:       const salt = await bcrypt.genSalt(10);
127:       updates.Password = await bcrypt.hash(updates.Password, salt);
128:     }
129: 
130:     const updatedEmployee = await employeeRepository.update(id, updates);
131:     return this._mapToApi(updatedEmployee);
132:   }
133: 
134:   /**
135:    * Enable or disable an employee's login access
136:    */
137:   async toggleAccess(adminId, employeeIdToToggle, allowLogin) {
138:     // Business Rule: Admins cannot disable their own account
139:     if (adminId.toString() === employeeIdToToggle.toString() && allowLogin === false) {
140:       const error = new Error('Cannot disable your own account');
141:       error.statusCode = 400;
142:       throw error;
143:     }
144: 
145:     const employee = await employeeRepository.patchAccess(employeeIdToToggle, allowLogin);
146:     if (!employee) {
147:       const error = new Error('Employee not found');
148:       error.statusCode = 404;
149:       throw error;
150:     }
151: 
152:     return this._mapToApi(employee);
153:   }
154: }
155: 
156: export default new EmployeeService();
````

## File: src/modules/order/order.repository.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/order/order.repository.js
  3: // Description: Data access layer for the Order module.
  4: //
  5: // Dual-Mode: Controlled by USE_MOCK_DB environment variable.
  6: //   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
  7: //   - USE_MOCK_DB=false → Live MySQL stored procedures
  8: //
  9: // SP Convention (api_procedure_spec_v1.md):
 10: //   - Reads:   prc_order_master_get (pAction=0 list, pAction=1 detail)
 11: //   - Upserts: prc_order_master_set (ID=0 insert, ID>0 update, pCancelRequested=1 cancel)
 12: //   - Party:   prc_Party_master_set (ID=0 find-or-create by phone)
 13: //
 14: // ⚠️ In LIVE mode, the atomic order creation (order_master → receiver_details
 15: //    → order_items → parcel_details) is handled entirely by the SP.
 16: //    In MOCK mode, we simulate the multi-step orchestration in-memory.
 17: // ============================================================================
 18: 
 19: import { v4 as uuidv4 } from 'uuid';
 20: import db from '../../infrastructure/database/db.js';
 21: 
 22: import {
 23:   seedParties,
 24:   seedOrderItems,
 25:   seedOrders,
 26:   seedParcels,
 27:   seedReceivers,
 28: } from './order.seed.js';
 29: 
 30: class OrderRepository {
 31:   // ============================================================================
 32:   // PARTY (SENDER) OPERATIONS
 33:   // ============================================================================
 34: 
 35:   /**
 36:    * Find-or-create a party (sender) by phone number.
 37:    * Procedure: CALL prc_Party_master_set(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
 38:    * Convention: ID=0 triggers insert-or-find-by-phone logic inside the SP.
 39:    *
 40:    * @param {object} senderData - { senderName, senderMobile, addressLine1?, city?, state?, pincode? }
 41:    * @returns {Promise<object>} The found or newly created party record.
 42:    */
 43:   async findOrCreateParty(senderData) {
 44:     // ------------------------------------------------------------------
 45:     // LIVE DB MODE: prc_Party_master_set (ID=0 → find-or-create by phone)
 46:     // ------------------------------------------------------------------
 47:     if (process.env.USE_MOCK_DB !== 'true') {
 48:       const [rows] = await db.execute('CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
 49:         0, // ID=0 → insert or find-by-phone
 50:         1, // pPartyTypeId: 1 = Sender
 51:         senderData.senderName,
 52:         senderData.senderMobile,
 53:         null, // EmailId
 54:         senderData.addressLine1 || null,
 55:         senderData.addressLine2 || null,
 56:         senderData.city || null,
 57:         senderData.state || null,
 58:         senderData.pincode || null,
 59:         senderData.createdBy || null,
 60:         1 // IsActive=1
 61:       ]);
 62:       return rows[0][0];
 63:     }
 64: 
 65:     // ------------------------------------------------------------------
 66:     // MOCK MODE: In-memory find-or-create by phone
 67:     // ------------------------------------------------------------------
 68:     let party = seedParties.find((p) => p.phoneNo === senderData.senderMobile);
 69:     if (!party) {
 70:       party = {
 71:         id: seedParties.length + 1,
 72:         customerName: senderData.senderName,
 73:         phoneNo: senderData.senderMobile,
 74:         addressLine1: senderData.addressLine1 || null,
 75:         addressLine2: senderData.addressLine2 || null,
 76:         city: senderData.city || null,
 77:         state: senderData.state || null,
 78:         pincode: senderData.pincode || null,
 79:         isActive: true
 80:       };
 81:       seedParties.push(party);
 82:     }
 83:     return party;
 84:   }
 85: 
 86:   // ============================================================================
 87:   // ORDER OPERATIONS
 88:   // ============================================================================
 89: 
 90:   /**
 91:    * Create a new order atomically (order_master → receiver_details → order_items → parcel_details).
 92:    * Procedure: CALL prc_order_master_set(0, ?)
 93:    * Convention: ID=0 triggers full atomic insert of the order graph.
 94:    *
 95:    * In LIVE mode: the full JSON payload is passed to the SP which handles the
 96:    * entire atomic transaction internally. The SP creates the order, receivers,
 97:    * items, and parcels in one shot.
 98:    *
 99:    * In MOCK mode: multi-step orchestration is done by the service layer calling
100:    * createReceiver(), createOrderItem(), createParcel() individually.
101:    *
102:    * @param {object} orderData - The full order payload (or mock fields).
103:    * @returns {Promise<object>} The created order record.
104:    */
105:   async createOrder(orderData) {
106:     // ------------------------------------------------------------------
107:     // LIVE DB MODE: prc_order_master_set (ID=0 → Atomic order creation)
108:     // The full order (sender + receivers + items + parcels) is created in
109:     // a single atomic stored procedure call. No partial writes.
110:     // ------------------------------------------------------------------
111:     if (process.env.USE_MOCK_DB !== 'true') {
112:       const [rows] = await db.execute('CALL prc_order_master_set(?, ?)', [
113:         0, // ID=0 → Insert new order
114:         JSON.stringify(orderData)
115:       ]);
116:       return rows[0][0];
117:     }
118: 
119:     // ------------------------------------------------------------------
120:     // MOCK MODE: In-memory order header creation
121:     // (receivers, items, parcels are created by service calling sub-methods)
122:     // ------------------------------------------------------------------
123:     const order = {
124:       id: seedOrders.length + 1,
125:       orderCode: `ORD-${Date.now()}`,
126:       fkSenderId: orderData.senderId,
127:       senderName: orderData.senderName,
128:       senderMobile: orderData.senderMobile,
129:       senderAddress: orderData.senderAddress,
130:       fkCourierId: orderData.courierId,
131:       totalAmount: 0,
132:       createdBy: orderData.createdBy || null,
133:       createdAt: new Date(),
134:       isActive: true
135:     };
136:     seedOrders.push(order);
137:     return order;
138:   }
139: 
140:   /**
141:    * Create a receiver row linked to an order.
142:    * MOCK MODE ONLY — in live mode, handled inside prc_order_master_set atomically.
143:    *
144:    * @param {number} orderId - FK to order_master.
145:    * @param {object} receiverData - Structured receiver fields.
146:    * @returns {Promise<object>} The created receiver_details record.
147:    */
148:   async createReceiver(orderId, receiverData) {
149:     // ------------------------------------------------------------------
150:     // LIVE DB: Not called — handled inside prc_order_master_set atomically.
151:     // ------------------------------------------------------------------
152: 
153:     // ------------------------------------------------------------------
154:     // MOCK MODE: In-memory receiver creation
155:     // ------------------------------------------------------------------
156:     const receiver = {
157:       id: seedReceivers.length + 1,
158:       fkOrderId: orderId,
159:       receiverName: receiverData.receiverName,
160:       receiverPhone: receiverData.receiverPhone || null,
161:       addressLine1: receiverData.addressLine1 || null,
162:       addressLine2: receiverData.addressLine2 || null,
163:       city: receiverData.city || null,
164:       state: receiverData.state || null,
165:       pincode: receiverData.pincode || null,
166:       country: receiverData.country || 'India',
167:       isActive: true
168:     };
169:     seedReceivers.push(receiver);
170:     return receiver;
171:   }
172: 
173:   /**
174:    * Create an order item linked to a receiver.
175:    * MOCK MODE ONLY — in live mode, handled inside prc_order_master_set atomically.
176:    *
177:    * @param {number} receiverDetailsId - FK to receiver_details.
178:    * @param {number} productId - FK to product_master.
179:    * @param {number} quantity - OutwardQty.
180:    * @param {number|null} unitPrice - Custom price or null (falls back to MaterialRate).
181:    * @returns {Promise<object>} The created order_items record.
182:    */
183:   async createOrderItem(receiverDetailsId, productId, quantity, unitPrice) {
184:     // ------------------------------------------------------------------
185:     // LIVE DB: Not called — handled inside prc_order_master_set atomically.
186:     // Pricing fallback (UnitPrice or MaterialRate) is handled by the procedure.
187:     // ------------------------------------------------------------------
188: 
189:     // ------------------------------------------------------------------
190:     // MOCK MODE: In-memory item creation
191:     // ------------------------------------------------------------------
192:     const item = {
193:       id: seedOrderItems.length + 1,
194:       fkReceiverDetailsId: receiverDetailsId,
195:       fkProductId: productId,
196:       outwardQty: quantity,
197:       unitPrice: unitPrice || 0
198:     };
199:     seedOrderItems.push(item);
200:     return item;
201:   }
202: 
203:   /**
204:    * Create a parcel linked to a receiver.
205:    * MOCK MODE ONLY — in live mode, handled inside prc_order_master_set atomically.
206:    * Convention: 1 receiver = 1 parcel.
207:    *
208:    * @param {number} receiverDetailsId - FK to receiver_details.
209:    * @param {number} courierId - FK to courier_partner_master.
210:    * @returns {Promise<object>} The created parcel_details record.
211:    */
212:   async createParcel(receiverDetailsId, courierId) {
213:     // ------------------------------------------------------------------
214:     // LIVE DB: Not called — handled inside prc_order_master_set atomically.
215:     // parcel_id is system-generated; TrackingNo starts as NULL.
216:     // FkParcelStatusId resolves to lu_details.LuDetailsId for "PENDING".
217:     // ------------------------------------------------------------------
218: 
219:     // ------------------------------------------------------------------
220:     // MOCK MODE: In-memory parcel creation
221:     // ------------------------------------------------------------------
222:     const parcel = {
223:       id: seedParcels.length + 1,
224:       fkReceiverDetailsId: receiverDetailsId,
225:       fkCourierId: courierId,
226:       parcel_id: `PDS-${uuidv4().split('-')[0].toUpperCase()}`,
227:       trackingNo: null,
228:       parcelStatusCode: 'PENDING',
229:       labelPrintCount: 0,
230:       dispatchDate: null,
231:       createdAt: new Date()
232:     };
233:     seedParcels.push(parcel);
234:     return parcel;
235:   }
236: 
237:   // ============================================================================
238:   // READ OPERATIONS
239:   // ============================================================================
240: 
241:   /**
242:    * Get all orders with derived summary (sender, receiver count, parcel count, derived status).
243:    * Procedure: CALL prc_order_master_get(0, ?, ?, ?, ?, ?)
244:    * Convention: pAction=0 → paginated list with dynamically derived order status.
245:    *
246:    * @param {object} filters - { page, limit, search, sortBy, sortOrder }
247:    * @returns {Promise<object>} { data: [...], total: number }
248:    */
249:   async findAllOrders(filters = {}) {
250:     // ------------------------------------------------------------------
251:     // LIVE DB MODE: prc_order_master_get (pAction=0 → Paginated summary)
252:     // The SP dynamically derives order status from parcel states.
253:     // ------------------------------------------------------------------
254:     if (process.env.USE_MOCK_DB !== 'true') {
255:       const [rows] = await db.execute('CALL prc_order_master_get(?, ?, ?, ?, ?, ?)', [
256:         0, // pAction=0 → Get all orders (paginated summary)
257:         filters.page || 1,
258:         filters.limit || 20,
259:         filters.search || null,
260:         filters.sortBy || 'CreatedDate',
261:         filters.sortOrder || 'desc'
262:       ]);
263:       return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
264:     }
265: 
266:     // ------------------------------------------------------------------
267:     // MOCK MODE: In-memory filtering with derived order status
268:     // ------------------------------------------------------------------
269:     const activeOrders = seedOrders.filter((o) => o.isActive);
270: 
271:     return {
272:       data: activeOrders.map((order) => {
273:         const sender = seedParties.find((p) => p.id === order.fkSenderId);
274:         const receivers = seedReceivers.filter((r) => r.fkOrderId === order.id);
275:         const parcels = seedParcels.filter((p) =>
276:           receivers.some((r) => r.id === p.fkReceiverDetailsId)
277:         );
278: 
279:         // ⚠️ DERIVED ORDER STATUS — calculated from parcel states (Systemflow Decision 2)
280:         const derivedStatus = this._deriveOrderStatus(parcels);
281: 
282:         return {
283:           id: order.id,
284:           orderCode: order.orderCode,
285:           senderName: order.senderName,
286:           senderMobile: order.senderMobile,
287:           totalAmount: order.totalAmount,
288:           totalReceivers: receivers.length,
289:           totalParcels: parcels.length,
290:           derivedStatus,
291:           createdAt: order.createdAt
292:         };
293:       }),
294:       total: activeOrders.length
295:     };
296:   }
297: 
298:   /**
299:    * Get full order aggregate (nested JSON: Order → Receivers → [Items, Parcel]).
300:    * Procedure: CALL prc_order_master_get(1, ?)
301:    * Convention: pAction=1 → single order aggregate with nested receivers, items, parcels.
302:    *
303:    * @param {number|string} orderId - PK of order_master.
304:    * @returns {Promise<object|null>} The full nested order aggregate, or null if not found.
305:    */
306:   async findById(orderId) {
307:     // ------------------------------------------------------------------
308:     // LIVE DB MODE: prc_order_master_get (pAction=1 → Aggregate)
309:     // The SP returns flat rows that may need mapping, or a JSON aggregate.
310:     // ------------------------------------------------------------------
311:     if (process.env.USE_MOCK_DB !== 'true') {
312:       const [rows] = await db.execute('CALL prc_order_master_get(?, ?)', [
313:         1, // pAction=1 → Get specific order aggregate
314:         orderId
315:       ]);
316:       return rows[0]?.[0] || null;
317:     }
318: 
319:     // ------------------------------------------------------------------
320:     // MOCK MODE: In-memory aggregate with hash map optimization
321:     // ------------------------------------------------------------------
322:     const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
323:     if (!order) return null;
324: 
325:     const sender = seedParties.find((p) => p.id === order.fkSenderId);
326: 
327:     // Filter relevant flat rows
328:     const receiversRaw = seedReceivers.filter((r) => r.fkOrderId === order.id);
329:     const orderItemsRaw = seedOrderItems.filter((i) =>
330:       receiversRaw.some((r) => r.id === i.fkReceiverDetailsId)
331:     );
332:     const parcelsRaw = seedParcels.filter((p) =>
333:       receiversRaw.some((r) => r.id === p.fkReceiverDetailsId)
334:     );
335: 
336:     // O(N) Hash Map Optimization to map Items & Parcels to their specific Receivers
337:     const receiverMap = new Map();
338: 
339:     receiversRaw.forEach((r) => {
340:       receiverMap.set(r.id, {
341:         ...r,
342:         items: [],
343:         parcel: null
344:       });
345:     });
346: 
347:     orderItemsRaw.forEach((item) => {
348:       if (receiverMap.has(item.fkReceiverDetailsId)) {
349:         receiverMap.get(item.fkReceiverDetailsId).items.push(item);
350:       }
351:     });
352: 
353:     parcelsRaw.forEach((parcel) => {
354:       if (receiverMap.has(parcel.fkReceiverDetailsId)) {
355:         receiverMap.get(parcel.fkReceiverDetailsId).parcel = parcel;
356:       }
357:     });
358: 
359:     // ⚠️ DERIVED ORDER STATUS
360:     const derivedStatus = this._deriveOrderStatus(parcelsRaw);
361: 
362:     return {
363:       id: order.id,
364:       orderCode: order.orderCode,
365:       senderName: order.senderName,
366:       senderMobile: order.senderMobile,
367:       senderAddress: order.senderAddress,
368:       totalAmount: order.totalAmount,
369:       derivedStatus,
370:       createdAt: order.createdAt,
371:       sender,
372:       receivers: Array.from(receiverMap.values())
373:     };
374:   }
375: 
376:   // ============================================================================
377:   // UPDATE & CANCEL OPERATIONS
378:   // ============================================================================
379: 
380:   /**
381:    * Update an existing order (sender, receivers, items).
382:    * Procedure: CALL prc_order_master_set(orderId, ?)
383:    * Convention: ID>0 triggers update. SP rejects if any parcel ≥ AWB_LINKED.
384:    *
385:    * ❗ BUSINESS RULE: Must fail if any parcel status ≥ AWB_LINKED.
386:    *
387:    * @param {number|string} orderId - PK of order_master.
388:    * @param {object} payload - Updated order payload.
389:    * @returns {Promise<object|null>} The updated order, or null if not found / blocked.
390:    */
391:   async updateOrder(orderId, payload) {
392:     // ------------------------------------------------------------------
393:     // LIVE DB MODE: prc_order_master_set (ID>0 → Update)
394:     // The SP enforces the AWB_LINKED threshold check internally.
395:     // ------------------------------------------------------------------
396:     if (process.env.USE_MOCK_DB !== 'true') {
397:       const [rows] = await db.execute('CALL prc_order_master_set(?, ?)', [
398:         orderId, // ID>0 → Update existing order
399:         JSON.stringify(payload)
400:       ]);
401:       return rows[0]?.[0] || null;
402:     }
403: 
404:     // ------------------------------------------------------------------
405:     // MOCK MODE: In-memory update with AWB threshold check
406:     // ------------------------------------------------------------------
407:     const orderIndex = seedOrders.findIndex((o) => o.id === parseInt(orderId) && o.isActive);
408:     if (orderIndex === -1) return null;
409: 
410:     // Check threshold: reject if any parcel ≥ AWB_LINKED
411:     const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
412:     const parcels = seedParcels.filter((p) =>
413:       receivers.some((r) => r.id === p.fkReceiverDetailsId)
414:     );
415: 
416:     const BLOCKED_STATUSES = ['AWB_LINKED', 'DISPATCHED', 'DELIVERED'];
417:     const hasBlockedParcel = parcels.some((p) => BLOCKED_STATUSES.includes(p.parcelStatusCode));
418:     if (hasBlockedParcel) {
419:       const error = new Error('Cannot update order: one or more parcels have already been AWB-linked or dispatched.');
420:       error.statusCode = 400;
421:       throw error;
422:     }
423: 
424:     // Apply updates to the order header
425:     seedOrders[orderIndex] = {
426:       ...seedOrders[orderIndex],
427:       senderName: payload.senderName || seedOrders[orderIndex].senderName,
428:       senderMobile: payload.senderMobile || seedOrders[orderIndex].senderMobile,
429:       senderAddress: payload.senderAddress || seedOrders[orderIndex].senderAddress,
430:       fkCourierId: payload.courierId || seedOrders[orderIndex].fkCourierId
431:     };
432: 
433:     return seedOrders[orderIndex];
434:   }
435: 
436:   /**
437:    * Cancel an order and cascade to all parcels.
438:    * Procedure: CALL prc_order_master_set(orderId, pCancelRequested=1)
439:    * Convention: pCancelRequested flag triggers cascading cancellation.
440:    * SP internally invokes prc_receiver_status_details_set for each parcel.
441:    *
442:    * ❌ Cannot cancel if any parcel is DISPATCHED or DELIVERED.
443:    * ✔ Cascades cancellation to all parcels.
444:    * ✔ Logs each status change to receiver_status_details.
445:    *
446:    * @param {number|string} orderId - PK of order_master.
447:    * @param {string} cancelledBy - EmployeeCode of the user performing cancellation.
448:    * @returns {Promise<object|null>} Cancellation result, or null if not found.
449:    */
450:   async cancelOrder(orderId, cancelledBy) {
451:     // ------------------------------------------------------------------
452:     // LIVE DB MODE: prc_order_master_set (pCancelRequested=1)
453:     // The SP handles cascading cancellation and audit logging internally.
454:     // ------------------------------------------------------------------
455:     if (process.env.USE_MOCK_DB !== 'true') {
456:       const [rows] = await db.execute('CALL prc_order_master_set(?, ?, ?)', [
457:         orderId,
458:         JSON.stringify({ pCancelRequested: 1 }),
459:         cancelledBy
460:       ]);
461:       return rows[0]?.[0] || null;
462:     }
463: 
464:     // ------------------------------------------------------------------
465:     // MOCK MODE: In-memory cascading cancellation
466:     // ------------------------------------------------------------------
467:     const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
468:     if (!order) return null;
469: 
470:     const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
471:     const parcels = seedParcels.filter((p) =>
472:       receivers.some((r) => r.id === p.fkReceiverDetailsId)
473:     );
474: 
475:     // Business rule: cannot cancel if any parcel is dispatched or delivered
476:     const TERMINAL_BLOCKING = ['DISPATCHED', 'DELIVERED'];
477:     const hasBlockingParcel = parcels.some((p) => TERMINAL_BLOCKING.includes(p.parcelStatusCode));
478:     if (hasBlockingParcel) {
479:       const error = new Error('Cannot cancel order: one or more parcels are already dispatched or delivered.');
480:       error.statusCode = 400;
481:       throw error;
482:     }
483: 
484:     // Cascade cancellation: mark all parcels as CANCELLED
485:     parcels.forEach((parcel) => {
486:       const index = seedParcels.findIndex((p) => p.id === parcel.id);
487:       if (index !== -1) {
488:         seedParcels[index].parcelStatusCode = 'CANCELLED';
489:         // ✔ In the real DB, prc_order_master_set appends a row to receiver_status_details
490:         // for each parcel with ActionType = 'STATUS_UPDATE'
491:       }
492:     });
493: 
494:     return {
495:       orderId: order.id,
496:       orderCode: order.orderCode,
497:       cancelledParcels: parcels.length,
498:       cancelledBy,
499:       cancelledAt: new Date()
500:     };
501:   }
502: 
503:   // ============================================================================
504:   // INTERNAL HELPERS (MOCK MODE ONLY)
505:   // ============================================================================
506: 
507:   /**
508:    * Derives order status from aggregated parcel states (Systemflow Decision 2).
509:    * MOCK MODE ONLY — in live DB mode, the SP computes this dynamically.
510:    *
511:    * @param {Array} parcels - Array of parcel_details records.
512:    * @returns {string} The derived order status string.
513:    * @private
514:    */
515:   _deriveOrderStatus(parcels) {
516:     if (!parcels || parcels.length === 0) return 'Created';
517: 
518:     const statuses = parcels.map((p) => p.parcelStatusCode);
519: 
520:     const allMatch = (status) => statuses.every((s) => s === status);
521:     const someMatch = (status) => statuses.some((s) => s === status);
522: 
523:     if (allMatch('CANCELLED')) return 'Cancelled';
524:     if (allMatch('DELIVERED')) return 'Completed';
525:     if (allMatch('DISPATCHED')) return 'Dispatched';
526:     if (someMatch('DISPATCHED') || someMatch('DELIVERED')) return 'Partially Dispatched';
527:     if (allMatch('LABEL_PRINTED') || allMatch('AWB_LINKED')) return 'Label Printed';
528:     if (someMatch('LABEL_PRINTED') || someMatch('AWB_LINKED')) return 'Partially Printed';
529:     if (allMatch('PENDING')) return 'Created';
530: 
531:     return 'Created';
532:   }
533: }
534: 
535: export default new OrderRepository();
````

## File: src/shared/middleware/auth.middleware.js
````javascript
 1: import jwt from 'jsonwebtoken';
 2: import employeeRepository from '../../modules/employee/employee.repository.js';
 3: 
 4: export const protect = async (req, res, next) => {
 5:   let token;
 6: 
 7:   // 1. Check if token exists in headers
 8:   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
 9:     try {
10:       // 2. Extract token
11:       token = req.headers.authorization.split(' ')[1];
12: 
13:       // 3. Verify token using your secret key
14:       const decoded = jwt.verify(token, process.env.JWT_SECRET);
15: 
16:       // 4. Fetch user from MySQL via the Repository (excluding password)
17:       // Make sure your sp_get_user_by_id doesn't return the password!
18:       const user = await employeeRepository.findById(decoded.id);
19: 
20:       if (!user) {
21:         res.status(401);
22:         throw new Error('Not authorized, user not found');
23:       }
24: 
25:       // 5. Attach normalized user to the request object.
26:       //    Raw repository data may use PascalCase (mock) or camelCase (live DB).
27:       //    We normalize to a canonical shape so downstream middleware (authorizeRoles)
28:       //    and controllers always see consistent field names.
29:       req.user = {
30:         id: user.EmployeeCode || user.employeeCode || user.id,
31:         employeeCode: user.EmployeeCode || user.employeeCode,
32:         name: user.FullName || user.name,
33:         email: user.EmailAddress || user.email,
34:         role: user.RoleCode || user.role,
35:         allowLogin: user.AllowLogin ?? user.allowLogin,
36:       };
37:       next();
38:     } catch (error) {
39:       console.error(error);
40:       res.status(401);
41:       next(new Error('Not authorized, token failed'));
42:     }
43:   } else {
44:     res.status(401);
45:     next(new Error('Not authorized, no token'));
46:   }
47: };
48: 
49: // Flexible Role-Based Access Control (RBAC)
50: export const authorizeRoles = (...roles) => {
51:   return (req, res, next) => {
52:     if (!req.user || !roles.includes(req.user.role)) {
53:       res.status(403); // Forbidden
54:       return next(new Error(`User role '${req.user ? req.user.role : 'GUEST'}' is not authorized for this route`));
55:     }
56:     next();
57:   };
58: };
````

## File: .gitignore
````
 1: # Node modules
 2: node_modules/
 3: 
 4: # Logs
 5: npm-debug.log*
 6: yarn-debug.log*
 7: yarn-error.log*
 8: 
 9: # Environment variables
10: .env
11: 
12: # Build outputs
13: build/
14: dist/
15: 
16: # OS files
17: .DS_Store
18: Thumbs.db
19: 
20: # IDE
21: .vscode/
22: .idea/
23: 
24: # React Native
25: .expo/
26: .expo-shared/
27: 
28: # Coverage
29: coverage/
30: 
31: #Agents/ LLM
32: Agents.md
33: API_Contract.md
34: Database_Procedures_Requirements.md
35: Systemflow.md
36: sdcms-server.md
37: sdcms-server.xml
38: antigravity-output/
````

## File: src/modules/auth/auth.service.js
````javascript
 1: // ============================================================================
 2: // File: src/modules/auth/auth.service.js
 3: // Description: Unifies authentication logic (Login) using the centralized 
 4: // Employee Repository, removing the legacy duplicate User dependency.
 5: // ============================================================================
 6: 
 7: import bcrypt from 'bcryptjs';
 8: import employeeRepository from '../employee/employee.repository.js';
 9: import generateToken from '../../shared/utils/generateToken.js';
10: 
11: class AuthService {
12:   /**
13:    * Orchestrates the login flow.
14:    */
15:   async loginUser(email, password) {
16:     const employee = await employeeRepository.findByEmail(email);
17:     
18:     // Compare the raw password with the hashed password.
19:     // Dual-case access: mock seed uses PascalCase (Password), live DB may use camelCase.
20:     const storedPassword = employee?.Password || employee?.password;
21: 
22:     if (employee && storedPassword && (await bcrypt.compare(password, storedPassword))) {
23:       
24:       // Enforce the Toggle-Access restriction
25:       const canLogin = employee.AllowLogin ?? employee.allowLogin;
26:       if (canLogin === false) {
27:         const error = new Error('Your account has been locked. Contact your Admin.');
28:         error.statusCode = 403;
29:         throw error;
30:       }
31: 
32:       const empCode = employee.EmployeeCode || employee.employeeCode;
33: 
34:       return {
35:         id: empCode,
36:         employeeCode: empCode,
37:         name: employee.FullName || employee.name,
38:         email: employee.EmailAddress || employee.email,
39:         role: employee.RoleCode || employee.role,
40:         token: generateToken(empCode), // Using employeeCode as identifier in JWT
41:       };
42:     } else {
43:       const error = new Error('Invalid email or password');
44:       error.statusCode = 401;
45:       throw error;
46:     }
47:   }
48: 
49:   /**
50:    * Internal mapper to standardize Profile queries to the camelCase API contract.
51:    * Leverages Employee schema properties.
52:    */
53:   _mapToApi(profile) {
54:     if (!profile) return null;
55:     return {
56:       employeeCode: profile.EmployeeCode || profile.employeeCode,
57:       firstName: profile.FullName || profile.name || profile.firstName,
58:       email: profile.EmailAddress || profile.email,
59:       phoneNo: profile.ContactNumber || profile.contactNumber || null,
60:       roleCode: profile.RoleCode || profile.role,
61:       allowLogin: profile.AllowLogin !== undefined ? profile.AllowLogin : profile.allowLogin,
62:       createdAt: profile.CreatedDate || profile.createdAt
63:     };
64:   }
65: 
66:   /**
67:    * Retrieves fresh profile data from the database.
68:    * Ensures the data is up-to-date even if the JWT is old.
69:    * 
70:    * @param {string} employeeCode - The unique identifier from the JWT.
71:    * @returns {Promise<Object>} The employee profile data.
72:    */
73:   async getProfile(employeeCode) {
74:     const profile = await employeeRepository.findById(employeeCode);
75:     
76:     if (!profile) {
77:       const error = new Error('Employee profile not found');
78:       error.statusCode = 404;
79:       throw error;
80:     }
81: 
82:     return this._mapToApi(profile);
83:   }
84: }
85: 
86: export default new AuthService();
````

## File: src/modules/order/order.service.js
````javascript
  1: // ============================================================================
  2: // File: src/modules/order/order.service.js
  3: // Description: Business logic layer for the Order module.
  4: // Orchestrates repository calls and enforces business rules.
  5: //
  6: // Dual-Mode: In LIVE mode, createOrder passes the full JSON payload to a
  7: // single atomic SP call. In MOCK mode, it orchestrates multi-step creation
  8: // through individual repository sub-methods.
  9: //
 10: // Procedure mapping: prc_order_master_set (upsert/cancel), prc_order_master_get (reads).
 11: // ============================================================================
 12: 
 13: import orderRepository from './order.repository.js';
 14: 
 15: class OrderService {
 16:   /**
 17:    * Process a new complex order creation.
 18:    *
 19:    * LIVE MODE:  Passes full JSON payload → prc_order_master_set(0, ?) atomic creation.
 20:    * MOCK MODE:  Multi-step orchestration: find-or-create sender → create order →
 21:    *             add receivers → add items → generate parcels.
 22:    *
 23:    * @param {object} payload - Validated order payload from Zod schema.
 24:    * @param {object} user - Authenticated user from JWT (req.user).
 25:    * @returns {Promise<object>} Created order with nested receivers and parcels.
 26:    */
 27:   async createOrder(payload, user) {
 28:     const { senderName, senderMobile, senderAddress, courierId, products, receivers } = payload;
 29:     const createdBy = user?.employeeCode || null;
 30: 
 31:     // ------------------------------------------------------------------
 32:     // LIVE DB MODE: Single atomic SP call
 33:     // The SP handles the entire order graph creation atomically.
 34:     // ------------------------------------------------------------------
 35:     if (process.env.USE_MOCK_DB !== 'true') {
 36:       const orderPayload = {
 37:         senderName,
 38:         senderMobile,
 39:         senderAddress,
 40:         courierId,
 41:         products,
 42:         receivers,
 43:         createdBy
 44:       };
 45: 
 46:       // Step 1: Find-or-create the sender (still a separate SP call)
 47:       await orderRepository.findOrCreateParty({ senderName, senderMobile, createdBy });
 48: 
 49:       // Step 2: Create the full order atomically via SP
 50:       const result = await orderRepository.createOrder(orderPayload);
 51:       return result;
 52:     }
 53: 
 54:     // ------------------------------------------------------------------
 55:     // MOCK MODE: Multi-step orchestration
 56:     // ------------------------------------------------------------------
 57: 
 58:     // Step 1: Find-or-create the sender in Party_master
 59:     const sender = await orderRepository.findOrCreateParty({
 60:       senderName,
 61:       senderMobile,
 62:       createdBy
 63:     });
 64: 
 65:     // Step 2: Create the order header
 66:     const order = await orderRepository.createOrder({
 67:       senderId: sender.id,
 68:       senderName,
 69:       senderMobile,
 70:       senderAddress,
 71:       courierId,
 72:       createdBy
 73:     });
 74: 
 75:     // Step 3: Build receiver list
 76:     // If no receivers provided, default to sender-as-receiver (Mode A / Mode C)
 77:     let receiversList = receivers;
 78:     if (!receiversList || receiversList.length === 0) {
 79:       if (!products || products.length === 0) {
 80:         const error = new Error('An order must contain products at the root level if no explicit receivers are assigned.');
 81:         error.statusCode = 400;
 82:         throw error;
 83:       }
 84: 
 85:       receiversList = [{
 86:         receiverName: senderName,
 87:         receiverPhone: senderMobile,
 88:         addressLine1: senderAddress,
 89:         products
 90:       }];
 91:     }
 92: 
 93:     // Step 4: Process each receiver → items → parcel
 94:     const aggregatedReceivers = [];
 95:     let totalAmount = 0;
 96: 
 97:     for (const rec of receiversList) {
 98:       const receiverRecord = await orderRepository.createReceiver(order.id, {
 99:         receiverName: rec.receiverName,
100:         receiverPhone: rec.receiverPhone || null,
101:         addressLine1: rec.addressLine1 || null,
102:         addressLine2: rec.addressLine2 || null,
103:         city: rec.city || null,
104:         state: rec.state || null,
105:         pincode: rec.pincode || null,
106:         country: rec.country || 'India'
107:       });
108: 
109:       const savedItems = [];
110: 
111:       for (const prod of rec.products || []) {
112:         const item = await orderRepository.createOrderItem(
113:           receiverRecord.id,
114:           prod.productId,
115:           prod.quantity,
116:           prod.unitPrice || null
117:         );
118:         savedItems.push(item);
119: 
120:         // Accumulate total
121:         totalAmount += (prod.unitPrice || 0) * (prod.quantity || 0);
122:       }
123: 
124:       // 1 receiver = 1 parcel (Systemflow Part 3, Step 5)
125:       const parcel = await orderRepository.createParcel(receiverRecord.id, courierId);
126: 
127:       aggregatedReceivers.push({
128:         ...receiverRecord,
129:         items: savedItems,
130:         parcel
131:       });
132:     }
133: 
134:     return {
135:       orderId: order.id,
136:       orderCode: order.orderCode,
137:       totalAmount,
138:       senderName: order.senderName,
139:       receivers: aggregatedReceivers
140:     };
141:   }
142: 
143:   /**
144:    * Internal mapper for order summary list (flat).
145:    */
146:   _mapOrderSummary(order) {
147:     if (!order) return null;
148:     return {
149:       id: order.PkOrderId || order.id || order.orderId,
150:       orderCode: order.OrderCode || order.orderCode,
151:       senderName: order.SenderName || order.senderName,
152:       senderMobile: order.SenderMobile || order.senderMobile,
153:       totalAmount: order.TotalAmount || order.totalAmount,
154:       totalReceivers: order.TotalReceivers !== undefined ? order.TotalReceivers : order.totalReceivers,
155:       totalParcels: order.TotalParcels !== undefined ? order.TotalParcels : order.totalParcels,
156:       derivedStatus: order.DerivedStatus || order.derivedStatus,
157:       createdAt: order.CreatedDate || order.createdAt
158:     };
159:   }
160: 
161:   /**
162:    * Internal mapper for deep order detail (nested aggregate).
163:    */
164:   _mapOrderDetail(order) {
165:     if (!order) return null;
166:     
167:     const mappedOrder = {
168:       id: order.PkOrderId || order.id || order.orderId,
169:       orderCode: order.OrderCode || order.orderCode,
170:       totalAmount: order.TotalAmount || order.totalAmount,
171:       senderName: order.SenderName || order.senderName,
172:       senderMobile: order.SenderMobile || order.senderMobile,
173:       senderAddress: order.SenderAddress || order.senderAddress,
174:       derivedStatus: order.DerivedStatus || order.derivedStatus,
175:       createdAt: order.CreatedDate || order.createdAt,
176:       receivers: []
177:     };
178: 
179:     const receiversList = order.receivers || order.Receivers || [];
180:     mappedOrder.receivers = receiversList.map(rec => {
181:       const mappedRec = {
182:         id: rec.PkReceiverDetailsId || rec.id,
183:         receiverName: rec.ReceiverName || rec.receiverName,
184:         receiverPhone: rec.ReceiverPhone || rec.receiverPhone,
185:         addressLine1: rec.AddressLine1 || rec.addressLine1,
186:         addressLine2: rec.AddressLine2 || rec.addressLine2,
187:         city: rec.City || rec.city,
188:         state: rec.State || rec.state,
189:         pincode: rec.Pincode || rec.pincode,
190:         country: rec.Country || rec.country,
191:         items: [],
192:         parcel: null
193:       };
194: 
195:       const itemsList = rec.items || rec.Items || [];
196:       mappedRec.items = itemsList.map(item => ({
197:         id: item.PkOrderItemsId || item.id,
198:         productId: item.FkProductId || item.productId,
199:         quantity: item.OutwardQty || item.quantity || item.outwardQty,
200:         unitPrice: item.UnitPrice || item.unitPrice
201:       }));
202: 
203:       const p = rec.parcel || rec.Parcel;
204:       if (p) {
205:         mappedRec.parcel = {
206:           id: p.PkParcelDetailsId || p.id,
207:           parcelId: p.ParcelId || p.parcel_id,
208:           trackingNo: p.TrackingNo || p.trackingNo,
209:           status: p.ParcelStatusCode || p.parcelStatusCode,
210:           dispatchDate: p.DispatchDate || p.dispatchDate
211:         };
212:       }
213: 
214:       return mappedRec;
215:     });
216: 
217:     return mappedOrder;
218:   }
219: 
220:   /**
221:    * Get paginated order summary list with derived statuses.
222:    * Maps to prc_order_master_get (pAction=0).
223:    *
224:    * @param {object} filters - { page, limit, search, sortBy, sortOrder }
225:    * @returns {Promise<object>} { data: [...], total: number }
226:    */
227:   async getOrderSummaryList(filters) {
228:     const result = await orderRepository.findAllOrders(filters);
229:     return {
230:       ...result,
231:       data: result.data.map(o => this._mapOrderSummary(o))
232:     };
233:   }
234: 
235:   /**
236:    * Get full order aggregate by ID (nested JSON).
237:    * Maps to prc_order_master_get (pAction=1).
238:    *
239:    * @param {number|string} orderId
240:    * @returns {Promise<object>} Full nested order aggregate.
241:    * @throws {Error} 404 if order not found.
242:    */
243:   async getOrderDetails(orderId) {
244:     const data = await orderRepository.findById(orderId);
245:     if (!data) {
246:       const error = new Error('Order not found');
247:       error.statusCode = 404;
248:       throw error;
249:     }
250:     return this._mapOrderDetail(data);
251:   }
252: 
253:   /**
254:    * Update an existing order.
255:    * Maps to prc_order_master_set (ID>0).
256:    *
257:    * ❗ Business rule: Must fail if any parcel status ≥ AWB_LINKED.
258:    * This is enforced in both the repository mock and the stored procedure.
259:    *
260:    * @param {number|string} orderId
261:    * @param {object} payload - Updated order data.
262:    * @returns {Promise<object>} Updated order record.
263:    * @throws {Error} 404 if order not found, 400 if update blocked.
264:    */
265:   async updateOrder(orderId, payload) {
266:     const result = await orderRepository.updateOrder(orderId, payload);
267:     if (!result) {
268:       const error = new Error('Order not found');
269:       error.statusCode = 404;
270:       throw error;
271:     }
272:     return this._mapOrderSummary(result);
273:   }
274: 
275:   /**
276:    * Cancel an order and cascade to all parcels.
277:    * Maps to prc_order_master_set (pCancelRequested=1).
278:    *
279:    * ❌ Cannot cancel if any parcel is DISPATCHED or DELIVERED.
280:    * ✔ Cascades cancellation to all parcels.
281:    * ✔ Logs each status change to receiver_status_details.
282:    *
283:    * @param {number|string} orderId
284:    * @param {object} user - Authenticated user from JWT (req.user).
285:    * @returns {Promise<object>} Cancellation result.
286:    * @throws {Error} 404 if order not found, 400 if cancellation blocked.
287:    */
288:   async cancelOrder(orderId, user) {
289:     const cancelledBy = user?.employeeCode || 'SYSTEM';
290:     const result = await orderRepository.cancelOrder(orderId, cancelledBy);
291:     if (!result) {
292:       const error = new Error('Order not found');
293:       error.statusCode = 404;
294:       throw error;
295:     }
296:     return this._mapOrderSummary(result);
297:   }
298: }
299: 
300: export default new OrderService();
````

## File: package.json
````json
 1: {
 2:   "name": "sdcms-server",
 3:   "version": "1.0.0",
 4:   "type": "module",
 5:   "description": "Node Backend server for the Smart Dispatch and Courier Management System",
 6:   "main": "index.js",
 7:   "scripts": {
 8:     "test": "echo \"Error: no test specified\" && exit 1",
 9:     "setup": "npm install",
10:     "clean": "rm -rf node_modules package-lock.json",
11:     "reinstall": "npm run clean && npm install",
12:     "check:env": "node -e \"If(!process.version.startsWith('v24')){console.error('!!! Use Node 24');process.exit(1)} else {console.log('Node Version OK')}\"",
13:     "start": "node src/server.js",
14:     "server": "nodemon --ext js,yaml src/server.js",
15:     "seed": "node src/infrastructure/database/seeders.js",
16:     "test": "jest",
17:     "test:e2e": "USE_MOCK_DB=true jest tests/e2e/mock_api.test.js"
18:   },
19:   "repository": {
20:     "type": "git",
21:     "url": "y"
22:   },
23:   "engines": {
24:     "node": ">= 24 <25",
25:     "npm": ">=11"
26:   },
27:   "author": "Aditya Bachawad",
28:   "license": "ISC",
29:   "dependencies": {
30:     "bcryptjs": "^3.0.3",
31:     "cors": "^2.8.6",
32:     "dotenv": "^17.3.1",
33:     "express": "^5.2.1",
34:     "express-async-handler": "^1.2.0",
35:     "jsonwebtoken": "^9.0.3",
36:     "mysql2": "^3.20.0",
37:     "uuid": "^13.0.0",
38:     "yamljs": "^0.3.0",
39:     "zod": "^4.3.6"
40:   },
41:   "devDependencies": {
42:     "jest": "^30.3.0",
43:     "nodemon": "^3.1.14",
44:     "supertest": "^7.2.2"
45:   }
46: }
````

## File: src/app.js
````javascript
 1: import express from 'express';
 2: import cors from 'cors';
 3: import yaml from 'yamljs';
 4: 
 5: // Import Domain Routes (Note the mandatory .js extension)
 6: import authRoutes from './interfaces/http/routes/auth.routes.js';
 7: import employeeRoutes from './interfaces/http/routes/employee.routes.js';
 8: import courierRoutes from './interfaces/http/routes/courier.routes.js';
 9: import productRoutes from './interfaces/http/routes/product.routes.js';
10: import orderRoutes from './interfaces/http/routes/order.routes.js';
11: import senderRoutes from './interfaces/http/routes/sender.routes.js';
12: import parcelRoutes from './interfaces/http/routes/parcel.routes.js';
13: import parcelEventsRoutes from './interfaces/http/routes/parcel-events.routes.js';
14: import bulkUploadRoutes from './interfaces/http/routes/bulk-upload.routes.js';
15: import systemRoutes from './interfaces/http/routes/system.routes.js';
16: import dashboardRoutes from './interfaces/http/routes/dashboard.routes.js';
17: import notificationRoutes from './interfaces/http/routes/notification.routes.js';
18: 
19: // Import Error Middlewares
20: import { notFound, errorHandler } from './shared/middleware/error.middleware.js';
21: 
22: 
23: // running server
24: const app = express();
25: 
26: // ----------------------------------------------------
27: // Top-Level Middlewares (Parsers and CORS)
28: // ----------------------------------------------------
29: app.use(cors());
30: app.use(express.json()); // Essential so that req.body works in your controllers!
31: app.use(express.urlencoded({ extended: true }));
32: 
33: // ----------------------------------------------------
34: // Application Routes
35: // ----------------------------------------------------
36: // Standard practice: group routes by their domain module
37: app.use('/api/v1/auth', authRoutes);
38: app.use('/api/v1/employees', employeeRoutes);
39: app.use('/api/v1/courier-partners', courierRoutes);
40: app.use('/api/v1/products', productRoutes);
41: app.use('/api/v1/orders', orderRoutes);
42: app.use('/api/v1/senders', senderRoutes);
43: app.use('/api/v1/parcels', parcelRoutes);
44: app.use('/api/v1/parcel-events', parcelEventsRoutes);
45: app.use('/api/v1/bulk-uploads', bulkUploadRoutes);
46: app.use('/api/v1/system', systemRoutes);
47: app.use('/api/v1/dashboard', dashboardRoutes);
48: app.use('/api/v1', notificationRoutes);
49: 
50: // SwaggerUI Documentation
51: // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
52: 
53: // ----------------------------------------------------
54: // Error Middlewares (MUST BE ABSOLUTE LAST)
55: // ----------------------------------------------------
56: app.use(notFound);       // If the URL didn't match /api/users or /api-docs, it hits this 404
57: app.use(errorHandler);   // If a controller throws an Error, this catches it
58: 
59: // Exporting using ES Module syntax
60: export default app;
````
