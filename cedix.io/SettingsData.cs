using System;
using System.Collections.Generic;

namespace cedix.io
{
    public class SettingsData
    {
        public static decimal ReferralInterestRate = new Decimal(0.05);
        public static decimal PayoutInterestRate = new Decimal(0.3);
        public static string NetBtcUrl = "http://localhost:5001";
        internal static string SiteUrl  = "http://localhost:5000";
        internal static string SiteName  = "Web-Btc";
        public static decimal AverageTransactionFee = new decimal(0.00054);
        public static int MaxPayoutDivisions = 4;  //We cant divid ur payouts into more than this number
        public static decimal MinimumDeposit =  new decimal(0.01);
        public static decimal MaximumDeposit =  new decimal(99);
        public static int InvestmentDuration = 5; //investment duration in hours
        public static bool IsBtcMainNet =false;
        public static string MailingListsPath ="/";
        internal static void Initialize(Dictionary<string, string> settings)
        {
          ReferralInterestRate = decimal.Parse(settings["ReferralInterestRate"]);
          PayoutInterestRate = decimal.Parse(settings["PayoutInterestRate"]);  
          NetBtcUrl = settings["NetBtcUrl"];
          SiteUrl  = settings["SiteUrl"];
          SiteName  = settings["SiteName"];
          AverageTransactionFee =  decimal.Parse(settings["AverageTransactionFee"]);
          MaxPayoutDivisions = int.Parse(settings["MaxPayoutDivisions"]);  //We cant divid ur payouts into more than this number
          MinimumDeposit =  decimal.Parse(settings["MinimumDeposit"]);   
          MaximumDeposit =  decimal.Parse(settings["MaximumDeposit"]);  
          InvestmentDuration = int.Parse(settings["InvestmentDuration"]);  //investment duration in hours
          IsBtcMainNet = bool.Parse(settings["IsBtcMainNet"]);  //Are we on live bitcoin network
         }
    }
}
