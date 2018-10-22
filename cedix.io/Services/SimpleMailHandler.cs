using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using HandlebarsDotNet;
using RestSharp;
using RestSharp.Authenticators;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace cedix.io.Services
{
    public class SimpleMailHandler
    {
        public static void SendSimpleMessage(string toMail, string subject, string templateName, dynamic obj)
        {
            try
            {
                var templatePath = $@"{Directory.GetCurrentDirectory()}/EmailTemplates/" + templateName;
                var source = GetTemplateSource(templatePath);
                var template = Handlebars.Compile(source);
                var result = template(obj);

                var client = new RestClient();
                client.BaseUrl = new Uri("https://api.mailgun.net/v3");
                client.Authenticator =
                    new HttpBasicAuthenticator("api", "key-9e2746dcf1a2b5b618ebf34a5d5e4fd6");
                var request = new RestRequest();
                request.AddParameter("domain", "mg.cedix.io", ParameterType.UrlSegment);
                request.Resource = "{domain}/messages";
                request.AddParameter("from", "CedixIO <info@cedix.io>");
                request.AddParameter("to", toMail);
                request.AddParameter("subject", subject);
                request.AddParameter("html", result);
                request.Method = Method.POST;
                var resp = client.Execute(request);
                Logger.Info(resp.Content);
            }
            catch (Exception ex)
            {
                Logger.Error(ex, ex.Message);
            }
        }

        public static void SendSimpleMessage(EmailMessage emailMsg)
        {
            try
            {
                var templatePath = $@"{Directory.GetCurrentDirectory()}/EmailTemplates/" + emailMsg.Template;
                var source = GetTemplateSource(templatePath);
                var template = Handlebars.Compile(source);
                var htmlMsgResult = template(emailMsg.data);

                if (emailMsg.MailGroup.Count > 0)
                    SendWithSendgrid(emailMsg.Subject, emailMsg.MailGroup, htmlMsgResult);
                else
                    SendWithMailGun(emailMsg.Subject, emailMsg.Email, htmlMsgResult);
            }
            catch (Exception ex)
            {
                Logger.Error(ex, ex.Message);
            }
        }


        public static string SendWithMailGun(string subject, string toMail, string htmlMsg)
        {
            var client = new RestClient();
            client.BaseUrl = new Uri("https://api.mailgun.net/v3");
            client.Authenticator =
                new HttpBasicAuthenticator("api", "key-9e2746dcf1a2b5b618ebf34a5d5e4fd6");
            var request = new RestRequest();
            request.AddParameter("domain", "mg.cedix.io", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", "CedixIO <info@cedix.io>");
            request.AddParameter("to", toMail);
            request.AddParameter("subject", subject);
            request.AddParameter("html", htmlMsg);
            request.Method = Method.POST;
            var resp = client.Execute(request);
            var result = resp.Content;
            Logger.Info("MailGun response >> " + resp.Content);
            return result;
        }

        public static async Task<string> SendWithSendgrid(string subject, List<string> toMails, string htmlMsg)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("info@cedix.io", "CedixIO");
            var receipients = new List<EmailAddress>();
            toMails.ForEach(t => receipients.Add(new EmailAddress(t)));
            var plainTextContent = "";
            var htmlContent = htmlMsg;
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, receipients, subject, plainTextContent,
                htmlContent);
            var response = await client.SendEmailAsync(msg);
            Logger.Info("Sengrid response >>" + response.StatusCode);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                return response.Body.ToString();
                ;
            }

            return string.Empty;
        }

        private static readonly Dictionary<string, string> templateCache = new Dictionary<string, string>();

        private static string GetTemplateSource(string path)
        {
            var templateContent = "";
            if (templateCache.TryGetValue(path, out templateContent)) return templateContent;
            var source = File.ReadAllText(path);
            templateCache[path] = source;
            return source;
        }
    }
}