using Arms.Application.Services.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{    
    public class TestController: BaseController
    {
        private readonly IIdentityService _identityService;

        public TestController(IIdentityService identityService)
        {
           _identityService = identityService;
        }

        [HttpGet]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public string Index()
        {
            return "Test";
        }
    }
}