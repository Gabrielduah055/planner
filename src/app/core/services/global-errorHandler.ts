import { Injectable } from '@angular/core';
import { NotificationService } from '../../notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {
  constructor(private notificationService: NotificationService) {}

  handleError(error: unknown) {
    let errorMessage = 'An error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error instanceof HttpErrorResponse) {
      errorMessage = `HTTP Error: ${error.status} - ${error.message}`;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    this.notificationService.showError(errorMessage);
  }
}
