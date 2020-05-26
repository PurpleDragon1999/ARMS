
IF OBJECT_ID('ARMS.Criteria') IS NULL
BEGIN
	CREATE TABLE ARMS.Criteria(
	[id] int identity(1,1) not null,
	[marks] int not null,
	[remarks] nvarchar(max) not null,
	[createdAt] datetime default (sysdatetime()) not null,
	[createdBy] varchar(255) not null,
	[modifiedAt] datetime default (sysdatetime()) not null,
	[modifiedBy] varchar(255) not null,
	[criteriaTypeId] int not null,
	[assessmentId] int not null,
	constraint PK_Criteria primary key (id),
	constraint FK_CR_ArmsCriteriaType foreign key ([criteriaTypeId]) references ARMS.CriteriaType(id),
	constraint FK_CR_ArmsAssessment foreign key ([assessmentId]) references ARMS.Assessment(id)

	)

END

GO

CREATE TRIGGER trg_UpdateCriteria
ON ARMS.Criteria
AFTER UPDATE
AS
    UPDATE ARMS.Criteria
    SET [modifiedAt]  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)



