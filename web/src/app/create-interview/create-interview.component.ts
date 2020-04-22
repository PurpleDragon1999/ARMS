import { Component, OnInit } from '@angular/core';
import { AppServicesService } from '../services/app-services.service';
import { Router,ActivatedRoute } from '@angular/router';
import {ICreate} from '../models/create.interface';



@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss']
})
export class CreateInterviewComponent {
  interview: ICreate = {
    jd: "",
    date: "",
    time: "",
    roundType: "",
    panelOfInterviews: "",
    noOfRounds:3
  };

  constructor(
    private AppServicesService: AppServicesService ,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  createInterview(interview:ICreate){
    console.log(interview, "interviewObj")
    let interviewObj = interview;
    this.AppServicesService.createInterview(interview).subscribe(res=>{
      if (res.status == 200){
        console.log("interview created")
        alert("interview Created")
      }
      else{
        console.log("error occurred")
        alert("some error occurred")
      }
    })

  }
}
  

