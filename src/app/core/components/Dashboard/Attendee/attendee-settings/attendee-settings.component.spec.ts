import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeSettingsComponent } from './attendee-settings.component';

describe('AttendeeSettingsComponent', () => {
  let component: AttendeeSettingsComponent;
  let fixture: ComponentFixture<AttendeeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
