import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeMyEventsComponent } from './attendee-my-events.component';

describe('AttendeeMyEventsComponent', () => {
  let component: AttendeeMyEventsComponent;
  let fixture: ComponentFixture<AttendeeMyEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeMyEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeMyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
