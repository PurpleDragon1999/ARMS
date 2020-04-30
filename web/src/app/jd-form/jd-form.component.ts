import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServicesService } from './../services/app-services.service';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Router}from '@angular/router'
import * as jsPDF from 'jspdf'
import{jobDescription}from '../models/jobDescription.interface'
import html2canvas from 'html2canvas';  
  
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
  @ViewChild('content',{static:true})content:ElementRef;
  
  res: any;
  eligibilityCriteriaOptions: String;
  locationOptions: String;
  jobTypeOptions: String;
  jobListingForm: FormGroup;
  submitted = false;
  jdFormObject:jobDescription;
  data:jobDescription;

  selectChangeHandlerEligibilityCriteria(event: any){
    this.eligibilityCriteriaOptions = event.target.value;
  }

  selectChangeHandlerLocation(event: any){
    this.locationOptions = event.target.value;
  }

  selectChangeHandlerJobType(event: any){
    this.jobTypeOptions = event.target.value;
  }

  ngOnInit() {
  
      this.jobListingForm= this.formBuilder.group({
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
    this.jdFormData();
    this.compareTwoDates();
    // stop here if form is invalid
    if (this.jobListingForm.invalid) {
        return;
    }
   
  }

  jdFormData(){
    let jdFormObject = {
       jdId: this.jobId.nativeElement.value,
       jdTitle: this.jobTitle.nativeElement.value,
       openingDate: this.openingDate.nativeElement.value,
       closingDate: this.closingDate.nativeElement.value,
       jobProfileDescription: this.jobDescription.nativeElement.value,
       skills: this.skills.nativeElement.value,
       jobType: this.jobTypeOptions,
       eligibilityCriteria: this.eligibilityCriteriaOptions,
       location: this.locationOptions,
       salary: this.salary.nativeElement.value,
       vacancies: this.vacancies.nativeElement.value,
     }
     console.log(jdFormObject);
    
    this._service.jdFormData(this.jdFormObject).subscribe(res => {
      console.log("abc") ; 
       this.data=res.payload.data;
        // this.router.navigate(["/jd-pdf",this.data.jdId]);
    });
    
  } 
  

  
}
