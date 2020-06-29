IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name='ARMS')
BEGIN
EXEC('CREATE SCHEMA ARMS')
END

--table creation
IF OBJECT_ID('ARMS.EligibilityCriteria') IS NULL
BEGIN
CREATE TABLE ARMS.EligibilityCriteria(
	[id] int identity(1,1) primary key,
	
	[eligibilityCriteriaName] varchar(255) not null,
	
	[createdAt] datetime2 default (sysdatetime()) not null,
	[createdBy] nvarchar(255)  null,
	[modifiedAt] datetime2 default (sysdatetime()) not null,
	[modifiedBy] nvarchar(255)  null,
	
)

END
--trigger
GO
CREATE TRIGGER trg_UpdateEligibilityCriteria
ON ARMS.EligibilityCriteria
AFTER UPDATE
AS
    UPDATE ARMS.EligibilityCriteria
    SET [modifiedAt]  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

--insertions
GO
insert into ARMS.EligibilityCriteria ([eligibilityCriteriaName])
values ('Bachelors'),
 ('Masters'),
 ('High School')
 --select command
select * from ARMS.EligibilityCriteria;
