import { RoundComponent } from './round/round.component';
import { UpdateInterviewComponent } from './update-interview/update-interview.component';
import { CandidateAssessmentFormComponent } from "./candidate-assessment/components/candidate-assessment-form/candidate-assessment-form.component";
import { LocationComponent } from "./settings/components/location/location.component";
import { RoundTypeComponent } from "./settings/components/round-type/round-type.component";
import { HrInterviewAssessementComponent } from "./hr-interview-assessement/hr-interview-assessement.component";
import { CandidateAssessmentComponent } from "./candidate-assessment/containers/candidate-assessment.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MsalInterceptor, MsalModule } from "@azure/msal-angular";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProgressHttpModule } from "angular-progress-http";
import { ChartsModule } from "ng2-charts";
import { FileUploadModule } from "ng2-file-upload";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CandidateFormComponent } from "./candidate-form/candidate-form.component";
import { CreateInterviewComponent } from "./create-interview/create-interview.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeeFormComponent } from "./employee/components/employee-form/employee-form.component";
import { EmployeeUploadComponent } from "./employee/components/employee-upload/employee-upload.component";
import { EmployeeComponent } from "./employee/containers/employee/employee.component";
import { JdFormComponent } from "./jd-form/jd-form.component";
import { JdPdfComponent } from "./jd-form/jd-pdf/jd-pdf.component";
import { JdListComponent } from "./jd-list/jd-list.component";
import { LoginComponent } from "./login/login.component";
import { AppNavBarComponent } from "./nav-bar/nav-bar.component";
import { ListComponent } from "./reusable-components/list/list.component";
import { ModalComponent } from "./reusable-components/modal/modal.component";
import { ScheduleInterviewComponent } from "./schedule-interview/schedule-interview.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { JdModalComponent } from "./jd-modal/jd-modal.component";
import { ProgressTrackerComponent } from "./progress-tracker/progress-tracker.component";
import { InterviewListComponent } from "./interview-list/interview-list.component";
import { CandidateComponent } from "./candidate/candidate.component";
import { EmailListModalComponent } from "./email-list-modal/email-list-modal.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { SettingsComponent } from "./settings/settings.component";
import { IdProofTypeComponent } from "./settings/components/id-proof-type/id-proof-type.component";
import { EmploymentTypeComponent } from "./settings/components/employment-type/employment-type.component";
import { EligibilityCriteriaComponent } from "./settings/components/eligibility-criteria/eligibility-criteria.component";
import { ApplicationStatusComponent } from "./settings/components/application-status/application-status.component";
import { InterviewTrackerComponent } from "./interview-tracker/interview-tracker.component";
import { AnalyticsComponent } from "./dashboard/analytics/analytics.component";
import { StatsComponent } from "./dashboard/stats/stats.component";
import { CandidateDescriptionComponent } from "./candidate-assessment/components/candidate-description/candidate-description.component";
import { InterviewDetailComponent } from './interview-detail/interview-detail.component';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CandidateFormComponent,
    EmployeeFormComponent,
    CreateInterviewComponent,
    UpdateInterviewComponent,
    JdFormComponent,
    HrInterviewAssessementComponent,
    AppNavBarComponent,
    DashboardComponent,
    ScheduleInterviewComponent,
    ListComponent,
    EmployeeComponent,
    EmployeeUploadComponent,
    ModalComponent,
    JdListComponent,
    ScheduleInterviewComponent,
    LocationComponent,
    RoundTypeComponent,
    IdProofTypeComponent,
    EmploymentTypeComponent,
    EligibilityCriteriaComponent,
    ApplicationStatusComponent,
    CandidateAssessmentFormComponent,
    AppComponent,
    JdPdfComponent,
    ErrorPageComponent,
    JdModalComponent,
    ProgressTrackerComponent,
    CandidateComponent,
    EmailListModalComponent,
    InterviewListComponent,
    HrInterviewAssessementComponent,
    SettingsComponent,
    RoundComponent,   
    RoundTypeComponent,
    LocationComponent,
    IdProofTypeComponent,
    EmploymentTypeComponent,
    EligibilityCriteriaComponent,
    ApplicationStatusComponent,
    CandidateAssessmentComponent,
    HrInterviewAssessementComponent,
    InterviewDetailComponent,
    InterviewTrackerComponent,
    CandidateDescriptionComponent,
    DashboardComponent,
    StatsComponent,
    AnalyticsComponent,
    UpdateCandidateComponent,
  ],
  imports: [
    FileUploadModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    HttpClientModule,
    ProgressHttpModule,
    MsalModule.forRoot(
      {
        auth: {
          clientId: "4d31e348-bc89-40d2-821c-f65942084ae3",
          authority:
            "https://login.microsoftonline.com/94a76bb1-611b-4eb5-aee5-e312381c32cb",
          redirectUri: "http://localhost:4200/",
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // set to true for IE 11
        },
      },
      {
        popUp: !isIE,
        consentScopes: ["user.read", "openid", "profile","calendars.read","calendars.read.shared",
                        "calendars.readwrite","calendars.readwrite.shared"],
        unprotectedResources: [],
        protectedResourceMap: [
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
        ],
        extraQueryParameters: {},
      }
    ),
  ],
  providers: [
    NgbActiveModal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
  exports: [ListComponent, InterviewDetailComponent],
  entryComponents: [
    EmployeeFormComponent,
    ModalComponent,
    EmployeeUploadComponent,
    EmailListModalComponent,
    UpdateCandidateComponent
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppModule {}
