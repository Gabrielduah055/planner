import { Component } from '@angular/core';
import { AuthServicesService } from '../../core/services/auth/auth-services.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification-service/notification.service';
import { CommonModule } from '@angular/common';
import { GetEventService } from '../../core/services/Attendee Service/get-event.service';
import { AreaOfInterest } from '../../core/Interface/all-eventdetails/all-eventdetails';

@Component({
  selector: 'app-attendee-onboarding-step3',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './attendee-onboarding-step3.component.html',
  styleUrl: './attendee-onboarding-step3.component.css'
})
export class AttendeeOnboardingStep3Component {
  
  areasOfInterest: AreaOfInterest[] = [
    { name: 'Business', selected: false, status: 0 },
    { name: 'Technology', selected: false, status: 0 },
    { name: 'Arts & Culture', selected: false, status: 0 },
    { name: 'Sports & Fitness', selected: false, status: 0 },
    { name: 'Food & Drinks', selected: false, status: 0 },
    { name: 'Travel & Tour', selected: false, status: 0 },
    { name: 'Entertainment', selected: false, status: 0 },
  ];

  constructor(
    private router: Router,
    private eventService: GetEventService,
    private authService: AuthServicesService,
    private notificationService: NotificationService
  ) { }

  completeOnboarding() {
    const selectedInterests = this.areasOfInterest
      .filter(area => area.selected)
      .map(area => area.name);

    if (selectedInterests.length >= 3) {
      const userId = sessionStorage.getItem('userId') || '';
      const token = sessionStorage.getItem('Token');

      if (!token) {
        this.notificationService.showError('Authentication token is missing. Please log in again.');
        this.router.navigate(['/login']);
        return;
      }

      this.eventService.completeOnboarding(userId, selectedInterests).subscribe(
        (response) => {
          sessionStorage.setItem('onboardingComplete', 'true'); 
          this.authService.completeOnboarding(); 
          this.notificationService.showSuccess('Onboarding completed successfully')
          this.router.navigate(['/attendee-home']);
        },
        (error) => {
          this.notificationService.showError('Error completing onboarding. Please try again.');
        }
      );
    } else {
      this.notificationService.showError('Please select at least three interests.');
    }
  }
  
}
