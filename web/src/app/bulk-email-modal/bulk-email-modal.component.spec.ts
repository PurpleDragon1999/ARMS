import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEmailModalComponent } from './bulk-email-modal.component';

describe('BulkEmailModalComponent', () => {
  let component: BulkEmailModalComponent;
  let fixture: ComponentFixture<BulkEmailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkEmailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
