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
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem("Authorization")
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
  // headers: HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   // Authorization: localStorage.getItem("Authorization")
  // });
  // httpOptions = {
  //   headers: this.headers
  // };

  //return helper.decodeToken(localStorage.getItem(''));


  // For making HTTP calls
  createInterview(user: ICreate): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/interview`, user, { ...this.options, observe: 'response' });
  }
  getAllJobs(): Observable<HttpResponse<any>>{
      return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`, this.options);
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

  getJdData(jdId): Observable<any>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription/${jdId}`)
  }

  jdList(): Observable<any>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`,  {headers: this.headers, observe: 'response'} );
  }

  getCandidate(id: string): Observable<IResponse>{
    return this.http.get<IResponse>(`${USER_DOMAIN}/api/candidate/${id}`, this.options)
  }

  sendMails(mailingList): Observable<any> {
    return this.http.post<any>(`${USER_DOMAIN}//api/jdEmail`, mailingList, { ...this.options, observe: 'response' });
  }
}