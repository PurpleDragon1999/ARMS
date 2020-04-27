import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { JdFormComponent } from './jd-form/jd-form.component';
import { HrInterviewAssessementComponent } from './hr-interview-assessement/hr-interview-assessement.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateInterviewComponent,
    JdFormComponent,
    HrInterviewAssessementComponent,
    NavBarComponent,
    DashboardComponent,
    AdminComponent,
    ScheduleInterviewComponent

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
