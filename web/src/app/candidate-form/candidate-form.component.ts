import {UrltoFile} from './../utils/urlToFile'
import { IResponse } from './../models/response.interface';
import { JobService } from './../services/job.service';
import { CandidateService } from './../candidate/services/candidate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ICandidate } from './../models/candidate.interface';
import { AppServicesService } from "../services/app-services.service";
import { Component, OnInit, ViewChild} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../reusable-components/modal/modal.component"
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-candidate-form",
  templateUrl: "./candidate-form.component.html",
  styleUrls: ["./candidate-form.component.scss"],
  providers : [UrltoFile]
})
export class CandidateFormComponent implements OnInit {
  numbersInYears : Array<number>
  numbersInMonths : Array<number>
  idProofTypes : any
  model: any = {};
  type: String;
  file : any
  resumeDetails : any

  constructor(private modalService: NgbModal,
    private router: Router,
    private service: AppServicesService,
    private CandidateService : CandidateService,
    private jobService: JobService,
    private route : ActivatedRoute,
    private urltoFile : UrltoFile

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
      if (this.type == "candidateForm"){
        var jobId 
        this.route.params.subscribe(params=>{
          if (params.jobId){
            jobId = params.jobId.slice(6)
          }
        })
        this.service.getJdData(jobId).subscribe((res : IResponse)=>{
         
          if (res.success == true){
            this.model.appliedForJdId = res.payload.data.code;
            this.model.appliedForPosition = res.payload.data.jobTitle;
          }
          else{
            this.router.navigate(['error', 404]);
          }
        },
        (error : HttpErrorResponse)=>{
          this.router.navigate(['error', 500]);
        })
        
      }
      else if (this.type == "progressTracker"){
        var applicationId 
        this.route.params.subscribe(params=>{
          if (params.candidateId){
            applicationId = params.candidateId.slice(7)
          }
        })
        this.CandidateService.getApplication(applicationId).subscribe((res:IResponse)=>{
          if (res.success == true){
          let application = res.payload.data
          this.model.id = applicationId
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
          this.getResume(applicationId)
          }
          else{
            this.router.navigate(['error', 404]);
          }

        },(error : HttpErrorResponse)=>{
          console.log(error)
          this.router.navigate(['error', 500]);
        })
        
      }
    } 

    openResume(){
        let fileType = this.resumeDetails.name.split(".")[1];
        const blob = new Blob([this.file], { type:"application/" + fileType });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    getResume(id : number){
      this.CandidateService.getResume(id).subscribe((res : IResponse)=>{
        this.resumeDetails = res.payload.data[0]
        this.model.cv = this.resumeDetails.cv ? "data:application/" + this.resumeDetails.name.split(".")[1] +";base64," +this.resumeDetails.cv: null;
        this.urltoFile.urltoFile(
        this.model.cv,
        this.resumeDetails.name,
        "application/octet-stream"
                  ).then(file=> {
        this.file = file;
                  });
      })
    }

    getIdProofType(){
      this.service.getAllIdProofTypes().subscribe((res : any)=>{
        this.idProofTypes = res.payload.data
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
      }}
  return {
      success: true,
     }
}

  createApplication(application ){
    let applicationObj = application.value;
    let isValid = this.validateApplication(applicationObj)

    let experience = this.model.experienceInYears + " years " + this.model.experienceInMonths + " months"
    let jobId = (this.model.appliedForJdId)[6];
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
    
      this.CandidateService.createCandidate(formData).subscribe((res : IResponse)=>{
        
        if (res != null){
          this.openModal(res)
          if (res.success == true){
            application.resetForm()
            
          }
        } },
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
