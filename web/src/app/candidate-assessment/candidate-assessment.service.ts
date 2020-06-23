import { Injectable } from '@angular/core';
import { HOST } from '../config/apiHost.config';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IResponse} from '../models/response.interface';

const CANDIDATE_ASSESSMENT_API = `${HOST}/api/candidate`;
const APPLICATION_API = `${HOST}/api/application`;

@Injectable({
    providedIn: 'root'
})
export class CandidateAssessmentService {
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    options = {
        headers: this.headers
    }
    constructor(private http: HttpClient) { }

    getApplication(jdId: string, candidateId: string): Observable<IResponse> {
      const params: HttpParams = new HttpParams().set('jdId', jdId).set('candidateId', candidateId);
      return this.http.get<IResponse>(`${APPLICATION_API}`, { ...this.options, params });
    }
}
