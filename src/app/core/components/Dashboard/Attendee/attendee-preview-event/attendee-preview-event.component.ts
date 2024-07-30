import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AttendeeSidebarComponent } from '../../../../../shared/attendee-sidebar/attendee-sidebar.component';
import { ViewEventdetails } from '../../../../Interface/all-eventdetails/all-eventdetails';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomDatePipe } from '../../../../../shared/custom-date.pipe';
import { GetEventService } from '../../../../services/Attendee Service/get-event.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../../../notification-service/notification.service';

@Component({
  selector: 'app-attendee-preview-event',
  standalone: true,
  imports: [
    AttendeeSidebarComponent, 
    CommonModule, 
    RouterLink,
    CustomDatePipe
  ],
  templateUrl: './attendee-preview-event.component.html',
  styleUrl: './attendee-preview-event.component.css'
})
export class AttendeePreviewEventComponent implements OnInit, OnDestroy {
  eventdetails!: ViewEventdetails;
  userId = sessionStorage.getItem('userId')
  eventId: string | null = null;
  preload: boolean = false;
  router = inject(Router);
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  eventDate: Date | null = null;

  fullName = sessionStorage.getItem('fullName');

  constructor(
    private route: ActivatedRoute,
    private eventService: GetEventService,
    private cdr: ChangeDetectorRef,
    
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
      this.profileSubscription = this.eventService.profile$.subscribe(profile => {
        if (profile) {
          this.profileImageUrl = profile.profileImageUrl;
          this.fullName = profile.lastName;
          this.email = profile.email;
        }
      });
      this.eventService.loadUserProfile(userId);
    } else {
      this.notificationService.showError('User not found');
    }
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  loadEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (res: ViewEventdetails) => {
        this.eventdetails = res;
        this.eventDate = new Date(res.eventStartDate);
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching event details');
      }
    });
  }


  registerForEvent(): void {
    if (this.eventdetails) {
      const ticketStatus = this.eventdetails.ticketStatus?.toLowerCase();
      const eventId = this.eventdetails.eventId;
      if (this.eventDate && this.eventDate < new Date()) {
        this.notificationService.showError('You cannot register for a past event.');
        return;
      }
  
      if (ticketStatus === 'free' || ticketStatus === undefined) {
        this.router.navigate(['/attendee-free-checkout', this.eventdetails.eventId]).then(() => {
          this.cdr.detectChanges();
        });
      } else if (ticketStatus === 'paid') {
        this.router.navigate(['/attendee-payment', this.eventdetails.eventId]).then(() => {
          this.cdr.detectChanges();
        });
      } 
    } 
  }

  calculateTotalAllocations(): number {
    if (!this.eventdetails?.ticketTiers) {
      return 0;
    }
    return this.eventdetails.ticketTiers.reduce((total, tier) => total + tier.allocation, 0);
  }

  accountSettings() {
    this.router.navigate(['/attendee-settings']);
  }

  showProfileCard: boolean = false;
  email = '';
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

}
