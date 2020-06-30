import { UrltoFile } from './../../../utils/urlToFile';
import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-candidate-description',
  templateUrl: 'candidate-description.component.html',
  providers : [UrltoFile]
})
export class CandidateDescriptionComponent {
  @Input()
  data: any;

  file : any
  url: any;

  constructor(private urltoFile: UrltoFile){}

  openResume(){ 
    this.url = this.data.candidate.resume ? "data:application/" + "pdf" +";base64," +this.data.candidate.resume: null;

    this.urltoFile.urltoFile(
      this.url, 
      'abc.pdf',
      "application/octet-stream"
                ).then(file=> { 
      this.file = file;
                });
    const blob = new Blob([this.file], { type:"application/pdf" });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  } 
}
