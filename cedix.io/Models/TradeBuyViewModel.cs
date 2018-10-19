using cedix.io.Models.DbModels;


namespace cedix.io.Models
{
    public class TradeBuyViewModel
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

        public TradeBuyViewModel() { }

        public TradeBuyViewModel(CoinSeller seller,decimal coinAmout)
        {
            CoinCode = seller.CoinCode;
            SellerName = seller.UserName;
            PaymentWindow = seller.PaymentWindow;
            PaymentReference = ""+1;//todo generate payment ref
            CoinBuyAmount = coinAmout;
            PaymentAmount = seller.SellingAt * coinAmout;
            var country = DbHandler.Instance.GetById<Country>(seller.CountryId);
            IsoCurrency = country.IsoCurrency;
            var coinModel = DbHandler.Instance.GetCoinModelByCode(seller.CoinCode);
            CoinName = coinModel.Description;
            var paymentMethod = DbHandler.Instance.GetMyPaymentBySellerAndPymentId(seller.PaymentMethodId, seller.Id);
            PaymentMethod = paymentMethod.GetViewModel();

        }

        
    }
}
