import { JobService } from './../services/job.service';
import { CandidateService } from './../candidate/services/candidate.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IResponse } from 'src/app/models/response.interface';
import { ICandidate } from './../models/candidate.interface';
import { AppServicesService } from "../services/app-services.service";
import { Component, OnInit, Input } from "@angular/core";
import { FileItem, FileUploader, ParsedResponseHeaders } from "ng2-file-upload";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../reusable-components/modal/modal.component"
import { Router } from "@angular/router";
import { error } from 'util';

@Component({
  selector: "app-candidate-form",
  templateUrl: "./candidate-form.component.html",
  styleUrls: ["./candidate-form.component.scss"],
})
export class CandidateFormComponent implements OnInit {
  numbersInYears : Array<number>
  numbersInMonths : Array<number>
  idProofTypes : any
  model: any = {};
  type: String;
  file : any
  jdObjectId : String
  
  @Input()
  data: ICandidate;

  constructor(private modalService: NgbModal,
    private router: Router,
    private service: AppServicesService,
    private CandidateService : CandidateService,
    private jobService: JobService
  ) { 
    this.numbersInYears = Array(30).fill(0).map((x,i)=>i);
    this.numbersInMonths = Array(12).fill(0).map((x,i)=>i);
  }

  ngOnInit() {
    this.loadJdData()
    this.getIdProofType()    
    }

    loadJdData(){
      this.type = this.router.url.split("/")[1];
      var jobId = parseInt(this.router.url.split("/")[2].slice(6))
      if (this.type == "candidateForm"){
        
        this.service.getJdData(jobId).subscribe((res : IResponse)=>{
          console.log(res, "res")
          if (res.success == true){
            this.model.appliedForJdId = res.payload.data.code;
            this.model.appliedForPosition = res.payload.data.jobTitle;
          }
          else{
            this.router.navigate(['/404']);
          }
        },
        (error : HttpErrorResponse)=>{
          console.log(error, "error!!!!!!!")
          this.router.navigate(['/404']);
        })
      }
      else if (this.type == "progressTracker"){
        var applicationId = parseInt(this.router.url.split("/")[2].slice(7))
        this.CandidateService.getApplication(applicationId).subscribe((res:IResponse)=>{
          console.log(res, "candidatw from")
          if (res.success == true){
            
          let application = res.payload.data
          this.model.appliedForJdId = application.job.code;
          this.model.appliedForPosition = application.job.jobTitle;
          this.model.name = application.candidate.name;
          this.model.email = application.candidate.email
          this.model.phone = application.candidate.phone
          this.model.nationality = application.candidate.nationality
          this.model.idProofTypeId = application.candidate.idProofTypeId
          this.model.identificationNo = application.candidate.identificationNo;
          this.model.education = application.education
          this.model.experienceInYears = (application.experience).split(" ")[0]
          this.model.experienceInMonths = (application.experience).split(" ")[2]
          }
          else{
            this.router.navigate(['/404']);
          }

        },(error : HttpErrorResponse)=>{
          console.log(error)
          this.router.navigate(['/404']);
        })

      }
    }

    getIdProofType(){
      this.service.getAllIdProofTypes().subscribe((res : IResponse)=>{
        this.idProofTypes = res.payload.data;
        
      })
    }

    uploadResume(event){
      if (event.target.files.length > 0) {
        this.file = event.target.files[0];
      }
    }

validateApplication(applicationObj : ICandidate){
  
  if (applicationObj.nationality == "Indian"){
    
    if (this.idProofTypes[0].id != applicationObj.idProofTypeId ){
       return {
        success: false,
        payload: {    
          message: "If you're Indian you have to give Aadhar No."
      }}
    }
    else{
      var idNo = applicationObj.identificationNo
      var re = /^\d{4}\s\d{4}\s\d{4}$/; 
      let ans = re.test(idNo);
      if (!ans){
        return {
          success: false,
          payload: {    
            message: "Enter valid Aadhar No."
        }}
      }
        
      }
  }
  return {
      success: true,
     }
}

createApplication(application ){
  let applicationObj = application.value;
  let isValid = this.validateApplication(applicationObj)

  let experience = this.model.experienceInYears + " years " + this.model.experienceInMonths + " months"
  let jobId = (this.model.appliedForJdId).slice(6);

  console.log(this.model, "model")
  var formData = new FormData();
  formData.append("name", this.model.name)
  formData.append("education", this.model.education)
  formData.append("email", this.model.email)
  formData.append("phone", this.model.phone)
  formData.append("experience", experience)
  formData.append("nationality", this.model.nationality)
  formData.append("idProofTypeId", this.model.idProofTypeId)
  formData.append("identificationNo", this.model.identificationNo)
  formData.append("jobId", jobId)  
  formData.append("cv", this.file) 
  formData.append("createdBy", "employee")
  formData.append("modifiedBy", "employee")
 
  if (isValid.success == true){
    console.log("inside if")
    this.CandidateService.createCandidate(formData).subscribe(res=>{
      
      if (res != null){
        this.openModal(res)
        if (res.success == true){
          application.resetForm()
        }
      }
      
    },
    error=>{
      console.log(error)
    })
  }
  else{
    this.openModal(isValid);
  }

}

  openModal(res ){
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
  
    modalRef.componentInstance.shouldConfirm = false;
  
    modalRef.componentInstance.success = res.success;
    modalRef.componentInstance.message = res.payload.message;
  
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
    modalRef.close();
    })
  }
}
