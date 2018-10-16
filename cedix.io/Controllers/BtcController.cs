using System.Collections.Generic;
using cedix.io.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using web.Models;

namespace cedix.io.Controllers
{
    public class BtcController : Controller
    {
         
        [HttpGet("[controller]/[action]/{country}")]
        public IActionResult Index(string country)
        {
            Country countryInfo = DbHandler.Instance.GetCountryByCode(country);
            var model = new BuySellViewModel(countryInfo,Constants.Coins.Btc);
            model.LoadBuyers(20);
            model.LoadSellers(20);
            return View(model);
        }
        
        // GET
        [HttpGet("[controller]/[action]/{country}")]
        public IActionResult Buy(string country)
        {
            Country countryInfo = DbHandler.Instance.GetCountryByCode(country);
            var coinModel = DbHandler.Instance.GetCoinModelByCode(Constants.Coins.Btc);
            var model = new CoinBuyerViewModel();
            model.CountryCode = countryInfo.IsoCode;
            model.CountryCurrency = countryInfo.IsoCurrency;
            model.BuyingAt = coinModel.SellAt;
            model.CoinCode = coinModel.CoinCode;
            model.UserName = User.Identity.Name;
            return View();
        }
        
        [HttpGet("[controller]/[action]/{country}")]
        public IActionResult Sell(string country)
        {
            Country countryInfo = DbHandler.Instance.GetCountryByCode(country);
            var coinModel = DbHandler.Instance.GetCoinModelByCode(Constants.Coins.Btc);
            var model = new CoinSellerViewModel();
            model.CountryCode = countryInfo.IsoCode;
            model.CountryCurrency = countryInfo.IsoCurrency;
            model.SellingAt = coinModel.SellAt;
            model.CoinCode = coinModel.CoinCode;
            model.UserName = User.Identity.Name;
            return View(model);
        }
        
        
        [HttpPost("[controller]/[action]")]
        public IActionResult SearchBuyers([FromBody]JObject data)
        {
            decimal amount = data["amount"].ToDecimal();
            string countryCode = data["country"].ToString2();
            Country countryInfo = DbHandler.Instance.GetCountryByCode(countryCode);
            List<CoinBuyerViewModel> buyers = DbHandler.Instance.SearchBuyersByCountry(amount, countryInfo,Constants.Coins.Btc);
            var response = new ServiceResponse(){status = "00"};
            response.data = buyers;
            return Ok(response);
        } 
        
        
        [HttpPost("[controller]/[action]")]
        public IActionResult SearchSellers([FromBody]JObject data)
        {
            decimal amount = data["amount"].ToDecimal();
            string countryCode = data["country"].ToString2();
            Country countryInfo = DbHandler.Instance.GetCountryByCode(countryCode);
            List<CoinBuyerViewModel> sellers = DbHandler.Instance.SearchSellersByCountry(amount, countryInfo,Constants.Coins.Btc);
            var response = new ServiceResponse(){status = "00"};
            response.data = sellers;
            return Ok(response);
        }
    }
}