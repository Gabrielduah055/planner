import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-organizer-dash-metric',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './organizer-dash-metric.component.html',
  styleUrl: './organizer-dash-metric.component.css'
})
export class OrganizerDashMetricComponent {
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

    NavBarName: string = 'Olivia Rhye'
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
}
