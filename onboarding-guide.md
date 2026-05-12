# Bulk Upload Feature — Team Onboarding Guide
**Version:** Phase 2 (current)  
**Audience:** Frontend Developers · Software Testers · DB Engineers  
**Last Updated:** May 2026

> **New here?** Don't worry if some parts feel technical — we've added plain-English explanations throughout. Jump to the section most relevant to your role, and use the Quick-Start Checklists at the bottom to get going fast.

---

## Table of Contents
1. [What This Feature Does](#1-what-this-feature-does)
2. [CSV Schema (What the File Needs to Look Like)](#2-csv-schema-what-the-file-needs-to-look-like)
3. [How the App Processes Your File](#3-how-the-app-processes-your-file)
4. [How the App Finds Senders & Receivers](#4-how-the-app-finds-senders--receivers)
5. [Product Matching — How It Finds the Right Product](#5-product-matching--how-it-finds-the-right-product)
6. [Validation Rules — What Gets Rejected & Why](#6-validation-rules--what-gets-rejected--why)
7. [API Contract (For Developers)](#7-api-contract-for-developers)
8. [Database Schema (For DB Engineers)](#8-database-schema-for-db-engineers)
9. [Stored Procedures](#9-stored-procedures)
10. [Screen Flow — What the User Sees](#10-screen-flow--what-the-user-sees)
11. [Known Limitations & On-Hold Items](#11-known-limitations--on-hold-items)
12. [File Map — Where Everything Lives](#12-file-map--where-everything-lives)

---

## 1. What This Feature Does

### The Big Picture

An Operator can upload a single CSV or Excel file and create **many Orders at once** — instead of entering them one by one.

The key idea is simple:

> **One Sender → Many Receivers → Each Receiver gets Products**

This is called the **1:N model**. If your CSV has five rows all from the same sender phone number, the app treats them as **one Order** with five destinations — not five separate orders.

**Example:**
```
CSV Row 1: SenderA → ReceiverX, Product A
CSV Row 2: SenderA → ReceiverY, Product B
CSV Row 3: SenderB → ReceiverZ, Product C

After grouping:
  Order 1 (SenderA) → [ReceiverX: [Product A], ReceiverY: [Product B]]
  Order 2 (SenderB) → [ReceiverZ: [Product C]]
```

### Two Rounds of Communication with the Server

| Round | What Happens |
|-------|-------------|
| **Round 1** — `POST /api/v1/bulk-uploads` | App sends all the data → Server creates the orders → Returns a count of successes and failures |
| **Round 2** — `GET /api/v1/bulk-uploads/:sessionId/errors` | App asks "which rows failed and why?" → Server returns the details |

Each row is processed independently — one bad row won't stop the others.

### Key Design Decisions (Plain English)

| Decision | Why |
|----------|-----|
| Group by sender **phone**, not name | Names can be spelled differently ("Ramesh" vs "Ramesh Textiles"); phone numbers are consistent |
| Compute a fingerprint (SHA-256 hash) of the data | Prevents the operator accidentally clicking Submit twice and creating duplicate orders |
| Look up party IDs before submitting | The server only understands numeric IDs (e.g. `senderId: 4`), not names or phones |
| Auto-create missing parties & addresses | If a sender/receiver isn't in the system yet, the app creates them automatically — rather than failing the row |
| Order-mapping table is commented out | A linking table (`bulk_upload_order_mapping`) doesn't exist in the live DB yet — it's on hold |

---

## 2. CSV Schema (What the File Needs to Look Like)

### Required Columns
Every row **must** have these — the upload will fail validation without them:

| Column Header | What It's For | Rules |
|---------------|--------------|-------|
| `senderName` | The sender's full name | Required |
| `senderPhone` | The sender's phone — **this is the grouping key** | 10 digits |
| `senderAddress` | Full address as free text | Required |
| `receiverName` | The receiver's full name | Required |
| `receiverPhone` | The receiver's phone | 10 digits |
| `receiverAddress` | Full address as free text | Required |
| `productName` | Product name (used for fuzzy matching) | Required |
| `quantity` | How many units | Positive whole number |

### Optional Columns (Help the App Do Better)
These aren't required, but including them reduces errors significantly:

| Column Header | What It Helps With |
|---------------|--------------------|
| `senderCity`, `senderState`, `senderPincode` | Lets the app auto-create a sender address if none exists |
| `receiverCity`, `receiverState`, `receiverPincode` | Lets the app auto-create a receiver address if none exists |
| `productCode` / `cuItemCode` / `itemCode` | Most accurate way to match a product (beats name matching) |
| `color` / `colorName` | Narrows down which product variation to use |
| `size` | Further narrows the product variation |
| `unitPrice` / `price` / `rate` | Used as a tiebreaker when multiple product variations have the same name |
| `courierId` / `courier_id` | Assigns a courier to the order (optional; defaults to none) |

### Accepted Column Name Variations
The app is flexible — it recognises several spellings for the same field:

```
senderPhone     OR  senderMobile
receiverPhone   OR  receiverMobile
receiverAddress OR  receiverAddressLine1  OR  addressLine1
productName     OR  materialName
productCode     OR  cuItemCode  OR  itemCode
color           OR  colorName
unitPrice       OR  price  OR  rate
quantity        OR  qty
```

> **Tip for testers:** Column headers are case-insensitive and spaces/underscores are normalised. `Sender Name`, `sender_name`, and `senderName` all work.

---

## 3. How the App Processes Your File

Once you drop a file onto the upload zone, the app runs through **5 steps automatically** before showing you the preview. You'll see a progress indicator with these labels:

```
Step 1 — "Parsing file…"
         SheetJS reads your .csv / .xlsx / .xls and turns it into rows of data.

Step 2 — "Grouping orders…"
         Rows are grouped by senderPhone.
         Same sender phone = one order with multiple receivers.
         (handled by: orderGrouper.js)

Step 3 — "Matching products…"
         Each product name/code is looked up against the product catalogue
         from GET /products. A confidence score (0–1) is assigned.
         (handled by: productMatcher.js)

Step 4 — "Resolving parties…"
         The app quietly checks the DB for each sender and receiver
         to show their real saved name and address in the preview.
         This is read-only — nothing is created yet.
         (handled by: bulkUploadService.previewEnrichParties)

Step 5 — "Validating…"
         Every row is checked against the rules in Section 6.
         Rows are split into "valid" and "invalid" lists.
         (handled by: dataValidator.js)
```

> ⚠️ **Common confusion:** Steps 4 and 5 run in this exact order — party enrichment happens **before** validation. This means the validator sees the enriched (real DB) data, not just the raw CSV text.

After step 5, the **Preview Table** is shown. The user reviews the grouped data, then clicks **Confirm & Upload**.

### What Happens on Submit

```
For each order group:
  1. Resolve senderId + senderAddressId (with auto-create if needed)
  2. Resolve receiverId + receiverAddressId (with auto-create if needed)
  3. Strip products down to { variationId, quantity }

Compute SHA-256 hash of the rows array → POST /bulk-uploads

If any rows failed → auto-fetch error details → show "Download Failed Rows" button
If all succeeded → show success toast → reset the page
```

---

## 4. How the App Finds Senders & Receivers

### The Lookup Flow

Before submitting, the app needs to turn a phone number into a database ID. Here's what it does:

```
Phone number
    │
    ▼
GET /senders/lookup?phone=XXXXXXXXXX
    │
    ├── Found → use the existing party ID
    │               │
    │               └── Find their address (see below)
    │
    └── Not found
            │
            ├── Name IS in the CSV → auto-create the party (POST /senders or /receivers)
            │                         Then find/create their address
            │
            └── No name in CSV → ❌ Hard error — row fails
```

### Finding the Right Address

Once the app has a party ID, it fetches all their saved addresses and picks the best one:

| Priority | Situation | What Happens |
|----------|-----------|-------------|
| 1 | Party has **zero** addresses AND you provided city/state/pincode | Auto-creates a new address |
| 2 | Party has **exactly one** address | Uses it — no question asked |
| 3 | Party has **multiple** addresses | Fuzzy-matches your CSV text against them; uses the best if score ≥ 35% |
| 4 | Multiple addresses, no good match, city/state/pincode provided | Auto-creates a new address |
| 5 | Multiple addresses, no good match, no structured fields | Falls back to the default address (shows a warning in the browser console) |

> **What's "fuzzy matching"?** The app breaks addresses into individual words and checks how many words overlap. "14 Gandhi Nagar Surat" and "Gandhi Nagar, Surat, 395002" share enough words to match. The match threshold is **35%** overlap. Below 70% overlap, a yellow warning is shown in the console.

### When Things Go Wrong

| Situation | Result |
|-----------|--------|
| Party not found + no name column | ❌ Row fails — hard error |
| No address found + no city/state/pincode | ❌ Row fails — hard error |
| Party auto-created | Logged to console; "New" badge shown in preview |
| Server error (500, network down) | ❌ Error surfaced to UI — not silently ignored |

---

## 5. Product Matching — How It Finds the Right Product

The app fetches the full product catalogue (`GET /api/v1/products?limit=1000&page=1`) and tries to find the best match for each product name in your CSV. It tries **5 approaches**, from most to least accurate:

| Tier | Method | Confidence |
|------|--------|-----------|
| **1** | `cuItemCode` + `colorName` — both match exactly | 100% |
| **2a** | `cuItemCode` alone — only one product has this code | 100% |
| **2b** | `cuItemCode` + price within ±10% | 95% |
| **2c** | `cuItemCode` + color (close enough match) | 90% |
| **2d** | `cuItemCode` found but multiple variations match | 60% ⚠️ (warning shown) |
| **3** | Description text fuzzy match (≥ 80% similar) | varies |
| **4a** | Product name fuzzy match (≥ 80% similar) | varies |
| **4b** | Product name contains the CSV text (or vice versa) | 85% floor |
| **5** | **No match found** | 0% ❌ (row fails) |

> **What does confidence mean in the UI?**
> - **≥ 90%** → green badge (confident match)
> - **< 90%** → amber badge (possible match — worth checking)
> - **0% / no match** → red badge — this receiver **cannot be submitted**

> **Tip for testers:** Adding `productCode` (cuItemCode) to your CSV is the single most reliable way to get a 100% match. Product name alone relies on spelling similarity.

---

## 6. Validation Rules — What Gets Rejected & Why

### Sender-Level (applies to all receivers in that group)

| What's checked | Error message if it fails |
|----------------|--------------------------|
| `senderName` must be present | "Sender name is required." |
| `senderPhone` must be present | "Sender phone is required." |
| `senderPhone` must be 10 digits | "Sender phone … is not a valid 10-digit number." |
| `senderAddress` must be present | "Sender address is required." |
| `courierId` (if given) must be a positive number | "Courier ID must be a positive number when provided." |

### Receiver-Level (checked per receiver)

| What's checked | Error message if it fails |
|----------------|--------------------------|
| `receiverName` must be present | "Receiver name is required." |
| `receiverPhone` must be present | "Receiver phone is required." |
| `receiverPhone` must be 10 digits | "Receiver phone … is not valid." |
| `receiverAddress` must be present | "Receiver address is required." |
| At least 1 product required | "At least one product is required per order." |
| Each product: `productName` required | "Product #N: product name is required." |
| Each product: must match a variation | "Product #N 'X': no matching product variation found. Try adding product_code and/or color columns to your CSV." |
| Each product: `quantity` > 0 | "Product #N: quantity must be a positive number." |
| Each product: `unitPrice` ≥ 0 | "Product #N: unit price must be non-negative." |

> **Note on unitPrice = 0:** If the `unit_price` column is blank, the app defaults to 0. This passes validation (a "free" item is allowed). If that's not the intent, add the column with actual prices.

### The Cascade Rule

If a **sender** fails validation, **all their receivers** are automatically marked invalid too — with the message: `"Parent Sender Error: Please fix the sender details."` Fix the sender row and re-upload.

### What the Validator Returns

```
{
  validOrders:   [],  // Groups where every receiver is valid
  invalidOrders: [],  // Flat list of failed receivers (for CSV export)
  errorMap:      {}   // Always empty — kept for backwards compatibility
}
```

---

## 7. API Contract (For Developers)

### POST `/api/v1/bulk-uploads` — Submit the Batch

**Who can call it:** ADMIN, OPERATOR roles only.

**Request body:**
```json
{
  "sessionHash": "sha256-hex-string",
  "fileName": "may_dispatch.csv",
  "rows": [
    {
      "senderId": 1,
      "senderAddressId": 1,
      "courierId": 2,
      "receivers": [
        {
          "receiverId": 4,
          "receiverAddressId": 7,
          "receiverPhone": "9123456780",
          "products": [
            { "variationId": 3, "quantity": 10 }
          ]
        }
      ]
    }
  ]
}
```

> `courierId` is optional. Omit the key entirely if there's no courier for that order.

**Responses:**

| Code | Meaning |
|------|---------|
| `201` | `{ success: true, data: { sessionId, successfulOrders, failedRows } }` |
| `400` | Payload shape is wrong (Zod validation failed) |
| `401` | JWT missing or expired — log in again |
| `403` | Your role isn't allowed to do this |
| `409` | Same data was already submitted — duplicate detected |

### GET `/api/v1/bulk-uploads/:sessionId/errors` — Fetch Failed Row Details

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "rowData": { "senderId": 1, "receivers": [...] },
      "errorMessage": "Receiver address not found for receiverAddressId: 99"
    }
  ]
}
```

Returns an **empty array** (not an error) if there are no failures — safe to always call.

### How the Session Hash is Computed

```js
const computeSessionHash = async (rows) => {
  const text = JSON.stringify(rows);
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0')).join('');
};
// Important: hash is computed on rows[] ONLY — not fileName or other fields
```

---

## 8. Database Schema (For DB Engineers)

> **DB conventions used throughout:** Column names are PascalCase (e.g. `SessionHash`). Foreign keys are enforced by the Node.js app, not by database constraints.

### Table: `bulk_upload_sessions`
Tracks every upload attempt — one row per file submission.

```sql
CREATE TABLE bulk_upload_sessions (
  PkBulkUploadId          INT PRIMARY KEY AUTO_INCREMENT,
  SessionHash             VARCHAR(255) NOT NULL,  -- SHA-256 fingerprint for duplicate detection
  FkUploadedByEmployeeCode INT NOT NULL,           -- Who uploaded it
  FileName                VARCHAR(255) NOT NULL,
  UploadedAt              DATETIME DEFAULT CURRENT_TIMESTAMP,
  TotalRows               INT DEFAULT 0,
  SuccessfulOrders        INT DEFAULT 0,
  FailedRows              INT DEFAULT 0,
  Status                  ENUM('VALIDATING','COMPLETED','FAILED','PARTIAL_SUCCESS') DEFAULT 'VALIDATING'
);
```

> **Upgrading an existing installation?** `SessionHash` was added in Phase 2. Run:
> ```sql
> ALTER TABLE bulk_upload_sessions ADD COLUMN SessionHash VARCHAR(255) NOT NULL AFTER PkBulkUploadId;
> ```

### Table: `bulk_upload_errors`
Stores the details of each failed row within a session.

```sql
CREATE TABLE bulk_upload_errors (
  PkErrorId       INT PRIMARY KEY AUTO_INCREMENT,
  FkBulkUploadId  INT NOT NULL,
  RowNumber       INT NOT NULL,
  ErrorType       ENUM(
                    'VALIDATION', 'DUPLICATE_PHONE', 'PRODUCT_NOT_FOUND',
                    'COURIER_NOT_FOUND', 'MISSING_DATA', 'DUPLICATE_ORDER'
                  ) DEFAULT 'VALIDATION',
  ErrorMessage    TEXT NOT NULL,
  RowData         TEXT,   -- JSON string (MySQL 5.6 compatible — no JSON column type)
  CreatedAt       DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Table: `bulk_upload_order_mapping` ⚠️ ON HOLD

```sql
-- NOT YET CREATED in the live database.
-- The backend call to prc_BulkUploadOrderMapping_set is commented out.
-- Do NOT create until cleared by the tech lead.
CREATE TABLE bulk_upload_order_mapping (
  PkMappingId    INT PRIMARY KEY AUTO_INCREMENT,
  FkBulkUploadId INT NOT NULL,
  FkOrderId      INT NOT NULL,
  CreatedDate    DATETIME DEFAULT NOW()
);
```

---

## 9. Stored Procedures

All procedures follow the same insert/update pattern: pass `pPkXxx = 0` to **create new**, pass an existing ID to **update**.

### `prc_BulkUploadSessions_set`
Creates a new session record, or updates its final counts and status.

```sql
CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadSessions_set`(
  IN pPkBulkUploadId           INT,
  IN pSessionHash              VARCHAR(255),
  IN pFileName                 VARCHAR(255),
  IN pTotalRows                INT,
  IN pSuccessfulOrders         INT,
  IN pFailedRows               INT,
  IN pFkUploadedByEmployeeCode INT
)
BEGIN
  IF pPkBulkUploadId = 0 THEN
    INSERT INTO bulk_upload_sessions
      (SessionHash, FileName, TotalRows, SuccessfulOrders, FailedRows, FkUploadedByEmployeeCode, Status)
    VALUES
      (pSessionHash, pFileName, pTotalRows, pSuccessfulOrders, pFailedRows, pFkUploadedByEmployeeCode, 'VALIDATING');
    SELECT LAST_INSERT_ID() AS PkBulkUploadId;
  ELSE
    UPDATE bulk_upload_sessions
    SET
      SuccessfulOrders = pSuccessfulOrders,
      FailedRows       = pFailedRows,
      Status           = CASE
                           WHEN pFailedRows = 0       THEN 'COMPLETED'
                           WHEN pSuccessfulOrders = 0 THEN 'FAILED'
                           ELSE 'PARTIAL_SUCCESS'
                         END
    WHERE PkBulkUploadId = pPkBulkUploadId;
    SELECT pPkBulkUploadId AS PkBulkUploadId;
  END IF;
END
```

### `prc_BulkUploadErrors_set`
Inserts one error row for a session.

```sql
CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadErrors_set`(
  IN pPkErrorId      INT,
  IN pFkBulkUploadId INT,
  IN pRowNumber      INT,
  IN pErrorMessage   TEXT,
  IN pRowData        LONGTEXT
)
BEGIN
  IF pPkErrorId = 0 THEN
    INSERT INTO bulk_upload_errors (FkBulkUploadId, RowNumber, ErrorMessage, RowData)
    VALUES (pFkBulkUploadId, pRowNumber, pErrorMessage, pRowData);
    SELECT LAST_INSERT_ID() AS PkErrorId;
  END IF;
END
```

### `prc_BulkUploadErrors_get`
Fetches all error rows for a session, ordered by row number.

```sql
CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadErrors_get`(
  IN pAction         INT,   -- 0 = get all errors for a session
  IN pFkBulkUploadId INT
)
BEGIN
  IF pAction = 0 THEN
    SELECT PkErrorId, FkBulkUploadId, RowNumber, ErrorType, ErrorMessage, RowData, CreatedAt
    FROM bulk_upload_errors
    WHERE FkBulkUploadId = pFkBulkUploadId
    ORDER BY RowNumber ASC;
  END IF;
END
```

### `prc_checkduplicate_BulkUploadSessions`
Returns a count to check if a session hash already exists. Used by the backend's 409 duplicate guard.

```sql
CREATE DEFINER=`user`@`%` PROCEDURE `prc_checkduplicate_BulkUploadSessions`(
  IN pSessionHash VARCHAR(255)
)
BEGIN
  SELECT COUNT(*) AS DuplicateCount FROM bulk_upload_sessions WHERE SessionHash = pSessionHash;
END
```

### `prc_BulkUploadOrderMapping_set` ⚠️ ON HOLD

```sql
-- DO NOT DEPLOY until bulk_upload_order_mapping table is created and cleared by tech lead.
CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadOrderMapping_set`(
  IN pPkMappingId    INT,
  IN pFkBulkUploadId INT,
  IN pFkOrderId      INT
)
BEGIN
  IF pPkMappingId = 0 THEN
    INSERT INTO bulk_upload_order_mapping (FkBulkUploadId, FkOrderId, CreatedDate)
    VALUES (pFkBulkUploadId, pFkOrderId, NOW());
    SELECT LAST_INSERT_ID() AS PkMappingId;
  END IF;
END
```

---

## 10. Screen Flow — What the User Sees

Here's the journey from dropping a file to seeing the result:

```
[IDLE]
  │  User drops or selects a file
  ▼
[PROCESSING] — 5 labelled steps shown with a progress bar:
  │  1. Parsing file…
  │  2. Grouping orders…
  │  3. Matching products…
  │  4. Resolving parties…  ← read-only DB lookups
  │  5. Validating…
  ▼
[PREVIEW]
  │  DataPreviewTable is shown — grouped by Sender → Receivers
  │  • Collapsible sender rows (click to expand)
  │  • Products shown as stacked cards with confidence badges
  │  • "New" badge on senders/receivers not yet in the DB
  │  • Red rows = validation errors; green = all valid
  │  • Click the error badge on a row to see the exact error messages
  │
  │  User reviews, then clicks "Confirm & Upload (N)"
  ▼
[SUBMITTING]
  │  For each order: resolve party IDs → build payload → hash → POST /bulk-uploads
  ▼
[RESULT — one of three outcomes]
  │
  ├─ All succeeded
  │    → Green success toast → page resets automatically
  │
  ├─ Some failed (partial success)
  │    → Amber "Upload Complete with Errors" banner
  │    → Shows success count + failed count as stat cards
  │    → "Download Failed Rows" button appears
  │    → Step-by-step correction instructions shown
  │    → "Start New Upload" button to reset
  │
  └─ All failed (0 successes)
       → Same amber banner (failedCount = total, successCount = 0)
       → Phase 2 error fetch runs automatically
       → User corrects CSV and re-uploads
           (data changes → new hash → no duplicate rejection)
```

> **Note for testers:** The current UI uses the **same amber banner** for both partial and full failure. There is no separate red banner state — both cases show the same `PartialSuccessBanner` component.

### Key UX Rules

- **Terminology:** Always say "Order" and "Destination" — never "Parcel" in this screen.
- **No re-submit without change:** Submitting the exact same file twice returns a `409 Conflict`. The operator must change at least one cell to generate a new hash.
- **Error download:** The downloaded CSV contains the original columns plus an appended `error_message` column.
- **Pre-submit errors:** Invalid rows (caught during client validation) are displayed in the preview table with red highlighting and an error detail dialog. There is no separate "download pre-submit errors" button in the current UI — the "Download Failed Rows" button only appears post-submission.

---

## 11. Known Limitations & On-Hold Items

### 🔴 `bulk_upload_order_mapping` Table (On Hold)

**What it is:** A table that would link each Order back to the Bulk Upload session that created it.

**Current status:** The table does **not exist** in the live database. The backend code that calls `prc_BulkUploadOrderMapping_set` is **commented out** in `bulk-upload.service.js`.

**Impact:** Everything works end-to-end, but you can't trace "this order was created via bulk upload session #42."

**To activate when ready:**
1. Create the `bulk_upload_order_mapping` table (schema in §8).
2. Deploy `prc_BulkUploadOrderMapping_set` (procedure in §9).
3. Uncomment the mapping call in `backend/src/modules/bulk-upload/bulk-upload.service.js` (search for the comment `prc_BulkUploadOrderMapping_set` to find the exact location).

### 🟡 Buffering Architecture (Postponed)

An idea to stage uploaded rows in a DB buffer before committing them was discussed but postponed. The current system submits directly to the order pipeline.

### 🟡 Intermittent Backend 500 Errors

The backend occasionally returns a `500` error during the sender lookup (`prc_Party_get`). This is **now correctly surfaced to the frontend** as a visible error message (it used to be silently hidden). Root cause is likely DB connection pool saturation or a stored procedure edge case — needs backend investigation.

### 🟡 `Party_master` Table Name Inconsistency

Some stored procedures may reference the party table as `party_master`, `Party_master`, or alias `pa` inconsistently. DB engineers: verify all stored procedures reference the correct live table name before deployment.

### 🟡 Hardcoded Phone Numbers in Template Download

The "Download Template" button in `BulkUploadPage.jsx` generates a sample CSV with specific phone numbers and a hardcoded `courierId: 1`. These are documented in the code as test records — update them if those DB records change.

---

## 12. File Map — Where Everything Lives

```
frontend/
│
├── src/features/bulkUpload/
│   │
│   ├── components/
│   │   ├── BulkUploadPage.jsx      — Main orchestrator: state machine, all pipeline steps
│   │   ├── DataPreviewTable.jsx    — Sender/receiver preview table with collapsible rows
│   │   ├── ValidationSummary.jsx   — Pre-upload counts bar + post-upload result banner
│   │   ├── FileDropzone.jsx        — Drag-and-drop / click-to-browse upload zone
│   │   └── ErrorRowsDownload.jsx   — "Download Failed Rows" CSV export button
│   │
│   ├── services/
│   │   └── bulkUploadService.js    — All API calls: party resolve, submit, fetch errors
│   │
│   ├── utils/
│   │   ├── csvParser.js            — Reads .csv / .xlsx / .xls → flat row array (via SheetJS)
│   │   ├── orderGrouper.js         — Groups flat rows into 1:N sender→receivers structure
│   │   ├── productMatcher.js       — 5-tier product variation resolution
│   │   └── dataValidator.js        — Client-side validation; splits valid/invalid
│   │
│   ├── index.js                    — Barrel export file (public API of this feature)
│   │
│   ├── pages/                      — (empty — reserved for future page-level components)
│   ├── hooks/                      — (empty — reserved for future custom hooks)
│   └── types/                      — (empty — reserved for future TypeScript type definitions)
│
├── docs/
│   └── bulk-upload-onboarding-guide.md   ← YOU ARE HERE
│
└── (project root)
    └── bulk-upload-frontend-guide.md     — TypeScript interface reference + API examples

backend/
├── src/modules/bulk-upload/
│   └── bulk-upload.service.js       — NestJS service; order mapping call is commented out
│                                      (search "prc_BulkUploadOrderMapping_set" to find it)
└── sql-procedures/
    ├── prc_BulkUploadSessions_set.sql
    ├── prc_BulkUploadErrors_set.sql
    ├── prc_BulkUploadErrors_get.sql
    ├── prc_checkduplicate_BulkUploadSessions.sql
    └── prc_BulkUploadOrderMapping_set.sql   ← ON HOLD — do not deploy yet
```

> **Note on `ValidationSummary.jsx`:** It imports its Alert component from `@/components/reui/alert`, not `@/components/ui/alert`. Don't be confused if you can't find it in the `ui/` folder.

---

## Quick-Start Checklist (DB Engineer)

- [ ] Table `bulk_upload_sessions` exists with a `SessionHash VARCHAR(255)` column
- [ ] Table `bulk_upload_errors` exists
- [ ] `prc_BulkUploadSessions_set` deployed (must include the `pSessionHash` parameter)
- [ ] `prc_BulkUploadErrors_set` deployed
- [ ] `prc_BulkUploadErrors_get` deployed
- [ ] `prc_checkduplicate_BulkUploadSessions` deployed
- [ ] `bulk_upload_order_mapping` table and `prc_BulkUploadOrderMapping_set` — **skip until cleared by tech lead**
- [ ] Verify `Party_master` table name is consistent across all stored procedures

---

## Quick-Start Checklist (Frontend Developer)

- [ ] `VITE_API_URL` is set in `.env.local`
- [ ] `GET /api/v1/products?limit=1000` returns data (needed for product matcher on page load)
- [ ] `GET /api/v1/senders/lookup?phone=XXXXXXXXXX` returns `200` or `404` (not `500`)
- [ ] Download the template CSV (the button is in the upload zone hint bar) and upload it
- [ ] Verify the preview table shows 1 sender row with 2 collapsed receivers
- [ ] Submit and verify the response has `{ sessionId, successfulOrders, failedRows }`

---

## Quick-Start Checklist (Tester)

| Test Case | Expected Result |
|-----------|----------------|
| Valid CSV, all parties pre-registered | `201` response, `failedRows: 0`, success toast |
| Unknown receiver phone, no name column in CSV | Row fails — error: "was not found in Party Master. Pre-register the party first, or include the name column in your CSV for auto-creation." |
| Unknown receiver phone + name/address columns provided | Row succeeds — party auto-created (check console for `[bulkUpload] Auto-created party…` log) |
| Submit identical file twice without changing anything | `409 Conflict` response |
| Unrecognised product name (no code, no fuzzy match) | Row fails; red badge in preview; error detail in Phase 2 download |
| CSV with `cuItemCode` + `color` matching a product | Tier 1 match — confidence shows as 100% (green badge) |
| Missing `quantity` column (or value is 0/blank) | Client validation blocks submission — "quantity must be a positive number." |
| Phone number with fewer or more than 10 digits | Client validation blocks submission — "not a valid 10-digit number." |
| `failedRows > 0` in response | Phase 2 auto-runs; amber banner appears; "Download Failed Rows" button is enabled |
| Full failure (`successfulOrders = 0`) | Same amber banner as partial failure — correct behaviour (no separate red state) |
