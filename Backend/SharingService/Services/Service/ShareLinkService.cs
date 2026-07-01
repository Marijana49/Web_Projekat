using Data.Enums;
using Data.Models;
using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using SharingService.Services.Interface;

namespace SharingService.Services.Service
{
    public class ShareLinkService : IShareLinkService
    {
        private const string DictionaryName = "shareTokens";
        private readonly IReliableStateManager _stateManager;

        public ShareLinkService(IReliableStateManager stateManager)
        {
            _stateManager = stateManager;
        }

        public async Task<ShareTokenInfo> CreateShareLinkAsync(int planId, AccessType accessType, int expiresInDays)
        {
            var dictionary = await _stateManager.GetOrAddAsync<IReliableDictionary<string, ShareTokenInfo>>(DictionaryName);

            var info = new ShareTokenInfo
            {
                Token = Guid.NewGuid().ToString("N"),
                PlanId = planId,
                AccessType = accessType,
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(expiresInDays),
                IsRevoked = false
            };

            using (var tx = _stateManager.CreateTransaction())
            {
                await dictionary.AddAsync(tx, info.Token, info);
                await tx.CommitAsync();
            }

            return info;
        }

        public async Task<bool> RevokeTokenAsync(string token)
        {
            var dictionary = await _stateManager.GetOrAddAsync<IReliableDictionary<string, ShareTokenInfo>>(DictionaryName);

            using (var tx = _stateManager.CreateTransaction())
            {
                var result = await dictionary.TryGetValueAsync(tx, token);
                if (!result.HasValue) return false;

                var updated = result.Value;
                updated.IsRevoked = true;

                await dictionary.SetAsync(tx, token, updated);
                await tx.CommitAsync();
                return true;
            }
        }

        public async Task<ShareTokenInfo> ValidateTokenAsync(string token)
        {
           var dictionary = await _stateManager.GetOrAddAsync<IReliableDictionary<string, ShareTokenInfo>>(DictionaryName);

            using (var tx = _stateManager.CreateTransaction())
            {
                var result = await dictionary.TryGetValueAsync(tx, token);

                if (!result.HasValue) return null;
                if (result.Value.IsRevoked) return null;
                if (result.Value.ExpiresAt < DateTime.UtcNow) return null;

                return result.Value;
            }
        }
    }
}
