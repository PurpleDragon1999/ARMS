import { Component, OnInit, AfterViewChecked } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { IJobDescription } from '../../models/jobDescription.interface'
import { AppServicesService } from '../../services/app-services.service'
import { stringify } from 'querystring';
import { JobService } from '../../services/job.service'
@Component({
  selector: 'app-jd-pdf',
  templateUrl: './jd-pdf.component.html',
  styleUrls: ['./jd-pdf.component.scss']
})
export class JdPdfComponent implements OnInit {
  jdObject: any;
  obj: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppServicesService,
    private jobService: JobService
  ) { }
  imageUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAABTVBMVEX///8AAAD1ix75+fn8///yaSXAwMAWFhbd3d3zdCP0ezH1iCD2jh9CQkL4mTr4mzv3lDf5ojz2kTfwWij1hjT2jDb3njv5pj7zby70gyHwZCbn5+f0fyD2ijf5qD7JyckmJibzbyT0fzL0eCPxYipKSkqgoKDyZy1XV1f0dC/X19e1tbXOzs6AgIDxWSitra0zMzM8PDx1dXX0dQD84tSampplZWX0fgCLi4vzbgBfX18tLS15eXn98Oj4wZ/628H4u5fyYgDxVgD4myz6qjL2sJf99+30gwDvTQD61Ln75Nn50735uo72nVn2kl/4xq71mm35r3L1hlL5y6P2oYH4qlrzeUX2tp75woj1jGb5t3H2l0f2rID2pXf73bvzhVz5tF3ylXb60Zz7yYPybD30iEb97tnyeU/6tFD4uXz5zZH3w7X84sT0hEf3o2TImKWLAAANxElEQVR4nO2b+1vayBrHkQw3QcXrCmgRBUUB8YLgLWCgoqIWbXfXtvay7tZ297Sn//+PJ8lck0y4iRr2zPd5fIQwM5n55J133rnE5RISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEvo/EEB/PWftMbPzJMmFs2azXG6eF2Spu6xy47xZPiqXz7rO6UCBeuXicjoyp2pJ1+KrowLo5DEDIDevhveUPV3be9tzl2rOR6/wowmAyrU7GIxADoFAIAE1fCy3M3sAmq8VJREYXlycmpqan5+fVolub0cu5Kepet8lvQm7MQkDjERCuWq0zCofqyRWh1UUOowpDcbERHgiWNq+HkQc4NNYaELvH3MmGB5Nyq+SnXEAcANRDOs0MAyNRjg8ESldDJz3kH+rhSOQBReGxzN7zvcdoPG74lldtYExOhouTVcGy3d8qo0GI61gRKOqcXDbdFP1zK62gDE25i5dDBKNt5pZtIERjVY5NKR3KovZ2ZYwZsKli2doVI96XwsFO4ARrRZMGYH8pboy2xbGzGjp67M0rAe9r2kDqhFGgAcjemfKKUejs7MMDDSazJthjLuvB6SjaHYBWaDBZI4w0XkwMH43ZAQqixUDjOFhFaGab25uSmXBwAjdPlPjuhN4q7FgLEP9N395fVEuH314tajR8CQIjC+G8VVO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"

  ngOnInit() {
    this.loadJd()

  }

  public loadJd() {
    this.route.params
    .pipe(
      switchMap((params: Params) => {
       return this.jobService.getJdData(params.jdId);
      })
      
    )
    .subscribe((res) => {
      this.jdObject = res.payload.data;
    
    });
  }
  //later achieved function which divides the content into pagers too but not able to set top margins
  convertToPDF() {
    var data = document.getElementById('content');
    data.style.display = "block";
    html2canvas(data, { allowTaint: true }).then(canvas => {
      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width * 0.45 + (top_left_margin * 2);
      let PDF_Height = (PDF_Width * 1.6) + (top_left_margin * 2);
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      canvas.getContext('2d');
      let imgData = canvas.toDataURL("image/png", 1.0);
      let pdf = new jsPDF('p', 'pt', 'a4');
      pdf.addImage(imgData, 'PNG', top_left_margin, top_left_margin, canvas_image_width * 0.79,
        canvas_image_height * 0.90);

      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage('a4', 'p');
        pdf.setPage(i + 1);
        pdf.text("cyg", 400, 1200);
        pdf.addImage(imgData, 'PNG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4),
          canvas_image_width * 0.79, canvas_image_height * 0.90);
      }
      pdf.save("jobdescription" + this.jdObject.id + '.pdf');

      this.jobService.updateJobInfo({ pdfString: pdf.output() }, Number(this.jdObject.id)).subscribe((res: any) => {


      });
    });
    data.style.display = "none";
    setTimeout(() => {
      this.navigation();
    }, 5000);
  }
  navigation() {
    this.router.navigate(["/admin/job-desc"]);
  }
}