using System;
using System.Collections.Generic;
using cedix.io.Models.DbModels;
using Newtonsoft.Json;

namespace cedix.io.Models
{
    public class SellOfferViewModel
    {
       
        public SellOfferViewModel(){}

        public SellOfferViewModel(string coinCode,string country)
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
        public decimal MinSell { get; set; }
        public decimal MaxSell { get; set; }
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
            var seller = new CoinSeller();
            seller.CoinId = coinModel.Id;
            seller.CoinCode = coinModel.CoinCode;
            seller.Description = Description;
            seller.MinSell = MinSell;
            seller.MaxSell = MaxSell;
            seller.SellingAt = SellAt;
            seller.TotalAmount = TotalAmount;
            seller.UserId = profile.UserId;
            seller.UserName = profile.UserName;
            seller.CreatedAt = DateTime.Now;
            seller.CountryId = country.Id;
            if(paymentMethods!= null && paymentMethods.Count > 0)
            {
                foreach(var method in paymentMethods)
                {
                    var mypaymethod = new MyPaymentMethods();
                    mypaymethod.UserId = profile.UserId;
                    seller.PaymentMethodId = method.Id;
                    mypaymethod.SellId = DbHandler.Instance.CreateSeller(seller);
                    mypaymethod.Name = method.Name;
                    mypaymethod.JsonFieldsData = JsonConvert.SerializeObject(method.fields);
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
