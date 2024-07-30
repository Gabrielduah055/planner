import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { CreateEventAdminService } from '../../../../services/Admin/create-event-admin/create-event-admin.service';
import { eventFields } from '../../../../Interface/create-event/organizer';
import { timer, take } from 'rxjs';
import { OrganizerCreateEventBarComponent } from "../../../../../shared/Organizer/organizer-create-event-bar/organizer-create-event-bar.component";
import { PreloadComponent } from "../../../../../shared/create-event-preload/preload.component";

@Component({
    selector: 'app-create-event-admin',
    standalone: true,
    templateUrl: './create-event-admin.component.html',
    styleUrl: './create-event-admin.component.css',
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
        ReactiveFormsModule,
        CommonModule,
        ScrollingModule,
        OrganizerCreateEventBarComponent,
        PreloadComponent
    ]
})
export class CreateEventAdminComponent {



  OrgDasImg: string = 'assets/esp/logo.png'
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
  SettingsImg: string = 'assets/esp/dashboard/user.png'
  LogoutImg: string = 'assets/esp/dashboard/logout.png'
  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  NavBarImg: string = 'assets/esp/dashboard/avatar.png'
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'

  Event: string = 'Event'
  Vista: string = 'Vista'

  BackToEvent: string = 'Back to Event'
  Basic: string = 'Basic information'
  LocVenueLayout: string = 'Location & Venue layout'
  DateTime: string = 'Date & time'
  EventTicket: string = 'Event image & ticket'


  EventProgressImg: string = 'assets/esp/dashboard/event-create-back.png'
  closeTag: string = 'assets/esp/dashboard/Icon.png'
  EventLink: string = 'assets/esp/dashboard/basic-img.png'
  LocationImg: string = 'assets/esp/dashboard/location-img.png';
  DateAndTime: string = 'assets/esp/dashboard/date-img.png'
  Ticket: string = 'assets/esp/dashboard/ticket-img.png'



  venueLayoutUrl: string | null = null;
  seatingTypeUrl: string | null = null;
  eventImageUrl: string | null = null;
  organizerLogo: string | null = null;


  tagInput: string[] = [];
  tags: string[] = [];

  fields: boolean = false;

  showStart: boolean = false;
  showEnd: boolean = false;


  dsiplayStartTime: string = '';
  dsiplayEndTime: string = '';

  eventCreated = false;

  scheduleForm: boolean = false;
  publishNow: boolean = false;

  paidFormVisible: boolean = false;

  CreateEvent: FormGroup

  isSubmitted: boolean = false;
  isError: boolean = false

  discountObj: any[] = [];
  tiersObj: any[] = [];


  constructor(private createEvent: CreateEventAdminService, private router: Router, private fb: FormBuilder) {

    this.CreateEvent = new FormGroup({
      eventTitle: new FormControl('', [Validators.required]),
      eventCategory: new FormControl(['']),
      eventStartDate: new FormControl('', [Validators.required]),
      eventEndDate: new FormControl('', [Validators.required]),
      eventStartTime: new FormControl('', [Validators.required]),
      eventEndTime: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      tag: new FormControl('', []),
      eventImageUrl: new FormControl('', [Validators.required]),
      organizerLogo: new FormControl('', [Validators.required]),
      eventSummary: new FormControl('', [Validators.required]),
      eventPrice: new FormControl(''),
      scheduleDate: new FormControl(''),
      scheduleTime: new FormControl(''),
      organizerEmail: new FormControl(''),
      organizerName: new FormControl(''),
      ticketStatus: new FormControl(''),
      venueLocation: new FormControl('', [Validators.required]),
      venueAddress1: new FormControl('', [Validators.required]),
      venueAddress2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      stateProvinceRegion: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      venueLayoutUrl: new FormControl('', [Validators.required]),
      seatingTypeUrl: new FormControl('', [Validators.required]),
      ticketName: new FormControl(''),
      reservedTicket: new FormControl(''),

      discounts: new FormControl(''),

      ticketTiers: new FormControl(''),

      name: new FormControl(''),
      price: new FormControl(''),
      allocation: new FormControl(''),
      reserveAllocation: new FormControl(''),

      discountVariable: new FormControl(''),
      discountRule: new FormControl(''),
      conditionValue: new FormControl(''),
      discountType: new FormControl(''),

      discountValue: new FormControl(''),


    });

    this.CreateEvent.get('organizerName')?.patchValue(this.fullName)
    this.loadFromLocalStorage();



  }


  get discountVariable() {
    return this.CreateEvent.get('discountVariable')!;
  }
  get discountRule() {

    return this.CreateEvent.get('discountRule')!;

  }
  get conditionValue() {

    return this.CreateEvent.get('conditionValue')!;
  }
  get discountValue() {

    return this.CreateEvent.get('discountValue')!;
  }

  get discounts() {
    return this.CreateEvent.get('discounts')!;
  }



  get name() {
    return this.CreateEvent.get('name')!;
  }
  get price() {
    return this.CreateEvent.get('price')!;
  }
  get allocation() {
    return this.CreateEvent.get('allocation')!;
  }
  get reserveAllocation() {
    return this.CreateEvent.get('reserveAllocation')!;
  }

  get ticketTiers() {
    return this.CreateEvent.get('ticketTiers')!;
  }
  get discountType() {
    return this.CreateEvent.get('discountType')!;
  }

  saveAndContinue = (): void => {
    const fields = [
      'eventTitle',
      'eventCategory',
      'eventStartDate',
      'eventEndDate',
      'eventStartTime',
      'eventEndTime',
      'tags',
      'tag',
      'eventImageUrl',
      'organizerLogo',
      'eventSummary',
      'eventPrice',
      'scheduleDate',
      'scheduleTime',
      'organizerEmail',
      'fullName',
      'ticketType',
      'ticketStatus',
      'venueLocation',
      'venueAddress1',
      'venueAddress2',
      'city',
      'stateProvinceRegion',
      'country',
      'venueLayoutUrl',
      'seatingTypeUrl',
      'ticketQuantity',





    ];

    fields.forEach(field => {
      const value = this.CreateEvent.get(field)?.value;
      if (value) {
        localStorage.setItem(field, value);
      }
    });

    console.log(this.CreateEvent.value);


  }




  loadFromLocalStorage = (): void => {
    eventFields.forEach(field => {
      const value = localStorage.getItem(field);
      if (value) {
        this.CreateEvent.get(field)?.patchValue(value);
      }
    });
  }

  event = localStorage.getItem('eventTitle');


  onSubmit() {


    console.log(this.CreateEvent.value)

    if (this.CreateEvent.get('ticketStatus')?.value == 'Free') {

      this.CreateEvent.get('ticketTiers')?.reset()

    } else if(this.CreateEvent.get('ticketStatus')?.value == 'Paid'){
      {


        localStorage.setItem('name', this.name.value);
        localStorage.setItem('price', this.price.value);
        localStorage.setItem('allocation', this.allocation.value);
        localStorage.setItem('reserveAllocation', this.reserveAllocation.value);

        const name = localStorage.getItem('name');
        const price = localStorage.getItem('price');
        const allocation = localStorage.getItem('allocation');
        const reserveAllocation = localStorage.getItem('reserveAllocation');
        const discounts = this.discountObj

        console.log('discount', this.discounts.value);

        this.tiersObj.push({
          name,
          price,
          allocation,
          reserveAllocation,
          discounts


        });

        this.ticketTiers.patchValue(this.tiersObj, this.discounts)


      }


    }

    // this.tiersObj = [];

    if (this.CreateEvent.valid) {
      this.isSubmitted = true;

      const postData = this.CreateEvent.value;



      timer(500)
        .pipe(take(1))
        .subscribe(() => {
          this.eventCreated = true;
          this.createEvent.createEvent(postData).subscribe({
            next: (response: any) => {
              console.log('Form submitted successful', response);

              this.publishNow = true;
              this.saveFormDataToLocalstorage(postData);
              localStorage.removeItem('createEvent')
              this.router.navigateByUrl('/create-event-success').then(() => {
                setTimeout(() => {
                  this.router.navigateByUrl('/admin-event');
                }, 3000);



              });
            },
            error: (error) => {
              console.error('Error creating post:', error);
              console.log(postData);
              this.eventCreated = false;
              this.isError = true
            }
          });
        });
    } else {
      this.fields = true;
      this.eventCreated = false;
    }
  }



  private saveFormDataToLocalstorage(formData: any): void {
    localStorage.setItem('createEvent', JSON.stringify(formData).toString());

  }



  adminDash() {
    this.router.navigate(['/admin-dash']);
  }
  orgEvent() {
    this.router.navigate(['/admin-event'])
  }


  step: number = 1;

  displayStep1: boolean = false;

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  freeAndPaid: boolean = true;

  isPaidSelected: boolean = false;
  isFreeSelected: boolean = false;


  toggleFreeForm(isFreeSelected: boolean) {
    this.isPaidSelected = false;
    this.isFreeSelected = !this.isFreeSelected
    this.CreateEvent.get('ticketStatus')?.setValue("Free")
    console.log(this.CreateEvent.value)

  }

  togglePaidForm(isPaidSelected: boolean) {

    this.isFreeSelected = false;
    this.isPaidSelected = !this.isPaidSelected
    this.CreateEvent.get('ticketStatus')?.setValue("Paid")
    console.log(this.CreateEvent.value)


  }



  disable: boolean = true;

  logoImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (fileSize > maxSize) {
        console.log("File size exceeds the maximum allowed size of 10 MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const fileDataUrl = reader.result as string;

        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;

          this.CreateEvent.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };
      reader.readAsDataURL(file);
    }
  }



  locationImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (fileSize > maxSize) {
        console.log("File size exceeds the maximum allowed size of 10 MB");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const fileDataUrl = reader.result as string;
        this.venueLayoutUrl = fileDataUrl;

        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;
          this.CreateEvent.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };

      reader.readAsDataURL(file);
    }
  }



  seatingImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (fileSize > maxSize) {
        console.log("File size exceeds the maximum allowed size of 10 MB");
        return;
      }
      const reader = new FileReader();

      reader.onload = () => {
        const fileDataUrl = reader.result as string;
        this.seatingTypeUrl = fileDataUrl;
        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;
          this.CreateEvent.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };

      reader.readAsDataURL(file);
    }
  }

  eventImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (fileSize > maxSize) {
        console.log("File size exceeds the maximum allowed size of 10 MB");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const fileDataUrl = reader.result as string;
        this.eventImageUrl = fileDataUrl;
        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;
          this.CreateEvent.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };

      reader.readAsDataURL(file);
    }
  }


  toggleStartTime(event: any) {
    if (event.target.checked) {
      this.showStart = true;
      this.dsiplayStartTime = '';
    } else {
      this.showStart = false;
      this.dsiplayStartTime = '';
    }
  }

  toggleEndTime(event: any) {
    if (event.target.checked) {
      this.showEnd = true;
      this.dsiplayEndTime = '';
    } else {
      this.showEnd = false;
      this.dsiplayEndTime = '';
    }
  }


  toggleSchedule(event: any) {
    this.scheduleForm = true;
    this.scheduleForm = event.target.value === 'later';
    this.publishNow = !this.scheduleForm;
  }


  togglePublishNow(event: any) {
    this.publishNow = event.target.value === 'now';
    this.scheduleForm = !this.publishNow;
  }


  get tagsArray() {
    return this.CreateEvent.get('tags')!;
  }

  get tag() {
    return this.CreateEvent.get('tag')!;
  }


  addTag(tag: string) {
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.tagsArray.patchValue(this.tags);
    }
    this.tag.patchValue('');
    console.log('this.tags', this.tags)
    console.log('Tags Array', this.tagsArray.value);

  }

  removeTag(tagToRemove: string) {
    this.tags = this.tags.filter(tag => tag !== tagToRemove);
  }


  paid: boolean = false;

  paidForm() {
    this.paid = !this.paid
  }

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
    this.router.navigate(['/org-event']);
  }


  isFormVisible: boolean = false;

  rules: any[] = [{}];

  toggleAccordion() {
    this.isFormVisible = !this.isFormVisible;
  }

  tier: number = 1

  removeRule(index: number) {

    if (this.tier > 0) {
      console.log(this.discounts.value, index, this.tier);
      this.rules.splice(index, 1);
    }

  }


  addRule() {
this.saveAndContinue();

    while (true) {

      if (this.rules.length <= 1) {
        this.rules.push({});

        localStorage.setItem('name', this.name.value);
        localStorage.setItem('price', this.price.value);
        localStorage.setItem('allocation', this.allocation.value);
        localStorage.setItem('reserveAllocation', this.reserveAllocation.value);

        localStorage.setItem('discountVariable', this.discountVariable.value);
        localStorage.setItem('discountRule', this.discountRule.value);
        localStorage.setItem('conditionValue', this.conditionValue.value);
        localStorage.setItem('discountValue', this.discountValue.value);
        localStorage.setItem('discountType', this.discountType.value);

        const discountVariable = localStorage.getItem('discountVariable');
        const discountRule = localStorage.getItem('discountRule');
        const conditionValue = localStorage.getItem('conditionValue');
        const discountValue = localStorage.getItem('discountValue');
        const discountType = localStorage.getItem('discountType');

        localStorage.removeItem('discountVariable');
        localStorage.removeItem('discountRule');
        localStorage.removeItem('conditionValue');
        localStorage.removeItem('discountValue');
        localStorage.removeItem('discountType');

        this.discountObj.push({
          discountVariable, discountRule, conditionValue, discountValue, discountType,
        });

        // this.discounts.patchValue(this.discountObj);
        // this.ticketTiers.patchValue(this.tiersObj)

        console.log(this.discounts.value);

        break;
      }
      else if (this.rules.length == 2) {
        this.rules.push({});

        localStorage.setItem('discountVariable', this.discountVariable.value);
        localStorage.setItem('discountRule', this.discountRule.value);
        localStorage.setItem('conditionValue', this.conditionValue.value);
        localStorage.setItem('discountValue', this.discountValue.value);
        localStorage.setItem('discountType', this.discountType.value);


        const discountVariable = localStorage.getItem('discountVariable');
        const discountRule = localStorage.getItem('discountRule');
        const conditionValue = localStorage.getItem('conditionValue');
        const discountValue = localStorage.getItem('discountValue');
        const discountType = localStorage.getItem('discountType');

        localStorage.removeItem('discountVariable');
        localStorage.removeItem('discountRule');
        localStorage.removeItem('conditionValue');
        localStorage.removeItem('discountValue');
        localStorage.removeItem('discountType');

        this.discountObj.push({
          discountVariable, discountRule, conditionValue, discountValue, discountType,
        });

        // this.discounts.patchValue(this.discountObj);
        console.log(this.discounts.value);

        break;
      }
      else if (this.rules.length == 3) {

        localStorage.setItem('discountVariable', this.discountVariable.value);
        localStorage.setItem('discountRule', this.discountRule.value);
        localStorage.setItem('conditionValue', this.conditionValue.value);
        localStorage.setItem('discountValue', this.discountValue.value);
        localStorage.setItem('discountType', this.discountType.value);


        const discountVariable = localStorage.getItem('discountVariable');
        const discountRule = localStorage.getItem('discountRule');
        const conditionValue = localStorage.getItem('conditionValue');
        const discountValue = localStorage.getItem('discountValue');
        const discountType = localStorage.getItem('discountType');

        localStorage.removeItem('discountVariable');
        localStorage.removeItem('discountRule');
        localStorage.removeItem('conditionValue');
        localStorage.removeItem('discountValue');
        localStorage.removeItem('discountType');

        this.discountObj.push({
          discountVariable, discountRule, conditionValue, discountValue, discountType,
        });

        this.discounts.patchValue(this.discountObj);

        console.log(this.discounts.value);

        break;
      } else {
        // Reset the rules length to simulate retrying.
        this.rules.length = 0; // or any logic to reset and retry
        this.discounts.reset();
      }
    }

            this.discounts.patchValue(this.discountObj);
            console.log('discount', this.discounts.value);

  }


  tickets: any[] = [{ id: 0, tier: 1 }];
  currentTier = 1;

  addTicket() {

    this.rules.length + 1
    this.tier++


this.addRule();

    const name = localStorage.getItem('name');
    const price = localStorage.getItem('price');
    const allocation = localStorage.getItem('allocation');
    const reserveAllocation = localStorage.getItem('reserveAllocation');
    const discounts = this.discountObj


    this.discounts.patchValue(this.discountObj);

    this.tiersObj.push({
      name,
      price,
      allocation,
      reserveAllocation,
      discounts


    });

    // this.discountObj.values.length = 2
    this.ticketTiers.patchValue(this.tiersObj, this.discounts)

    console.log('Tier array', this.ticketTiers.value)

    console.log(this.discountObj)
    console.log(this.discounts.value)
    this.currentTier += 1; // Correctly increment the tier
    this.tickets.push({ id: this.tickets.length, tier: this.currentTier });
    console.log(this.tickets, this.currentTier);
  }
fullName: string = 'Christian Jones';

confirmDiscard() {

}

}
