import { ScheduleInterviewComponent } from "./../schedule-interview/schedule-interview.component";
import { EmailListModalComponent } from "./../email-list-modal/email-list-modal.component";
import { IResponse } from "src/app/models/response.interface";
import { JdModalComponent } from "../jd-modal/jd-modal.component";
import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { AppServicesService } from "src/app/services/app-services.service";
import {
  NgbModal,
  NgbModalRef,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ModalComponent } from "src/app/reusable-components/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { CreateInterviewComponent } from "../create-interview/create-interview.component";
@Component({
  selector: "app-interview-list",
  templateUrl: "./interview-list.component.html",
  styleUrls: ["./interview-list.component.scss"],
})
export class InterviewListComponent implements OnInit {
  interviewsList: any;
  jdObject: any;
  pager: any;
  searchJd: any;
  jobsList: any;
  constructor(
    private _service: AppServicesService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadInterviews();
  }

  loadInterviews() {
    return this._service.getAllInterviews().subscribe((response: IResponse) => {
      this.interviewsList = response.payload.data
    });
  }
  appliedCandidates(jobId:number){
    let data = this._service.tokenDecoder();
    if(data!=null){
      var role=data.role;
    }
      if(role=="Employee"){
         this.router.navigate(['employee/candidate',jobId]);
      }else{
         this.router.navigate(['admin/candidate',jobId]);
     }
    
    }

  interviewUpdateModal(id) {
    const modalRef: NgbModalRef = this.modalService.open(
      CreateInterviewComponent
    );
    modalRef.componentInstance.interviewId = id;
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
      this._service.deleteInterview(id).subscribe(
        (res: any) => {
          this.loadInterviews();
          modalRef.componentInstance.success = res.success;

          modalRef.componentInstance.message = res.payload.message;
        },
        (error: HttpErrorResponse) => {
          modalRef.componentInstance.success = error.error.success;
          modalRef.componentInstance.message = error.error.payload.message;
        }
      );
    });
  }

  // searchInterview(character?: string, page?: number){
  //   this._service.search(character, page).subscribe(res=> {
  //     this.jobsList = res.payload.data.dataList
  //     this.pager = res.payload.data.pager
  //   });
  // }
}
