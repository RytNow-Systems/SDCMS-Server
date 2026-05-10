CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadErrors_set`(
  IN pPkBulkUploadErrorId INT,
  IN pFkBulkUploadId      INT,
  IN pRowNumber           INT,
  IN pErrorMessage        TEXT,
  IN pRowData             LONGTEXT
)
BEGIN
  IF pPkBulkUploadErrorId = 0 THEN
    INSERT INTO bulk_upload_errors
      (FkBulkUploadId, RowNumber, ErrorMessage, RowData, CreatedDate)
    VALUES
      (pFkBulkUploadId, pRowNumber, pErrorMessage, pRowData, NOW());

    SELECT LAST_INSERT_ID() AS PkBulkUploadErrorId;
  END IF;
END
