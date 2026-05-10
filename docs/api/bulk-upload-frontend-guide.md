# Bulk Upload — Frontend Integration Guide

**Base URL:** `{{base_url}}/api/v1`  
**Auth:** `Authorization: Bearer <token>` on every request  
**Roles:** `ADMIN`, `OPERATOR`

---

## Overview

Bulk upload is a **two-phase workflow**.

| Phase | Endpoint | Purpose |
|-------|----------|---------|
| 1 | `POST /bulk-uploads` | Submit batch, get session ID + counts |
| 2 | `GET /bulk-uploads/:sessionId/errors` | Fetch failed rows for correction |

Each row in the batch is processed **independently** — a bad row never aborts the rest of the batch. The session always completes; you check `failedRows` in the Phase 1 response to know whether to run Phase 2.

---

## TypeScript Interfaces

```typescript
// ── Request shapes ──────────────────────────────────────────────

interface BulkUploadProduct {
  variationId: number;   // positive int — must exist in Product Matrix
  quantity:    number;   // positive int
}

interface BulkUploadReceiver {
  receiverId:        number;            // positive int — must exist in Party Master
  receiverAddressId: number;            // positive int — must belong to receiverId
  receiverPhone:     string;            // min 10 chars, stored as snapshot
  products:          BulkUploadProduct[]; // min 1 item
}

interface BulkUploadRow {
  senderId:        number;               // positive int — must exist in Party Master
  senderAddressId: number;              // positive int — must belong to senderId
  courierId?:      number;              // optional; defaults to null if omitted
  receivers:       BulkUploadReceiver[]; // min 1 item
}

interface BulkUploadPayload {
  sessionHash: string;         // required — see "Generating sessionHash" below
  fileName?:   string;         // optional, default "bulk_upload.json"
  rows:        BulkUploadRow[]; // min 1 item
}

// ── Response shapes ─────────────────────────────────────────────

interface BulkUploadSessionCreated {
  sessionId:        number;
  successfulOrders: number;
  failedRows:       number;
}

interface BulkUploadSessionSummary {
  sessionId:    number;
  sessionHash:  string;
  fileName:     string;
  totalRows:    number;
  successCount: number;
  failedCount:  number;
  createdBy:    string;   // employeeCode of the uploader
  createdAt:    string;   // ISO 8601
}

interface BulkUploadErrorRow {
  rowData:      BulkUploadRow; // original payload, always a parsed object
  errorMessage: string;
}

interface BulkUploadSessionDetail {
  bulkUploadErrorId: number;
  bulkUploadId:      number;
  rowNumber:         number;   // 1-based index within the original rows array
  errorMessage:      string;
  rowData:           BulkUploadRow;
}

interface BulkUploadSessionWithDetails {
  session: BulkUploadSessionSummary;
  details: BulkUploadSessionDetail[];
}
```

---

## Generating `sessionHash`

`sessionHash` is a **client-generated content fingerprint** used to block accidental duplicate submissions. The backend returns `409 Conflict` if the same hash is submitted twice — so the hash must change whenever the payload changes.

**Recommended approach — native SubtleCrypto (no dependency):**

```typescript
async function computeSessionHash(rows: BulkUploadRow[]): Promise<string> {
  const text = JSON.stringify(rows);
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
```

**Alternative — `crypto-js` (if already in your dep tree):**

```typescript
import CryptoJS from 'crypto-js';

function computeSessionHash(rows: BulkUploadRow[]): string {
  return CryptoJS.MD5(JSON.stringify(rows)).toString();
}
```

> **Important:** Hash the `rows` array only — do not include `fileName` or other wrapper fields, so the hash purely reflects the order data.

---

## Phase 1 — Submit the Batch

```
POST /api/v1/bulk-uploads
Content-Type: application/json
Authorization: Bearer <token>
```

### Request

```json
{
  "sessionHash": "a3f5c2d1...",
  "fileName": "may_dispatch.json",
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
            { "variationId": 3, "quantity": 10 },
            { "variationId": 5, "quantity": 2 }
          ]
        }
      ]
    }
  ]
}
```

### Success Response — `201 Created`

```json
{
  "success": true,
  "data": {
    "sessionId": 12,
    "successfulOrders": 1,
    "failedRows": 0
  }
}
```

### What to do next

```typescript
const { sessionId, successfulOrders, failedRows } = response.data;

if (failedRows === 0) {
  // All rows processed — show success banner
} else if (successfulOrders === 0) {
  // Every row failed — show full-failure state
  await fetchErrors(sessionId);
} else {
  // Partial success — show counts and allow error review
  await fetchErrors(sessionId);
}
```

---

## Phase 2 — Fetch Failed Rows

```
GET /api/v1/bulk-uploads/:sessionId/errors
Authorization: Bearer <token>
```

### Success Response — `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "rowData": {
        "senderId": 1,
        "senderAddressId": 1,
        "courierId": 2,
        "receivers": [
          {
            "receiverId": 4,
            "receiverAddressId": 99,
            "receiverPhone": "9123456780",
            "products": [{ "variationId": 3, "quantity": 10 }]
          }
        ]
      },
      "errorMessage": "Receiver address not found for receiverAddressId: 99"
    }
  ]
}
```

Returns an **empty array** if the session has no errors — safe to call unconditionally.

`rowData` is always a **parsed object** (never a raw JSON string) — you can iterate it directly in the UI.

---

## Error Responses

### `400 Bad Request` — Zod validation failure

Triggered before any rows are processed. The entire request is rejected; no session is created.

```json
{
  "success": false,
  "error": "rows[0].receivers[0].receiverPhone: Receiver phone number must be at least 10 digits"
}
```

Fix the payload shape and retry. Common causes:

| Field | Constraint |
|-------|------------|
| `sessionHash` | Required, non-empty string |
| `rows` | At least 1 item |
| `rows[n].receivers` | At least 1 item per row |
| `receivers[n].products` | At least 1 item per receiver |
| `receivers[n].receiverPhone` | Min 10 characters |
| `variationId`, `quantity` | Positive integers |

### `401 Unauthorized`

Missing or expired JWT token.

```json
{ "success": false, "error": "Not authorized, token failed" }
```

### `409 Conflict` — Duplicate session

The `sessionHash` was already used in a previous submission.

```json
{
  "success": false,
  "error": "Duplicate upload detected: a session with this sessionHash already exists."
}
```

This is a safeguard against double-submits (e.g. user clicks "Upload" twice). To re-submit corrected data, you **must** change the rows (which changes the hash). Do not manually fabricate a different hash — the hash should always reflect the actual content being submitted.

### `403 Forbidden`

Role is not `ADMIN` or `OPERATOR`.

---

## Complete Integration Example

```typescript
async function submitBulkUpload(
  rows: BulkUploadRow[],
  fileName: string,
  authToken: string,
): Promise<{ sessionId: number; successfulOrders: number; errors: BulkUploadErrorRow[] }> {
  const sessionHash = await computeSessionHash(rows);

  // Phase 1 — submit
  const uploadRes = await fetch('/api/v1/bulk-uploads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ sessionHash, fileName, rows }),
  });

  if (!uploadRes.ok) {
    const err = await uploadRes.json();
    throw new Error(err.error ?? 'Bulk upload failed');
  }

  const { data } = await uploadRes.json();
  const { sessionId, successfulOrders, failedRows } = data as BulkUploadSessionCreated;

  // Phase 2 — fetch errors (only if needed, but safe to call always)
  let errors: BulkUploadErrorRow[] = [];
  if (failedRows > 0) {
    const errRes = await fetch(`/api/v1/bulk-uploads/${sessionId}/errors`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const errData = await errRes.json();
    errors = errData.data as BulkUploadErrorRow[];
  }

  return { sessionId, successfulOrders, errors };
}
```

---

## Additional Endpoints

### List All Sessions

```
GET /api/v1/bulk-uploads
```

Returns all sessions for the history/audit view. Response shape: `BulkUploadSessionSummary[]`.

### Get Session with Error Details

```
GET /api/v1/bulk-uploads/:id
```

Returns `{ session: BulkUploadSessionSummary, details: BulkUploadSessionDetail[] }`. Use this for a detail/drill-down page where you want to show both the summary header and the individual failed rows in one call.

---

## Constraints & UI Implications

| Constraint | UI recommendation |
|-----------|-------------------|
| All IDs must be pre-existing Party Master records | Validate sender/receiver existence before building the rows array (use the `/senders/lookup` and `/receivers/lookup` endpoints) |
| `receiverPhone` min 10 chars | Enforce in the CSV parser / form before submission |
| `courierId` is optional per row | Default to a global selection if the UI offers one, or omit |
| Same `sessionHash` → 409 | Do not let users re-submit unless they change the data; use the error detail page for corrections instead |
| `successfulOrders + failedRows` always equals `rows.length` | Use both values to render a progress summary |
