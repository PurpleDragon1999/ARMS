create table Interview (
createdAt datetime2(3) default (sysdatetime()),
modifiedAt datetime2(3) default (sysdatetime()),
interviewNumber int identity(1000,1),
id as 'CYGIID' + cast(interviewNumber as varchar(100)) persisted primary key,
[date] date not null,
[time] time not null,
[venue] varchar(255) not null,
[noOfRounds] int not null,
jobDescriptionId varchar(106) not null,
constraint FK_Interview foreign key (jobDescriptionId) references JobDescription(id),

)

CREATE TRIGGER trg_UpdateInterview
ON Interview
AFTER UPDATE
AS
    UPDATE Interview
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)
