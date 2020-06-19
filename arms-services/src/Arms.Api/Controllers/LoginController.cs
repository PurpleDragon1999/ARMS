//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;
//using Arms.Application.Services.Users;
//using Arms.Domain.CustomEntities;
//using Arms.Domain.Entities;
//using Arms.Infrastructure;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;

//namespace Arms.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LoginController : BaseController
//    {

//        private IConfiguration _config;
//        ArmsDbContext _context;

//        public LoginController(IConfiguration config, ArmsDbContext armsContext)
//        {
//            _config = config;
//            _context = armsContext;
//        }
//        [AllowAnonymous]
//        [HttpPost]
//        public IActionResult Login([FromBody]LoginReq login)
//        {
//            try
//            {
//               CustomEmployee empObj  = AuthenticateUser(login);

//                if (empObj != null)
//                {
//                    var tokenString = GenerateJSONWebToken(empObj);
//                    var response = new
//                    {
//                        success = "true",
//                        payload = new
//                        {
//                            Authorized = tokenString,
//                            message = "This Employee Exists in our Db"
//                        }

//                    };
//                    return StatusCode(200, response);
//                }


//                else
//                {

//                    var response = new
//                    {
//                        success = "true",
//                        payload = new
//                        {

//                            message = "This Employee does not Exists in our Db"
//                        }

//                    };

//                    return StatusCode(404, response);
//                }
//            }
//            catch (Exception ex)
//            {
//                var response = new
//                {
//                    success = "false",
//                    payload = new
//                    {
//                        message = ex.Message
//                    }
//                };
//                return StatusCode(500, response);
//            }
//        }
//        //This function generates Jwt token by adding claims
//            private string GenerateJSONWebToken(CustomEmployee empObj)
//            {
//              var claims = new[] {

//               new Claim(JwtRegisteredClaimNames.Email, empObj.armsEmployee.Email),
                
//                   new Claim("role", empObj.armsEmployeeRole.Name),
//                   new Claim("experience", empObj.armsEmployee.Experience.ToString()),
//                   new Claim("firstName", empObj.armsEmployee.FirstName),
//                   new Claim("lastName", empObj.armsEmployee.LastName),
//                      new Claim("userName", empObj.armsEmployee.LastName),
//                   new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
//            };
//            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

//                var token = new JwtSecurityToken(_config["Jwt:Issuer"],
//                  _config["Jwt:Issuer"],
//                  claims,
//                  expires: DateTime.Now.AddSeconds(86400),
//                  signingCredentials: credentials);

//                return new JwtSecurityTokenHandler().WriteToken(token);
//            }
//        //This function authenticates the credentials that are valid as per our db or not
//            private CustomEmployee AuthenticateUser(LoginReq login)
//            {
//              Console.WriteLine(login.idToken);
                
//            var handler = new JwtSecurityTokenHandler();

//            var jsonToken = handler.ReadToken(login.idToken) as JwtSecurityToken;
//            var email = jsonToken.Payload["email"].ToString();
            
//           ArmsEmployees employee = _context.ArmsEmployees.FirstOrDefault(c => c.Email == email);
           
//           ArmsEmployeeRoles armsEmployeeRole = _context.ArmsEmployeeRoles.FirstOrDefault(c=>c.SystemName==employee.SystemName);
//            CustomEmployee employeeObj = new CustomEmployee
//            {
//                armsEmployee=employee,
//                armsEmployeeRole=armsEmployeeRole
//            };
//            return employeeObj;
            

//        }

//        }
//    }

