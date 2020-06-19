import { Injectable } from '@angular/core';
import { HOST } from '../config/apiHost.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const CANDIDATE_ASSESSMENT_API = `${HOST}/api/employee`;
const EMPLOYEE_SEARCH = `${HOST}/api/employeeSearch`;
@Injectable({
    providedIn: 'root'
})
export class CandidateAssessmentService {
    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
    });

    options = {
        headers: this.headers
    }
    constructor(private http: HttpClient) { }
}