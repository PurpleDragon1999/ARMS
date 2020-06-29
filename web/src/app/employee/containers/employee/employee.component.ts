import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { IResponse } from "src/app/models/response.interface";
import { ModalComponent } from "src/app/reusable-components/modal/modal.component";
import { EmployeeFormComponent } from "../../components/employee-form/employee-form.component";
import { EmployeeUploadComponent } from '../../components/employee-upload/employee-upload.component';
import { EmployeeService } from "../../employee.service";
import { IEmployee } from "../../models/employee.interface";
import { IModelForPagination } from 'src/app/models/modelPagination.interface';

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
  }

  openModal(dataModal: any) {
    var copyDataModal = JSON.parse(JSON.stringify(dataModal));

    if (dataModal.formType === "update" && dataModal.data.employeeId) {
      copyDataModal.data.employeeId = Number(
        copyDataModal.data.employeeId.replace("CYG-", "")
      );
    } else {
      copyDataModal.data = {};
    }

    const modalRef: NgbModalRef = this.modalService.open(EmployeeFormComponent, {
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.formType = copyDataModal.formType;
    modalRef.componentInstance.data = copyDataModal.data;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      if (rerender) {
        this.searchEmployee({ page: this.pager.currentPage, character: '' });
      }
      modalRef.close();
    });
  }

  deleteEmployee(employee: IEmployee) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = true;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    modalRef.componentInstance.emitPerformRequest.subscribe(() => {
      this.employeeService.deleteEmployee(employee._id).subscribe((res: IResponse) => {
        this.searchEmployee({ page: this.pager.currentPage, character: '' });
        modalRef.componentInstance.success = res.success;
        modalRef.componentInstance.message = res.payload.message;
      }, (error: HttpErrorResponse) => {
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
      });
    });
  }

  searchEmployee(event: IModelForPagination) {
    this.employeeService.searchEmployee(event.page, event.character).subscribe((res:any) => {
      this.employees = res.payload.data.dataList;
      this.columns = ["name", "email", "employeeId", "designation", "role"];
      this.pager = res.payload.data.pager;
    });
  }

  openUpload(): void {
    const modalRef = this.modalService.open(EmployeeUploadComponent);

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      if (rerender) {
        this.searchEmployee({ page: this.pager.currentPage, character: '' });
      }
      modalRef.close();
    });
  }
}
