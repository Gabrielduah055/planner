import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../core/services/auth/auth-services.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../notification-service/notification.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-attendee-onboarding-step1',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './attendee-onboarding-step1.component.html',
  styleUrl: './attendee-onboarding-step1.component.css'
})
export class AttendeeOnboardingStep1Component {

  email = '';
  
  constructor(
    private router: Router, 
    private authService: AuthServicesService,
    private notificationService: NotificationService
  ) {
    this.email = sessionStorage.getItem('email') || '';
  }

  resendActivation(){
    this.authService.reSendActivationMail(this.email).subscribe(
      (response) => {
        if (response.message === 'A new activation token has been sent to your email') {
          this.notificationService.showSuccess('A new activation token has been sent to your email');
        } else {
          this.notificationService.showError('Unexpected response while resending activation email');
        }
      },
      (error) => {
        this.notificationService.showError('Error resending activation email');
      }
    );
  }
}
