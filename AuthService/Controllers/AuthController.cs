using AuthService.Services.Interface;
using Data.Data;
using Data.DTOs;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

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

            return Ok(new { message = "Korisnik registrovan!"});
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody]LogInDto dto)
        {
            var user = await _authService.LogInAsync(dto);

            if (user == null)
            {
                return Unauthorized(new { message = "Neispravni podaci!"});
            }

            return Ok(new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email,
                role = user.Role,
            });
        }
    }
}
