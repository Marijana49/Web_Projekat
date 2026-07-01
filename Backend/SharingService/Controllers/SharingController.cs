using Data.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SharingService.Services.Interface;
using SharingService.Services.Service;

namespace SharingService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SharingController : ControllerBase
    {
        private readonly IShareLinkService _shareLinkService;

        public SharingController(IShareLinkService shareLinkService) 
        {
            _shareLinkService = shareLinkService;
        }

        [HttpPost]
        public async Task<ActionResult<ShareLinkResponse>> Create([FromBody] CreateShareLinkRequest request)
        {
            var info = await _shareLinkService.CreateShareLinkAsync(
                request.PlanId, request.AccessType, request.ExpiresInDays);

            return Ok(new ShareLinkResponse
            {
                Token = info.Token,
                ShareUrl = $"/shared/{info.Token}",
                AccessType = info.AccessType,
                ExpiresAt = info.ExpiresAt
            });
        }

        [HttpGet("{token}/validate")]
        public async Task<ActionResult<ValidateTokenResponse>> Validate(string token)
        {
            var info = await _shareLinkService.ValidateTokenAsync(token);

            if (info == null)
                return Ok(new ValidateTokenResponse { IsValid = false });

            return Ok(new ValidateTokenResponse
            {
                IsValid = true,
                PlanId = info.PlanId,
                AccessType = info.AccessType
            });
        }

        [HttpDelete("{token}")]
        public async Task<IActionResult> Revoke(string token)
        {
            var success = await _shareLinkService.RevokeTokenAsync(token);
            return success ? NoContent() : NotFound();
        }
    }
}
