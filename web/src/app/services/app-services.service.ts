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
       // Authorization: localStorage.getItem("Authorization")
       //hard code token here
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTE2ODI2ODMsImV4cCI6MTU5MTcxMTQ4MywiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJhMzhkZjNmYi0wOTZlLTQ1OGMtODljMS0xMmNkNjM4Y2Q5NjYiLCJhdXRoX3RpbWUiOjE1OTE2ODI2ODMsImlkcCI6ImxvY2FsIiwibmFtZSI6IlNvbmFsaSIsImxhc3RfbmFtZSI6IkNoYXdsYSIsImVtYWlsIjoic29uYWxpLmNoYXdsYUBjeWdycC5jb20iLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYWNjb3VudCIsImxtcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.BFJWCa8sQzIw0q6WF8C-XRWdD3guzsD-qq-R3_XfS3E1JfXzZG-Z1hHC_PvcYU6luA_9cNHi0uqRapLbOezFnIzsK7L9bR-GpiBkqdywLqBIMR5l8JNmgupDSB8HhORv3wHrz8qXs0DOtAyPqszfVTru50fPhGs_qMB6Ms_P-oAl4g181_IIwnGnGj6bfFX5Inr-Sj1vNk6BBiTPuYh7ghU0W42oI3NGk4TARlvQbFXJdzjewEVYt-vQOJGYvAaXsQP-SoW_t7nyIKTsjya_bYiF2w2C5nWwmJVLsgCkBSGTJNVV-pkvXX7QQy9JFQ-MTx92I_IQQ0T7_DBcN1LTYsC4iJddSE08wvMqdBUStM-1FhYm9a5uE0lvrth81BgrSHCumaQWIY5VQ3tPuQ3UPJmqgtP4JoyD93WfByuw4ezfNSn8E42VDxMEQzcseRohjKqCZt7bWbPRmTn8LzRci5jRPrMS9Dz8zg9Olbj78qlbOm7zYD3pprrqA2_Q1Llj2-UJHG7UtT67rlSsAEy2h3EdPo0hBBxHtM-HJvbGwJJU_sGNbrZ89Gsn47z9uvnbj5L-o6BWpl47A5ZWdMHB7p_E_THNAW5ibiPQzDrK8gfxfz3m-HnSzpdAnyiAyPa369ug4mycJCPmhqCJBfAYw8ePzoezbE2dy6sBHgYWbHU'
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
  getAllJobs(): Observable<any>{
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/jobDescription`, this.httpOptions);
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
  getJobsById(Id): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription/${Id}`, this.options);
  }
  
  // updateJobInfo(jobFormObject,jobId): Observable<HttpResponse<any>>{
  //   return this.http.put<any>(`${USER_DOMAIN}/api/jobDescription/${jobId}`,jobFormObject, this.options);
  // }
  updateJobInfo(jobFormObject,jobId): Observable<HttpResponse<any>>{
       return this.http.put<any>(`${DOTNET_DOMAIN}/api/jobDescription/${jobId}`,jobFormObject, this.httpOptions);
     }
  deleteJd(id): Observable<IResponse>{
    return this.http.delete<any>(`${DOTNET_DOMAIN}/api/jobDescription/${id}`, this.httpOptions);
  }

  
  jdFormData(jdFormObject): Observable<any>{
    return this.http.post<any>(`${DOTNET_DOMAIN}/api/jobDescription`, jdFormObject, { ...this.httpOptions, observe: 'response' });
  }

 
  getJdData(id):Observable<any>{
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/jobDescription/${id}`,this.httpOptions)
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
