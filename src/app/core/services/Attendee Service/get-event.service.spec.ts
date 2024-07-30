import { TestBed } from '@angular/core/testing';

import { GetEventService } from './get-event.service';

describe('GetEventService', () => {
  let service: GetEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
