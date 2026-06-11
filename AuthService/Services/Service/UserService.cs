using AuthService.Services.Interface;
using Azure;
using Data.Data;
using Data.DTOs;
using Data.Enums;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Services.Service
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _appDbContext;
        private readonly HttpClient _client;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(AppDbContext appDbContext, IHttpClientFactory clientFactory, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _appDbContext = appDbContext;
            _client = clientFactory.CreateClient();
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task DeleteUserAsync(int id)
        {
            var token = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();

            if (!string.IsNullOrEmpty(token))
            {
                _client.DefaultRequestHeaders.Authorization =
                    System.Net.Http.Headers.AuthenticationHeaderValue.Parse(token);
            }

            var baseUrl = _configuration["ServiceUrls:TravelService"];
            var res = await _client.DeleteAsync(($"{baseUrl}/api/travel/user-plans/{id}"));

            if (!res.IsSuccessStatusCode)
            {
                throw new Exception("Greška pri brisanju planova korisnika u TravelService-u!");
            }

            var user = await _appDbContext.Users.FindAsync(id);

            if(user == null)
            {
                throw new KeyNotFoundException("Korisnik ne postoji!");
            }

            if(id == user.Id)
            {
                throw new InvalidOperationException("Ne možete obrisati sami sebe!");
            }

            _appDbContext.Users.Remove(user);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _appDbContext.Users.ToListAsync();

            var userDtos = users.Select(u => new UserDto { Id = u.Id, Name = u.Name, Email = u.Email, Password = u.Password, Role = u.Role });

            return userDtos;
        }

        public async Task UpdateUserRoleAsync(int id, string role)
        {
            if (!Enum.TryParse<Role>(role, true, out var newRole))
            {
                throw new ArgumentException("Nepostojeća uloga!");
            }

            var user = await _appDbContext.Users.FindAsync(id);


            if (user == null)
            {
                throw new KeyNotFoundException("Korisnik ne postoji!");
            }

            user.Role = newRole;
            await _appDbContext.SaveChangesAsync();
        }
    }
}
