import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectDirective } from 'ng2-file-upload';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CandidateFormComponent } from './candidate-form.component';

describe('CandidateFormComponent', () => {
  let component: CandidateFormComponent;
  let fixture: ComponentFixture<CandidateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateFormComponent ],
      imports : [ FileSelectDirective, NgbActiveModal, NgbModule, FormsModule,
                  BrowserModule, ReactiveFormsModule, HttpClientTestingModule,
                  RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
