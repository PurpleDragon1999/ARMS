import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrInterviewAssessementComponent } from './hr-interview-assessement/hr-interview-assessement.component';


const routes: Routes = [
  { path: "hr/assessement", component:HrInterviewAssessementComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
