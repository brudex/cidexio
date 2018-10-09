using System;

namespace cedix.io.Models.DbModels
{
    public class CoinSeller
    {
        public int Id { get; set; }
        public int CoinId { get; set; }
        public string Description { get; set; }
        public decimal SellingAt { get; set; }
        public string UserId { get; set; }
        public int PaymentMethodId { get; set; }
        public int CountryId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}