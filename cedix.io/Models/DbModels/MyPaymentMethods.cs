namespace cedix.io.Models
{
    public class MyPaymentMethods
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PaymentMethodId { get; set; }
        public bool IsDefault { get; set; }
        public string JsonFieldsData { get; set; }
    }
}