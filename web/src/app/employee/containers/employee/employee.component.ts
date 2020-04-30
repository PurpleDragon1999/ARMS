import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeFormComponent } from "../../components/employee-form/employee-form.component";
import { EmployeeUploadComponent } from '../../components/employee-upload/employee-upload.component'
import { ModalComponent } from "src/app/reusable-components/modal/modal.component";
import { IResponse } from "src/app/models/response.interface";
import { EmployeeService } from "../../employee.service";
import { IEmployee } from "../../models/employee.interface";

@Component({
  selector: "app-employee",
  styleUrls: ["employee.component.scss"],
  templateUrl: "employee.component.html",
})
export class EmployeeComponent implements OnInit {
  employees: IEmployee[] = [];
  columns: Array<String> = [];
  pager: any;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(page?: string) {
    this.employeeService.getPaginatedEmployees(page).subscribe((res: IResponse) => {
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
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      if (rerender) {
        this.getEmployees();
      }
      modalRef.close();
    });
  }

  deleteEmployee(employee: IEmployee) {
    const modalRef = this.modalService.open(ModalComponent);
    let message = {
      success: "request",
      payload: {
        data: employee
      }
    }
    let deleteFor = "employee";
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.deleteFor = deleteFor;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      if (rerender) {
        this.getEmployees();
      }
      modalRef.close();
    });
  }

  searchEmployee(character: string) {
    this.employeeService.searchEmployee(character).subscribe((res) => {
      this.employees = res.payload.data.dataList;
    });
  }

  openUpload(): void {
    this.modalService.open(EmployeeUploadComponent);
  }
}
