namespace cedix.io.Models.DbModels
{
    public class AccountProfile
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string VerificationStatus { get; set; }
        public bool FacebookVerified { get; set; }
        public bool TwitterVerified { get; set; }
    }
}