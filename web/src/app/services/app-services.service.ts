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

header_token: HttpHeaders = new HttpHeaders().set("Authentication", localStorage.getItem("Authentication"));

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

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(localStorage.getItem(''));
  }
 


  // For making HTTP calls
  createCandidate(candidateObj): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/candidate`,candidateObj,{ ... this.headers, observe :'response'});
  }

  createInterview(user: ICreate): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/interview`, user, { ...this.options, observe: 'response' });
}   
}

