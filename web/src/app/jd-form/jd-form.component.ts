import { Component, OnInit ,Output,EventEmitter,} from '@angular/core';
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

  
  @ViewChild('jdId', {static: true}) jdId: ElementRef;
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
  @ViewChild('content',{static:true})content:ElementRef;
  jdForm: FormGroup;
    submitted = false;
    jdFormObject:jobDescription;
    data:jobDescription;

  ngOnInit() {
  
      this.jdForm= this.formBuilder.group({
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
   
  }
  get formControls() { return this.jdForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.jdForm.invalid) {
        return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.jdForm.value))
  }
 
  jdFormData(){
     this.jdFormObject = {
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
        vacancies: this.vacancies.nativeElement.value,
     }
    this._service.jdFormData(this.jdFormObject).subscribe(res => {
         this.data=res.payload.data;
        console.log(this.data);
        
    });
    this.downloadPdf();
  } 
  image = {
    name: "Image 1", url:"https://d2q79iu7y748jz.cloudfront.net/s/_logo/03b1f41ce2752d969c31c4c10182a005"
  }
  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    console.log("image");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    let imageData= this.getBase64Image(document.getElementById('img'));
    console.log(imageData);
    return dataURL;
  }
  
  downloadPdf(){

   let doc=new jsPDF();
   let specialElementHandlers={
     '#editor':function(element,renderer){
           return true;
       }
       
   }
     let content=this.content.nativeElement
     doc.fromHTML(content.innerHTML,15,15,{
      "width":198,
      "element":specialElementHandlers

     }); 
     doc.save(this.data.jdId+".pdf");
  }
  
}
