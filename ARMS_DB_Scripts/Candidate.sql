USE arms_db
GO

SET QUOTED_IDENTIFIER ON
GO

if not exists (select * from sys.schemas where name = 'ARMS')
begin
	exec('create schema ARMS')
end

if OBJECT_ID('ARMS.Candidate') is null
begin 
	create table ARMS.Candidate
	(
		[id] int identity(1,1) ,
		[code] as 'CYGCDID'+ cast(id as nvarchar(50)) persisted,
		[name] nvarchar (50) not null,
		[email] nvarchar (50) not null,
		[phone] nvarchar (22) not null,
		[idProofTypeId] int not null,
		[identificationNo] nvarchar (50) unique not null,
		[createdAt] datetime2 not null default (sysdatetime()),
		[createdBy] nvarchar(50) not null,
		[modifiedAt] datetime2 not null default (sysdatetime()),
		[modifiedBy] nvarchar(50) not null,
		constraint PK_Candidate primary key (id),
		constraint FK_CandidateIdProofType foreign key (idProofTypeId) references ARMS.IdProofType(id)

	)
end

go

CREATE TRIGGER ARMS.trg_UpdateCandidate
ON ARMS.Candidate
AFTER UPDATE
AS
    UPDATE ARMS.Candidate
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)


insert into ARMS.Candidate(name, email, phone, idProofTypeId, identificationNo, createdBy, modifiedBy)
values ('chetna', 'nangchetnamaw@gmail.com','9207868601',1,'8907 4567 3637', 'anna', 'anna')

update ARMS.Candidate set phone = '8575249081' where [name] = 'chetna'

select * from ARMS.Candidate


