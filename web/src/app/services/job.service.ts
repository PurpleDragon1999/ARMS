import { Injectable } from '@angular/core';
import { IAssessment } from './../models/assessment.interface';
import { IResponse } from 'src/app/models/response.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreate} from '../models/create.interface';
import { HOST } from 'src/app/config/apiHost.config';

@Injectable({
  providedIn: 'root'
})

export class JobService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
        Authorization: localStorage.getItem("Authorized")
  });
  
  httpOptions = {
    headers: this.headers
  };
  constructor(private http: HttpClient) { }

    getAllJobs(): Observable<IResponse>{
      return this.http.get<IResponse>(`${HOST}/api/jobDescription`,this.httpOptions);
    }
  jdFormData(jdFormObject): Observable<IResponse>{
    return this.http.post<IResponse>(`${HOST}/api/jobDescription`, jdFormObject, { ...this.httpOptions});
    }
    getJdData(id):Observable<IResponse>{
    return this.http.get<IResponse>(`${HOST}/api/jobDescription/${id}`,this.httpOptions)
    }
    updateJobInfo(jobFormObject,jobId): Observable<IResponse>{
      return this.http.put<IResponse>(`${HOST}/api/jobDescription/${jobId}`,jobFormObject, {...this.httpOptions});
    }
    deleteJd(id): Observable<IResponse>{
      return this.http.delete<IResponse>(`${HOST}/api/jobDescription/${id}`, {...this.httpOptions});
    }
    sendMails(mailingList,jdId): Observable<IResponse> {
      let mailObj= {
        jobDescriptionId: jdId,
        emailList: mailingList
       }
      return this.http.post<IResponse>(`${HOST}/api/jdEmail`, mailObj, { ...this.httpOptions });
    }
    searchJd(character:string){

      return this.http.get<IResponse>(`${HOST}/api/jobDescription/search?keyword=${character}`,{ ...this.httpOptions });

    }
    

  


  
  
}
