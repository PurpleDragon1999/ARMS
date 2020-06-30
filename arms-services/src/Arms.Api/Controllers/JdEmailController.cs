﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using Arms.Application.Services.Users;
using Arms.Domain.CustomEntities;
using Arms.Domain.Entities;
using Arms.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arms.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles="Admin,SuperAdministrator")]
    public class JdEmailController : BaseController
    {
      
        ArmsDbContext _context;
        public JdEmailController(ArmsDbContext armsContext)
        {
            
            _context = armsContext;

        }
        public MailHelperController mailHelper = new MailHelperController();
        [HttpPost]
        public IActionResult sendEmail(CustomEmail emailObj)
        {
            try
            {
                var response = new
                {
                    success = true,
                    payload = new
                    {
                        message = "Email Sent Successfully"
                    }

                };
                JobDescription jdObject = _context.JobDescription.SingleOrDefault(c => c.Id == emailObj.jobDescriptionId);
                string[] emailList = emailObj.emailList;
                showDocument(jdObject.pdfBlobData);
                string emailHtmlBody = GenerateEmailBody(jdObject);
                mailHelper.MailFunction(emailHtmlBody, emailList);
                return StatusCode(200, response);

            }catch(Exception e)
              {
                var response = new
                {
                    success = false,
                    payload = new
                    {
                        message = e.InnerException.Message
                    }
                 };
           
                return StatusCode(500, response);
           }

        }
        public string GenerateEmailBody(JobDescription jdObject)
        {
            string Id =jdObject.Id.ToString();
            string output = @"<html>
       <head>    
	       <style type=""text/css"">
           </style>
       </head>

         <body aria-readonly=""false"" style=""cursor: auto;"">
              <p> Hello </p>
             <p> Thank You for expressing your Interest for the position of "+ jdObject.jobTitle +
              @".You can read more about us on our company careers page. </p>
             <a href = 'www.cygrp.com/careers' > www.cygrp.com / careers </a>
             <p>Please signup if you wish to accept and proceed with our process</p>"+
            
            @"<a href ='http://localhost:4200/candidateForm/"+ jdObject.code +"'>" + @"Click here to apply.</a>
             <p> Regards,</p>
             <p> HR,</p>
             <p> Cybergroup,B - 9, Block B, Sector 3, Noida, Uttar Pradesh 201301 </p>
             <p> Thanks </p>
            <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCUuWWhu0HByWgdDAp2cA1TDf-a_
                   FpjUA_DFbRt33DViY9tNDH & usqp = CAU'width='150'height='150'>
             <br>
            <em >This is automatically generated email,please do not reply</em>
         </body>
     </html>
            ";
            return output;
        }
        public void showDocument(byte[] blobPdf)
        {
            string data = string.Empty;

           
                string temp_inBase64 = Convert.ToBase64String(blobPdf);
                  //MemoryStream ms = new MemoryStream(Convert.FromBase64String(temp_inBase64));
                  //PdfDocument doc = new PdfDocument();
                  // doc.LoadFromStream(ms);
                  // doc.SaveToFile("output.pdf");

        }


    }
}