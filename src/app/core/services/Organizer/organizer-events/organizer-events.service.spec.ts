import { TestBed } from '@angular/core/testing';

import { OrganizerEventsService } from '../../../services/Organizer/organizer-events/organizer-events.service';

describe('OrganizerEventsService', () => {
  let service: OrganizerEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizerEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
