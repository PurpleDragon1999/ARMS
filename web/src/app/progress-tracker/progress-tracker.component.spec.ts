import { FileSelectDirective } from 'ng2-file-upload';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTrackerComponent } from './progress-tracker.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CandidateFormComponent } from './../candidate-form/candidate-form.component';

describe('ProgressTrackerComponent', () => {
  let component: ProgressTrackerComponent;
  let fixture: ComponentFixture<ProgressTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressTrackerComponent, CandidateFormComponent, FileSelectDirective],
      imports : [ FormsModule, ReactiveFormsModule, BrowserModule,
        HttpClientTestingModule, RouterTestingModule.withRoutes([])]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
