import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";
import { AllUsersService } from '../../core/services/Admin/All Users/all-users.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../notification-service/notification.service';

@Component({
    selector: 'app-admin-payment-integration',
    standalone: true,
    templateUrl: './admin-payment-integration.component.html',
    styleUrl: './admin-payment-integration.component.css',
    imports: [
        CommonModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        AdminSidebarComponent
    ]
})
export class AdminPaymentIntegrationComponent implements OnInit, OnDestroy {

  fullName = sessionStorage.getItem('fullName');
  email = sessionStorage.getItem('email');
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  showProfileCard: boolean = false;
  activeTab: string = 'integrations';

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
      this.profileSubscription = this.allUsersService.profile$.subscribe(profile => {
        if (profile) {
          this.profileImageUrl = profile.profileImageUrl;
          this.fullName;
          this.email = profile.email;
        }
      });
      this.allUsersService.loadUserProfile(userId);
    } else {
      this.notificationService.showError('Refresh page');
    }
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
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
