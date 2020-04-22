import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    CreateInterviewComponent,

    AdminComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
