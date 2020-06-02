USE arms_db
GO

SET QUOTED_IDENTIFIER ON
GO

SELECT * FROM ARMS.Round
GO

IF OBJECT_ID('ARMS.Assessment') IS NULL
BEGIN
	CREATE TABLE ARMS.Assessment(
	[id] int identity(1,1) not null,
	[code] as 'CYGAID' + cast([id] as nvarchar(50)) persisted,
	[feedback] nvarchar(max) not null,
	[Result] bit not null,
	[createdAt] datetime2 default (sysdatetime()) not null,
	[createdBy] nvarchar(255) not null,
	[modifiedAt] datetime2 default (sysdatetime()) not null,
	[modifiedBy] nvarchar(255) not null,
	[roundId] int not null,
	[applicationId] int not null,
	[interviewPanelId] int not null,
	constraint PK_Assessment primary key (id),
	constraint FK_Assessment_ArmsRound foreign key ([roundId]) references ARMS.Round(id),
	constraint FK_Assessment_ArmsApplication foreign key ([applicationId]) references ARMS.Application(id),
	constraint FK_Assessment_ArmsInterviewPanel foreign key ([interviewPanelId]) references ARMS.InterviewPanel(id)
	)

END

GO

IF OBJECT_ID('ARMS.Assessment') IS NULL
BEGIN
CREATE TRIGGER trg_UpdateAssessment
ON ARMS.Assessment
AFTER UPDATE
AS
    UPDATE ARMS.Assessment
    SET [modifiedAt]  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)
END
GO
--insert into ARMS.Assessment ([feedback],[result],[roundId],[applicationId],[interviewPanelId], [createdBy],[modifiedBy])
--values ('good', 0,'2','1','2','shivani','shivani');

select * from ARMS.Assessment;



