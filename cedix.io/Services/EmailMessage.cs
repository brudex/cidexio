using System;
using System.Collections.Generic;

namespace cedix.io.Services
{
    public class EmailMessage
    {
        public EmailMessage(){
           MailGroup= new List<string>();
        }
        public string Email{get;set;}
        public List<string> MailGroup{get;set;}
        public string Subject{get;set;}
        public string Message{get;set;}
        public string Template{get;set;}
        public dynamic data{get;set;}

        
    }
}