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
    columns: Array<String> = [];

    constructor(private employeeService: EmployeeService){}

    ngOnInit(): void{
        this.employeeService.getAllEmployees().subscribe((res: IResponse) => {
            console.log(this.employees,res, 'response for all employees');
            if(res.payload.data){
                this.employees = res.payload.data;
                this.columns = ['name', 'email', 'employeeId', 'designation', 'role'];
            }
            console.log(this.employees, 'response for all employees'); 
        });
    }
}