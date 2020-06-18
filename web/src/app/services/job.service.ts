import { Injectable } from '@angular/core';
import { IAssessment } from './../models/assessment.interface';
import { IResponse } from 'src/app/models/response.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreate} from '../models/create.interface';
const DOTNET_DOMAIN='http://localhost:40802';
@Injectable({
  providedIn: 'root'
})
export class JobService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
        Authorization: localStorage.getItem("Authorized")
       //hard code token here
   
  });
  httpOptions = {
    headers: this.headers
  };
  constructor(private http: HttpClient) { }

    getAllJobs(): Observable<any>{
      return this.http.get<any>(`${DOTNET_DOMAIN}/api/jobDescription`,this.httpOptions);
    }
  jdFormData(jdFormObject): Observable<any>{
    return this.http.post<any>(`${DOTNET_DOMAIN}/api/jobDescription`, jdFormObject, { ...this.httpOptions, observe: 'response' });
    }
    getJdData(id):Observable<any>{
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/jobDescription/${id}`,this.httpOptions)
    }
    updateJobInfo(jobFormObject,jobId): Observable<HttpResponse<any>>{
      return this.http.put<any>(`${DOTNET_DOMAIN}/api/jobDescription/${jobId}`,jobFormObject, {...this.httpOptions,observe: 'response'});
    }
    deleteJd(id): Observable<any>{
      return this.http.delete<any>(`${DOTNET_DOMAIN}/api/jobDescription/${id}`, {...this.httpOptions,observe: 'response'});
    }
    sendMails(mailingList,jdId): Observable<any> {
      let mailObj= {
        jobDescriptionId: jdId,
        emailList: mailingList
       }
      return this.http.post<any>(`${DOTNET_DOMAIN}/api/jdEmail`, mailObj, { ...this.httpOptions, observe: 'response' });
    }
    

  


  
  
}
