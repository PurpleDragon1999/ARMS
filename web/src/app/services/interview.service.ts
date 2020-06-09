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
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTE2OTc4NzIsImV4cCI6MTU5MTcyNjY3MiwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJhMzhkZjNmYi0wOTZlLTQ1OGMtODljMS0xMmNkNjM4Y2Q5NjYiLCJhdXRoX3RpbWUiOjE1OTE2OTc4NzIsImlkcCI6ImxvY2FsIiwibmFtZSI6IlNvbmFsaSIsImxhc3RfbmFtZSI6IkNoYXdsYSIsImVtYWlsIjoic29uYWxpLmNoYXdsYUBjeWdycC5jb20iLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYWNjb3VudCIsImxtcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.Cd6jyyaRPmXnMY71644C2yWod_qeTRogtZn9m1fUDi7mCsqReUfIJ1lEu4zCbmnBwN_K6pQWoU4jL2DUxColIAl5RSwVt7Bs7ajVDXHt6kYj6fSM91JZYKZmTTH3rqwSclkwCFrlSjoliV9m_xeP9OBytQNKSzaP7kN60mn4RfPjMmunBXoz7NtIJ1XR2vL_rMGZSLcnM2UGygEi_u-OZs44qCXDx1yc9SqYVtnpXWp76o8agXd6v9PbPHdYYH5gfwT3zTAFXVT2KS7LPzy8HRjyQzmryFrMEdhTcREbrsfdT7B-2gPUBRknp9-u0d2CoyM-HEaHuSAbKsvSh-q7fGhWSVxFxDBI6krjevuVPVdhhqN5DUT9cRwgQstcElnyBHeWQEmPi72yBq-ZcvZCyZeq9ahV_IofSQaDocPHPAfgYPm3fYT6mg0y_Jaa0I-G8xM_IKqCHzen4sb57On4HDvxvt3F3V9yGANE_MCZV5IdqCh7RWPpgh4ZMlvXrEtb0M3I0hyODkMS3g6P7PkXtLnrszDfbncYhxrx4eO3YK1gekJImqfAlHkQcR4vHUaaV-k-WR5M48caQCxvdpwYq1x0Nh4w2GCJXsDnIS-4LDuLzJ14e2847dENR_iLYwLW0lRM0NS0TbI2QybNqCu-EpsgLjlLQyp2k9y00NEXX-w"
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


