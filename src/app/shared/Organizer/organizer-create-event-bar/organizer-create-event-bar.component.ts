import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizer-create-event-bar',
  standalone: true,
  imports: [],
  templateUrl: './organizer-create-event-bar.component.html',
  styleUrl: './organizer-create-event-bar.component.css'
})
export class OrganizerCreateEventBarComponent {

constructor(private router: Router){}

  OrgDasImg: string = 'assets/esp/logo.png'
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
  SettingsImg: string = 'assets/esp/dashboard/user.png'
  LogoutImg: string = 'assets/esp/dashboard/logout.png'
  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  NavBarImg: string = 'assets/esp/dashboard/avatar.png'
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'

  Event: string = 'Event'
  Vista: string = 'Vista'

  BackToEvent: string = 'Back to Event'
  Basic: string = 'Basic information'
  LocVenueLayout: string = 'Location & Venue layout'
  DateTime: string = 'Date & time'
  EventTicket: string = 'Event image & ticket'


  EventProgressImg: string = 'assets/esp/dashboard/event-create-back.png'
  closeTag: string = 'assets/esp/dashboard/Icon.png'
  EventLink: string = 'assets/esp/dashboard/basic-img.png'
  LocationImg: string = 'assets/esp/dashboard/location-img.png';
  DateAndTime: string = 'assets/esp/dashboard/date-img.png'
  Ticket: string = 'assets/esp/dashboard/ticket-img.png'


  venueLayoutUrl: string | null = null;
  seatingTypeUrl: string | null = null;
  eventImageUrl: string | null = null;
  organizerLogo: string | null = null;

  tagInput: string[] = [];
  tags: string[] = [];

  fields: boolean = false;

  showStart: boolean = false;
  showEnd: boolean = false;


  dsiplayStartTime: string = '';
  dsiplayEndTime: string = '';

  eventCreated = false;

  scheduleForm: boolean = false;
  publishNow: boolean = false;

  paidFormVisible: boolean = false;


  orgDash() {
    this.router.navigate(['/org-dash']);
  }

}
