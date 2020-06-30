import { BufferToPdf } from './../utils/bufferToPdf';
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
        this._route.navigate(['error', 404])
      }
      else{
        this.applicationdata = res.payload.data
        this.loadInterviews(this.applicationdata.job.id)
        this.applicationStatusName = this.applicationdata.applicationStatusType.statusName
      }    
    }, (error )=>{
      this._route.navigate(['error', 404])
    })
  }

  loadInterviews(jobId : number){
    this.InterviewService.getInterviews(this.applicationdata.job.id).subscribe((res : IResponse)=>{
      this.noOfRounds = res.payload.data[0].noOfRounds;
    })
  }
}

