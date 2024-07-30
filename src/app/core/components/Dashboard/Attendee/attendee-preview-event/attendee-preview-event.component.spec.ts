import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeePreviewEventComponent } from './attendee-preview-event.component';

describe('AttendeePreviewEventComponent', () => {
  let component: AttendeePreviewEventComponent;
  let fixture: ComponentFixture<AttendeePreviewEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeePreviewEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeePreviewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
