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
            Authorization: localStorage.getItem("Authorized")
       
      });

    private options = {
        headers: this.headers
        
    }

    constructor(private http: HttpClient) { };

    searchCandidate(page: number = 1, character: string = '') {
        const params: HttpParams = new HttpParams().set('character', character).set('page', page.toString());

        return this.http.get<IResponse>(
            CANDIDATE_SEARCH,
            { ...this.options, params }
        );
    }

    getApplications(jobId:number=0){
        
        return this.http.get<IResponse>(
               
           `${CANDIDATE_API}?jobId=${jobId}`, this.options
            )
        
        }

    getApplication(id): Observable<IResponse>{
        return this.http.get<IResponse>(
            `${CANDIDATE_API}/${id}`, this.options)
      }

    createCandidate(candidateObj){
        return this.http.post<IResponse>(
            CANDIDATE_API, candidateObj, this.options
        )
    }

    getResume(id : number = 0) : Observable<IResponse>{
        return this.http.get<IResponse>(`${RESUME_API}?applicationId=${id}`, this.options)
    }

    deleteApplication(id ): Observable<IResponse>{
        return this.http.delete<IResponse>(`${CANDIDATE_API}/${id}`, this.options)
    }

    getIdProofTypes(){
        return this.http.get<IResponse>(
           `${HOST}/api/IdProofType`, this.options
        )
    }

    updateApplication(applicationObj, applicationId:number){
        return this.http.put<IResponse>(`${CANDIDATE_API}/${applicationId}`, applicationObj, this.options)
    }

    shorlistCandidates(jobId:number,candidatesIdList : Array<number>, isShortlisted : boolean = true){
        return this.http.patch<IResponse>(`${CANDIDATE_API}/${jobId}?shortlisted=${isShortlisted}`, candidatesIdList,this.options)
    }
}