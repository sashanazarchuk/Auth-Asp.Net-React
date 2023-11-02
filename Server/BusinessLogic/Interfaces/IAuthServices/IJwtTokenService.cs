using Entities.Models.Enitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces.AuthServices
{
    public interface IJwtTokenService
    {
        Task<string> CreateToken(User user);

    }
}
