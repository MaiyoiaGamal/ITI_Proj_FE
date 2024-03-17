import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewholidayComponent } from './addnewholiday.component';

describe('AddnewholidayComponent', () => {
  let component: AddnewholidayComponent;
  let fixture: ComponentFixture<AddnewholidayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewholidayComponent]
    });
    fixture = TestBed.createComponent(AddnewholidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
