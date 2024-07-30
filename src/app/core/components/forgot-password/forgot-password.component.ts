import { ForgotpasswordService } from './../../services/forgot password/forgotpassword.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NotFoundComponent } from '../../../shared/Forgot/not-found/not-found.component';
import { ErrorComponent } from '../../../shared/signup-error-handling/error/error.component';
import { SuccessComponent } from '../../../shared/login-error-handling/success/success.component';
import { ErrorResponse, PasswordResetResponse } from '../../Interface/forgot password/forgot-password';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NotFoundComponent,
    ErrorComponent,
    SuccessComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  ForgotPassword: FormGroup;
  isSubmitted: boolean = false;
  userEmail: any;
  error: boolean = false;
  notFound: boolean = false;
  isInvalid: boolean = false;

  success = "Email sent successfully";
  notFoundMessage = "Failed to Respond";
  errorMessage = "Field is required";
  serverErrorMessage = "Server is down. Please try again later.";
  isServer: boolean = false;

  constructor(private forgotpasswordService: ForgotpasswordService, private router: Router) {
    this.ForgotPassword = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.ForgotPassword.valid) {
      const email = this.ForgotPassword.value.email;
      this.userEmail = email;
      sessionStorage.setItem(environment.RESET_EMAIL, email);

      this.forgotpasswordService.ForgotPassword(this.ForgotPassword.value).subscribe({
        next: (response: PasswordResetResponse) => {
          console.log('Password reset successful', response);
          if (response.status === 200) {
            this.isSubmitted = !this.isSubmitted;
            setTimeout(() => {
              this.router.navigateByUrl('/reset-password-token');
            }, 2000);
          } else {
            console.error('Unexpected status code:', response.status);

          }
        },
        error: (error: ErrorResponse) => {
          console.error('Error:', error);
          if (error.error && error.error.businessErrorDescription === "Internal error, contact the Admin") {
            this.error = !this.error;
          } else if (error.error && error.error.businessErrorDescription === "Unauthorized") {
            sessionStorage.setItem("forgotEmail", this.ForgotPassword.get('email')?.value);
            this.notFound = !this.notFound;
          } else {
            this.isServer = !this.isServer
          }
        }
      });
    } else {
      this.error = true;
      sessionStorage.removeItem('forgotEmail');
      this.isInvalid = !this.isInvalid;
    }
  }

  Login() {
    this.router.navigate(['/login']);
  }
}
