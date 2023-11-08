using System.ComponentModel.DataAnnotations;

namespace Entities.Models.Auth
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "You must enter a Username")]
        public string Username { get; set; }


        [Required(ErrorMessage = "You must enter a phone number")]
        [MinLength(12)]
        [MaxLength(12)]
        public string Phone { get; set; }


        [Required(ErrorMessage = "You must enter an email address")]
        [EmailAddress(ErrorMessage = "Email format is incorrect")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }


        [Required(ErrorMessage = "You must enter your age")]
        [Range(18, 150, ErrorMessage = "You must be of legal age to register")]
        public int Age { get; set; }


        [Required(ErrorMessage = "You must enter a country")]
        public string Country { get; set; }


        [Required(ErrorMessage = "You must enter a city")]
        public string City { get; set; }


        [Required(ErrorMessage = "Password must be entered")]
        [MinLength(6, ErrorMessage = "The minimum password length is 6 characters")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}