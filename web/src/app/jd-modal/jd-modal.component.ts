import { JdFormComponent } from './../jd-form/jd-form.component';
import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppServicesService } from "../services/app-services.service";
import { ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalComponent } from "../reusable-components/modal/modal.component";
import * as jsPDF from "jspdf";
import { jobDescription } from "../models/jobDescription.interface";
import html2canvas from "html2canvas";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-jd-modal",
  templateUrl: "./jd-modal.component.html",
  styleUrls: ["./jd-modal.component.scss"],
})
export class JdModalComponent implements OnInit {
  @Input()
  jdUpdateId: string;

  constructor(
    private formBuilder: FormBuilder,
    private _service: AppServicesService,
    private router: Router,
    private modalService: NgbModal,
    private _router: Router
  ) {}

  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("jdId", { static: false }) jdId: ElementRef;
  @ViewChild("jdTitle", { static: false }) jdTitle: ElementRef;
  @ViewChild("openingDate", { static: false }) openingDate: ElementRef;
  @ViewChild("closingDate", { static: false }) closingDate: ElementRef;
  @ViewChild("jobProfileDescription", { static: false })
  jobProfileDescription: ElementRef;
  @ViewChild("skills", { static: false }) skills: ElementRef;
  @ViewChild("jobType", { static: false }) jobType: ElementRef;
  @ViewChild("eligibilityCriteria", { static: false })
  eligibilityCriteria: ElementRef;
  @ViewChild("location", { static: false }) location: ElementRef;
  @ViewChild("salary", { static: false }) salary: ElementRef;
  @ViewChild("vacancies", { static: false }) vacancies: ElementRef;
  @ViewChild("content", { static: true }) content: ElementRef;

  jobArray: any;
  eligibilityCriteriaOptions: String;
  locationOptions: String;
  jobTypeOptions: String;
  jobListingForm: FormGroup;
  submitted = false;
  jdFormObject: jobDescription;
  data: jobDescription;

  ngOnInit() {
    this.loadJobData(this.jdUpdateId);
  }

  loadJobData(Id: string) {
    this._service.getJobsById(Id).subscribe((res: any) => {
      if (res.success) {
        this.jobArray = res.payload.data;
        this.setJobData();
      }
    });
  }
  setJobData() {
    this.jdId = this.jobArray.jdId.slice(6, 11);
    this.jdTitle = this.jobArray.jdTitle;
    this.openingDate = this.jobArray.openingDate.slice(0, 10);
    this.closingDate = this.jobArray.closingDate.slice(0, 10);
    this.jobProfileDescription = this.jobArray.jobProfileDescription;
    this.skills = this.jobArray.skills;
    this.jobType = this.jobArray.jobType;
    this.eligibilityCriteria = this.jobArray.eligibilityCriteria;
    this.location = this.jobArray.location;
    this.salary = this.jobArray.salary;
    this.vacancies = this.jobArray.vacancies;
  }

  sendUpdateRequest(jdFormObject: any) {
    jdFormObject.jdId = `CYGJID${jdFormObject.jdId}`;
    this._service.updateJobInfo(jdFormObject, this.jobArray._id).subscribe(
      (res: any) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });
       this.modalClose();
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
        this.router.navigate(["/jd-pdf", this.data.jdId]);
      }
    );
  }

  modalClose() {
    this.closeModal.emit();
  }
}
