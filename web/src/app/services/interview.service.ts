import { Injectable } from '@angular/core';
import { IResponse } from '../models/response.interface';
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { HOST } from "../config/apiHost.config";
const INTERVIEW_SEARCH = `${HOST}/api/interviewSearch`;
const INTERVIEW_API=`${HOST}/api/interview`
@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  options = {
    headers: this.headers,
  };
  constructor(private http: HttpClient) { }
  searchInterview(page: number = 1, character: string = '') {
    const params: HttpParams = new HttpParams().set('character', character).set('page', page.toString()).
    set('pagination','true');

    return this.http.get<IResponse>(
      INTERVIEW_SEARCH,
      { ...this.options, params }
    );
  }
  deleteEmployee(interviewId: String): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${INTERVIEW_API}/${interviewId}`,
      this.options
    );
  }
}


