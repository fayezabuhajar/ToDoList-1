using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppWebContext(DbContextOptions<AppWebContext> options) : DbContext(options)
    {
        public required DbSet<User> Users { get; set; }
        public required DbSet<Tassk> Tassks { get; set; }

        

    }
}
