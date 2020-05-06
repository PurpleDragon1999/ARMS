import { EmployeeUploadComponent } from './employee/components/employee-upload/employee-upload.component';
import { ListComponent } from './reusable-components/list/list.component';
import { JdListComponent } from './jd-list/jd-list.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { JdFormComponent } from './jd-form/jd-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { HrInterviewAssessementComponent } from './hr-interview-assessement/hr-interview-assessement.component';
import { EmployeeFormComponent } from './employee/components/employee-form/employee-form.component';
import { EmployeeComponent } from './employee/containers/employee/employee.component';
import { JdPdfComponent } from './jd-form/jd-pdf/jd-pdf.component'
import { HrComponent } from './hr/hr.component';
import { AppNavBarComponent } from './nav-bar/nav-bar.component';
import { RoleGuardService } from './utilities/role-guard.service';


const routes: Routes = [
  {path : "candidate", component : CandidateFormComponent},
  { path: "", redirectTo: 'login', pathMatch: 'full'},
  { path: "login", component: LoginComponent },
  { path: "admin", component: AppNavBarComponent, canActivate: [RoleGuardService], data: {role: "admin"}, children: [
    {
      path: "", redirectTo: "home", pathMatch: "full"
    },
    {
      path: "home", component: HrComponent
    },
    {
      path: "employee", component: EmployeeComponent
    }
  ]},
  { path: "hr", component: AppNavBarComponent, canActivate: [RoleGuardService], data: {role: "hr"}, children: [
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
    }
  ]},
  { path: "user", component: AppNavBarComponent, canActivate: [RoleGuardService], data: {role: "user"}, children: [
    {
      path: "", redirectTo: "home", pathMatch: "full"
    },
    {
      path: "home", component: HrComponent
    }
  ]},
  {
    path: 'jd-pdf', children: [
      { path: ':jdId', component: JdPdfComponent }
    ],
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
