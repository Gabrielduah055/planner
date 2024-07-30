import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../../services/Organizer/event/event.service';
import { EventObject, PageableResponse } from '../../../../Interface/create-event/organizer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtDecoderService } from '../../../../services/Organizer/JWT-Token/jwt-decoder.service';
import { NotificationService } from '../../../../../notification-service/notification.service';
import { CustomDatePipe } from '../../../../../shared/custom-date.pipe';

@Component({
  selector: 'app-org-view-events',
  standalone: true,
  imports: [CommonModule, CustomDatePipe ],
  templateUrl: './org-view-events.component.html',
  styleUrl: './org-view-events.component.css'
})
export class OrgViewEventsComponent {
  eventdetails:boolean = false;
  preload: boolean = false;
  createEvent_: boolean = false;
  displayUsers: boolean = false;
  records: Array<EventObject> = [];

  filteredSupplier: Array<EventObject> = [];
  displayedSuppliers: Array<EventObject> = [];
  currenPage: number = 1;
  pageSize: number = 20;
  filterByCategory: string = '';
  isDropdownVisible: boolean[] = [];
  profile: boolean = false;
  email = '';

  noResultsFound: boolean = false;

  eventCreated: boolean = false;
  eventNotCreated: boolean = false;
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

  viewEventId = Number(sessionStorage.getItem('viewEvent'));

  ngOnInit(): void {
    this.getAllOrganizerEvents();
    this.viewEvent(this.viewEventId)
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


  ViewEventRecords: EventObject[] = [];

  viewEvent(eventId: number) {
    this.eventService.getEventById(eventId).subscribe({
      next: (response: EventObject) => {
        this.ViewEventRecords = [response];
        this.records = this.records.filter(event => event.eventId !== eventId);
        this.filteredSupplier = this.records;
        this.updateDisplayedSuppliers();
        this.eventdetails = true;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  back(){
    this.router.navigate(['/org-event']);
  }


}
