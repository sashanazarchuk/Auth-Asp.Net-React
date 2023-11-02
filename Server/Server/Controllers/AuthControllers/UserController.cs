using BusinessLogic.Interfaces.AuthServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Server.Controllers.AuthControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService service;
        public UserController(IUserService service)
        {
            this.service = service;
        }


        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] string id)
        {
            var result = service.GetById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }


    }
}
