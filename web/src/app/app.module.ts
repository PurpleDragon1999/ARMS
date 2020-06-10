import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressHttpModule } from 'angular-progress-http';
import { ChartsModule } from 'ng2-charts';
import { FileSelectDirective } from 'ng2-file-upload';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeFormComponent } from "./employee/components/employee-form/employee-form.component";
import { EmployeeUploadComponent } from "./employee/components/employee-upload/employee-upload.component";
import { EmployeeComponent } from "./employee/containers/employee/employee.component";
import { HrInterviewAssessementComponent } from './hr-interview-assessement/hr-interview-assessement.component';
import { HrComponent } from './hr/hr.component';
import { JdFormComponent } from './jd-form/jd-form.component';
import { JdPdfComponent } from './jd-form/jd-pdf/jd-pdf.component';
import { JdListComponent } from './jd-list/jd-list.component';
import { LoginComponent } from './login/login.component';
import { AppNavBarComponent } from './nav-bar/nav-bar.component';
import { ListComponent } from './reusable-components/list/list.component';
import { ModalComponent } from './reusable-components/modal/modal.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { JdModalComponent } from './jd-modal/jd-modal.component';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { CandidateComponent } from './candidate/candidate.component';
import { EmailListModalComponent } from './email-list-modal/email-list-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SettingsComponent } from './settings/settings.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CandidateFormComponent,
    FileSelectDirective,
    EmployeeFormComponent,
    CreateInterviewComponent,
    JdFormComponent,
    HrInterviewAssessementComponent,
    AppNavBarComponent,
    DashboardComponent,
    ScheduleInterviewComponent,
    ListComponent,
    EmployeeComponent,
    EmployeeUploadComponent,
    ModalComponent,
    HrComponent,
    JdListComponent,
    ScheduleInterviewComponent,
    AppComponent,
    JdPdfComponent,
    ErrorPageComponent,
    JdModalComponent,
    ProgressTrackerComponent,
    CandidateComponent,
    EmailListModalComponent,
    InterviewListComponent,
    SettingsComponent
  ],
  imports: [
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
    MsalModule.forRoot({
      auth: {
        clientId: '4d31e348-bc89-40d2-821c-f65942084ae3',
        authority: 'https://login.microsoftonline.com/94a76bb1-611b-4eb5-aee5-e312381c32cb',
        redirectUri: 'http://localhost:4200/',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
      {
        popUp: !isIE,
        consentScopes: ["user.read", "openid", "profile"],
        unprotectedResources: [],
        protectedResourceMap: [
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
        ],
        extraQueryParameters: {}
      }),
    BrowserAnimationsModule,
  ],
  providers: [
    NgbActiveModal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
  exports: [ListComponent],
  entryComponents: [EmployeeFormComponent, ModalComponent, EmployeeUploadComponent, EmailListModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
