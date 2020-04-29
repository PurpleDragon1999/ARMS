import { Component, OnInit } from "@angular/core";
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
export class AdminFormComponent implements OnInit {
  employee: IEmployee;
  formType: RouteData["formType"];
  employeeId: String;
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
    this.route.params
      .pipe(
        switchMap((routeData: RouteData) => {
          this.formType = routeData.formType;
          this.employeeId = routeData.employeeId;
          if (
            !routeData.employeeId ||
            !(routeData.formType === "update" || routeData.formType === "read")
          )
            return EMPTY;

          return this.employeeService.getEmployee(routeData.employeeId);
        })
      )
      .subscribe((response: IResponse) => {
        this.employee = response.payload.data;
        this.employee.employeeId = Number(
          this.employee.employeeId.toString().replace("CYG-", "")
        );
      });

      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false; 
      };
      this.uploader.onProgressItem = (item, progress) => {
        this.uploadProgress = progress;
        item.onComplete = (res) => {
            console.log('Done!');
        }
      };
      this.uploader.onCompleteItem = (item: any, status: any) => {
        this.uploader.clearQueue();
        console.log('FileUpload:uploaded successfully:', item, status);
      };
      this.uploader.onWhenAddingFileFailed = function (item: any, filter: any, options: any,) {
        this.isNotAllowedUploadType=true;
      };
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
    this.employeeService
      .updateEmployee(employee, this.employeeId)
      .subscribe((res: IResponse) => {});
  }


}
