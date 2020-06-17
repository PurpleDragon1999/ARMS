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

  flag : number = 0
  applicationdata : ICandidate
  type : string
  applicationStatusName : string

  constructor(private _route : Router, private CandidateService : CandidateService) { }

  ngOnInit() {
    this.loadcandidateStatus()
  }

  loadcandidateStatus(){
    this.type = this._route.url.split("/")[1]
    let applicationId = parseInt(this._route.url.split("/")[2].slice(7))
    this.CandidateService.getApplication(applicationId).subscribe((res:INewResponse)=>{  
      console.log(res, "resp")
      if(res.result.success == false){
        this._route.navigate(['/404'])
      }
      else{
        this.applicationStatusName = res.result.payload.data.applicationStatusType.statusName
      }    
    }, (error : HttpErrorResponse)=>{
      console.log(error)
    })
  }

}

