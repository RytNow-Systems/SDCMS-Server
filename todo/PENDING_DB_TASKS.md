# Pending DB Tasks — SDCMS Backend

> **For DB Engineer.** All tasks raised 2026-05-14 during parcel lifecycle E2E testing and regression sweep.
> Source files in `sql-procedures/` already contain corrected SP definitions. The action for each task is: DROP the procedure, then re-create from the corrected definition in the source file.

---

## TASK 1 — Fix `prc_receiver_details_set`: UPDATE branch uses undeclared parameter

**File:** `sql-procedures/receiver_details`
**Status:** PENDING — source file fixed, DB not yet redeployed
**Impact:**
- `DELETE /orders/:id/cancel` — fails at receiver soft-delete step
- `PUT /orders/:id` — fails when removing or updating receivers
- Parcels ARE cancelled (SP-internal COMMIT fires before the error), but receiver rows and order header `IsActive` flag are NOT updated — data inconsistency.

**Root Cause:**
The UPDATE branch references `pFkReceiverId`, which is never declared as a parameter. The declared parameter is `pReceiverId` (no `Fk` prefix). MySQL resolves undeclared names as column references; since `pFkReceiverId` is not a column either, it throws `Unknown column 'pFkReceiverId' in 'field list'`. The INSERT branch uses `pReceiverId` correctly, which is why INSERT works and UPDATE does not.

**Fix — one line:**
```sql
-- BEFORE:
FkReceiverId = pFkReceiverId

-- AFTER:
FkReceiverId = pReceiverId
```

**Complete corrected procedure:**
```sql
CREATE DEFINER=`user`@`%` PROCEDURE `prc_receiver_details_set`(
    pPkReceiverDetailsId INT,
    pFkOrderId INT,
    pReceiverId INT,
    pFkPartyDetailsId INT,
    pCreatedBy INT,
    pIsActive INT
)
BEGIN
    IF pPkReceiverDetailsId = 0 THEN
        INSERT INTO receiver_details (FkOrderId, FkReceiverId, FkPartyDetailsId, IsActive)
        VALUES (pFkOrderId, pReceiverId, pFkPartyDetailsId, pIsActive);

        SELECT LAST_INSERT_ID() AS GeneratedReceiverId, pReceiverId AS ReceiverId;
    ELSE
        UPDATE receiver_details
        SET FkOrderId = pFkOrderId,
            FkReceiverId = pReceiverId,       -- was pFkReceiverId (undeclared)
            FkPartyDetailsId = pFkPartyDetailsId,
            IsActive = pIsActive
        WHERE PkReceiverDetailsId = pPkReceiverDetailsId;

        SELECT pPkReceiverDetailsId AS UpdatedReceiverId, pReceiverId AS ReceiverId;
    END IF;
END
```

**Action:**
```sql
DROP PROCEDURE IF EXISTS prc_receiver_details_set;
-- then re-create using the corrected definition above
```

---

## TASK 2 — Fix `prc_receiver_status_details_set`: INSERT omits `PreviousStatus` and `FkOrderStatusId`

**File:** `sql-procedures/receiver_status_details`
**Status:** PENDING — SP change required in DB
**Impact:**
- `GET /parcels/:id/timeline` always returns `previousStatus: null` for every event — no audit trail of state transitions.
- `FkOrderStatusId` is also NULL, so the `StatusName` JOIN in `prc_receiver_status_details_search` returns `''`; backend falls back to `ACTION_STATUS_MAP` for `newStatus`, which works but is fragile.

**Root Cause:**
`prc_receiver_status_details_set` was never given `pPreviousStatus` or `pFkOrderStatusId` parameters. Both columns exist in the table and are queried by `prc_receiver_status_details_get` and `prc_receiver_status_details_search`, but are always NULL because the INSERT omits them.

The callers (triggers 1–5 inside `prc_parcel_details_set`) must:
1. Query the current parcel status BEFORE the UPDATE.
2. Pass it as `pPreviousStatus` (the human-readable `lu_details.LuDetails` string).
3. Pass the NEW `FkParcelStatusId` as `pFkOrderStatusId`.

**Complete corrected procedure (new signature):**
```sql
CREATE DEFINER=`user`@`%` PROCEDURE `prc_receiver_status_details_set`(
    pFkParcelDetailsId   INT,
    pFkReceiverDetailsId INT,
    pActionType          VARCHAR(50),
    pAWBNumber           VARCHAR(100),
    pCreatedBy           INT,
    pPreviousStatus      VARCHAR(50),   -- NEW
    pFkOrderStatusId     INT            -- NEW (new status lu_details ID)
)
BEGIN
    INSERT INTO receiver_status_details
        (FkParcelDetailsId, FkReceiverDetailsId, ActionType, AWBNumber,
         PreviousStatus, FkOrderStatusId, CreatedDate, CreatedBy)
    VALUES
        (pFkParcelDetailsId, pFkReceiverDetailsId, pActionType, pAWBNumber,
         pPreviousStatus, pFkOrderStatusId, NOW(), pCreatedBy);
END
```

**Also required in `prc_parcel_details_set` (all triggers 1–5):**
Each `CALL prc_receiver_status_details_set(...)` must capture the previous status before the UPDATE and pass the two new arguments. Example for trigger 1:
```sql
-- Before UPDATE, capture current status:
DECLARE pPrevStatusName VARCHAR(50);
SELECT ld.LuDetails INTO pPrevStatusName
FROM parcel_details pd
LEFT JOIN lu_details ld ON ld.LuDetailsId = pd.FkParcelStatusId
WHERE pd.PkParcelDetailsId = pPkParcelDetailsId;

-- Then UPDATE, then CALL with new args:
CALL prc_receiver_status_details_set(
    pPkParcelDetailsId, pReceiverDetailsId,
    'PRINT_LABEL', NULL, pCreatedBy,
    pPrevStatusName,  -- previous status
    2                 -- new status ID (Label Printed)
);
```

**Action:**
```sql
DROP PROCEDURE IF EXISTS prc_receiver_status_details_set;
DROP PROCEDURE IF EXISTS prc_parcel_details_set;
-- then re-create both with the corrected definitions
```

---

## TASK 3 — Fix `prc_courier_partner_master_set`: INSERT uses column name instead of parameter for `PhoneNumber`

**File:** `sql-procedures/courier-master`
**Status:** PENDING — source file fixed, DB not yet redeployed
**Impact:**
- `POST /courier-partners` always saves `NULL` for `PhoneNumber`, even when a value is provided.

**Root Cause:**
In the INSERT VALUES clause, `PhoneNumber` (bare column name) was written instead of `pPhoneNumber` (the parameter). MySQL resolves the identifier as a self-reference to the column being inserted, which evaluates to NULL for a new row. The UPDATE branch uses `pPhoneNumber` correctly.

**Fix — one character:**
```sql
-- BEFORE:
VALUES (pCourierName, PhoneNumber, pTrackingUrlTemplate, NOW(), pCreatedBy, pIsActive)

-- AFTER:
VALUES (pCourierName, pPhoneNumber, pTrackingUrlTemplate, NOW(), pCreatedBy, pIsActive)
```

**Action:**
```sql
DROP PROCEDURE IF EXISTS prc_courier_partner_master_set;
-- then re-create using the corrected definition in sql-procedures/courier-master
```

---

## TASK 4 — Redeploy `prc_courier_partner_master_get`: `pAction=0` missing `isactive = 1` filter

**File:** `sql-procedures/courier-master`
**Status:** PENDING — source file already correct, DB not redeployed
**Impact:**
- `GET /courier-partners` returns inactive courier records to the frontend.
- `GET /courier-partners/:id` correctly returns 404 for inactive IDs (pAction=1 branch already has the filter in the deployed SP).

**Root Cause:**
The deployed SP for pAction=0 does not have `WHERE isactive = 1`. The source file already contains the correct definition — this is a redeploy-only fix.

**Action:**
```sql
DROP PROCEDURE IF EXISTS prc_courier_partner_master_get;
-- then re-create using the definition in sql-procedures/courier-master
-- (pAction=0 block already has: WHERE isactive = 1)
```

---

## TASK 5 — Fix `prc_parcel_details_set` trigger 3: DISPATCH does not set `TrackingNo`

**File:** `sql-procedures/parcel_details`
**Status:** PENDING — SP change required in DB
**Impact:**
- `GET /parcels/:id/label-data` returns `trackingNo: null` for any parcel dispatched without a preceding AWB scan (trigger 2). The AWB number IS logged in `receiver_status_details` (actionType=DISPATCH), but the canonical `TrackingNo` column on `parcel_details` is never populated.

**Root Cause:**
Trigger 3 only updates `DispatchDate` and `FkParcelStatusId`. When an operator/admin dispatches directly (skipping the scan flow), `pAWBNumber` is passed but never written to `parcel_details.TrackingNo`.

**Fix — one line added to trigger 3 UPDATE:**
```sql
-- BEFORE:
UPDATE parcel_details
SET DispatchDate = NOW(),
    FkParcelStatusId = 4
WHERE PkParcelDetailsId = pPkParcelDetailsId;

-- AFTER:
UPDATE parcel_details
SET DispatchDate = NOW(),
    FkParcelStatusId = 4,
    TrackingNo = IFNULL(pAWBNumber, TrackingNo)
WHERE PkParcelDetailsId = pPkParcelDetailsId;
```

`IFNULL(pAWBNumber, TrackingNo)` preserves an existing `TrackingNo` (set by a prior AWB scan) when `pAWBNumber` is NULL.

**Action:**
```sql
DROP PROCEDURE IF EXISTS prc_parcel_details_set;
-- then re-create with the trigger 3 block updated as shown above.
-- No change required to triggers 0, 1, 2, 4, or 5.
```

---

## TASK 6 — Fix `prc_product_color_matrix_set`: neither branch returns a result set

**File:** `sql-procedures/product-color-matrix`
**Status:** PENDING — source file fixed, DB not yet redeployed
**Impact:**
- `PATCH /products/:id/variations/:variationId/status` returns `data: null` even on success.
- `POST /products/:id/variations` (add new variation) also returns `data: null`.
- Backend has a temporary workaround: makes a second `prc_product_color_matrix_get` call after every set to fetch the updated row. Once this SP is redeployed, the workaround in `product.repository.js → setColorMatrix` must be reverted (remove the second DB call and restore `return rows[0]?.[0] || null`).

**Root Cause:**
- INSERT branch: `SELECT LAST_INSERT_ID() INTO pProdColorId` is a variable assignment — produces no result set.
- UPDATE branch: no SELECT at all.
Both branches return nothing to the caller.

**Fix — add SELECT after each branch:**
```sql
-- INSERT branch: after SELECT LAST_INSERT_ID() INTO pProdColorId, add:
SELECT * FROM product_color_matrix WHERE PkProductColorId = pProdColorId;

-- UPDATE branch: after the UPDATE, add:
SELECT * FROM product_color_matrix WHERE PkProductColorId = pPkProductColorId;
```

**Action:**
```sql
DROP PROCEDURE IF EXISTS prc_product_color_matrix_set;
-- then re-create using the corrected definition in sql-procedures/product-color-matrix
```

**Backend revert required after redeploy:**
In `src/modules/product/product.repository.js → setColorMatrix`, remove the second `prc_product_color_matrix_get` call and restore:
```js
return rows[0]?.[0] || null;
```

---

## Summary Table

| # | Procedure | Type | Root Cause | API Impact |
|---|-----------|------|------------|------------|
| 1 | `prc_receiver_details_set` | Bug fix | `pFkReceiverId` undeclared in UPDATE | Cancel/update order fails |
| 2 | `prc_receiver_status_details_set` | Feature | INSERT omits PreviousStatus + FkOrderStatusId | Timeline always null previousStatus |
| 3 | `prc_courier_partner_master_set` | Bug fix | `PhoneNumber` column ref instead of `pPhoneNumber` param | POST courier saves null phone |
| 4 | `prc_courier_partner_master_get` | Redeploy | pAction=0 missing isactive filter in deployed SP | List returns inactive couriers |
| 5 | `prc_parcel_details_set` (trigger 3) | Bug fix | DISPATCH trigger omits TrackingNo write | Label data shows null trackingNo |
| 6 | `prc_product_color_matrix_set` | Bug fix | Neither branch returns result set | Variation set/toggle returns null data |
