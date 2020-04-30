import { IEmployee } from './models/employee.interface';
import { IResponse } from '../models/response.interface';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST } from '../config/apiHost.config';

const EMPLOYEE_API = `${HOST}/api/employee`;

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

    updateEmployee(employee: IEmployee, employeeId: String): Observable<IResponse>{
        return this.http.put<IResponse>(`${EMPLOYEE_API}/${employeeId}`, employee, this.options);
    }

    getEmployee(employeeId: String): Observable<IResponse>{
        return this.http.get<IResponse>(`${EMPLOYEE_API}/${employeeId}`, this.options);
    }
}