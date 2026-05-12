# SQL Stored Procedure Definitions

All MySQL stored procedure definitions live in `sql-procedures/` at the project root. Files are named after the table with no extension. Always read the relevant file before writing or debugging any repository SP call — these are ground truth for parameter order, return columns, and NULL behavior.

## Key files

- `sql-procedures/parcel_details` — prc_parcel_details_set, prc_parcel_details_get, prc_parcel_details_search, prc_parcel_details_search_by_awb, FnGenerateParcelCode
- `sql-procedures/party_master` — prc_Party_master_set, prc_Party_master_get, prc_party_master_search, prc_check_duplicate_Party_master
- `sql-procedures/order_master` — prc_order_master_set, prc_order_master_get, prc_order_master_search
- `sql-procedures/order_items` — prc_order_items_set, prc_order_items_get, prc_order_items_search
- `sql-procedures/receiver_details` — receiver_details procedures
- `sql-procedures/receiver_status_details` — prc_receiver_status_details_set, prc_receiver_status_details_get
- `sql-procedures/employee_master` — employee procedures
- `sql-procedures/product_master` — product procedures
- `sql-procedures/party_details` — party_details procedures
- `sql-procedures/lu_details` — lookup table procedures
- `sql-procedures/dashboard-procedures` — dashboard metrics procedures

## Important notes

- `prc_parcel_details_search` is the rich JOIN procedure (returns ParcelStatusName, ReceiverName, OrderCode etc). Use for findAll/findById/getLabelData.
- `prc_parcel_details_get` returns bare parcel_details columns only — not suitable for API responses.
- `prc_Party_master_set` INSERT response does NOT include IsActive — only PkPartyId, CustomerName, PhoneNo, EmailId, Address, City, State, Pincode, IsNewParty.
