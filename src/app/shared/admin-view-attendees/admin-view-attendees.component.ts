import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AllUsersService } from '../../core/services/Admin/All Users/all-users.service';
import { AdminViewAttendeesByE, AllUsersEvent, AllUsersResponse, AttendeesResponse, ContentItem } from '../../core/Interface/Admin/getAllUsers';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventAdminService } from '../../core/services/Admin/event-admin/event-admin.service';
import { ViewEventdetails } from '../../core/Interface/all-eventdetails/all-eventdetails';
import { CustomDatePipe } from "../custom-date.pipe";
import { NotificationService } from '../../notification-service/notification.service';

@Component({
    selector: 'app-admin-view-attendees',
    standalone: true,
    templateUrl: './admin-view-attendees.component.html',
    styleUrls: ['./admin-view-attendees.component.css'],
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        CustomDatePipe
    ]
})
export class AdminViewAttendeesComponent implements OnInit, OnDestroy {
  @ViewChild('filterSearchInput') filterSearchInput!: ElementRef;
  @ViewChild('filterGenderSelect') filterGenderSelect!: ElementRef;

  filteredUsers: AdminViewAttendeesByE[] = [];
  users: AdminViewAttendeesByE[] = [];
  isModalOpen = false;
  allUsers: AllUsersResponse | null = null;
  filteredAttendee: AdminViewAttendeesByE[] = [];
  eventdetails: ViewEventdetails = {} as ViewEventdetails;
  totalUsersCount: number = 0;
  filterByGender: string = '';
  filterUserEmail: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  eventId: string = '';
  storedId!: number;
  fullName = localStorage.getItem('fullName');
  email = localStorage.getItem('email');
  profileSubscription!: Subscription;
  profileImageUrl: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private adminEventService: EventAdminService,
    private allUsersService: AllUsersService,
    private cdr: ChangeDetectorRef,
    private notificationSevice: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      if (this.eventId) {
        this.loadAttendees(this.eventId, this.currentPage, this.itemsPerPage);
        this.loadUserProfile();
        this.loadEventDetails(this.eventId);
      } else {
        this.notificationSevice.showError('Event ID is not defined');
      }
    });
  }

  loadEventDetails(eventId: string): void {
    this.adminEventService.getAdminEventById(eventId).subscribe({
      next: (res) => {
        this.eventdetails = res;
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationSevice.showError('Error fetching event details:');
      }
    });
  }

  loadAttendees(eventId: string, page: number, itemsPerPage: number): void {
    if (!eventId) {
      return;
    }
    this.allUsersService.getAdminViewAttendeesByEventId(eventId, page, itemsPerPage).subscribe({
      next: (res: AttendeesResponse) => {
        this.users = res.content;
        this.totalUsersCount = res.totalElements;
        this.applyFilters();
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationSevice.showError('Error fetching users:');
      },
      complete: () => {
        this.cdr.detectChanges();
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
      this.notificationSevice.showError('User not found');
    }
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.totalUsersCount) {
      this.currentPage++;
      this.loadAttendees(this.eventId, this.currentPage, this.itemsPerPage);
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAttendees(this.eventId, this.currentPage, this.itemsPerPage);
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalUsersCount / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.loadAttendees(this.eventId, this.currentPage, this.itemsPerPage);
    }
  }

  searchUser(email: string, event_id: string) {
    this.filterUserEmail = email;
    this.clearOtherFilters('email');
    this.applyFilters();
  
    if (!email.trim()) {
      this.filteredUsers = [];
      
      return;
    }
  
    this.allUsersService.getAttendeeByEmailOrName(email, event_id).subscribe({
      next: (res: AttendeesResponse) => {
        this.filteredUsers = res.content; 
        this.totalUsersCount = res.totalElements;
        
        this.cdr.detectChanges(); 
      },
      error: (error: HttpErrorResponse) => {
        this.notificationSevice.showError('Error fetching users by name or email');
      }
    });
  }

  getAttendeeByGender(gender: string, event_id: string) {
    this.filterByGender = gender;
    this.clearOtherFilters('gender');
    this.applyFilters();
    
    this.allUsersService.getAttendeeByGender(gender, event_id).subscribe({
      next: (res: AttendeesResponse) => {
        this.filteredUsers = res.content;
        this.totalUsersCount = res.totalElements;
        
        this.cdr.detectChanges(); 
      },
      error: (error: HttpErrorResponse) => {
        this.notificationSevice.showError('Error fetching users by gender');
      }
    });
  }
  
  applyFilters() {
    this.filteredAttendee = this.users.filter((user: AdminViewAttendeesByE) => {
      const matchesEmailName = !this.filterUserEmail || user.name.toLowerCase().includes(this.filterUserEmail.toLowerCase());
      const matchesGender = !this.filterByGender || user.gender.toLowerCase() === this.filterByGender.toLowerCase();
      return matchesEmailName && matchesGender;
    });

    this.cdr.detectChanges();
  }
  
  clearOtherFilters(filterType: string) {
    if (filterType === 'email') {
      this.filterByGender = '';
      if (this.filterGenderSelect && this.filterGenderSelect.nativeElement) {
        this.filterGenderSelect.nativeElement.value = '';
      }
    } else if (filterType === 'gender') {
      this.filterUserEmail = '';
      if (this.filterSearchInput && this.filterSearchInput.nativeElement) {
        this.filterSearchInput.nativeElement.value = '';
      }
    }
    this.applyFilters();
  }

  showProfileCard: boolean = false;
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/admin-settings']);
  }
}
