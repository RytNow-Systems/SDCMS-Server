# Bulk Order Actions — Implementation Plan

## Feature
Order list page: select multiple orders, perform bulk actions.

## Actions Required
1. Mark as Dispatched
2. Send Notification
3. Print Labels

---

## Architecture Decision

**Frontend sends `parcelIds[]`, not `orderIds[]`.**

Rationale: `prc_parcel_details_search` has no `FkOrderId` filter param. Order detail view already knows parcel IDs. Avoids SP change and server-side order→parcel resolution.

---

## Existing APIs (no change needed)

| Action | Endpoint | Status |
|---|---|---|
| Dispatch | `POST /api/v1/parcels/dispatch` — body: `{ parcelDetailsIds: [] }` | ✅ exists |

## APIs to Build

### 1. `POST /api/v1/parcels/bulk-print`
Log label print event + return label data for N parcels.

**Body:** `{ parcelIds: number[] }`

**Behaviour:**
- Allowed states: `Pending`, `Label Printed` only (matches existing single `log-print` rule)
- Calls `prc_parcel_details_set` trigger 1 (PRINT_LABEL) for each parcel
- Returns array of label data objects (same shape as `GET /parcels/:id/label-data`)
- Partial success: process all, surface per-parcel errors in response

**Response shape:**
```json
{
  "success": true,
  "data": {
    "printed": 3,
    "skipped": 1,
    "labels": [...],
    "errors": [{ "parcelId": 12, "reason": "Cannot print label in 'AWB Linked' state" }]
  }
}
```

---

### 2. `POST /api/v1/parcels/bulk-notify`
Send dispatch notification for N parcels.

**Body:** `{ parcelIds: number[] }`

**Behaviour:**
- Gate: only `Dispatched` parcels — notify before dispatch makes no sense to receiver
- Receiver phone null → skip with error (Mode A sender-to-self orders)
- No duplicate guard yet (parcel_notification_log table not deployed) — **risk: double SMS if called twice**
- Partial success: same pattern as bulk-print

**Response shape:**
```json
{
  "success": true,
  "data": {
    "sent": 2,
    "skipped": 1,
    "errors": [{ "parcelId": 7, "reason": "Parcel not in Dispatched state" }]
  }
}
```

---

## Edge Cases

### Dispatch (existing endpoint)
- Mixed-state order (some AWB Linked, some Pending): existing endpoint throws 400 on non-AWB-Linked parcels
- Frontend must only pass AWB Linked parcel IDs, or we update dispatch to do partial + summary response

### Print Labels
- Reprinting on AWB Linked / Dispatched / Delivered → currently blocked (400) by `logLabelPrint`
- **Decision needed:** allow reprint on any state, or keep current restriction?

### Notifications
- Duplicate send risk until `parcel_notification_log` is deployed (DB task backlog)
- Only SMS supported currently (no email/push)

---

## Files to Create/Modify

```
src/
  modules/parcel/
    parcel.service.js          — add bulkPrint(), bulkNotify()
    parcel.repository.js       — no change needed (reuse existing methods)
  interfaces/http/
    controllers/parcel.controller.js   — add bulkPrint, bulkNotify handlers
    routes/parcel.routes.js            — add POST /bulk-print, POST /bulk-notify
    validations/parcel.validation.js   — add bulkPrintSchema, bulkNotifySchema
```

---

## Open Questions
- [ ] Should bulk dispatch also return partial-success summary (instead of current fail-fast)?
- [ ] Allow label reprint on dispatched parcels?
- [ ] Duplicate notification guard — prioritise deploying parcel_notification_log before this ships?
