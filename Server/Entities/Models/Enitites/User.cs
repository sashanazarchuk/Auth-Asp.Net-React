using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models.Enitites
{
    public class User : IdentityUser
    {
        public int Age { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }



        [ForeignKey("CountryId")]
        public int CountryId { get; set; }
        public Country Country { get; set; }

        
        
        [ForeignKey("CityId")]
        public int CityId { get; set; }
        public City City { get; set; }

        public virtual ICollection<CartItem> CartItems { get; set; }

    }
}