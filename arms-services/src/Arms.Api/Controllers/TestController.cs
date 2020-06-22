using Arms.Application.Services.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    public class TestController : ControllerBase
    {
        public TestController()
        {
        }

        [HttpGet]
        [Route("getData")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public string Index()
        {
            return "This is a test route.";
        }
    }
}