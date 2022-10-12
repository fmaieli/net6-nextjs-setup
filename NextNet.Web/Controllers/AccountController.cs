using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace NextNet.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class AccountController : ControllerBase
    {
        [HttpGet("[action]")]
        public async Task<IActionResult> Me()
        {
            var roles = User.Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value);

            var permissions = User.Claims
                .Where(c => c.Type == "Permission")
                .Select(c => c.Value);

            return Ok(new
            {
                Name = User.Identity.Name,
                Email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                Roles = roles,
                Permissions = permissions
            });
        }
    }
}
