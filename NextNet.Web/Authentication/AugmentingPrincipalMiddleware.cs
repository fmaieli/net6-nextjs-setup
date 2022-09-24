using Microsoft.Extensions.Options;
using System.DirectoryServices.AccountManagement;
using System.Security.Claims;
using System.Security.Principal;

namespace NextNet.Web.Authentication
{
    /// <summary>
    /// Middleware for augmenting the <see cref="IPrincipal"/> with the roles and permissions.
    /// </summary>
    public class AugmentingPrincipalMiddleware
    {
        private readonly GroupsToRoleOptions groupsToRolesOptions;
        private readonly RequestDelegate next;

        /// <summary>
        /// Ctor for <see cref="AugmentingPrincipalMiddleware"/>.
        /// </summary>
        /// <param name="groupsToRolesOptions">Static mapping between AD groups to Application roles and roles to permissions.</param>
        /// <param name="next">Next middleware in the pipeline.</param>
        /// <exception cref="ArgumentNullException"></exception>
        public AugmentingPrincipalMiddleware(IOptions<GroupsToRoleOptions> groupsToRolesOptions, RequestDelegate next)
        {
            this.groupsToRolesOptions = groupsToRolesOptions.Value ?? throw new ArgumentNullException(nameof(groupsToRolesOptions));
            this.next = next;
        }

        /// <summary>
        /// Main method in the HTTP pipeline.
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context)
        {
            if (context?.User?.Identity?.IsAuthenticated == true)
            {
                if (context.User.Identity is WindowsIdentity wi && OperatingSystem.IsWindows())
                {
                    PrincipalContext ctx = new PrincipalContext(ContextType.Domain);
                    UserPrincipal user = UserPrincipal.FindByIdentity(ctx, context.User.Identity.Name);

                    var email = user.EmailAddress;
                    var name = user.DisplayName;

                    if (wi.Groups == null)
                    {
                        await next(context);
                        return;
                    }

                    var groups = wi.Groups.Select(g => g.Translate(typeof(NTAccount)).Value).ToArray();

                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Email, email),
                        new Claim(ClaimTypes.Name, name)
                    };

                    //translate groups to roles
                    var permittedRoles = groupsToRolesOptions.Groups.Keys;
                    var roles = groups.Where(g => permittedRoles.Contains(g))
                        .SelectMany(r => groupsToRolesOptions.Groups[r])
                        .ToArray();

                    claims.AddRange(roles.Select(g => new Claim(ClaimTypes.Role, g)));

                    //translate roles to permissions

                    var permissions = roles.SelectMany(r => groupsToRolesOptions.Roles[r]).Distinct().ToArray();
                    claims.AddRange(permissions.Select(g => new Claim("Permission", g)));

                    context.User = new System.Security.Claims.ClaimsPrincipal(new ClaimsIdentity(claims, "Windows"));
                }
            }
            await next(context);
        }
    }
}
