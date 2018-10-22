using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cedix.io.Models;
using cedix.io.Models.DbModels;
using Newtonsoft.Json.Linq;
using web.Models;

namespace cedix.io.Services
{
    // This class is used by the application to send email for account confirmation and password reset.
    // For more details see https://go.microsoft.com/fwlink/?LinkID=532713
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            SendMailInstantly(email, subject, message);
            return Task.CompletedTask;
        }

      
        private static ConcurrentQueue<EmailMessage> _messageQueue = new ConcurrentQueue<EmailMessage>();
        
        public void SendWelcomeMessage(AccountProfile user)
        {
            string templateName = "welcome.html";
            string message = "Welcome to Cedix.IO, the best Peer to peer currency exchange";
            string subject = "Welcome - Your time to earn";
            var obj = new { UserName = user.UserName, message = message };
            Task.Factory.StartNew(() => SimpleMailHandler.SendSimpleMessage(user.Email, subject, templateName, obj));
        }

        public void SendDepositAlertMessage(UserWallet deposit)
        {
//            string templateName = "depositalert.html";
//            string subject = "Deposit Received";
//            Task.Factory.StartNew(() => {
//                var user = DbHandler.Instance.GetUserById(deposit.UserId);
//                var payoutAddress = DbHandler.Instance.GetPayoutAddress(user.Id);
//                var obj = new { userName = user.UserName, depositAmount = deposit.Amount, payoutAddress = payoutAddress.Address };
//                SimpleMailHandler.SendSimpleMessage(user.Email, subject, templateName, obj);
//            });
        }



        public void SendTradeCompleteMessage(UserWallet deposit)
        {
//            string templateName = "payoutalert.cshtml";
//            string message = "Welcome to Cedix.IO, the platform designed that makes you rich without hustle";
//            string subject = "Payout paid Received";
//
//            Task.Factory.StartNew(() => {
//                var user = DbHandler.Instance.GetUserById(deposit.UserId);
//                var obj = new { depositAmount = deposit.Amount, message = message };
//                SimpleMailHandler.SendSimpleMessage(user.Email, subject, templateName, obj);
//            });
        }

        public void SendPublicityMail(EmailMessage emailMessage)
        {
            if (string.IsNullOrEmpty(emailMessage.Template))
            {
                emailMessage.Template = "publicity.cshtml";
            }
            if (emailMessage.data == null)
                emailMessage.data = new { message = emailMessage.Message ,subject=emailMessage.Subject};
            SimpleMailHandler.SendSimpleMessage(emailMessage);
        }

        public void QueueMail(string emailAddress, string subject, string message, string template = "generic.html")
        {
            var emailMsg = new EmailMessage();
            emailMsg.Email = emailAddress;
            emailMsg.Message = message;
            emailMsg.Subject = subject;
            emailMsg.Template = template;
            _messageQueue.Enqueue(emailMsg);
        }

        public void SendMailInstantly(string emailAddress, string subject, string message, string template = "generic.html")
        {
            var emailMsg = new EmailMessage();
            emailMsg.Email = emailAddress;
            emailMsg.Message = message;
            emailMsg.Subject = subject;
            emailMsg.Template = template;
            SendPublicityMail(emailMsg);
          
        }

        public void QueueMail(EmailMessage emailMsg)
        {
            _messageQueue.Enqueue(emailMsg);
            //SendPublicityMail(emailMsg.Email,emailMsg.Subject,emailMsg.Message,emailMsg.Template,emailMsg.data);
        }

        public void SendQueuedMessages()
        { 

            if (_messageQueue.Count > 0)
            {

                Action action = () =>
                {
                    EmailMessage emailMsg;
                    while (_messageQueue.TryDequeue(out emailMsg))
                    {
                        SendPublicityMail(emailMsg);

                    } 
                };
                Parallel.Invoke(action, action, action, action);
            }

        }


        internal void ProcessInputListToQueue(JObject data)
        {

            Task.Factory.StartNew(() => {
                var emails = data["inputemails"].ToString2().Split(new[] { ';', ',' }).Select(x => x.Trim()).ToList();
                emails.ForEach(e => {
                    var em = new EmailMessage();
                    em.MailGroup.Add(e);
                    em.Message = data["message"].ToString2();
                    em.Subject = data["subject"].ToString2();
                    em.Template = data["template"].ToString2();
                    QueueMail(em);
                });
            });
        }

        private string GetMailingListContent(string listfile)
        {
            string filePath = $@"{System.IO.Directory.GetCurrentDirectory()}/MailingLists/" + listfile;
            string data = string.Empty;
            if (System.IO.File.Exists(filePath))
            {
                data = System.IO.File.ReadAllText(filePath);
            }
            return data;
        }

        public List<string> ReadMailingList(string listfile)
        {
            string data = GetMailingListContent(listfile);
            var list = data.Split(new[] { ';', ',', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList();
            return list;
        }
    }
}
