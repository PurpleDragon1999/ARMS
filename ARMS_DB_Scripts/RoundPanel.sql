create table Round_panel(
Round_Panel_Id int identity(1000,1) primary key,
Round_Id varchar(206),
constraint FK_Round_Panel foreign key (Round_Id)  references Round(Round_Id),

Panel_Member_Id varchar(103),
constraint FK_Panel_Member foreign key (Panel_Member_Id) references Employee(EmployeeId)

)

insert into Round_panel (Round_Id, Panel_Member_Id)
values ('CYGRID1009','CYG1001')

select * from Round_panel


