CREATE TABLE [ARMS].[Employees](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY,
	[SpringAheadId] [int] NULL,
	[DivisionId] [int] NULL,
	[UserGuid] [uniqueidentifier] NOT NULL,
	[Initials] [nvarchar](max) NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[Username] [nvarchar](1000) NULL,
	[Email] [nvarchar](1000) NULL,
	[Password] [nvarchar](max) NULL,
	[PasswordFormatId] [int] NOT NULL,
	[PasswordSalt] [nvarchar](max) NULL,
	[AdminComment] [nvarchar](max) NULL,
	[Active] [bit] NOT NULL,
	[IsSystemAccount] [bit] NOT NULL,
	[SystemName] [nvarchar](max) NOT NULL,
	[LastIpAddress] [nvarchar](max) NULL,
	[LastLoginDateUtc] [datetime] NULL,
	[LastActivityDateUtc] [datetime] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[ProfileImage] [nvarchar](max) NULL,
	[IsAllowLogin] [bit] NOT NULL,
	[EmployeeDetailId] [int] NULL,
	[PasswordResetRequired] [bit] NOT NULL,
	[Location] [int] NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[Experience] [decimal](8, 2) NULL,
	[VisaTypeId] [int] NULL,
	[DesignationId] [int] NULL,
	[ResumeFileName] [nvarchar](500) NULL,
	[OffshoreResources] [bit] NULL,
	[NickName] [nvarchar](max) NULL,
	[HireDate] [date] NULL,
	[RelevantExperience] [decimal](8, 2) NULL,
	[VisibilityRMCallender] [bit] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[PreviousDesignationId] [int] NULL,
	[IntacctId] [varchar](20) NULL,
	)

	 Drop table ARMS.Employees
GO
INSERT [ARMS].[Employees] ([SpringAheadId], [DivisionId], [UserGuid], [Initials], [FirstName], [LastName], [Username], [Email], [Password], [PasswordFormatId], [PasswordSalt], [AdminComment], [Active], [IsSystemAccount], [SystemName], [LastIpAddress], [LastLoginDateUtc], [LastActivityDateUtc], [Deleted], [ProfileImage], [IsAllowLogin], [EmployeeDetailId], [PasswordResetRequired], [Location], [DateCreated], [DateModified], [Experience], [VisaTypeId], [DesignationId], [ResumeFileName], [OffshoreResources], [NickName], [HireDate], [RelevantExperience], [VisibilityRMCallender], [CreatedBy], [ModifiedBy], [PreviousDesignationId], [IntacctId]) VALUES (NULL, 1, N'15df7822-4b96-46ba-9228-76cdd3f47e01', NULL, N'Anchal', N'Hora', N'horaanc', N'horaanc@cygrp.com', N'6B668EC352E39F4EE061AD696D4C0E1BA62237EA', 1, N'22YPB2c=', NULL, 1, 1, 'SuperUser', N'64.233.173.1', CAST(N'2017-11-13T16:57:53.310' AS DateTime), CAST(N'2017-11-13T16:57:54.000' AS DateTime), 0, NULL, 1, NULL, 0, 4, CAST(N'2015-07-28T07:35:06.663' AS DateTime), CAST(N'2017-11-13T16:57:54.173' AS DateTime), CAST(1.00 AS Decimal(8, 2)), NULL, NULL, N'Super_User.docx', 0, N'Super', NULL, NULL, 0, NULL, NULL, NULL, NULL)
GO
INSERT [ARMS].[Employees] ([SpringAheadId], [DivisionId], [UserGuid], [Initials], [FirstName], [LastName], [Username], [Email], [Password], [PasswordFormatId], [PasswordSalt], [AdminComment], [Active], [IsSystemAccount], [SystemName], [LastIpAddress], [LastLoginDateUtc], [LastActivityDateUtc], [Deleted], [ProfileImage], [IsAllowLogin], [EmployeeDetailId], [PasswordResetRequired], [Location], [DateCreated], [DateModified], [Experience], [VisaTypeId], [DesignationId], [ResumeFileName], [OffshoreResources], [NickName], [HireDate], [RelevantExperience], [VisibilityRMCallender], [CreatedBy], [ModifiedBy], [PreviousDesignationId], [IntacctId]) VALUES (NULL, 2, N'15df7822-4b96-46ba-9228-76cdd3f47e01', NULL, N'Anjali', N'Hora', N'horaanj', N'horaanj@cygrp.com', N'6B668EC352E39F4EE061AD696D4C0E1BA62237EA', 1, N'22YPB2c=', NULL, 1, 1, 'Employee', N'64.233.173.1', CAST(N'2017-11-13T16:57:53.310' AS DateTime), CAST(N'2017-11-13T16:57:54.000' AS DateTime), 0, NULL, 1, NULL, 0, 4, CAST(N'2015-09-28T07:35:06.663' AS DateTime), CAST(N'2017-11-13T16:57:54.173' AS DateTime), CAST(1.00 AS Decimal(8, 2)), NULL, NULL, N'Employee_1.docx', 0, N'Super', NULL, NULL, 0, NULL, NULL, NULL, NULL)
GO
INSERT [ARMS].[Employees] ([SpringAheadId], [DivisionId], [UserGuid], [Initials], [FirstName], [LastName], [Username], [Email], [Password], [PasswordFormatId], [PasswordSalt], [AdminComment], [Active], [IsSystemAccount], [SystemName], [LastIpAddress], [LastLoginDateUtc], [LastActivityDateUtc], [Deleted], [ProfileImage], [IsAllowLogin], [EmployeeDetailId], [PasswordResetRequired], [Location], [DateCreated], [DateModified], [Experience], [VisaTypeId], [DesignationId], [ResumeFileName], [OffshoreResources], [NickName], [HireDate], [RelevantExperience], [VisibilityRMCallender], [CreatedBy], [ModifiedBy], [PreviousDesignationId], [IntacctId]) VALUES (NULL, 3, N'15df7822-4b96-46ba-9228-76cdd3f47e01', NULL, N'Ankush', N'Hora', N'horaank', N'horaank@cygrp.com', N'6B668EC352E39F4EE061AD696D4C0E1BA62237EA', 1, N'22YPB2c=', NULL, 1, 1, 'Admin', N'64.233.173.1', CAST(N'2017-11-13T16:57:53.310' AS DateTime), CAST(N'2017-11-13T16:57:54.000' AS DateTime), 0, NULL, 1, NULL, 0, 4, CAST(N'2015-10-28T07:35:06.663' AS DateTime), CAST(N'2017-11-13T16:57:54.173' AS DateTime), CAST(1.00 AS Decimal(8, 2)), NULL, NULL, N'Admin.docx', 0, N'Super', NULL, NULL, 0, NULL, NULL, NULL, NULL)
GO
INSERT [ARMS].[Employees] ([SpringAheadId], [DivisionId], [UserGuid], [Initials], [FirstName], [LastName], [Username], [Email], [Password], [PasswordFormatId], [PasswordSalt], [AdminComment], [Active], [IsSystemAccount], [SystemName], [LastIpAddress], [LastLoginDateUtc], [LastActivityDateUtc], [Deleted], [ProfileImage], [IsAllowLogin], [EmployeeDetailId], [PasswordResetRequired], [Location], [DateCreated], [DateModified], [Experience], [VisaTypeId], [DesignationId], [ResumeFileName], [OffshoreResources], [NickName], [HireDate], [RelevantExperience], [VisibilityRMCallender], [CreatedBy], [ModifiedBy], [PreviousDesignationId], [IntacctId]) VALUES (NULL, 4, N'15df7822-4b96-46ba-9228-76cdd3f47e01', NULL, N'Raghav', N'Hora', N'horarag', N'horarag@cygrp.com', N'6B668EC352E39F4EE061AD696D4C0E1BA62237EA', 1, N'22YPB2c=', NULL, 1, 1, 'Employee', N'64.233.173.1', CAST(N'2017-11-13T16:57:53.310' AS DateTime), CAST(N'2017-11-13T16:57:54.000' AS DateTime), 0, NULL, 1, NULL, 0, 4, CAST(N'2015-10-28T07:35:06.663' AS DateTime), CAST(N'2017-11-13T16:57:54.173' AS DateTime), CAST(1.00 AS Decimal(8, 2)), NULL, NULL, N'Employee_2.docx', 0, N'Super', NULL, NULL, 0, NULL, NULL, NULL, NULL)

Select * from ARMS.Employees