  import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
  import { Router, RouterLink } from '@angular/router';
  import { CommonModule } from '@angular/common';
  import { AllUsersService } from '../../../../services/Admin/All Users/all-users.service';
  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  import { UserPermissionService } from '../../../../services/Admin/user-permission/user-permission.service';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { AdminSidebarComponent } from "../../../../../shared/admin-sidebar/admin-sidebar.component";
  import { AllUsersResponse, ContentItem, InviteData, UserRole } from '../../../../Interface/Admin/getAllUsers';
  import { AdminOrganizerDetailComponent } from '../../../../../shared/admin-organizer-detail/admin-organizer-detail.component';
  import { Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { NotificationService } from '../../../../../notification-service/notification.service';
  
  @Component({
    selector: 'app-users-admin',
    standalone: true,
    templateUrl: './users-admin.component.html',
    styleUrls: ['./users-admin.component.css'],
    imports: [
      CommonModule, 
      ReactiveFormsModule, 
      AdminSidebarComponent,
      AdminOrganizerDetailComponent,
      RouterLink,
      FormsModule
    ]
  })
  export class UsersAdminComponent implements OnInit, OnDestroy {
    @ViewChild('filterSearchInput') filterSearchInput!: ElementRef;
    @ViewChild('filterRolesSelect') filterRolesSelect!: ElementRef;
    
    isModalOpen = false;
    adminName = '';
    adminEmail = '';
    role: UserRole = 'ADMIN';
    token: string | null = null;
    allUsers: AllUsersResponse | null = null;
    filteredUsers: ContentItem[] = [];
    users: ContentItem[] = [];
    totalUsersCount: number = 0;
    filterByRoles: string = '';
    filterUserEmail: string = '';
    currentPage: number = 1;
    itemsPerPage: number = 6;
    storedId!: number;
    hoveredButtonId: number | null = null;
    hoveredButtonAction: string | null = null;
    activeButtonState: { [key: number]: string } = {};
    hoverButtonState: { [key: number]: string } = {};
    threeButtonAction: boolean = false;
    private timeoutCalled: boolean = false;
    fullName = localStorage.getItem('fullName');
    email = localStorage.getItem('email');
    profileSubscription!: Subscription;
    profileImageUrl: string = '';

    isMenuModalVisible = false;
    pendingAction: { userId: number, action: string } | null = null;
    confirmationMessage: string = '';
  
    constructor(
      private router: Router,
      private http: HttpClient,
      private userPermissionService: UserPermissionService,
      private allUsersService: AllUsersService,
      private cdr: ChangeDetectorRef,
      private notificationSeervice: NotificationService
    ) {}
  
    ngOnInit(): void {
      this.loadUsers(this.currentPage, this.itemsPerPage);
      this.loadActiveButtonState();
      this.loadUserProfile();
      this.retrieveStoredId();
    }

    loadUsers(page: number, itemsPerPage: number): void {
      this.allUsersService.getAll(page, itemsPerPage).subscribe({
        next: (response: AllUsersResponse) => {
          this.filteredUsers = response.data.content;
          this.applyFilters();
          this.totalUsersCount = response.data.totalElements;
          this.cdr.detectChanges(); 

          if (!this.timeoutCalled) {
            this.timeoutCalled = true;
            setTimeout(() => {
              this.timeoutCalled = false;
            }, 1000);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.notificationSeervice.showError('Access denied');
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
        this.notificationSeervice.showError('User ID not found in local storage');
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
        this.loadUsers(this.currentPage, this.itemsPerPage);
      }
    }
    
    prevPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadUsers(this.currentPage, this.itemsPerPage);
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
        this.loadUsers(this.currentPage, this.itemsPerPage);
      }
    }

    searchUser(value: string) {
      this.filterUserEmail = value;
      this.clearOtherFilters('email');

      if (!value.trim()) {
        this.filteredUsers = [];
        return;
      }
    
      this.allUsersService.getUsersByEmailOrName(value).pipe(
        debounceTime(300), 
        distinctUntilChanged(), 
        switchMap(() => {
          return this.allUsersService.getUsersByEmailOrName(value);
        })
      ).subscribe({
        next: (res: { data: { content: ContentItem[] } }) => {
          this.filteredUsers = res.data.content;
          this.applyFilters();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationSeervice.showError('Error fetching users by name or email');
        }
      });
    }

    filterUsersByRole(value: string) {
      this.filterByRoles = value;
      this.clearOtherFilters('role');
      this.applyFilters();
    
      this.allUsersService.getUsersByRole(value).subscribe({
        next: (res: { data: { content: ContentItem[] } }) => {
          this.filteredUsers = res.data.content;
          this.applyFilters();
        },
        error: (error: HttpErrorResponse) => {
         this.notificationSeervice.showError('Error fetching users by role');
        }
      });
    }
    
    applyFilters() {
      if (this.allUsers) {
        this.filteredUsers = this.users.filter((user: ContentItem) => {
          const matchesEmailName = !this.filterUserEmail || user.fullName.toLowerCase().includes(this.filterUserEmail.toLowerCase());
          const matchesRole = !this.filterByRoles || user.role.toLowerCase() === this.filterByRoles.toLowerCase();
          return matchesEmailName && matchesRole;
        });

        this.cdr.detectChanges();
      }
    }
    
    
    onFilterChange(filterType: string, value: string) {
      this.filteredUsers.forEach(user => {
        if (filterType === 'email') {
          user.fullName = value;
        } else if (filterType === 'role') {
          user.role = value;
        }
      });
      this.applyFilters();
    }

  clearOtherFilters(exclude: string) {
    if (exclude !== 'email') {
      this.filterUserEmail = '';
      if (this.filterSearchInput && this.filterSearchInput.nativeElement) {
        this.filterSearchInput.nativeElement.value = '';
      }
    }
    if (exclude !== 'role') {
      this.filterByRoles = '';
      if (this.filterRolesSelect && this.filterRolesSelect.nativeElement) {
        this.filterRolesSelect.nativeElement.value = '';
      }
    }
  }
    
  
    activateUser(id: number): void {
      this.userPermissionService.activateUser(id).subscribe(
        () => {
          this.notificationSeervice.showSuccess('User activated successfully');
          this.filteredUsers = this.filteredUsers.map(user => {
            if (user.id === id) {
              return { ...user, enabled: true, statusText: 'Active' };
            } else {
              return user;
            }
          });
        },
        (error) => {
          this.notificationSeervice.showError('Error activating user');
        }
      );
    }
    
    deactivateUser(id: number): void {
      this.userPermissionService.deactivateUser(id).subscribe(
        () => {
          this.notificationSeervice.showSuccess('User deactivated successfully');
          this.filteredUsers = this.filteredUsers.map(user => {
            if (user.id === id) {
              return { ...user, enabled: false, statusText: 'Inactive' };
            } else {
              return user;
            }
          });
        },
        (error) => {
          this.notificationSeervice.showError('Error deactivating user');
        }
      );
    }
    
    deleteUser(userId: number): void {
      this.userPermissionService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== userId);
          this.totalUsersCount--;
          this.notificationSeervice.showSuccess('User deleted successfully');
        },
        (error) => {
          this.notificationSeervice.showError('Error deleting user');
        }
      );
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

      if (action === 'activate') {
        this.confirmationMessage = 'Are you sure you want to activate this user?';
      } else if (action === 'deactivate') {
        this.confirmationMessage = 'Are you sure you want to deactivate this user?';
      } else if (action === 'delete') {
        this.confirmationMessage = 'Are you sure you want to delete this user?';
      }
    }
  
    cancelMenu() {
      this.isModalOpen = false;
      this.isMenuModalVisible = false;
      this.pendingAction = null;
    }
  
    confirmAction() {
      if (this.pendingAction) {
        const { userId, action } = this.pendingAction;
  
        this.activeButtonState[userId] = action;
        this.saveActiveButtonState();
  
        if (action === 'activate') {
          this.activateUser(userId);
        } else if (action === 'deactivate') {
          this.deactivateUser(userId);
        } else if (action === 'delete') {
          this.deleteUser(userId);
        }
  
        this.pendingAction = null;
      }
  
      this.isMenuModalVisible = false;
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
      sessionStorage.setItem('activeButtonState', JSON.stringify(this.activeButtonState));
    }
  
    loadActiveButtonState() {
      const savedState = sessionStorage.getItem('activeButtonState');
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
    
  
    showProfileCard: boolean = false;
    toggleCard() {
      this.showProfileCard = !this.showProfileCard;
    }
  
    accountSettings() {
      this.router.navigate(['/admin-settings']);
    }


    openModal() {
      this.isModalOpen = true;
    }  

    retrieveStoredId(): void {
      const storedIdString = sessionStorage.getItem('userId');
      if (storedIdString) {
        this.storedId = +storedIdString; 
        this.token = sessionStorage.getItem('token');
      } else {
        this.notificationSeervice.showError('Sender ID not found or expired');
      }
    }
    
  
    sendInvite() {
      if (this.storedId) {
        const inviteData: InviteData = {
          fullName: this.adminName,
          email: this.adminEmail,
          role: 'ADMIN',
        };
  
        this.allUsersService.sendAdminInvite(this.storedId, inviteData).subscribe(response => {
          this.notificationSeervice.showSuccess('Invite sent successfully');
          this.cancelMenu();
        }, error => {
          this.notificationSeervice.showError('Email already exist');
        });
      } else {
        this.notificationSeervice.showError('Sender email not found');
      }
    }
  
  }
  