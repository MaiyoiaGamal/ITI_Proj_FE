import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesReportsComponent } from './employees-reports.component';

describe('EmployeesReportsComponent', () => {
  let component: EmployeesReportsComponent;
  let fixture: ComponentFixture<EmployeesReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesReportsComponent]
    });
    fixture = TestBed.createComponent(EmployeesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
