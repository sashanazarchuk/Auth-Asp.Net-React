using BusinessLogic.Interfaces.AuthServices;
using Contracts;
using Entities.Models.Auth;
using Entities.Models.Enitites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Server.Controllers.AuthControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILoggerManager logger;
        private readonly UserManager<User> userManager;
        private readonly IJwtTokenService service;
        private readonly IConfiguration configuration;

        public AuthController(ILoggerManager logger, UserManager<User> userManager, IJwtTokenService service)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.service = service;

        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            if (user != null)
            {
                var isPasswordValid = await userManager.CheckPasswordAsync(user, model.Password);

                if (!isPasswordValid)
                {
                    logger.LogWarn($"{nameof(Login)}: Authentication failed. Wrong user name or password.");
                    return BadRequest();
                }
                var token = await service.CreateToken(user);
                return Ok(new { token });
            }
            return BadRequest();
        }


        [HttpGet("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            HttpContext.Session.Clear();
            return Ok();
        }




    }

}