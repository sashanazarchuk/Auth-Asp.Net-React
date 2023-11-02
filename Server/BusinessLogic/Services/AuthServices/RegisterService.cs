using BusinessLogic.Interfaces.AuthServices;
using Entities.Data;
using Entities.Models.Auth;
using Entities.Models.Enitites;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services.AuthServices
{
    public class RegisterService : IRegisterService
    {
        private readonly AppDbContext context;
        private readonly UserManager<User> userManager;

        public RegisterService(AppDbContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;


        }
        public async Task<IdentityResult> Register(RegisterViewModel model)
        {
            Country country = await context.Countries.FirstOrDefaultAsync(x => x.Name == model.Country);
            City city = await context.Cities.FirstOrDefaultAsync(x => x.Name == model.City && x.CountryId == country.CountryId);

            var user = new User()
            {
                UserName = model.Username,
                Email = model.Email,
                Age = model.Age,
                Phone = model.Phone,
                Password = model.Password,
                CityId = city.CityId,
                City = city,
                CountryId = country.CountryId,
                Country = country
            };

            var result = await userManager.CreateAsync(user, model.Password);

            return result;
        }

        public string SearchUser(string username)
        {
            var result = context.Users.FirstOrDefault(u => u.UserName == username || u.Email == username);
            if (result == null) return "";
            return "User exists";

        }


    }
}
