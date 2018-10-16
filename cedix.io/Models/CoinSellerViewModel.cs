namespace cedix.io.Models
{
    public class CoinSellerViewModel
    {
       
        public int Id { get; set; }
        public string CountryCurrency { get; set; }
        public string Description { get; set; }
        public decimal MinSell { get; set; }
        public decimal MaxSell { get; set; }
        public string UserName { get; set; }
        public decimal SellingAt { get; set; }
        public string PaymentMethod { get; set; }
        public string CountryCode { get; set; }
        public string CoinCode { get; set; }
       
    }
}