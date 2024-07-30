import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventImageAndTicketComponent } from './event-image-and-ticket.component';

describe('EventImageAndTicketComponent', () => {
  let component: EventImageAndTicketComponent;
  let fixture: ComponentFixture<EventImageAndTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventImageAndTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventImageAndTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
