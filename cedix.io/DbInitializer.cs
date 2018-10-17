using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using cedix.io.Data;
using cedix.io.Models;
using cedix.io.Models.DbModels;
 

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace cedix.io
{
    public class DbInitializer
    {
        
        private static Random _randomizer = new Random();

        private static UserManager<IdentityUser> _userManager;

        public DbInitializer(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public DbInitializer()
        {
        }

        public  void InitializeDatabase()
        {
            var noOfRegisteredUsers = DbHandler.Instance.GetUsersCount();
            if (noOfRegisteredUsers == 0)
            { 
                InitializeCountries();
                InitializeCoinModel();
                InitializePaymentMethods();
                var dummyUsers = CreateInitialUsers();
                InitializeBuyers(dummyUsers);
                InitializeSellers(dummyUsers);
            } 
        }
 

        private  List<AccountProfile> CreateInitialUsers()
        {
            var emails = new List<string>(){
                "benbenavides@gmail.com; 1LoTmp4UWPD6YmWcPpTb4WWj2tTDW85ay7",
                "zotimes@yahoo.co; 1EBq1oEe5UBZdU3rT2XvVoE3J3UQsszHCN",
                "terrywinders11@yahoo.com;1QGaBPHHTLruEq2HWJbagbf3JKZdZKbzcY",
                "schute@gmail.com;18RF9MbkddAUhKFC4aWRLuyNxKcjPRrSwZ",
                "robsonlami@hotmail.com;1J87UNjKqB6r9hvYbWHFFjYc9eYfeQAAMn",
                "prhunter@msn.com;1LRv1eaiVs5uqyNMCpeCPrttUE1yRFCAz7",
                "mamy45@msn.com;1LsepfYSuYMJqx3wBMcp2E8AEZX3pTCygP",
                "junjunior@lycos.co.kr;188E7z3dayXUysmWSFTWyt63FxS4RWK99E",
                "coinjeska@gmail.com;3KHMKr2TgsFm5nmVHeMPHSfQVv5d4Z2m8x",
                "fisheram@msn.com;1D8s7SdNcSwNeeH3k2JoKXVF8hCa5Z7gFr",
                "drlaugh4u@gmail.com;18JfdgmDDbkVMpB9u6a52gnhocrRvjvDEA",
                "alison@hotmail.com;13NVKd9LWU8hKj1KETFwU98BFSCnRmmnt5",
                "emerson_candy@yahoo.com;1EJyUUDYDqRVhP5hxgr5auwKVf7e4qBE5L",
                "firegamer@gmail.com;1J3NnxfVE8Tr3DB68bgPJXXu6bkkqwrZVp",
                "flash35@lycos.co.kr;16FN3AU8edFdRiSGCr24aFADRmSPysHAcm",
                "andrews@hotmail.com;369FhgEzRmXyF9gtWtmbKunQCZ3pAVLWzx",
                "gamerkingss7789@gmail.com;1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA",
                "an0681@gmail.com;1Lt41bXf2jY9zpDmPb6NJfXwnwE2SZHVBH",
                "evilhrlady@gmail.com;329koRvovTyNnd4ADrpR2uJHzXxfvKxta5",
                "flight68@lycos.co.kr;3LVxPqibyF1M5XZSzV1pfBoH7VsYyssV32",
                "digitalsamuraigames@gmail.com;35MmrgnUmUoM4bdPJPZ9ZCGo98wckPbFhR",
                "drunkmonkeygames@gmail.com;1NYzNysebM3ZVsjXYeVXtcyWehePHinsq6",
                "randombus@protonmail.com;1Hyn6jfXJYmmYUq88HPyYkwTDKJuzLKkea",
            };
            var dummyUsers = new List<AccountProfile>();
            emails.ForEach( e =>
            {
                var model = new AccountProfile();
                var arr = e.Split(new[] { "@", ";" }, StringSplitOptions.RemoveEmptyEntries);
                model.UserName = arr[0];
                model.Email = e.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries)[0];
                model.FullName = model.UserName;
                
                var identityUser = new IdentityUser { UserName = model.Email, Email = model.Email };
                var result =  _userManager.CreateAsync(identityUser, "oKaAlRcQ48@").Result;
                if (result.Succeeded)
                {
                    model.UserId = identityUser.Id;
                     DbHandler.Instance.CreateAccountProfile(model);
                     dummyUsers.Add(model);
                } 
              
            }); 
            
            
            return dummyUsers;
        }

        
        
        private void InitializePaymentMethods()
        {
            var country = DbHandler.Instance.GetCountryByCode(Constants.CountryCodes.Ghana);
            {
                 var paymethod = new PaymentMethod();
                paymethod.Name = "MTN";
                paymethod.Description = "MTN mobile money";
                paymethod.CountryId = country.Id;
                paymethod.Id = DbHandler.Instance.CreatePaymentMethod(paymethod);
               
                var field1 = new PaymentMethodFields();
                field1.FieldName = "mobile";
                field1.FieldLabel = "Mobile Number";
                field1.FieldType = Constants.FieldTypes.Alpha;
                field1.PaymentMethodId = paymethod.Id;
                DbHandler.Instance.CreatePaymentFields(field1);
            }
            
            {
                var paymethod = new PaymentMethod();
                paymethod.Name = "Bank";
                paymethod.Description = "Zenith Bank Account";
                paymethod.CountryId = country.Id;
                paymethod.Id = DbHandler.Instance.CreatePaymentMethod(paymethod);
               
                var field1 = new PaymentMethodFields();
                field1.FieldName = "account";
                field1.FieldLabel = "Account Number";
                field1.FieldType = Constants.FieldTypes.Alpha;
                field1.PaymentMethodId = paymethod.Id;
                DbHandler.Instance.CreatePaymentFields(field1);
            } 
        }
        
        

        public  void ResetDb(){
            string[] queries= new string[]{
                "truncate table CoinModel",
                "truncate table Country",
                "truncate table CoinBuyer",
                "truncate table CoinSeller",
                "delete from cedix.aspnetusers",
                "truncate table UserWallet",
                "truncate table PaymentMethod",
                "truncate table PaymentMethodFields",
                "truncate table accountprofile",
             };
            for(int q=0;q<queries.Length;q++){
                 DbHandler.Instance.ExecuteRaw(queries[q]);
            }
        }


        private  void InitializeCoinModel()
        {
            var coin = new CoinModel();
            coin.BuyAt = 6286;
            coin.SellAt = 6286;
            coin.CoinCode = "BTC";
            coin.Description = "Bitcoin";
            coin.CreatedAt = coin.UpdatedAt = DateTime.Now;
            DbHandler.Instance.CreateCoinModel(coin);
        }
        
        
        private  void InitializeCountries()
        {
            var arr = new string[]
            {"GH;Ghana;GHS",
            "NG;Nigeria;NGN"};
           
            for (var i = 0; i < arr.Length; i++)
            {
               var items= arr[i].Split(new string[] {";"}, StringSplitOptions.None);
                var country = new Country();
                country.IsoCode = items[0];
                country.CountryName = items[1];
                country.IsoCurrency = items[2];
                DbHandler.Instance.AddCountry(country);
            }
            
        }
        

        
        
        private  void InitializeBuyers(List<AccountProfile> testUsers){
            foreach(var wt in testUsers){
                CoinBuyer buyer = new CoinBuyer();
                var coinModel = DbHandler.Instance.GetCoinModelByCode(Constants.Coins.Btc);
                var country = DbHandler.Instance.GetCountryByCode(Constants.CountryCodes.Ghana);
                var paymentMethods = DbHandler.Instance.GetPaymentMethodsByCountry(country.Id);
                buyer.UserId = wt.UserId;
                buyer.CoinId = coinModel.Id;
                buyer.Description = "Buy Bitcoin";
                buyer.BuyingAt = coinModel.BuyAt;
                buyer.CountryId = country.Id;
                buyer.MinBuy = new decimal(0.01);
                buyer.MaxBuy = Decimal.One;
                buyer.UserName = wt.UserName;
                buyer.CoinCode = coinModel.CoinCode;
                int paymentIndex =  _randomizer.Next(0, paymentMethods.Count-1);
                buyer.PaymentMethodId = paymentMethods[paymentIndex].Id;
                buyer.CreatedAt = DateTime.Now;
                DbHandler.Instance.CreateBuyer(buyer);
                 
            }
        }
        
        private  void InitializeSellers(List<AccountProfile> testUsers){
            foreach(var wt in testUsers){
                CoinSeller seller = new CoinSeller();
                var coinModel = DbHandler.Instance.GetCoinModelByCode(Constants.Coins.Btc);
                var country = DbHandler.Instance.GetCountryByCode(Constants.CountryCodes.Ghana);
                var paymentMethods = DbHandler.Instance.GetPaymentMethodsByCountry(country.Id);
                seller.UserId = wt.UserId;
                seller.CoinId = coinModel.Id;
                seller.Description = "Sell Bitcoin";
                seller.SellingAt = coinModel.SellAt;
                seller.MinSell = 0.5m;
                seller.MaxSell = 1;
                seller.UserName = wt.UserName;
                seller.CountryId = country.Id;
                seller.CoinCode = coinModel.CoinCode;
                int paymentIndex =  _randomizer.Next(0, paymentMethods.Count-1);
                seller.PaymentMethodId = paymentMethods[paymentIndex].Id;
                seller.CreatedAt = DateTime.Now;
                DbHandler.Instance.CreateSeller(seller); 
            }
        }

        public void InstallScriptsIfNotExist()
        {

            if (!DbHandler.Instance.DatabaseHasTables())
            {
               string appDir = AppDomain.CurrentDomain.BaseDirectory;
                if (appDir.IndexOf("bin") > -1)
                {
                    appDir = appDir.Split(new[] { "bin" }, StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();
                    string filepath = System.IO.Path.Combine(appDir, "cedix.sql");
                    if (System.IO.File.Exists(filepath))
                    {
                        string sqlScript = System.IO.File.ReadAllText(filepath);
                        DbHandler.Instance.ExecuteRaw(sqlScript);
                    }
                    return;
                }
               
            }
             
        }


    }
}