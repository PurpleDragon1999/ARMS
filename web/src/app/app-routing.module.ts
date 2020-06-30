import { UpdateInterviewComponent } from "./update-interview/update-interview.component";
import { HrInterviewAssessementComponent } from "./hr-interview-assessement/hr-interview-assessement.component";
import { InterviewTrackerComponent } from "./interview-tracker/interview-tracker.component";
import { SettingsComponent } from "./settings/settings.component";
import { CreateInterviewComponent } from "./create-interview/create-interview.component";
import { InterviewListComponent } from "./interview-list/interview-list.component";
import { ScheduleInterviewComponent } from "./schedule-interview/schedule-interview.component";
import { CandidateFormComponent } from "./candidate-form/candidate-form.component";
import { ProgressTrackerComponent } from "./progress-tracker/progress-tracker.component";
import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee/containers/employee/employee.component";
import { HrComponent } from "./hr/hr.component";
import { JdFormComponent } from "./jd-form/jd-form.component";
import { JdPdfComponent } from "./jd-form/jd-pdf/jd-pdf.component";
import { JdListComponent } from "./jd-list/jd-list.component";
import { LoginComponent } from "./login/login.component";
import { AppNavBarComponent } from "./nav-bar/nav-bar.component";
import { RoleGuardService } from "./utilities/role-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { JdModalComponent } from "./jd-modal/jd-modal.component";
import { CandidateComponent } from "./candidate/candidate.component";
import { RoundComponent } from "./round/round.component";
import { CandidateAssessmentComponent } from "./candidate-assessment/containers/candidate-assessment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AnalyticsComponent } from "./dashboard/analytics/analytics.component";

const routes: Routes = [
  { path: "assessment", component: HrInterviewAssessementComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "settings", component: SettingsComponent },
  { path: "error/:errorCode", component: ErrorPageComponent },
  {
    path: "edit",
    component: JdModalComponent,
  },
  {
    path: "candidate",
    component: AppNavBarComponent,
    children: [
      {
        path: "",
        component: CandidateComponent,
      },
    ],
  },
  {
    path: "candidate/form",
    component: CandidateFormComponent,
  },
  {
    path: "superuser",
    component: AppNavBarComponent,
    canActivate: [RoleGuardService],
    data: { role: "SuperAdministrator" },
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "settings",
        component: SettingsComponent,
      },
      {
        path: "home",
        component: HrComponent,
      },
      {
        path: "candidate",
        component: CandidateComponent,
      },
      {
        path: "employee",
        component: EmployeeComponent,
      },
      {
        path: "interviews",
        component: InterviewListComponent,
      },
      {
        path: "interviews",
        component: InterviewListComponent,
      },
    ],
  },
  {
    path: "admin",
    component: AppNavBarComponent,
    canActivate: [RoleGuardService],
    data: { role: "Admin" },
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "candidate",
        component: CandidateComponent,
      },
      {
        path: "interviews/round/:id/:append",
        component: RoundComponent,
      },
      {
        path: "create-interview",
        component: CreateInterviewComponent,
      },
      {
        path: "update-interview",
        component: UpdateInterviewComponent,
      },
      {
        path: "interview",
        component: InterviewTrackerComponent,
        children: [
          {
            path: "",
            redirectTo: "create",
            pathMatch: "full",
          },
          {
            path: "create",
            component: CreateInterviewComponent,
          },
          {
            path: "select-panel/:jobId/:interviewId",
            component: ScheduleInterviewComponent,
          },
        ],
      },
      {
        path: "home",
        component: HrComponent,
      },
      {
        path: "job-desc",
        component: JdListComponent,
      },
      {
        path: "job-desc/new",
        component: JdFormComponent,
      },
      { path: "interviews", component: InterviewListComponent },

      {
        path: "interview/schedule",
        component: ScheduleInterviewComponent,
      },
      {
        path: "candidate",
        children: [{ path: ":jobId", component: CandidateComponent }],
      },
    ],
  },
  {
    path: "employee",
    component: AppNavBarComponent,
    canActivate: [RoleGuardService],
    data: { role: "Employee" },
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: InterviewListComponent,
      },
      { path: "interviews", component: InterviewListComponent },
      {
        path: "candidate",
        children: [{ path: ":jobId", component: CandidateComponent }],
      },
    ],
  },
  {
    path: "jd-pdf",
    children: [{ path: ":jdId", component: JdPdfComponent }],
  },
  {
    path: "candidateForm",
    children: [{ path: ":jdId", component: CandidateFormComponent }],
  },
  {
    path: "progressTracker/:candidateId",
    component: ProgressTrackerComponent,
    children: [{ path: "applied", component: CandidateFormComponent }],
  },
  {
    path: "panel",
    component: AppNavBarComponent,
    children: [{ path: "select", component: ScheduleInterviewComponent }],
  },

  {
    path: "navbar",
    component: AppNavBarComponent,
    children: [{ path: "settings", component: SettingsComponent }],
  },
  {
    path: "assessment",
    component: HrInterviewAssessementComponent,
  },
  {
    path: "candidate-assessment/jd/:jdId/candidate/:candidateId",
    component: AppNavBarComponent,
    children: [
      {
        path: "",
        component: CandidateAssessmentComponent,
      },
    ],
  },
  {
    path: "dashboard",
    component: AppNavBarComponent,
    children: [
      {
        path: "",
        component: AnalyticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
