import { TestBed } from '@angular/core/testing';

import { CreateEventAdminService } from './create-event-admin.service';

describe('CreateEventAdminService', () => {
  let service: CreateEventAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEventAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
