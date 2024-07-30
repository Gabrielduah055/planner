import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../../../notification-service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private notificationService: NotificationService) {}

  handleImageUpload(event: Event, controlName: string, formGroup: FormGroup): Promise<string | null> {
    const input = event.target as HTMLInputElement;

    return new Promise((resolve, reject) => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const fileType = file.type;
        const fileSize = file.size;
        const maxSize = 10 * 1024 * 1024

        if (!fileType.startsWith('image/')) {
          this.notificationService.showError('Only image files are allowed');
          reject('Invalid file type');
          return;
        }

        if (fileSize > maxSize) {
          this.notificationService.showError(`File size exceeds the maximum allowed size of ${maxSize / 1024 / 1024} MB`);
          reject('File size exceeds limit');
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          const fileDataUrl = reader.result as string;

          const readerForBase64 = new FileReader();
          readerForBase64.onload = () => {
            const base64Data = readerForBase64.result as string;
            formGroup.get(controlName)?.setValue(base64Data);
            resolve(fileDataUrl); // Resolve with fileDataUrl once loaded
          };
          readerForBase64.readAsDataURL(file);
        };
        reader.readAsDataURL(file);
      } else {
        reject('No file selected');
      }
    });
  }
}
