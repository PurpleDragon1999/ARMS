import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HOST } from 'src/app/config/apiHost.config';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/models/response.interface';

const CANDIDATE_API = `${HOST}/api/candidate`;
const CANDIDATE_SEARCH = `${HOST}/api/candidateSearch`;

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
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
}