using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly AppWebContext _context;

        public TaskController(AppWebContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tassk>>> GetTasks()
        {
            return await _context.Tassks.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tassk>> GetTask(int id)
        {
            var task = await _context.Tassks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        [HttpPost]
        public async Task<ActionResult<Tassk>> CreateTask(Tassk task)
        {
            _context.Tassks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, Tassk task)
        {
            if (id != task.Id || !TaskExists(id))
                return BadRequest("Cannot update this Task");

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                // محاولة حفظ التعديلات
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                // في حالة وجود مشكلة أثناء الحفظ
                return BadRequest($"Error updating the task: {ex.Message}");
            }
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tassks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tassks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Tassks.Any(e => e.Id == id);
        }
    }
}
