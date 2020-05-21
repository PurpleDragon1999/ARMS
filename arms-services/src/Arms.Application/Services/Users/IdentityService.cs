using System;
using Microsoft.AspNetCore.Http;

namespace Arms.Application.Services.Users
{
    public class IdentityService: IIdentityService
    {
        private readonly IHttpContextAccessor _context;

        public IdentityService(IHttpContextAccessor context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        
        public Guid GetUserIdentity()
        {
            return Guid.Parse(_context.HttpContext.User.FindFirst("sub").Value);
        }

        public string GetUserName()
        {
            return _context.HttpContext.User.Identity.Name;
        }
    }
}