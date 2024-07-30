import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../notification-service/notification.service';
import { AllFieldComponent } from '../../../shared/All Field/all-field.component';
import { PreloadComponent } from '../../../shared/create-event-preload/preload.component';
import { ErrorComponent } from '../../../shared/signup-error-handling/error/error.component';
import { PasswordNotMatchComponent } from '../../../shared/signup-error-handling/password-not-match/password-not-match.component';
import { SuccessSignupComponent } from '../../../shared/signup-error-handling/success-signup/success-signup.component';
import { UserExistComponent } from '../../../shared/signup-error-handling/user-exist/user-exist.component';
import { SignupPreloadComponent } from '../../../shared/signup-preload/signup-preload.component';
import { PageResponse } from '../../Interface/registration/login-register';
import { RegistrationService } from '../../services/Registration/registration.service';
import { matchPasswords, SignupFormValidators } from '../../utils/validators';
import { LoginComponent } from '../login/login.component';
import { signupPageImages, signupPageTexts } from './text';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  imports: [
    SignupPreloadComponent,
    ErrorComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LoginComponent,
    HttpClientModule,
    FormsModule,
    PreloadComponent,
    AllFieldComponent,
    SuccessSignupComponent,
    UserExistComponent,
    PasswordNotMatchComponent,
  ],
})
export class RegistrationComponent {
  errorMessage = 'Required fields * are not met';
  noSubmit: boolean = false;
  email = sessionStorage.getItem('email') || '';

  signupPageImages = signupPageImages;
  signupPageTexts = signupPageTexts;

  registrationForm: FormGroup;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showPassword1: boolean = false;
  loading: boolean = false;
  showConfirmPassword = false;
  isOrganizer: boolean = false;

  constructor(
    private register: RegistrationService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.registrationForm = new FormGroup(
      {
        fullName: new FormControl('', SignupFormValidators.fullName),
        email: new FormControl('', SignupFormValidators.email),
        password: new FormControl('', SignupFormValidators.password),
        confirmPassword: new FormControl(
          '',
          SignupFormValidators.confirmPassword
        ),
        role: new FormControl('', SignupFormValidators.role),
        gender: new FormControl('', SignupFormValidators.gender),
        dateOfBirth: new FormControl('', SignupFormValidators.dateOfBirth),
      },
      { validators: matchPasswords('password', 'confirmPassword') }
    );
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.loading = true;
      const postData = this.registrationForm.value;
      this.register.signup(postData).subscribe({
        next: (response) => {
          this.notificationService.showSuccess(
            'Signup successful, check  email for verification'
          );
          this.loading = false;
          this.saveFormDataToLocalstorage(postData);
          sessionStorage.setItem('email', postData.email);
          setTimeout(() => {
            this.router.navigateByUrl('/onboarding-step1');
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          const signupError: PageResponse = error.error;
          this.notificationService.showError(signupError.message);
          this.loading = false;
        },
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const password = this.registrationForm.get('password')?.value;
  }

  toggleConfirmPasswordVisibility1(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
  }

  private saveFormDataToLocalstorage(formData: any): void {
    sessionStorage.setItem('registrationData', JSON.stringify(formData));
  }

  Login() {
    this.router.navigate(['/login']);
  }

  Home() {
    this.router.navigate(['/']);
  }

  onRoleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.isOrganizer = selectElement.value === '1: ORGANIZER';
    this.updateValidators();
  }

  updateValidators(): void {
    if (this.isOrganizer) {
      this.registrationForm.get('gender')?.setValue('');
      this.registrationForm.get('dateOfBirth')?.setValue('');
      this.registrationForm.get('gender')?.clearValidators();
      this.registrationForm.get('dateOfBirth')?.clearValidators();
    } else {
      this.registrationForm
        .get('gender')
        ?.setValidators(SignupFormValidators.gender);
      this.registrationForm
        .get('dateOfBirth')
        ?.setValidators(SignupFormValidators.dateOfBirth);
    }
    this.registrationForm.get('gender')?.updateValueAndValidity();
    this.registrationForm.get('dateOfBirth')?.updateValueAndValidity();
  }
}
