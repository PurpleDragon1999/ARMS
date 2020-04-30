<<<<<<< HEAD
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs";
const USER_DOMAIN = "http://localhost:3000";
import { ICreate } from "../models/create.interface";
=======
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreate} from '../models/create.interface';

const USER_DOMAIN = 'http://localhost:3000';

>>>>>>> 5d1af347f43cfbc2821d7c73ecae63c3d0978177
@Injectable({
  providedIn: "root",
})

export class AppServicesService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("Authorization"),
  });
  createHeader: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  header_token: HttpHeaders = new HttpHeaders().set(
    "x-auth-token",
    localStorage.getItem("x-auth-token")
  );

  httpOptions = {
    headers: this.headers,
  };
  options = {
    headers: this.createHeader,
  };

  constructor(private http: HttpClient) {}

  //Regarding tokens
  getToken(): string {
    return localStorage.getItem("");
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(localStorage.getItem(""));
  }


  createInterview(user: ICreate): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${USER_DOMAIN}/api/interview`, user, {
      ...this.options,
      observe: "response",
    });
  }

  getAllJobs(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${USER_DOMAIN}/api/jobDescription`,
      this.options
    );
  }

  deleteJd(jobObjId): Observable<HttpResponse<any>> {
    return this.http.delete<any>(
      `${USER_DOMAIN}/api/jobDescription/${jobObjId}`,
      this.options
    );
  }

  jdFormData(jdFormObject): Observable<any> {
    return this.http.post<any>(
      `${USER_DOMAIN}/api/jobDescription`,
      jdFormObject /*, {headers: this.headers, observe: 'response'}*/
    );
  }
  getJdData(jdId): Observable<any> {
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription/${jdId}`);
  }

  jdList(): Observable<any> {
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`, {
      headers: this.headers,
      observe: "response",
    });
  }
}
