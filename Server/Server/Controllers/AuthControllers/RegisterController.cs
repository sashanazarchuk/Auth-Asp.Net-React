using BusinessLogic.Interfaces.AuthServices;
using Contracts;
using Entities.Models.Auth;
using Microsoft.AspNetCore.Mvc;


namespace Server.Controllers.AuthControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService service;
        private readonly ILoggerManager logger;
        public RegisterController(IRegisterService service, ILoggerManager logger)
        {
            this.service = service;
            this.logger = logger;
        }


        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            logger.LogInfo("Registering a new user...");

            var result = await service.Register(model);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                logger.LogWarn("Registration failed. Bad request.");
                return BadRequest(ModelState);
            }

            logger.LogInfo("Registration successful.");
            return StatusCode(201);

        }

        [HttpGet("Search")]
        public IActionResult SearchUser(string username)
        {
            var result = service.SearchUser(username);
            if (result == null)
            { return NotFound("User not found."); }

            return Ok(result);
        }
    }
}