import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeOnboardingStep3Component } from './attendee-onboarding-step3.component';

describe('AttendeeOnboardingStep3Component', () => {
  let component: AttendeeOnboardingStep3Component;
  let fixture: ComponentFixture<AttendeeOnboardingStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeOnboardingStep3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeOnboardingStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
