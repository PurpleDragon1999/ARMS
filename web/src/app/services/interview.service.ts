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
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTI0MDg3MjIsImV4cCI6MTU5MjQzNzUyMiwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJhMzhkZjNmYi0wOTZlLTQ1OGMtODljMS0xMmNkNjM4Y2Q5NjYiLCJhdXRoX3RpbWUiOjE1OTI0MDg3MjIsImlkcCI6ImxvY2FsIiwibmFtZSI6IlNvbmFsaSIsImxhc3RfbmFtZSI6IkNoYXdsYSIsImVtYWlsIjoic29uYWxpLmNoYXdsYUBjeWdycC5jb20iLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYWNjb3VudCIsImxtcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.hbtRd2lPH3xFE-Qs2DK7XumAJfEPEAH5MjdNRl6C6Be8XMz8RPTR8rTozmH5Y_Ie1Tqb5GlzpPkjrVBLyX-x-xlUkR3jO9bj97It8iLP4HeMqNHa63n59vwOzxFhkGaLuogQ13xL3TlS1ofps7TrG2SoxSnKa3zuS-A_UiN-gtdrrQ8g-hkeU9mS4pzk_5_XmpchPUSE6mvu0s7OvGKH2rLqonxpyvlm1KQVz-M5uJiKSTjVOpvwoga5F3BtUep3Tcbib4HfkO1ymrz7yeYEBZ2Ke5geTLXtbdQx1MemOmVukmTLm7osrFg47IS2hQXqFoaG9WCUiPkw4bm_hT__21z1b80jRUfD9qt4qnU_2ExPwEXcrr_MDfY2N-uv4unO1eFBx5dIQ0NoP15MaQBX9CjT9AwTm9EWrEMQ7KlX8oItW0xhz2Ic1Q-9C63PtLROfRM1VFHnUQVS9altGW8RqN8m0j6gwbdZZTr35E-uHhYpMMKErZD_2YRSzgkIK1zlvV84xu4rdqFHda1tw8nJF5JGOb6mjBn8Al7exq2vrvwMRA5p2qvPKep-SQx66DhOqoY95fAX0nn_yaI9a3tNwx4aE9PvxliUKtzDqMMqzec1x5EQfA2OUl3W2MgMdX2IkK6ChNdoI-6YsYjN0I38K69FrraA6uWXCyNVOM1fu5w"
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

  getInterview(id: number):Observable<any>{
    return this.http.get<any>(
      `http://localhost:40802/api/interview/${id}`, this.options
    )
  }

  getRounds(id: number, append: number):Observable<any>{
    return this.http.get<any>(
      `http://localhost:40802/api/interview/${id}?append=${append}`, this.options
    )
  }

  updateInterview (id:number, updateObj):Observable<any>{
    return this.http.patch<any>(
      `http://localhost:40802/api/interview/${id}`, updateObj, this.options
    )
  }
  
  updateRound( id:number, roundID: number, updateObj):Observable<any>{
    return this.http.patch<any>(
      `http://localhost:40802/api/interview/${id}?roundID=${roundID}`, updateObj, this.options
    )
  }
}


