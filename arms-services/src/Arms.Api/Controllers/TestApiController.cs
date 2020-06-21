using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    public class TestApiController
    {
        ArmsDbContext _context;
        public TestApiController(ArmsDbContext armsContext)
        {
            _context = armsContext;
        }

        [HttpGet]
        [Route("Data")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public string Index()
        {
            return "This is a test route.";
        }
    }
}
