using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace web.Models
{
    public static class Extensions
    {
        public static string ToString2(this JObject obj){
            if(obj ==null){
                return string.Empty;
            }
            return obj.ToString();
        }
         public static string ToString2(this JToken obj){
            if(obj ==null){
                return string.Empty;
            }
            return obj.ToString();
        }

        public static int ToInteger(this JToken obj){
            if(obj ==null){
                return 0;
            }
            int myInt=0;
            int.TryParse(obj.ToString(),out myInt);
            return myInt;
        }

        public static JArray ToJArray<T>(this List<T> list) where T:class{

               var jarray = JsonConvert.SerializeObject(list,new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
               return JArray.Parse(jarray);

        }


    }
}