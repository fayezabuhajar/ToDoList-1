using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppWebContext _context;

        public UserController(AppWebContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/User
       

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id || !UserExists(id))
                return BadRequest("Cannot update this user");

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                // محاولة حفظ التعديلات
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                // في حالة وجود مشكلة أثناء الحفظ
                return BadRequest($"Error updating the user: {ex.Message}");
            }
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
