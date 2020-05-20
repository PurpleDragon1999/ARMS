create table Criteria (

Round_Criteria_Number int identity(1000,1),
Round_Criteria_Id as 'CYGCID' + cast(Round_Criteria_Number as varchar(200)) persisted primary key,

Round_Id varchar(206) not null,
constraint FK_Criteria_Round foreign key (Round_Id) references Round(Round_Id),
Criteria varchar(500) not null,

Marks int not null,
Remarks varchar(200) not null
)


