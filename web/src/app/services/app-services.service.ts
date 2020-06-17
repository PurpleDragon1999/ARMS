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
  
  token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTIzNzgzOTYsImV4cCI6MTU5MjQwNzE5NiwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJlMmM4MjdmOC1lMzk0LTQ1ZDctOTZiZi04OTVjMDRlZWZhY2YiLCJhdXRoX3RpbWUiOjE1OTIzNzgzOTYsImlkcCI6ImxvY2FsIiwibmFtZSI6Ik1heXVyaSIsImxhc3RfbmFtZSI6IkJoYWRhbmUiLCJlbWFpbCI6Im1heXVyaS5iaGFkYW5lQGN5Z3JwLmNvbSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhY2NvdW50IiwibG1zIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInBhc3N3b3JkIl19.HBphfFCaxl6X4LNY7o17Vz4jhHP0MG6r_AZ-zsJL2-54gi1jlal3CMHr6Al7Hpq3axY2aEgDecCzl0X-nJ1M48X_B3Va0ayfgzjSAAaKeOpyR8du0npPt91MvFBLdWSa4W6Jf-rSuCgyxJQqcpQnLEDp5xGnC9sGAwYkd18f5PuKLGnVlXejDoOf4604PrRgEhmWO3_xVbLCy9YJfz8zzCITiCs6uLutI2xx66EzPj8syaEzQO-c_rJAjAo9ftvXxkydqdS_K6RlwDxMuYhmHicUfoTkUKjFSdRAg3-DAypsqTlbKXe6pdAlIm9n5gt5XasRbx6YQKcHk2KeI07b1D1p-KGOYDpUjwik1ZIQNBXB5JSii3t_mcoVhYm9jyddZ-dT30vAIb0UrbRjlE-US0xiX1Axf0JTT3MyNkeSL5vxR9GQYaWJU-W36W64BJOshb8Cyaw_pHK1KdaNJIU2kM33WU1hD3P3vQXkYO6ySzbamAU9oU0RLT4BNjfBXN8r3LnM38zu0sUTr0g4W3ykzVYdz0ITjNZzHOXeqQ1UarNaglRiPFNZ_UrOWWSAgect6nS-632h4GulFQEkK1PjFHtbYQRDlvjJ_yH41OXpHC4ab6xpBxSNSKz8pyiAgN2sR071pav92K3ybc3-6-3nlOL6EBLBRBQOFO-ac-_F1TI'

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
