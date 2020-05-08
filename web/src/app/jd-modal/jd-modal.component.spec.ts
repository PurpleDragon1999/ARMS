import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JdModalComponent } from './jd-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('JdModalComponent', () => {
  let component: JdModalComponent;
  let fixture: ComponentFixture<JdModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdModalComponent ],
      imports: [ FormsModule, ReactiveFormsModule,BrowserModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([])], 
  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdModalComponent);
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
