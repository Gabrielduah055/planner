import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Input, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute, Router,  RouterLink, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AttendeeMyEventsComponent } from '../attendee-my-events/attendee-my-events.component';
import { AttendeeSidebarComponent } from '../../../../../shared/attendee-sidebar/attendee-sidebar.component';
import { AllEventdetails, UpcomingEvents, ViewEventdetails, allEventResponse } from '../../../../Interface/all-eventdetails/all-eventdetails';
import { GetEventService } from '../../../../services/Attendee Service/get-event.service';
import { AttendeeUpcomingEventsComponent } from '../../../../../shared/attendee-upcoming-events/attendee-upcoming-events.component';
import { CustomDatePipe } from '../../../../../shared/custom-date.pipe';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../../notification-service/notification.service';
import { Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthServicesService } from '../../../../services/auth/auth-services.service';
@Component({
  selector: 'app-attendee-event',
  standalone: true,
  templateUrl: './attendee-event.component.html',
  styleUrls: ['./attendee-event.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    RouterOutlet,
    AttendeeSidebarComponent,
    AttendeeUpcomingEventsComponent,
    RouterLink,
    CustomDatePipe
  ]
})
export class AttendeeEventComponent implements OnInit, OnDestroy {
  events: AllEventdetails[] = [];
  popularEvents: AllEventdetails[] = [];
  userId: string | null = sessionStorage.getItem('userId');
  fullName = sessionStorage.getItem('fullName');
  email = sessionStorage.getItem('email');
  filterByLocation: string = '';
  filterByCategory: string = '';
  filterByDate: string = '';
  filterByTicketStatus: string = '';
  noEventsFound: boolean = false;
  profileImageUrl: string = '';
  filters: { [key: string]: string } = {};
  isLoading: boolean = true;
  showLoadingMessage: boolean = true;
  loadingTimeout: any;
  profileSubscription!: Subscription;

  @ViewChild('locationInput') locationInput!: ElementRef;
  @ViewChild('categorySelect') categorySelect!: ElementRef;
  @ViewChild('dateInput') dateInput!: ElementRef;
  @ViewChild('ticketStatusSelect') ticketStatusSelect!: ElementRef;

  constructor(
    private eventService: GetEventService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authService: AuthServicesService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.loadEvent();
    this.profileSubscription = this.eventService.profile$.subscribe(profile => {
      if (profile) {
        this.profileImageUrl = profile.profileImageUrl;
        this.fullName = profile.lastName;
        this.email = profile.email;
      }
    });
    this.eventService.loadUserProfile(this.userId as string);

    this.loadingTimeout = setTimeout(() => {
      if (this.popularEvents.length === 0) {
        this.showLoadingMessage = true;
      }
    }, 5000);
  }

  ngOnDestroy() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
  }

  loadEvent() {
    this.eventService.getEvents(this.userId as string).subscribe({
      next: (res) => {
        this.events = res.content
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    });
  }

  updateProfile(updatedProfile: any) {
    this.eventService.updateAttendeeProfile(this.userId as string, updatedProfile).subscribe(
      response => {
        this.profileImageUrl = response.data.profileImageUrl;
        this.notificationService.showSuccess('Profile updated successfully');
      },
      error => {
        this.notificationService.showError('Error updating profile. Please try again.');
      }
    );
  }

  applyFilters() {

    this.events = this.events.filter(event => {
      const matchesLocation = !this.filterByLocation || event.venueLocation.toLowerCase().includes(this.filterByLocation.toLowerCase());
      const matchesCategory = !this.filterByCategory || event.eventCategory.toLowerCase().includes(this.filterByCategory.toLowerCase());
      const matchesDate = !this.filterByDate || (event.eventStartDate && event.eventEndDate && event.eventStartDate.toLowerCase() === this.filterByDate.toLowerCase());
      const matchesTicketStatus = !this.filterByTicketStatus || (event.ticketStatus && event.ticketStatus.toLowerCase() === this.filterByTicketStatus.toLowerCase());

      return matchesLocation && matchesCategory && matchesDate && matchesTicketStatus;
    });
    this.cdr.detectChanges();
  }

  onFilterChange(filterType: string, value: string) {
    this.filters[filterType] = value;
    this.applyFilters();
  }

  
  clearOtherFilters(exclude: string) {
    if (exclude !== 'location') {
      this.filterByLocation = '';
      this.locationInput.nativeElement.value = '';
    }
    if (exclude !== 'category') {
      this.filterByCategory = '';
      this.categorySelect.nativeElement.value = '';
    }
    if (exclude !== 'date') {
      this.filterByDate = '';
      this.dateInput.nativeElement.value = '';
    }
    if (exclude !== 'status') {
      this.filterByTicketStatus = '';
      this.ticketStatusSelect.nativeElement.value = '';
    }
  }

  onLocationChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filterByLocation = value;
    this.clearOtherFilters('location');
    this.onFilterChange('location', value);

    this.eventService.getEventsByLocationHome(value).subscribe({
      next: (res) => {
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by location:');
      }
    });
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.filterByCategory = value;
    this.clearOtherFilters('category');
    this.onFilterChange('category', value);

    this.eventService.getEventsByCategoryHome(value).subscribe({
      next: (res) => {
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by category');
      }
    });
  }

  onDateChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.filterByDate = value;
    this.clearOtherFilters('date');
    this.onFilterChange('date', value);

    this.eventService.getEventsByCategory(value).subscribe({
      next: (res) => {
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by date');
      }
    });
  }
  
  onTicketStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.filterByTicketStatus = value;
    this.clearOtherFilters('status');
    this.onFilterChange('status', value);

    this.eventService.getEventsByTicketStatusHome(value).subscribe({
      next: (res) => {
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by ticket status');
      }
    });
  }

  areFiltersApplied(): boolean {
    return this.filterByLocation !== '' || this.filterByDate !== '' || this.filterByCategory !== '' || this.filterByTicketStatus !== '';
  }

  accountSettings() {
    this.router.navigate(['/attendee-settings']);
  }

  showProfileCard: boolean = false;
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

}
