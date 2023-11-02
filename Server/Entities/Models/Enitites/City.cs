using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models.Enitites
{
    public class City
    {
        [Key]
        public int CityId { get; set; }
        public string Name { get; set; }

        [ForeignKey("CountryId")]
        public int CountryId { get; set; }
        public Country Country { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
