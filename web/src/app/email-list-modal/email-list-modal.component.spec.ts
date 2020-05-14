import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListModalComponent } from './email-list-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('EmailListModalComponent', () => {
  let component: EmailListModalComponent;
  let fixture: ComponentFixture<EmailListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailListModalComponent ],
      imports: [ReactiveFormsModule] // Also add it to 'imports' array
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
