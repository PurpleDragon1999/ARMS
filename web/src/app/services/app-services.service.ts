import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const USER_DOMAIN = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  constructor(private http: HttpClient) { }

  //Regarding tokens

  getToken(): string {
    return localStorage.getItem('');
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(localStorage.getItem(''));
  }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: localStorage.getItem("Authorization")
  });
  httpOptions = {
    headers: this.headers
  };


  // For making HTTP calls
  createCandidate(candidateObj): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${USER_DOMAIN}/api/candidate`,candidateObj,{ ... this.headers, observe :'response'});
  }

}
