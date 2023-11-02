using BusinessLogic.DTOs.AuthDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces.AuthServices
{
    public interface ILocationService
    {
        IEnumerable<CountryDto> GetCountry();
        IEnumerable<CityDto> GetCity(int countryId);
    }
}
