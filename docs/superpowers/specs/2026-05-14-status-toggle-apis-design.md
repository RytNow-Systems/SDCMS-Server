# Status Toggle APIs Design

## Objective
Convert the existing DELETE APIs for Courier Partners, Employees, and Products into PATCH APIs. These new endpoints will allow the frontend to toggle the `isActive` status (soft delete/reactivate) rather than performing an ambiguous "delete" operation.

## Architecture & Naming Convention
The new endpoints will be specific status-toggle routes to maintain clear audit trails and permissions.

*   **Courier:** `PATCH /api/v1/courier-partners/:id/status`
*   **Employee:** `PATCH /api/v1/employees/:id/status`
*   **Product:** `PATCH /api/v1/products/:id/status`

### Payload
Each endpoint will accept a JSON body containing the desired state:
```json
{
  "isActive": true // or false
}
```

## Layer-by-Layer Implementation

### 1. Routes (`src/interfaces/http/routes/*.js`)
*   Remove the `.delete()` handlers for `/:id` in `courier.routes.js`, `employee.routes.js`, and `product.routes.js`.
*   Add new `.patch('/:id/status')` handlers pointing to the new controller methods. Ensure existing protection and role authorization middlewares are preserved.

### 2. Controllers (`src/interfaces/http/controllers/*.js`)
*   **Rename:** Change existing `deleteX` functions (e.g., `deleteCourier`) to `updateXStatus` (e.g., `updateCourierStatus`).
*   **Logic:** 
    *   Extract the `isActive` boolean from `req.body`.
    *   Call the respective service method passing the `id`, `isActive`, and any user context (like `req.user.id`).
    *   Return a standard success response: `{ success: true, message: 'Status updated successfully', data: ... }`.

### 3. Services (`src/modules/*/X.service.js`)
*   **Rename:** Change existing `deleteX` methods to `updateXStatus`.
*   **Logic:** 
    *   Update method signatures to accept `isActive`.
    *   Maintain business rules (e.g., in `employee.service.js`, ensure an admin cannot disable their own account).
    *   Pass the `isActive` flag down to the repository layer.

### 4. Repositories (`src/modules/*/X.repository.js`)
*   **Rename:** Change `delete(id, adminId)` to `updateStatus(id, isActive, adminId)`.
*   **Live DB Logic:** 
    *   In the stored procedure calls (e.g., `CALL prc_courier_partner_master_set`), update the `IsActive` parameter from a hardcoded `0` to dynamically pass `isActive ? 1 : 0`.
*   **Mock DB Logic:**
    *   Update the in-memory array elements by setting `IsActive = isActive` instead of hardcoding it to `false`.
*   **Cascades (Products):**
    *   In `product.repository.js`, the `updateStatus` method must cascade the `isActive` state to its color matrix variations, updating them to the parent's new status instead of blindly deleting them.

## Verification & Testing
Verification will be performed using `curl` with admin credentials.

**Admin Credentials:**
- Email: `admin@test.com`
- Password: `admin`

### Verification Steps (for each module):
1. **Login:**
   ```bash
   curl -X POST http://localhost:5000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@test.com", "password": "admin"}'
   ```
2. **Identify ID:** List resources and pick an ID.
3. **Toggle OFF:**
   ```bash
   curl -X PATCH http://localhost:5000/api/v1/[resource]/:id/status \
     -H "Authorization: Bearer <JWT>" \
     -H "Content-Type: application/json" \
     -d '{"isActive": false}'
   ```
4. **Verify OFF:** Check that `isActive` is `false` in details/list.
5. **Toggle ON:**
   ```bash
   curl -X PATCH http://localhost:5000/api/v1/[resource]/:id/status \
     -H "Authorization: Bearer <JWT>" \
     -H "Content-Type: application/json" \
     -d '{"isActive": true}'
   ```
6. **Verify ON:** Check that `isActive` is `true`.

### Special Checks:
- **Product Cascades:** Verify that `GET /api/v1/products/:id` shows all variations have their `isActive` status synced with the parent product after a status toggle.
- **Employee Self-Safety:** Attempting to `PATCH /api/v1/employees/[own_id]/status` with `isActive: false` should return a `400 Bad Request`.