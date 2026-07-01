using Data.Enums;
using Data.Models;

namespace SharingService.Services.Interface
{
    public interface IShareLinkService
    {
        Task<ShareTokenInfo> CreateShareLinkAsync(int planId, AccessType accessType, int expiresInDays);
        Task<ShareTokenInfo> ValidateTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
    }
}
