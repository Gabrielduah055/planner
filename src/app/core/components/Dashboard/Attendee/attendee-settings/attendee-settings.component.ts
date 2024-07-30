import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingTexts, settingImages } from './texts';
import { GetEventService } from '../../../../services/Attendee Service/get-event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AttendeeProfile } from '../../../../Interface/all-eventdetails/all-eventdetails';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendeeSidebarComponent } from '../../../../../shared/attendee-sidebar/attendee-sidebar.component';
import { NotificationService } from '../../../../../notification-service/notification.service';

@Component({
  selector: 'app-attendee-settings',
  standalone: true,
  templateUrl: './attendee-settings.component.html',
  styleUrls: ['./attendee-settings.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    AttendeeSidebarComponent,
  ]
})
export class AttendeeSettingsComponent implements OnInit {
  SettingTexts = SettingTexts;
  settingImages = settingImages;
  fullName = '';
  firstName = '';
  lastName = '';
  email = '';
  profileImageUrl = '';
  showProfileCard: boolean = false;
  profileData: AttendeeProfile | null = null;
  selectedFile: File | null = null;

  constructor(
    private router: Router, 
    private eventService: GetEventService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  
  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.eventService.getAttendeeProfile(userId).subscribe({
        next: (res) => {
          this.profileData = res.data;
          this.populateProfileData();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching profile data');
        }
      });
    } else {
      this.notificationService.showError('User not found');
    }
  }
  
  populateProfileData() {
    if (this.profileData) {
      this.fullName = `${this.profileData.firstName} ${this.profileData.lastName}`;
      this.firstName = this.profileData.firstName;
      this.lastName = this.profileData.lastName;
      this.email = this.profileData.email;
      this.profileImageUrl = this.profileData.profileImageUrl;
    }
  }
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => this.profileImageUrl = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  saveChanges(): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      return;
    }
    
    const updatedProfile: Partial<AttendeeProfile> = {
      firstName: this.firstName,
      lastName: this.lastName,
      profileImageUrl: this.profileImageUrl
    };
    
    this.eventService.updateAttendeeProfile(userId, updatedProfile).subscribe(
      response => {
        if (response && response.data && response.data.message) {
          this.profileData = response.data;
          this.populateProfileData();
        } else {
          this.notificationService.showSuccess('Profile updated successfully');
        }
      },
      error => {
        let errorMessage = 'Error updating profile. Please try again.';

        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status === 403) {
          errorMessage = 'Permission denied: You are not authorized to perform this action.';
        } else if (error.status === 404) {
          errorMessage = 'Profile not found: The profile you are trying to update does not exist.';
        }
        this.notificationService.showError(errorMessage);
      }
    );
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer!.dropEffect = 'copy';
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer!.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  
  cancel(): void {
    this.populateProfileData();
  }

  accountSettings() {
    this.router.navigate(['/attendee-settings']);
  }

}
