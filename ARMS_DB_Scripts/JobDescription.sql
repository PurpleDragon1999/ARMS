create table JobDescription (
createdAt datetime2(3) default (sysdatetime()),
modifiedAt datetime2(3) default (sysdatetime()),
jobdescriptionNumber int identity(1000,1) ,
id as 'CYGJID' + cast(jobdescriptionNumber as varchar(100)) persisted primary key ,
title varchar(255) unique not null ,
openingDate date not null ,
closingDate date not null,
vacancies int ,
salary bigint not null,
skills varchar(500) ,
[location] varchar(255) not null ,
[description] varchar(1500) not null

)

CREATE TRIGGER trg_UpdateJD
ON JobDescription
AFTER UPDATE
AS
    UPDATE JobDescription
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

insert into JobDescription (Title, OpeningDate, ClosingDate,salary, [Location], [Description])
values ('Software Developer Junior 1','2020-05-22', '2020-05-31',6,'Noida','Require logical skills')

select * from JobDescription
