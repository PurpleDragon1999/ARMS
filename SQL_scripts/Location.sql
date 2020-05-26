
IF OBJECT_ID('ARMS.Location') IS NULL
BEGIN
	CREATE TABLE ARMS.Location(
	[id] int identity(1,1) not null,
	[code] as 'CYGLCID' + cast([id] as varchar(50)) persisted not null,
	[locationName] varchar(255) not null,
	[jobId] int not null,
	[createdAt] datetime2 default (sysdatetime()) not null,
	[createdBy] varchar(255) not null,
	[modifiedAt] datetime2 default (sysdatetime()) not null,
	[modifiedBy] varchar(255) not null,
	constraint PK_Location primary key (id),
	constraint FK_LC_JobId foreign key ([jobId]) references ARMS.JobDescription(id)
	)

END


GO
CREATE TRIGGER trg_UpdateLocation
ON ARMS.Location
AFTER UPDATE
AS
    UPDATE ARMS.Location
    SET [modifiedAt]  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

GO
insert into ARMS.Location ([locationName],[jobId],[createdBy],[modifiedBy])
values ('Dallas', 1, 'shivani','shivani');

select * from ARMS.Location;

