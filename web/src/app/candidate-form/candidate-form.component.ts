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


const URL = 'http://localhost:40802/api/candidate'

@Component({
  selector: "app-candidate-form",
  templateUrl: "./candidate-form.component.html",
  styleUrls: ["./candidate-form.component.scss"],
})
export class CandidateFormComponent implements OnInit {
  numbersInYears : Array<number>
  numbersInMonths : Array<number>
  idProofTypes : Array<object>

  constructor(private modalService: NgbModal,
    private router: Router,
    private service: AppServicesService,
    private CandidateService : CandidateService
  ) { 
    this.numbersInYears = Array(30).fill(0).map((x,i)=>i);
    this.numbersInMonths = Array(12).fill(0).map((x,i)=>i);
  }

  

  public uploader: FileUploader = new FileUploader({
    url: URL,
    headers: [{ name: 'Authorization', value: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTE5Mjg5MDAsImV4cCI6MTU5MTk1NzcwMCwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJlMmM4MjdmOC1lMzk0LTQ1ZDctOTZiZi04OTVjMDRlZWZhY2YiLCJhdXRoX3RpbWUiOjE1OTE5Mjg5MDAsImlkcCI6ImxvY2FsIiwibmFtZSI6Ik1heXVyaSIsImxhc3RfbmFtZSI6IkJoYWRhbmUiLCJlbWFpbCI6Im1heXVyaS5iaGFkYW5lQGN5Z3JwLmNvbSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhY2NvdW50IiwibG1zIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInBhc3N3b3JkIl19.vMVJj42Njx1wBBxFLomuZgSwIU2EtBq6q0zFFusMXpywV1dTJtXAQaFQcrF0OrUGBzmR3B0_cawW_VH7KeUHswXeAlq-QtSycobF03haLv941RrJw5Ktpo2Uv__JPj3OTg_Xsao4p4hjZ_u23czvwzqW0R_RVHhuFkvt-cyYW7KPP6AX6DSBX_tgrGtnA7LGyeVVCgf0-Zvj1eHMNrnn4NPtZ1CIAAQezLiFSc3dIqtIwmxPvNXVvM0_rgZVqwGj6WjZI0L7fdBbTgSjD2L76l-5RnXGfd1TOJ_5IOdBk2rswLrLiqgrNl76Nj2mvyW7LyiRnJzU3m5PzH7rnwDpod7SsjUBa2kV90CkWqDoCzo12ZIXnPG5FtYD3ffBLDMM7RfNHR019mJLf6a1H0WzXFFe0tjo2UScReZtEGvyqdVnv5LQU0Hu-9vd8Ss_GCGfJFpFbFs5Doj44zicAZiBnz8GfzBBtRmNceG3VGD3ohwC2WwzoOmkpfSe5eQVRsdakXOkeeimhtCzwoCdt_C3uzWWO_t3TmApYjH7_PfzvpM2C8JkFPQ7iylK1OWwptgWcBTi9VhlSfdm5rFwZq5QiudF6o6WdyPLzF5vxC-RLLuqY_tZASUKkY6x0yrilhUj9xVsf7tEs2UHkS9rlC7AMsidaHM6lws1PrKaMytiWEg' }],
    itemAlias: "file",
    allowedMimeType: ["application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf"]

  });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => { console.log('ImageUpload:uploaded:', item, status, response); alert('File uploaded successfully'); };
    this.getIdProofType()
    }

    getIdProofType(){
      this.CandidateService.getIdProofTypes().subscribe((res : INewResponse)=>{
        this.idProofTypes = res.result.payload.data;
        console.log(this.idProofTypes, "types")
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
    console.log(response, "response")
    let data = JSON.parse(response);
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = false;
    modalRef.componentInstance.success = data.success;
    modalRef.componentInstance.message = data.payload;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    }

    //this.load()
  }

  model: any = {};
  type: String;
  jdObjectId : String

  createCandidate(candidateObj: ICandidate) {
    candidateObj.experience = candidateObj.experienceInYears + " years " + candidateObj.experienceInMonths + " months"
    console.log(parseInt((this.router.url.split("/")[2]).slice(6)));
    candidateObj.jobId = parseInt((this.router.url.split("/")[2]).slice(6));
    //candidateObj.jobId = parseInt( candidateObj.appliedForJdId.slice(6))
    console.log(candidateObj, "obj");
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
        console.log(this.uploader, "uploader")
      }
    }

    
  }
  
  load(){   
    this.type = this.router.url.split("/")[1];
    if (this.router.url.split("/")[1] == "progressTracker") {
      let candidateId = this.router.url.split("/")[2];
      this.service.getCandidate(candidateId).subscribe(
        (res: IResponse) => {
          this.model = res.payload.data;
          this.model.appliedForPosition = this.model.appliedFor.jdTitle
          this.model.appliedForJdId = this.model.appliedFor.jdId
        },
        (error: HttpErrorResponse) => {
        }
      )}
    else if(this.router.url.split("/")[1]=="candidateForm"){     
      this.model.appliedForJdId = this.router.url.split("/")[2];
      this.service.getJdData(this.model.appliedForJdId).subscribe((res : IResponse)=>{
        
        if(res.success==false){
        this.router.navigate(['/404'])
        }
        else{
        let jdObject = res.payload.data
        this.model.appliedForPosition = jdObject.jdTitle;
        this.jdObjectId = jdObject._id;
       }
      })
    }
  }
}
