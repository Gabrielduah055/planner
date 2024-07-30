import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrganizerTopBarComponent } from '../organizer-top-bar/organizer-top-bar.component';

@Component({
  selector: 'app-organizer-dash',
  standalone: true,
  templateUrl: './organizer-dash.component.html',
  styleUrl: './organizer-dash.component.css',
  imports: [CommonModule, RouterLink, OrganizerTopBarComponent],
})
export class OrganizerDashComponent {
  constructor(private router: Router) {}

  orgDasImg: string = 'assets/esp/logo.png';
  dashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png';
  eventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png';
  settingsImg: string = 'assets/esp/dashboard/user.png';
  logoutImg: string = 'assets/esp/dashboard/logout.png';

  event: string = 'Event';
  vista: string = 'Vista';

  subTitle: string = 'Plan and manage your gatherings effortlessly.';
  dashboard: string = 'Dashboard';
  users: string = 'Users';
  logOut: string = 'Log out';

  eventCreated: string = 'Events created';
  revenue: string = 'Revenue';
  fourThousand: number = 4000;
  attendees: string = 'Number of Attendees';
  eightThousand: number = 8000;
  revChart: string = 'Revenue chart';

  isLogoutModalVisible = false;

  showLogoutConfirmation() {
    this.isLogoutModalVisible = true;
  }

  cancelLogout() {
    this.isLogoutModalVisible = false;
  }

  confirmLogout() {
    console.log('Logged out');
    this.isLogoutModalVisible = false;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}
