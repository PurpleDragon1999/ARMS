--RoundType Table creation
IF OBJECT_ID('ARMS.RoundType') IS NULL
BEGIN
CREATE TABLE ARMS.RoundType(
id  int identity(1,1) primary key,
[name] varchar(50),
[createdAt] datetime2  default (sysdatetime()) NOT NULL,
[modifiedAt] datetime2  default (sysdatetime()) NOT NULL,
[createdBy] varchar(50) NULL,
[modifiedBy] varchar(50) NULL
)
END
GO
--trigger
CREATE TRIGGER trg_updateRoundType
ON ARMS.RoundType
AFTER UPDATE
AS
    UPDATE ARMS.RoundType
    SET modifiedAt  = sysdatetime()
    WHERE id IN (SELECT DISTINCT id FROM Inserted)
	GO
--Insertions
Insert into ARMS.RoundType([name])
Values('Technical'),('HR'),('behavoiral')

--Select command
SELECT * FROM ARMS.RoundType