
import { Component, OnInit,Input } from "@angular/core";
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
  constructor(
    private AppServicesService: AppServicesService,
    private router: Router,
    private modalService : NgbModal,
  ) {}
  @Input() interviewId
  formType:string
  ngOnInit() {
    this.formType="create"
    console.log(this.formType);
    console.log(this.interviewId);
    this.loadInterview(this.interviewId);
    
  }
  dateNew:any;
  interview: any = {}
  loadInterview(interviewId){
    return this. AppServicesService.getInterviewById(interviewId).subscribe((response: any) => {
      this.interview = response.payload.data
      console.log(this.interview);
      if(this.interview.length!=0)
      this.formType="update"
      console.log(this.formType);
      this.dateNew=this.interview[0].date.substring(0,10);
      console.log("date format",this.dateNew);
     });
  }
  createInterview(interview: ICreate) {
    let interviewObj = interview;
    interviewObj.jdId = "CYGJID" + interviewObj.jdId
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
