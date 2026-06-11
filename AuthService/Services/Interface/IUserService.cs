using Data.DTOs;

namespace AuthService.Services.Interface
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task DeleteUserAsync(int id);
        Task UpdateUserRoleAsync(int id, string role);
    }
}
