import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PreloadGeneralComponent } from "../../../../../shared/preload-general/preload-general.component";
import { UserInviteComponent } from './user-invite/user-invite.component';
import { OrganizerDashComponent } from "../../../../../shared/Organizer/organizer-sidebar/organizer-dash.component";
import { OrganizerTopBarComponent } from "../../../../../shared/Organizer/organizer-top-bar/organizer-top-bar.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Co_Organizer } from '../../../../Interface/Organizer-filtering/records';
import { ActivateCoOrgService } from '../../../../services/Organizer/Activate_Co-Org/activate-co-org.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [
    CommonModule,
    RouterLink,
    PreloadGeneralComponent,
    UserInviteComponent,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsersComponent implements OnInit {

  heading = "User management"
  sub_heading = "Manage Co-organizers and venue staff here."


  OrgDasImg: string = 'assets/esp/logo.png'
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
  SettingsImg: string = 'assets/esp/dashboard/user.png'
  LogoutImg: string = 'assets/esp/dashboard/logout.png'
  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  NavBarImg: string = 'assets/esp/dashboard/avatar.png'
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'
  CardImg: string = 'assets/esp/dashboard/event-created.png'

  SearchImg: string = 'assets/esp/dashboard/search.png'
  FilterImg: string = 'assets/esp/dashboard/filter.png'
  userPlus: string = 'assets/esp/dashboard/user-plus.png'

  Filters: string = 'Filters'
  Free: string = 'Free'
  Paid: string = 'Paid'
  inviteUser: string = 'Invite user'
  inviteFirst: string = 'Invite your first user'
  addUsers: string = 'Add users on this page'

  Vista: string = 'Vista';
  AllEvent: string = 'All events'

  NavBarName: string = 'Olivia Rhye'
  Dashboard: string = 'Dashboard'
  Settings: string = 'Settings'
  LogOut: string = 'Log out'


  eventCreated: boolean = false
  eventNotCreated: boolean = false

  modal = false
  storedId: number | null = null;

  constructor(private router: Router, private http: HttpClient, private activate: ActivateCoOrgService ) { }

  orgEvent() {
    this.router.navigate(['/org-event']);
  }
  orgCreateEvent() {
    this.router.navigate(['/org-create-event']);

  }
  orgDash() {
    this.router.navigate(['/org-dash']);
  }

  orgUsers() {
    this.router.navigate(['/org-users'])

  }



  users() {
    this.router.navigate(['/org-users'])

  }

  userInvite() {
    this.router.navigate(['/user-invite']);
  }

  openModal() {
    this.modal = !this.modal
  }



  profile: boolean = false
  email = 'ekumku@example.com'

  toggleCard() {

    this.profile = !this.profile

  }

  threeButtonAction: boolean = false


  accountSettings() {
    this.router.navigate(['/org-settings']);

  }
  currentPage: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  displayUsers: boolean = false;
  hidePaginations: boolean = false;
  failed: boolean = false;


  decodedToken: any;
  preload: boolean = false;
  createEvent_: boolean = false;
  records: Array<Co_Organizer> = [];
  filteredSupplier: Array<Co_Organizer> = [];
  displayedSuppliers: Array<Co_Organizer> = [];
  currenPage: number = 1;
  pageSize: number = 5;
  filterByCategory: string = '';

  // ngOnInit() {
  //   this.fetchData();
  // }

  ngOnInit(): void {

    const userId = sessionStorage.getItem(environment.USER_ID);
    const Token = sessionStorage.getItem(environment.ORGANIZER_TOKEN);

    if (!userId && !Token) {
      console.error('User Id or Token not found');
      return;
    }

    const url = `${environment.GET_ALL_USERS_ORG}/${userId}?page=${this.currentPage}&size=${this.pageSize}`;
    this.displayUsers = true;
    this.hidePaginations = true;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${Token}`);
    const options = { headers: headers };

    this.http.get<Co_Organizer>(url, options).subscribe({

      next: (response: any) => {
        this.records = response.data.content;
        this.eventCreated = true;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        console.log('users invited', this.records);
        this.displayUsers = false;
        this.hidePaginations = false;
      },
      error: (err: any) => {
        console.error(err);
        this.failed = true;
      }
    });
  }


  // getPageNumbers(): number[] {
  //   return Array.from({ length: Math.ceil(this.totalElements / this.pageSize) }, (_, i) => i + 1);
  // }

  // prevPage(): void {
  //   if (this.currentPage > 0) {
  //     this.currentPage--;
  //     this.fetchData();
  //   }
  // }

  // nextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.fetchData();
  //   }
  // }

  // goToPage(pageNumber: number): void {
  //   this.currentPage = pageNumber;
  //   this.fetchData();
  // }

  updateDisplayedSuppliers() {
    const startIndex = (this.currenPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedSuppliers = this.filteredSupplier.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currenPage < this.pageNumbers().length) {
      this.currenPage++;
      this.updateDisplayedSuppliers();
    }
  }

  previousPage() {
    if (this.currenPage > 1) {
      this.currenPage--;
      this.updateDisplayedSuppliers();
    }
  }

  pageNumbers() {
    const totalPages = Math.ceil(this.filteredSupplier.length / this.pageSize);
    return new Array(totalPages);
  }

  changePage(pageNumber: number) {
    this.currenPage = pageNumber;
    this.updateDisplayedSuppliers();
  }
  noResultsFound: boolean = false;

  filterData(searchTerm: string, filterOption: string) {

    this.filteredSupplier = this.records.filter((item) => {
      const matchesSearchTerm = Object.values(item).some((val) => {
        return val != null && val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });

      if (filterOption === '' || filterOption === 'All') {
        return matchesSearchTerm;
      } else {
        return matchesSearchTerm && Object.values(item).some((val) => {
          return val != null && val.toString().toLowerCase().includes(filterOption.toLowerCase());

        });
      }
    });

    this.noResultsFound = true;
    this.noResultsFound = this.filteredSupplier.length === 0;
    this.currenPage = 1; // Reset to the first page after filtering
    this.updateDisplayedSuppliers();
    console.log("Displayed", searchTerm, filterOption);
  }
// In your component class

// In your component class

isActionMenuOpen: boolean = false;
selectedItemId: string | null = null;
isChangeState:boolean = false;
changeChaState: boolean = false;
state = '';
co_OrgId  = '';

toggleActionMenu(itemId: string) {
  if (this.selectedItemId === itemId) {
    this.isActionMenuOpen = !this.isActionMenuOpen;
  } else {
    this.isActionMenuOpen = true;
  }
  this.selectedItemId = itemId;
}

// activateAccount(itemId: string, pageNumber: number, pageSize: number) {

//   this.activate.activateAccount(itemId, pageNumber, pageSize).subscribe({
//     next: (response) => {
//       console.log('Account activation successful:', response);
//     },
//     error: (error: HttpErrorResponse) => {
//       console.error('Account activation failed:', error);
//     }
//   });
// }


showLogoutConfirmation() {

}

cancelState() {
  this.isChangeState = false;
  this.changeChaState = false;
  console.log(this.changeChaState = false)
}

 confirmState() {
  console.log('');
  this.isChangeState = true;
  this.changeChaState = true;
  console.log(this.changeChaState = true)
  this.router.navigate(['/org-users']);
}


activateAccount(id: string){
  this.router.navigate(['/org-event']);
  console.log(id, 'event');
  sessionStorage.removeItem('activate-user');
  sessionStorage.setItem('viewEvent', id.toString());

    }

    deactivateAccount(id: string) {
      this.router.navigate(['/org-event']);
      console.log(id, 'event');
      sessionStorage.removeItem('deactivate-user');
      sessionStorage.setItem('viewEvent', id.toString());
    }

    deleteAccount(id: string) {
      this.router.navigate(['/org-event']);
      console.log(id, 'event');
      sessionStorage.removeItem('delete-user');
      sessionStorage.setItem('viewEvent', id.toString());
    }





}
