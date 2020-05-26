IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name ='ARMS')
BEGIN
EXEC('CREATE SCHEMA ARMS')
END

IF OBJECT_ID('ARMS.CriteriaType') IS NULL
BEGIN
	CREATE TABLE ARMS.CriteriaType(
	[id] int identity(1,1) not null,
	[code] as 'CYGCTID' + cast([id] as varchar(50)) persisted not null,
	[criteriaName] nvarchar(255) unique not null,
	[createdAt] datetime2 default (sysdatetime()) not null,
	[createdBy] nvarchar(255) not null,
	[modifiedAt] datetime2 default (sysdatetime()) not null,
	[modifiedBy] nvarchar(255) not null,
	[roundTypeId] int not null,
	constraint PK_CriteriaType primary key (id),
	constraint FK_CT_ArmsRoundType foreign key (roundTypeId) references ARMS.RoundType(id)
	)

END

GO
CREATE TRIGGER trg_UpdateCriteriaType
ON ARMS.CriteriaType
AFTER UPDATE
AS
    UPDATE ARMS.CriteriaType
    SET [modifiedAt]  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

GO
insert into ARMS.CriteriaType ([criteriaName],[roundTypeId],[createdBy],[modifiedBy])
values ('javascript', 1, 'shivani','shivani');
select * from ARMS.CriteriaType;

