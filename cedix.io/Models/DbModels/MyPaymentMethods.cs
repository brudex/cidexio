using Newtonsoft.Json;
using System.Collections.Generic;

namespace cedix.io.Models
{
    public class MyPaymentMethods
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PaymentMethodId { get; set; }
        public string Name { get; set; }
        public int SellId { get; set; }
        public int BuyId { get; set; }
        public bool IsDefault { get; set; }
        public string JsonFieldsData { get; set; }

        public PaymentMethodViewModel GetViewModel()
        {
            var vm = new PaymentMethodViewModel();
            vm.Id = Id;
            vm.Name = Name;
            vm.fields =  JsonConvert.DeserializeObject<List<PaymentMethodViewModelField>>(JsonFieldsData);
            return vm;
        }
         
    }
}