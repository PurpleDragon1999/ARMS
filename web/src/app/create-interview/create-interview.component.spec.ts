import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateInterviewComponent } from './create-interview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateInterviewComponent', () => {
  let component: CreateInterviewComponent;
  let fixture: ComponentFixture<CreateInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [CreateInterviewComponent ]
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
