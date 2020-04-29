import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IResponse } from "src/app/models/response.interface";
import { ModalComponent } from '../../../modal/modal.component';
import { EmployeeService } from "../../employee.service";
import { IEmployee } from "../../models/employee.interface";

@Component({
  selector: "app-employee-form",
  styleUrls: ["employee-form.component.scss"],
  templateUrl: "./employee-form.component.html",
})
export class EmployeeFormComponent {
  @Output()
  closeModal: EventEmitter<void> = new EventEmitter();

  @Input()
  data: IEmployee;

  @Input()
  formType: IDataModal['formType'];

  uploadProgress: Number = 0;
  isNotAllowedUploadType: Boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private modalService : NgbModal
  ) {}

  handleSubmit(employee: IEmployee): void {
    if (this.formType === "create") return this.createEmployee(employee);
    if (this.formType === "update") return this.updateEmployee(employee);
  }

  createEmployee(employee: IEmployee): void {
    console.log(employee, 'employee');
    this.employeeService
      .createEmployee(employee)
      .subscribe((res: IResponse) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = res.payload.message; 
        this.modalClose();
      }, (error) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = error.error.payload.message; 
        this.modalClose();
      }); 
    
  }

  updateEmployee(employee: IEmployee): void {
    const updatedEmployee = Object.assign({}, this.data, employee);
    console.log(updatedEmployee, 'updatedEmployee');
    this.employeeService
      .updateEmployee(updatedEmployee)
      .subscribe((res: IResponse) => {
        const modalRef = this.modalService.open(ModalComponent);
        console.log(res);
        modalRef.componentInstance.message = res.payload.message; 
        this.modalClose();
      },(error) => {
        console.log(error);
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = error.error.payload.message; 
        this.modalClose();
      });
  }

  modalClose(){
    this.closeModal.emit();    
  }
}
