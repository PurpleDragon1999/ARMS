create table JobDescription (
JD_Number int identity(1000,1) ,
JD_Id as 'CYGJID' + cast(JD_Number as varchar(8000)) persisted primary key ,
Title varchar(255) unique not null ,
OpeningDate date not null ,
ClosingDate date not null,
Vacancies int ,
Salary bigint not null,
Skills varchar(500) ,
[Location] varchar(255) not null ,
[Description] varchar(1500) not null

)

insert into JobDescription (Title, OpeningDate, ClosingDate,salary, [Location], [Description])
values ('Software Developer Junior 1','2020-05-22', '2020-05-31',6,'Noida','Require logical skills')

select * from JobDescription
