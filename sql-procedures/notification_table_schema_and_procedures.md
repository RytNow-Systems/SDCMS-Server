This is a table from another application, that supports email,sms & whatsapp I gues

Table: notification_log 

Columns:
PkNotificationLogId bigint(11) AI PK 
FkNotificationTypeId int(11) 
FkClientId int(11) 
FkPlantId int(11) 
FkMachineId int(11) 
FkToolId int(11) 
FkMaterialId int(11) 
FkReasonId int(11) 
FkReasonDetailsId int(11) 
AppSendStatusId int(11) 
SMSSendStatusId int(11) 
EmailSendStatusId int(11) 
WhatUpStatusId int(11) 
LastNotificationTime datetime 
LastNotificationLevel int(11) 
IsActive int(11)

---

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_notification_get`()
BEGIN
/***************************************************
Author:		Aniket Akolkar
Module Name	:
File name in solution	:
UserControl/Field Name :
Input Parameter	:
Output Parameter :
Description :
****************************************************/
		SELECT COUNT(*) AS NotificationPending
		FROM notification_log WHERE AppSendStatusId = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_notification_log_set`(pNotificationTypeId int(11), pClientId int(11), pPlantId int(11), pMachineId int(11), pToolId int(11), pMaterialId int(11), pReasonId int(11), pReasonDetailsId int(11), pIsActive int(11))
BEGIN
/***************************************************
Author:		Aniket Akolkar
Module Name	:
File name in solution	:
UserControl/Field Name :
Input Parameter	:
Output Parameter :
Description :
****************************************************/
	
		INSERT INTO notification_log ( FkNotificationTypeId, FkClientId, FkPlantId, FkMachineId, FkToolId, FkMaterialId, FkReasonId, FkReasonDetailsId, LastNotificationTime, IsActive) 
					VALUES ( pNotificationTypeId, pClientId, pPlantId, pMachineId, pToolId, pMaterialId, pReasonId, pReasonDetailsId, Now(), pIsActive);

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_notification_set`(pFkNotificationTypeId int(11), pNotificationDescription varchar(1000))
BEGIN
/***************************************************
Author:		Aniket Akolkar
Module Name	:
File name in solution	:
UserControl/Field Name :
Input Parameter	:
Output Parameter :
Description :
****************************************************/
	
		INSERT INTO notification_log ( FkNotificationTypeId, NotificationDescription, NotificationStatusId) VALUES (pFkNotificationTypeId, pNotificationDescription, 0);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_notification_update`()
BEGIN
/***************************************************
Author:		Aniket Akolkar
Module Name	:
File name in solution	:
UserControl/Field Name :
Input Parameter	:
Output Parameter :
Description :
****************************************************/

	UPDATE notification_log SET AppSendStatusId = 1 WHERE AppSendStatusId = 0;

END$$
DELIMITER ;
