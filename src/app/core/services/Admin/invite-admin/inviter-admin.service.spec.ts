import { TestBed } from '@angular/core/testing';

import { InviterAdminService } from './inviter-admin.service';

describe('InviterAdminService', () => {
  let service: InviterAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviterAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
