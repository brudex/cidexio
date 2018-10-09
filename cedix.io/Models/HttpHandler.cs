using System;
using Newtonsoft.Json.Linq;
using RestSharp;
using cedix.io.Models.DbModels;

namespace cedix.io.Models
{
    public class HttpHandler
    {
    
//        public static AddressBin GetNewAddress(int id){
//            var client = new RestClient(SettingsData.NetBtcUrl);
//            var request = new RestRequest("/api/Address/"+id, Method.GET);
//            IRestResponse response = client.Execute(request);
//            var content = response.Content; 
//            Logger.Info("New address from url :"+content);
//            var json = new JObject();
//            if(string.IsNullOrWhiteSpace(content)){                
//                return null;
//            }else{
//                json= JObject.Parse(content);
//                 AddressBin addressBin = new AddressBin();
//                 addressBin.Address=json["address"].ToString();
//                 return addressBin;
//            }  
//        } 

        

        internal static JObject DepositNotification(JObject data)
        {
            var client = new RestClient(SettingsData.NetBtcUrl);
            var request = new RestRequest("/api/Deposit/DepositRequest/", Method.POST);
            request.AddHeader("Accept", "application/json");
            request.AddParameter("application/json", data, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;
            Logger.Info("DepositRequest response >>"+content);
            if(string.IsNullOrWhiteSpace(content)){                
                return null;
            }else{
              var json= JObject.Parse(content);
              return json;
            }  
        }

         internal static JObject PostPayout(JObject data)
        {
            var client = new RestClient(SettingsData.NetBtcUrl);
            var request = new RestRequest("/api/Payout/Payment/", Method.POST);
            request.AddHeader("Accept", "application/json");
            request.AddParameter("application/json", data, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;
             Logger.Info("Payout response >>"+content);
             if(string.IsNullOrWhiteSpace(content)){                
                return null;
            }else{
              var json= JObject.Parse(content);
              return json;
            }  
        }

        internal static JObject PostAdminAction(JObject data)
        {
            var client = new RestClient(SettingsData.NetBtcUrl);
            var request = new RestRequest("/api/Admin/AdminAction/", Method.POST);
            request.AddHeader("Accept", "application/json");
            request.AddParameter("application/json", data, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;
             Logger.Info("Admin response >>"+content);
             if(string.IsNullOrWhiteSpace(content)){                
                return null;
            }else{
              var json= JObject.Parse(content);
              return json;
            }  
        }

        internal static JObject CheckPayoutStatus(JObject data)
        {
             var client = new RestClient(SettingsData.NetBtcUrl);
            var request = new RestRequest("/api/Payout/PaymentStatus", Method.POST);
            request.AddHeader("Accept", "application/json");
            request.AddParameter("application/json", data, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            var content = response.Content;
            Logger.Info("PayoutStatus response >>"+content);
            if(string.IsNullOrWhiteSpace(content)){                
                return null;
            }else{
              var json= JObject.Parse(content);
              return json;
            }  
        }
    }
}