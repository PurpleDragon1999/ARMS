import { Component, OnInit, Injectable, Output, EventEmitter, Input } from "@angular/core";
import { IEmployee } from "../../models/employee.interface";
import { Router, ActivatedRoute } from "@angular/router";
import { EmployeeService } from "../../employee.service";
import { IResponse } from "src/app/models/response.interface";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { ProgressHttp } from 'angular-progress-http';
import { FileUploader } from 'ng2-file-upload';


interface RouteData {
  formType: "create" | "update" | "read";
  employeeId: String;
}

const URL = 'http://localhost:3000/api/employee/bulk';

@Component({
  selector: "app-employee-form",
  styleUrls: ["employee-form.component.scss"],
  templateUrl: "./employee-form.component.html",
})
export class EmployeeFormComponent implements OnInit {
  @Output()
  closeModal: EventEmitter<void> = new EventEmitter();

  @Input()
  data: IEmployee;

  formType: RouteData["formType"];
  // employeeId: String;
  uploadProgress: Number = 0;
  isNotAllowedUploadType: Boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) {}

  
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'csvUpload',
    allowedMimeType: ['text/csv', 'application/vnd.ms-excel'] 
  });

  ngOnInit(): void {
    console.log(this.data, 'Employee');
    // this.route.params
    //   .pipe(
    //     switchMap((routeData: RouteData) => {
    //       this.formType = routeData.formType;
    //       this.employeeId = routeData.employeeId;
    //       if (
    //         !routeData.employeeId ||
    //         !(routeData.formType === "update" || routeData.formType === "read")
    //       )

    //         return EMPTY;

    //       return this.employeeService.getEmployee(routeData.employeeId);
    //     })
    //   )
    //   .subscribe((response: IResponse) => {
    //     this.employee = response.payload.data;
    //     this.employee.employeeId = Number(
    //       this.employee.employeeId.toString().replace("CYG-", "")
    //     );
    //   });

    this.data.employeeId = Number(
      this.data.employeeId.toString().replace("CYG-", "")
    );
  }

  handleSubmit(employee: IEmployee): void {
    if (this.formType === "create") return this.createEmployee(employee);
    if (this.formType === "update") return this.updateEmployee(employee);
  }

  createEmployee(employee: IEmployee): void {
    this.employeeService
      .createEmployee(employee)
      .subscribe((res: IResponse) => {});
  }

  updateEmployee(employee: IEmployee): void {
    console.log(employee);
    // this.employeeService
    //   .updateEmployee(employee, employee._id)
    //   .subscribe((res: IResponse) => {});
  }

  modalClose(){
    this.closeModal.emit();    
  }
}
