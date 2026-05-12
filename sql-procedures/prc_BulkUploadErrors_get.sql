CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadErrors_get`(
  IN pAction         INT,
  IN pFkBulkUploadId INT
)
BEGIN
  -- pAction = 0: Get all error rows for a specific bulk upload session
  IF pAction = 0 THEN
    SELECT
      PkErrorId,
      FkBulkUploadId,
      RowNumber,
      ErrorType,
      ErrorMessage,
      RowData,
      CreatedAt
    FROM bulk_upload_errors
    WHERE FkBulkUploadId = pFkBulkUploadId
    ORDER BY RowNumber ASC;
  END IF;
END
