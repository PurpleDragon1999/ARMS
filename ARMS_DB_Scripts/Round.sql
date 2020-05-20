create table Round(
Round_Number int identity(1000,1) ,
Round_Id as 'CYGRID' + cast(Round_Number as varchar(200)) persisted primary key,

Interview_Id varchar(106) not null,
constraint FK_Round_Interview foreign key (Interview_Id) references Interview(Interview_Id) ,

RoundType varchar(200) not null,
[Time] time not null,

RoundNumber int not null,

)

insert into Round (Interview_Id, RoundType,[Time], RoundNumber)
values ('CYGIID1000','Written','10:15', 6)

select * from Round