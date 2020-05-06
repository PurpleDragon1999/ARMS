import { AppServicesService } from "./../services/app-services.service";
import { Component, OnInit } from "@angular/core";
import { FileUploader, FileItem, ParsedResponseHeaders } from "ng2-file-upload";

interface ICandidate {
  name: string;
  experience: number;
  email: string;
  cv: string;
  skills: string;
  selection: string;
  appliedFor: string;
}

const URL = 'http://localhost:3000/api/candidate'

@Component({
  selector: "app-candidate-form",
  templateUrl: "./candidate-form.component.html",
  styleUrls: ["./candidate-form.component.scss"],
})
export class CandidateFormComponent implements OnInit {
  isSubmitted: Boolean = false;

  constructor(private service: AppServicesService) {}

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "file",
  });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;


    this.uploader.onSuccessItem = (item: any, response: string, status: number) => {
    console.log(item, response, status,"!!!!!!!!!")
        }
    
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
    console.log('~~~~~~~~~~~~~~~~', item,response, status,headers )
        

      };
      this.uploader.onCompleteItem = (item: any, status: any) => {};
  }
}

  model: any = {};

  createCandidate(candidateObj: ICandidate) {
    if (
      candidateObj.name &&
      candidateObj.email &&
      candidateObj.cv &&
      candidateObj.skills
    ) {
      if (this.uploader.getNotUploadedItems().length != 0) {
        this.uploader.onBuildItemForm = (item, form) => {
          form.append("name", candidateObj.name);
          form.append("experience", candidateObj.experience);
          form.append("email", candidateObj.email);
          form.append("skills", candidateObj.skills);
          item.formData = candidateObj.name;
          item.formData = candidateObj.experience;
          item.formData = candidateObj.email;
          item.formData = candidateObj.skills;
        };
        this.uploader.uploadAll();
      }
    }
  }
}
