using System;

namespace cedix.io.Models.DbModels
{
    public class UserWallet
    {
        public int Id{get;set;}
        public string UserId{get;set;}
        public string DepositAddress{get;set;}
        public decimal Amount{get;set;}
        public string CoinCode { get; set; }
        public string DebitCredit{get;set;} //DR/CR
        public string TransId{get;set;}
        public int Confirmations{get;set;}
        public DateTime CreateDate{get;set;}
    }
}