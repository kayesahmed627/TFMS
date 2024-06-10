using Microsoft.EntityFrameworkCore;
using TFMS.Lib.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<FairDbContext>(op => op.UseSqlServer(builder.Configuration.GetConnectionString("db"), b => b.MigrationsAssembly("TFMS.API")));
builder.Services.AddControllers().AddNewtonsoftJson(
    op =>
    {
        op.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
        op.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
    }
    );

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();
app.UseStaticFiles();
app.MapDefaultControllerRoute();
app.Run();