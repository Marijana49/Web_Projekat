using AuthService.Services.Interface;
using Data.Data;
using Data.DTOs;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Services.Service
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> LogInAsync(LogInDto logInDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == logInDto.Email);

            if (user == null)
            {
                return null;
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(logInDto.Password, user.Password);

            if (!isPasswordValid)
            {
                return null;
            }

            return user;
        }

        public async Task<bool> RegisterAsync(RegisterDto registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return false; 
            }

            var newUser = new User
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                Role = Data.Enums.Role.USER
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
