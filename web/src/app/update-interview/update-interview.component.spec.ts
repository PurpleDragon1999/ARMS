import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInterviewComponent } from './update-interview.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdateInterviewComponent', () => {
  let component: UpdateInterviewComponent;
  let fixture: ComponentFixture<UpdateInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInterviewComponent ],
      imports: [ FormsModule, ReactiveFormsModule,BrowserModule,NgbModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([])], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
