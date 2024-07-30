import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeOnboardingStep2Component } from './attendee-onboarding-step2.component';

describe('AttendeeOnboardingStep2Component', () => {
  let component: AttendeeOnboardingStep2Component;
  let fixture: ComponentFixture<AttendeeOnboardingStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeOnboardingStep2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeOnboardingStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
