## 1. Project Overview & Domain Language
- **Role:** You are an expert Node.js/Express backend developer.
- **Core Principle:** "Order = planning, Parcel = execution." Execution and tracking always happen at the physical parcel level, never at the overarching order level.
- **Tech Stack:** Node.js, Express.js, MySQL (via Stored Procedures).
- **Architecture:** Layered REST API. Routes & Controllers in `src/interfaces/http/`, Services and Repositories in `src/modules/`.

### Domain Vocabulary (Strictly Enforced)
Use these exact terms in code, comments, and variables:
- **order:** Planning unit linking a customer to receivers. Status is mathematically derived from its parcels, never stored directly.
- **receiver:** Delivery destination within an order. An order can have multiple receivers.
- **parcel:** The physical shipment unit and single source of truth for execution. A receiver can have multiple parcels.
- **parcel_id:** The unique identifier generated at parcel creation. The backend provides this ID; the frontend is entirely responsible for dynamically generating the QR code. The backend does NOT store QR code images or generation strings.
- **awb_number:** Airway Bill (courier tracking number).
- **receiver_status_details:** The append-only table used for logging all scans, actions, and status history.

## 2. Project Artifacts & Rules
- **Artifact Location:** All supporting architectural documents, including `api_procedure_spec.md` and `db_schema_v1`, are located in the `.agent/rules/` directory. You must automatically reference these files to understand the expected inputs, outputs, and database structures.

## 3. Core Architectural Rules

### A. Zero Direct Database Operations (Repositories)
- **Rule:** The Service layer must **never** directly manipulate tables.
- **Implementation:** Every Repository method MUST explicitly document and execute `CALL prc_...` stored procedures. Do not write raw SQL `SELECT`, `INSERT`, or `UPDATE` statements or use an ORM for queries.

### B. Route Standards & API Conventions
- **Prefixing:** All routes must strictly use the `/api/v1/...` prefix.
- **Response Format:** Every endpoint must return: `{ success: boolean, data?: any, error?: string }`. Do not expose raw DB errors to the client.
- **Validation:** All incoming request payloads (especially the bulk upload arrays) MUST be validated using a **Zod** schema before being passed to the Service layer. Return clear API errors if validation fails.

### C. Logging & Documentation
- **Injection Sites:** Repository and Service injection sites must be explicitly documented with heavy commentary, identical to the existing auth flow setup.
- **Append-Only Logs:** All events are logged in `receiver_status_details`. These logs are event-driven and append-only—never update or delete an existing log (this maintains an immutable audit trail).
- **JSDoc:** All Service and Repository methods must be documented using JSDoc comments explaining their purpose, parameters, and return types.
  
### D. Error Handling & Quality

- **Error Handling:** Always wrap asynchronous Express route controllers with `express-async-handler` to automatically pass exceptions to the global error handler, avoiding manual `try/catch` blocks at the route level. For underlying Service layer methods and external API calls, use standard `try/catch` blocks. Log all errors with context (function name, input params) using our standard logger; NEVER use `console.log`.
- **Code Quality:** Keep functions under 40 lines. If a function does too much, split it into smaller helper functions.
- **Modern JS:** Always prefer `const` over `let` (never use `var`), and use arrow functions for callbacks and component definitions.

## 4. Database & Procedure Standards
- **Foreign Key Constraints:** We do NOT enforce hard foreign key constraints in our database schemas to maintain table flexibility. Instead, we use a strict naming convention: any column name starting with `Fk` (e.g., `Fk[columnname]`) signifies a reference to another table. You must automatically treat these columns as foreign key references in your logic.
- **Upsert Operations:** Always use `prc_[tablename]_set` procedures to upsert (insert or update) entries into tables (e.g., for form submissions). Never use direct `INSERT` or `UPDATE` queries.
- **Read Operations:** Always use `prc_[tablename]_get` procedures for transactional read operations, such as fetching all entity names or retrieving a specific entity by its ID.
- **Action Parameters:** You must pass `pAction` as a parameter to procedures (especially `_get` procedures). The `pAction` value (e.g., 0, 1) signifies which specific database operation or transaction the procedure should execute.
- **Duplication Checks:** Use `prc_checkduplicate_[tablename]` procedures whenever you need to verify if an entity is duplicated.
- **Security:** Always use parameterized queries for database interactions; never concatenate user input into SQL strings.

## 5. Business Logic & State Transitions

### A. Strict Parcel Status Flow
- **Sequence:** Created -> Label Printed -> AWB Linked -> Dispatched -> Delivered.
- **QR First:** No AWB can be linked before a QR scan (parcel must be `Label Printed` first).
- **Dispatch Rules:** No dispatch before `AWB Linked`.
- **Validation:** Never skip parcel states. Enforce these transitions in the service layer and reject violations with clear API errors.

### B. Atomic Scanning Operations
- **The Flow:** QR identifies the parcel, AWB links the shipment. Both happen in a **single scanning session** and must be treated as one atomic backend flow.
- **Action:** Both scan events must be logged sequentially in `receiver_status_details`. Do NOT separate QR and AWB scanning into different flows.

### C. Label Generation
- **No Label Table:** The label is generated on demand from parcel data.
- **Action:** The backend generates the unique ID, stores it, and returns printable data.

## 6. Testing & Validation Standards
- **Bruno Desktop Workflow:** We test APIs using the Bruno Desktop app. Do NOT create native `.bru` files directly.
- **Test Data Format:** Every time a new endpoint is implemented, create a plain-text file (e.g., `[FeatureName]_Test_Data.txt`) containing the exact HTTP Method, full URL (`/api/v1/...`), required Headers, Query Params, Zod-validated JSON payload, **post-request scripts, and required assertions**.

## 7. Agent Workflow & Explicit Permissions (CRITICAL)

### A. Task Execution & Communication
- **Plan First:** Always break down complex features into granular tasks before modifying code. List the files you plan to modify before you start writing.
- **Verification:** Always verify payloads match API contracts before passing them to the DB layer.
- **Conciseness:** Be concise. Skip preamble like "Certainly! I can help with that." Get straight to the code, explanations, and root causes.

### B. Explicit Permission Tiers
To ensure safety while operating autonomously, you must strictly adhere to these permission tiers:

**1. Allowed without asking:**
- Reading files and searching the codebase.
- Running the linter (`npm run lint`).
- Creating new files or updating existing application logic.

**2. Ask first (Requires my explicit confirmation):**
- **Destructive Operations:** If a task requires `DROP TABLE`, running destructive DB migrations, or deleting files, you must output a summary of the plan, ask for confirmation, and cease all code generation until I reply.
- **Large Refactors:** If a task requires changing more than 3 files, summarize the plan and ask for approval first.

**3. NEVER (Strictly forbidden):**
- NEVER hardcode API keys, tokens, or passwords. Always use environment variables.
- NEVER read or print the contents of `.env` or `.env.*` files into the chat.
- NEVER run `git push --force` or any destructive git operation.
- NEVER commit directly to the `main` branch.
- NEVER bypass the `receiver_status_details` append-only rule; we must maintain an immutable audit trail.

### C. Git & Commit Standards
- **Manual Review:** All code must be manually reviewed by a human before committing.
- **Commit Format:** You MUST use the Conventional Commits format tailored to our NodeJS Backend architecture: `type(scope): description`.
- **Allowed Scopes:** You must restrict the scope to one of our real backend modules: `auth`, `user`, `order`, `payment`, `product`, `db`, `api`, `middleware`, `config`, `logger`, or `cache`.
- **Commit Message Quality:**
  - For features (e.g., `feat(auth): implement JWT login and refresh token flow`) and bug fixes (e.g., `fix(payment): prevent duplicate charge on retry`), be highly descriptive.
  - For production-level or multi-step commits, provide a bulleted list of the exact changes and close the relevant issue number (e.g., `Closes #342`).

### D. Domain Confinement: Restrict your file modifications strictly to the module or domain you were assigned in the initial prompt. Do not touch files owned by other domains