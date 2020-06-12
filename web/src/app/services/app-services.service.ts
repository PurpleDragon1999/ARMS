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
    Authorization: localStorage.getItem("Authorization")
  });
  
  token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTE5Mjg5MDAsImV4cCI6MTU5MTk1NzcwMCwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJlMmM4MjdmOC1lMzk0LTQ1ZDctOTZiZi04OTVjMDRlZWZhY2YiLCJhdXRoX3RpbWUiOjE1OTE5Mjg5MDAsImlkcCI6ImxvY2FsIiwibmFtZSI6Ik1heXVyaSIsImxhc3RfbmFtZSI6IkJoYWRhbmUiLCJlbWFpbCI6Im1heXVyaS5iaGFkYW5lQGN5Z3JwLmNvbSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhY2NvdW50IiwibG1zIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInBhc3N3b3JkIl19.vMVJj42Njx1wBBxFLomuZgSwIU2EtBq6q0zFFusMXpywV1dTJtXAQaFQcrF0OrUGBzmR3B0_cawW_VH7KeUHswXeAlq-QtSycobF03haLv941RrJw5Ktpo2Uv__JPj3OTg_Xsao4p4hjZ_u23czvwzqW0R_RVHhuFkvt-cyYW7KPP6AX6DSBX_tgrGtnA7LGyeVVCgf0-Zvj1eHMNrnn4NPtZ1CIAAQezLiFSc3dIqtIwmxPvNXVvM0_rgZVqwGj6WjZI0L7fdBbTgSjD2L76l-5RnXGfd1TOJ_5IOdBk2rswLrLiqgrNl76Nj2mvyW7LyiRnJzU3m5PzH7rnwDpod7SsjUBa2kV90CkWqDoCzo12ZIXnPG5FtYD3ffBLDMM7RfNHR019mJLf6a1H0WzXFFe0tjo2UScReZtEGvyqdVnv5LQU0Hu-9vd8Ss_GCGfJFpFbFs5Doj44zicAZiBnz8GfzBBtRmNceG3VGD3ohwC2WwzoOmkpfSe5eQVRsdakXOkeeimhtCzwoCdt_C3uzWWO_t3TmApYjH7_PfzvpM2C8JkFPQ7iylK1OWwptgWcBTi9VhlSfdm5rFwZq5QiudF6o6WdyPLzF5vxC-RLLuqY_tZASUKkY6x0yrilhUj9xVsf7tEs2UHkS9rlC7AMsidaHM6lws1PrKaMytiWEg'




  createHeader: HttpHeaders= new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization" : this.token
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
    return this.http.post<any>(`${USER_DOMAIN}/api/assessment`, user, { ...this.options, observe: 'response' });
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

  getJdData(jdId):Observable<any>{
    return this.http.get<any>(`http://localhost:40802/api/JobDescription/${jdId}`, this.options)
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

}
