import { Component, ChangeDetectorRef, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router,  RouterLink, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetEventService } from '../../core/services/Attendee Service/get-event.service';
import { AttendeeSidebarComponent } from '../attendee-sidebar/attendee-sidebar.component';
import { AllEventdetails, allEventResponse } from '../../core/Interface/all-eventdetails/all-eventdetails';
import { CustomDatePipe } from '../custom-date.pipe';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../notification-service/notification.service';

@Component({
    selector: 'app-attendee-popular-events',
    standalone: true,
    templateUrl: './attendee-popular-events.component.html',
    styleUrl: './attendee-popular-events.component.css',
    imports: 
    [
        CommonModule,
        FormsModule,
        RouterOutlet,
        AttendeeSidebarComponent,
        RouterLink,
        CustomDatePipe
    ]
})
export class AttendeePopularEventsComponent implements OnInit, OnDestroy {
    events: AllEventdetails[] = [];
    popularEvents: AllEventdetails[] = [];
    userId: string | null = sessionStorage.getItem('userId');
    fullName = sessionStorage.getItem('fullName');
    filterByLocation: string = '';
    filterByCategory: string = '';
    filterByDate: string = '';
    filterByTicketStatus: string = '';
    filters: { [key: string]: string } = {};
    showLoadingMessage: boolean = false;
    loadingTimeout: any;
    isLoading: boolean = true;
    profileSubscription!: Subscription;
    profileImageUrl: string = '';
    pageNumber: number = 1;
    
    @ViewChild('locationInput') locationInput!: ElementRef;
    @ViewChild('categorySelect') categorySelect!: ElementRef;
    @ViewChild('dateInput') dateInput!: ElementRef;
    @ViewChild('ticketStatusSelect') ticketStatusSelect!: ElementRef;
  
    constructor(
      private route: ActivatedRoute,
      private eventService: GetEventService,
      private cdr: ChangeDetectorRef,
      private router: Router,
      private notificationService: NotificationService
    ) { }
  
    ngOnInit(): void {
      this.fetchNextPage(this.pageNumber);
      this.loadUserProfile()
      
      this.loadingTimeout = setTimeout(() => {
        if (this.popularEvents.length === 0) {
          this.showLoadingMessage = true;
        }
      }, 20000);
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
        this.notificationService.showError('User ID not found in local storage');
      }
    }
  
    ngOnDestroy(): void {
      if (this.profileSubscription) {
        this.profileSubscription.unsubscribe();
      }
    }
  
    fetchNextPage(pageNumber: number) {
      this.eventService.getEvents(this.userId as string, pageNumber).subscribe({
        next: (res) => {
          this.events = this.events.concat(res.content);
          if (!res.last) {
            this.fetchNextPage(pageNumber + 1); 
          } else {
            this.isLoading = false;
            this.applyFilters(); 
          }
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching Events');
          this.isLoading = false;
        }
      });
    }

    loadMoreEvents() {
      this.pageNumber++; 
      this.fetchNextPage(this.pageNumber);
    }
  
    applyFilters() {

      this.popularEvents = this.events.filter(event => {
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
  
      this.eventService.getEventsByLocation(value).subscribe({
        next: (res: allEventResponse) => {
          this.popularEvents = res.content;
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
          this.popularEvents = res.content;
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
          this.popularEvents = res.content;
          this.applyFilters();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching events by ticket status');
        }
      });
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
