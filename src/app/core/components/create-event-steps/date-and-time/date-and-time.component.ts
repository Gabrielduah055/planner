import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DateAndTimeObject } from '../../../Interface/create-event/organizer';
import { dateRangeValidator } from '../../../utils/validators';

@Component({
  selector: 'app-date-and-time',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './date-and-time.component.html',
  styleUrl: './date-and-time.component.css',
})
export class DateAndTimeComponent implements OnInit {
  @Output() nextStepEmit = new EventEmitter<number>();
  @Output() prevStepEmit = new EventEmitter<number>();
  dateAndTimeForm: FormGroup;
  minDateStart?: string;
  minDateEnd?: string;
  showStart: boolean = false;
  showEnd: boolean = false;
  displayEndTime: string = '';
  dateAndTimeObject!: DateAndTimeObject;

  dateAndTime: string = 'assets/esp/dashboard/date-img.png';

  constructor() {
    this.dateAndTimeForm = new FormGroup(
      {
        eventStartDate: new FormControl('', [Validators.required]),
        eventEndDate: new FormControl('', [Validators.required]),
        eventStartTime: new FormControl('', [Validators.required]),
        eventEndTime: new FormControl('', [Validators.required]),
      },
      {
        validators: dateRangeValidator(
          'eventStartDate',
          'eventEndDate',
          'eventStartTime',
          'eventEndTime'
        ),
      }
    );

    const today = new Date();
    this.minDateStart = today.toISOString().split('T')[0];
    this.minDateEnd = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.getDateAndTime();
  }

  getDateAndTime() {
    const dataAndTimeData = sessionStorage.getItem('DateAndTime');
    if (dataAndTimeData) {
      this.dateAndTimeObject = JSON.parse(dataAndTimeData);
      this.dateAndTimeForm.patchValue({
        eventStartDate: this.dateAndTimeObject.eventStartDate,
        eventEndDate: this.dateAndTimeObject.eventEndDate,
        eventStartTime: this.dateAndTimeObject.eventStartTime,
        eventEndTime: this.dateAndTimeObject.eventEndTime,
      });
    }
  }

  toggleStartTime(event: Event) {
    if (event.target instanceof HTMLInputElement && event.target.checked) {
      this.showStart = true;
    } else {
      this.showStart = false;
    }
  }

  toggleEndTime(event: Event) {
    if (event.target instanceof HTMLInputElement && event.target.checked) {
      this.showEnd = true;
    } else {
      this.showEnd = false;
    }
  }

  saveAndContinue = (): void => {
    if (this.dateAndTimeForm.valid) {
      sessionStorage.setItem(
        'DateAndTime',
        JSON.stringify(this.dateAndTimeForm.value)
      );
    }

    this.nextStepEmit.emit(4);
  };

  prevStep() {
    this.prevStepEmit.emit(2);
  }
}
