import { IResponse } from 'src/app/models/response.interface';
import { Component, OnInit } from '@angular/core';
import { IModelForPagination } from 'src/app/models/modelPagination.interface';
import { InterviewService } from '../services/interview.service';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "src/app/reusable-components/modal/modal.component";
import { HttpErrorResponse } from '@angular/common/http';
import { IPager } from '../models/pager.interface';
@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {
  columns: Array<String> = [];
  pager: IPager;
  interviews:any=[];
  constructor(
   private interviewService:InterviewService,
   private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.searchInterview({ page: 1, character: '' });
  }
  searchInterview(event: IModelForPagination) {
      this.interviewService.searchInterview(event.page, event.character).subscribe((res) => {
      this.interviews = res.payload.data.dataList;
      this.columns = ['jdObjectId', "date","noOfRounds"];
      this.pager = res.payload.data.pager;
    });
  }
  deleteInterview(interview:any) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = true;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    modalRef.componentInstance.emitPerformRequest.subscribe(() => {
      this.interviewService.deleteEmployee(interview._id).subscribe((res: IResponse) => {
        this.searchInterview({ page: this.pager.currentPage, character: '' });
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
      }, (error: HttpErrorResponse) => {
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
      });
    });
  }

}
