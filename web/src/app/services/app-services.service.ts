import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const USER_DOMAIN = 'http://localhost:3000';
import { ICreate} from '../models/create.interface';
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

    //return helper.decodeToken(localStorage.getItem(''));
  //}
  // headers: HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   // Authorization: localStorage.getItem("Authorization")
  // });
  // httpOptions = {
  //   headers: this.headers
  // };


  // For making HTTP calls
   // return this.http.post<any>(`${USER_DOMAIN}/api/candidate`,candidateObj,{ ... this.headers, observe :'response'});
  //}

  createInterview(user: ICreate): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/interview`, user, { ...this.options, observe: 'response' });
  }   

  jdFormData(jdFormObject): Observable<any>{
    
    return this.http.post<any>(`${USER_DOMAIN}/api/jobDescription`, jdFormObject/*, {headers: this.headers, observe: 'response'}*/);
  }

  jdList(): Observable<any>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`,  {headers: this.headers, observe: 'response'} );
  }
}

