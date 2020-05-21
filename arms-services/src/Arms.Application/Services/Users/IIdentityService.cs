using System;

namespace Arms.Application.Services.Users
{
    public interface IIdentityService
    {
        Guid GetUserIdentity();
        string GetUserName();
    }
}