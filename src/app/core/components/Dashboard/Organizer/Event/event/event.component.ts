import { Event } from './../../../../../Interface/all-eventdetails/organizer-interface';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../../../../notification-service/notification.service';
import { OrganizerDashComponent } from '../../../../../../shared/Organizer/organizer-sidebar/organizer-dash.component';
import { OrganizerTopBarComponent } from '../../../../../../shared/Organizer/organizer-top-bar/organizer-top-bar.component';
import { UserPaginationComponent } from '../../../../../../shared/Organizer/pagination/user-pagination.component';
import { PreloadGeneralComponent } from '../../../../../../shared/preload-general/preload-general.component';
import {
  EventObject,
  PageableResponse,
} from '../../../../../Interface/create-event/organizer';
import { PageResponse } from '../../../../../Interface/registration/login-register';
import { CreatedEventService } from '../../../../../services/Organizer/created-event/created-event.service';
import { EventService } from '../../../../../services/Organizer/event/event.service';
import { JwtDecoderService } from '../../../../../services/Organizer/JWT-Token/jwt-decoder.service';

@Component({
  selector: 'app-event',
  standalone: true,
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    PreloadGeneralComponent,
    UserPaginationComponent,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
  ],
})
export class EventComponent {
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

  eventCreated: boolean = false;
  eventNotCreated: boolean = false;
  heading = 'Events';
  sub_heading = 'Plan and manage your gatherings effortlessly.';

  constructor(
    private router: Router,
    private CreatedEventService: CreatedEventService,
    private http: HttpClient,
    private jwtDecodeService: JwtDecoderService,
    private eventService: EventService,
    private notificationService: NotificationService
  ) {}

  orgCreateEvent() {
    this.router.navigate(['/org-create-event']);
  }

  accountSettings() {
    this.router.navigate(['/org-settings']);
  }

  toggleCard() {
    this.profile = !this.profile;
  }

  ngOnInit(): void {
    this.getAllOrganizerEvents();
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

  deleteEvent(eventId: number, index: number) {
    this.eventService.deleteEvent(eventId).subscribe({
      next: (response: PageResponse) => {
        this.notificationService.showSuccess(response.message);
         this.records = this.records.filter(event => event.eventId !== eventId);
         this.filteredSupplier = this.records;
         this.updateDisplayedSuppliers();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });

    this.isDropdownVisible[index] = false;
  }


  viewEvent(id: number){
this.router.navigate(['/org-preview-page']);
console.log(id, 'event');
sessionStorage.removeItem('viewEvent');
sessionStorage.setItem('viewEvent', id.toString());


  }

  viewAttendee(id: number){
    this.router.navigate(['/org-event-attendees']);
console.log(id, 'event');
sessionStorage.setItem('viewAttendee', id.toString());

  }



}



