import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success', {
      toastClass: 'ngx-toastr custom-toast custom-toast-success',
      closeButton: true,
      progressBar: true
    } as IndividualConfig);
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error', {
      toastClass: 'ngx-toastr custom-toast custom-toast-error',
      closeButton: true,
      progressBar: true
    } as IndividualConfig);
  }
}
