if not exists (select * from sys.schemas where name = 'arms')
begin
	exec('create schema arms')
end

if OBJECT_ID('arms.IdProofType') is null
begin 
	create table arms.IdProofType
	(
		[id] int identity(1,1),
		[code] as 'CYGPFID'+ cast(id as nvarchar(50)) persisted,
		[name] varchar(50) not null,
		[createdAt] datetime2 not null default (sysdatetime()),
		[createdBy] nvarchar(50) not null,
		[modifiedAt] datetime2 not null default (sysdatetime()),
		[modifiedBy] nvarchar(50) not null,
		constraint PK_IdProofType primary key (id)
	)
end

GO

CREATE TRIGGER arms.trg_IdProofType
ON arms.IdProofType
AFTER UPDATE
AS
    UPDATE arms.IdProofType
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)


	GO
insert into arms.IdProofType ([name], createdBy, modifiedBy) 
values ('social security number', 'anna', 'anna')

update arms.IdProofType set [name]='PAN card' where id=1

select * from arms.IdProofType
