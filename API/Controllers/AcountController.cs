using Core.DTOs;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppWebContext _context;

        public AccountController(AppWebContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (
                user == null
                || string.IsNullOrEmpty(user.FirstName)
                || string.IsNullOrEmpty(user.LastName)
                || string.IsNullOrEmpty(user.Username)
                || string.IsNullOrEmpty(user.Email)
                || string.IsNullOrEmpty(user.Password)
            )
            {
                return BadRequest("All fields are required.");
            }

            if (_context.Users.Any(u => u.Username == user.Username || u.Email == user.Email))
            {
                return BadRequest("User with this username or email already exists.");
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "User registered successfully!" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var user = _context.Users.FirstOrDefault(u =>
                u.Username == loginDto.Username && u.Password == loginDto.Password
            );

            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            return Ok(
                new
                {
                    message = "Login successful!",
                    userId = user.Id,
                    username = user.Username,
                }
            );
        }
    }
}
