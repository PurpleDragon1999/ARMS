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
  candidatedata : ICandidate

  constructor(private _service : AppServicesService, private _route : Router) { }

  ngOnInit() {
    //progressTrackerDemo.init();
    this.loadcandidateStatus()
  }

  loadcandidateStatus(){
    let candidateId = this._route.url.split("/")[2]
    this._service.getCandidate(candidateId).subscribe((res:IResponse)=>{  
      if(res.success == false){
        this._route.navigate(['/404'])
      }
      else{
        let candidateData = res.payload.data
        this.flag = candidateData.flag 
      }    
    })
  }

}

