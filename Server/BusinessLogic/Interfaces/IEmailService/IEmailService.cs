 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces.IEmailService
{
    public interface IEmailService
    {
        Task Send(string userId);
    }
}
