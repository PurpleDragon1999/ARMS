create table Assessment(
createdAt datetime2(3) default (sysdatetime()),
modifiedAt datetime2(3) default (sysdatetime()),

asssessmentNumber int identity(1000,1),
id as 'CYGAID'+ cast(asssessmentNumber as varchar(100)) persisted primary key,

candidateEmail varchar(255) not null,

candidateAadhar varchar(255) not null,
constraint FK_Assessment_Candidate foreign key (candidateEmail, candidateAadhar) references Candidate(email, aadhar),

roundId varchar(206) not null,
constraint FK_Assessment_Round foreign key (roundId) references Round(id),

interviewer1 varchar(103) not null,
constraint FK_Assessment_Interviewer1 foreign key (interviewer1) references Employee(id),

interviewer2 varchar(103),
constraint FK_Assessment_Interviewer2 foreign key (interviewer2) references Employee(id),

overallRemarks varchar(255) not null,
roundResult bit check(RoundResult=0 OR RoundResult=1) not null,
)

CREATE TRIGGER trg_UpdateAssessment
ON Assessment
AFTER UPDATE
AS
    UPDATE Assessment
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)
