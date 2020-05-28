using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    public class InterviewController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}