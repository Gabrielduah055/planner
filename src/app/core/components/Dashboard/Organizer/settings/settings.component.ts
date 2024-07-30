import { AdminProfile } from './../../../../Interface/Admin/getAllUsers';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../../../../services/Organizer/Settings/settings.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../../../environments/environment';
import { OrganizerDashComponent } from "../../../../../shared/Organizer/organizer-sidebar/organizer-dash.component";
import { OrganizerTopBarComponent } from "../../../../../shared/Organizer/organizer-top-bar/organizer-top-bar.component";

import { SettingTexts, settingImages } from './texts';
import { SuccessComponent } from "../../../../../shared/login-error-handling/success/success.component";
import { UnauthorizedComponent } from "../../../../../shared/login-error-handling/unauthorized/unauthorized.component";
import { InvalidPasswordComponent } from "../../../../../shared/login-error-handling/invalid-password/invalid-password.component";
import { ViewProfileResponse, ViewProfileResponseData } from '../../../../Interface/service/interface';

@Component({
    selector: 'app-settings',
    standalone: true,
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css',
    imports: [
        RouterModule,
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        OrganizerDashComponent,
        OrganizerTopBarComponent,
        SuccessComponent,
        UnauthorizedComponent,
        InvalidPasswordComponent
    ]
})
export class SettingsComponent {

  heading = "Settings"
  sub_heading = "Plan and manage your gatherings effortlessly."
  personalInfo = "Personal Info"
  updatePhoto ="Update your photo and personal details."
  firstNameLabel= "First Name"
  lastNameLabel = "Last Name"
  imageSpec ="SVG, PNG, JPG or GIF (max. 800x400px)"

  SettingTexts = SettingTexts;
  settingImages = settingImages;
  fullName = '';
  firstName = '';
  lastName = '';
  email = '';
  profileImageUrl = '';
  showProfileCard: boolean = false;
  selectedFile: File | null = null;

  profileImage: string | null = null;

  OrgDasImg: string = 'assets/esp/logo.png'
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
  SettingsImg: string = 'assets/esp/dashboard/user.png'
  LogoutImg: string = 'assets/esp/dashboard/logout.png'
  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  NavBarImg: string = 'assets/esp/dashboard/avatar.png'
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'
  CardImg: string = 'assets/esp/dashboard/event-created.png'

  SearchImg: string = 'assets/esp/dashboard/search.png'
  FilterImg: string = 'assets/esp/dashboard/filter.png'
  userPlus: string = 'assets/esp/dashboard/user-plus.png'

  Filters: string = 'Filters'
  Free: string = 'Free'
  Paid: string = 'Paid'
  inviteUser: string = 'Invite user'
  inviteFirst: string = 'Invite your first user'
  addUsers: string = 'Add users on this page'

  settings: string = 'Settings';
  Vista: string = 'Vista';
  AllEvent: string = 'All events'

  NavBarName: string = 'Olivia Rhye'
  subTitle: string = 'Plan and manage your gatherings effortlessly.'
  Dashboard: string = 'Dashboard'
  Settings: string = 'Settings'
  LogOut: string = 'Log out'


  eventCreated: boolean = true
  eventNotCreated: boolean = false

  isSubmitted: boolean = false;
  unAuthorized: boolean = false;
  isIncorrect: boolean = false;
  loading: boolean = false;


  modal = false

  venueLayoutUrl: string | ArrayBuffer | null = null;


  orgSetti: FormGroup;
  data: any;
  isError: boolean = false;
  success = 'profile updated successfully'
  errorMessage = 'Update atleast one field'

  constructor(private router: Router, private orgSettings_: SettingsService, @Inject(PLATFORM_ID) private platformId: Object) {

    this.orgSetti = new FormGroup({
      email: new FormControl(""),
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      profileImage: new FormControl("",)
    });



  }


  onSubmit() {
    if (this.orgSetti.valid) {
      const postData = this.orgSetti.value;
      this.orgSettings_.orgSettings_(postData).subscribe({
        next: (response) => {

          this.isSubmitted = true;
          sessionStorage.removeItem('OrgEmail');
          sessionStorage.removeItem('firstName');
          sessionStorage.removeItem('lastName');
          sessionStorage.removeItem('profileImageUrl');
          this.isSubmitted = true;
          this.loading = false;

          setTimeout(() => {
            this.router.navigateByUrl('/org-dash');
          }, 2000);



        },
        error: (error) => {
          console.error('Error updating settings:', error);
          if (error && error.error && error.error.businessErrorDescription === "Login and password is incorrect") {
            this.isError = true;
            alert('Login or password is incorrect');
          } else if (error && error.error && error.error.businessErrorDescription === "User account is locked") {
            alert('User account is locked, click on forgot password');
          } else {
            this.isIncorrect = true;

          }
        }
      });
    } else {
      this.isError = true;
    }
  }


  orgEvent() {
    this.router.navigate(['/org-event']);
  }
  orgCreateEvent() {
    this.router.navigate(['/org-create-event']);

  }
  orgDash() {
    this.router.navigate(['/org-dash']);
  }

  orgUsers() {
    this.router.navigate(['/org-users'])

  }


  users() {
    this.router.navigate(['/org-users'])

  }

  userInvite() {
    this.router.navigate(['/user-invite']);
  }

  openModal() {
    this.modal = true
  }

  closeModal() {
    this.modal = !this.modal
  }

  profile: boolean = false


  toggleCard() {

    this.profile = !this.profile


  }

  threeButtonAction: boolean = false

  actionMenu() {

    this.threeButtonAction = !this.threeButtonAction

  }

  accountSettings() {
    this.router.navigate(['/org-settings']);
  }

  locationImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const fileSize = input.files[0].size;
      const maxSize = 10 * 1024 * 1024;

      if (fileSize > maxSize) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.venueLayoutUrl = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


  onFileSelected(event: Event, controlName: string) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024;

      if (fileSize > maxSize) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const fileDataUrl = reader.result as string;
        this.profileImage = fileDataUrl;
      };

      reader.onloadend = () => {
        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;
          this.orgSetti.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };

      reader.readAsDataURL(file);
      this.uploadFile(file);
    }
  }

  saveChanges(): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      return;
    }

 }

 uploadFile(file: File): void {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    this.profileImageUrl = e.target.result;
  };
  reader.readAsDataURL(file);
}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer!.dropEffect = 'copy';
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();


  }

  onDrop(event: DragEvent, controlName: string) {
    const input = event.target as HTMLInputElement;

    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer!.files[0];
    if (file) {
      this.uploadFile(file);
    }

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024;

      if (fileSize > maxSize) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const fileDataUrl = reader.result as string;
        this.profileImage = fileDataUrl;
      };

      reader.onloadend = () => {
        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;
          this.orgSetti.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };

      reader.readAsDataURL(file);
      this.uploadFile(file);
    }


  }

  cancel(): void {
    this.isLogoutModalVisible = true;

  }


  isLogoutModalVisible = false;

  cancelDiscard() {
    this.isLogoutModalVisible = false;
  }

  confirmDiscard() {
    this.isLogoutModalVisible = false;
    this.router.navigate(['/org-dash']);
  }


  ngOnInit() {

this.viewProfile()

const orgEmail = sessionStorage.getItem('OrgEmail');
const orgFirstName = sessionStorage.getItem('firstName');
const orgLastName = sessionStorage.getItem('lastName');
const orgProfileImageUrl = sessionStorage.getItem('profileImageUrl');

this.orgSetti.get('email')?.patchValue(orgEmail)
this.orgSetti.get('firstName')?.patchValue(orgFirstName)
this.orgSetti.get('lastName')?.patchValue(orgLastName)
this.orgSetti.get('profileImageUrl')?.patchValue(orgProfileImageUrl)
  }


   profilImage = ''

   viewProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.orgSettings_.viewProfile(userId).subscribe(
        (response: ViewProfileResponse) => {
          const data = response.data;
          sessionStorage.setItem('OrgEmail', data.email);
          sessionStorage.setItem('firstName', data.firstName);
          sessionStorage.setItem('lastName', data.lastName);
          this.profileImage = data.profileImageUrl;
        },
        (error) => {
          console.error('Error viewing profile:', error);
        }
      );
    } else {
      console.error('User ID is not available.');
    }
  }






  }





