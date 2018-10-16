using System.Collections.Generic;
using System.Data;
using System.Linq;
using cedix.io.Models.DbModels;
using Dapper;
using DapperExtensions;
using DapperExtensions.Sql;


namespace cedix.io.Models
{
    public interface ISnack<T> where T : new()
    {

    }

    public abstract class Kitchen<T> where T : ISnack<T>, new()
    {
    }

    public class Db : Database<Db>
    {
        public Table<Country> countries { get; set; }
        public Table<AccountProfile> accountProfiles { get; set; }
        public Table<CoinModel> coinModel { get; set; }
        public Table<CoinBuyer> coinBuyers { get; set; }
        public Table<CoinSeller> coinSellers { get; set; }
        public Table<PaymentMethod> paymentMethods { get; set; }
        public Table<PaymentMethodFields> paymentMethodFields { get; set; }
        public Table<UserWallet> userWallets { get; set; }

    }



    public class DbHandler
    {
        public static string ConnectionString;
        private readonly Db db;

        private static DbHandler instance;



        private DbHandler()
        {
            DapperExtensions.DapperExtensions.SqlDialect = new MySqlDialect();
            db = Db.Init(GetMysqlConnection(), 30);
            // DapperExtensions.DapperExtensions.DefaultMapper = typeof(CustomMysqlClassMapper<>);
            //DapperExtensions.DapperExtensions.DefaultMapper = typeof(PrimaryKeyAssignedClassMapper<>);
        }

        public static DbHandler Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new DbHandler();
                }

                return instance;
            }
        }

        public IDbConnection GetOpenConnection()
        {
            Logger.Info("the connection string is :" + ConnectionString);
            IDbConnection conn = new MySql.Data.MySqlClient.MySqlConnection(ConnectionString);
            conn.Open();
            return conn;
        }

        public MySql.Data.MySqlClient.MySqlConnection GetMysqlConnection()
        {
            var conn = new MySql.Data.MySqlClient.MySqlConnection(ConnectionString);

            return conn;
        }

        public Country GetCountryByCode(string countryCode)
        {
            using (var conn = GetOpenConnection())
            {
                var predicate = Predicates.Field<Country>(f => f.IsoCode, Operator.Eq, countryCode);
                var country = conn.GetList<Country>(predicate).FirstOrDefault();
                return country;
            }
        }

        public List<CoinSellerViewModel> LoadSellers(string coinCode, int count)
        {
            using (var conn = GetOpenConnection())
            {

                var list = conn.Query<CoinSellerViewModel>(
                    "select cs.Id ,cs.CoinCode, c.IsoCurrency as 'CountryCurrency',c.IsoCode as 'CountryCode',cs.Description," +
                    "cs.MinSell,cs.MaxSell,cs.SellingAt,cs.UserName,p.Description as 'PaymentMethod' from coinseller cs inner join country c on cs.countryId = c.id inner join " +
                    "paymentmethod p on cs.paymentmethodId = p.id where cs.CoinCode = @coinCode order by cs.Id desc limit @count",
                    new {coinCode, count});
                return list.ToList();
            }
        }

        public List<CoinBuyerViewModel> LoadBuyers(string coinCode, int count)
        {
            using (var conn = GetOpenConnection())
            {

                var list = conn.Query<CoinBuyerViewModel>(
                    "select cs.Id as 'CoinSellerId',cs.CoinCode, c.IsoCurrency as 'CountryCurrency',c.IsoCode as 'CountryCode'," +
                    "cs.Description,cs.MinBuy,cs.MaxBuy,cs.BuyingAt,cs.UserName,p.Description as 'PaymentMethod' from coinbuyer cs " +
                    "inner join country c on cs.countryId = c.id inner join paymentmethod p on cs.paymentmethodId = p.id where cs.CoinCode = @coinCode order by cs.Id desc limit @count",
                    new {coinCode, count});
                return list.ToList();
            }
        }

        public CoinModel GetCoinModelByCode(string coinCode)
        {
            using (var conn = GetOpenConnection())
            {
                var predicate = Predicates.Field<CoinModel>(f => f.CoinCode, Operator.Eq, coinCode);
                var coin = conn.GetList<CoinModel>(predicate).FirstOrDefault();
                return coin;
            }
        }

        public int GetUsersCount()
        {
            using (var conn = GetOpenConnection())
            {
                var predicate = Predicates.Field<AccountProfile>(f => f.Id, Operator.Gt, 0);
                var coin = conn.Count<AccountProfile>(predicate);
                return coin;
            }
        }

        internal void ExecuteRaw(string query)
        {
            using (var conn = GetOpenConnection())
            {
                conn.Execute(query);
            }
        }

        public List<PaymentMethod> GetPaymentMethodsByCountry(int countryId)
        {
            using (var conn = GetOpenConnection())
            {
                var predicate = Predicates.Field<PaymentMethod>(f => f.CountryId, Operator.Eq, countryId);
                var list = conn.GetList<PaymentMethod>(predicate);
                return list.ToList();
            }

        }

        public int AddCountry(object obj)
        {
            int id = (int) db.countries.Insert(obj);
            return id;
        }


        public int CreatePaymentMethod(PaymentMethod paymethod)
        {
            int id = (int) db.paymentMethods.Insert(paymethod);
            return id;
        }

        public int CreatePaymentFields(PaymentMethodFields fields)
        {
            int id = (int) db.paymentMethodFields.Insert(fields);
            return id;
        }

        public int CreateCoinModel(CoinModel coin)
        {
                int id = (int) db.coinModel.Insert(coin);
                return id;
        }

        public int CreateBuyer(CoinBuyer buyer)
        {
            int id = (int) db.coinBuyers.Insert(buyer);
            return id;
        }

        public int CreateAccountProfile(AccountProfile model)
        {
            int id = (int) db.accountProfiles.Insert(model);
            return id;
        }

        public int CreateSeller(CoinSeller seller)
        {
            int id = (int) db.coinSellers.Insert(seller);
            return id;
        }

        public List<CoinBuyerViewModel> SearchBuyersByCountry(decimal amount, Country countryInfo, string coinCode)
        {
            using (var conn = GetOpenConnection())
            {

                var list = conn.Query<CoinSellerViewModel>(
                    "select cs.Id ,cs.CoinCode, c.IsoCurrency as 'CountryCurrency',c.IsoCode as 'CountryCode',cs.Description," +
                    "cs.MinSell,cs.MaxSell,cs.SellingAt,cs.UserName,p.Description as 'PaymentMethod' from coinseller cs inner join country c on cs.countryId = c.id inner join " +
                    "paymentmethod p on cs.paymentmethodId = p.id where cs.CoinCode = @coinCode order by cs.Id desc limit @count",
                    new {coinCode, count});
                return list.ToList();
            }
        }

        public List<CoinBuyerViewModel> SearchSellersByCountry(decimal amount, Country countryInfo, string btc)
        {
            throw new System.NotImplementedException();
        }
    }
}