import { InterviewService } from './../services/interview.service';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'util';
import { INewResponse } from 'src/app/models/newResponse.interface';
import { CandidateService } from './../candidate/services/candidate.service';
import { ICandidate } from './../models/candidate.interface';
import { IResponse } from 'src/app/models/response.interface';
import { Router } from '@angular/router';
import { AppServicesService } from 'src/app/services/app-services.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.scss']
})

export class ProgressTrackerComponent implements OnInit {
  applicationdata : any
  type : string
  applicationStatusName : string
  noOfRounds : number

  constructor(private _route : Router, private CandidateService : CandidateService, private InterviewService : InterviewService) { }

  ngOnInit() {
    this.loadcandidateStatus()
  }

  loadcandidateStatus(){
    console.log("ind\side func")
    this.type = this._route.url.split("/")[1]
    let applicationId = parseInt(this._route.url.split("/")[2].slice(7))
    this.CandidateService.getApplication(applicationId).subscribe((res:INewResponse)=>{  
      console.log("ind\side func", res)
      if(res.result.success == false){
        this._route.navigate(['/404'])
      }
      else{
        this.applicationdata = res.result.payload.data
        this.applicationStatusName = this.applicationdata.applicationStatusType.statusName
        this.loadInterviews(this.applicationdata.job.id)
        //this.getResume(this.applicationdata.resumeId)
      }    
    }, (error : HttpErrorResponse)=>{
      console.log(error)
      this._route.navigate(['/404'])
    })
  }

  loadInterviews(jobId : number){
    console.log(this.applicationdata, "applicationData")
    this.InterviewService.getInterviews(this.applicationdata.job.id).subscribe((res : INewResponse)=>{
      this.noOfRounds = res.result.payload.data[0].noOfRounds;
    })
  }

  getResume(id : number){
    this.CandidateService.getResume(id).subscribe((res : any)=>{
      console.log(res, "resume")
      let resume = res.result.data.cv
      let file = new Blob([resume], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }

}

