using AuthService.Services.Interface;
using Data.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var success = await _authService.RegisterAsync(dto);

            if (!success)
            {
                return BadRequest();
            }

            return Ok(new { message = "Korisnik registrovan!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] LogInDto dto)
        {
            var token = await _authService.LogInAsync(dto);

            if (token == null)
            {
                return Unauthorized(new { message = "Neispravni podaci!" });
            }

            return Ok(new
            {
                token = token,
            });
        }
    }
}
