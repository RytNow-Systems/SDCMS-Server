CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadOrderMapping_set`(
  IN pPkMappingId    INT,
  IN pFkBulkUploadId INT,
  IN pFkOrderId      INT
)
BEGIN
  IF pPkMappingId = 0 THEN
    INSERT INTO bulk_upload_order_mapping
      (FkBulkUploadId, FkOrderId, CreatedDate)
    VALUES
      (pFkBulkUploadId, pFkOrderId, NOW());

    SELECT LAST_INSERT_ID() AS PkMappingId;
  END IF;
END
