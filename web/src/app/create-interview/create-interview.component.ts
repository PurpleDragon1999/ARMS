import { Component, OnInit } from '@angular/core';
import { AppServicesService } from '../services/app-services.service';
import { Router,ActivatedRoute } from '@angular/router';
import {ICreate} from '../models/create.interface';
import { DynamicGrid } from '../grid.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss']
})
export class CreateInterviewComponent implements OnInit {
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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  dynamicArray: Array<DynamicGrid> = [];  
  newDynamic: any = {}; 

  registerForm: FormGroup;
    submitted = false;

    ngOnInit() {
      
      this.registerForm = this.formBuilder.group({
        Name: ['', Validators.required],
        noOfRounds: ['', Validators.required],
        panelOfInterviewers: ['', Validators.required],
        roundType: ['', Validators.required],
        date: ['', Validators.required],
        time: ['', Validators.required]
        
    });
  }

  get f() { return this.registerForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}

  createInterview(interview:ICreate){
    console.log(interview, "interviewObj")
    let interviewObj = interview;
    this.AppServicesService.createInterview(interview).subscribe(res=>{
      if (res.status == 200){
        alert("interview Created")
      }
        else{
          alert("some error occurred")
        }
      })
 
}  
  
deleteRow(index) {  
    if(this.dynamicArray.length ==1) {  
        
        return false;  
    } else {  
        this.dynamicArray.splice(index, 1);    
        return true;  
    }  
}  
}
  

