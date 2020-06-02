USE arms_db
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('ARMS.Interviewer') IS NULL
BEGIN
CREATE TABLE ARMS.Interviewer(
id int identity(1,1) primary key,
interviewPanelId int	NOT NULL,
constraint FK_interviewPanel foreign key(interviewPanelId) references ARMS.InterviewPanel(id),
employeeId int NOT NULL,
createdAt datetime2  default (sysdatetime()) NOT NULL,
createdBy varchar(50) NULL,
modifiedAt datetime2  default (sysdatetime()) NOT NULL,
modifiedBy varchar(50) NULL
)
END
--creating the trigger for any update of interviewPanel
--new batch for trigger
GO
CREATE TRIGGER trg_UpdateInterviewer
ON ARMS.Interviewer
AFTER UPDATE
AS
    UPDATE ARMS.Interviewer
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)
--new batch
	GO
--Insert into ARMS.Interviewer(interviewPanelId,employeeId)
--Values('1','1')

SELECT * from ARMS.Interviewer

