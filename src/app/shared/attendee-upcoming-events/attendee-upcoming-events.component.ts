import { Component, OnInit, Input } from '@angular/core';
import { AllEventdetails, UpcomingEvents, ViewEventdetails } from '../../core/Interface/all-eventdetails/all-eventdetails';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomDatePipe } from '../custom-date.pipe';
import { GetEventService } from '../../core/services/Attendee Service/get-event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../notification-service/notification.service';

@Component({
  selector: 'app-attendee-upcoming-events',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    CustomDatePipe
  ],
  templateUrl: './attendee-upcoming-events.component.html',
  styleUrl: './attendee-upcoming-events.component.css'
})
export class AttendeeUpcomingEventsComponent implements OnInit{
  upcomingEvents: UpcomingEvents[] = [];
  isLoading: boolean = true;
  id: string | null = sessionStorage.getItem('userId');

  constructor(
    private eventService: GetEventService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.upcomingEvent();
  }

  upcomingEvent() {
    this.eventService.loadingUpcomingEvents(this.id as string).subscribe({
      next: (res) => {
        this.upcomingEvents = res;
        this.filterUpcomingEvents();
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    });
  }


    filterUpcomingEvents() {
    const currentDate = new Date();
  
    if (this.upcomingEvents) {
      this.upcomingEvents.sort((a, b) => new Date(a.eventStartDate).getTime() - new Date(b.eventStartDate).getTime());
  
      this.upcomingEvents = this.upcomingEvents
        .filter(event => new Date(event.eventStartDate) > currentDate)
        .slice(0, 4);
    }
  }

}
