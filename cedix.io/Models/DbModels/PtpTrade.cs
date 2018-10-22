using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cedix.io.Models.DbModels
{
    public class PtpTrade
    {
        public int Id { get; set; }
        public string  CoinCode { get;set;}
        public string SellerName { get; set; }
        public string BuyerName { get; set; }
        public int SellerId { get; set; }
        public int BuyerId { get; set; }
        public int PaymentWindow { get; set; }
        public DateTime TradeStarted { get; set; }
        public DateTime TradeEnded{ get; set; }
        public string  PaymentReference { get; set; }
        public decimal CoinAmount { get; set; }
        public decimal PaymentAmount { get; set; }
        public string CountryCode { get; set; }
        public string IsoCurrency { get; set; }
        public int PaymentMethodId { get; set; }
        public string CoinName { get; set; }
        public string BuySell { get; set; } //BUY OR SELL

        public static PtpTrade GetTrade(string paymentReference,string buySell)
        {
            var trade = DbHandler.Instance.GetTradeByPaymentReference(paymentReference,buySell);
            return trade;
        }

        public static PtpTrade CreateTrade(decimal coinAmount,int id,string buySell)
        {
            PtpTrade trade = null;
            if (buySell == Constants.BuySell.Sell)
            {
               CoinSeller seller = DbHandler.Instance.GetById<CoinSeller>(id);
                if (seller != null)
                {
                    trade = new PtpTrade();
                    trade.BuySell = buySell;
                    trade.CoinCode = seller.CoinCode;
                    trade.SellerName = seller.UserName;
                    trade.SellerId = seller.Id;
                    trade.PaymentWindow = seller.PaymentWindow;
                    trade.TradeStarted = DateTime.Now;
                    trade.TradeEnded = trade.TradeStarted.AddMinutes(seller.PaymentWindow + 1);
                    trade.PaymentReference = "" + 1;//todo generate payment ref
                    trade.CoinAmount = coinAmount;
                    trade.PaymentAmount = seller.SellingAt * coinAmount;
                    var country = DbHandler.Instance.GetById<Country>(seller.CountryId);
                    trade.CountryCode = country.IsoCode;
                    trade.IsoCurrency = country.IsoCurrency;
                    var coinModel = DbHandler.Instance.GetCoinModelByCode(seller.CoinCode);
                    trade.CoinName = coinModel.Description;
                    trade.PaymentMethodId = seller.PaymentMethodId;
                }
              
               
            }
            else
            {
                CoinBuyer buyer = DbHandler.Instance.GetById<CoinBuyer>(id);
                if (buyer != null)
                {
                    trade = new PtpTrade();
                    trade.BuySell = buySell;
                    trade.CoinCode = buyer.CoinCode;
                    trade.SellerName = buyer.UserName;
                    trade.SellerId = buyer.Id;
                    trade.PaymentWindow = buyer.PaymentWindow;
                    trade.TradeStarted = DateTime.Now;
                    trade.TradeEnded = trade.TradeStarted.AddMinutes(buyer.PaymentWindow + 1);
                    trade.PaymentReference = "" + 1;//todo generate payment ref
                    trade.CoinAmount = coinAmount;
                    trade.PaymentAmount = buyer.BuyingAt * coinAmount;
                    var country = DbHandler.Instance.GetById<Country>(buyer.CountryId);
                    trade.CountryCode = country.IsoCode;
                    trade.IsoCurrency = country.IsoCurrency;
                    var coinModel = DbHandler.Instance.GetCoinModelByCode(buyer.CoinCode);
                    trade.CoinName = coinModel.Description;
                    trade.PaymentMethodId = buyer.PaymentMethodId;
                }
                
            }

            return trade;
        }
    }
}
