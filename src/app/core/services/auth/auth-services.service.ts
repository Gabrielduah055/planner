import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AllUsersResponse, ResendTokenActivation } from '../../Interface/Admin/getAllUsers';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private readonly ONBOARDING_COMPLETE_KEY = 'onboardingComplete';
  
  token = sessionStorage.getItem('Token')

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private http: HttpClient
  ) {}

  login(data: any) {
    this.loginService.login(data).subscribe(response => {
      sessionStorage.setItem('ATTENDEE_TOKEN', response.access_token);
      sessionStorage.setItem(this.ONBOARDING_COMPLETE_KEY, response.onboardingComplete ? 'true' : 'false');
      this.redirectAfterLogin();
    });
  }

  reSendActivationMail(email: string){

    const url = `${environment.BASE_URL}/auth/resend-activation-token?email=${email}`;
    const body = { email };
    
    return this.http.post<ResendTokenActivation>(url, body);
  }

  completeOnboarding() {
    sessionStorage.setItem(this.ONBOARDING_COMPLETE_KEY, 'true');
    this.router.navigate(['/attendee-home']);
  }

  isOnboardingComplete(): boolean {
    return sessionStorage.getItem(this.ONBOARDING_COMPLETE_KEY) === 'true';
  }

  private redirectAfterLogin() {
    if (this.isOnboardingComplete()) {
      this.router.navigate(['/attendee-home']);
    } else {
      this.router.navigate(['/onboarding-step1']);
    }
  }
}
