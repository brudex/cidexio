using cedix.io.Models.DbModels;


namespace cedix.io.Models
{
    public class TradeSellViewModel
    {
        public decimal CoinBuyAmount { get; set; }
        public string CoinCode { get; set; }
        public string CoinName { get; set; }
        public string SellerName { get; set; }
        public int PaymentWindow{ get; set; }
        public string PaymentReference { get; set; }
        public decimal PaymentAmount { get; set; }
        public string IsoCurrency{ get; set; }
        public PaymentMethodViewModel PaymentMethod { get; set; }
        public TradeSellViewModel() { }

        public TradeSellViewModel(CoinBuyer buyer,decimal coinAmout)
        {
            CoinCode = buyer.CoinCode;
            SellerName = buyer.UserName;
            PaymentWindow = buyer.PaymentWindow;
            PaymentReference = ""+1;//todo generate payment ref
            CoinBuyAmount = coinAmout;
            PaymentAmount = buyer.BuyingAt * coinAmout;
            var country = DbHandler.Instance.GetById<Country>(buyer.CountryId);
            IsoCurrency = country.IsoCurrency;
            var coinModel = DbHandler.Instance.GetCoinModelByCode(buyer.CoinCode);
            CoinName = coinModel.Description;
            var paymentMethod = DbHandler.Instance.GetMyPaymentBySellerAndPymentId(buyer.PaymentMethodId, buyer.Id);
            PaymentMethod = paymentMethod.GetViewModel();
        }

         

        
    }
}
