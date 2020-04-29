import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServicesService } from './../services/app-services.service';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-jd-form',
  templateUrl: './jd-form.component.html',
  styleUrls: ['./jd-form.component.scss']
})
export class JdFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private _service: AppServicesService,
    private router:Router) { }
  

  @ViewChild('jdId', {static: false}) jdId: ElementRef;
  @ViewChild('jdTitle', {static: false}) jdTitle: ElementRef;
  @ViewChild('openingDate', {static: false}) openingDate: ElementRef;
  @ViewChild('closingDate', {static: false}) closingDate: ElementRef;
  @ViewChild('jobProfileDescription', {static: false}) jobProfileDescription: ElementRef;
  @ViewChild('skills', {static: false}) skills: ElementRef;
  @ViewChild('jobType', {static: false}) jobType: ElementRef;
  @ViewChild('eligibilityCriteria', {static: false}) eligibilityCriteria: ElementRef;
  @ViewChild('location', {static: false}) location: ElementRef;
  @ViewChild('salary', {static: false}) salary: ElementRef;
  @ViewChild('vacancies', {static: false}) vacancies: ElementRef;

  res:any;

  jdForm: FormGroup;
  submitted = false;

  ngOnInit() {
  
      this.jdForm = this.formBuilder.group({
        jdId: ['', Validators.required],
        jdTitle: ['', Validators.required],
        openingDate: ['', Validators.required],
        closingDate: ['', Validators.required],
        jobProfileDescription: ['', Validators.required],
        skills: ['', Validators.required],
        jobType: ['', Validators.required],
        eligibilityCriteria: ['', Validators.required],
        location: ['', Validators.required],
        salary: ['', Validators.required],
        vacancies: ['', Validators.required]      
    });
    this.compareTwoDates();
  }
  get formControls() { return this.jdForm.controls; }

  error:any={isError:false,errorMessage:''};

  compareTwoDates(){
     if(new Date(this.jdForm.controls['closingDate'].value)<new Date(this.jdForm.controls['openingDate'].value)){
        this.error={isError:true,errorMessage:'Closing Date cannot be before Opening date'};
     }
  }
  onSubmit() {
    this.submitted = true;
    this.jdFormData();
    // stop here if form is invalid
    if (this.jdForm.invalid) {
        return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.jdForm.value))
    this.jdFormData();
    this.compareTwoDates();
  }

  jdFormData(){
    let jdFormObject = {
       jdId: this.jdId.nativeElement.value,
       jdTitle: this.jdTitle.nativeElement.value,
       openingDate: this.openingDate.nativeElement.value,
       closingDate: this.closingDate.nativeElement.value,
       jobProfileDescription: this.jobProfileDescription.nativeElement.value,
       skills: this.skills.nativeElement.value,
       jobType: this.jobType.nativeElement.value,
       eligibilityCriteria: this.eligibilityCriteria.nativeElement.value,
       location: this.location.nativeElement.value,
       salary: this.salary.nativeElement.value,
       noOfVacancies: this.vacancies.nativeElement.value
    }
    console.log(jdFormObject)

    this._service.jdFormData(jdFormObject).subscribe(res => {
      console.log(this.res);
    });
    
    this.router.navigate(["/jd-pdf"])
  }
}
