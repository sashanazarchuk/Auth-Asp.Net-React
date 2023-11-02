using BusinessLogic.DTOs.ProductCartDTOs;
using BusinessLogic.Interfaces.AuthServices;
using BusinessLogic.Interfaces.IEmailService;
using BusinessLogic.Interfaces.IProductCartServices;
using BusinessLogic.Interfaces.ProductCartServices;
using BusinessLogic.Services.AuthServices;
using BusinessLogic.Services.EmailService;
using BusinessLogic.Services.ProductServices;
using Entities.Models.Auth;
using Entities.Models.Enitites;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

//Logger
builder.Services.ConfigureLoggerService();

//ConnectionString 
builder.Services.ConfigureConnectionStringService(builder.Configuration);

//Add Identity
builder.Services.ConfigureIdentity();

//Add JWT
builder.Services.ConfigureJWT(builder.Configuration);

//Add Cors
builder.Services.AddCORS();

//Add AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


//Register interfaces, allowing dependency injection.
builder.Services.AddScoped<IRegisterService, RegisterService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<IProductService<ProductDto>, ProductService>();
builder.Services.AddScoped<ICartService<CartItem>, CartService>();
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.ConfigureSessin();

 


//Add Authentication
builder.Services.AddAuthentication();



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

//Add Swagger
builder.Services.ConfigureSwagger();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("NgOrigins");

app.UseSession();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();