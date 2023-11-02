using AutoMapper;
using BusinessLogic.DTOs.AuthDTOs;
using BusinessLogic.Interfaces.AuthServices;
using Entities.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services.AuthServices
{
    public class LocationService : ILocationService
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;
        public LocationService(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;

        }
        public IEnumerable<CityDto> GetCity(int countryId)
        {
            var result = context.Cities.Where(city => city.CountryId == countryId).ToList();

            return mapper.Map<IEnumerable<CityDto>>(result);
        }

        public IEnumerable<CountryDto> GetCountry()
        {
            var result = context.Countries.ToList();
            return mapper.Map<IEnumerable<CountryDto>>(result);
        }
    }
}
