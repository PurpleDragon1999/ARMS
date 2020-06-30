import { EnvVarService } from './../utilities/env-var.service';
import { MinDateService } from "./../utilities/min-date.service";
import { InterviewService } from "./../services/interview.service";
import { Component, OnInit, Input } from "@angular/core";
import { AppServicesService } from "../services/app-services.service";
import { Router } from "@angular/router";
import { ICreate } from "../models/create.interface";
import { IResponse } from "../models/response.interface";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../reusable-components/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-create-interview",
  templateUrl: "./create-interview.component.html",
  styleUrls: ["./create-interview.component.scss"],
})
export class CreateInterviewComponent implements OnInit {
  constructor(
    private AppServicesService: AppServicesService,
    private service: InterviewService,
    private router: Router,
    private modalService: NgbModal,
    private minDateService: MinDateService,
    private _env: EnvVarService
  ) {}

  ngOnInit() {
    this.getLocation();
    this.getRoundTypes();
    this.minimumDate = this.minDateService.setMinimumDate();
  }
  minimumDate: string;
  interview: any = {};
  interviewObj: any = {};
  formType: any;

  RoundType: any[] = [];

  Location: any[] = [];

  number: number;
  location: string;

  onOptionsSelected(value) {
    this.number = value;
  }

  getLocation() {
    this.service.getLocation().subscribe((res: any) => {
      this.Location = res.payload.data;
    });
  }

  getRoundTypes() {
    this.service.getRoundTypes().subscribe((res: any) => {
      this.RoundType = res.payload.data;
    });
  }
  i: any;
  createInterview(interview: any) {
    let round = [];
    for (let index = 0; index < this.number; index++) {
      round.push({
        RoundNumber: interview[`roundNumber_${index}`],
        RoundTypeId: interview[`roundType_${index}`],
        RoundDate: interview[`roundDate_${index}`],
        RoundTime: interview[`roundTime_${index}`],
      });
    }
    this.interviewObj.JobId = interview.jobId;
    this.interviewObj.Date = interview.date;
    this.interviewObj.Time = interview.time;
    this.interviewObj.Venue = interview.venue;
    this.interviewObj.NoOfRounds = interview.noOfRounds;
    this.interviewObj.Round = round;

    this.service.createInterview(this.interviewObj).subscribe(
      (res: any) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = res.body.success;
        modalRef.componentInstance.message = res.body.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
          if (res.status == 200) {
            let role = this.AppServicesService.tokenDecoder().role;
            if (role === this._env.ADMIN) {
              this.router.navigate([
                `/admin/interview/select-panel/${res.body.payload.data.jobId}/${res.body.payload.data.interviewId}`,
              ]);
            } else if (role === this._env.SUPERUSER) {
              this.router.navigate([
                `/superuser/interview/select-panel/${res.body.payload.data.jobId}/${res.body.payload.data.interviewId}`,
              ]);
            }
          }
        });
      }

      // (error: HttpErrorResponse) => {
      //   const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
      //   modalRef.componentInstance.shouldConfirm = false;
      //   modalRef.componentInstance.success = error.error.success;
      //   modalRef.componentInstance.message = error.error.payload.message;
      //   modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      //     modalRef.close();
      //     });
      //   }
    );
  }
}
