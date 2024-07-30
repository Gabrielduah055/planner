import { TestBed } from '@angular/core/testing';

import { ActivateCoOrgService } from './activate-co-org.service';

describe('ActivateCoOrgService', () => {
  let service: ActivateCoOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateCoOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
