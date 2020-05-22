import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HrInterviewAssessementComponent } from './hr-interview-assessement.component';

describe('HrInterviewAssessementComponent', () => {
  let component: HrInterviewAssessementComponent;
  let fixture: ComponentFixture<HrInterviewAssessementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewAssessementComponent ],
      imports: [FormsModule, ReactiveFormsModule,BrowserModule,NgbModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewAssessementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  })
});

