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

insert into Interview (Date, Time, Venue,NoOfRounds, JD_Id)
values ('2020-05-22','4:15:00', 'Noida',6,'CYGJID1003')

select * from Interview