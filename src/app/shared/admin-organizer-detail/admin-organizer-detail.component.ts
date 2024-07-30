import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AllUsersService } from '../../core/services/Admin/All Users/all-users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AllUsersResponse, OrganizerProfileInformation } from '../../core/Interface/Admin/getAllUsers';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../notification-service/notification.service';

@Component({
  selector: 'app-admin-organizer-detail',
  standalone: true,
  templateUrl: './admin-organizer-detail.component.html',
  styleUrls: ['./admin-organizer-detail.component.css'],
  imports: [
    CommonModule,  
    AdminSidebarComponent,
    RouterLink,
    FormsModule
  ]
})
export class AdminOrganizerDetailComponent implements OnInit {
  profileImageUrl = '';
  userId!: string;
  organizerDetails: OrganizerProfileInformation | null = null;
  fullName = sessionStorage.getItem('fullName');
  email = sessionStorage.getItem('email');
  showProfileCard: boolean = false;
  profileSubscription!: Subscription;
  approvalStatus: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private allUsersService: AllUsersService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.loadUserProfile();
        this.loadOrganizerDetails(this.userId);
      } else {
        this.notificationService.showError('Organizer ID not found in route parameters');
      }
    });
  }

  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileSubscription = this.allUsersService.profile$.subscribe(profile => {
        if (profile) {
          this.profileImageUrl = profile.profileImageUrl;
          this.fullName = profile.lastName;
          this.email = profile.email;
        }
      });
      this.allUsersService.loadUserProfile(userId);
    } else {
      this.notificationService.showError('Server Error');
    }
  }


  loadOrganizerDetails(userId: string) {
    this.allUsersService.getOrganizerDetails(userId).subscribe({
      next: (res) => { 
        this.organizerDetails = res;
        this.approvalStatus = res.data?.approvalStatus || '';
        this.loadStatusFromLocalStorage();
        this.updateApprovalStatus();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('source cannot be null');
      }
    });
  }
  

  approveOrganizer(userId: string): void {
    if (!userId) return;
  
    this.allUsersService.approveOrganizer(userId).subscribe(
      (response) => {
        if (response.message === 'APPROVED') {
          this.approvalStatus = 'Approved';
          this.saveStatusToLocalStorage('Approved');
          this.notificationService.showSuccess('APPROVED')
        }
      },
      (error) => {
        this.notificationService.showError('Error approving organizer');
      }
    );
  }  

  declineOrganizer(userId: string): void {
    if (!userId) return;
  
    this.allUsersService.declineOrganizer(userId).subscribe(
      (response) => {
        if (response.message === 'DECLINE') {
          this.approvalStatus = 'Declined';
          this.saveStatusToLocalStorage('Declined');
          this.notificationService.showError('DECLINED')
        }
      },
      (error) => {
        this.notificationService.showError('Error declining organizer');
      }
    );
  }

  updateApprovalStatus(): void {
    if (this.organizerDetails && this.organizerDetails.data && this.organizerDetails.data.approvalStatus) {
      this.approvalStatus = this.organizerDetails.data.approvalStatus;
    }
  }

  saveStatusToLocalStorage(status: string): void {
    if (this.userId) {
      sessionStorage.setItem(`approvalStatus_${this.userId}`, status);
    }
  }

  loadStatusFromLocalStorage(): void {
    if (this.userId) {
      const storedStatus = sessionStorage.getItem(`approvalStatus_${this.userId}`);
      if (storedStatus) {
        this.approvalStatus = storedStatus;
        if (this.organizerDetails && this.organizerDetails.data) {
          this.organizerDetails.data.approvalStatus = storedStatus;
        }
      }
    }
  }

  handleStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const status = target.value;
    this.approvalStatus = status;

    if (status === 'Approved') {
      this.approveOrganizer(this.userId);
    } else if (status === 'Declined') {
      this.declineOrganizer(this.userId);
    }
  }
  
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/admin-settings']);
  }
}
