import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from './models/employee.interface';
import { IResponse } from '../models/response.interface';
import { HOST } from '../config/apiHost.config';
import { $ } from 'protractor';

const EMPLOYEE_API = `${HOST}/api/employee`;
const EMPLOYEE_SEARCH = `${HOST}/api/employeeBySearch`;

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    options = {
        headers: this.headers
    };

    constructor(private http: HttpClient){}

    createEmployee(employee: IEmployee): Observable<IResponse>{
        return this.http.post<IResponse>(`${EMPLOYEE_API}`, employee, this.options);
    }

    updateEmployee(employee: IEmployee): Observable<IResponse>{
        console.log(employee, 'Employee');
        return this.http.put<IResponse>(`${EMPLOYEE_API}/${employee._id}`, employee, this.options);
    }

    getEmployee(employeeId: String): Observable<IResponse>{
        return this.http.get<IResponse>(`${EMPLOYEE_API}/${employeeId}`, this.options);
    }

    getAllEmployees(page? ): Observable<IResponse>{
        console.log("inside page service")
        return this.http.get<IResponse>(`${EMPLOYEE_API}?page=${page}`, this.options);
    }

    deleteEmployee(employeeId : String): Observable<IResponse>{
        return this.http.delete<IResponse>(`${EMPLOYEE_API}/${employeeId}`, this.options);
    }

    searchEmployee(character : string){
        console.log(character, 'character inside service')
        return this.http.get<IResponse>(`${EMPLOYEE_SEARCH}/${character}`, this.options);

    }
}