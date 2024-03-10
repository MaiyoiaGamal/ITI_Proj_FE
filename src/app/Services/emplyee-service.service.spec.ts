import { TestBed } from '@angular/core/testing';

import { EmplyeeServiceService } from './emplyee-service.service';

describe('EmplyeeServiceService', () => {
  let service: EmplyeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmplyeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
