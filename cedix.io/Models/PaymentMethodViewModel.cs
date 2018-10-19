using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cedix.io.Models
{
    public class PaymentMethodViewModel
    {
        public PaymentMethodViewModel()
        {
            fields = new List<PaymentMethodViewModelField>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PaymentMethodViewModelField> fields { get; set; }
    }



    public class PaymentMethodViewModelField
    {
        public string FieldLabel { get; set; }
        public string FieldName { get; set; }
        public string FieldType { get; set; }
        public string FieldValue { get; set; }
    }
}
