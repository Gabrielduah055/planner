import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeOnboardingStep1Component } from './attendee-onboarding-step1.component';

describe('AttendeeOnboardingStep1Component', () => {
  let component: AttendeeOnboardingStep1Component;
  let fixture: ComponentFixture<AttendeeOnboardingStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeOnboardingStep1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeOnboardingStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
