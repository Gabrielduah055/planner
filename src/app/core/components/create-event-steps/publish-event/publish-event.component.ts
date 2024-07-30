import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../notification-service/notification.service';
import {
  EventObject,
  TicketTierWithDiscountsObject
} from '../../../Interface/create-event/organizer';
import { CreateEventService } from '../../../services/create-event/create-event.service';
import { EventService } from '../../../services/Organizer/event/event.service';
import { PageResponse } from '../../../Interface/registration/login-register';

@Component({
  selector: 'app-publish-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publish-event.component.html',
  styleUrl: './publish-event.component.css',
})
export class PublishEventComponent implements OnInit {
  @Output() prevStepEmit = new EventEmitter<number>();
  fields: boolean = false;
  eventObject!: EventObject;
  publishOption: 'now' | 'later' = 'now';
  totalTicketQuantity: number = 0;
  isUpdateEvent: boolean = false;
  eventId!: number;

  constructor(
    private createEventService: CreateEventService,
    private notificationService: NotificationService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      const path = urlSegments.map((segment) => segment.path).join('/');
      if (path.startsWith('org-update-event')) {
        this.eventId = +urlSegments[1].path;
        this.isUpdateEvent = true;
      }
    });
    this.getEventObject();
  }

  getEventObject() {
    const keys = [
      'LocationAndVenue',
      'EventAndTicket',
      'BasicInformation',
      'DateAndTime',
    ];

    keys.forEach((key) => {
      const data = sessionStorage.getItem(key);
      if (data) {
        this.eventObject = { ...this.eventObject, ...JSON.parse(data) };
      }
    });

    if (this.eventObject && Array.isArray(this.eventObject.ticketTiers) != null) {
      let totalQuantity = 0;
      if (this.eventObject.ticketTiers) {
        this.eventObject.ticketTiers.forEach((tier: TicketTierWithDiscountsObject) => {
          totalQuantity += tier.allocation;
        });
      }
      this.totalTicketQuantity = totalQuantity;
    }
  }

  prevStep() {
    this.prevStepEmit.emit(4);
  }

  onPublishOptionChange(option: 'now' | 'later') {
    this.publishOption = option;
    if (option === 'now') {
      delete this.eventObject.scheduleDate;
      delete this.eventObject.scheduleTime;
    } else if (option === 'later') {
      if (!this.eventObject.hasOwnProperty('scheduleDate')) {
        this.eventObject.scheduleDate = '';
      }
      if (!this.eventObject.hasOwnProperty('scheduleTime')) {
        this.eventObject.scheduleTime = '';
      }
    }
  }

  createEvent() {
    if (!this.isScheduleValid()) {
      return;
    }
    this.createEventService.createEvent(this.eventObject).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Event Created Successfully');
        sessionStorage.removeItem('BasicInformation');
        sessionStorage.removeItem('LocationAndVenue');
        sessionStorage.removeItem('DateAndTime');
        sessionStorage.removeItem('EventAndTicket');
        this.router.navigate(['/org-event']);
      },
      error: (error: HttpErrorResponse) => {
        const pageResponse: PageResponse = error.error;
        this.notificationService.showError(pageResponse.message);
      },
    });
  }

  validateSchedule() {
    if (this.eventObject.scheduleDate && this.eventObject.scheduleTime) {
      const now = new Date();
      const selectedDate = new Date(this.eventObject.scheduleDate);
      const selectedTimeParts = this.eventObject.scheduleTime.split(':');
      const selectedHours = parseInt(selectedTimeParts[0], 10);
      const selectedMinutes = parseInt(selectedTimeParts[1], 10);

      selectedDate.setHours(selectedHours, selectedMinutes);

      if (selectedDate < now) {
        this.notificationService.showError('Scheduled date and time cannot be in the past');
        return false;
      }

      const timeDifference = selectedDate.getTime() - now.getTime();
      const minutesDifference = timeDifference / (1000 * 60);

      if (minutesDifference < 15) {
        this.notificationService.showError('Scheduled time must be at least 15 minutes from now');
        return false;
      }
    }
    return true;
  }

  isScheduleValid(): boolean {
    if (this.publishOption === 'later') {
      return this.validateSchedule();
    }
    return true;
  }

  updateEvent() {
    if (!this.isScheduleValid()) {
      return;
    }
    this.eventService.updateEventById(this.eventObject, this.eventId).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Event Updated Successfully');
        sessionStorage.removeItem('BasicInformation');
        sessionStorage.removeItem('LocationAndVenue');
        sessionStorage.removeItem('DateAndTime');
        sessionStorage.removeItem('EventAndTicket');
        this.router.navigate(['/org-event']);
      },
      error: (error: HttpErrorResponse) => {
        const pageResponse: PageResponse = error.error;
        this.notificationService.showError(pageResponse.message);
      },
    });
  }

}
