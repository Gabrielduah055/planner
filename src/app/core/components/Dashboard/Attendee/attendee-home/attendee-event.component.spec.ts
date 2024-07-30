import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeEventComponent } from './attendee-event.component';

describe('AttendeeEventComponent', () => {
  let component: AttendeeEventComponent;
  let fixture: ComponentFixture<AttendeeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
