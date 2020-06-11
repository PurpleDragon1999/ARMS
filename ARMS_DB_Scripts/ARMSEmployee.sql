CREATE TABLE [ARMS].[EmployeeRoles](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY,
	[Name] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[IsSystemRole] [bit] NOT NULL,
	[SystemName] [nvarchar](255) NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[RoleOrder] [int] NULL,
 )
 Drop table ARMS.EmployeeRoles 

GO
INSERT [ARMS].[EmployeeRoles] ([Name], [Active], [IsSystemRole], [SystemName], [DateCreated], [DateModified], [RoleOrder]) VALUES (N'SuperUser', 1, 1, N'SuperUser', CAST(N'2015-07-28T11:01:14.837' AS DateTime), CAST(N'2015-07-28T11:01:14.837' AS DateTime), 1)
GO
INSERT [ARMS].[EmployeeRoles] ([Name], [Active], [IsSystemRole], [SystemName], [DateCreated], [DateModified], [RoleOrder]) VALUES (N'Admin', 1, 1, N'Admin', CAST(N'2015-07-28T11:01:14.837' AS DateTime), CAST(N'2015-09-28T11:01:14.837' AS DateTime), 2)
GO
INSERT [ARMS].[EmployeeRoles] ([Name], [Active], [IsSystemRole], [SystemName], [DateCreated], [DateModified], [RoleOrder]) VALUES (N'Employee', 1, 1, N'Employee', CAST(N'2015-07-28T11:01:14.837' AS DateTime), CAST(N'2015-10-28T11:01:14.837' AS DateTime), 3)
Select * from ARMS.EmployeeRoles

update ARMS.EmployeeRoles set Name='SuperUser' 

Select ARMS.EmployeeRoles.Name from ARMS.EmployeeRoles INNER JOIN ARMS.Employees On ARMS.EmployeeRoles.SystemName=ARMS.Employees.SystemName

Select *from ARMS.EmployeeRoles INNER JOIN ARMS.Employees On ARMS.EmployeeRoles.SystemName=ARMS.Employees.SystemName

