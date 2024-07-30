import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeUpcomingEventsComponent } from './attendee-upcoming-events.component';

describe('AttendeeUpcomingEventsComponent', () => {
  let component: AttendeeUpcomingEventsComponent;
  let fixture: ComponentFixture<AttendeeUpcomingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeUpcomingEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeUpcomingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
