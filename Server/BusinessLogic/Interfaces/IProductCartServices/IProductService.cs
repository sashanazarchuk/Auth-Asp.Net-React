using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces.ProductCartServices
{
    //Product service interface for retrieving products of a specific type using generics
    public interface IProductService<T>
    {
        Task<IEnumerable<T>> GetAllProduct();
        T GetById(int id);
        Task<IEnumerable<T>> Search(string search);

        Task<IEnumerable<T>> SortLtoH();
        Task<IEnumerable<T>> SortHtoL();
        Task<IEnumerable<T>> SortAtoZ();
        Task<IEnumerable<T>> SortZtoA();

        Task<IEnumerable<T>> FilterProduct(
        List<string> colors,
        List<string> brands,
        List<string> appointments,
        List<string> countries,
        List<string> genders,
        List<string> sizes);
    }
}
