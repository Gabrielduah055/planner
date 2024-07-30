import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../../notification-service/notification.service';
import { VenueAndLocationDataObject } from '../../../Interface/create-event/organizer';
import { ImageProcessingService } from '../../../services/image-processing/image-processing.service';

@Component({
  selector: 'app-location-and-venue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location-and-venue.component.html',
  styleUrl: './location-and-venue.component.css'
})
export class LocationAndVenueComponent implements OnInit {
  @Output() nextStepEmit = new EventEmitter<number>();
  @Output() prevStepEmit = new EventEmitter<number>();
  locationAndVenueForm: FormGroup;
  
  venueAndLocationObject!: VenueAndLocationDataObject;
  
  locationImg: string = 'assets/esp/dashboard/location-img.png';
  venueImageUrl: string | null = ''
  seatingTypeUrl: string | null = ''

  constructor(private notificationService: NotificationService, private imageProcessingService:ImageProcessingService){
    this.locationAndVenueForm = new FormGroup({
      venueLocation: new FormControl('', [Validators.required]),
      venueAddress1: new FormControl('', [Validators.required]),
      venueAddress2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      stateProvinceRegion: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      venueLayoutUrl: new FormControl('', [Validators.required]),
      seatingTypeUrl: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getVenueAndLocation();
  }

  getVenueAndLocation() {
    const venueAndLocationData = sessionStorage.getItem('LocationAndVenue');
    if (venueAndLocationData) {
      this.venueAndLocationObject = JSON.parse(venueAndLocationData);
      this.locationAndVenueForm.patchValue({
        venueLocation: this.venueAndLocationObject.venueLocation,
        venueAddress1: this.venueAndLocationObject.venueAddress1,
        venueAddress2: this.venueAndLocationObject.venueAddress2,
        city: this.venueAndLocationObject.city,
        stateProvinceRegion: this.venueAndLocationObject.stateProvinceRegion,
        country: this.venueAndLocationObject.country,
        venueLayoutUrl: this.venueAndLocationObject.venueLayoutUrl,
        seatingTypeUrl: this.venueAndLocationObject.seatingTypeUrl,
      });
    }

  }

  onVenueImageChange(event: Event,) {
    this.imageProcessingService.handleImageUpload(event, 'venueLayoutUrl', this.locationAndVenueForm)
    .then(fileDataUrl => {
      this.venueImageUrl = fileDataUrl;
    })
    .catch(error => {
      this.notificationService.showError("Error uploading venue layout image")
    });
  }

  onSeatingImageChange(event: Event,) {
    this.imageProcessingService.handleImageUpload(event, 'seatingTypeUrl', this.locationAndVenueForm)
    .then(fileDataUrl => {
      this.seatingTypeUrl = fileDataUrl;
    })
    .catch(error => {
      this.notificationService.showError("Error uploading seating image")
    });
  }

  saveAndContinue = (): void => {
    if (this.locationAndVenueForm.valid) {
      sessionStorage.setItem(
        'LocationAndVenue',
        JSON.stringify(this.locationAndVenueForm.value)
      );
    }

    this.nextStepEmit.emit(3);
  };

  prevStep() {
    this.prevStepEmit.emit(1);
  }

}
