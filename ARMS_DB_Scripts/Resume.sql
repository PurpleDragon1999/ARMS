if not exists (select * from sys.schemas where name = 'arms')
begin
	exec('create schema arms')
end

if OBJECT_ID('arms.Resume') is null
begin 
	create table arms.Resume
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

CREATE TRIGGER arms.trg_UpdateResume
ON arms.Resume
AFTER UPDATE
AS
    UPDATE arms.Resume
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

select * from arms.Resume

insert into arms.Resume (name, cv, applicationId, createdBy, modifiedBy)
select 'file', BulkColumn, 1, 'anna', 'anna'
from openrowset (bulk 'C:\Users\chetna.mongmaw\Pictures\Saved Pictures\pexels-photo-3473492.jpeg', SINGLE_BLOB) AS BLOB

update arms.Resume 
set name= 'resume'
where id= 2
