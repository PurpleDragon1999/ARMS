import { EmailListModalComponent } from './../email-list-modal/email-list-modal.component';
import { IResponse } from 'src/app/models/response.interface';
import { JdModalComponent } from '../jd-modal/jd-modal.component';
import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { AppServicesService } from 'src/app/services/app-services.service';
import { NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'src/app/reusable-components/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {
  interviewsList: any;
  jdObject: any;
  pager: any;

  constructor(private _service: AppServicesService, private router: Router,
              private modalService: NgbModal) {}

  ngOnInit() {
    this.loadInterviews();
  }

  loadInterviews() {
    return this._service.getAllInterviews().subscribe((response: any) => {
      this.interviewsList = response.payload.data
      console.log(this.interviewsList);
    });
  }

  jdUpdateModal(id: string) {
    const modalRef: NgbModalRef = this.modalService.open(JdModalComponent)
    modalRef.componentInstance.jdUpdateId = id;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
  }

  sendBulkEmail(jobObjId: string) {
    const modalRef: NgbModalRef = this.modalService.open(EmailListModalComponent);
    modalRef.componentInstance.jdObjId = jobObjId;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
  }

  deleteInterview(interviewObjId: string) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = true;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    modalRef.componentInstance.emitPerformRequest.subscribe(() => {
      this._service.deleteInterview(interviewObjId).subscribe((res: IResponse) => {
       // this.loadInterviews();
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
        }, (error: HttpErrorResponse) => {
          modalRef.componentInstance.success = error.error.success;
          modalRef.componentInstance.message = error.error.payload.message;
    });
  });
  }

  downloadPdf(jdId) {
   this.router.navigate(["/jd-pdf", jdId]);
  }

  datecheck(closingDate) {
    const currentDate = new Date().toISOString();
    if (closingDate <= currentDate) {
      return 1;
    } else { return 0; }
  }

  // searchInterview(character?: string, page?: number){
  //   this._service.search(character, page).subscribe(res=> {
  //     this.jobsList = res.payload.data.dataList
  //     this.pager = res.payload.data.pager
  //   });
  // }
}
