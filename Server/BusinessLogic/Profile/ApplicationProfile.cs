using BusinessLogic.DTOs.AuthDTOs;
using BusinessLogic.DTOs.ProductCartDTOs;
using Entities.Data;
using Entities.Models.Enitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Profile
{
    public class ApplicationProfile : AutoMapper.Profile
    {
        //private readonly AppDbContext context;
        public ApplicationProfile()
        {
            CreateMap<User, UserDto>()
             .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Country.Name))
             .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City.Name));

            CreateMap<City, CityDto>();
            CreateMap<CityDto, City>();

            CreateMap<Country, CountryDto>();
            CreateMap<CountryDto, Country>();

            //configured product mapping
            CreateMap<Product, ProductDto>().ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Country.Name));
            CreateMap<ProductDto, Product>();
            
           
        }
    }
}
