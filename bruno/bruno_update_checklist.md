# Bruno Collections Update Checklist

> Changes since last export: commit `4e11aef` (Apr 20) → `1436a35` (HEAD)
> 8 commits of changes across routes, payloads, and response formats.

---

## Global Changes (Apply to ALL Collections)

> [!IMPORTANT]
> **camelCase Standardization**: All API response bodies now use camelCase instead of PascalCase.
> Example: `PkPartyId` → `pkPartyId`, `CustomerName` → `customerName`

Update all **Expected Response** examples in Bruno docs to use camelCase field names.

---

## Per-Collection Changes

### 1. Authentication ✅ No Changes
No structural changes. Login and Profile endpoints unchanged.

### 2. Senders ❌ Major Changes

| Change | Details |
|--------|---------|
| **Field Rename** | `addressLine1`/`addressLine2` → single `address` field |
| **Response Format** | `PkPartyId` → `pkPartyId` in all responses |
| **NEW Endpoint** | `GET /senders/names` — sender name autocomplete |
| **NEW Endpoint** | `GET /senders/phones` — phone number autocomplete |
| **NEW Endpoint** | `GET /senders/lookup-by-name?name=X` — search by name |
| **NEW Endpoint** | `GET /senders/:id/addresses` — address book list |
| **NEW Endpoint** | `POST /senders/:id/addresses` — create address |

**Action Items:**
- [ ] Update "Create Sender" payload: remove `addressLine1`/`addressLine2`, add `address`
- [ ] Update "Validation - Create Sender" payload similarly
- [ ] Update "Validation - Update Sender" payload similarly
- [ ] Update all response body examples to use camelCase
- [ ] Add 5 new request items for the new endpoints listed above

### 3. Product Catalog ❌ Minor Changes

| Change | Details |
|--------|---------|
| **NEW Endpoint** | `GET /products/dropdown` — combined product + category dropdown |

**Action Items:**
- [ ] Add "Product Dropdown" request: `GET {{base_url}}/products/dropdown`
- [ ] Roles: ADMIN, OPERATOR
- [ ] Response: `{ success: true, data: [{ productId, productName, categoryName }] }`

### 4. Order Pipeline ❌ Major Changes

| Change | Details |
|--------|---------|
| **Field Rename** | Receiver `addressLine1` → `address` in create order payload |
| **Mode A/B/C** | Order creation now supports 3 modes |
| **Qty Fix** | `qty` field validation updated |

**Action Items:**
- [ ] Update "Create Order" payload: change `addressLine1` → `address`, remove `addressLine2`
- [ ] Optionally add Mode A (sender-to-self) and Mode C (combo) test cases
- [ ] Update response examples to camelCase

### 5. Receivers ❌ ENTIRELY NEW COLLECTION

> [!IMPORTANT]
> Create a brand new Bruno collection named "Receivers" with 3 endpoints.

| Endpoint | Method | Auth |
|----------|--------|------|
| `/receivers/names` | GET | ADMIN, OPERATOR |
| `/receivers/phones` | GET | ADMIN, OPERATOR |
| `/receivers/lookup-by-name?name=X` | GET | ADMIN, OPERATOR |

**Action Items:**
- [ ] Create new collection "Receivers" in Bruno
- [ ] Add 3 GET endpoints with Bearer auth
- [ ] Add docs and assertions for each
- [ ] Export as .zip and .html

### 6. Courier Partners ✅ No Changes

### 7. Dashboard ✅ No Changes

### 8. Employee Management (ADMIN) ✅ No Changes

### 9. Notification ⚠️ Minor Fix

| Change | Details |
|--------|---------|
| **Route Fix** | Notification routes were returning 404, now fixed |

**Action Items:**
- [ ] Verify existing notification requests work with the corrected route
- [ ] No payload changes needed

### 10. Dispatch and Terminal States ✅ No Changes

### 11. Label Print Logging ✅ No Changes

### 12. Two Scan Operations ✅ No Changes

### 13. Parcel Events & Audit Export ✅ No Changes

### 14. Parcels Retrieval and Label Data ✅ No Changes

### 15. Bulk Upload ✅ No Changes

---

## Summary

| Collection | Status | New Endpoints | Payload Changes |
|------------|--------|---------------|-----------------|
| Authentication | ✅ OK | 0 | None |
| Senders | ❌ Update | 5 | `address` field rename |
| Product Catalog | ❌ Update | 1 | None |
| Order Pipeline | ❌ Update | 0 | `address` field rename, Mode A/B/C |
| **Receivers** | **❌ NEW** | **3** | N/A |
| Courier Partners | ✅ OK | 0 | None |
| Dashboard | ✅ OK | 0 | None |
| Employee Mgmt | ✅ OK | 0 | None |
| Notification | ⚠️ Verify | 0 | None |
| Others (6) | ✅ OK | 0 | None |
| **Total** | | **9 new** | **3 collections** |

## Re-Export Workflow
1. Open Bruno Desktop
2. Apply changes to the 4 affected collections above
3. Create the new Receivers collection
4. File → Export Collection (as .zip) for each changed collection → save to `bruno/`
5. File → Export as HTML for each → save to `bruno-html-docs/`
