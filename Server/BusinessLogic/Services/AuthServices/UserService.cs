using AutoMapper;
using BusinessLogic.DTOs.AuthDTOs;
using BusinessLogic.Interfaces.AuthServices;
using Entities.Data;
using Entities.Models.Enitites;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services.AuthServices
{
    public class UserService : IUserService
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;
        public UserService(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public UserDto GetById(string id)
        {
            var result = context.Users.Include(u => u.Country).Include(u => u.City).FirstOrDefault(u => u.Id == id);

            if (result == null) return null;

            return mapper.Map<UserDto>(result);

        }


    }
}
