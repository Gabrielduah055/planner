import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { PreloadComponent } from '../../../shared/create-event-preload/preload.component';
import { CreateEventSuccessComponent } from '../../../shared/create-event-success/create-event-success.component';
import { OrganizerCreateEventBarComponent } from '../../../shared/Organizer/organizer-create-event-bar/organizer-create-event-bar.component';
import { BasicInformationComponent } from '../create-event-steps/basic-information/basic-information.component';
import { DateAndTimeComponent } from '../create-event-steps/date-and-time/date-and-time.component';
import { EventImageAndTicketComponent } from '../create-event-steps/event-image-and-ticket/event-image-and-ticket.component';
import { LocationAndVenueComponent } from '../create-event-steps/location-and-venue/location-and-venue.component';
import { PublishEventComponent } from '../create-event-steps/publish-event/publish-event.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
  imports: [
    RouterLink,
    TagInputModule,
    CommonModule,
    ScrollingModule,
    CreateEventSuccessComponent,
    PreloadComponent,
    OrganizerCreateEventBarComponent,
    BasicInformationComponent,
    LocationAndVenueComponent,
    DateAndTimeComponent,
    EventImageAndTicketComponent,
    PublishEventComponent,
  ],
})
export class CreateEventComponent {
  OrgDasImg: string = 'assets/esp/logo.png';
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png';
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png';
  SettingsImg: string = 'assets/esp/dashboard/user.png';
  LogoutImg: string = 'assets/esp/dashboard/logout.png';
  NavbarBell: string = 'assets/esp/dashboard/bell.png';
  NavBarImg: string = 'assets/esp/dashboard/avatar.png';
  NavBarDownArrow: string = 'assets/esp/dashboard/dowan.png';
  EventProgressImg: string = 'assets/esp/dashboard/event-create-back.png';
  Event: string = 'Event';
  Vista: string = 'Vista';
  BackToEvent: string = 'Back to Event';

  step: number = 1;
  isDiscardModalVisible = false;

  constructor(
    private router: Router,
  ) {}

  orgDash() {
    this.router.navigate(['/org-dash']);
  }
  orgEvent() {
    this.router.navigate(['/org-event']);
  }

  nextStep(step: number) {
    this.step = step;
  }

  prevStep(step: number) {
    this.step = step;
  }

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

}
