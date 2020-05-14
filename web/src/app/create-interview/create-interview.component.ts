
import { Component, OnInit } from "@angular/core";
import { AppServicesService } from "../services/app-services.service";
import { Router} from "@angular/router";
import { ICreate } from "../models/create.interface";
import { IResponse} from "../models/response.interface";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../reusable-components/modal/modal.component";
import { HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: "app-create-interview",
  templateUrl: "./create-interview.component.html",
  styleUrls: ["./create-interview.component.scss"],
})
export class CreateInterviewComponent implements OnInit {
  // interview: ICreate = {
  //   jdId: "",
  //   jd: "",
  //   date: "",
  //   time: "",
  //   venue:"",
  //   noOfRounds: 5,
  // };

  constructor(
    private AppServicesService: AppServicesService,
    private router: Router,
    private modalService : NgbModal,
  ) {}

  ngOnInit() {}
  interview: any = {}

  createInterview(interview: ICreate) {
    let interviewObj = interview;
    this.AppServicesService.createInterview(interview).subscribe((res: any) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = res.body.success;
        modalRef.componentInstance.message = res.body.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        
        });
    },
    
      (error: HttpErrorResponse) => {
        console.log(error, "response");
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
