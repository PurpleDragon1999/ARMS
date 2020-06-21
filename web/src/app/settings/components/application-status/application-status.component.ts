import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { AppServicesService } from "src/app/services/app-services.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "src/app/reusable-components/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-application-status",
  templateUrl: "./application-status.component.html",
  styleUrls: ["./application-status.component.scss"],
})
export class ApplicationStatusComponent implements OnInit {
  ngOnInit() {}

  applicationStatusForm: FormGroup;
  addApplicationStatusTypes: Boolean = false;
  applicationStatusList: any;
  createdBy: string;
  modifiedBy: string;

  constructor(
    private fb: FormBuilder,
    private _service: AppServicesService,
    private modalService: NgbModal
  ) {
    this.applicationStatusForm = this.fb.group({
      applicationStatusTypes: this.fb.array([])
    });
  }

  loadApplicationStatusTypes() {
    return this._service
      .getAllApplicationStatusTypes()
      .subscribe((response: any) => {
        this.applicationStatusList = response.payload.data;
      });
  }
  
  applicationStatusTypes(): FormArray {
    return this.applicationStatusForm.get(
      "applicationStatusTypes"
    ) as FormArray;
  }

  newApplicationStatus(): FormGroup {
    return this.fb.group({
      StatusName: "",
      CreatedBy: this._service.tokenDecoder().userName,
      ModifiedBy: this._service.tokenDecoder().userName
    });
  }

  addApplicationStatus() {
    this.addApplicationStatusTypes = true;
    this.applicationStatusTypes().push(this.newApplicationStatus());
  }

  deleteRecord(id) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = true;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    return this._service.deleteApplicationStatusType(id).subscribe(
      (response: any) => {
        this.loadApplicationStatusTypes();
        modalRef.componentInstance.success = response.success;
        modalRef.componentInstance.message =
          response.payload.message;
      },
      (error: HttpErrorResponse) => {
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
      }
    );
  }
  
  removeApplicationStatus(appStatusIndex: number) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = true;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    this.applicationStatusTypes().removeAt(appStatusIndex);
    if (appStatusIndex == 0) {
      this.addApplicationStatusTypes = false;
    }
    return this._service.deleteApplicationStatusType(appStatusIndex).subscribe(
      (response: any) => {
        this.loadApplicationStatusTypes();
        modalRef.componentInstance.success = response.body.success;
        modalRef.componentInstance.message =
          response.payload.message;
      },
      (error: HttpErrorResponse) => {
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
      }
    );
  }

  onSubmit() {
  this._service.createApplicationStatusType(this.applicationStatusForm.get('applicationStatusTypes').value).subscribe((res:any) => {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.shouldConfirm = false;
    modalRef.componentInstance.success = res.success;
    modalRef.componentInstance.message = res.payload.message;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
    modalRef.close();        
    });
  })
}
}
