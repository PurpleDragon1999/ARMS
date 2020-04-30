import { EventEmitter } from "protractor";
import { Component, OnInit, Input } from "@angular/core";
import { EmployeeService } from "../../employee.service";
import { IResponse } from "src/app/models/response.interface";
import { IEmployee } from "../../models/employee.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeFormComponent } from "../../components/employee-form/employee-form.component";
import { EmployeeUploadComponent } from '../../components/employee-upload/employee-upload.component'
import { ModalComponent } from "src/app/modal/modal.component";

@Component({
  selector: "app-employee",
  styleUrls: ["employee.component.scss"],
  templateUrl: "employee.component.html",
})
export class EmployeeComponent implements OnInit {
  employees: IEmployee[] = [];
  columns: Array<String> = [];
  pager: any;
  alertMessage: string;

  @Input()
  valueChange: any;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees = (page?: number) => {
    this.employeeService.getAllEmployees(page).subscribe((res: IResponse) => {
      if (res.payload.data) {
        this.employees = res.payload.data.dataList;
        this.columns = ["name", "email", "employeeId", "designation", "role"];
        this.pager = res.payload.data.pager;
      }
    });
  };

  openModal(dataModal: IDataModal) {
    if (dataModal.formType === "update" && dataModal.data.employeeId) {
      dataModal.data.employeeId = Number(
        dataModal.data.employeeId.toString().replace("CYG-", "")
      );
    } else {
      dataModal.data = {};
    }

    const modalRef = this.modalService.open(EmployeeFormComponent);
    modalRef.componentInstance.formType = dataModal.formType;
    modalRef.componentInstance.data = dataModal.data;
    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close();
    });
  }

  deleteEmployee(employee: IEmployee) {
    const modalRef = this.modalService.open(ModalComponent);
    let message = {
      success : "request",
      payload: {
        data: employee
      }
    }
    let deleteFor = "employee";
    modalRef.componentInstance.message = message; 
    modalRef.componentInstance.deleteFor = deleteFor;     

  }

  searchEmployee(character: string) {
    this.employeeService.searchEmployee(character).subscribe((res) => {
      this.employees = res.payload.data.searchedRecords;
      this.alertMessage = res.payload.message;
    });
  }
}
