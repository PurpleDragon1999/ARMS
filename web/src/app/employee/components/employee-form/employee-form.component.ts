import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
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
  formType: any["formType"];

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }

  handleSubmit(employee: IEmployee): void {
    if (this.formType === "create") return this.createEmployee(employee);
    if (this.formType === "update") return this.updateEmployee(employee);
  }

  createEmployee(employee: IEmployee): void {
    this.employeeService.createEmployee(employee).subscribe(
      (res: IResponse) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });
        this.modalClose( );
      },
      (error: HttpErrorResponse) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });
      }
    );
  }

  updateEmployee(employee: IEmployee): void {
    const updatedEmployee = Object.assign({}, this.data, employee);
    this.employeeService.updateEmployee(updatedEmployee).subscribe(
      (res: IResponse) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });
        this.modalClose( );
      },
      (error: HttpErrorResponse) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });
      }
    );
  }
  
  modalClose() {
    this.closeModal.emit();
  }
}
