import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';
import { OrganizationBusinessInfoService } from '../../../../services/Organizer/Business Info/organization-business-info.service';
import { environment } from '../../../../../../environments/environment';
import { JwtDecoderService } from '../../../../services/Organizer/JWT-Token/jwt-decoder.service';
import { CommonModule } from '@angular/common';
import { LoginPreloadComponent } from '../../../../../shared/login-preload/login-preload.component';
import { SuccessComponent } from '../../../../../shared/login-error-handling/success/success.component';
import { ErrorComponent } from '../../../../../shared/signup-error-handling/error/error.component';
import { NotificationService } from '../../../../../notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-business-info',
  standalone: true,
  templateUrl: './business-info.component.html',
  styleUrl: './business-info.component.css',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoginPreloadComponent,
    SuccessComponent,
    ErrorComponent,
  ],
})
export class BusinessInfoComponent {
  businessInfo: FormGroup;
  publishNow: boolean = false;
  orgBusiness: boolean = true;
  isError: boolean = false;
  start: boolean = true;
  organizationCertificate: string | null = null;
  organizationLogo: string | null = null;
  loading: boolean = false;
  success: boolean = false;
  allFields: boolean = false;

  loadingMessage: string = '...';
  errorMessage = 'All fields are required';

  successMessage = 'business information submitted successfully';

  constructor(
    private router: Router,
    private OrganizerBusinessInfo: OrganizationBusinessInfoService,
    private notificationService: NotificationService
  ) {
    this.businessInfo = new FormGroup({
      organizationName: new FormControl('', [Validators.required]),
      organizationEmailAddress: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      organizationCertificate: new FormControl('', [Validators.required]),
      organizationLogo: new FormControl('', [Validators.required]),
      organizationWebsite: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const postData = this.businessInfo.value;

    this.loading = true;
    if (this.businessInfo.valid) {
      const postData = this.businessInfo.value;

      timer(100)
        .pipe(take(1))
        .subscribe(() => {
          this.OrganizerBusinessInfo.OrganizerBusinessInfo(postData).subscribe({
            next: (response: any) => {
              this.success = true;
              setTimeout(() => {
                this.router.navigateByUrl('/login');
              }, 3000);
            },

            error: (error: HttpErrorResponse) => {
              this.notificationService.showError(error.message);
              this.loading = false;
            },
          });
        });
    } else {
      this.loading = false;
      this.isError = true;
    }
  }

  getStarted() {
    this.start = false;
  }

  organizationCertificateImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 2 * 1024 * 1024;

      if (fileSize > maxSize) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        this.start = false;
        const base64Data = reader.result as string;
        this.organizationCertificate = base64Data;
        this.businessInfo.get(controlName)?.setValue(base64Data);
      };
      reader.readAsDataURL(file);
    }
  }

  organizationLogoImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 2 * 1024 * 1024;

      if (fileSize > maxSize) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        this.start = false;
        const base64Data = reader.result as string;
        this.organizationLogo = base64Data;
        this.businessInfo.get(controlName)?.setValue(base64Data);
      };
      reader.readAsDataURL(file);
    }
  }
}
