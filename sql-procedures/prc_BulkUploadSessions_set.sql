CREATE DEFINER=`user`@`%` PROCEDURE `prc_BulkUploadSessions_set`(
  IN pPkBulkUploadId  INT,
  IN pSessionHash     VARCHAR(255),
  IN pFileName        VARCHAR(255),
  IN pTotalRows       INT,
  IN pSuccessCount    INT,
  IN pFailedCount     INT,
  IN pCreatedBy       VARCHAR(100)
)
BEGIN
  IF pPkBulkUploadId = 0 THEN
    INSERT INTO bulk_upload_sessions
      (SessionHash, FileName, TotalRows, SuccessCount, FailedCount, CreatedBy, CreatedDate)
    VALUES
      (pSessionHash, pFileName, pTotalRows, pSuccessCount, pFailedCount, pCreatedBy, NOW());

    SELECT LAST_INSERT_ID() AS PkBulkUploadId;
  ELSE
    UPDATE bulk_upload_sessions
    SET
      SuccessCount = pSuccessCount,
      FailedCount  = pFailedCount
    WHERE PkBulkUploadId = pPkBulkUploadId;

    SELECT pPkBulkUploadId AS PkBulkUploadId;
  END IF;
END
