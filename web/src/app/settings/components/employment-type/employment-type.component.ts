import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "src/app/reusable-components/modal/modal.component";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { AppServicesService } from "src/app/services/app-services.service";

@Component({
  selector: "app-employment-type",
  templateUrl: "./employment-type.component.html",
  styleUrls: ["./employment-type.component.scss"],
})
export class EmploymentTypeComponent implements OnInit {
  ngOnInit() { }

  employmentTypeForm: FormGroup;
  addEmploymentTypes: Boolean = false;
  employmentTypeList: any;

  constructor(
    private fb: FormBuilder,
    private _service: AppServicesService,
    private modalService: NgbModal
  ) {
    this.employmentTypeForm = this.fb.group({
      employmentTypes: this.fb.array([]),
    });
  }

  loadEmploymentTypes() {
    return this._service.getAllEmploymentTypes().subscribe((response: any) => {
      this.employmentTypeList = response.payload.data;
    });
  }
  employmentTypes(): FormArray {
    return this.employmentTypeForm.get("employmentTypes") as FormArray;
  }

  newEmploymentType(): FormGroup {
    return this.fb.group({
      employmentTypeName: "",
      createdBy: this._service.tokenDecoder().userName,
      modifiedBy: this._service.tokenDecoder().userName
    });
  }

  addEmploymentType() {
    this.addEmploymentTypes = true;
    this.employmentTypes().push(this.newEmploymentType());
  }

  deleteNewEntry(empTypeIndex){
    this.employmentTypes().removeAt(empTypeIndex);
    if ((this.employmentTypeForm.get('employmentTypes').value.length)==0) {
      this.addEmploymentTypes = false;
    }
  }

  removeEmploymentType(empTypeIndex: number) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.shouldConfirm = true;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });

    modalRef.componentInstance.emitPerformRequest.subscribe(() => {
      this.deleteNewEntry(empTypeIndex);

      return this._service.deleteEmploymentType(empTypeIndex).subscribe(
        (response: any) => {

        this.loadEmploymentTypes();
          modalRef.componentInstance.success = response.body.success;
          modalRef.componentInstance.message =
          response.body.payload.message;
        },
        (error: HttpErrorResponse) => {
          modalRef.componentInstance.success = error.error.success;
          modalRef.componentInstance.message = error.error.payload.message;
        }
        );
    });
  }

  onSubmit() {
    this._service.createEmploymentType(this.employmentTypeForm.get('employmentTypes').value).subscribe((res:any) => {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.shouldConfirm = false;
      modalRef.componentInstance.success = res.success;
      modalRef.componentInstance.message = res.payload.message;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
        
      this.employmentTypeForm.reset();
      this.addEmploymentTypes = false;
      this.loadEmploymentTypes();
      });
    })
  }
}
