import { Component, NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtDecoderService } from '../../../../services/Organizer/JWT-Token/jwt-decoder.service';
import { EventService } from '../../../../services/Organizer/event/event.service';
import { NotificationService } from '../../../../../notification-service/notification.service';
import { CreatedEventService } from '../../../../services/Organizer/created-event/created-event.service';
import { PageResponse } from '../../../../Interface/registration/login-register';
import { CommonModule } from '@angular/common';
import { OrganizerDashComponent } from "../../../../../shared/Organizer/organizer-sidebar/organizer-dash.component";
import { OrganizerTopBarComponent } from "../../../../../shared/Organizer/organizer-top-bar/organizer-top-bar.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloadGeneralComponent } from "../../../../../shared/preload-general/preload-general.component";
import { OrganizerCreateEventBarComponent } from "../../../../../shared/Organizer/organizer-create-event-bar/organizer-create-event-bar.component";
import { Co_Organizer } from '../../../../Interface/Organizer-filtering/records';
import { ActivateCoOrgService } from '../../../../services/Organizer/Activate_Co-Org/activate-co-org.service';
import { environment } from '../../../../../../environments/environment';
import { AttendeeDetails, EventObject, PageableResponse } from '../../../../Interface/create-event/organizer';

@Component({
  selector: 'app-event-attendees',
  standalone: true,
  imports: [
    CommonModule,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
    FormsModule,
    PreloadGeneralComponent,
    OrganizerCreateEventBarComponent,
    ReactiveFormsModule,
    RouterLink,


  ],

  templateUrl: './event-attendees.component.html',
  styleUrl: './event-attendees.component.css'
})
export class EventAttendeesComponent {




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

  eventdetails:boolean = false;
  preload: boolean = false;
  createEvent_: boolean = false;
  displayUsers: boolean = false;
  records: Array<EventObject> = [];

  filteredSupplier: Array<EventObject> = [];
  displayedSuppliers: Array<EventObject> = [];
  currenPage: number = 19;
  pageSize: number = 1;
  filterByCategory: string = '';
  isDropdownVisible: boolean[] = [];
  profile: boolean = false;
  email = '';


  heading = 'Events';
  sub_heading = 'Plan and manage your gatherings effortlessly.';

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtDecodeService: JwtDecoderService,
    private eventService: EventService,
    private notificationService: NotificationService
  ) {}


  isDiscardModalVisible:boolean = false;

  showDiscardConfirmation() {
    this.isDiscardModalVisible = true;
  }

  cancelDiscard() {
    this.isDiscardModalVisible = false;
  }

  confirmDiscard() {
    this.isDiscardModalVisible = false;
    sessionStorage.removeItem('BasicInformation');
    sessionStorage.removeItem('LocationAndVenue');
    sessionStorage.removeItem('DateAndTime');
    sessionStorage.removeItem('EventAndTicket');
    this.router.navigate(['/org-event']);
  }

  discard(event: boolean) {
    this.isDiscardModalVisible = true;
  }

  orgCreateEvent() {
    this.router.navigate(['/org-create-event']);
  }

  accountSettings() {
    this.router.navigate(['/org-settings']);
  }

  toggleCard() {
    this.profile = !this.profile;
  }

  viewEventId = String(sessionStorage.getItem('viewAttendee'));

  ngOnInit(): void {
    this.getAllOrganizerEvents();
    this.viewEventAttendees(this.viewEventId,this.pageSize,this.currenPage)
  }

  getAllOrganizerEvents() {
    this.eventService.getAllOrganizerEvents().subscribe({
      next: (response: PageableResponse) => {
        this.records = response.content;
        this.preload = false;
        this.createEvent_ = false;
        this.displayUsers = true;
        this.eventCreated = true;
        this.filteredSupplier = this.records;
        this.updateDisplayedSuppliers();
      },
      error: (error: HttpErrorResponse) => {
        this.preload = true;
        this.createEvent_ = true;
        this.notificationService.showError(error.error.message);
      },
    });
  }

  updateDisplayedSuppliers() {
    const startIndex = (this.currenPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedSuppliers = this.filteredSupplier.slice(startIndex, endIndex);
  }




  noResultsFound: boolean = false;

  filterData(searchTerm: string, filterOption: string) {
    this.filteredSupplier = this.records.filter((item) => {
      const matchesSearchTerm = Object.values(item).some((val) => {
        return (
          val != null &&
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      if (filterOption === '' || filterOption === 'All') {
        return matchesSearchTerm;
      } else {
        return (
          matchesSearchTerm &&
          Object.values(item).some((val) => {
            return (
              val != null &&
              val.toString().toLowerCase().includes(filterOption.toLowerCase())
            );
          })
        );
      }
    });

    this.noResultsFound = true;
    this.noResultsFound = this.filteredSupplier.length === 0;
    this.currenPage = 1;
    this.updateDisplayedSuppliers();
  }

  toggleDropdown(index: number) {
    this.isDropdownVisible[index] = !this.isDropdownVisible[index];
  }

  orgUpdateEvent(eventId: number) {
    this.router.navigate(['/org-update-event/' + eventId]);
  }


  ViewEventAttendeeRecords: AttendeeDetails [] = [];

  viewEventAttendees(eventId: string, pageNumber: number, pageSize: number) {
    this.eventService.getRegisteredAttendeesByEventId(eventId, pageNumber, pageSize).subscribe({
      next: (response: any) => {

        console.log('EventAttendee data:', response);
        this.ViewEventAttendeeRecords = response.content; // Assign response to component property
        this.updateDisplayedSuppliers(); // Call any function to update UI if needed
        this.eventdetails = true; // Set eventdetails flag based on your UI logic
        console.log( this.ViewEventAttendeeRecords);
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message); // Handle error
      }
    });

  }
  role:string = 'Attendee';


  changePage(pageNumber: number) {
    this.currenPage = pageNumber;
    this.updateDisplayedSuppliers();
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

  nextPage() {
    if (this.currenPage < this.pageNumbers().length) {
      this.currenPage++;
      this.updateDisplayedSuppliers();
    }
  }

  


  }


