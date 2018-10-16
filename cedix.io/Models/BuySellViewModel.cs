using System.Collections.Generic;
using cedix.io.Models.DbModels;

namespace cedix.io.Models
{
    public class BuySellViewModel
    {
        private Country _country;
        private string _coinCode;
        public BuySellViewModel(Country countryInfo,string coinCode)
        {
            _country = countryInfo;
            _coinCode = coinCode;
            coin = DbHandler.Instance.GetCoinModelByCode(_coinCode);
        }

        public CoinModel coin { get; set; }
        public List<CoinBuyerViewModel> buyers { get; set; }
        public List<CoinSellerViewModel> sellers { get; set; }

        public void LoadSellers(int count)
        {
            sellers = DbHandler.Instance.LoadSellers(_coinCode,count); 
        }

        public void LoadBuyers(int count)
        {
            buyers = DbHandler.Instance.LoadBuyers(_coinCode,count);
        }
    }
}