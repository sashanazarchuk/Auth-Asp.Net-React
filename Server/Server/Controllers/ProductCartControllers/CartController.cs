using BusinessLogic.Interfaces.IProductCartServices;
using Entities.Models.Enitites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers.ProductCartControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService<CartItem> service;
        private readonly IHttpContextAccessor httpContext;
        public CartController(ICartService<CartItem> service, IHttpContextAccessor httpContext)
        {
            this.service = service;
            this.httpContext = httpContext;
        }



        [Authorize]
        [HttpPost("AddToCart/{id}")]
        public async Task<IActionResult> AddToCart([FromRoute] int id)
        {
            try
            {
                await service.AddToCart(id);

                return Ok();
            }
            catch (Exception)
            {
                string errorMessage = "Error adding product to cart";
                return BadRequest(errorMessage);
            }
        }



        [Authorize]
        [HttpDelete("ClearCart")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = httpContext.HttpContext.User.FindFirst("id")?.Value;
            if (userId != null)
            {
                try
                {
                    await service.ClearCart(userId);
                    return Ok();
                }
                catch (Exception)
                {
                    string errorMessage = "Error clearing the cart";
                    return BadRequest(errorMessage);
                }
            }
            return BadRequest("User not found");
        }



        [Authorize]
        [HttpGet("GetCarts")]
        public IActionResult GetCarts()
        {
            var userId = httpContext.HttpContext.User.FindFirst("id")?.Value;
            if (userId != null)
            {
                try
                {
                    return Ok(service.GetCartItems(userId));

                }
                catch (Exception)
                {
                    string errorMessage = "Error showing the cart list";
                    return BadRequest(errorMessage);
                }
            }
            return BadRequest("User not found");
        }



        [Authorize]
        [HttpGet("GetTotal")]
        public IActionResult GetTotalPrice()
        {
            var userId = httpContext.HttpContext.User.FindFirst("id")?.Value;
            if (userId != null)
            {
                try
                {
                    return Ok(service.GetTotalPrice(userId));
                }
                catch (Exception)
                {
                    string errorMessage = "Error showing the total price";
                    return BadRequest(errorMessage);
                }
            }
            return BadRequest("User not found");
        }


        [Authorize]
        [HttpDelete("RemoveItem/{productId}")]
        public async Task<IActionResult> GetRemoveItem([FromRoute] int productId)
        {
            var userId = httpContext.HttpContext.User.FindFirst("id")?.Value;
            if (userId != null)
            {
                try
                {
                    await service.RemoveItem(productId, userId);
                    return Ok();
                }
                catch (Exception)
                {
                    string errorMessage = "Error removing item from the cart";
                    return BadRequest(errorMessage);
                }
            }
            return BadRequest("User not found");
        }
    }
}
