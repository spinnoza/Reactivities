using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LoginDto
    {
         public string Email { get; set; } = null!;
        public string Password { get; set; }  = null!;
    }
}