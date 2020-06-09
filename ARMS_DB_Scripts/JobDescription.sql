--creation of jobDescription table
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name='ARMS')
BEGIN
EXEC('CREATE SCHEMA ARMS')
END
IF OBJECT_ID('ARMS.JobDescription') IS NULL
BEGIN
CREATE TABLE ARMS.JobDescription(
id int identity(1,1) primary key,
[code] as 'CYGJID' + cast(id as varchar(100)),
[jobTitle] varchar(60) NOT NULL unique,
[openingDate] datetime2 NOT NULL,
[closingDate] datetime2 NOT NULL,
[description] nvarchar(MAX) NOT NULL,
[locationId] int NOT NULL,
constraint FK_location foreign key(locationId) references ARMS.Location(id),
[eligibilityCriteriaId] int NOT NULL,
constraint FK_eligibilityCriteria foreign key(eligibilityCriteriaId) references ARMS.EligibilityCriteria(id),
[employmentTypeId] int NOT NULL,
constraint FK_employmentType foreign key(employmentTypeId) references ARMS.EmploymentType(id),

[salary] bigint NULL,
[vacancies] int NULL,
[pdfBlobData] varBinary(MAX),
[createdAt] datetime2  default (sysdatetime()) NOT NULL,
[createdBy] varchar(50) NULL,
[modifiedAt] datetime2  default (sysdatetime()) NOT NULL,
[modifiedBy] varchar(50) NULL
)
END
GO
--trigger on any update
CREATE TRIGGER trg_UpdateJobDescription
ON ARMS.JobDescription
AFTER UPDATE
AS
    UPDATE ARMS.JobDescription
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)
GO
--insert command for jobDescription

Insert into ARMS.JobDescription([jobTitle],[openingDate],[closingDate],[description],[locationId],[eligibilityCriteriaId],[employmentTypeId],pdfBlobData)
SELECT 'Software Developer','2020-09-02','2020-09-09','require a logically strong person','1','1','1', BulkColumn
 FROM OPENROWSET(Bulk 'C:\Users\deepanshu.balani\Pictures\anal2.jpg', SINGLE_BLOB) AS BLOB

 
 

Select * FROM ARMS.JobDescription
--update command for jobDescription
UPDATE ARMS.JobDescription
SET jobTitle='python developer'
WHERE id = 1;
SELECT * FROM ARMS.JobDescription

--To get Object id of ARMS.JobDescription
Select OBJECT_Id('ARMS.JobDescription')

--Adding the column skills in table
ALTER TABLE ARMS.JobDescription 
ADD skills varchar(255)
