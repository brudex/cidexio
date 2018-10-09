using cedix.io.Models;
using Microsoft.AspNetCore.Mvc;

namespace cedix.io.Controllers
{
    public class BtcController : Controller
    {
         
        [HttpGet("[controller]/[action]/{country}")]
        public IActionResult Index(string country)
        {
            Country countryInfo = DbHandler.Instance.GetCountryByCode(country);
            var model = new BtcViewBuySellModel(countryInfo,Constants.Coins.Btc);
            model.LoadBuyers(20);
            model.LoadSellers(20);
            return View(model);
        }
        
        // GET
        [HttpGet("[controller]/[action]/{country}")]
        public IActionResult Buy(string country)
        {
            string id = country;
            return View();
        }
        
        [HttpGet("[controller]/[action]/{country}")]
        public IActionResult Sell(string country)
        {
            string id = country;
            return View();
        }
    }
}