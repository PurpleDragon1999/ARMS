import { MinDateService } from './../utilities/min-date.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InterviewService } from './../services/interview.service';
import { AppServicesService } from "../services/app-services.service";
import { Router} from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../reusable-components/modal/modal.component";
import { HttpErrorResponse} from "@angular/common/http";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-update-interview',
  templateUrl: './update-interview.component.html',
  styleUrls: ['./update-interview.component.scss']
})
export class UpdateInterviewComponent implements OnInit {

  constructor(
    private service: InterviewService,
    private modalService : NgbModal,
    private minDateService:MinDateService
  ) {}

  ngOnInit() {
    this.getLocation();
    this.getRoundTypes();
    this.onDisplayInterview(this.id);
    this.onDisplayRounds(this.id,this.append);  
    this.minimumDate=this.minDateService.setMinimumDate();
  }

  interview:any={
    jobDescription: {},
    round:[{
    }
    ]
  }
  minimumDate:string;

  updateObj:any={}

  RoundType: any[]=[
  ]

  Location: any[]=[
  ]

  @Input()
  isInterview: boolean;

  @Input()
  isRounds: boolean;

  @Input()
  id: number;

  @Input()
  append: number =1;

  @Input()
  roundID: number;

  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  number: number = this.interview.roundNumber;


  onOptionsSelected(value){
    this.number = value;
  }

  getLocation(){
    this.service.getLocation().subscribe((res:any) => {
      this.Location = res.payload.data;
    })
  }

  getRoundTypes(){
    this.service.getRoundTypes().subscribe((res:any) => {
      this.RoundType = res.payload.data;
    })
  }

  onDisplayInterview(id){
    this.service.getInterview(id).subscribe((res:any)=>{
      this.interview=res.payload.data;
      this.interview.jobTitle=this.interview.jobDescription.jobTitle;
      this.interview.date=this.interview.date.slice(0,10);
      this.number= this.interview.noOfRounds;
    })
  }

  onDisplayRounds(id, append){
    this.service.getRounds(id, append).subscribe((res:any)=>{
      let round = res.payload.data;
      for (let index=0; index<this.number; index++){
        this.interview.round = round;
        this.interview.round[index].roundNumber = round[index].roundNumber;
        this.interview.round[index].roundDate = round[index].roundDate.slice(0,10);
        this.interview.round[index].roundTime = round[index].roundTime;
        this.interview.round[index].roundType = round[index].roundType.id;
        this.interview.round[index].id = round[index].id;  
      }
    },
    (error: HttpErrorResponse) => {
      
        })
  }

  performUpdate(formValue){
    if(this.isInterview){
      this.updateObj.JobId = formValue.jobId;
      this.updateObj.Date = formValue.date;
      this.updateObj.Time = formValue.time;
      this.updateObj.Venue = formValue.venue;
      this.updateObj.NoOfRounds = formValue.noOfRounds;
      
      this.service.updateInterview(this.id, this.updateObj).subscribe((res:any) => {
        console.log(res);
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();        
          });
        },
      
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
    if(this.isRounds){
      let updateRound=[];
      for (let index =0; index<this.number; index++){
        updateRound.push({
          RoundNumber: formValue[`roundNumber_${index}`],
          RoundTypeId: formValue[`roundType_${index}`],
          RoundDate: formValue[`roundDate_${index}`],
          RoundTime: formValue[`roundTime_${index}`]
        })
      }
      this.updateObj.Round = updateRound;
      this.service.updateRound(this.id, this.roundID, this.updateObj).subscribe((res:any) => {
      const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
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

  // modalClose(rerender: boolean): void {
  //   this.closeModal.emit(rerender);
  // }
  

}
