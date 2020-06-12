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
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization" : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTE5Mjg5MDAsImV4cCI6MTU5MTk1NzcwMCwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJlMmM4MjdmOC1lMzk0LTQ1ZDctOTZiZi04OTVjMDRlZWZhY2YiLCJhdXRoX3RpbWUiOjE1OTE5Mjg5MDAsImlkcCI6ImxvY2FsIiwibmFtZSI6Ik1heXVyaSIsImxhc3RfbmFtZSI6IkJoYWRhbmUiLCJlbWFpbCI6Im1heXVyaS5iaGFkYW5lQGN5Z3JwLmNvbSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhY2NvdW50IiwibG1zIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInBhc3N3b3JkIl19.vMVJj42Njx1wBBxFLomuZgSwIU2EtBq6q0zFFusMXpywV1dTJtXAQaFQcrF0OrUGBzmR3B0_cawW_VH7KeUHswXeAlq-QtSycobF03haLv941RrJw5Ktpo2Uv__JPj3OTg_Xsao4p4hjZ_u23czvwzqW0R_RVHhuFkvt-cyYW7KPP6AX6DSBX_tgrGtnA7LGyeVVCgf0-Zvj1eHMNrnn4NPtZ1CIAAQezLiFSc3dIqtIwmxPvNXVvM0_rgZVqwGj6WjZI0L7fdBbTgSjD2L76l-5RnXGfd1TOJ_5IOdBk2rswLrLiqgrNl76Nj2mvyW7LyiRnJzU3m5PzH7rnwDpod7SsjUBa2kV90CkWqDoCzo12ZIXnPG5FtYD3ffBLDMM7RfNHR019mJLf6a1H0WzXFFe0tjo2UScReZtEGvyqdVnv5LQU0Hu-9vd8Ss_GCGfJFpFbFs5Doj44zicAZiBnz8GfzBBtRmNceG3VGD3ohwC2WwzoOmkpfSe5eQVRsdakXOkeeimhtCzwoCdt_C3uzWWO_t3TmApYjH7_PfzvpM2C8JkFPQ7iylK1OWwptgWcBTi9VhlSfdm5rFwZq5QiudF6o6WdyPLzF5vxC-RLLuqY_tZASUKkY6x0yrilhUj9xVsf7tEs2UHkS9rlC7AMsidaHM6lws1PrKaMytiWEg'
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

    getIdProofTypes(){
        return this.http.get<INewResponse>(
            "http://localhost:40802/api/IdProofType", this.options
        )
    }
}