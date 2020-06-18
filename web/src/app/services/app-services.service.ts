import { IAssessment } from './../models/assessment.interface';
import { IResponse } from 'src/app/models/response.interface';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreate} from '../models/create.interface';

const USER_DOMAIN = 'http://localhost:3000';
const DOTNET_DOMAIN='http://localhost:40802';
@Injectable({
  providedIn: 'root'
})

export class AppServicesService {
  // createAssessment(assessment: any) {
  //   throw new Error("Method not implemented.");
  // }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
     Authorization: localStorage.getItem("Authorized")
     
   
  });
   httpOptions = {
    headers: this.headers
  };

 

  constructor(private http: HttpClient) { }

  //Regarding tokens
  getToken(): string {
    return localStorage.getItem('Authorized');
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken());
  }

  // For making HTTP calls
  
  //For searching with pagination
 
  
 
  createAssessment(user: IAssessment): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/assessment`, user, { ...this.httpOptions, observe: 'response' });
  }
 
 getAllEligibilityCriterias(): Observable<HttpResponse<any>>{
  return this.http.get<any>(`${DOTNET_DOMAIN}/api/eligibilityCriteria`, this.httpOptions);
 }
 getAllEmploymentTypes(): Observable<HttpResponse<any>>{
  return this.http.get<any>(`${DOTNET_DOMAIN}/api/employmentType`, this.httpOptions);
 }  
 getAllLocations():Observable<HttpResponse<any>>{
  return this.http.get<any>(`${DOTNET_DOMAIN}/api/location`, this.httpOptions);
 }
 getSkills():Observable<HttpResponse<any>>{
  return this.http.get<any>(`${DOTNET_DOMAIN}/api/skill`, this.httpOptions);
 }
 getAllInterviews(): Observable<HttpResponse<any>>{
  return this.http.get<any>(`${DOTNET_DOMAIN}/api/interview`, this.httpOptions);
}

deleteInterview(interviewId): Observable<IResponse>{
  return this.http.delete<any>(`${DOTNET_DOMAIN}/api/interview/${interviewId}`, this.httpOptions);
}
getInterviewById(Id): Observable<HttpResponse<any>>{
  return this.http.get<any>(`${DOTNET_DOMAIN}/api/interview/${Id}`, this.httpOptions);
}

}
