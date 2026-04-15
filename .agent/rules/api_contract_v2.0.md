---
trigger: glob
globs: src/interfaces/http/**/*
---

> **Project:** Smart Dispatch & Courier Management System
> **Date:** 2026-04-03
> **Base URL:** `http://localhost:5000/api/v1`
> **Total Endpoints:** 48

---

## 1. Conventions

### 1.1 Authentication

All endpoints (except Login) require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Token payload contains: `{ id, role }`. Token expiry: configurable via `JWT_EXPIRY` env var.

### 1.2 Response Envelope

**Success:**
```json
{ "success": true, "data": { ... } }
```

**Success (paginated list):**
```json
{
  "success": true,
  "data": [ ... ],
  "meta": { "page": 1, "limit": 20, "totalRows": 154, "totalPages": 8 }
}
```

**Error:**
```json
{ "success": false, "error": "Descriptive error message" }
```

### 1.3 Pagination & Filtering

All list endpoints support these query parameters:

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | int | 1 | Page number (1-indexed) |
| `limit` | int | 20 | Rows per page (max: 100) |
| `search` | string | — | Free-text search (resource-specific fields) |
| `sortBy` | string | `created_at` | Column to sort by |
| `sortOrder` | string | `desc` | `asc` or `desc` |

Additional resource-specific filters are documented per endpoint.

### 1.4 Standard HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad Request — validation failure or business rule violation |
| `401` | Unauthorized — missing or invalid JWT token |
| `403` | Forbidden — user role not authorized for this endpoint |
| `404` | Resource not found |
| `409` | Conflict — duplicate entry (e.g., duplicate AWB, duplicate email) |
| `500` | Internal server error |

### 1.5 Role Definitions

| Role | Code | Description |
|---|---|---|
| Admin | `ADMIN` | Full system access. Manages employees, master data, and dashboard. |
| Operator | `OPERATOR` | Creates orders, prints labels, dispatches parcels, sends notifications. |
| Courier | `COURIER` | Scans QR codes, links AWBs. Limited read-only access to orders/parcels. |

---

## 2. Auth Module

### 2.1 Login

`POST /auth/login` — **Public (no token required)**

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

| Field | Type | Required | Validation |
|---|---|---|---|
| `email` | string | ✅ | Valid email format |
| `password` | string | ✅ | Non-empty |

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error Responses:**

| Status | Condition | Error Message |
|---|---|---|
| `401` | Wrong email or password | `"Invalid email or password"` |
| `403` | Account disabled (`AllowLogin = false`) | `"Your account has been deactivated. Contact admin."` |

---

### 2.2 Get Profile

`GET /auth/profile` — **ADMIN, OPERATOR, COURIER**

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "employeeCode": "EMP001",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

---

## 3. Employee Management

> **Access:** `ADMIN` only for all endpoints

### 3.1 Endpoint Summary

| # | Method | Endpoint | Description |
|---|---|---|---|
| 1 | `POST` | `/employees` | Create a new employee account |
| 2 | `GET` | `/employees` | List all employees (paginated) |
| 3 | `GET` | `/employees/:id` | Get employee by ID |
| 4 | `PUT` | `/employees/:id` | Update employee details |
| 5 | `PATCH` | `/employees/:id/toggle-access` | Enable or disable login access |

### 3.2 Create Employee

`POST /employees`

**Request Body:**

```json
{
  "name": "Ravi Kumar",
  "email": "ravi@dispatch.com",
  "password": "securePass123",
  "role": "OPERATOR"
}
```

| Field | Type | Required | Validation |
|---|---|---|---|
| `name` | string | ✅ | Min 2 chars |
| `email` | string | ✅ | Valid email, must be unique |
| `password` | string | ✅ | Min 6 chars |
| `role` | string | ✅ | One of: `ADMIN`, `OPERATOR`, `COURIER` |

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": 4,
    "employeeCode": "EMP004",
    "name": "Ravi Kumar",
    "email": "ravi@dispatch.com",
    "role": "OPERATOR",
    "allowLogin": true,
    "createdAt": "2026-04-03T08:52:00Z"
  }
}
```

| Status | Condition | Error Message |
|---|---|---|
| `409` | Email already exists | `"An employee with this email already exists"` |

### 3.3 List Employees

`GET /employees?page=1&limit=20&search=ravi&role=OPERATOR`

| Filter | Type | Description |
|---|---|---|
| `role` | string | Filter by role (`ADMIN`, `OPERATOR`, `COURIER`) |
| `search` | string | Search by name or email |
| `allowLogin` | boolean | Filter by active/inactive status |

### 3.4 Get Employee by ID

`GET /employees/:id`

Returns same data shape as Create response. Returns `404` if not found.

### 3.5 Update Employee

`PUT /employees/:id`

**Request Body:** Same fields as Create (all optional — send only fields to update). Password updates are re-hashed server-side.

### 3.6 Toggle Access

`PATCH /employees/:id/toggle-access`

**Request Body:**

```json
{ "allowLogin": false }
```

**Business Rule:** An admin cannot disable their own account. Returns `400` if attempted.

---

## 4. Master Data — Products

> **Access:** `ADMIN`, `OPERATOR`

### 4.1 Endpoint Summary

| # | Method | Endpoint | Description |
|---|---|---|---|
| 1 | `POST` | `/products` | Create a product |
| 2 | `GET` | `/products` | List products (paginated) |
| 3 | `GET` | `/products/:id` | Get product by ID |
| 4 | `PUT` | `/products/:id` | Update product |
| 5 | `DELETE` | `/products/:id` | Soft-delete product |

### 4.2 Create Product

`POST /products`

**Request Body:**

```json
{
  "materialName": "Cotton Shirt",
  "materialRate": 450.00,
  "cuItemCode": "CS-001"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `materialName` | string | ✅ | Product display name |
| `materialRate` | decimal | ✅ | Catalog price (MRP) |
| `cuItemCode` | string | ❌ | ERP integration code |

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "materialName": "Cotton Shirt",
    "materialRate": 450.00,
    "cuItemCode": "CS-001",
    "createdAt": "2026-04-03T08:52:00Z"
  }
}
```

### 4.3 List Products

`GET /products?page=1&limit=20&search=shirt`

| Filter | Type | Description |
|---|---|---|
| `search` | string | Search by material name or item code |

### 4.4 – 4.5 Get / Update / Delete

Standard CRUD patterns. `DELETE` performs a soft-delete (marks `IsActive = false`). Products referenced by existing orders cannot be hard-deleted.

---

## 5. Master Data — Courier Partners

> **Access:** `ADMIN` only

### 5.1 Endpoint Summary

| # | Method | Endpoint | Description |
|---|---|---|---|
| 1 | `POST` | `/courier-partners` | Create courier partner |
| 2 | `GET` | `/courier-partners` | List courier partners |
| 3 | `GET` | `/courier-partners/:id` | Get by ID |
| 4 | `PUT` | `/courier-partners/:id` | Update |
| 5 | `DELETE` | `/courier-partners/:id` | Soft-delete |

### 5.2 Create Courier Partner

`POST /courier-partners`

**Request Body:**

```json
{
  "courierName": "BlueDart",
  "trackingUrlTemplate": "https://bluedart.com/track?awb={AWB}"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `courierName` | string | ✅ | Display name |
| `trackingUrlTemplate` | string | ❌ | Use `{AWB}` as placeholder for tracking number |

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "courierName": "BlueDart",
    "trackingUrlTemplate": "https://bluedart.com/track?awb={AWB}",
    "createdAt": "2026-04-03T08:52:00Z"
  }
}
```

### 5.3 List Courier Partners

`GET /courier-partners?search=blue`

No pagination needed (small dataset). Returns all active partners. `search` filters by name.

---

## 6. Master Data — Senders

> **Access:** `ADMIN`, `OPERATOR`

### 6.1 Endpoint Summary

| # | Method | Endpoint | Description |
|---|---|---|---|
| 1 | `POST` | `/senders` | Create sender |
| 2 | `GET` | `/senders` | List senders (paginated) |
| 3 | `GET` | `/senders/:id` | Get by ID |
| 4 | `PUT` | `/senders/:id` | Update |
| 5 | `DELETE` | `/senders/:id` | Soft-delete |
| 6 | `GET` | `/senders/lookup` | Find sender by phone (order form auto-fill) |

### 6.2 Create Sender

`POST /senders`

**Request Body:**

```json
{
  "customerName": "Ramesh Textiles",
  "phoneNo": "9876543210",
  "addressLine1": "14, Gandhi Nagar",
  "addressLine2": "Near Railway Station",
  "city": "Surat",
  "state": "Gujarat",
  "pincode": "395002"
}
```

| Field | Type | Required |
|---|---|---|
| `customerName` | string | ✅ |
| `phoneNo` | string | ✅ |
| `addressLine1` | string | ✅ |
| `addressLine2` | string | ❌ |
| `city` | string | ✅ |
| `state` | string | ✅ |
| `pincode` | string | ✅ |

### 6.3 Sender Lookup (Auto-fill)

`GET /senders/lookup?phone=9876543210`

Used by the order creation form. When the operator types a phone number, the frontend calls this to auto-fill sender details.

**Found (200):**

```json
{
  "success": true,
  "data": {
    "id": 5,
    "customerName": "Ramesh Textiles",
    "phoneNo": "9876543210",
    "addressLine1": "14, Gandhi Nagar",
    "addressLine2": "Near Railway Station",
    "city": "Surat",
    "state": "Gujarat",
    "pincode": "395002"
  }
}
```

**Not Found (200):**

```json
{ "success": true, "data": null }
```

> **Note:** This returns `200` with `null` data (not `404`), because "sender not found" is a normal flow — the operator proceeds to type details manually and the sender is created during order submission.

---

## 7. Order Management

> **Access:** `ADMIN`, `OPERATOR` (create/edit/cancel) | `COURIER` (list only, read-only)

### 7.1 Endpoint Summary

| # | Method | Endpoint | Roles | Description |
|---|---|---|---|---|
| 1 | `POST` | `/orders` | ADMIN, OPERATOR | Create complex order |
| 2 | `GET` | `/orders` | ALL | List orders (paginated, filtered) |
| 3 | `GET` | `/orders/:id` | ADMIN, OPERATOR | Get full order aggregate |
| 4 | `PUT` | `/orders/:id` | ADMIN, OPERATOR | Update order (before dispatch) |
| 5 | `PATCH` | `/orders/:id/cancel` | ADMIN, OPERATOR | Cancel entire order |

### 7.2 Create Order (Complex)

`POST /orders`

This is the primary transactional endpoint. It creates the full order graph in one call: sender (find-or-create) → order → receivers → items → parcels.

**Request Body:**

```json
{
  "senderName": "Ramesh Textiles",
  "senderMobile": "9876543210",
  "senderAddress": "14, Gandhi Nagar, Surat, Gujarat 395002",
  "courierId": 2,
  "products": [
    { "productId": 1, "quantity": 2, "unitPrice": 450.00 }
  ],
  "receivers": [
    {
      "receiverName": "Delhi Branch",
      "receiverPhone": "9123456780",
      "addressLine1": "45, Karol Bagh",
      "addressLine2": "",
      "city": "New Delhi",
      "state": "Delhi",
      "pincode": "110005",
      "country": "India",
      "products": [
        { "productId": 1, "quantity": 5, "unitPrice": 420.00 },
        { "productId": 3, "quantity": 2, "unitPrice": 1100.00 }
      ]
    },
    {
      "receiverName": "Mumbai Branch",
      "receiverPhone": "9988776655",
      "addressLine1": "22, Linking Road",
      "addressLine2": "Bandra West",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400050",
      "country": "India",
      "products": [
        { "productId": 1, "quantity": 3, "unitPrice": 450.00 }
      ]
    }
  ]
}
```

**Request Field Reference:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `senderName` | string | ✅ | |
| `senderMobile` | string | ✅ | Used for find-or-create in `sender_master` |
| `senderAddress` | string | ✅ | Flat string — snapshot frozen on order for label printing |
| `courierId` | int | ✅ | FK → `courier_partner_master` |
| `products` | array | ❌ | Root-level products for the sender-as-receiver (Mode A or Mode C) |
| `products[].productId` | int | ✅ | F