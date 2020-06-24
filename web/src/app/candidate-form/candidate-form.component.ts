import { INewResponse } from 'src/app/models/newResponse.interface';
import { CandidateService } from './../candidate/services/candidate.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IResponse } from 'src/app/models/response.interface';
import { ICandidate } from './../models/candidate.interface';
import { AppServicesService } from "../services/app-services.service";
import { Component, OnInit } from "@angular/core";
import { FileItem, FileUploader, ParsedResponseHeaders } from "ng2-file-upload";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../reusable-components/modal/modal.component"
import { Router } from "@angular/router";
import { error } from 'util';
import{JobService} from '../services/job.service'

const URL = 'http://localhost:40802/api/candidate'

@Component({
  selector: "app-candidate-form",
  templateUrl: "./candidate-form.component.html",
  styleUrls: ["./candidate-form.component.scss"],
})
export class CandidateFormComponent implements OnInit {
  numbersInYears : Array<number>
  numbersInMonths : Array<number>
  idProofTypes : any

  constructor(private modalService: NgbModal,
    private router: Router,
    private service: AppServicesService,
    private CandidateService : CandidateService,
    private jobService:JobService
  ) { 
    this.numbersInYears = Array(30).fill(0).map((x,i)=>i);
    this.numbersInMonths = Array(12).fill(0).map((x,i)=>i);
  }

  

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "file",
    allowedMimeType: ["application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf"]

  });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => { alert('File uploaded successfully'); };
    this.getIdProofType()
    this.load()
    }

    getIdProofType(){
      this.CandidateService.getIdProofTypes().subscribe((res : INewResponse)=>{
        this.idProofTypes = res.payload.data;
        
      })

    this.uploader.onSuccessItem = (item: any, response: string, status: number) => {
      let data = JSON.parse(response);
      const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

      modalRef.componentInstance.shouldConfirm = false;

      modalRef.componentInstance.success = data.success;
      modalRef.componentInstance.message = data.payload.message;

      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
      });


    }

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
    
    let data = JSON.parse(response);
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = false;
    modalRef.componentInstance.success = data.success;
    modalRef.componentInstance.message = data.payload;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    }

    this.load()
  }

  model: any = {};
  type: String;
  jdObjectId : String
  formData:FormData = new FormData();

validateApplication(applicationObj : ICandidate){
  if (applicationObj.nationality == "Indian"){
    
    if (this.idProofTypes[0].id != applicationObj.idProofTypeId ){
       return {
        result : {
          success: false,
          payload: {    
          message: "If you're Indian you have to give Aadhar No."
      }},
      }
    }
    else{
      var idNo = applicationObj.identificationNo
      var re = /^\d{4}\s\d{4}\s\d{4}$/; 
      let result = re.test(idNo);
      if (!result){
        return {
          result : {
            success: false,
            payload: {    
            message: "Enter valid Aadhar No."
        }},
        }
      }
        
      }
  }
  return {
    result : {
      success: true,
      },
  }
}

createApplication(applicationObj : ICandidate){
  let isValid = this.validateApplication(applicationObj)

  applicationObj.experience = applicationObj.experienceInYears + " years " + applicationObj.experienceInMonths + " months"
  applicationObj.file = ""
  applicationObj.createdBy = "shivani"
  applicationObj.modifiedBy = "shivani"
  applicationObj.jobId = parseInt((this.router.url.split("/")[2]).slice(6));
  
  if (isValid.result.success == true){
    this.CandidateService.createCandidate(applicationObj).subscribe(res=>{
      if (res!= null){
        this.openModal(res)
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

  openModal(res){
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
  
    modalRef.componentInstance.shouldConfirm = false;
  
    modalRef.componentInstance.success = res.success;
    modalRef.componentInstance.message = res.payload.message;
  
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
    modalRef.close();
    })
  }

  createCandidate(candidateObj: ICandidate) {
    candidateObj.experience = candidateObj.experienceInYears + " years " + candidateObj.experienceInMonths + " months"
    
    candidateObj.jobId = parseInt((this.router.url.split("/")[2]).slice(6));
    //candidateObj.jobId = parseInt( candidateObj.appliedForJdId.slice(6))
    
    if (
      candidateObj.name &&
      candidateObj.email &&
      candidateObj.identificationNo 
    ) {
      if (this.uploader.getNotUploadedItems().length != 0) {
        this.uploader.onBuildItemForm = (item, form) => {
          form.append("name", candidateObj.name);
          form.append("experience", candidateObj.experience);
          form.append("email", candidateObj.email);
          form.append("jobId", candidateObj.jobId);
          form.append("phone", candidateObj.phone);
          form.append("idProofTypeId", candidateObj.idProofTypeId);
          form.append("identificationNo", candidateObj.identificationNo);
          form.append("nationality", candidateObj.nationality);
          form.append("education", candidateObj.education);
          item.formData = candidateObj.name;
          item.formData = candidateObj.experience;
          item.formData = candidateObj.email;
          item.formData = candidateObj.jobId;
          item.formData = candidateObj.phone;
          item.formData = candidateObj.idProofTypeId;
          item.formData = candidateObj.identificationNo;
          item.formData = candidateObj.nationality;
          item.formData = candidateObj.education;
        };
        this.uploader.uploadAll();
      }
    }

    
  }
  
  load(){   
    this.type = this.router.url.split("/")[1];
    if (this.router.url.split("/")[1] == "progressTracker") {
      let applicationId = (this.router.url.split("/")[2]).slice(7);
      this.CandidateService.getApplication(applicationId).subscribe(
        (res: INewResponse) => {
          this.model = res.payload.data;
          this.model.appliedForPosition = this.model.job.jobTitle
          this.model.appliedForJdId = this.model.job.code
        },
        (error: HttpErrorResponse) => {
        }
      )}
    else if(this.router.url.split("/")[1]=="candidateForm"){  

      this.model.appliedForJdId = (this.router.url.split("/")[2]);
      let jdId = (this.model.appliedForJdId).slice(6)
      this.jobService.getJdData(jdId).subscribe((res : INewResponse)=>{
        if(res!= null){
          let jdObject = res.payload.data
          this.model.appliedForPosition = jdObject.jobTitle;
          this.jdObjectId = jdObject.code;
        }
      }, error=>{
        this.router.navigate(['/404'])
      })
    }
  }
}
