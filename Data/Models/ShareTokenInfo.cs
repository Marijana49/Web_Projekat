using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    [DataContract]
    public class ShareTokenInfo
    {
        [DataMember]
        public string Token { get; set; }
        [DataMember]
        public int PlanId { get; set; }
        [DataMember]
        public AccessType AccessType { get; set; }
        [DataMember]
        public DateTime CreatedAt { get; set; }
        [DataMember]
        public DateTime ExpiresAt { get; set; }
        [DataMember]
        public bool IsRevoked { get; set; }

        public ShareTokenInfo() {}

        public ShareTokenInfo(string token, int planId, AccessType accessType, DateTime createdAt, DateTime expiresAt, bool isRevoked)
        {
            Token = token;
            PlanId = planId;
            AccessType = accessType;
            CreatedAt = createdAt;
            ExpiresAt = expiresAt;
            IsRevoked = isRevoked;
        }
    }
}
