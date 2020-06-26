if not exists (select * from sys.schemas where name = 'ARMS')
begin
	exec('create schema ARMS')
end

--table creation
IF OBJECT_ID('ARMS.EmploymentType') IS NULL
BEGIN
CREATE TABLE ARMS.EmploymentType(
	[id] int identity(1,1) primary key,
	
	[employmentTypeName] varchar(255) not null,
	
	[createdAt] datetime2 default (sysdatetime()) not null,
	[createdBy] nvarchar(255)  null,
	[modifiedAt] datetime2 default (sysdatetime()) not null,
	[modifiedBy] nvarchar(255)  null,
	
)

END
--trigger
GO
CREATE TRIGGER trg_UpdateEmploymentType
ON ARMS.EmploymentType
AFTER UPDATE
AS
    UPDATE ARMS.EmploymentType
    SET [modifiedAt]  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

--insertions
GO
insert into ARMS.EmploymentType ([employmentTypeName])
values ('full-time'),
 ('part-time'),
 ('Intern')
 --select command
select * from ARMS.EmploymentType;
