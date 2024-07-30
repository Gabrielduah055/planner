import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject, OnDestroy} from '@angular/core';
import { GetEventService } from '../../../../services/Attendee Service/get-event.service';
import { CommonModule } from '@angular/common';
import { AllEventdetails, allEventResponse, RegisteredEvents } from '../../../../Interface/all-eventdetails/all-eventdetails';
import { AttendeeSidebarComponent } from '../../../../../shared/attendee-sidebar/attendee-sidebar.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomDatePipe } from "../../../../../shared/custom-date.pipe";
import { NotificationService } from '../../../../../notification-service/notification.service';

@Component({
    selector: 'app-attendee-my-events',
    standalone: true,
    templateUrl: './attendee-my-events.component.html',
    styleUrl: './attendee-my-events.component.css',
    imports: [
        CommonModule,
        FormsModule,
        RouterOutlet,
        RouterLink,
        AttendeeSidebarComponent,
        CustomDatePipe
    ]
})
export class AttendeeMyEventsComponent implements OnInit, OnDestroy {
  events: AllEventdetails[] = [];
  filterByLocation: string = '';
  filterByDate: string = '';
  filterByCategory: string = '';
  filterByTicketStatus: string = '';
  filterSearch: string = '';
  fullName = sessionStorage.getItem('fullName');
  userId: string | null = sessionStorage.getItem('userId');
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  filters: { [key: string]: string } = {};
  isLoading: boolean = true;
  showLoadingMessage: boolean = true;

  @ViewChild('locationInput') locationInput!: ElementRef;
  @ViewChild('categorySelect') categorySelect!: ElementRef;
  @ViewChild('dateInput') dateInput!: ElementRef;
  @ViewChild('ticketStatusSelect') ticketStatusSelect!: ElementRef;


  constructor(
    private eventService: GetEventService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadEventRegistered();
    this.loadUserProfile();
  }

  loadEventRegistered() {
    this.eventService.getMyEventRegisteredById(this.userId as string).subscribe({
      next: (res: RegisteredEvents) => {
        this.events = res.content;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching Events, waiting...');
        this.isLoading = false;
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

  applyFilters() {
    if(this.events){
      this.events = this.events.filter(event => {
        const matchesLocation = !this.filterByLocation || event.venueLocation.toLowerCase().includes(this.filterByLocation.toLowerCase());
        const matchesCategory = !this.filterByCategory || event.eventCategory.toLowerCase().includes(this.filterByCategory.toLowerCase());
        const matchesDate = !this.filterByDate || (event.eventStartDate && event.eventEndDate && event.eventStartDate.toLowerCase() === this.filterByDate.toLowerCase());
        const matchesTicketStatus = !this.filterByTicketStatus || (event.ticketStatus && event.ticketStatus.toLowerCase() === this.filterByTicketStatus.toLowerCase());

        return matchesLocation && matchesCategory && matchesDate && matchesTicketStatus;
      });
      this.cdr.detectChanges();
    }
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

    this.eventService.getEventsByLocation(value).subscribe({
      next: (res: allEventResponse) => {
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by location');
      }
    });
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.filterByCategory = value;
    this.clearOtherFilters('category');
    this.onFilterChange('category', value);

    this.eventService.getEventsByCategory(value).subscribe({
      next: (res:allEventResponse) => {
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
      next: (res: any) => {
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

    this.eventService.getEventsByTicketStatus(value).subscribe({
      next: (res:allEventResponse) => {
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

  showProfileCard: boolean = false;
  email = '';
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/attendee-settings']);
  }
}
