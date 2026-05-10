CREATE DEFINER=`user`@`%` PROCEDURE `prc_checkduplicate_BulkUploadSessions`(
  IN pSessionHash VARCHAR(255)
)
BEGIN
  SELECT COUNT(*) AS DuplicateCount
  FROM bulk_upload_sessions
  WHERE SessionHash = pSessionHash;
END
