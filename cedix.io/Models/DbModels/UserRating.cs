namespace cedix.io.Models.DbModels
{
    public class UserRating
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int CoinId { get; set; }
        public string BuySell { get; set; }
        public int Rating { get; set; }
    }
}