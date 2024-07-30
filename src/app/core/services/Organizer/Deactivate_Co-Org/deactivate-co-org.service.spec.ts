import { TestBed } from '@angular/core/testing';

import { DeactivateCoOrgService } from './deactivate-co-org.service';

describe('DeactivateCoOrgService', () => {
  let service: DeactivateCoOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeactivateCoOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
