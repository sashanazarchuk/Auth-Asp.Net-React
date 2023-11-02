using BusinessLogic.Interfaces.IEmailService;
using Entities.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Security.Claims;

namespace Server.Controllers.EmailController
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService service;
        private readonly IHttpContextAccessor httpContext;
        public EmailController(IEmailService service, IHttpContextAccessor httpContext)
        {
            this.service = service;
            this.httpContext = httpContext;
        }


        [Authorize]  
        [HttpGet("Send-Email")]
        public async Task<IActionResult> SendCartItemsByEmail()
        {
            try
            {
                //We get the ID of the current user
                var userId = httpContext.HttpContext.User.FindFirst("id")?.Value;

                // Call the service method to send the letter
               await service.Send(userId);

                return Ok("Email sent successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Email sending failed: {ex.Message}");
            }
        }
    }
}
