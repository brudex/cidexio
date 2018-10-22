using cedix.io.Models;
using cedix.io.Models.DbModels;
using cedix.io.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace cedix.io.Controllers
{
    public class TradeController : Controller
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;

        public TradeController(
            UserManager<IdentityUser> userManager,
            IEmailSender emailSender,
            ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _logger = logger;
        }

        [HttpPost("[controller]/[action]")]
        public IActionResult Create([FromBody] JObject data)
        {
            decimal coinAmount = data["coinAmount"].ToObject<decimal>();
            string buySell  = data["buySell"].ToObject<string>();
            int id = data["id"].ToObject<int>();
            var trade = PtpTrade.CreateTrade(coinAmount, id, buySell);
            if (trade != null)
            {
                if (trade.BuySell == Constants.BuySell.Buy)
                {
                  return RedirectToLocal("/trade/buy/"+trade.PaymentReference);
                }
                else
                {
                  return  RedirectToLocal("/trade/sell/" + trade.PaymentReference);
                }
            }
            return RedirectToLocal("/404");
        }


        [HttpGet("[controller]/[action]/{id}")]
        public IActionResult Buy(string id)
        {
            var ptpTrade = PtpTrade.GetTrade(id, Constants.BuySell.Buy);
            if (ptpTrade == null)
            {
                return RedirectToLocal("/404");
            }
            var vm = new PtpTradeViewModel(ptpTrade);
            return View(vm);
        }


        [HttpGet("[controller]/[action]/{id}")]
        public IActionResult Sell(string id)
        {
            var ptpTrade = PtpTrade.GetTrade(id, Constants.BuySell.Sell);
            if (ptpTrade == null)
            {
                return RedirectToLocal("/404");
            }
            var vm = new PtpTradeViewModel(ptpTrade);
            return View(vm);

        }


        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }
    }
}
    