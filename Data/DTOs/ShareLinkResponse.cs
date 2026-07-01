using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs
{
    public class ShareLinkResponse
    {
        public string Token { get; set; }
        public string ShareUrl { get; set; }
        public AccessType AccessType { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
