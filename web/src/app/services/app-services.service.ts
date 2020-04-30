import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Observable} from 'rxjs';
import { HttpClient, HttpClientModule, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { ICreate} from '../models/create.interface';


const USER_DOMAIN: string = 'http://localhost:3000';


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
    return localStorage.getItem('');
  }


  createInterview(user: ICreate): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/interview`, user, { ...this.options, observe: 'response' });
}   

  getAllJobs(): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`, this.options);
}

deleteJd(jobObjId): Observable<HttpResponse<any>>{
  return this.http.delete<any>(`${USER_DOMAIN}/api/jobDescription/${jobObjId}`, this.options);
}  

  jdFormData(jdFormObject): Observable<any>{
    return this.http.post<any>(`${USER_DOMAIN}/api/jobDescription`, jdFormObject);
  }
  getJdData(jdId):Observable<any>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription/${jdId}`)
  }

  jdList(): Observable<any>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`,  {headers: this.headers, observe: 'response'} );
  }
}

