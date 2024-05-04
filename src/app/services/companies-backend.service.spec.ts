import { TestBed } from '@angular/core/testing';

import { CompaniesBackendService } from './companies-backend.service';

describe('CompaniesBackendService', () => {
  let service: CompaniesBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniesBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
