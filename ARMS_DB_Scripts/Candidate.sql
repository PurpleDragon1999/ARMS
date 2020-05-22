create table Candidate (
createdAt datetime2(3) default (sysdatetime()),
modifiedAt datetime2(3) default (sysdatetime()),
email varchar(255) not null unique,

aadhar varchar(255) not null unique,
constraint PK_Candidate primary key (email, aadhar),

[name] nvarchar(255) not null,
experience decimal(18,1) default 0,

cv nvarchar(500) not null,
selected bit check(selected=0 OR selected=1),

[status] varchar(200) check (Status in ('AppliedSuccessfully', 'InterviewScheduled', 'InProgress', 'ResultDeclared' )) default 'AppliedSuccessfully',
currentRoundNumber int ,
flag int check(flag in (1,2,3,4)) default 1,

appliedFor varchar(106) not null,
constraint FK_Candidate foreign key (appliedFor) references JobDescription(id),

shortlisted bit check(shortlisted=0 OR shortlisted=1)

)

CREATE TRIGGER trg_UpdateCandidate
ON Candidate
AFTER UPDATE
AS
    UPDATE Candidate
    SET modifiedAt  = sysdatetime()
    WHERE email IN (SELECT DISTINCT email FROM Inserted)

