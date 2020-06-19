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
        Authorization: localStorage.getItem("Authorization")
       //hard code token here
   
  });
  
  token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTI0NjY1ODQsImV4cCI6MTU5MjQ5NTM4NCwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJlMmM4MjdmOC1lMzk0LTQ1ZDctOTZiZi04OTVjMDRlZWZhY2YiLCJhdXRoX3RpbWUiOjE1OTI0NjY1ODQsImlkcCI6ImxvY2FsIiwibmFtZSI6Ik1heXVyaSIsImxhc3RfbmFtZSI6IkJoYWRhbmUiLCJlbWFpbCI6Im1heXVyaS5iaGFkYW5lQGN5Z3JwLmNvbSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhY2NvdW50IiwibG1zIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInBhc3N3b3JkIl19.iCGrrzNOxaVQylbO9KCqaHwvh6KZDLKek1EyABA4mzoUtZfr5ab43lH5qyt_flOIJPPoU-r73C7KJYMaY1jMtAPTtrkqJRrj1aKlAoW9BffQdyMRqskstEzv3P3t7c0ifbOqPL3qfnwMBze5mNgBgjJUxHM3lp6eSx23fjw5BxtAmFN71pB9MTJS5AgD8bo6Prb8iLPBHv70L80D8QTZ4GGwm3iITWQ4MYfn_hjJdpAmTZE1R9lW-LZUoJKahRnR3C_qn8my-5SGbdeB3OxfpNYo8bBiBpQgqG6bJZz5HmxmwP9f3y0ZlwTqv_zldq5l5Wj9LxVM794s_k_ozHFn6Yv2UFNLkEE624MjJ6CDu1emCu1du7vZMLcNdr-serUU7lurFQjef3FXnKI4YYP-2iWkd5v-pCi9TekvCf0Vd-okVX7ZEWrAgvUAKEiwSDje6SQ6hquHorO1jxbHsHqRkQUn0mlnh0UqSiPo14jl3bTMA8Bd3WEAo38l8ykI3HPQSzFrERr4akA9VFMVR87sun_YRHrhxn0aTD5ylCeKW9budV2nU7ShY5T2nB0-L1d154mp2khD5AyhT7ibiDY0RLciewQO3E2arauRgKN9zJXHN1rLwN0LYmB0ggf6fhl4KE0IL350o7kdmAxXJBilzVapH4j9oFt3OycdbIbISvg'

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
    return localStorage.getItem('Authorized');
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken());
  }

  getJdData(id):Observable<any>{
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/jobDescription/${id}`,this.options)
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
 getCandidate(id: string): Observable<IResponse>{
    return this.http.get<IResponse>(`${USER_DOMAIN}/api/candidate/${id}`, this.options)
  }
 search(character: string = "", page: number = 1): Observable<IResponse> {
    const params: HttpParams = new HttpParams().set('character', character).set("pagination", "true").set("page", page.toString());
    return this.http.get<IResponse>(`${USER_DOMAIN}/api/jobDescriptionSearch`, {...this.options, params})
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
