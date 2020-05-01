import { AppServicesService } from "./../services/app-services.service";
import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";

interface ICandidate {
  name: string;
  experience: number;
  email: string;
  cv: string;
  skills: string;
  selection: string;
  appliedFor: string;
}

<<<<<<< HEAD
const URL = "http://localhost:3000/api/candidate";
=======
const URL = 'http://localhost:3000/api/candidate'
>>>>>>> 252c1cf88788ac89aae0ba3ee1329c08b95aa364

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
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {};
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
