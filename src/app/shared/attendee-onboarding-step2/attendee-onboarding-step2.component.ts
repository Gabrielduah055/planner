import { Component } from '@angular/core';
import { AuthServicesService } from '../../core/services/auth/auth-services.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendee-onboarding-step2',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './attendee-onboarding-step2.component.html',
  styleUrl: './attendee-onboarding-step2.component.css'
})
export class AttendeeOnboardingStep2Component {
  interests: string = '';

  constructor(
    private router: Router, 
    private authService: AuthServicesService
  ) {}


  nextStep() {
    this.router.navigate(['/onboarding-step3']);
  }
}
