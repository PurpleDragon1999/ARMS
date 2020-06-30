import { MinDateService } from './../utilities/min-date.service';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppServicesService } from "./../services/app-services.service";
import { ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { IResponse } from "src/app/models/response.interface";
import { Router } from "@angular/router";
import { ModalComponent } from "./../reusable-components/modal/modal.component";
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { JobService } from '../services/job.service'
@Component({
  selector: "app-jd-form",
  templateUrl: "./jd-form.component.html",
  styleUrls: ["./jd-form.component.scss"],
})
export class JdFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _service: AppServicesService,
    private router: Router,
    private modalService: NgbModal,
    private jobService: JobService,
    private minDateService:MinDateService
  ) { }

  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  //@ViewChild("jobId", { static: false }) jobId: ElementRef;
  @ViewChild("jobTitle", { static: false }) jobTitle: ElementRef;
  @ViewChild("openingDate", { static: false }) openingDate: ElementRef;
  @ViewChild("closingDate", { static: false }) closingDate: ElementRef;
  @ViewChild("jobDescription", { static: false }) jobDescription: ElementRef;
  @ViewChild("skills", { static: false }) skills: ElementRef;
  @ViewChild("jobType", { static: false }) jobType: ElementRef;
  @ViewChild("eligibilityCriteria", { static: false })
  eligibilityCriteria: ElementRef;
  @ViewChild("location", { static: false }) location: ElementRef;
  @ViewChild("salary", { static: false }) salary: ElementRef;
  @ViewChild("vacancies", { static: false }) vacancies: ElementRef;
  @ViewChild("content", { static: true }) content: ElementRef;
  res: any;
  eligibilityCriteriaOptions: String;
  locationOptions: String;
  jobTypeOptions: String;
  jobListingForm: FormGroup;
  submitted = false;
  jdFormObject: any;
  data: any;
  jdForm: FormGroup;
  eligibilityCriterias: any;
  employmentTypes: any;
  locations: any;
  skillArray: any;
  currencyText: string;
  buttonName: string = "Select Currency"
  minimumDate:string;
  selectChangeHandlerEligibilityCriteria(event: any) {
    this.eligibilityCriteriaOptions = event.target.value;
  }
  currencyChange(event: any) {
    this.currencyText = event.target.text;
    this.buttonName = this.currencyText;
  }

  selectChangeHandlerLocation(event: any) {
    this.locationOptions = event.target.value;
  }

  selectChangeHandlerJobType(event: any) {
    this.jobTypeOptions = event.target.value;
  }
  ngOnInit() {
    this.jobListingForm = this.formBuilder.group({
      jobId: ["", Validators.required],
      jobTitle: ["", Validators.required],
      openingDate: ["", Validators.required],
      closingDate: ["", Validators.required],
      jobDescription: ["", Validators.required],
      skills: ["", Validators.required],
      jobType: ["", Validators.required],
      eligibilityCriteria: ["", Validators.required],
      location: ["", Validators.required],
      salary: ["", Validators.required],
      vacancies: ["", Validators.required],
    });
    this._service.getAllEligibilityCriterias().subscribe((res: any) => {
      this.eligibilityCriterias = res.payload.data;

    });
    this._service.getAllLocations().subscribe((res: any) => {
      this.locations = res.payload.data;

    });
    this._service.getAllEmploymentTypes().subscribe((res: any) => {
      this.employmentTypes = res.payload.data;

    });
    // this._service.getSkills().subscribe((res: any) => {
    //   this.skillArray = res.payload.data;

    // });
     this.minimumDate= this.minDateService.setMinimumDate();
  }
  
  get formControls() {
    return this.jobListingForm.controls;
  }
  error: any = { isError: false, errorMessage: "" };

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.jobListingForm.invalid) {
      return;
    }

  }

  jdFormData() {
    this.jdFormObject = {
      // jdId: `CYGJID${this.jobId.nativeElement.value}`,
      jobTitle: this.jobTitle.nativeElement.value,
      openingDate: this.openingDate.nativeElement.value,
      closingDate: this.closingDate.nativeElement.value,
      description: this.jobDescription.nativeElement.value,
      skills: this.skills.nativeElement.value,
      employmentTypeId: Number(this.jobType.nativeElement.value.substring(0, 1)),
      eligibilityCriteriaId: Number(this.eligibilityCriteria.nativeElement.value.substring(0, 1)),
      locationId: Number(this.location.nativeElement.value.substring(0, 1)),
      salary: this.salary.nativeElement.value + this.currencyText,
      vacancies: this.vacancies.nativeElement.value,
    };
    if (
      new Date(this.jobListingForm.controls["closingDate"].value) <
      new Date(this.jobListingForm.controls["openingDate"].value)
    ) {
      this.error = {
        isError: true,
        errorMessage: "Closing Date cannot be before Opening date",
      };
      return;
    }
   
    this.jobService.jdFormData(this.jdFormObject).subscribe((res: any) => {
      this.data = res.payload.data;
      const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.shouldConfirm = false;
      modalRef.componentInstance.success = res.success;
      modalRef.componentInstance.message = res.payload.message;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
      });
      this.modalClose(true);
      this.router.navigate(["admin/job-desc"]);
    },
      (error: HttpErrorResponse) => {
        
        const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });

        this.data = error.error.payload.data;

      }
    );
  }
    modalClose(rerender: boolean): void {
      this.closeModal.emit(rerender);
    }
  }