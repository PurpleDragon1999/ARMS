IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name='HRMS')
BEGIN
EXEC('CREATE SCHEMA HRMS')
END
IF OBJECT_ID('HRMS.ArmsEmployeeRoles') IS NULL
BEGIN

CREATE TABLE [HRMS].[ArmsEmployeeRoles](
	[Id] [int] IDENTITY(1,1) primary key,
	[Name] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[IsSystemRole] [bit] NOT NULL,
	[SystemName] [nvarchar](255) NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[RoleOrder] [int] NULL
)
END
GO
INSERT [HRMS].[ArmsEmployeeRoles] ( [Name], [Active], [IsSystemRole], [SystemName], [DateCreated], [DateModified], [RoleOrder]) VALUES ( N'SuperAdministrator', 1, 1, N'SuperAdmin', CAST(N'2015-07-28T11:01:14.837' AS DateTime), CAST(N'2015-07-28T11:01:14.837' AS DateTime), 1)
GO
INSERT [HRMS].[ArmsEmployeeRoles] ( [Name], [Active], [IsSystemRole], [SystemName], [DateCreated], [DateModified], [RoleOrder]) VALUES ( N'ResourceManager', 1, 1, N'RM', CAST(N'2015-07-28T11:01:14.967' AS DateTime), CAST(N'2015-07-28T11:01:14.967' AS DateTime), 4)

Select * From HRMS.ArmsEmployeeRoles