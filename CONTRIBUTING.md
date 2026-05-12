# Contributing to SDCMS-Server

## Prerequisites

- Node.js 20+
- MySQL 8.0+
- Bruno Desktop (for API testing)

## Local Setup

```bash
git clone https://github.com/RytNow-Systems/SDCMS-Server.git
cd SDCMS-Server
npm install
cp .env.example .env   # fill in DB credentials and JWT secret
npm run dev
```

## Branch Workflow

```
feature/your-feature  →  staging  →  main (production)
```

- Branch off `staging`, not `main`
- Branch naming: `feat/`, `fix/`, `refactor/`, `chore/`, `docs/`
- Example: `feat/parcel-dispatch-endpoint`

## Commit Format

We use [Conventional Commits](https://www.conventionalcommits.org/).

```
type(scope): short description
```

**Allowed scopes:** `auth`, `user`, `order`, `parcel`, `product`, `bulk-upload`, `courier`, `middleware`, `config`, `logger`, `db`, `api`

**Examples:**
```
feat(order): add GET /parcels/:id/timeline endpoint
fix(auth): correct token expiry boundary check
chore(db): update prc_parcel_set stored procedure
docs(api): document bulk upload error codes
```

## Architecture Rules

### Zero Direct SQL
All database operations go through stored procedures. Never write raw `SELECT`, `INSERT`, or `UPDATE`.

```js
// WRONG
await db.query('SELECT * FROM parcels WHERE id = ?', [id]);

// CORRECT
await db.query('CALL prc_parcel_get(?, ?)', [pAction, parcelId]);
```

### Validation at the Boundary
Every endpoint that accepts a payload must validate it with a Zod schema before it reaches the service layer.

### Append-Only Audit Log
All scan events and status changes are written to `receiver_status_details`. Never update or delete existing rows in that table.

### Parcel Status Flow
```
Created → Label Printed → AWB Linked → Dispatched → Delivered
```
Never skip states. Enforce transitions in the service layer.

### Error Handling
- Controllers: wrap with `express-async-handler` (no try/catch at route level)
- Services: use `try/catch`, log with context (function name + params)
- Never expose raw DB errors to the client

## Documentation

- Update `docs/api/api-manifest.yaml` for any new or modified endpoint
- Regenerate docs: `node scripts/generate-api-docs.js`
- Add JSDoc to all new service and repository methods

## PR Process

1. Push your branch and open a PR targeting `staging`
2. Fill in the PR template completely
3. Request review from a team member
4. Address all review comments before merging
5. Use **squash merge** only (linear history is enforced)
