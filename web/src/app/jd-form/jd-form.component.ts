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
  
 
  @ViewChild('jobId', {static: false}) jobId: ElementRef;
  @ViewChild('jobTitle', {static: false}) jobTitle: ElementRef;
  @ViewChild('openingDate', {static: false}) openingDate: ElementRef;
  @ViewChild('closingDate', {static: false}) closingDate: ElementRef;
  @ViewChild('jobDescription', {static: false}) jobDescription: ElementRef;
  @ViewChild('skills', {static: false}) skills: ElementRef;
  @ViewChild('jobType', {static: false}) jobType: ElementRef;
  @ViewChild('eligibilityCriteria', {static: false}) eligibilityCriteria: ElementRef;
  @ViewChild('location', {static: false}) location: ElementRef;
  @ViewChild('salary', {static: false}) salary: ElementRef;
  @ViewChild('vacancies', {static: false}) vacancies: ElementRef;

  res:any;
  assessmentSelfTS: String;
  jobListingForm: FormGroup;
  submitted = false;

  ngOnInit() {
  
      this.jobListingForm = this.formBuilder.group({
        jobId: ['', Validators.required],
        jobTitle: ['', Validators.required],
        openingDate: ['', Validators.required],
        closingDate: ['', Validators.required],
        jobDescription: ['', Validators.required],
        skills: ['', Validators.required],
        jobType: ['', Validators.required],
        eligibilityCriteria: ['', Validators.required],
        location: ['', Validators.required],
        salary: ['', Validators.required],
        vacancies: ['', Validators.required]      
    });
    this.compareTwoDates();
  }
  get formControls() { return this.jobListingForm.controls; }

  error:any={isError:false,errorMessage:''};

  compareTwoDates(){
     if(new Date(this.jobListingForm.controls['closingDate'].value)<new Date(this.jobListingForm.controls['openingDate'].value)){
        this.error={isError:true,errorMessage:'Closing Date cannot be before Opening date'};
     }
  }
  onSubmit() {
    this.submitted = true;
    this.jobListingFormData();
    console.log(this.assessmentSelfTS);
    // stop here if form is invalid
    if (this.jobListingForm.invalid) {
        return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.jdForm.value))
    this.compareTwoDates();
  }

  jobListingFormData(){
    let jobListingFormObject = {
       jdId: this.jobId.nativeElement.value,
       jdTitle: this.jobTitle.nativeElement.value,
       openingDate: this.openingDate.nativeElement.value,
       closingDate: this.closingDate.nativeElement.value,
       jobProfileDescription: this.jobDescription.nativeElement.value,
       skills: this.skills.nativeElement.value,
      //  jobType: this.jobType.
      //  eligibilityCriteria: this.eligibilityCriteria.nativeElement.value,
      //  location: this.location.nativeElement.value,
      //  salary: this.salary.nativeElement.value,
      //  noOfVacancies: this.vacancies.nativeElement.value
    }
    console.log(jobListingFormObject)

    this._service.jdFormData(jobListingFormObject).subscribe(res => {
      console.log(this.res);
    });
    
    // this.router.navigate(["/jd-pdf"])
  }
}
