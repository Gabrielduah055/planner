import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomDatePipe } from '../custom-date.pipe';
import { Subscription } from 'rxjs';
import { ViewEventdetails } from '../../core/Interface/all-eventdetails/all-eventdetails';
import { HttpErrorResponse } from '@angular/common/http';
import { EventAdminService } from '../../core/services/Admin/event-admin/event-admin.service';
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";
import { AllUsersService } from '../../core/services/Admin/All Users/all-users.service';
import { NotificationService } from '../../notification-service/notification.service';

@Component({
    selector: 'app-admin-vieweventdetails',
    standalone: true,
    templateUrl: './admin-vieweventdetails.component.html',
    styleUrl: './admin-vieweventdetails.component.css',
    imports: [
        CommonModule,
        RouterLink,
        CustomDatePipe,
        AdminSidebarComponent
    ]
})
export class AdminVieweventdetailsComponent implements OnInit, OnDestroy {
  eventdetails!: ViewEventdetails;
  userId = sessionStorage.getItem('userId')
  eventId: string | null = null;
  preload: boolean = false;
  router = inject(Router);
  profileSubscription!: Subscription;
  profileImageUrl: string = '';

  fullName = sessionStorage.getItem('fullName');
  notification: any;

  constructor(
    private route: ActivatedRoute,
    private adminEventService: EventAdminService,
    private allUsersService: AllUsersService,
    private notificationService: NotificationService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('eventId');
      if (eventId) {
        this.loadEventDetails(eventId);
        this.loadUserProfile()
      } else {
        this.notificationService.showError('Event ID is missing.');
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
      this.notification.showError('User ID not found');
    }
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  loadEventDetails(eventId: string): void {
    this.adminEventService.getAdminEventById(eventId).subscribe({
      next: (res: ViewEventdetails) => {
        this.eventdetails = res;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching event details');
      }
    });
  }

  accountSettings() {
    this.router.navigate(['/admin-settings']);
  }

  showProfileCard: boolean = false;
  email = '';
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }
}
