import { IAssessment } from "./../models/assessment.interface";
import { IResponse } from "src/app/models/response.interface";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICreate } from "../models/create.interface";
import { HOST } from 'src/app/config/apiHost.config';

const USER_DOMAIN = "http://localhost:3000";
@Injectable({
  providedIn: "root",
})
export class AppServicesService {
 
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
     Authorization: localStorage.getItem("Authorized")
     
   
  });
   httpOptions = {
    headers: this.headers
  };

 

  constructor(private http: HttpClient) {}

  //Regarding tokens
  getToken(): string {
    return localStorage.getItem("Authorized");
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken());
  }

  // For making HTTP calls

  //For searching with pagination
  getAllIdProofTypes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${HOST}/api/IdProofType`, {
      ...this.httpOptions,
    });
  }
  getAllRoundTypes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${HOST}/api/RoundType`, {
      ...this.httpOptions,
    });
  }
  getAllJobs(): Observable<any> {
    return this.http.get<any>(
      `${HOST}/api/jobDescription`,
      this.httpOptions
    );
  }

  getAllEligibilityCriterias(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${HOST}/api/eligibilityCriteria`,
      this.httpOptions
    );
  }

  getAllEmploymentTypes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${HOST}/api/employmentType`, {
      ...this.httpOptions,
    });
  }
  getAllInterviews(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${HOST}/api/interview`,
      this.httpOptions
    );
  }

  deleteInterview(interviewId): Observable<IResponse> {
    return this.http.delete<any>(
      `${HOST}/api/interview/${interviewId}`,
      this.httpOptions
    );
  }

  getInterviewById(Id): Observable<any> {
    return this.http.get<any>(
      `${HOST}/api/interview/${Id}`,
      this.httpOptions
    );
  }

  getAllLocations(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${HOST}/api/location`, {
      ...this.httpOptions,
    });
  }

  
  getSkills():Observable<HttpResponse<any>>{
    return this.http.get<any>(`${HOST}/api/skill`, this.httpOptions);
  }
  
  deleteLocation(id): Observable<any> {
    return this.http.delete<any>(`${HOST}/api/location/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  deleteEmploymentType(id): Observable<any> {
    return this.http.delete<any>(`${HOST}/api/employmentType/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  deleteApplicationStatusType(id): Observable<any> {
    return this.http.delete<any>(
      `${HOST}/api/applicationStatusTypes/${id}`,
      { ...this.httpOptions, observe: "response" }
    );
  }

  getAllApplicationStatusTypes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${HOST}/api/applicationStatusTypes`, {
      ...this.httpOptions,
    });
  }

  deleteEligibilityCriterion(id): Observable<any> {
    return this.http.delete<any>(
      `${HOST}/api/eligibilityCriteria/${id}`,
      { ...this.httpOptions, observe: "response" }
    );
  }
  deleteIdProofType(id): Observable<any> {
    return this.http.delete<any>(`${HOST}/api/IdProofType/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }
  deleteRoundType(id): Observable<any> {
    return this.http.delete<any>(`${HOST}/api/RoundType/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }
  createAssessment(user: IAssessment): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${USER_DOMAIN}/api/assessment`, user, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  createApplicationStatusType(formObject): Observable<any> {
    return this.http.post<any>(
      `${HOST}/api/applicationStatusTypes`,
      formObject,
      { ...this.httpOptions }
    );
  }

  createLocation(formObject): Observable<any> {
    return this.http.post<any>(
      `${HOST}/api/Location`,
      formObject,
      { ...this.httpOptions }
    );
  }

  createIdProof(formObject): Observable<any> {
    return this.http.post<any>(
      `${HOST}/api/IdProofType`,
      formObject,
      { ...this.httpOptions }
    );
  }

  createEmploymentType(formObject): Observable<any> {
    return this.http.post<any>(
      `${HOST}/api/employmentType`,
      formObject,
      { ...this.httpOptions }
    );
  }

  createEligibilityCriteria(formObject): Observable<any> {
    return this.http.post<any>(
      `${HOST}/api/eligibilityCriteria`,
      formObject,
      { ...this.httpOptions }
    );
  }
}
