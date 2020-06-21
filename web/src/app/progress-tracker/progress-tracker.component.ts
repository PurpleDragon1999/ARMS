import { InterviewService } from './../services/interview.service';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'util';
import { CandidateService } from './../candidate/services/candidate.service';
import { ICandidate } from './../models/candidate.interface';
import { IResponse } from 'src/app/models/response.interface';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AppServicesService } from 'src/app/services/app-services.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { switchMap } from "rxjs/operators";
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
  applicationCode : string

  constructor( private route: ActivatedRoute,private _route : Router, private CandidateService : CandidateService, private InterviewService : InterviewService) { }

  ngOnInit() {
    console.log(this.route)
    this.loadcandidateStatus()
  }
  
  loadcandidateStatus(){
    var applicationId
    this.route.params.subscribe(params=>{
      if (params.candidateId){
        applicationId = params.candidateId.slice(7)
      }
    })

    this.CandidateService.getApplication(applicationId).subscribe((res:IResponse)=>{  
      if(res.success == false){
        this._route.navigate(['/404'])
      }
      else{
        this.applicationdata = res.payload.data
        this.applicationStatusName = this.applicationdata.applicationStatusType.statusName
        this.loadInterviews(this.applicationdata.job.id)
        //this.getResume(this.applicationdata.resumeId)
      }    
    }, (error )=>{
      console.log("inside error")
      this._route.navigate(['/404'])
    })
  }

  loadInterviews(jobId : number){
   
    this.InterviewService.getInterviews(this.applicationdata.job.id).subscribe((res : IResponse)=>{
      this.noOfRounds = res.payload.data[0].noOfRounds;
    })
  }

  getResume(id : number){
    this.CandidateService.getResume(id).subscribe((res : any)=>{ 
      let resume = res.result.data.cv
      let file = new Blob([resume], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }
}

