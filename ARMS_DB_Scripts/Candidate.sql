create table Candidate (
Email varchar(255) not null unique,

Aadhar varchar(255) not null unique,
constraint PK_Candidate primary key (Email, Aadhar),

[Name] nvarchar(255) not null,
Experience decimal(18,1) default 0,

Cv nvarchar(500) not null,
Selected bit check(Selected=0 OR Selected=1),

[Status] varchar(200) check (Status in ('AppliedSuccessfully', 'InterviewScheduled', 'InProgress', 'ResultDeclared' )) default 'AppliedSuccessfully',
CurrentRoundNumber int ,
Flag int check(Flag in (1,2,3,4)) default 1,

AppliedFor varchar(8000) not null,
constraint FK_Candidate foreign key (AppliedFor) references JobDescriptions(JD_Id),

Shortlisted bit check(Shortlisted=0 OR Shortlisted=1)

)

insert into Candidate (Email, Aadhar, [Name], Cv, AppliedFor)
values ('abc@gmail.com','7777 7777 7777', 'Shivani','dcuments/Cv','CYGJID1000')

delete from Candidate where Email='abc@gmail.com'


select * from Candidate