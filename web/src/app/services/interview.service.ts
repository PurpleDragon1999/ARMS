import { Injectable } from '@angular/core';
import { IResponse } from '../models/response.interface';
import { HttpHeaders, HttpResponse, HttpClient, HttpParams } from "@angular/common/http";
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
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTIzNzkzNTgsImV4cCI6MTU5MjQwODE1OCwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJhMzhkZjNmYi0wOTZlLTQ1OGMtODljMS0xMmNkNjM4Y2Q5NjYiLCJhdXRoX3RpbWUiOjE1OTIzNzkzNTgsImlkcCI6ImxvY2FsIiwibmFtZSI6IlNvbmFsaSIsImxhc3RfbmFtZSI6IkNoYXdsYSIsImVtYWlsIjoic29uYWxpLmNoYXdsYUBjeWdycC5jb20iLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYWNjb3VudCIsImxtcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.iM68ghJAXaqqbfWeTwBBCWAYAg-1Hh6FA629XoWC4QPgQQ0v8dsyP6bnYiu_byPsbMRUkAJXCFHeovMTTiMo7CeJJ7B4h4yNbFvptvbvlhVJ-c_cP8jeqTmEQA5ayBHyacKgQ7dTX-dXQNJMPZdpL2yAC78NaSbofGLWwvFAKLuaGE-_nDZ6Pq3Gh6DZStDwci4XLcUcdmvnC1LU2d9SeRHBcVMNRSnWTYVh_F7uwV82_8YLW6RUF9xqrLr1XKSVorPjbON1nof-3jWVlrApCTJBq_e_WDQfb984DFVhiajy8QWAmdoQybLBGJI8Q4fMsOHzMSk-u1lH8V6SAk0q-oPx8k9qOSLqI9iBKU3vKm6TTBWuELOVQGWcJ5gj6KZUnnwGrKrvKXewtaEqmbJbUSvVcQ-XYnxgMriEB5dgJ8B_lva-5w8H0l9CFT8b_S2ix5HhHgOKHvuH24nf-rcpbND_nRufBkRdm8_f5sRPTscFQBeAj4nArdyqE5iO-sqYa1VABKl4OgEfUFC6B6bkJnmj5s5Actpsf1pgBWK8GeBiMWmtHCJrVnHMNQSd4l4cLaeykHb8AIBV0ILogkJeBrTmanIVSioCE237oeqd_J5n9jbibas5UwCY1Wjy79StaKYgzARJg5Bmt_m4h3ycIbhhR9BsayEH1xvP5INODh0"
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

  //new
  getInterview():Observable<any>{
    return this.http.get<any>(
      `http://localhost:40802/api/interview/66?append=1`, this.options
    )
  }
 
  createInterview(interviewObj: any):Observable<HttpResponse<any>>{
    return this.http.post<any>(`http://localhost:40802/api/interview`, interviewObj, { ...this.options, observe: 'response' } )
  }

  getLocation():Observable<any>{
    return this.http.get<any>(
      `http://localhost:40802/api/location`, this.options
    )
  }

  getRoundTypes():Observable<any>{
    return this.http.get<any>(
      `http://localhost:40802/api/roundType`, this.options
    )
  }
}


