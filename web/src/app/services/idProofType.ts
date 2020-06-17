import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HOST } from 'src/app/config/apiHost.config';
import { Observable, from } from 'rxjs';
import { IResponse } from 'src/app/models/response.interface';
import {INewResponse} from 'src/app/models/newResponse.interface'

const ID_PROOF_TYPE_API = `${HOST}/api/idProofType`;

@Injectable({
    providedIn: 'root'
})

export class IdProofTypeService {

    token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTIzNzgzOTYsImV4cCI6MTU5MjQwNzE5NiwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJlMmM4MjdmOC1lMzk0LTQ1ZDctOTZiZi04OTVjMDRlZWZhY2YiLCJhdXRoX3RpbWUiOjE1OTIzNzgzOTYsImlkcCI6ImxvY2FsIiwibmFtZSI6Ik1heXVyaSIsImxhc3RfbmFtZSI6IkJoYWRhbmUiLCJlbWFpbCI6Im1heXVyaS5iaGFkYW5lQGN5Z3JwLmNvbSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhY2NvdW50IiwibG1zIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInBhc3N3b3JkIl19.HBphfFCaxl6X4LNY7o17Vz4jhHP0MG6r_AZ-zsJL2-54gi1jlal3CMHr6Al7Hpq3axY2aEgDecCzl0X-nJ1M48X_B3Va0ayfgzjSAAaKeOpyR8du0npPt91MvFBLdWSa4W6Jf-rSuCgyxJQqcpQnLEDp5xGnC9sGAwYkd18f5PuKLGnVlXejDoOf4604PrRgEhmWO3_xVbLCy9YJfz8zzCITiCs6uLutI2xx66EzPj8syaEzQO-c_rJAjAo9ftvXxkydqdS_K6RlwDxMuYhmHicUfoTkUKjFSdRAg3-DAypsqTlbKXe6pdAlIm9n5gt5XasRbx6YQKcHk2KeI07b1D1p-KGOYDpUjwik1ZIQNBXB5JSii3t_mcoVhYm9jyddZ-dT30vAIb0UrbRjlE-US0xiX1Axf0JTT3MyNkeSL5vxR9GQYaWJU-W36W64BJOshb8Cyaw_pHK1KdaNJIU2kM33WU1hD3P3vQXkYO6ySzbamAU9oU0RLT4BNjfBXN8r3LnM38zu0sUTr0g4W3ykzVYdz0ITjNZzHOXeqQ1UarNaglRiPFNZ_UrOWWSAgect6nS-632h4GulFQEkK1PjFHtbYQRDlvjJ_yH41OXpHC4ab6xpBxSNSKz8pyiAgN2sR071pav92K3ybc3-6-3nlOL6EBLBRBQOFO-ac-_F1TI'

    private headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization" : this.token,

    });

    private options = {
        headers: this.headers
    }

    constructor(private http: HttpClient) { };

    getIdProofTypes(){
        return this.http.get<INewResponse>(
            ID_PROOF_TYPE_API, this.options
        )
    }

    
}