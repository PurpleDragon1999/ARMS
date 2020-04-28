import { Component, OnInit } from "@angular/core";
import { EmployeeService } from '../../employee.service';
import { IResponse } from 'src/app/models/response.interface';
import { IEmployee } from '../../models/employee.interface';

@Component({
    selector: 'app-employee',
    styleUrls: ['employee.component.scss'],
    templateUrl: 'employee.component.html'
})
export class EmployeeComponent implements OnInit{
    employees: IEmployee[] = [];

    constructor(private employeeService: EmployeeService){}

    ngOnInit(): void{
        this.employeeService.getAllEmployees().subscribe((res: IResponse) => {
            console.log(res, 'response for all employees');
            if(res.payload.data.listOfEmployees){
                this.employees = res.payload.data.listOfEmployees;
            }
        });
    }
}