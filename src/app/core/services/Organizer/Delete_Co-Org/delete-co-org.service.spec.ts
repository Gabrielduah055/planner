import { TestBed } from '@angular/core/testing';

import { DeleteCoOrgService } from './delete-co-org.service';

describe('DeleteCoOrgService', () => {
  let service: DeleteCoOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCoOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
