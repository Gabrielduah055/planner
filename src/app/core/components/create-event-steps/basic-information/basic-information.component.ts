import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../notification-service/notification.service';
import {
  BasicInformationObject,
  EventObject,
} from '../../../Interface/create-event/organizer';
import { ImageProcessingService } from '../../../services/image-processing/image-processing.service';
import { EventService } from '../../../services/Organizer/event/event.service';

@Component({
  selector: 'app-basic-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './basic-information.component.html',
  styleUrl: './basic-information.component.css',
})
export class BasicInformationComponent implements OnInit {
  @Output() nextStepEmit = new EventEmitter<number>();
  @Output() discardEmit = new EventEmitter<boolean>();
  basicInformationForm: FormGroup;
  tags: string[] = [];
  isLogoutModalVisible = false;
  basicInformationObject!: BasicInformationObject;
  tagInput: string = '';
  eventLink: string = 'assets/esp/dashboard/basic-img.png';
  locVenueLayout: string = 'Location & Venue layout';
  dateTime: string = 'Date & time';
  eventTicket: string = 'Event image & ticket';
  basic: string = 'Basic information';
  closeTag: string = 'assets/esp/dashboard/Icon.png';
  logoImageUrl: string | null = '';
  eventDetails!: EventObject;

  constructor(
    private notificationService: NotificationService,
    private imageProcessingService: ImageProcessingService,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.basicInformationForm = new FormGroup({
      eventTitle: new FormControl('', [Validators.required]),
      eventCategory: new FormControl(['']),
      organizerEmail: new FormControl(sessionStorage.getItem('email'), [
        Validators.required,
      ]),
      organizerName: new FormControl(sessionStorage.getItem('organizerName'), [
        Validators.required,
      ]),
      organizerLogo: new FormControl('', [Validators.required]),
      tags: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      const path = urlSegments.map((segment) => segment.path).join('/');
      if (path.startsWith('org-update-event')) {
        const eventId = +urlSegments[1].path;
        this.getEventById(eventId)
      } else {
        this.getBasicInformation();
      }
    });
  }

  getEventById(eventId: number) {
    this.eventService.getEventById(eventId).subscribe({
      next: (response: EventObject) => {
        this.eventDetails = response;
        this.setUpdateData();
        this.getBasicInformation();
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 404)
        this.notificationService.showError(error.message);
      },
    });
  }

  getBasicInformation() {
    const basicData = sessionStorage.getItem('BasicInformation');
    if (basicData) {
      this.basicInformationObject = JSON.parse(basicData);
      this.basicInformationForm.patchValue({
        eventTitle: this.basicInformationObject.eventTitle,
        eventCategory: this.basicInformationObject.eventCategory,
        organizerLogo: this.basicInformationObject.organizerLogo,
        tags: this.basicInformationObject.tags,
      });
      this.tags = this.basicInformationObject.tags || [];
    }
  }

  onLogoImageChange(event: Event) {
    this.imageProcessingService
      .handleImageUpload(event, 'organizerLogo', this.basicInformationForm)
      .then((fileDataUrl) => {
        this.logoImageUrl = fileDataUrl;
      })
      .catch((error) => {
        this.notificationService.showError('Image upload not successful')
      });
  }

  onTagInputChange(event: Event) {
    this.tagInput = (event.target as HTMLInputElement).value;
  }

  get tagsArray() {
    return this.basicInformationForm.get('tags')!;
  }

  addTag(tag: string) {
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.tagsArray.patchValue(this.tags);
      this.tagInput = '';
    }
  }

  removeTag(tagToRemove: string) {
    this.tags = this.tags.filter((tag) => tag !== tagToRemove);
  }

  showLogoutConfirmation() {
    this.discardEmit.emit(true);
  }

  saveAndContinue = (): void => {
    if (this.basicInformationForm.valid) {
      sessionStorage.setItem(
        'BasicInformation',
        JSON.stringify(this.basicInformationForm.value)
      );
    }

    this.nextStepEmit.emit(2);
  };

  setUpdateData(): void {
    sessionStorage.setItem(
      'BasicInformation',
      JSON.stringify({
        eventTitle: this.eventDetails.eventTitle,
        eventCategory: this.eventDetails.eventCategory,
        organizerEmail: this.eventDetails.organizerEmail,
        organizerName: this.eventDetails.organizerName,
        organizerLogo: this.eventDetails.organizerLogo,
        tags: this.eventDetails.tags,
      })
    );

    sessionStorage.setItem(
      'LocationAndVenue',
      JSON.stringify({
        venueLocation: this.eventDetails.venueLocation,
        venueAddress1: this.eventDetails.venueAddress1,
        venueAddress2: this.eventDetails.venueAddress2,
        city: this.eventDetails.city,
        stateProvinceRegion: this.eventDetails.stateProvinceRegion,
        country: this.eventDetails.country,
        venueLayoutUrl: this.eventDetails.venueLayoutUrl,
        seatingTypeUrl: this.eventDetails.seatingTypeUrl,
      })
    );

    sessionStorage.setItem(
      'DateAndTime',
      JSON.stringify({
        eventStartDate: this.eventDetails.eventStartDate,
        eventEndDate: this.eventDetails.eventEndDate,
        eventStartTime: this.eventDetails.eventStartTime,
        eventEndTime: this.eventDetails.eventEndTime,
      })
    );

    sessionStorage.setItem(
      'EventAndTicket',
      JSON.stringify({
        eventImageUrl: this.eventDetails.eventImageUrl,
        eventSummary: this.eventDetails.eventSummary,
        ticketStatus: this.eventDetails.ticketStatus,
        ticketTiers: this.eventDetails.ticketTiers,
      })
    );
  }
}
