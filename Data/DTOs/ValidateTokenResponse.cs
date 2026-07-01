using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs
{
    public class ValidateTokenResponse
    {
        public bool IsValid { get; set; }
        public int? PlanId { get; set; }
        public AccessType? AccessType { get; set; }
    }
}
