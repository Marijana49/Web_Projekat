using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Data.Enums
{
    [DataContract]
    public enum AccessType
    {
        [EnumMember]
        View,
        [EnumMember]
        Edit
    }
}
