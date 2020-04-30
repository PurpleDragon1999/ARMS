import { JdListComponent } from './jd-list/jd-list.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { JdFormComponent } from './jd-form/jd-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { HrInterviewAssessementComponent } from './hr-interview-assessement/hr-interview-assessement.component';
import { HrComponent } from './hr/hr.component';
import{JdPdfComponent} from './jd-form/jd-pdf/jd-pdf.component'
import { AdminFormComponent } from './employee/containers/employee-form/employee-form.component';

const routes: Routes = [
  { path: "scedule-interview", component: ScheduleInterviewComponent },

  { path: "candidate", component: CandidateFormComponent},
  { path: "create-interview", component: CreateInterviewComponent },
  { path: "hr/assessement", component:HrInterviewAssessementComponent  },
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
      },
      {
        path:"jobs/form", component: JdFormComponent
      },
      {
        path:"jobs", component: JdListComponent
      },
      {
        path:"hr/dashboard", component: HrComponent
      }
    ]
  },
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
