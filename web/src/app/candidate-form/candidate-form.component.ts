import { AppServicesService } from './../services/app-services.service';
import { Component, OnInit } from '@angular/core';

interface ICandidate{
    name: string,
    experience: number,
    email: string,
    cv: string,
    skills: string,
    selection: string,
    appliedFor: string
}

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})


export class CandidateFormComponent implements OnInit {
  isSubmitted: Boolean= false;
  
  constructor(private service : AppServicesService) { }

  ngOnInit() {
  }

  model: any= {};

  createCandidate(candidateObj: ICandidate){
    this.service.createCandidate(candidateObj).subscribe(res =>{
      if(res){
        console.log(res.body)
      }
      else{
        console.log("error")
      }
    })
  
  }
    
  openDialogBox(){
    this.isSubmitted = true;
    console.log("hereeeeeeeeeeeee")
    console.log(this.isSubmitted)
  }

}
