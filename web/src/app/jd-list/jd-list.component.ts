import { IResponse } from 'src/app/models/response.interface';
import { JdModalComponent } from '../jd-modal/jd-modal.component';
import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { AppServicesService } from 'src/app/services/app-services.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'src/app/reusable-components/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-jd-list',
  templateUrl: './jd-list.component.html',
  styleUrls: ['./jd-list.component.scss'],
})



export class JdListComponent implements OnInit {
  jobsList: any;
  jdObject: any;

  constructor(private _service: AppServicesService, private router: Router,
              private modalService: NgbModal) {}

  ngOnInit() {
    this.loadJds();
  }

  loadJds() {
    return this._service.getAllJobs().subscribe((response: any) => {
      return (this.jobsList = response.payload.data);
    });
  }

  jdUpdateModal(id: string) {
    const modalRef = this.modalService.open(JdModalComponent);
    modalRef.componentInstance.jdUpdateId = id;
  }


  deleteJd(jobObjId: string) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = true;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    modalRef.componentInstance.emitPerformRequest.subscribe(() => {
      this._service.deleteJd(jobObjId).subscribe((res: IResponse) => {
        this.loadJds();
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
        }, (error: HttpErrorResponse) => {
          modalRef.componentInstance.success = error.error.success;
          modalRef.componentInstance.message = error.error.payload.message;
    });
  });

  }


  public convertToPDF() {
    let data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, 2 * imgWidth, 2 * imgHeight);
      // pdf.setTextColor(255,0,0);
      // pdf.setFillColor(135, 124,45,0);
      // pdf.setFontType("italic");
      // pdf.text("Copyright © 2020  CyberGroup . All rights reserved.", 10, 280)
      pdf.save('jobdescription' + this.jdObject.jdId + '.pdf'); // Generated PDF
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
    const currentDate = new Date().toISOString();
    if (closingDate <= currentDate) {
      return 1;
    } else { return 0; }
  }

  navigation() {
    this.router.navigate(['/admin/job-desc']);
  }
}
