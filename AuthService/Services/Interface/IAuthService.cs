using Data.DTOs;

namespace AuthService.Services.Interface
{
    public interface IAuthService
    {
        Task<string?> LogInAsync(LogInDto logInDto);
        Task<bool> RegisterAsync(RegisterDto registerDto);
    }
}
