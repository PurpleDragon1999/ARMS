create table Round(
createdAt datetime2(3) default (sysdatetime()),
modifiedAt datetime2(3) default (sysdatetime()),
roundNo int identity(1000,1) ,
id as 'CYGRID' + cast(roundNo as varchar(200)) persisted primary key,

interviewId varchar(106) not null,
constraint FK_Round_Interview foreign key (interviewId) references Interview(id) ,

roundType varchar(200) not null,
[time] time not null,

roundNumber int not null,

)

CREATE TRIGGER trg_UpdateRound
ON Round
AFTER UPDATE
AS
    UPDATE Round
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)


