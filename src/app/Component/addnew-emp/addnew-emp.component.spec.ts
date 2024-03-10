import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADDnewEmpComponent } from './addnew-emp.component';

describe('ADDnewEmpComponent', () => {
  let component: ADDnewEmpComponent;
  let fixture: ComponentFixture<ADDnewEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ADDnewEmpComponent]
    });
    fixture = TestBed.createComponent(ADDnewEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
