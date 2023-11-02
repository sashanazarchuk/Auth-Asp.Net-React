using BusinessLogic.DTOs;
using Entities.Models.Auth;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces.AuthServices
{
    public interface IRegisterService
    {
        Task<IdentityResult> Register(RegisterViewModel model);
        string SearchUser(string username);
    }
}
