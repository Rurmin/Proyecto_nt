var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173") 
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // cookies JWT
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("FrontendPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();