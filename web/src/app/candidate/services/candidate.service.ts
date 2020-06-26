import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HOST } from 'src/app/config/apiHost.config';
import { Observable, from } from 'rxjs';
import { IResponse } from 'src/app/models/response.interface';
import {INewResponse} from 'src/app/models/newResponse.interface'

const CANDIDATE_API = `${HOST}/api/candidate`;
const CANDIDATE_SEARCH = `${HOST}/api/candidateSearch`;

@Injectable({
    providedIn: 'root'
})


export class CandidateService {

    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
            Authorization: localStorage.getItem("Authorized")
           //hard code token here
       
      });

    private options = {
        headers: this.headers
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

    getApplications(jobId:number=0){
        if(jobId!=0){
        return this.http.get<INewResponse>(
           
           `${CANDIDATE_API}?jobId=${jobId}`, this.options
        )
        }
        else{
            return this.http.get<INewResponse>(
             CANDIDATE_API, this.options
             )
        }
    }

    getApplication(id: string): Observable<INewResponse>{
        return this.http.get<INewResponse>(`${CANDIDATE_API}/${id}`, this.options)
      }

    getIdProofTypes(){
        return this.http.get<INewResponse>(
           `${HOST}/api/IdProofType`, this.options
        )
    }

    createCandidate(candidateObj){
        return this.http.post<INewResponse>(
                       CANDIDATE_API,candidateObj, this.options
        )
    }
}