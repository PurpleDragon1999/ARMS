IF OBJECT_ID('HRMS.ArmsEmployees') IS NULL
BEGIN

CREATE TABLE [HRMS].[ArmsEmployees](
	[Id] [int] IDENTITY(1,1) primary key,
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
	[SystemName] [nvarchar](max) NULL,
	[LastIpAddress] [nvarchar](max) NULL,
	[LastLoginDateUtc] [datetime] NULL,
	[LastActivityDateUtc] [datetime] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[ProfileImage] [nvarchar](max) NULL,
	[IsAllowLogin] [bit] NOT NULL,
	[EmployeeDetailId] [int] NULL,
	[PasswordResetRequired] [bit] NOT NULL,
	[Location] [int] NOT NULL,
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
	[CreatedBy] [int] NULL,
	[ModifiedBy] [int] NULL,
	[PreviousDesignationId] [int] NULL,
	[IntacctId] [varchar](20) NULL
)

END
INSERT [HRMS].[ARMSEmployees] ( [SpringAheadId], [DivisionId], [UserGuid], [Initials], [FirstName], [LastName], [Username], [Email], [Password], [PasswordFormatId], [PasswordSalt], [AdminComment], [Active], [IsSystemAccount], [SystemName], [LastIpAddress], [LastLoginDateUtc], [LastActivityDateUtc], [Deleted], [ProfileImage], [IsAllowLogin], [EmployeeDetailId], [PasswordResetRequired], [Location], [DateCreated], [DateModified], [Experience], [VisaTypeId], [DesignationId], [ResumeFileName], [OffshoreResources], [NickName], [HireDate], [RelevantExperience], [VisibilityRMCallender], [CreatedBy], [ModifiedBy], [PreviousDesignationId], [IntacctId]) VALUES ( 475803, 5, N'396bca16-c4be-4cb7-a287-ac0c9c7f298f', NULL, N'Deepanshu', N'Balani', N'deepanshu.balani@cygrp.com', N'deepanshu.balani@cygrp.com', N'6B668EC352E39F4EE061AD696D4C0E1BA62237EA', 1, N'22YPB2c=', NULL, 0, 0, 'CYG363', N'182.75.129.194', CAST(N'2017-04-20T09:57:38.083' AS DateTime), CAST(N'2017-04-20T09:57:38.397' AS DateTime), 0, NULL, 1, 1906, 1, 3, CAST(N'2015-06-29T09:57:34.000' AS DateTime), CAST(N'2018-03-13T08:31:09.940' AS DateTime), NULL, NULL, 166, NULL, 0, N'Deepanshu', CAST(N'2014-12-26' AS Date), CAST(60.00 AS Decimal(8, 2)), 0, NULL, 2771, NULL, NULL)

Select *From HRMS.ARMSemployeeRoles

INSERT [HRMS].[ArmsEmployeeRoles] ([Name], [Active], [IsSystemRole], [SystemName], [DateCreated], [DateModified], [RoleOrder]) VALUES ( N'admin', 1, 1, N'CYG363', CAST(N'2016-05-10T04:42:20.903' AS DateTime), CAST(N'2016-05-10T04:42:20.903' AS DateTime), 7)
