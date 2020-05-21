create table Employee (
createdAt datetime2(3) default (sysdatetime()),
modifiedAt datetime2(3) default (sysdatetime()),

employeeNo int identity(1000,1),
id  as 'CYG' + cast(employeeNo as varchar(100)) persisted primary key,

[name] varchar(300) not null,
designation varchar(300) check (Designation in ('Intern', 'Consultant 1', 'Consultant 2', 'Associate 1',
'Associate 2')) default 'Consultant 1' not null,

[role] varchar(255) check (Role in ('SuperUser', 'Admin', 'Employee')) default 'Employee',
email varchar(400) not null unique ,
profileImage varchar(255),

)

CREATE TRIGGER trg_UpdateEmployee
ON Employee
AFTER UPDATE
AS
    UPDATE Employee
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)
