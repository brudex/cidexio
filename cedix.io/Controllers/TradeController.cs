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



        [HttpGet("[controller]/[action]")]
        public IActionResult Buy([FromBody] JObject data)
        {
            int buyerId = data["id"].ToObject<int>();
            decimal coinAmount = data["coinAmount"].ToObject<decimal>();
            CoinSeller seller = DbHandler.Instance.GetById<CoinSeller>(buyerId);
            var viewModel = new TradeBuyViewModel(seller, coinAmount);
            return View(viewModel);
        }



        [HttpGet("[controller]/[action]")]
        public IActionResult Sell([FromBody] JObject data)
        {
            int buyerId = data["id"].ToObject<int>();
            decimal coinAmount = data["coinAmount"].ToObject<decimal>();
            CoinSeller seller = DbHandler.Instance.GetById<CoinSeller>(buyerId);
            var viewModel = new TradeBuyViewModel(seller, coinAmount);
            return View(viewModel);
        }

    }
}
    