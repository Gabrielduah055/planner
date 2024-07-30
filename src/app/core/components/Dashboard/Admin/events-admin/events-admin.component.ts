import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { EventAdminService } from '../../../../services/Admin/event-admin/event-admin.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminSidebarComponent } from "../../../../../shared/admin-sidebar/admin-sidebar.component";
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from '../../../../../shared/custom-date.pipe';
import { AllUsersService } from '../../../../services/Admin/All Users/all-users.service';
import { AllEventdetails } from '../../../../Interface/all-eventdetails/all-eventdetails';
import { AdminViewAttendeesComponent } from '../../../../../shared/admin-view-attendees/admin-view-attendees.component';


@Component({
    selector: 'app-events-admin',
    standalone: true,
    templateUrl: './events-admin.component.html',
    styleUrl: './events-admin.component.css',
    imports: [
      AdminViewAttendeesComponent,
      CommonModule,
      FormsModule,
      RouterLink,
      AdminSidebarComponent,
      CustomDatePipe
    ]
})
export class EventsAdminComponent implements OnInit, OnDestroy {
  allEvents: AllEventdetails[] = [];
  filterByTicketStatus: string = '';
  filterByLocation: string = '';
  showLoadingMessage: boolean = false;
  loadingTimeout: any;
  totalEventsCount: number = 0;
  filters: AllEventdetails[] = [];
  userId: string | null = sessionStorage.getItem('userId');
  fullName = sessionStorage.getItem('fullName');
  email = sessionStorage.getItem('email');
  hoveredButtonId: number | null = null;
  hoveredButtonAction: string | null = null;
  activeButtonState: { [key: number]: string } = {};
  hoverButtonState: { [key: number]: string } = {};
  storedId!: number;
  threeButtonAction: boolean = false;
  isMenuModalVisible = false;
  pendingAction: { userId: number, action: string } | null = null;
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  isLoading: boolean = true;
  pageNumber: number = 1;
  
  @ViewChild('ticketStatusSelect') ticketStatusSelect!: ElementRef;
  @ViewChild('locationInput') locationInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private adminEventService: EventAdminService,
    private allUsersService: AllUsersService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.fetchNextPage(this.pageNumber);
    this.loadUserProfile()
    
    this.loadingTimeout = setTimeout(() => {
      if (this.allEvents && this.allEvents.length === 0) {
        this.showLoadingMessage = true;
      }
    }, 5000);

  }

  fetchNextPage(pageNumber: number) {
    this.adminEventService.getEvents(this.userId as string, pageNumber).subscribe({
      next: (res) => {
        console.log('events')
        const newEvents = res.content;
        this.allEvents = this.allEvents.concat(newEvents);
        if (!res.last) {
          this.fetchNextPage(pageNumber + 1); 
        } else {
          this.totalEventsCount = this.allEvents.length;
          this.isLoading = false;
          this.applyFilters();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
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
      console.error('User ID not found in local storage');
    }
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  onTicketStatusChange(viewevent: Event) {
    const target = viewevent.target as HTMLSelectElement;
    const value = target.value;
    this.filterByTicketStatus = value;
    this.clearOtherFilters('status');
    this.onFilterChange('status', value);

    this.adminEventService.getEventsByTicketStatus(value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.allEvents = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching events by ticket status:', error);
      }
    });
  }

  onLocationChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filterByLocation = value;
    this.clearOtherFilters('location');
    this.onFilterChange('location', value);

    this.adminEventService.getEventsByLocation(value).subscribe({
      next: (res: any) => {
        this.allEvents = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error fetching events by location:', error);
      }
    });
  }


  applyFilters() {
    if (this.allEvents) {
      this.filters = this.allEvents.filter(viewevent => {
        const matchesLocation = !this.filterByLocation || viewevent.venueLocation.toLowerCase().includes(this.filterByLocation.toLowerCase());
        const matchesTicketStatus = !this.filterByTicketStatus || (viewevent.ticketStatus && viewevent.ticketStatus.toLowerCase() === this.filterByTicketStatus.toLowerCase());
        return matchesLocation && matchesTicketStatus;
      });
      this.totalEventsCount = this.filters.length;
      this.cdr.detectChanges();
    }
  }
  
  onFilterChange(filterType: string, value: string) {
    this.filters.forEach(viewevent => {
      if (filterType === 'location') {
        viewevent.eventTitle = value.toLowerCase();
      } else if (filterType === 'status') {
        viewevent.ticketStatus = value.toLowerCase();
      }
    });
    this.applyFilters();
  }

  clearOtherFilters(exclude: string) {
    if (exclude !== 'location') {
      this.filterByLocation = '';
      if (this.locationInput && this.locationInput.nativeElement) {
        this.locationInput.nativeElement.value = '';
      }
    }
    if (exclude !== 'status') {
      this.filterByTicketStatus = '';
      this.ticketStatusSelect.nativeElement.value = '';
    }
  }

  actionMenu(userId: number) {
    if (this.storedId === userId && this.threeButtonAction) {
      this.storedId;
      this.threeButtonAction = false;
    } else {
      this.storedId = userId;
      this.threeButtonAction = true;
    }
  }

  setActiveButton(userId: number, action: string) {
    this.isMenuModalVisible = true;
    this.pendingAction = { userId, action };
  }

  hoverButton(userId: number, action: string) {
    this.hoveredButtonId = userId;
    this.hoveredButtonAction = action;
  }

  unhoverButton(userId: number, action: string) {
    if (this.hoveredButtonId === userId && this.hoveredButtonAction === action) {
      this.hoveredButtonId = null;
      this.hoveredButtonAction = null;
    }
  }

  isActiveButton(userId: number, action: string): boolean {
    return this.activeButtonState[userId] === action;
  }

  isHoverButton(userId: number, action: string): boolean {
    return this.hoveredButtonId === userId && this.hoveredButtonAction === action;
  }

  saveActiveButtonState() {
    localStorage.setItem('activeButtonState', JSON.stringify(this.activeButtonState));
  }

  loadActiveButtonState() {
    const savedState = localStorage.getItem('activeButtonState');
    if (savedState) {
      this.activeButtonState = JSON.parse(savedState);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.threeButtonAction = false;
      this.storedId;
    }
  }

  accountSettings() {
    this.router.navigate(['/admin-settings']);
  }

  showProfileCard: boolean = false;
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }
  
}
