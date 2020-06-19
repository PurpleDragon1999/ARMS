using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
    public class BaseController: Controller
    {
        public BaseController()
        {
        }
    }
}
