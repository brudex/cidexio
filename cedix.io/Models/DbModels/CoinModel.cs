using System;

namespace cedix.io.Models.DbModels
{
    public class CoinModel
    {
        public  int Id { get; set; }
        public  string CoinCode { get; set; }
        public  decimal BuyAt { get; set; }
        public  decimal SellAt { get; set; }
        public  string Description { get; set; }
        public  DateTime CreatedAt { get; set; }
        public  DateTime UpdatedAt { get; set; }
    }
}    