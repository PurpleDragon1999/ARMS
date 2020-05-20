create table Interview (
Interview_Number int identity(1000,1),
Interview_Id as 'CYGIID' + cast(Interview_Number as varchar(100)) persisted primary key,
Date date not null,
Time time not null,
Venue varchar(255) not null,
NoOfRounds int not null,
JD_Id varchar(8000) not null,
constraint FK_Interview foreign key (JD_Id) references JobDescription(JD_Id),

)
