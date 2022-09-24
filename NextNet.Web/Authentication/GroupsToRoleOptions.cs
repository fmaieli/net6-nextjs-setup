namespace NextNet.Web.Authentication
{
    public class GroupsToRoleOptions
    {
        public Dictionary<string, string[]> Groups { get; set; } = new Dictionary<string, string[]>();

        public Dictionary<string, string[]> Roles { get; set; } = new Dictionary<string, string[]>();
    }
}
