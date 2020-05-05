import { JdModalComponent } from '../jd-modal/jd-modal.component';
import { Component, OnInit,EventEmitter, Output, Input} from "@angular/core";
import { AppServicesService } from "src/app/services/app-services.service";
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
// import {jobDescription} from '../../models/jobDescription.interface'
// import{AppServicesService} from '../../services/app-services.service'


@Component({
  selector: "app-jd-list",
  templateUrl: "./jd-list.component.html",
  styleUrls: ["./jd-list.component.scss"],
})



export class JdListComponent implements OnInit {
  jobsList: any;
  jdObject: any;

  constructor(private _service: AppServicesService, private router: Router, 
    private modalService:NgbModal) {}

  ngOnInit() {
    this.loadJds();
  }

  loadJds() {
    return this._service.getAllJobs().subscribe((response: any) => {
      return (this.jobsList = response.payload.data);
    });
  }

  jdUpdateModal(id:string){
    const modalRef =this.modalService.open(JdModalComponent)
    modalRef.componentInstance.jdUpdateId = id
  }


  deleteJd(jobObjId: string) {
    this._service.deleteJd(jobObjId).subscribe((res) => {
      this.loadJds();
    });
  }


  public convertToPDF() {
    var data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, 2 * imgWidth, 2 * imgHeight)
      // pdf.setTextColor(255,0,0);
      // pdf.setFillColor(135, 124,45,0);
      // pdf.setFontType("italic");
      // pdf.text("Copyright © 2020  CyberGroup . All rights reserved.", 10, 280)
      pdf.save("jobdescription" + this.jdObject.jdId + '.pdf'); // Generated PDF
    });
    setTimeout(() => {
      this.navigation();
    }, 5000);
  }
  downloadPdf(jdId) {
    this.convertToPDF();
    // this.router.navigate(["/jd-pdf", jdId]);
  }

  datecheck(closingDate) {
    let currentDate = new Date().toISOString();
    if (closingDate <= currentDate)
      return 1;
    else return 0;
  }

  navigation() {
    this.router.navigate(["/hr/job-desc"]);
  }
}
