using System;
using System.Collections.Generic;
using cedix.io.Models.DbModels;
using Dapper;
using MySql.Data.MySqlClient;

namespace cedix.io.Models
{
    public class DbHandler
    {
        public static string ConnectionString;

        private static DbHandler instance;

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
        
        public System.Data.IDbConnection GetOpenConnection()
        {
            Logger.Info("the connection string is :" + ConnectionString);
            var conn = new MySql.Data.MySqlClient.MySqlConnection(ConnectionString);
            conn.Open();
            return conn;
        }

        public Country GetCountryByCode(string country)
        {
            throw new NotImplementedException();
        }

        public List<CoinSellerViewModel> LoadSellers(int count)
        {
            throw new NotImplementedException();
        }
    
        public List<CoinBuyerViewModel> LoadBuyers(int count)
        {
            throw new NotImplementedException();
        }

        public CoinModel GetCoinModelByCode(string coinCode)
        {
            throw new NotImplementedException();
        }
    }
}