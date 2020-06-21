using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;

namespace Hrms.Web
{
    public class WebHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public WebHelper(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
    }
}