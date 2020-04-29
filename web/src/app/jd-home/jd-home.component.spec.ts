import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdHomeComponent } from './jd-home.component';

describe('JdHomeComponent', () => {
  let component: JdHomeComponent;
  let fixture: ComponentFixture<JdHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
