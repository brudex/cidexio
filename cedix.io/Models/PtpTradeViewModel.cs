using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cedix.io.Models.DbModels;

namespace cedix.io.Models
{
    public class PtpTradeViewModel
    {
        public decimal CoinAmount { get; set; }
        public string CoinCode { get; set; }
        public string CoinName { get; set; }
        public string SellerName { get; set; }
        public string BuyerName { get; set; }
        public int SellerId { get; set; }
        public int BuyerId { get; set; }
        public string BuySell { get; set; }
        public int PaymentWindow { get; set; }
        public string PaymentReference { get; set; }
        public decimal PaymentAmount { get; set; }
        public string IsoCurrency { get; set; }
        public PaymentMethodViewModel PaymentMethod { get; set; }
        public DateTime TradeStarted { get; set; }
        public DateTime TradeEnded { get; set; }

        public PtpTradeViewModel(PtpTrade trade)
        {
            BuySell = trade.BuySell;
            CoinAmount = trade.CoinAmount;
            CoinCode = trade.CoinCode;
            CoinName = trade.CoinName;
            SellerName = trade.SellerName;
            BuyerName = trade.BuyerName;
            BuySell = trade.SellerName;
            PaymentWindow = trade.PaymentWindow;
            PaymentReference = trade.PaymentReference;
            PaymentAmount = trade.PaymentAmount;
            IsoCurrency = trade.IsoCurrency;
            TradeStarted = trade.TradeStarted;
            TradeEnded = trade.TradeEnded;
            if (BuySell == Constants.BuySell.Buy)
            {
                var paymentMethod = DbHandler.Instance.GetMyPaymentByBuyerAndPymentId(trade.PaymentMethodId, BuyerId);
                PaymentMethod = paymentMethod.GetViewModel();
            }
            else
            {
                var paymentMethod = DbHandler.Instance.GetMyPaymentBySellerAndPymentId(trade.PaymentMethodId, SellerId);
                PaymentMethod = paymentMethod.GetViewModel(); 
            } 
        }

        

    }
}
