if not exists (select * from sys.schemas where name = 'ARMS')
begin
	exec('create schema ARMS')
end

if OBJECT_ID('ARMS.IdProofType') is null
begin 
	create table ARMS.IdProofType
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

CREATE TRIGGER ARMS.trg_IdProofType
ON ARMS.IdProofType
AFTER UPDATE
AS
    UPDATE ARMS.IdProofType
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)



insert into ARMS.IdProofType ([name], createdBy, modifiedBy) 
values ('social security number', 'anna', 'anna')

update ARMS.IdProofType set [name]='PAN card' where id=1

select * from ARMS.IdProofType
