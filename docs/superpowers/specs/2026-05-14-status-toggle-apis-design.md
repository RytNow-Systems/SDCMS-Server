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
*   Ensure the mock DB logic correctly flips statuses back and forth.
*   Verify that passing `isActive: false` effectively hides the records from standard `GET` listings.
*   Verify that admins cannot disable themselves (Employee module).
*   Test that variations are appropriately disabled/enabled alongside parent Products.