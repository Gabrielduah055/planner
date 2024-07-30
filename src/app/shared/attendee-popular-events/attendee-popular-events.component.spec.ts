import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeePopularEventsComponent } from './attendee-popular-events.component';

describe('AttendeePopularEventsComponent', () => {
  let component: AttendeePopularEventsComponent;
  let fixture: ComponentFixture<AttendeePopularEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeePopularEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeePopularEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
