import { EventEmitter } from "protractor";
import { Component, OnInit, Input } from "@angular/core";
import { EmployeeService } from "../../employee.service";
import { IResponse } from "src/app/models/response.interface";
import { IEmployee } from "../../models/employee.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeFormComponent } from "../../components/employee-form/employee-form.component";
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
    console.log(this.valueChange, "value change");
    this.getEmployees();
  }

  getEmployees = (page?: number) => {
    console.log(this.employeeService, "employee service");
    console.log(page, "page is here");
    this.employeeService.getAllEmployees(page).subscribe((res: IResponse) => {
      console.log(this.employees, res, "response for all employees");
      if (res.payload.data) {
        this.employees = res.payload.data.dataList;
        this.columns = ["name", "email", "employeeId", "designation", "role"];
        this.pager = res.payload.data.pager;
      }
    });
  };

  openModal(dataModal: IDataModal) {
    console.log(dataModal, "dataModal inside employeeComponet");

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
    console.log(employee, "employee");
    this.employeeService.deleteEmployee(employee._id).subscribe(
      (res) => {
        this.alertMessage = res.payload.message;
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = this.alertMessage;
      },
      (error) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = error.error.payload.message;
      }
    );
  }

  searchEmployee(character: string) {
    console.log(character, "inside empComponent");
    this.employeeService.searchEmployee(character).subscribe((res) => {
      console.log(res, "search response");

      this.employees = res.payload.data.searchedRecords;
      this.alertMessage = res.payload.message;
    });
  }
}
