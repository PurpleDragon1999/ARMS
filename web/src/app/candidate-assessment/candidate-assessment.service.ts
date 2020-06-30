import { Injectable } from "@angular/core";
import { HOST } from "../config/apiHost.config";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { IResponse } from "../models/response.interface";

const CANDIDATE_ASSESSMENT_API = `${HOST}/api/assessment`;
const APPLICATION_API = `${HOST}/api/application`;
const ASSESSMENT_FILTERED_API = `${HOST}/api/assessment/filtered-round-list`;

@Injectable({
  providedIn: "root",
})
export class CandidateAssessmentService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("Authorized"),
  });

  options = {
    headers: this.headers,
  };
  constructor(private http: HttpClient) {}

  getApplication(jdId: string, candidateId: string): Observable<IResponse> {
    const params: HttpParams = new HttpParams()
      .set("jdId", jdId)
      .set("candidateId", candidateId);
    return this.http.get<IResponse>(`${APPLICATION_API}`, {
      ...this.options,
      params,
    });
  }

  getCriteriaType(jdId: string): Observable<IResponse> {
    const params: HttpParams = new HttpParams().set("jdId", jdId);
    return this.http.get<IResponse>(`${ASSESSMENT_FILTERED_API}`, {
      ...this.options,
      params,
    });
  }

  storeAssessment(data: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      CANDIDATE_ASSESSMENT_API,
      data,
      this.options
    );
  }

  getAssessment(data: any): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${CANDIDATE_ASSESSMENT_API}/round/${data.roundId}/application/${data.applicationId}`,
      { ...this.options }
    );
  }
}
