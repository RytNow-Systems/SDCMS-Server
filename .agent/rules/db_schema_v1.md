---
trigger: model_decision
---

## 🔷 MASTER TABLES

### Party_master
- PkPartyId (PK)
- FkPartyTypeId (Sender / Receiver)
- CustomerName
- PhoneNo
- EmailId
- AddressLine1
- AddressLine2
- City
- State
- Pincode
- CreatedBy
- CreatedDate
- UpdatedBy
- UpdatedDate
- IsActive

---

### product_category
- PkProductCategoryId (PK)
- CategoryName
- IsActive
- CreatedDate
- CreatedBy
- UpdatedDate
- UpdatedBy

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
- CreatedBy
- CreatedDate
- UpdatedBy
- UpdatedDate
- IsActive

---

### lu_unit
- PkUnitId (PK)
- UnitTitle
- UnitCode
- ConversionFactor
- CreatedDate
- CreatedBy
- IsActive

---

### courier_partner_master
- CourierId (PK)
- CourierName (UNIQUE)
- TrackingUrlTemplate
- IsActive

---

### employee_master
- EmployeeCode (PK)
- FullName
- ContactNumber
- EmailAddress
- UserName
- Password
- FkRoleId
- AllowLogin
- IsActive
- CreatedDate
- CreatedBy
- UpdatedDate
- UpdatedBy

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
- OrderCode
- FkSenderId (FK → Party_master)
- OrderDate
- ExpectedDeliveryDate
- TotalAmount
- CreatedBy
- CreatedDate
- UpdatedBy
- UpdatedDate
- IsActive

> ⚠️ Order status is DERIVED (NOT stored)

---

### receiver_details
- PkReceiverDetailsId (PK)
- FkOrderId (FK → order_master)
- FkReceiverId (FK → Party_master, optional)
- ReceiverName
- ReceiverPhone
- ReceiverEmail
- AddressLine1
- AddressLine2
- City
- State
- Pincode
- Country
- IsActive

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
- CreatedBy

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
- CreatedBy

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
- CreatedBy

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
- RequestedBy
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