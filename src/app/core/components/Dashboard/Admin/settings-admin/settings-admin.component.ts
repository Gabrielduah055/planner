import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SettingTexts, settingImages } from './texts';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttendeeProfile } from '../../../../Interface/all-eventdetails/all-eventdetails';
import { NotificationService } from '../../../../../notification-service/notification.service';
import { AdminSidebarComponent } from "../../../../../shared/admin-sidebar/admin-sidebar.component";
import { AllUsersService } from '../../../../services/Admin/All Users/all-users.service';
import { AdminProfile } from '../../../../Interface/Admin/getAllUsers';

@Component({
    selector: 'app-settings-admin',
    standalone: true,
    templateUrl: './settings-admin.component.html',
    styleUrl: './settings-admin.component.css',
    imports: [
        CommonModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        AdminSidebarComponent
    ]
})
export class SettingsAdminComponent implements OnInit {

  SettingTexts = SettingTexts;
  settingImages = settingImages;
  fullName = '';
  firstName = '';
  lastName = '';
  email = '';
  profileImageUrl: string = '';
  showProfileCard: boolean = false;
  profileData: AdminProfile | null = null;
  selectedFile: File | null = null;
  activeTab: string = 'account-settings';

  constructor(
    private router: Router, 
    private allUsersService: AllUsersService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.allUsersService.getAdminProfile(userId).subscribe({
        next: (res) => {
          this.profileData = res.data;
          this.populateProfileData();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching profile data:');
        }
      });
    } else {
      this.notificationService.showError('User Id not found');
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          this.profileImageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  }
  
  saveChanges(): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      return;
    }
  
    const updatedProfile: Partial<AdminProfile> = {
      firstName: this.firstName,
      lastName: this.lastName,
      profileImageUrl: this.profileImageUrl
    };
  
    this.allUsersService.updateAdminProfile(userId, updatedProfile).subscribe(
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

  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/admin-settings']);
  }


  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

}
