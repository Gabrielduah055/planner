import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetEventService } from '../../core/services/Attendee Service/get-event.service';
import { NotificationService } from '../../notification-service/notification.service';

@Component({
  selector: 'app-attendee-payment-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './attendee-payment-checkout.component.html',
  styleUrl: './attendee-payment-checkout.component.css'
})
export class AttendeePaymentCheckoutComponent implements OnInit, OnDestroy {
  fullName = sessionStorage.getItem('fullName');
  email = sessionStorage.getItem('email');
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  eventId: string = '';
  userId: string = '';
  phone: string = sessionStorage.getItem('phone') || '';

  constructor(
    private eventService: GetEventService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }


  ngOnInit(): void {    
    this.loadUserProfile()
    sessionStorage.setItem('phone', this.phone);
    this.userId = sessionStorage.getItem('userId') || '';
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('eventId') || '';
    });
  }

  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileSubscription = this.eventService.profile$.subscribe(profile => {
        if (profile) {
          this.profileImageUrl = profile.profileImageUrl;
          this.fullName = profile.fullName || this.fullName;
          this.email = profile.email;
        }
      });
      this.eventService.loadUserProfile(userId);
    } else {
      this.notificationService.showError('User not found');
    }
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  showProfileCard: boolean = false;
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/attendee-settings']);
  }

  handleSubmit() {
    sessionStorage.setItem('phone', this.phone);
    this.router.navigate(['attendee-payment-ticket-type/', this.eventId]);
  }

}
