if not exists (select * from sys.schemas where name = 'arms')
begin
	exec('create schema arms')
end

IF OBJECT_ID('ARMS.HRMS_Employee') IS NULL
BEGIN
CREATE TABLE ARMS.HRMS_Employee
(
 [id]          int IDENTITY(1,1) primary key ,
 [name]        varchar(50) NOT NULL ,
 [cygCode] as 'CYG' + cast(id as varchar(100)),
 [designation] varchar(300) check (Designation in ('Intern', 'Consultant 1', 'Consultant 2', 'Associate 1',
'Associate 2')) default 'Consultant 1' not null,

 [role] varchar(255) check (Role in ('SuperUser', 'Admin', 'Employee')) default 'Employee',
 [email] varchar(400) not null unique ,
 [createdAt]   datetime2(7)  default (sysdatetime()) NOT NULL ,
 [createdBy]   varchar(50)  NULL ,
 [modifiedAt]  datetime2(7)  default (sysdatetime()) NOT NULL ,
 [modifiedBy]  varchar(50)  NULL ,
)
END
--creating the trigger for any update of interview
--new batch for trigger
GO
CREATE TRIGGER trg_UpdateARMSEmployee
ON ARMS.HRMS_Employee
AFTER UPDATE
AS
    UPDATE ARMS.HRMS_Employee
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

--insert command
GO
Insert into ARMS.HRMS_Employee([name],[designation],[role],[email])
Values('sahil','Consultant 1','Admin','sahil2@gmail.com')

SELECT * FROM ARMS.HRMS_Employee














