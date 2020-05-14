import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInterviewComponent } from './schedule-interview.component';

describe('ScheduleInterviewComponent', () => {
  let component: ScheduleInterviewComponent;
  let fixture: ComponentFixture<ScheduleInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleInterviewComponent ], 
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleInterviewComponent);
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
