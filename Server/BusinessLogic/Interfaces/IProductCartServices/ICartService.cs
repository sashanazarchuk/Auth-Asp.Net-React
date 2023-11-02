using Entities.Models.Enitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces.IProductCartServices
{
    public interface ICartService<T>
    {
        Task AddToCart(int productId);
        
        IEnumerable<T> GetCartItems(string userId);
        Task RemoveItem(int productId,string userId);
        Task ClearCart(string userId);
        decimal GetTotalPrice(string userId);
    }
}
