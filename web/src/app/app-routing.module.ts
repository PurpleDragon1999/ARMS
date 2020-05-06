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
import { JdModalComponent } from './jd-modal/jd-modal.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component'

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  {
    path: "edit", component: JdModalComponent 
  },
  {
    path: "candidate", component: CandidateFormComponent
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
      }
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
