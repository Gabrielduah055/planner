import { TestBed } from '@angular/core/testing';

import { CreatedEventService } from './created-event.service';

describe('CreatedEventService', () => {
  let service: CreatedEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatedEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
