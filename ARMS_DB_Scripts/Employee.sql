create table Employee (
EmployeeNo int identity(1000,1),
EmployeeId  as 'CYG' + cast(EmployeeNo as varchar(100)) persisted primary key,

Name varchar(300) not null,
Designation varchar(300) check (Designation in ('Intern', 'Consultant 1', 'Consultant 2', 'Associate 1',
'Associate 2')) default 'Consultant 1' not null,

Role varchar(255) check (Role in ('SuperUser', 'Admin', 'Employee')) default 'Employee',
Email varchar(400) not null unique ,
ProfileImage varchar(8000),

)
