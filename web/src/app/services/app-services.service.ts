import { IAssessment } from "./../models/assessment.interface";
import { IResponse } from "src/app/models/response.interface";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { ICreate } from "../models/create.interface";
import { HOST } from "src/app/config/apiHost.config";
const CALENDER_API = "https://graph.microsoft.com/v1.0/me/events";
const CALENDER_VIEW_API = "https://outlook.office.com/api/v2.0/me/calendarview";
const USER_DOMAIN = "http://localhost:3000";
const OUTLOOK_API = "https://graph.microsoft.com/v1.0/me/calendar/getSchedule";
@Injectable({
  providedIn: "root",
})
export class AppServicesService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("Authorized"),
  });
  httpOptions = {
    headers: this.headers,
  };
  out_headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });
  out_httpOptions = {
    headers: this.out_headers,
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

  getRoundsFromInterviewId(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${HOST}/api/panel/round/${id}`, {
      ...this.httpOptions,
    });
  }

  searchEmployee(keyword: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${HOST}/api/employee/${keyword}`, {
      ...this.httpOptions,
    });
  }

  //For searching with pagination
  getAllIdProofTypes(): Observable<IResponse> {
    return this.http.get<IResponse>(`${HOST}/api/IdProofType`, {
      ...this.httpOptions,
    });
  }

  getAllRoundTypes(): Observable<IResponse> {
    return this.http.get<any>(`${HOST}/api/RoundType`, {
      ...this.httpOptions,
    });
  }

  getAllJobs(): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${HOST}/api/jobDescription`,
      this.httpOptions
    );
  }

  getAllEligibilityCriterias(): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${HOST}/api/eligibilityCriteria`,
      this.httpOptions
    );
  }

  getAllEmploymentTypes(): Observable<IResponse> {
    return this.http.get<IResponse>(`${HOST}/api/employmentType`, {
      ...this.httpOptions,
    });
  }

  getAllInterviews(): Observable<IResponse> {
    let data = this.tokenDecoder();
    if (data != null) {
      var role = data.role;
    }
    if (role == "Employee") {
      return this.http.get<IResponse>(
        `${HOST}/api/interview?employeeId=${data.Id}`,
        this.httpOptions
      );
    } else {
      return this.http.get<IResponse>(
        `${HOST}/api/interview`,
        this.httpOptions
      );
    }
  }

  deleteInterview(interviewId): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${HOST}/api/interview/${interviewId}`,
      this.httpOptions
    );
  }

  getInterviewById(Id): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${HOST}/api/interview/${Id}`,
      this.httpOptions
    );
  }

  getAllLocations(): Observable<IResponse> {
    return this.http.get<IResponse>(`${HOST}/api/location`, {
      ...this.httpOptions,
    });
  }

  getSkills(): Observable<IResponse> {
    return this.http.get<IResponse>(`${HOST}/api/skill`, this.httpOptions);
  }

  deleteLocation(id): Observable<any> {
    return this.http.delete<any>(`${HOST}/api/location/${id}`, {
      ...this.httpOptions,
      observe: "response",
    });
  }

  deleteEmploymentType(id): Observable<IResponse> {
    return this.http.delete<IResponse>(`${HOST}/api/employmentType/${id}`, {
      ...this.httpOptions,
    });
  }

  deleteApplicationStatusType(id): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${HOST}/api/applicationStatusTypes/${id}`,
      { ...this.httpOptions }
    );
  }

  getAllApplicationStatusTypes(): Observable<IResponse> {
    return this.http.get<IResponse>(`${HOST}/api/applicationStatusTypes`, {
      ...this.httpOptions,
    });
  }

  deleteEligibilityCriterion(id): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${HOST}/api/eligibilityCriteria/${id}`,
      { ...this.httpOptions }
    );
  }

  deleteIdProofType(id): Observable<IResponse> {
    return this.http.delete<IResponse>(`${HOST}/api/IdProofType/${id}`, {
      ...this.httpOptions,
    });
  }

  deleteRoundType(id): Observable<IResponse> {
    return this.http.delete<IResponse>(`${HOST}/api/RoundType/${id}`, {
      ...this.httpOptions,
    });
  }

  createAssessment(user: IAssessment): Observable<IResponse> {
    return this.http.post<IResponse>(`${USER_DOMAIN}/api/assessment`, user, {
      ...this.httpOptions,
    });
  }

  createApplicationStatusType(formObject): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${HOST}/api/applicationStatusTypes`,
      formObject,
      { ...this.httpOptions }
    );
  }

  blockCalender(
    index,
    panel,
    roundStartDateTime,
    roundEndDateTime,
    emailList,
    userNames
  ): Observable<any> {
    let obj = {
      Subject: index + `Interview of Round ${index}`,
      Body: {
        ContentType: "Message",
        Content: `Interview with Candidates for Round ${index}. You Belongs to Panel ${panel}. Kindly check with your fellow interviewer.`,
      },
      Start: {
        DateTime: roundStartDateTime,
        TimeZone: "India Standard Time",
      },
      End: {
        DateTime: roundEndDateTime,
        TimeZone: "India Standard Time",
      },
      reminderMinutesBeforeStart: 99,
      isOnlineMeeting: true,
      onlineMeetingProvider: "teamsForBusiness",
      isReminderOn: true,
      Attendees: [
        {
          EmailAddress: {
            Address: emailList[0],
            Name: userNames[0],
          },
          Type: "Required",
        },
        {
          EmailAddress: {
            Address: emailList[1],
            Name: userNames[1],
          },
          Type: "Required",
        },
      ],
    };
    return this.http.post<any>(CALENDER_API, obj);
  }

  getRound(jobId, employeeId) {
    return this.http.get<IResponse>(
      `${HOST}/api/interview?jobId=${jobId}&employeeId=${employeeId}`,
      { ...this.httpOptions }
    );
  }

  checkAvailability(roundStartDateTime, roundEndDateTime, emailList) {
    let obj = {
      schedules: emailList,
      startTime: {
        dateTime: roundStartDateTime,
        timeZone: "India Standard Time",
      },
      endTime: {
        dateTime: roundEndDateTime,
        timeZone: "India Standard Time",
      },
      availabilityViewInterval: 60,
    };

    return this.http.post<any>(OUTLOOK_API, obj);
  }

  updateRoundTime(obj: any) {
    return this.http.put(`${HOST}/api/panel/round`, obj, {
      ...this.httpOptions,
    });
  }

  createPanel(obj: any) {
    return this.http.post(`${HOST}/api/panel`, obj, { ...this.httpOptions });
  }
}
