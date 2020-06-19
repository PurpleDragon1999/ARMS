import { InterviewService } from './../../services/interview.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HOST } from 'src/app/config/apiHost.config';
import { Observable, from } from 'rxjs';
import { IResponse } from 'src/app/models/response.interface';
import {INewResponse} from 'src/app/models/newResponse.interface'

const CANDIDATE_API = `${HOST}/api/candidate`;
const RESUME_API = `${HOST}/api/resume`;
const CANDIDATE_SEARCH = `${HOST}/api/candidateSearch`;

@Injectable({
    providedIn: 'root'
})

export class CandidateService {

    token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTI0NjY1ODQsImV4cCI6MTU5MjQ5NTM4NCwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJlMmM4MjdmOC1lMzk0LTQ1ZDctOTZiZi04OTVjMDRlZWZhY2YiLCJhdXRoX3RpbWUiOjE1OTI0NjY1ODQsImlkcCI6ImxvY2FsIiwibmFtZSI6Ik1heXVyaSIsImxhc3RfbmFtZSI6IkJoYWRhbmUiLCJlbWFpbCI6Im1heXVyaS5iaGFkYW5lQGN5Z3JwLmNvbSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhY2NvdW50IiwibG1zIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInBhc3N3b3JkIl19.iCGrrzNOxaVQylbO9KCqaHwvh6KZDLKek1EyABA4mzoUtZfr5ab43lH5qyt_flOIJPPoU-r73C7KJYMaY1jMtAPTtrkqJRrj1aKlAoW9BffQdyMRqskstEzv3P3t7c0ifbOqPL3qfnwMBze5mNgBgjJUxHM3lp6eSx23fjw5BxtAmFN71pB9MTJS5AgD8bo6Prb8iLPBHv70L80D8QTZ4GGwm3iITWQ4MYfn_hjJdpAmTZE1R9lW-LZUoJKahRnR3C_qn8my-5SGbdeB3OxfpNYo8bBiBpQgqG6bJZz5HmxmwP9f3y0ZlwTqv_zldq5l5Wj9LxVM794s_k_ozHFn6Yv2UFNLkEE624MjJ6CDu1emCu1du7vZMLcNdr-serUU7lurFQjef3FXnKI4YYP-2iWkd5v-pCi9TekvCf0Vd-okVX7ZEWrAgvUAKEiwSDje6SQ6hquHorO1jxbHsHqRkQUn0mlnh0UqSiPo14jl3bTMA8Bd3WEAo38l8ykI3HPQSzFrERr4akA9VFMVR87sun_YRHrhxn0aTD5ylCeKW9budV2nU7ShY5T2nB0-L1d154mp2khD5AyhT7ibiDY0RLciewQO3E2arauRgKN9zJXHN1rLwN0LYmB0ggf6fhl4KE0IL350o7kdmAxXJBilzVapH4j9oFt3OycdbIbISvg'

    private headers: HttpHeaders = new HttpHeaders({
        //'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary8stRCYuYwbDNHNHm',
        "Authorization" : this.token,

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

    getApplications(){
        return this.http.get<INewResponse>(
            CANDIDATE_API, this.options
        )
    }

    getApplication(id: number): Observable<INewResponse>{
        return this.http.get<INewResponse>(`${CANDIDATE_API}/${id}`, this.options)
      }

    createCandidate(candidateObj){
        return this.http.post<INewResponse>(
            CANDIDATE_API, candidateObj, this.options
        )
    }

    getResume(id : number) : Observable<INewResponse>{
        return this.http.get<INewResponse>(`${RESUME_API}/${id}`, this.httpOptions)
    }
}