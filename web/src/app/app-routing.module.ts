import { RoleGuardService } from './utilities/role-guard.service';
import { AdminComponent } from './employee/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { JdFormComponent } from './jd-form/jd-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { HrInterviewAssessementComponent } from './hr-interview-assessement/hr-interview-assessement.component';
import{JdPdfComponent} from './jd-form/jd-pdf/jd-pdf.component'
import { AdminFormComponent } from './employee/containers/employee-form/employee-form.component';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full'},
  { path: "login", component: LoginComponent },
  { path: "admin", component: NavBarComponent, canActivate: [RoleGuardService], data: {role: "Admin"}, children: [
    {
      path: "", redirectTo: "home", pathMatch: "full"
    },
    {
      path: "home", component: AdminComponent
    }
  ]},
  { path: "su", component: NavBarComponent, canActivate: [RoleGuardService], data: {role: "SuperUser"}, children: [
    {
      path: "", redirectTo: "home", pathMatch: "full"
    },
    {
      path: "home", component: AdminComponent
    }
  ]},
  { path: "user", component: NavBarComponent, canActivate: [RoleGuardService], data: {role: "User"}, children: [
    {
      path: "", redirectTo: "home", pathMatch: "full"
    },
    {
      path: "home", component: AdminComponent
    }
  ]},

  { path: "candidate", component: CandidateFormComponent},
  { path: "create-interview", component: CreateInterviewComponent },
  { path: "form", component: JdFormComponent },
  { path: "hr/assessement", component:HrInterviewAssessementComponent },
  { path: 'employee/:formType', 
    children: [
      { path: '', component: AdminFormComponent, pathMatch: 'full' },
      { path: ':employeeId', component: AdminFormComponent }
    ]
  },
  {path:"jd-pdf",component:JdPdfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
