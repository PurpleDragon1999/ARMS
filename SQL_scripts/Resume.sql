

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

CREATE TRIGGER trg_UpdateResume
ON arms.Resume
AFTER UPDATE
AS
    UPDATE arms.Resume
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

select * from arms.Resume
GO
Insert into ARMS.Resume(name,  applicationId, createdBy, modifiedBy,cv)
SELECT  'file',  1, 'anna', 'anna', BulkColumn
 FROM OPENROWSET(Bulk 'C:\Users\deepanshu.balani\Pictures\anal2.jpg', SINGLE_BLOB) AS BLOB
 

update arms.Resume 
set name= 'resume'
where id= 1
