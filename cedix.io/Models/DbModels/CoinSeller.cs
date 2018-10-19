using System;

namespace cedix.io.Models.DbModels
{
    public class CoinSeller
    {
        public int Id { get; set; }
        public int CoinId { get; set; }
        public string CoinCode { get; set; }
        public string Description { get; set; }
        public decimal MinSell { get; set; }
        public decimal MaxSell { get; set; }
        public decimal SellingAt { get; set; }
        public decimal TotalAmount { get; set; }
        public int PaymentWindow { get; set; }
        public string RefExchange { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int PaymentMethodId { get; set; }
        public int CountryId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}