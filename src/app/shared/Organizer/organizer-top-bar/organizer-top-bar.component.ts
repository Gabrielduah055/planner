import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizer-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './organizer-top-bar.component.html',
  styleUrl: './organizer-top-bar.component.css'
})
export class OrganizerTopBarComponent {

  @Input() heading: string ='';
  @Input() sub_Heading: string ='';

constructor(private router: Router) {}

OrgDasImg: string = 'assets/esp/logo.png'
DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
SettingsImg: string = 'assets/esp/dashboard/user.png'
LogoutImg: string = 'assets/esp/dashboard/logout.png'
NavbarBell: string = 'assets/esp/dashboard/bell.png'
NavBarImg: string = 'assets/esp/dashboard/avatar.png'
NavBarDownArrow: string = 'assets/esp/dashboard/down.png'
CardImg: string = 'assets/esp/dashboard/three-dots.png'
baseImg: string = 'assets/esp/dashboard/base.png'
pieChart: string = 'assets/esp/dashboard/pie_chart.png'

  Event: string = 'Event';
  Vista: string = 'Vista';

  navBarName: string = sessionStorage.getItem("organizerName") || ''
  subTitle: string = 'Plan and manage your gatherings effortlessly.'
  Dashboard: string = 'Dashboard'
  Users: string = 'Users'
  LogOut: string = 'Log out'

  eventCreated: string = 'Events created'
  Revenue: string = 'Revenue'
  fourThousand: number = 4000
  Attendees: string = 'Number of Attendees'
  EightThousand: number = 8000
  RevChart: string = 'Revenue chart'
  profile: boolean = false;
  email= 'ekumkofi@example.com';

  toggleCard() {

    this.profile = !this.profile
    // this.router.navigate(['/login']);

  }

 accountSettings() {
    this.router.navigate(['/org-settings']);

  }
}
