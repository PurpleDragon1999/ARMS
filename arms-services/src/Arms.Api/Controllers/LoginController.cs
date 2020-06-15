using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Arms.Application.Services.Users;
using Arms.Domain.CustomEntities;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : BaseController
    {

        private IConfiguration _config;
        ArmsDbContext _context;

        public LoginController(IConfiguration config, ArmsDbContext armsContext)
        {
            _config = config;
            _context = armsContext;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]LoginReq login)
        {
            try
            {
                var employee = AuthenticateUser(login);

                if (employee != null)
                {
                    var tokenString = GenerateJSONWebToken(employee);
                    var response = new
                    {
                        success = "true",
                        payload = new
                        {
                            Authorized = tokenString,
                            message = "This Employee Exists in our Db"
                        }

                    };
                    return StatusCode(200, response);
                }


                else
                {

                    var response = new
                    {
                        success = "true",
                        payload = new
                        {

                            message = "This Employee does not Exists in our Db"
                        }

                    };

                    return StatusCode(404, response);
                }
            }
            catch (Exception ex)
            {
                var response = new
                {
                    success = "false",
                    payload = new
                    {
                        message = ex.InnerException.Message
                    }
                };
                return StatusCode(500, response);
            }
        }
        //This function generates Jwt token by adding claims
            private string GenerateJSONWebToken(HrmsEmployee emp)
            {
              var claims = new[] {

               new Claim(JwtRegisteredClaimNames.Email, emp.Email),
                
                 new Claim("role", emp.Role),
                  new Claim("designation", emp.Designation),
                   new Claim("code",emp.CygCode),
                   new Claim("name", emp.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  claims,
                  expires: DateTime.Now.AddSeconds(86400),
                  signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        //This function authenticates the credentials that are valid as per our db or not
            private HrmsEmployee AuthenticateUser(LoginReq login)
            {
              Console.WriteLine(login.idToken);
                
            var handler = new JwtSecurityTokenHandler();

            var jsonToken = handler.ReadToken(login.idToken) as JwtSecurityToken;
            var emailPayload = jsonToken.Payload.Values.ToList();
            var email = jsonToken.Payload["email"].ToString();

           HrmsEmployee employee = _context.Employee.FirstOrDefault(c => c.Email == email);
            return employee;
            

        }

        }
    }

