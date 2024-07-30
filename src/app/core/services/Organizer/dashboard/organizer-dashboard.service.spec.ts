import { TestBed } from '@angular/core/testing';

import { OrganizerDashboardService } from './organizer-dashboard.service';


describe('OrganizerDashboardService', () => {
  let service: OrganizerDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizerDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
