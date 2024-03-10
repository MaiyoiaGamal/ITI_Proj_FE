import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeatilesComponent } from './employee-deatiles.component';

describe('EmployeeDeatilesComponent', () => {
  let component: EmployeeDeatilesComponent;
  let fixture: ComponentFixture<EmployeeDeatilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDeatilesComponent]
    });
    fixture = TestBed.createComponent(EmployeeDeatilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
