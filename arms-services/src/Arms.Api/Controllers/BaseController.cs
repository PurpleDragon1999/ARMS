using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ControllerBase: Controller
    {
        public ControllerBase()
        {
        }
    }
}
