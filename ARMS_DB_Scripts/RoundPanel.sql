create table RoundPanel(
createdAt datetime2(3) default (sysdatetime()),
modifiedAt datetime2(3) default (sysdatetime()),
id int identity(1000,1) primary key,
roundId varchar(206),
constraint FK_Round_Panel foreign key (roundId)  references Round(id),

panelMemberID varchar(103),
constraint FK_Panel_Member foreign key (panelMemberID) references Employee(id)

)

CREATE TRIGGER trg_UpdateRoundPanel
ON RoundPanel
AFTER UPDATE
AS
    UPDATE RoundPanel
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)
