import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrInterviewAssessementComponent } from './hr-interview-assessement/hr-interview-assessement.component';

import { AdminFormComponent } from './employee/containers/employee-form/employee-form.component';

const routes: Routes = [
  {
    path:"",component:LoginComponent
  },
  { path: "hr/assessement", component:HrInterviewAssessementComponent  },
  {
    path: "navbar", component: NavBarComponent, children: [
      {
        path: "", redirectTo: "dashboard", pathMatch: "full"
      },
      {
        path:"dashboard", component: DashboardComponent
      }
    ]
  },
  { path: 'employee/:formType', 
    children: [
      { path: '', component: AdminFormComponent },
      { path: ':employeeId', component: AdminFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
