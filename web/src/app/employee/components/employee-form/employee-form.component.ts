import { Component, OnInit, Injectable, Output, EventEmitter, Input } from "@angular/core";
import { IEmployee } from "../../models/employee.interface";
import { Router, ActivatedRoute } from "@angular/router";
import { EmployeeService } from "../../employee.service";
import { IResponse } from "src/app/models/response.interface";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";

interface RouteData {
  formType: "create" | "update" | "read";
  employeeId: String;
}

@Component({
  selector: "app-employee-form",
  styleUrls: ["employee-form.component.scss"],
  templateUrl: "./employee-form.component.html",
})
export class EmployeeFormComponent implements OnInit {
  @Output()
  closeModal: EventEmitter<void> = new EventEmitter();

  @Input()
  employee: IEmployee;

  formType: RouteData["formType"];
  employeeId: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    console.log(this.employee, 'Employee');
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

    this.employee.employeeId = Number(
      this.employee.employeeId.toString().replace("CYG-", "")
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
    this.employeeService
      .updateEmployee(employee, this.employeeId)
      .subscribe((res: IResponse) => {});
  }

  modalClose(){
    this.closeModal.emit();    
  }
}
