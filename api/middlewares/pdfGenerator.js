var pdf=require('pdfkit');
var fs=require('fs');
//this function generates pdf of json
 const pdfGenerator=(jdJson)=>{
var jdPdf=new pdf;
jdPdf.pipe(fs.createWriteStream('jobDescriptions/'+jdJson.jdName+".pdf"));
jdPdf.font('Times-Roman').fontSize(12).text(jdJson,100,100);

jdPdf.end();

}
module.exports=pdfGenerator;