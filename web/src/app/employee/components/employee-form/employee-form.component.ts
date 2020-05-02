import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { IResponse } from "src/app/models/response.interface";
import { ModalComponent } from "../../../reusable-components/modal/modal.component";
import { EmployeeService } from "../../employee.service";
import { IEmployee } from "../../models/employee.interface";

@Component({
  selector: "app-employee-form",
  styleUrls: ["employee-form.component.scss"],
  templateUrl: "./employee-form.component.html",
})
export class EmployeeFormComponent {
  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  data: IEmployee;

  @Input()
  formType: IDataModal["formType"];

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }

  handleSubmit(employee: IEmployee): void {
    if (this.formType === "create") return this.createEmployee(employee);
    if (this.formType === "update") return this.updateEmployee(employee);
  }

  createEmployee(employee: IEmployee): void {
    this.modalClose(true);
    this.employeeService.createEmployee(employee).subscribe(
      (res: IResponse) => {
        this.openMessageModal(res.success, res.payload.message);
      },
      (error: HttpErrorResponse) => {
        this.openMessageModal(error.error.success, error.error.payload.message);
      }
    );
  }

  updateEmployee(employee: IEmployee): void {
    this.modalClose(true);
    const updatedEmployee = Object.assign({}, this.data, employee);
    this.employeeService.updateEmployee(updatedEmployee).subscribe(
      (res: IResponse) => {
        this.openMessageModal(res.success, res.payload.message);
      },
      (error: HttpErrorResponse) => {
        this.openMessageModal(error.error.success, error.error.payload.message);
      }
    );
  }

  modalClose(rerender: boolean): void {
    this.closeModal.emit(rerender);
  }

  openMessageModal(success: boolean, message: string) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.shouldConfirm = false;

    modalRef.componentInstance.success = success;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
  }
}
