if not exists (select * from sys.schemas where name = 'ARMS')
begin
	exec('create schema ARMS')
end

 IF OBJECT_ID('ARMS.InterviewPanel') IS NULL
BEGIN
CREATE TABLE ARMS.InterviewPanel(
id int identity(1,1) primary key ,
[roundId] int NOT NULL,
constraint FK_round foreign key(roundId) references ARMS.Round(id),
[createdAt] datetime2  default (sysdatetime()) NOT NULL,
[createdBy] varchar(50) NULL,
[modifiedAt] datetime2  default (sysdatetime()) NOT NULL,
[modifiedBy] varchar(50) NULL
)
END
--creating the trigger for any update of interviewPanel
--new batch for trigger
GO
CREATE TRIGGER trg_UpdateInterviewPanel
ON ARMS.InterviewPanel
AFTER UPDATE
AS
    UPDATE ARMS.InterviewPanel
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)


--Select command
select * FROM ARMS.InterviewPanel