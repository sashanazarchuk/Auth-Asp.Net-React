using BusinessLogic.Interfaces.AuthServices;
using Entities.Models.Enitites;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly IConfiguration configuration;
     
 

        public JwtTokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<string> CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("name", user.UserName),
                new Claim("id", user.Id)
            };
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<String>("JWTSecretKey")));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(10),
                claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}