IF OBJECT_ID('ARMS.Images') IS NULL
BEGIN
CREATE TABLE ARMS.Images(
id int identity(1,1) NOT NULL,
[imageBlobData] varbinary(MAX),
[employeeId] int NOT NULL,
constraint FK_Employee foreign key (employeeId) references ARMS.HRMS_Employee(id),
[createdAt] datetime2 default (sysdatetime()) not null,
[createdBy] varchar(255) not null,
[modifiedAt] datetime2 default (sysdatetime()) not null,
[modifiedBy] varchar(255) not null
constraint PK_Images primary key (id),
)
END
--trigger for update(new batch)
GO
CREATE TRIGGER trg_UpdateImage
ON ARMS.Images
AFTER UPDATE
AS
    UPDATE ARMS.Images
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)

--insert command
GO
INSERT into ARMS.Images(employeeId,createdBy,modifiedBy,imageBlobData)
SELECT '1','deepsy','deepsy', BulkColumn
 FROM OPENROWSET(Bulk 'C:\Users\kritika.sachdeva\Downloads\IMG-4740.jpg', SINGLE_BLOB) AS BLOB
 --select command
 SELECT * FROM ARMS.Images


