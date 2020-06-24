import { UpdateInterviewComponent } from './../update-interview/update-interview.component';
import { ScheduleInterviewComponent } from './../schedule-interview/schedule-interview.component';
import { EmailListModalComponent } from './../email-list-modal/email-list-modal.component';
import { IResponse } from 'src/app/models/response.interface';
import { JdModalComponent } from '../jd-modal/jd-modal.component';
import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { AppServicesService } from 'src/app/services/app-services.service';
import { NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'src/app/reusable-components/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import {CreateInterviewComponent} from '../create-interview/create-interview.component'
@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {
  interviewsList: any;
  jdObject: any;
  pager: any;
  searchJd: any;
  jobsList: any;
  constructor(private _service: AppServicesService, private router: Router,
              private modalService: NgbModal) {}

  ngOnInit() {
    this.loadInterviews();
  }

  loadInterviews() {
    return this._service.getAllInterviews().subscribe((response: any) => {
      this.interviewsList = response.payload.data
    });
  }

  interviewUpdateModal(id) {
    const modalRef: NgbModalRef = this.modalService.open(UpdateInterviewComponent)
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isInterview = true;
    modalRef.componentInstance.isRounds = false;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
  }

  
  deleteInterview(id) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.shouldConfirm = true;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    modalRef.componentInstance.emitPerformRequest.subscribe(() => {
      this._service.deleteInterview(id).subscribe((res: any) => {
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
        this.loadInterviews();
        }, (error: HttpErrorResponse) => {
         modalRef.componentInstance.success = error.error.success;
          modalRef.componentInstance.message = error.error.payload.message;
    });
  });
  }

  // searchInterview(character?: string, page?: number){
  //   this._service.search(character, page).subscribe(res=> {
  //     this.jobsList = res.payload.data.dataList
  //     this.pager = res.payload.data.pager
  //   });
  // }
}
