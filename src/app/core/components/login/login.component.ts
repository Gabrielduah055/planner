import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginService } from '../../services/Login/login.service';

import { loginPageTexts, loginPageImages } from './text';
import { DangerComponent } from '../../../shared/Email and Pass Required/danger.component';
import { PreloadComponent } from '../../../shared/create-event-preload/preload.component';
import { LoginPreloadComponent } from '../../../shared/login-preload/login-preload.component';
import { environment } from '../../../../environments/environment';

import { SuccessComponent } from '../../../shared/login-error-handling/success/success.component';
import { InvalidPasswordComponent } from '../../../shared/login-error-handling/invalid-password/invalid-password.component';
import { DiabledAccountComponent } from '../../../shared/login-error-handling/diabled-account/diabled-account.component';
import { PasswordNotMatchComponent } from '../../../shared/signup-error-handling/password-not-match/password-not-match.component';
import { ErrorComponent } from '../../../shared/signup-error-handling/error/error.component';
import { UnauthorizedComponent } from '../../../shared/login-error-handling/unauthorized/unauthorized.component';
import { AuthServicesService } from '../../services/auth/auth-services.service';
import { NotificationService } from '../../../notification-service/notification.service';
import { AuthenticationResponse, PageResponse } from '../../Interface/registration/login-register';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RegistrationComponent,
    CommonModule,
    ForgotPasswordComponent,
    DangerComponent,
    PreloadComponent,
    LoginPreloadComponent,
    SuccessComponent,
    InvalidPasswordComponent,
    DiabledAccountComponent,
    PasswordNotMatchComponent,
    ErrorComponent,
    UnauthorizedComponent,
  ],
})
export class LoginComponent {
  loginPageTexts = loginPageTexts;
  loginPageImages = loginPageImages;

  loginForm: FormGroup;
  isFailed: boolean = false;
  isSubmitted: boolean = false;
  isIncorrect: boolean = false;
  loading: boolean = false;
  unAuthorized: boolean = false;
  serverErrorMessage = 'Server down, please try again later';
  organizerName: boolean = true;

  constructor(
    private login: LoginService,
    private router: Router,
    private authService: AuthServicesService,
    private notificationService: NotificationService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const postData = this.loginForm.value;
      this.loading = true;

      this.login.login(postData).subscribe({
        next: (response: AuthenticationResponse) => {
          this.isSubmitted = true;
          this.loading = false;
          this.notificationService.showSuccess('Login successful');
          sessionStorage.setItem('userId', response.userId);
          sessionStorage.setItem(environment.ADMIN_TOKEN, response.access_token);
          sessionStorage.setItem('Token', response.access_token);
          sessionStorage.setItem('organizerName', response.fullName);
          sessionStorage.setItem('email', response.userEmail);
          sessionStorage.setItem('onboardingComplete', response.onboardingComplete.toString());

          switch (response.userRole) {
            case 'ADMIN':
              setTimeout(() => this.router.navigateByUrl('/admin-dash'), 1000);
              break;
            case 'ATTENDEE':
              if (!this.authService.isOnboardingComplete()) {
                this.router.navigate(['/onboarding-step2']);
              } else {
                this.router.navigate(['/attendee-home']);
              }
              break;
            case 'ORGANIZER':
              setTimeout(() => this.router.navigateByUrl('/org-dash'), 1000);
              break;
            case 'UNAPPROVED_ORGANIZER':
              if (response.isCredentialsSubmitted === true) {
                this.isSubmitted = false;
                setTimeout(
                  () => this.router.navigateByUrl('/org-unapproved'),
                  1000
                );
              } else {
                setTimeout(
                  () => this.router.navigateByUrl('/org-business-info'),
                  1000
                );
              }
              break;
            default:
              this.router.navigateByUrl('/login');
              break;
          }
        },

        error: (error) => {
          this.loading = false;
          const signupError: PageResponse = error.error;
          this.notificationService.showError(signupError.message);
        },
      });
    }
  }

  showConfirmPassword: boolean = false;

  Signup() {
    this.router.navigate(['/signup']);
  }

  forgot() {
    this.router.navigate(['/forgot']);
  }

  Home() {
    this.router.navigate(['/']);
  }

  toggleConfirmPasswordVisibility1(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
    const password = this.loginForm.get('password')?.value;
  }
}
