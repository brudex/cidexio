using System;

namespace cedix.io.Models.DbModels
{
    public class CoinBuyer
    {
        public int Id { get; set; }
        public int CoinId { get; set; }
        public string CoinCode { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public decimal MinBuy { get; set; }
        public decimal MaxBuy { get; set; }
        public string RefExchange { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal BuyingAt { get; set; }
        public int PaymentWindow{ get; set; } //max number of minutes trade should laster
        public int PaymentMethodId { get; set; }
        public int CountryId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}