USE arms_db
GO

SET QUOTED_IDENTIFIER ON
GO

Truncate TABLE JobDescription
GO

IF OBJECT_ID('ARMS.Interview') IS NULL
BEGIN
CREATE TABLE ARMS.Interview (
id int identity(1,1) primary key,
code as 'CYGIID' + cast(id as varchar(100)),
[date] date NOT NULL,
[time] time NOT NULL,
[venue] varchar(50),
[noOfRounds] int NOT NULL,
[jobId] int NOT NULL,
constraint FK_Jobdescription foreign key(jobId) references ARMS.JobDescription(id),
[createdAt] datetime2  default (sysdatetime()) NOT NULL,
[modifiedAt] datetime2  default (sysdatetime()) NOT NULL,
[createdBy] varchar(50) NULL,
[modifiedBy] varchar(50) NULL,
)
END
GO
--creating the trigger for any update of interview
CREATE TRIGGER trg_UpdateInterview
ON ARMS.Interview
AFTER UPDATE
AS
    UPDATE ARMS.Interview
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

GO
--Insert command for interview
--Insert into ARMS.Interview([date],[time],[venue],[noOfRounds],[jobId])
--Values('2020-02-09','12:00','delhi','5','1')

--display command for interview

Select * FROM ARMS.Interview

--INNER JOIN FOR JobDescription and Interview
Select *FROM ARMS.Interview INNER JOIN ARMS.JobDescription On ARMS.Interview.jobId=ARMS.JobDescription.id

--update command for interview
Update ARMS.Interview
SET venue='Noida' WHERE id=1
 
