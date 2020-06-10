IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name='ARMS')
BEGIN
EXEC('CREATE SCHEMA ARMS')
END
IF OBJECT_ID('ARMS.Location') IS NULL
BEGIN
	CREATE TABLE ARMS.Location(
	[id] int identity(1,1) not null,
	[code] as 'CYGLCID' + cast([id] as nvarchar(50)) persisted,
	[locationName] varchar(255) not null,
	[createdAt] datetime2 default (sysdatetime()) not null,
	[createdBy] nvarchar(255) not null,
	[modifiedAt] datetime2 default (sysdatetime()) not null,
	[modifiedBy] nvarchar(255) not null,
	constraint PK_Location primary key (id),
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
insert into ARMS.Location ([locationName],[createdBy],[modifiedBy])

values ('Dallas', 'shivani','shivani'),
 ('Noida', 'shivani','shivani')


select * from ARMS.Location;

