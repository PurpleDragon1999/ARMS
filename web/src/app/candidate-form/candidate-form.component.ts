import { ICandidate } from './../models/candidate.interface';
import { Component, OnInit } from "@angular/core";
import { FileItem, FileUploader, ParsedResponseHeaders } from "ng2-file-upload";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../reusable-components/modal/modal.component"
import { Router, ActivatedRoute, Params,NavigationEnd } from "@angular/router";
import { loadavg } from 'os';

const URL = 'http://localhost:3000/api/candidate'

@Component({
  selector: "app-candidate-form",
  templateUrl: "./candidate-form.component.html",
  styleUrls: ["./candidate-form.component.scss"],
})
export class CandidateFormComponent implements OnInit {

  constructor(private modalService : NgbModal,
              private router: Router,
              ) { }

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

    this.uploader.onSuccessItem = (item: any, response: string, status: number) => {
      console.log("successfull")
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
    console.log("error displayed")
    let data = JSON.parse(response);
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = false;

    modalRef.componentInstance.success = data.success;
    modalRef.componentInstance.message = data.payload.message;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
  
    }
    
    this.setJdId();
  
 }

  model: any = {};

  createCandidate(candidateObj: ICandidate) {
    if (
      candidateObj.name &&
      candidateObj.email &&
      candidateObj.aadhar&&
      candidateObj.file &&
      candidateObj.skills&&
      candidateObj.appliedFor
    ) {
      if (this.uploader.getNotUploadedItems().length != 0) {
        this.uploader.onBuildItemForm = (item, form) => {
          form.append("name", candidateObj.name);
          form.append("experience", candidateObj.experience);
          form.append("email", candidateObj.email);
          form.append("aadhar", candidateObj.aadhar);
          form.append("skills", candidateObj.skills);
          form.append("appliedFor", candidateObj.appliedFor);
          item.formData = candidateObj.name;
          item.formData = candidateObj.experience;
          item.formData = candidateObj.email;
          item.formData = candidateObj.aadhar;
          item.formData = candidateObj.skills;
          item.formData = candidateObj.appliedFor;
        };
        this.uploader.uploadAll();
      }
    }
  }

  setJdId(){
    this.model.appliedFor = this.router.url.split("/")[2];
     }
}
