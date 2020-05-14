import { HrInterviewAssessementComponent } from './hr-interview-assessement/hr-interview-assessement.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
//import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/containers/employee/employee.component';
import { HrComponent } from './hr/hr.component';
import { JdFormComponent } from './jd-form/jd-form.component';
import { JdPdfComponent } from './jd-form/jd-pdf/jd-pdf.component';
import { JdListComponent } from './jd-list/jd-list.component';
import { LoginComponent } from './login/login.component';
import { AppNavBarComponent } from './nav-bar/nav-bar.component';
import { RoleGuardService } from './utilities/role-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { JdModalComponent } from './jd-modal/jd-modal.component';
import { CandidateComponent } from './candidate/candidate.component';

const routes: Routes = [
  {path : "assessment", component : HrInterviewAssessementComponent},
  { path: "", redirectTo: 'login', pathMatch: 'full'},
  { path: "login", component: LoginComponent },
  { path: "404", component: ErrorPageComponent},
  {
    path: "edit", component: JdModalComponent
  },
  {
    path: "candidate", component: AppNavBarComponent, children: [
      {
        path: '', component: CandidateComponent
      },
    ]
  },
  {
    path: 'candidate/form', component: CandidateFormComponent
  },
  {

    path: "superuser", component: AppNavBarComponent, canActivate: [RoleGuardService], data: { role: "superuser" }, children: [
      {
        path: "", redirectTo: "home", pathMatch: "full"
      },
      {
        path: "home", component: HrComponent
      },

      {
        path: "employee", component: EmployeeComponent
      },
      {path:'interviews', component: InterviewListComponent}
    ]
  },
  {
    path: "admin", component: AppNavBarComponent, canActivate: [RoleGuardService], data: { role: "admin" }, children: [
      {
        path: "", redirectTo: "home", pathMatch: "full"
      },
      {
        path: "home", component: HrComponent
      },
      {
        path: "job-desc", component: JdListComponent
      },
      {
        path: "job-desc/new", component: JdFormComponent
      },
      {path: 'interviews', component: InterviewListComponent},

      {
        path: "interview/schedule", component: ScheduleInterviewComponent
      }
    ]
  },
  {
    path: "employee", component: AppNavBarComponent, canActivate: [RoleGuardService], data: { role: "employee" }, children: [
      {
        path: "", redirectTo: "home", pathMatch: "full"
      },
      {
        path: "home", component: HrComponent
      }
    ]
  },
  {
    path: 'jd-pdf', children: [
      { path: ':jdId', component: JdPdfComponent }
    ],
  },
  {
    path: 'candidateForm', children: [
      { path: ':jdId', component: CandidateFormComponent }
    ],
  },
  {
    path: 'progressTracker/:candidateId', component: ProgressTrackerComponent, children: [
      { path: 'applied', component: CandidateFormComponent}
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}