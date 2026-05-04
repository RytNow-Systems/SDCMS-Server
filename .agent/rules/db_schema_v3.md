---
trigger: model_decision
description: Primary reference for the v3 database physical schema (tables, columns, types, and FKs). Use for data structure context. For logic and stored procedures, refer to api_procedure_spec document.
---

## 🔷 MASTER TABLES

### Party_master
- PkPartyId (PK)
- FkPartyTypeId (Sender / Receiver)
- CustomerName
- PhoneNo
- EmailId
- Address (varchar 255 — replaces AddressLine1/AddressLine2)
- City
- State
- Pincode
- CreatedBy (INT FK → employee_master)
- CreatedDate
- UpdatedBy (INT FK → employee_master)
- UpdatedDate
- IsActive

> ⚠️ v2 CHANGE: `AddressLine1` + `AddressLine2` consolidated into single `Address` field.

---

### Party_Details (Address Book)
- PkPartyDetailsId (PK)
- FkPartyId (FK → Party_master)
- PartyName
- PhoneNo
- EmailId
- Address
- City
- State
- Pincode
- Country
- IsActive
- IsDefault (boolean — marks default address for a party)
- CreatedBy (INT FK → employee_master)
- CreatedDate
- UpdatedBy (INT FK → employee_master)
- UpdatedDate

> ✅ NEW in v2: Per-party address book. A party can have multiple shipping addresses.
> Convention: `FkPartyId` links back to `Party_master.PkPartyId`.

---

### product_category
- PkProductCategoryId (PK)
- CategoryName (DEFAULT NULL)
- IsActive
- CreatedDate
- CreatedBy (INT FK → employee_master)
- UpdatedDate
- UpdatedBy (INT FK → employee_master)

> ⚠️ v3 CHANGE: `CategoryName` constraint relaxed from NOT NULL to DEFAULT NULL.
> ⚠️ v3 FIX: `CreatedBy` / `UpdatedBy` corrected from VARCHAR(20) to INT (matches employee_master.EmployeeCode).

---

### product_master
- PkProductId (PK)
- FkProductCategoryId (FK)
- FkUnitId (FK)
- MaterialCode
- MaterialName
- cu_item_code
- MaterialRate
- MaterialDescription
- CreatedBy (INT FK → employee_master)
- CreatedDate
- UpdatedBy (INT FK → employee_master)
- UpdatedDate
- IsActive

---

### lu_color_code
- PkLuColorId (PK, AUTO_INCREMENT)
- ColorName (varchar 50)
- ColorCode (varchar 20)
- CreatedBy (INT FK → employee_master)
- CreatedDate
- IsActive (default 1)

> ✅ NEW in v3: Master lookup table for available product colors.

---

### product_color_matrix
- PkProductColorId (PK, AUTO_INCREMENT)
- FkProductId (FK → product_master)
- FkLuColorId (FK → lu_color_code)
- MaterialRate (decimal 10,2 — catalogue/list price for this specific color+size combination)
- Size (varchar 50)
- CreatedBy (INT FK → employee_master)
- CreatedDate (DEFAULT CURRENT_TIMESTAMP)
- UpdatedBy (INT FK → employee_master)
- UpdatedDate (ON UPDATE CURRENT_TIMESTAMP)
- IsActive (tinyint, default 1)

> ✅ NEW in v3: Maps a product to a color and size, allowing unique pricing per combination.
> 🔑 Pricing Hierarchy: `product_color_matrix.MaterialRate` (specific) > `product_master.MaterialRate` (catalog fallback).

---

### lu_unit
- PkUnitId (PK)
- UnitTitle
- UnitCode
- ConversionFactor
- CreatedDate
- CreatedBy (INT FK → employee_master)
- IsActive

---

### courier_partner_master
- CourierId (PK)
- CourierName (UNIQUE)
- TrackingUrlTemplate
- IsActive

---

### employee_master
- EmployeeCode (INT PK AUTO_INCREMENT)
- FullName
- ContactNumber
- EmailAddress
- UserName
- Password
- FkRoleId
- AllowLogin
- IsActive
- CreatedDate
- CreatedBy (INT FK → employee_master)
- UpdatedDate
- UpdatedBy (INT FK → employee_master)

---

### lu_user_role
- PkUserRoleId (PK)
- RoleCode (UNIQUE)
- RoleDescription
- IsActive

---

### lu_master
- LuMasterId (PK)
- LuMaster
- LuMaster_1
- LuMaster_2
- LuMaster_3

---

### lu_details
- LuDetailsId (PK)
- LuDetails
- LuDetails_1
- LuDetails_2
- LuDetails_3
- LuMasterId (FK)
- IsActive

---

## 🔷 TRANSACTION TABLES

### order_master
- PkOrderId (PK)
- OrderCode (DEFAULT NULL)
- FkSenderId (FK → Party_master)
- OrderDate
- ExpectedDeliveryDate
- TotalAmount
- CreatedBy (INT FK → employee_master)
- CreatedDate
- UpdatedBy (INT FK → employee_master)
- UpdatedDate
- IsActive

> ⚠️ Order status is DERIVED (NOT stored)
> ⚠️ v3 CHANGE: `OrderCode` constraint relaxed from NOT NULL to DEFAULT NULL.

---

### receiver_details
- PkReceiverDetailsId (PK)
- FkOrderId (FK → order_master)
- FkReceiverId (FK → Party_master, optional)
- ReceiverName
- ReceiverPhone
- ReceiverEmail
- Address (varchar 255 — replaces AddressLine1/AddressLine2)
- City
- State
- Pincode
- Country
- IsActive

> ⚠️ v2 CHANGE: `AddressLine1` + `AddressLine2` consolidated into single `Address` field.

---

### order_items
- PkOrderItemId (PK)
- FkReceiverDetailsId (FK → receiver_details)
- FkProductId (FK → product_master)
- OutwardQty
- FkUnitId (FK → lu_unit)
- UnitPrice
- TransactionDate
- IsActive
- CreatedDate
- CreatedBy (INT FK → employee_master)

---

### parcel_details
- PkParcelDetailsId (PK)
- FkReceiverDetailsId (FK → receiver_details)
- FkCourierId (FK → courier_partner_master)
- TrackingNo (AWB)
- QRCode (UNIQUE)
- FkParcelStatusId (FK → lu_details)
- LabelPrintCount
- DispatchDate
- CreatedDate
- CreatedBy (INT FK → employee_master)

> ✅ Constraint:
UNIQUE (FkCourierId, TrackingNo)

---

### receiver_status_details (EVENT LOG)

- PkReceiverStatusDetailsId (PK)
- FkParcelDetailsId (FK → parcel_details) ✅ CRITICAL
- FkReceiverDetailsId (FK → receiver_details)
- FkOrderStatusId (FK → lu_details)
- ActionType (QR_SCAN | AWB_LINK | STATUS_UPDATE | RELINK_AWB)
- AWBNumber (nullable)
- PreviousStatus (nullable)
- CreatedDate
- CreatedBy (INT FK → employee_master)

> ⚠️ Append-only audit + scan log

---

### Notification_log

- PkNotificationLogId (PK)
- FkParcelDetailsId (FK → parcel_details) ✅
- FkReceiverDetailsId (FK → receiver_details) ✅
- FkNotificationTypeId
- FkClientId
- FkPlantId
- FkReasonId
- FkReasonDetailsId
- AppSendStatusId
- SMSSendStatusId
- EmailSendStatusId
- LastNotificationTime
- LastNotificationLevel
- IsActive
- RequestedBy (INT FK → employee_master)
- IsPaymentCheck

---

## 🔷 OPTIONAL (RECOMMENDED)

### courier_awb_prefix_map

- Id (PK)
- FkCourierId
- Prefix

> Used for auto-detecting courier from AWB

---

## 🔷 STATUS DEFINITIONS (lu_details)

### Parcel Status
- Pending
- Label Printed
- AWB Linked
- Dispatched
- Delivered

---

### ActionType (ENUM)
- QR_SCAN
- AWB_LINK
- STATUS_UPDATE
- RELINK_AWB

---

## 🔷 KEY RULES

- QRCode → UNIQUE
- AWB → UNIQUE per courier
- One parcel = one AWB
- LabelPrintCount → increment only
- Logs → append only
- Order status → derived from parcel states
