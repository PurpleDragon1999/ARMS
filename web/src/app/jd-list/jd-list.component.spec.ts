import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdListComponent } from './jd-list.component';

describe('JdListComponent', () => {
  let component: JdListComponent;
  let fixture: ComponentFixture<JdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
