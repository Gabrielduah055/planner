import { TestBed } from '@angular/core/testing';

import { OrganizationBusinessInfoService } from './organization-business-info.service';

describe('OrganizationBusinessInfoService', () => {
  let service: OrganizationBusinessInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationBusinessInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
