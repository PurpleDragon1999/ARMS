create table Criteria (
createdAt datetime2(3) default (sysdatetime()),
modifiedAt datetime2(3) default (sysdatetime()),
criteriaNumber int identity(1000,1),
id as 'CYGCID' + cast(criteriaNumber as varchar(200)) persisted primary key,
roundId varchar(206) not null,
constraint FK_Criteria_Round foreign key (roundId) references Round(id),
criteria varchar(500) not null,

marks int not null,
remarks varchar(200) not null
)

CREATE TRIGGER trg_UpdateCriteria
ON Criteria
AFTER UPDATE
AS
    UPDATE Criteria
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)
