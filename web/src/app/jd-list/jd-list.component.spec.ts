import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { JdListComponent } from './jd-list.component';

describe('JdListComponent', () => {
  let component: JdListComponent;
  let fixture: ComponentFixture<JdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
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
