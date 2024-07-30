import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink,  } from '@angular/router';
import { TokenService } from '../../core/services/token/token.service';

@Component({
  selector: 'app-attendee-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './attendee-sidebar.component.html',
  styleUrl: './attendee-sidebar.component.css'
})
export class AttendeeSidebarComponent {
  constructor(
    private router: Router,
     private route: ActivatedRoute,
     private tokenService: TokenService
  ) {}

  isLogoutModalVisible = false;

  showLogoutConfirmation() {
    this.isLogoutModalVisible = true;
  }

  cancelLogout() {
    this.isLogoutModalVisible = false;
  }

  confirmLogout() {
    this.isLogoutModalVisible = false;
    this.tokenService.clear(); 
    this.router.navigate(['/login']);
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}
