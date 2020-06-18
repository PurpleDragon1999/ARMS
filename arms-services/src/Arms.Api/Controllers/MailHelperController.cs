using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailHelperController : BaseController
    {
        public MailMessage mail;
        public SmtpClient client;
        public MailHelperController()
        {


        }
        public void SendMail(string htmlEmailBody)
        {
            mail.Body = htmlEmailBody;
            //Attachment data = new Attachment(attachmentPath, MediaTypeNames.Application.Octet);
            //mail.Attachments.Add(data);

            //sending mail
            try
            {
                client.Send(mail);
                mail.Dispose();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in sending email: " + ex.Message);
                Console.ReadKey();
            }
        }
      

        public void MailFunction( string emailHtmlBody,string[] emailList)
        {
            var credentials = new System.Net.NetworkCredential("Your Email Here", "Your Password here");

            // Mail message
            mail = new MailMessage()
            {
                From = new MailAddress("Your Email here"),
                Subject = "Jd info",
                IsBodyHtml = true
            };
            foreach(string email in emailList){
                mail.To.Add(new MailAddress(email));
            }

            // Smtp client
            client = new SmtpClient()
            {
                Port = 587,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Host = "smtp.gmail.com",
                EnableSsl = true,
                Credentials = credentials
            };
           
            SendMail(emailHtmlBody);
        }
    }
}