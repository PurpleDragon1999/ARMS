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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin,SuperAdministrator")]
    public class SkillController : BaseController
    {
        ArmsDbContext _context;
        public SkillController(ArmsDbContext armsContext)
        {
            _context = armsContext;
        }
        //GET:api/eligibilityCriteria
        [HttpGet]
        public IActionResult GetSkillsArray()
        {
            try
            {
                List<Skill> skills = _context.Skill.ToList();
                List<String> skillArray = new List<string>();
                foreach(Skill skillObj in skills)
                {
                    skillArray.Add(skillObj.skillName);
                }
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = skillArray,
                        message = "Skills Retrieved Successfully"
                    }

                };
                return StatusCode(200, response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = ex.Message
                    }

                };
                return StatusCode(500, response);
            }
        }
    }
}