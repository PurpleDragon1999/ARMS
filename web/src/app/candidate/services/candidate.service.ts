import { InterviewService } from './../../services/interview.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HOST } from 'src/app/config/apiHost.config';
import { Observable, from } from 'rxjs';
import { IResponse } from 'src/app/models/response.interface';

const CANDIDATE_API = `${HOST}/api/candidate`;
const RESUME_API = `${HOST}/api/resume`;
const CANDIDATE_SEARCH = `${HOST}/api/candidateSearch`;

@Injectable({
    providedIn: 'root'
})

export class CandidateService {

    headers: HttpHeaders = new HttpHeaders({
        // 'Content-Type': 'application/json',
            Authorization: localStorage.getItem("Authorized")
           //hard code token here
       
      });

    private options = {
        headers: this.headers
        
    }

    private httpOptions = {
        headers: this.headers,
        'responseType'  : 'arraybuffer' as 'json'
    }

    

    constructor(private http: HttpClient) { };

    getCandidate(): Observable<IResponse> {
        return this.http.get<IResponse>(CANDIDATE_API, this.options);
    };

    searchCandidate(page: number = 1, character: string = '') {
        const params: HttpParams = new HttpParams().set('character', character).set('page', page.toString());

        return this.http.get<IResponse>(
            CANDIDATE_SEARCH,
            { ...this.options, params }
        );
    }

    getApplications():Observable<IResponse>{
        return this.http.get<IResponse>(
            CANDIDATE_API, this.options
        )
    }

    getApplication(id: number): Observable<IResponse>{
        return this.http.get<IResponse>(
            `${CANDIDATE_API}/${id}`, this.options)
      }

    createCandidate(candidateObj){
        return this.http.post<IResponse>(
            CANDIDATE_API, candidateObj, this.options
        )
    }

    getResume(id : number) : Observable<IResponse>{
        return this.http.get<IResponse>(`${RESUME_API}/${id}`, this.httpOptions)
    }

    deleteApplication(id ): Observable<IResponse>{
        return this.http.delete<IResponse>(`${CANDIDATE_API}/${id}`, this.options)
    }
}