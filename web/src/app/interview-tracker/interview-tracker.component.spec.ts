import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InterviewTrackerComponent } from "./interview-tracker.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("InterviewTrackerComponent", () => {
  let component: InterviewTrackerComponent;
  let fixture: ComponentFixture<InterviewTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewTrackerComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
