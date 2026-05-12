# Bulk Upload Phase 1 — Backend Ingestion Pipeline

## Branch & Status
- Branch: `feat/bulk-upload` (pushed to remote, commit `f83c99d`)
- Phase 1 of 5; covers the core POST ingestion endpoint only.

---

## Routing Architecture

```
POST   /api/v1/bulk-uploads        → handleBulkUpload      (ADMIN, OPERATOR)
GET    /api/v1/bulk-uploads        → handleGetSessions      (ADMIN, OPERATOR)
GET    /api/v1/bulk-uploads/:id    → handleGetSessionById   (ADMIN, OPERATOR)
```

**File chain (POST):**
```
bulk-upload.routes.js
  → validate(bulkUploadSchema)          [Zod — stops bad payloads before service]
  → protect + authorizeRoles(...)       [auth middleware]
  → bulk-upload.controller.js           [asyncHandler wrapper]
  → bulk-upload.service.js              [business logic]
  → bulk-upload.repository.js           [CALL statements only — no raw SQL]
```

---

## Request Payload Schema (Zod — `bulk-upload.validation.js`)

```json
{
  "sessionHash": "string (required, min 1) — MD5/SHA of upload content for dedup",
  "fileName": "string (optional, defaults to 'bulk_upload.json')",
  "rows": [
    {
      "senderId": "number (int, positive)",
      "senderAddressId": "number (int, positive)",
      "courierId": "number (int, positive, optional)",
      "receivers": [
        {
          "receiverId": "number (int, positive)",
          "receiverAddressId": "number (int, positive)",
          "receiverPhone": "string (min 10) — REQUIRED, Zod rejects if missing",
          "products": [
            { "variationId": "number", "quantity": "number" }
          ]
        }
      ]
    }
  ]
}
```

**Key validation rule:** `receiverPhone` is required on every receiver in every row.
A payload missing it returns `400 Validation Error` *before* the service is invoked.

---

## Response Shape

```json
{
  "success": true,
  "data": {
    "sessionId": 42,
    "successfulOrders": 8,
    "failedRows": 2
  }
}
```

---

## MySQL Stored Procedures

All 4 procedure definitions live in `sql-procedures/` (force-tracked; dir is otherwise gitignored).

### 1. `prc_checkduplicate_BulkUploadSessions(pSessionHash)`
- **Table:** `bulk_upload_sessions`
- **Returns:** `DuplicateCount INT`
- **Used for:** duplicate-batch guard at the start of `processBulkUpload`

### 2. `prc_BulkUploadSessions_set(pPkBulkUploadId, pSessionHash, pFileName, pTotalRows, pSuccessCount, pFailedCount, pCreatedBy)`
- **Table:** `bulk_upload_sessions`
- `pPkBulkUploadId = 0` → INSERT; returns `PkBulkUploadId` (LAST_INSERT_ID)
- `pPkBulkUploadId > 0` → UPDATE (SuccessCount, FailedCount)
- **Session is opened with SuccessCount=0, FailedCount=0** at the start; currently NOT updated at the end of the loop (Phase 1 scope). Future phases may call this again with final counts.

### 3. `prc_BulkUploadErrors_set(pPkBulkUploadErrorId, pFkBulkUploadId, pRowNumber, pErrorMessage, pRowData)`
- **Table:** `bulk_upload_errors`
- `pPkBulkUploadErrorId = 0` → INSERT only; returns `PkBulkUploadErrorId`
- `pRowData` = `JSON.stringify(originalRowPayload)` — the full row is stored verbatim as LONGTEXT
- **Called once per failed row**

### 4. `prc_BulkUploadOrderMapping_set(pPkMappingId, pFkBulkUploadId, pFkOrderId)`
- **Table:** `bulk_upload_order_mapping` (zero-touch junction table)
- `pPkMappingId = 0` → INSERT only; returns `PkMappingId`
- **Called once per successfully created order**

---

## Service Logic (`bulk-upload.service.js → processBulkUpload`)

```
1. bulkUploadRepository.checkDuplicate(sessionHash)
      → duplicateCount > 0 → throw 409 Conflict

2. bulkUploadRepository.createSession(sessionHash, fileName, rows.length, createdBy)
      → returns { PkBulkUploadId }

3. for each row (i):
      try:
        orderResult = await orderService.createOrder(rowData, user)
        orderId = orderResult.orderId || orderResult.data.orderId || orderResult.id
        bulkUploadRepository.mapOrder(sessionId, orderId)   → prc_BulkUploadOrderMapping_set
        successfulOrders++
      catch (err):
        bulkUploadRepository.logError(sessionId, i+1, err.message, JSON.stringify(rowData))
        failedRows++

4. return { sessionId, successfulOrders, failedRows }
```

**Critical behaviour:** One row failure does NOT abort the batch. All rows are attempted.
**Note:** `prc_BulkUploadSessions_set` is NOT called a second time to update final counts in Phase 1.
This is intentional scope — Phase 2+ should call it again (pPkBulkUploadId=sessionId) with the final successCount/failedCount.

---

## Repository Pattern

- `checkDuplicate(sessionHash)` → `CALL prc_checkduplicate_BulkUploadSessions(?)`
- `createSession(sessionHash, fileName, totalRows, createdBy)` → `CALL prc_BulkUploadSessions_set(0, ?, ?, ?, 0, 0, ?)`
- `logError(sessionId, rowNumber, errorMessage, rowData)` → `CALL prc_BulkUploadErrors_set(0, ?, ?, ?, ?)`
- `mapOrder(sessionId, orderId)` → `CALL prc_BulkUploadOrderMapping_set(0, ?, ?)`
- `getSessions(pAction, pId)` → `CALL prc_bulk_order_upload_log_get(?, ?)` (existing SP for GET routes)
- `getSessionDetails(pAction, sessionId)` → `CALL prc_bulk_order_upload_detail_get(?, ?)` (existing SP for GET routes)

**Rule:** No raw INSERT/UPDATE/SELECT in any repository method. All writes are CALL statements.

---

## Database Tables Referenced

| Table | Role |
|---|---|
| `bulk_upload_sessions` | One record per upload batch; keyed by `SessionHash` |
| `bulk_upload_errors` | Append-only error log; one row per failed order row |
| `bulk_upload_order_mapping` | Junction table linking `FkBulkUploadId` ↔ `FkOrderId` |
| `order_master` | Orders created by `orderService.createOrder` during the batch |

---

## Mock Mode (`USE_MOCK_DB=true`)

- `mockSessions` — in-memory array seeded with one sample session
- `mockErrors` — in-memory array (starts empty)
- `mockMappings` — in-memory array (starts empty)
- All repository methods branch on `process.env.USE_MOCK_DB !== 'true'`
