using BusinessLogic.DTOs.ProductCartDTOs;
using BusinessLogic.Interfaces.IProductCartServices;
using Entities.Data;
using Entities.Models.Enitites;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Server.Services
{
    public class CartService : ICartService<CartItem>
    {
        private readonly AppDbContext context;
        private readonly IHttpContextAccessor httpContext;



        public CartService(AppDbContext context, IHttpContextAccessor httpContext)
        {
            this.context = context;
            this.httpContext = httpContext;
        }

        public async Task AddToCart(int productId)
        {
            // Get the user's ID from the HTTP context
            var userId = httpContext.HttpContext.User.FindFirst("id")?.Value;

            if (userId != null)
            {
                // Check if the product is already in the user's cart
                var cartItem = await context.CartItem
                    .SingleOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

                if (cartItem == null)
                {
                    // If the product is not in the cart, create a new cart item
                    cartItem = new CartItem
                    {
                        UserId = userId,
                        ProductId = productId,
                        Product = context.Products.SingleOrDefault(p => p.ProductId == productId),
                        Quantity = 1
                    };
                    await context.CartItem.AddAsync(cartItem);
                }
                else
                {
                    // If the product is already in the cart, increment the quantity
                    cartItem.Quantity++;
                }
                // Save changes to the database
                await context.SaveChangesAsync();
            }
        }

        public async Task ClearCart(string userId)
        {
            // Get all cart items associated with the user
            var cartItem = await context.CartItem.Where(u => u.UserId == userId).ToListAsync();
            
            // Remove all cart items
            context.CartItem.RemoveRange(cartItem);
            
            // Save changes to the database
            await context.SaveChangesAsync();
        }

        public IEnumerable<CartItem> GetCartItems(string userId)
        {
            // Retrieve all cart items for the user, including product details
            return context.CartItem.Include(c => c.Product).Where(c => c.UserId == userId).ToList();
        }


        public decimal GetTotalPrice(string userId)
        {
            // Calculate the total price of items in the user's cart
            decimal total = context.CartItem
                .Where(cart => cart.UserId == userId)
                .Sum(cart => cart.Quantity * cart.Product.Price);

            return total;
        }

        public async Task RemoveItem(int productId, string userId)
        {
            // Find the cart item associated with the user and product
            var cartItem = await context.CartItem.SingleOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (cartItem != null)
            {
                // Remove the cart item
                context.CartItem.Remove(cartItem);

                // Save changes to the database
                await context.SaveChangesAsync();
            }
        }
    }
}