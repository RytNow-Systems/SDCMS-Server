# SDCMS Backend — Architecture Overview

## Stack
- **Runtime:** Node.js with ES Modules (`import`/`export`, `.js` extensions required on all imports)
- **Framework:** Express.js
- **Database:** MySQL, accessed exclusively via stored procedures (no raw SQL, no ORM)
- **Validation:** Zod schemas applied via custom middleware
- **Auth:** JWT (Bearer token), verified in `protect` middleware

---

## Directory Layout

```
src/
  app.js                          # Express app: registers middleware + all domain routers
  server.js                       # HTTP server entry point (calls app.js)
  interfaces/
    http/
      routes/                     # One file per domain (e.g. bulk-upload.routes.js)
      controllers/                # One file per domain; thin handlers only
      validations/                # Zod schemas per domain
  modules/
    <domain>/
      <domain>.service.js         # Business logic layer
      <domain>.repository.js      # DB access layer — ONLY place that calls SPs
  shared/
    middleware/
      auth.middleware.js          # protect + authorizeRoles
      validate.middleware.js      # validate (req.body) + validateParams (req.params)
      error.middleware.js         # notFound + errorHandler (must be last in app.js)
      logger.middleware.js        # Standard logger (use this, never console.log)
  infrastructure/
    database/
      db.js                       # mysql2 connection pool (exported as default)
sql-procedures/                   # SP SQL scripts (gitignored — run manually on DB)
```

---

## Registered API Routes (app.js)

| Prefix | Domain |
|---|---|
| `/api/v1/auth` | auth |
| `/api/v1/employees` | employee |
| `/api/v1/courier-partners` | courier |
| `/api/v1/products` | product |
| `/api/v1/orders` | order |
| `/api/v1/senders` | sender |
| `/api/v1/receivers` | receiver |
| `/api/v1/parcels` | parcel |
| `/api/v1/parcel-events` | parcel-events |
| `/api/v1/bulk-uploads` | bulk-upload |
| `/api/v1/system` | system |
| `/api/v1/dashboard` | dashboard |
| `/api/v1` | notifications |

---

## Routing Conventions

- **Prefix:** All routes use `/api/v1/...` (plural noun resources).
- **Auth:** Every protected router applies `protect` then `authorizeRoles(...)` via `router.use(...)` at the top of the file — controllers never check auth themselves.
- **Body validation:** `validate(zodSchema)` middleware on POST/PUT routes; parses and replaces `req.body`.
- **Param validation:** `validateParams(zodSchema)` middleware on routes with URL params (e.g. `/:sessionId`); coerces and replaces `req.params`. Use `z.coerce.number()` to handle string→number coercion from URL params.
- **Controllers:** Wrapped with `asyncHandler` from `express-async-handler` — no manual try/catch at controller level.
- **Response envelope:** Always `{ success: boolean, data?: any, error?: string }`.
- **Error responses:** Never expose raw DB errors; throw a plain `Error` with `.statusCode` set, caught by `errorHandler`.

---

## Database Connection (`src/infrastructure/database/db.js`)

- Uses `mysql2/promise` with `createPool`.
- Pool config from env vars: `DB_HOST`, `DB_PORT` (default 3306), `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- `connectionLimit: 10`, `waitForConnections: true`.
- Exported as `default`; repositories import it as `db` and call `db.execute(...)`.

### Calling Stored Procedures

```js
const [rows] = await db.execute('CALL prc_MyTable_get(?, ?)', [pAction, pId]);
return rows[0];        // first result set
return rows[0][0];     // first row of first result set
```

---

## Stored Procedure Naming Conventions

| Operation | Pattern | Notes |
|---|---|---|
| Upsert | `prc_<Table>_set(pPkId, ...)` | `pPkId=0` → INSERT, `>0` → UPDATE |
| Read | `prc_<Table>_get(pAction, ...)` | `pAction` selects which query to run |
| Duplicate check | `prc_checkduplicate_<Table>(...)` | Returns `DuplicateCount` |

---

## Auth Middleware Detail

**`protect`** (JWT guard):
1. Reads `Authorization: Bearer <token>` header.
2. Verifies with `process.env.JWT_SECRET`.
3. Fetches employee from DB via `employeeRepository.findById(decoded.id)`.
4. Normalizes to `req.user = { id, employeeCode, name, email, role, allowLogin }` — always camelCase downstream.

**`authorizeRoles(...roles)`**:
- Checks `req.user.role` against the allowed roles list.
- Returns 403 if not authorized.

---

## Dual-Mode (Mock DB)

All repositories support `USE_MOCK_DB=true` env var which swaps SP calls for in-memory arrays. Useful for local dev without a MySQL instance. Mock data is seeded inline in the repository file.

---

## Key Rules (from CLAUDE.md — enforced)

- Repositories: ONLY `CALL prc_...` statements. Raw SELECT/INSERT/UPDATE forbidden.
- Logging: Use the project logger, never `console.log`.
- Columns prefixed `Fk` are treated as foreign key references (no hard FK constraints in DB).
- `receiver_status_details` is append-only — never UPDATE or DELETE rows.
- `sql-procedures/` is gitignored; SQL scripts must be run manually on the database.
- API docs live in `docs/api/` generated from `scripts/api-manifest.yaml` via `node scripts/generate-api-docs.js`.
