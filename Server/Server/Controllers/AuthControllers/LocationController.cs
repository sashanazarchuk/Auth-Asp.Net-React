using BusinessLogic.Interfaces.AuthServices;
using Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers.AuthControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService service;


        public LocationController(ILocationService service)
        {
            this.service = service;
        }

        [HttpGet("Countries")]
        public IActionResult GetCountries()
        {
            var result = service.GetCountry();
            return Ok(result);
        }


        [HttpGet("Cities")]
        public IActionResult GetCities([FromQuery] int countryId)
        {
            var result = service.GetCity(countryId);
            return Ok(result);
        }
    }
}
