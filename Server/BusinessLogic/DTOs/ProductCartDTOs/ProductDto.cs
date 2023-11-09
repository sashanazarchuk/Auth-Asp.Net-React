using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.ProductCartDTOs
{
    public class ProductDto
    {
        public int? ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal InitialPrice { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public string Image { get; set; }
        public string Brand { get; set; }
        public string Appointment { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public string Gender { get; set; }
        public string Country { get; set; }
        public int CountryId { get; set; }

    }
}
