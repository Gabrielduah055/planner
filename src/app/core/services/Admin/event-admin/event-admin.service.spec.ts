import { TestBed } from '@angular/core/testing';

import { EventAdminService } from './event-admin.service';

describe('EventAdminService', () => {
  let service: EventAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
