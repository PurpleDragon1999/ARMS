import { IEmployee } from './models/employee.interface';
import { IResponse } from '../models/response.interface';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { HOST } from "../config/apiHost.config";

const EMPLOYEE_API = `${HOST}/api/employee`;
const EMPLOYEE_SEARCH = `${HOST}/api/employeeSearch`;

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  options = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) { }

  createEmployee(employee: IEmployee): Observable<IResponse> {
    return this.http.post<IResponse>(`${EMPLOYEE_API}`, employee, this.options);
  }

  updateEmployee(employee: IEmployee): Observable<IResponse> {
    return this.http.put<IResponse>(`${EMPLOYEE_API}/${employee._id}`, employee, this.options);
  }

  getEmployee(employeeId: String): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${EMPLOYEE_API}/${employeeId}`,
      this.options
    );
  }
  deleteEmployee(employeeId: String): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${EMPLOYEE_API}/${employeeId}`,
      this.options
    );
  }
  
  searchEmployee(page: number = 1, character: string = '') {
    const params: HttpParams = new HttpParams().set('character', character).set('page', page.toString()).set("pagination", "true");

    return this.http.get<IResponse>(
      EMPLOYEE_SEARCH,
      { ...this.options, params }
    );
  }
}
