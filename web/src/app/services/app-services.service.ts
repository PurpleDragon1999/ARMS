import { IAssessment } from "./../models/assessment.interface";
import { IResponse } from "src/app/models/response.interface";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICreate } from "../models/create.interface";

const USER_DOMAIN = "http://localhost:3000";
const DOTNET_DOMAIN = "http://localhost:40802";
@Injectable({
  providedIn: "root",
})
export class AppServicesService {
 
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("Authorization"),
    //hard code token here
  });

  createHeader: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  header_token: HttpHeaders = new HttpHeaders().set(
    "x-auth-token",
    localStorage.getItem("x-auth-token")
  );

  httpOptions = {
    headers: this.headers,
  };

  options = {
    headers: this.createHeader,
  };

  constructor(private http: HttpClient) {}

  //Regarding tokens
  getToken(): string {
    return localStorage.getItem("Authorized");
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken());
  }

  // For making HTTP calls

  //For searching with pagination
  searchCandidates(name: string, pagination: string) {
    return this.http.get<any>(
      `${USER_DOMAIN}/api/employeeSearch/?character=${name}&pagination=${pagination}`,
      this.options
    );
  }

  createInterview(user: ICreate): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${USER_DOMAIN}/api/interview`, user, {
      ...this.options,
      observe: "response",
    });
  }

  createAssessment(user: IAssessment): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${USER_DOMAIN}/api/assessment`, user, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  getAllIdProofTypes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/IdProofType`, {
      ...this.httpOptions,
    });
  }
  getAllRoundTypes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/RoundType`, {
      ...this.httpOptions,
    });
  }
  getAllJobs(): Observable<any> {
    return this.http.get<any>(
      `${DOTNET_DOMAIN}/api/jobDescription`,
      this.httpOptions
    );
  }

  getAllEligibilityCriterias(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${DOTNET_DOMAIN}/api/eligibilityCriteria`,
      this.httpOptions
    );
  }

  getAllEmploymentTypes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/employmentType`, {
      ...this.httpOptions,
    });
  }

  getJobsById(Id): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${USER_DOMAIN}/api/jobDescription/${Id}`,
      this.options
    );
  }

  // updateJobInfo(jobFormObject,jobId): Observable<HttpResponse<any>>{
  //   return this.http.put<any>(`${USER_DOMAIN}/api/jobDescription/${jobId}`,jobFormObject, this.options);
  // }
  updateJobInfo(jobFormObject, jobId): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `${DOTNET_DOMAIN}/api/jobDescription/${jobId}`,
      jobFormObject,
      { ...this.httpOptions, observe: "response" }
    );
  }
  deleteJd(id): Observable<any> {
    return this.http.delete<any>(`${DOTNET_DOMAIN}/api/jobDescription/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  jdFormData(jdFormObject): Observable<any> {
    return this.http.post<any>(
      `${DOTNET_DOMAIN}/api/jobDescription`,
      jdFormObject,
      { ...this.httpOptions, observe: "response" }
    );
  }

  getJdData(id): Observable<any> {
    return this.http.get<any>(
      `${DOTNET_DOMAIN}/api/jobDescription/${id}`,
      this.httpOptions
    );
  }

  jdList(): Observable<any> {
    return this.http.get<any>(`${USER_DOMAIN}/api/jobDescription`, {
      headers: this.headers,
      observe: "response",
    });
  }

  getCandidate(id: string): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${USER_DOMAIN}/api/candidate/${id}`,
      this.options
    );
  }

  sendMails(mailingList, jdId): Observable<any> {
    let mailObj = {
      jobDescriptionId: jdId,
      emailList: mailingList,
    };
    return this.http.post<any>(`${DOTNET_DOMAIN}/api/jdEmail`, mailObj, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  search(character: string = "", page: number = 1): Observable<IResponse> {
    const params: HttpParams = new HttpParams()
      .set("character", character)
      .set("pagination", "true")
      .set("page", page.toString());
    return this.http.get<IResponse>(`${USER_DOMAIN}/api/jobDescriptionSearch`, {
      ...this.options,
      params,
    });
  }

  getAllInterviews(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${DOTNET_DOMAIN}/api/interview`,
      this.httpOptions
    );
  }

  deleteInterview(interviewId): Observable<IResponse> {
    return this.http.delete<any>(
      `${DOTNET_DOMAIN}/api/interview/${interviewId}`,
      this.httpOptions
    );
  }

  getInterviewById(Id): Observable<any> {
    return this.http.get<any>(
      `${DOTNET_DOMAIN}/api/interview/${Id}`,
      this.httpOptions
    );
  }

  getAllLocations(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/location`, {
      ...this.httpOptions,
    });
  }

  
  getSkills():Observable<HttpResponse<any>>{
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/skill`, this.httpOptions);
  }
  
  deleteLocation(id): Observable<any> {
    return this.http.delete<any>(`${DOTNET_DOMAIN}/api/location/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  deleteEmploymentType(id): Observable<any> {
    return this.http.delete<any>(`${DOTNET_DOMAIN}/api/employmentType/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  deleteApplicationStatusType(id): Observable<any> {
    return this.http.delete<any>(
      `${DOTNET_DOMAIN}/api/applicationStatusTypes/${id}`,
      { ...this.httpOptions, observe: "response" }
    );
  }

  getAllApplicationStatusTypes(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${DOTNET_DOMAIN}/api/applicationStatusTypes`, {
      ...this.httpOptions,
    });
  }

  deleteEligibilityCriterion(id): Observable<any> {
    return this.http.delete<any>(
      `${DOTNET_DOMAIN}/api/eligibilityCriteria/${id}`,
      { ...this.httpOptions, observe: "response" }
    );
  }
  deleteIdProofType(id): Observable<any> {
    return this.http.delete<any>(`${DOTNET_DOMAIN}/api/IdProofType/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }
  deleteRoundType(id): Observable<any> {
    return this.http.delete<any>(`${DOTNET_DOMAIN}/api/RoundType/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }
  createApplicationStatusType(formObject): Observable<any> {
    return this.http.post<any>(
      `${DOTNET_DOMAIN}/api/applicationStatusTypes`,
      formObject,
      { ...this.httpOptions }
    );
  }
}
