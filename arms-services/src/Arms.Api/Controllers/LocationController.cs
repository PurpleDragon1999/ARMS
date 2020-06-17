using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arms.Application.Services.Users;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : BaseController
    {
        private readonly IIdentityService _identityService;
        ArmsDbContext _context;
        public LocationController(IIdentityService identityService, ArmsDbContext armsContext)
        {
            _identityService = identityService;
            _context = armsContext;
        }
        //GET:api/CriteriaType
        [HttpGet]
        public IActionResult GetLocations()
        {
            try
            {
                List<Loc> location = _context.Loc.ToList();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = location,
                        message = "Locations Retrieved Successfully"
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
        //GET:api/location/id
        [HttpGet("{id}")]

        public IActionResult GetLocation(int id)
        {

            try
            {
               Loc location = _context.Loc.
                    SingleOrDefault(c => c.id == id);



                if (location == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "This Location Does Not Exist"
                        }
                    };
                    return StatusCode(404, resNull);
                }
                else
                {

                    var response = new
                    {
                        success = true,
                        payload = new
                        {
                            data = location,
                            message = "Location Retrieved Successfully"
                        }

                    };
                    return StatusCode(200, response);
                }
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

        //POST:api/Location
        [HttpPost]
        public IActionResult CreateLocation(Location location)
        {
            try
            {
                Loc checkinDb = _context.Loc.SingleOrDefault(c => c.locationName == location.locationName);
                if (checkinDb != null)
                {
                    var resAlreadyExists = new
                    {
                        success = false,
                        payload = new
                        {
                            message = "Location with this Name already exists"
                        }

                    };
                    return StatusCode(400, resAlreadyExists);
                }
               Loc locationObj = new Loc
                {
                    locationName = location.locationName
                };
                _context.Loc.Add(locationObj);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = locationObj,
                        message = " Location Created Successfully"
                    }

                };
                return StatusCode(201, response);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetType().FullName);
                Console.WriteLine(ex.Message);
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
        //PUT:api/ location/id
        [HttpPut("{id}")]
        public IActionResult UpdateLocation(int id, Location location)
        {
            try
            {
               Loc loc = _context.Loc.SingleOrDefault(c => c.id == id);
                if (loc == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {

                            message = "This Location does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }

               loc.locationName = location.locationName;
               
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        data = loc,
                        message = " Location Updated Successfully"
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
        //DELETE:/api/Location/id
        [HttpDelete("{id}")]
        public IActionResult DeleteLocation(int id)
        {
            try
            {
                Loc loc = _context.Loc.SingleOrDefault(c => c.id == id);
                if (loc == null)
                {
                    var resNull = new
                    {
                        success = false,
                        payload = new
                        {

                            message = "This  Criteria Type does not exist"
                        }

                    };
                    return StatusCode(404, resNull);
                }
                _context.Loc.Remove(loc);
                _context.SaveChanges();
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        message = "Location Deleted Successfully"
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

    