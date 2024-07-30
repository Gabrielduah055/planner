import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TokenService } from '../../core/services/token/token.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
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
