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

    getApplications(){
        return this.http.get<INewResponse>(
            "http://localhost:40802/api/candidate", this.options
        )
    }

    getApplication(id: string): Observable<INewResponse>{
        return this.http.get<INewResponse>(`http://localhost:40802/api/candidate/${id}`, this.options)
      }

    getIdProofTypes(){
        return this.http.get<INewResponse>(
            "http://localhost:40802/api/IdProofType", this.options
        )
    }

    createCandidate(candidateObj){
        return this.http.post<INewResponse>(
            "http://localhost:40802/api/candidate", candidateObj, this.options
        )
    }
}