import { CreateInterviewComponent } from './create-interview.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateInterviewComponent', () => {
  let component: CreateInterviewComponent;
  let fixture: ComponentFixture<CreateInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInterviewComponent ],
      imports: [ FormsModule, ReactiveFormsModule,BrowserModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([])], 
  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInterviewComponent);
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
