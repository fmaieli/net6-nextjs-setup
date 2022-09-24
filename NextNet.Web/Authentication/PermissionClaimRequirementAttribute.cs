namespace NextNet.Web.Authentication
{
    [AttributeUsage(AttributeTargets.All, Inherited = true, AllowMultiple = false)]
    public class PermissionClaimRequirementAttribute : Attribute
    {
        public PermissionClaimRequirementAttribute(string claimValue)
        {
            ClaimValue = claimValue;
        }

        public string ClaimValue { get; }
    }
}
