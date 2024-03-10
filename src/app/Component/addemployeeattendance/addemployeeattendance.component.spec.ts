import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddemployeeattendanceComponent } from './addemployeeattendance.component';

describe('AddemployeeattendanceComponent', () => {
  let component: AddemployeeattendanceComponent;
  let fixture: ComponentFixture<AddemployeeattendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddemployeeattendanceComponent]
    });
    fixture = TestBed.createComponent(AddemployeeattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
