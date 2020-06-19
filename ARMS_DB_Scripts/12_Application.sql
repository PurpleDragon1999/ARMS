if not exists (select * from sys.schemas where name = 'ARMS')
begin
	exec('create schema ARMS')
end

if OBJECT_ID('ARMS.Application') is null
begin 
	create table ARMS.Application
	(
		[id] int identity(1,1),
		[code] as 'CYGAPID'+ cast(id as nvarchar(50)) persisted, 
		[dateOfApplication] datetime2 not null,
		[education] nvarchar(500) not null,
		[experience] nvarchar(50) null default 0,
		[statusChangedAt] datetime2 not null, 
		[candidateId] int not null,
		[jobId] int not null,
		[applicationStatusTypeId] int not null,
		[createdAt] datetime2 not null default (sysdatetime()),
		[createdBy] nvarchar(50) not null,
		[modifiedAt] datetime2 not null default (sysdatetime()),
		[modifiedBy] nvarchar(50) not null,
		constraint PK_Application primary key (id),
		constraint FK_ApplicationCandidate foreign key (candidateId) references arms.Candidate(id),
		constraint FK_ApplicationJob foreign key (jobId) references arms.JobDescription(id),
		constraint FK_ApplicationStatusTypeId foreign key (applicationStatusTypeId) references arms.ApplicationStatusType(id)
	)
end

GO

CREATE TRIGGER ARMS.trg_UpdateApplication
ON ARMS.Application
AFTER UPDATE
AS
    UPDATE ARMS.Application
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

insert into ARMS.Application(dateOfApplication, education, experience, statusChangedAt, candidateId, jobId,
applicationStatusTypeId, createdBy, modifiedBy)
values ('2020-05-19', 'Downtown University', '1','2020-05-19', 1, 1, 2, 'anna', 'anna')

update ARMS.Application
set education = 'Northill University'
where id= 1

select * from ARMS.Application

GO
ALTER TABLE ARMS.application
ADD CONSTRAINT df_statusChangedAt
DEFAULT (sysdatetime()) FOR statusChangedAt;

GO
ALTER TABLE ARMS.application
ADD CONSTRAINT df_dateOfApplication
DEFAULT (sysdatetime()) FOR dateOfApplication;

