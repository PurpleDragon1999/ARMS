import { IAssessment } from './../models/assessment.interface';
import { IResponse } from 'src/app/models/response.interface';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreate} from '../models/create.interface';

const USER_DOMAIN = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class AppServicesService {
  // createAssessment(assessment: any) {
  //   throw new Error("Method not implemented.");
  // }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
       // Authorization: localStorage.getItem("Authorization")
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTE0MzE1MzYsImV4cCI6MTU5MTQ2MDMzNiwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJhMzhkZjNmYi0wOTZlLTQ1OGMtODljMS0xMmNkNjM4Y2Q5NjYiLCJhdXRoX3RpbWUiOjE1OTE0MzE1MzYsImlkcCI6ImxvY2FsIiwibmFtZSI6IlNvbmFsaSIsImxhc3RfbmFtZSI6IkNoYXdsYSIsImVtYWlsIjoic29uYWxpLmNoYXdsYUBjeWdycC5jb20iLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYWNjb3VudCIsImxtcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.eu5JPSWerzOJ0WZgLd98lC1SdndgMRo2Q8s7_ZOqG06EmgmuBNO6bRF9eGgP66hvNzFNVuDOM4XXAMd4NzhUEVCgvXRf3ZpKA7CuvdSDCdcOIIT6RVOhlIggYqLOQ9Biyn8lflHF1U0hHi4pCQcEEHiik7wfeOy10nlvCm5mLtPjLu_nWp7FF-wSDS6Vk7ZD2wl08zbl7pJQuaduSLdB-S06ce8BokvUYN1vYukqUfZjEMrK-5exzI68zhn1CNNBKl9r8SrbgrPJFfpeDwXiFMhFKmP6FT6mpF81c_a69k3p6b-T0RDyxVIYg4Vp-t6tMSDakryOflIggQnRzLUPi1hbgKFfkENMPWGUwd_0HbhzbpPJkEoR1ZkM2mUZVQEClnPH-sb5D3tCtoIMpdgFf9Q6ha2Y7paTFtcJ2KIvaokMnP1SiwMr_WpB0S6jlLDL5zftgrgKmhFdZt_mlT6TYT7dCxBCCQBGr7-da7ONGC2PHPt9PQsNkI6sgHTsE0Gu3UK28zGs89X_NTeXndVThGK9iqXlq4uHWNzFuPgL3xCjmddRZFoQqPu66J_gpKz9OaqtBLkIaFfX8Ors3TMMb0eLXEJseUxVjRf44L2fJTg9LIMYCEWhBY9JKnk-XtQ_t9BPy47rOhK6bDQNf12Z0Zw5l2JgKoDzuJB-1rnDwZY'
  });
  
  createHeader: HttpHeaders= new HttpHeaders({
    'Content-Type': 'application/json'
  });

  header_token: HttpHeaders = new HttpHeaders().set("x-auth-token", localStorage.getItem("x-auth-token"));

  httpOptions = {
    headers: this.headers
  };

  options = {
    headers: this.createHeader
  }

  constructor(private http: HttpClient) { }

  //Regarding tokens
  getToken(): string {
    return localStorage.getItem('x-auth-token');
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken());
  }

  // For making HTTP calls
  
  //For searching with pagination
  searchCandidates(name: string, pagination: string){
    return this.http.get<any>(`${USER_DOMAIN}/api/employeeSearch/?character=${name}&pagination=${pagination}`, this.options);
  }
  
  createInterview(user: ICreate): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/interview`, user, { ...this.options, observe: 'response' });
  }

  createAssessment(user: IAssessment): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/assessment`, user, { ...this.httpOptions, observe: 'response' });
  }
  // getAllJobs(): Observable<HttpResponse<any>>{
  //     return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`, this.options);
  // }
  getAllJobs(): Observable<any>{
    return this.http.get<any>("http://localhost:40802/api/jobDescription", this.httpOptions);
}
  getJobsById(Id): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription/${Id}`, this.options);
  }
  
  updateJobInfo(jobFormObject,jobId): Observable<HttpResponse<any>>{
    return this.http.put<any>(`${USER_DOMAIN}/api/jobDescription/${jobId}`,jobFormObject, this.options);
  }


  deleteJd(jobObjId): Observable<IResponse>{
    return this.http.delete<any>(`${USER_DOMAIN}/api/jobDescription/${jobObjId}`, this.options);
  }

  jdFormData(jdFormObject): Observable<any>{
    return this.http.post<any>(`${USER_DOMAIN}/api/jobDescription`, jdFormObject, { ...this.options, observe: 'response' });
  }

  getJdData(jdId):Observable<any>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription/${jdId}`)
  }

  jdList(): Observable<any>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`,  {headers: this.headers, observe: 'response'} );
   }

  getCandidate(id: string): Observable<IResponse>{
    return this.http.get<IResponse>(`${USER_DOMAIN}/api/candidate/${id}`, this.options)
  }

  sendMails(mailingList,jdId): Observable<any> {
    let mailObj= {
      jdId: jdId,
      mailList: mailingList
    }
    return this.http.post<any>(`${USER_DOMAIN}/api/jdEmail`, mailObj, { ...this.options, observe: 'response' });
  }

  search(character: string = "", page: number = 1): Observable<IResponse> {
    const params: HttpParams = new HttpParams().set('character', character).set("pagination", "true").set("page", page.toString());
    return this.http.get<IResponse>(`${USER_DOMAIN}/api/jobDescriptionSearch`, {...this.options, params})
  }
  getAllInterviews(): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${USER_DOMAIN}/api/interview`, this.options);
}
deleteInterview(interviewObjectId): Observable<IResponse>{
  return this.http.delete<any>(`${USER_DOMAIN}/api/interview/${interviewObjectId}`, this.options);
}
getInterviewById(Id): Observable<HttpResponse<any>>{
  return this.http.get<any>(`${USER_DOMAIN}/api/interview/${Id}`, this.options);
}

}
