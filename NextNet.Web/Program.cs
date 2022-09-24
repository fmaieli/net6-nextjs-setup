using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Controllers;
using NextNet.Web.Authentication;
using NextNet.Web.Services;
using NLog;
using NLog.Web;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Text.Json.Serialization;

var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");

try
{
    var builder = WebApplication.CreateBuilder(args);
    builder.Host.UseNLog();

    // Authentication
    builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme).AddNegotiate();

    builder.Services.AddHttpContextAccessor();

    builder.Services.AddCors(options => options.AddPolicy("dev",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        }
    ));

    // Add services to the container.
    builder.Services.AddControllersWithViews(opts => opts.Filters.Add(new AuthorizeFilter("InternalUsers")))
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
            })
            .AddMvcOptions(options => options.ModelBinderProviders.Insert(0, new DateTimeModelBinderProvider()));

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    // Services
    //builder.Services.AddNextNetServices(builder.Configuration);

    builder.Services.AddOptions();
    builder.Services.Configure<GroupsToRoleOptions>(builder.Configuration.GetSection("GroupsToRoles"));

    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("InternalUsers", pb => pb.RequireAuthenticatedUser());
        options.AddPolicy("CheckPermissions", pb => pb.RequireAssertion(context =>
        {
            var user = context.User;
            if (context.Resource is HttpContext httpContext)
            {
                var endpoint = httpContext.GetEndpoint();
                if (endpoint == null) return true;
                var actionDescriptor = endpoint.Metadata.GetMetadata<ControllerActionDescriptor>();
                var permissionAttribute = actionDescriptor?.MethodInfo.GetCustomAttributes(typeof(PermissionClaimRequirementAttribute), false).FirstOrDefault() as PermissionClaimRequirementAttribute;
                if (permissionAttribute == null) return true;

                return user.HasClaim(c => c.Type == "Permission" && c.Value == permissionAttribute.ClaimValue);
            }

            return user.HasClaim(c => c.Type == "Permissions" && c.Value == "Admin");
        }));
    });

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        app.UseHttpsRedirection();
    }

    app.UseStaticFiles();

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Scato.Operaciones V1");
        c.DocExpansion(DocExpansion.None);
        c.DefaultModelExpandDepth(-1);
    });

    app.UseRouting();

    if (app.Environment.IsDevelopment())
    {
        app.UseCors("dev");
    }

    app.UseAuthentication();

    app.UseAuthorization();

    app.UseMiddleware<AugmentingPrincipalMiddleware>();

    app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

    app.MapFallbackToFile("index.html"); ;

    app.Run();
}
catch (Exception exception)
{
    // NLog: catch setup errors
    logger.Error(exception, "Stopped program because of exception");
    throw;
}
finally
{
    // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
    NLog.LogManager.Shutdown();
}