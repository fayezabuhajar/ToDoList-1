using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppWebContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.


app.UseCors("AllowAllOrigins");
app.UseStaticFiles();
app.MapControllers();
app.Run();
