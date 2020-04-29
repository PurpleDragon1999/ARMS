import { EventEmitter } from 'protractor';
import { Component, OnInit, Input } from "@angular/core";
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
    pager : any

    @Input()
    valueChange : any

    constructor(private employeeService: EmployeeService){}

    ngOnInit(): void{
        console.log(this.valueChange, "value change")
        this.getEmployees()
        
    }

    getEmployees=(page? )=>{
        console.log(this.employeeService, "employee service")
        console.log(page, "page is here")
        this.employeeService.getAllEmployees(page).subscribe((res: IResponse) => {
            console.log(this.employees,res, 'response for all employees');
            if(res.payload.data){
                this.employees = res.payload.data.dataList;
                this.columns = ['name', 'email', 'employeeId', 'designation', 'role'];
                this.pager = res.payload.data.pager
            }
            console.log(res,this.employees, 'response for all employees'); 
        });
    }
}

