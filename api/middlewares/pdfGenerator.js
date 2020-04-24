var pdf=require('pdfkit');
var fs=require('fs');
const HTMLToPDF = require('html-to-pdf');
 
//this function generates pdf of json
 const pdfGenerator=(jdJson)=>{
    var jdPdf=new pdf;
        
        jdPdf.pipe(fs.createWriteStream('jobDescriptions/'+jdJson.jdName+".pdf"));
        jdPdf.on('pageAdded', () => jdPdf.text("Job Details"));
       
        jdPdf.fillColor('red').text(`JOB DETAILS`,  {
            width: 410,
            align: 'center'
          });
          jdPdf.moveDown();
          jdPdf.fillColor('red').text(`Profile:${jdJson.jdName}` , {
            width: 410,
            align: 'left',
            columns:2,
            columnGap: 15,
          });
          jdPdf.fillColor('black').text(`Designation:${jdJson.appliedFor}` , {
            width: 410,
            align: 'left',
            columns:2,
            columnGap: 15,
          });
          jdPdf.fillColor('black').text(`Joining Location:${jdJson.location}` , {
            width: 410,
            align: 'left'
          });
          jdPdf.fillColor('black').text(`Cost To Company:${jdJson.salary}` , {
            width: 410,
            align: 'left'
          });
         
           jdPdf.fillColor('black').text(`Eligibility Criteria:${jdJson.eligibiltyCriteria}` , {
          width: 410,
          align: 'left'
        });
          jdPdf.fillColor('black').text(`Other Details:${jdJson.jobProfileDescription}` , {
            width: 410,
            align: 'left'
          });
          jdPdf.fillColor('blue').
          text(`Websites:https://www.cygrp.com`, {
            width: 410,
            align: 'left'
          });
        jdPdf.end();
     
        
     




}
module.exports=pdfGenerator;