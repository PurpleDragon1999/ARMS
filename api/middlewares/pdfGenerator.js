var pdf = require("pdfkit");
var fs = require("fs");

//this function generates pdf of json
const pdfGenerator = (jdJson, filename) => {
  var jdPdf = new pdf();

  jdPdf.pipe(fs.createWriteStream("jobDescriptions/" + filename + ".pdf"));
  jdPdf.on("pageAdded", () => jdPdf.text("Job Details"));

  jdPdf.fillColor("red").text(`JOB DETAILS`, {
    width: 410,
    align: "center",
  });
  jdPdf.moveDown();
  jdPdf.fillColor("red").text(`Job ID:${jdJson.jdId}`, {
    width: 410,
    align: "left",
    columns: 2,
    columnGap: 15,
  });
  jdPdf.fillColor("black").text(`Profile:${jdJson.jdTitle}`, {
    width: 410,
    align: "left",
    columns: 2,
    columnGap: 15,
  });
  jdPdf.fillColor("black").text(`Joining Location:${jdJson.location}`, {
    width: 410,
    align: "left",
  });
  jdPdf.fillColor("black").text(`Cost To Company:${jdJson.salary}`, {
    width: 410,
    align: "left",
  });

  jdPdf
    .fillColor("black")
    .text(`Eligibility Criteria:${jdJson.eligibilityCriteria}`, {
      width: 410,
      align: "left",
    });
  jdPdf
    .fillColor("black")
    .text(`Job Profile Description:${jdJson.jobProfileDescription}`, {
      width: 410,
      align: "left",
    });
  jdPdf.fillColor("blue").text(`Websites:https://www.cygrp.com`, {
    width: 410,
    align: "left",
  });
  jdPdf.end();
};
module.exports = pdfGenerator;
