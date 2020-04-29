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
header_token: HttpHeaders = new HttpHeaders().set("x-auth-token", localStorage.getItem("x-auth-token"));

  constructor(private http: HttpClient) { }

  //Regarding tokens
  getToken(): string {
    return localStorage.getItem('');
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken());
  }

  // For making HTTP calls
   // return this.http.post<any>(`${USER_DOMAIN}/api/candidate`,candidateObj,{ ... this.headers, observe :'response'});
  //}

  createInterview(user: ICreate): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/interview`, user, { headers: this.header_token, observe: 'response' });
  }   

  jdFormData(jdFormObject): Observable<any>{
    
    return this.http.post<any>(`${USER_DOMAIN}/api/jobDescription`, jdFormObject/*, {headers: this.headers, observe: 'response'}*/);
  }

  jdList(): Observable<any>{
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`,  {headers: this.header_token, observe: 'response'} );
  }
}

