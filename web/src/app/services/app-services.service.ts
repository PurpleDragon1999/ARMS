import { IAssessment } from "./../models/assessment.interface";
import { IResponse } from "src/app/models/response.interface";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICreate } from "../models/create.interface";
import { HOST } from 'src/app/config/apiHost.config';
const CALENDER_API ="https://graph.microsoft.com/v1.0/me/events"
const CALENDER_VIEW_API= "https://outlook.office.com/api/v2.0/vishal.ranjan@cygrp.com/calendarview?startdatetime=2015-01-01T00:00:00Z&enddatetime=2015-04-10T00:00:00Z"
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
  out_headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSJ9.eyJhdWQiOiI0ZDMxZTM0OC1iYzg5LTQwZDItODIxYy1mNjU5NDIwODRhZTMiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOTRhNzZiYjEtNjExYi00ZWI1LWFlZTUtZTMxMjM4MWMzMmNiL3YyLjAiLCJpYXQiOjE1OTI4OTcyNDMsIm5iZiI6MTU5Mjg5NzI0MywiZXhwIjoxNTkyOTAxMTQzLCJhaW8iOiJBVFFBeS84UEFBQUF2dzVsclA0NU5aOStubDgyUmd6blNwSWpJQ2hZRDFXVDdkQldJOWIwVVNHT050V1hIczRJa0c4SDRjS2NzZ2FYIiwiZW1haWwiOiJkZWVwYW5zaHUuYmFsYW5pQGN5Z3JwLmNvbSIsImZhbWlseV9uYW1lIjoiQmFsYW5pIiwibmFtZSI6IkRlZXBhbnNodSBCYWxhbmkiLCJub25jZSI6Ijk4NDhkMTRkLTVjOTgtNGFjNS1hM2NjLWViYmM5Yzk3YWZjYSIsIm9pZCI6Ijc0NTgyNjQ3LTEzNWMtNDk3OS1iMjFkLWJiZDY1NGRiNzBhNiIsInByZWZlcnJlZF91c2VybmFtZSI6ImRlZXBhbnNodS5iYWxhbmlAY3lncnAuY29tIiwic3ViIjoibEw3elFVX1RQdEhBaWdkWV80eFd1VXoyM1BSZ3dvRFlqR3VsSUdjbGltUSIsInRpZCI6Ijk0YTc2YmIxLTYxMWItNGViNS1hZWU1LWUzMTIzODFjMzJjYiIsInV0aSI6IlExVW9aTUF4WUVPNFRZdzV4OW5EQVEiLCJ2ZXIiOiIyLjAifQ.a2JR1YaWgvax0fdEZfezHYQpTi34c7rtKBWLAMB2g2qE5oLTiZuKprpzSQcHrCjsV6z5b6ohG-6KRhPo3oCd6ozjpRsHlyyLm3tDXHPL2FICY0ynPqjR3w2Kfc5bWfLWnpAKp7vB4CfTijH5Wx0CIxjE-KH6AobT2zElFzgoyYBpWmJBPnhCBmCdL3ENC3yXRv-d83i369K1hLd_0R8VQDe-9uFm_1aClIpnFMlCjIlrm45COplXVSpLgr6dHK_mjsgF33dJCSsh2Yp3WV-U_h-iRyoUIhJf0e_InKJxJ6TRInphwo5m6jSo6bAv0c995tqXIUnwsLBaDPkeVI1xJg"

     
   
  });
   out_httpOptions = {
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
    let data=this.tokenDecoder();
     if(data!=null){
       var role=data.role;
      }
     if(role=='Employee'){
      return this.http.get<IResponse>(
        `${HOST}/api/interview?employeeId=${data.Id}`,
        this.httpOptions
      );
    }else{
      return this.http.get<IResponse>(
        `${HOST}/api/interview`,
          this.httpOptions
        );
      }
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
  blockCalender(obj):Observable<any>{
    
     //return this.http.post<any>(CALENDER_API,obj);
     return this.http.get<any>(CALENDER_VIEW_API,this.out_httpOptions);
    
   }
   getRound(jobId,employeeId){
    return this.http.get<IResponse>(
      `${HOST}/api/interview?jobId=${jobId}&employeeId=${employeeId}`,
        { ...this.httpOptions }
    );

   }
 
}
