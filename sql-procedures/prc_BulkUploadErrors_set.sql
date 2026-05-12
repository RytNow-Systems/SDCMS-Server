CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadErrors_set`(
  IN pPkErrorId      INT,
  IN pFkBulkUploadId INT,
  IN pRowNumber      INT,
  IN pErrorMessage   TEXT,
  IN pRowData        LONGTEXT
)
BEGIN
  IF pPkErrorId = 0 THEN
    INSERT INTO bulk_upload_errors
      (FkBulkUploadId, RowNumber, ErrorMessage, RowData)
    VALUES
      (pFkBulkUploadId, pRowNumber, pErrorMessage, pRowData);

    SELECT LAST_INSERT_ID() AS PkErrorId;
  END IF;
END
