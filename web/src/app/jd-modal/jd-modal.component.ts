import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppServicesService } from "../services/app-services.service";
import { ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { IResponse } from "src/app/models/response.interface";
import { Router } from "@angular/router";
import { ModalComponent } from "../reusable-components/modal/modal.component";
import * as jsPDF from "jspdf";
import { jobDescription } from "../models/jobDescription.interface";
import html2canvas from "html2canvas";
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-jd-modal',
  templateUrl: './jd-modal.component.html',
  styleUrls: ['./jd-modal.component.scss']
})
export class JdModalComponent implements OnInit {

  @Input()
  jdUpdateId : string

  constructor( private formBuilder: FormBuilder,
    private _service: AppServicesService,
    private router: Router,
    private modalService:NgbModal,
    private _router:Router) {}


    @Output()
    closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  
    @ViewChild("jdId", { static: false }) jdId: ElementRef;
    @ViewChild("jdTitle", { static: false }) jdTitle: ElementRef;
    @ViewChild("openingDate", { static: false }) openingDate: ElementRef;
    @ViewChild("closingDate", { static: false }) closingDate: ElementRef;
    @ViewChild("jobProfileDescription", { static: false }) jobProfileDescription: ElementRef;
    @ViewChild("skills", { static: false }) skills: ElementRef;
    @ViewChild("jobType", { static: false }) jobType: ElementRef;
    @ViewChild("eligibilityCriteria", { static: false })
    eligibilityCriteria: ElementRef;
    @ViewChild("location", { static: false }) location: ElementRef;
    @ViewChild("salary", { static: false }) salary: ElementRef;
    @ViewChild("vacancies", { static: false }) vacancies: ElementRef;
    @ViewChild("content", { static: true }) content: ElementRef;
    
    jobArray:any;
    eligibilityCriteriaOptions: String;
    locationOptions: String;
    jobTypeOptions: String;
    jobListingForm: FormGroup;
    submitted = false;
    jdFormObject: jobDescription;
    data: jobDescription;
    jdForm: FormGroup;
    selectChangeHandlerEligibilityCriteria(event: any) {
      this.eligibilityCriteriaOptions = event.target.value;
    }
  
    selectChangeHandlerLocation(event: any) {
      this.locationOptions = event.target.value;
    }
  
    selectChangeHandlerJobType(event: any) {
      this.jobTypeOptions = event.target.value;
    }
    ngOnInit() {
      this.loadJobData(this.jdUpdateId);
      this.jobListingForm = this.formBuilder.group({
        jobId: ["", Validators.required],
        jobTitle: ["", Validators.required],
        openingDate: ["", Validators.required],
        closingDate: ["", Validators.required],
        jobDescription: ["", Validators.required],
        skills: ["", Validators.required],
        jobType: ["", Validators.required],
        eligibilityCriteria: ["", Validators.required],
        location: ["", Validators.required],
        salary: ["", Validators.required],
        vacancies: ["", Validators.required],
      });
    }
    get formControls() {
      return this.jobListingForm.controls;
    }
    error: any = { isError: false, errorMessage: "" };
  
    onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.jobListingForm.invalid) {
        return;
      }
    }

    loadJobData(Id:string){
      this._service.getJobsById(Id).subscribe((res:any) =>{
        if(res.success){
          this.jobArray= res.payload.data;
          this.setJobData();
        }
      });
    }
    setJobData(){
      this.jdId = this.jobArray.jdId;
      this.jdTitle = this.jobArray.jdTitle;
      this.openingDate = this.jobArray.openingDate;
      this.closingDate = this.jobArray.closingDate;
      this.jobProfileDescription = this.jobArray.jobProfileDescription;
      this.skills = this.jobArray.skills;
      this.jobType = this.jobArray.jobType;
      this.eligibilityCriteria = this.jobArray.eligibilityCriteria;
      this.location = this.jobArray.location;
      this.salary = this.jobArray.salary;
      this.vacancies = this.jobArray.vacancies;
    }

    sendUpdateRequest(jdFormObject: any ){
      console.log(jdFormObject.value,"YYEEEHHHHHHHH")
   
      this._service.updateJobInfo(jdFormObject,jdFormObject.jobId).subscribe((res:any) =>  {
        if(res.success == 200){
          this. jobArray= res.payload.data;
          this.jdFormData();
            setTimeout(()=> { 
              this._router.navigate(["/edit"]);
            }, 1000);
        }
        else if(res.status == 401){
          this._router.navigate(['/login']);
        }
      });
    }
  
    jdFormData() {
      this.jdFormObject = {
        jdId: `CYGJID${this.jdId.nativeElement.value}`,
        jdTitle: this.jdTitle.nativeElement.value,
        openingDate: this.openingDate.nativeElement.value,
        closingDate: this.closingDate.nativeElement.value,
        jobProfileDescription: this.jobProfileDescription.nativeElement.value,
        skills: this.skills.nativeElement.value,
        jobType: this.jobType.nativeElement.value,
        eligibilityCriteria: this.eligibilityCriteria.nativeElement.value,
        location: this.location.nativeElement.value,
        salary: this.salary.nativeElement.value,
        vacancies: this.vacancies.nativeElement.value,
      };

      
      if (
        new Date(this.jobListingForm.controls["closingDate"].value) <
        new Date(this.jobListingForm.controls["openingDate"].value)
      ) {
        this.error = {
          isError: true,
          errorMessage: "Closing Date cannot be before Opening date",
        };
        return;
      }
      this._service.jdFormData(this.jdFormObject).subscribe((res: any) => {
        console.log(res, 'response');
        const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = res.body.success;
        modalRef.componentInstance.message = res.body.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });
        this.modalClose(true);
      },
      (error: HttpErrorResponse) => {
        console.log(error, 'response');
        const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });
        this.data = error.error.payload.data;
        this.router.navigate(["/jd-pdf", this.data.jdId]);
      }
      ); 
    
   }
    modalClose(rerender: boolean): void {
      this.closeModal.emit(rerender);
  
  }
  
  
}
