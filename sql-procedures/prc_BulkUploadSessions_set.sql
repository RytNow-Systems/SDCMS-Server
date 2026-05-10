CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadSessions_set`(
  IN pPkBulkUploadId          INT,
  IN pSessionHash             VARCHAR(255),
  IN pFileName                VARCHAR(255),
  IN pTotalRows               INT,
  IN pSuccessfulOrders        INT,
  IN pFailedRows              INT,
  IN pFkUploadedByEmployeeCode INT
)
BEGIN
  IF pPkBulkUploadId = 0 THEN
    INSERT INTO bulk_upload_sessions
      (SessionHash, FileName, TotalRows, SuccessfulOrders, FailedRows, FkUploadedByEmployeeCode, Status)
    VALUES
      (pSessionHash, pFileName, pTotalRows, pSuccessfulOrders, pFailedRows, pFkUploadedByEmployeeCode, 'VALIDATING');

    SELECT LAST_INSERT_ID() AS PkBulkUploadId;
  ELSE
    UPDATE bulk_upload_sessions
    SET
      SuccessfulOrders = pSuccessfulOrders,
      FailedRows       = pFailedRows,
      Status           = CASE
                           WHEN pFailedRows = 0 THEN 'COMPLETED'
                           WHEN pSuccessfulOrders = 0 THEN 'FAILED'
                           ELSE 'PARTIAL_SUCCESS'
                         END
    WHERE PkBulkUploadId = pPkBulkUploadId;

    SELECT pPkBulkUploadId AS PkBulkUploadId;
  END IF;
END
