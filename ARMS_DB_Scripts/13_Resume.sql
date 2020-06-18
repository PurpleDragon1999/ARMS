if not exists (select * from sys.schemas where name = 'ARMS')
begin
	exec('create schema ARMS')
end

if OBJECT_ID('ARMS.Resume') is null
begin 
	create table ARMS.Resume
	(
		[id] int identity(1,1),
		[name] nvarchar(50) not null,
		[cv] varBinary(MAX) not null,
		[applicationId] int not null,
		[createdAt] datetime2 not null default (sysdatetime()),
		[createdBy] nvarchar(50) not null,
		[modifiedAt] datetime2 not null default (sysdatetime()),
		[modifiedBy] nvarchar(50) not null,
		constraint PK_Resume primary key (id),
		constraint FK_ResumeApplication foreign key (applicationId) references arms.Application(id)
		
	)
end

GO

CREATE TRIGGER ARMS.trg_UpdateResume
ON ARMS.Resume
AFTER UPDATE
AS
    UPDATE ARMS.Resume
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

select * from ARMS.Resume

update ARMS.Resume 
set name= 'resume'
where id= 2

