import { EmployeeUploadComponent } from './employee/components/employee-upload/employee-upload.component';
import { ListComponent } from './list/list.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { JdFormComponent } from './jd-form/jd-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { HrInterviewAssessementComponent } from './hr-interview-assessement/hr-interview-assessement.component';
import { EmployeeFormComponent } from './employee/components/employee-form/employee-form.component';
import { EmployeeComponent } from './employee/containers/employee/employee.component';

const routes: Routes = [
  { path:"list", component:ListComponent},
  { path: "candidate", component: CandidateFormComponent},
  { path: "create-interview", component: CreateInterviewComponent },
  { path: "form", component: JdFormComponent },
  { path: "hr/assessement", component:HrInterviewAssessementComponent  },
  {
    path:"",component:LoginComponent
  },
  { path: "hr/assessement", component:HrInterviewAssessementComponent  },
  {
    path: "navbar", children: [
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
      { path: '', component: EmployeeComponent, pathMatch: 'full' },
      { path: ':employeeId', component: EmployeeComponent }
    ]
  },
  { path: 'employee', pathMatch: 'full', 
    children: [
      { path: '', component: EmployeeComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
