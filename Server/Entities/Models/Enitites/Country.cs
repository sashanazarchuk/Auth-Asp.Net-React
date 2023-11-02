using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models.Enitites
{
    public class Country
    {
        [Key]
        public int CountryId { get; set; }
        public string Name { get; set; }

        public ICollection<User> Users { get; set; }

        public ICollection<City> Cities { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
