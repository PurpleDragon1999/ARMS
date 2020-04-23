import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminFormComponent } from './employee/containers/employee-form/employee-form.component';
import { AdminComponent } from './employee/admin.component';


const routes: Routes = [
  { path: '', component: AdminComponent, pathMatch: 'full' },
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
export class AppRoutingModule { }
