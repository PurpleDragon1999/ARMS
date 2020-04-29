import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FileUploader } from 'ng2-file-upload';
import { IResponse } from "src/app/models/response.interface";
import { EmployeeService } from "../../employee.service";
import { IEmployee } from "../../models/employee.interface";

const URL = 'http://localhost:3000/api/employee/bulk';

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
    private employeeService: EmployeeService
  ) {}

  
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'csvUpload',
    allowedMimeType: ['text/csv', 'application/vnd.ms-excel'] 
  });

  handleSubmit(employee: IEmployee): void {
    if (this.formType === "create") return this.createEmployee(employee);
    if (this.formType === "update") return this.updateEmployee(employee);
  }

  createEmployee(employee: IEmployee): void {
    console.log(employee, 'employee');
    this.employeeService
      .createEmployee(employee)
      .subscribe((res: IResponse) => {
        console.log(res);
      });
  }

  updateEmployee(employee: IEmployee): void {
    const updatedEmployee = Object.assign({}, this.data, employee);
    console.log(updatedEmployee, 'updatedEmployee');
    this.employeeService
      .updateEmployee(updatedEmployee)
      .subscribe((res: IResponse) => {
        console.log(res);
      });
  } 

  modalClose(){
    this.closeModal.emit();    
  }
}
