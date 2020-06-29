import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../reusable-components/modal/modal.component";
import { AppServicesService } from "../services/app-services.service";
import { IAssessment } from './../models/assessment.interface';
import { CandidateService } from '../candidate/services/candidate.service';
import { ICandidate } from '../models/candidate.interface';
import { IResponse } from '../models/response.interface';

@Component({
  selector: "app-hr-interview-assessement",
  templateUrl: "./hr-interview-assessement.component.html",
  styleUrls: ["./hr-interview-assessement.component.scss"],
})
export class HrInterviewAssessementComponent implements OnInit {
  constructor(private AppServicesService: AppServicesService,
    private router: Router,
    private modalService: NgbModal,
    private candidateService: CandidateService) { }

  candidates: ICandidate[];

  ngOnInit() {
  }

  assessment: any = {}

  createAssessment(assessment: IAssessment) {
    let assessmentObj = assessment;
    this.AppServicesService.createAssessment(assessment).subscribe((res: any) => {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.shouldConfirm = false;
      modalRef.componentInstance.success = res.body.success;
      modalRef.componentInstance.message = res.body.payload.message;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
      });
    },

      (error: HttpErrorResponse) => {
        const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });

      }
    );
  }

}

