using System;
using System.Collections.Generic;
using cedix.io.Models.DbModels;
using Newtonsoft.Json;

namespace cedix.io.Models
{
    public class BuyOfferViewModel
    {
       
        public BuyOfferViewModel()
        {}

        public BuyOfferViewModel(string coinCode,string country)
        {
            Country countryInfo = DbHandler.Instance.GetCountryByCode(country);
            var coinModel = DbHandler.Instance.GetCoinModelByCode(coinCode);
            CoinId = coinModel.Id;
            CoinCode = coinModel.CoinCode;
            CountryCode = countryInfo.IsoCode;
            BuyAt = coinModel.BuyAt;
            SellAt = coinModel.SellAt;
        } 

        public int CoinId { get; set; }
        public string CountryCode { get; set; }
        public string CoinCode { get; set; }
        public decimal BuyAt { get; set; }
        public decimal SellAt { get; set; }
        public string Description { get; set; }
        public decimal MinBuy { get; set; }
        public decimal MaxBuy { get; set; }
        public decimal TotalAmount { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int PaymentMethodId { get; set; }
        public List<PaymentMethodViewModel> paymentMethods { get; set; }
        
        public ServiceResponse Save(AccountProfile profile)
        {
            var response = new ServiceResponse();
            var coinModel = DbHandler.Instance.GetCoinModelByCode(CoinCode);
            var country = DbHandler.Instance.GetCountryByCode(CountryCode);
            var buyer = new CoinBuyer();
            buyer.CoinId = coinModel.Id;
            buyer.CoinCode = coinModel.CoinCode;
            buyer.Description = Description;
            buyer.MinBuy = MinBuy;
            buyer.MaxBuy = MaxBuy;
            buyer.BuyingAt = BuyAt;
            buyer.TotalAmount = TotalAmount;
            buyer.UserId = profile.UserId;
            buyer.UserName = profile.UserName;
            buyer.CreatedAt = DateTime.Now;
            buyer.CountryId = country.Id;
            if(paymentMethods!= null && paymentMethods.Count >0)
            {
                foreach(var method in paymentMethods)
                {
                    var mypaymethod = new MyPaymentMethods();
                    mypaymethod.UserId = profile.UserId;
                    buyer.PaymentMethodId = method.Id;
                    mypaymethod.BuyId = DbHandler.Instance.CreateBuyer(buyer);
                    mypaymethod.Name = method.Name;
                    DbHandler.Instance.CreateMyPaymentMethod(mypaymethod);
                }
                response.status = "00";
                response.message = "Data saved successfully";
            }
            else
            {
                response.status = "02";
                response.message = "Please select payment method";
            }
            return response;
        }
    }
}
