import { Component, OnInit } from '@angular/core';
import { DynamicGrid } from '../grid.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hr-interview-assessement',
  templateUrl: './hr-interview-assessement.component.html',
  styleUrls: ['./hr-interview-assessement.component.scss']
})
export class HrInterviewAssessementComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  dynamicArray: Array<DynamicGrid> = [];  
  newDynamic: any = {}; 

  registerForm: FormGroup;
    submitted = false;

  ngOnInit() {
      this.newDynamic = {skills: "", marks: "",remarks:""};  
      this.dynamicArray.push(this.newDynamic);


      this.registerForm = this.formBuilder.group({
        Name: ['', Validators.required],
        dateOfInterview: ['', Validators.required],
        interviewFeedback: ['', Validators.required]

        
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

  addRow(index) {    
    this.newDynamic = {skills: "", marks: "",remarks:""};  
    this.dynamicArray.push(this.newDynamic);    
    console.log(this.dynamicArray);  
    return true;  
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
