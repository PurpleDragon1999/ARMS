create table Assessment(

Assessment_Number int identity(1000,1),
Assessment_Id as 'CYGAID'+ cast(Assessment_Number as varchar(100)) persisted primary key,

Candidate_Email varchar(255) not null,

Candidate_Aadhar varchar(255) not null,
constraint FK_Assessment_Candidate foreign key (Candidate_Email, Candidate_Aadhar) references Candidate(Email, Aadhar),

Round_Id varchar(206) not null,
constraint FK_Assessment_Round foreign key (Round_Id) references Round(Round_Id),

Interviewer1 varchar(103),
constraint FK_Assessment_Interviewer1 foreign key (Interviewer1) references Employee(EmployeeId),

Interviewer2 varchar(103),
constraint FK_Assessment_Interviewer2 foreign key (Interviewer2) references Employee(EmployeeId),

OverallRemarks varchar(255) not null,
RoundResult bit not null,
)

