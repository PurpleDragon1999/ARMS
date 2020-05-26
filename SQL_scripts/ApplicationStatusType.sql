IF OBJECT_ID('ARMS.ApplicationStatusType') IS NULL
BEGIN
	CREATE TABLE ARMS.ApplicationStatusType(
	[id] int identity(1,1) not null,
	[code] as 'CYGSTID' + cast([id] as nvarchar(50)) persisted,
	[statusName] nvarchar(255) unique not null,
	[createdAt] datetime2 default (sysdatetime()) not null,
	[createdBy] varchar(255) not null,
	[modifiedAt] datetime2 default (sysdatetime()) not null,
	[modifiedBy] varchar(255) not null,
	constraint PK_ApplicationStatusType primary key (id),
	
	)

END

GO
CREATE TRIGGER trg_UpdateApplicationStatusType
ON ARMS.ApplicationStatusType
AFTER UPDATE
AS
    UPDATE ARMS.ApplicationStatusType
    SET [modifiedAt]  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

GO
insert into ARMS.ApplicationStatusType ([statusName],[createdBy], [modifiedBy])
values ('AppliedSuccessfully','shivani', 'shivani');
select * from ARMS.ApplicationStatusType;


