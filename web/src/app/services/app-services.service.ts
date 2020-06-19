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
  getAllIdProofTypes(): Observable<IResponse> {
    return this.http.get<IResponse>(`${HOST}/api/IdProofType`, {
      ...this.httpOptions,
    });
  }
  getAllRoundTypes(): Observable<IResponse> {
    return this.http.get<any>(`${HOST}/api/RoundType`, {
      ...this.httpOptions,
    });
  }
  getAllJobs(): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${HOST}/api/jobDescription`,
      this.httpOptions
    );
  }

  getAllEligibilityCriterias(): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${HOST}/api/eligibilityCriteria`,
      this.httpOptions
    );
  }

  getAllEmploymentTypes(): Observable<IResponse> {
    return this.http.get<IResponse>(`${HOST}/api/employmentType`, {
      ...this.httpOptions,
    });
  }
  getAllInterviews(): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${HOST}/api/interview`,
      this.httpOptions
    );
  }

  deleteInterview(interviewId): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${HOST}/api/interview/${interviewId}`,
      this.httpOptions
    );
  }

  getInterviewById(Id): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${HOST}/api/interview/${Id}`,
      this.httpOptions
    );
  }

  getAllLocations(): Observable<IResponse> {
    return this.http.get<IResponse>(`${HOST}/api/location`, {
      ...this.httpOptions,
    });
  }

  
  getSkills():Observable<IResponse>{
    return this.http.get<IResponse>(`${HOST}/api/skill`, this.httpOptions);
  }
  
  deleteLocation(id): Observable<any> {
    return this.http.delete<any>(`${HOST}/api/location/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  deleteEmploymentType(id): Observable<IResponse> {
    return this.http.delete<IResponse>(`${HOST}/api/employmentType/${id}`, {
      ...this.httpOptions,
    
    });
  }

  deleteApplicationStatusType(id): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${HOST}/api/applicationStatusTypes/${id}`,
      { ...this.httpOptions }
    );
  }

  getAllApplicationStatusTypes(): Observable<IResponse> {
    return this.http.get<IResponse>(`${HOST}/api/applicationStatusTypes`, {
      ...this.httpOptions,
    });
  }

  deleteEligibilityCriterion(id): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${HOST}/api/eligibilityCriteria/${id}`,
      { ...this.httpOptions }
    );
  }
  deleteIdProofType(id): Observable<IResponse> {
    return this.http.delete<IResponse>(`${HOST}/api/IdProofType/${id}`, {
      ...this.httpOptions
      });
  }
  deleteRoundType(id): Observable<IResponse> {
    return this.http.delete<IResponse>(`${HOST}/api/RoundType/${id}`, {
      ...this.httpOptions
     
    });
  }
  createAssessment(user: IAssessment): Observable<IResponse> {
    return this.http.post<IResponse>(`${USER_DOMAIN}/api/assessment`, user, {
      ...this.httpOptions
     
    });
  }

  createApplicationStatusType(formObject): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${HOST}/api/applicationStatusTypes`,
      formObject,
      { ...this.httpOptions }
    );
  }
}
