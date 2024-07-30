import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllEventdetails, FreeCheckoutData } from '../../core/Interface/all-eventdetails/all-eventdetails';
import { GetEventService } from '../../core/services/Attendee Service/get-event.service';
import { NotificationService } from '../../notification-service/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendee-free-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './attendee-free-checkout.component.html',
  styleUrl: './attendee-free-checkout.component.css',
})
export class AttendeeFreeCheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('registrationForm') registrationForm!: NgForm;

  profileSubscription!: Subscription;
  profileImageUrl = '';
  fullName = sessionStorage.getItem('fullName');
  email = '';
  phone: string = sessionStorage.getItem('phone') || '';
  eventId: string = '';
  userId: string = '';


  constructor(
    private eventService: GetEventService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile()
    this.userId = sessionStorage.getItem('userId') || '';
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('eventId') || '';
    });
  }

  onSubmit(registrationForm: NgForm) {
    if (registrationForm.invalid) {
      this.notificationService.showError('Fill out all required fields & match requirments');
      return;
    }
    

    if (this.eventId && this.userId && registrationForm.valid) {
      const infoData: FreeCheckoutData = {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
      };
      
      
      this.eventService.sendFreeCheckoutDetails(this.eventId, this.userId, infoData).subscribe(response => {
        if (response.message === 'You have already registered for this event') {
          this.notificationService.showError('You have already registered for this event');
          this.router.navigate([`/attendee-home`]);
        } else if (response.message === 'Event Registration Successfully, Check your Email') {
          this.notificationService.showSuccess('Event Registration Successfully, Check your Email');
          this.router.navigate([`/my-events`]);
        } else {
          this.notificationService.showError('Unexpected response from server');
        }
      }, error => {
        this.notificationService.showError('Error registering. Please try again.');
      });
    }
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
      this.notificationService.showError('User ID not found');
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
}
