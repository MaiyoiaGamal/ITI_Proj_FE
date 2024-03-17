import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenralSettingsComponent } from './genral-settings.component';

describe('GenralSettingsComponent', () => {
  let component: GenralSettingsComponent;
  let fixture: ComponentFixture<GenralSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenralSettingsComponent]
    });
    fixture = TestBed.createComponent(GenralSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
