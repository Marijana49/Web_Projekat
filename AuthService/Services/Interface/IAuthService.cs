using Data.DTOs;
using Data.Models;

namespace AuthService.Services.Interface
{
    public interface IAuthService
    {
        Task<User?> LogInAsync(LogInDto logInDto);
        Task<bool> RegisterAsync(RegisterDto registerDto);
    }
}
