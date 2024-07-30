import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InviteUserService } from '../../../../../services/Organizer/invite-organizer/invite-user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from '../../../../../../shared/login-error-handling/success/success.component';
import { ErrorComponent } from "../../../../../../shared/signup-error-handling/error/error.component";
@Component({
  selector: 'app-user-invite',
  standalone: true,
  templateUrl: './user-invite.component.html',
  styleUrl: './user-invite.component.css',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    SuccessComponent,
    ErrorComponent
  ]
})
export class UserInviteComponent {

  @ViewChild('inviteModal') inviteModal?: ElementRef | undefined;
  // @Input('errorMessage') errorMessage ?: ElementRef | undefined;


  OrganInvite: FormGroup
  isSubmitted: boolean = false;
  isError: boolean = false;

  constructor(private organizer: InviteUserService, private router: Router) {
    this.OrganInvite = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      fullName: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  // ngOnInit(): void {

  //   this.onSubmit()
  // }

  error: boolean = false;
  success: boolean = false;
  successSent: string = 'Invitation successfully sent ';
  errorMessage: string = 'Invitation already sent';
  allFields: string = 'All fields are required';

  allFieldBool: boolean = false;


  onSubmit() {

    console.log(this.OrganInvite)

    if (!this.OrganInvite.valid) {
      this.allFieldBool = true;
    }

    if (this.OrganInvite.valid) {
      const postData = this.OrganInvite.value;
      this.organizer.organizer(postData).subscribe({
        next: (response) => {
          this.isSubmitted = true;
          console.log('Invitation sent successfully', response);
          this.success = true;

          setTimeout(() => {
            this.router.navigateByUrl('/org-dash');
          }, 2000);



        },
        error: (error) => {
          console.error('Error creating post:', error);
          console.log(postData);
          this.error = true;
        }
      });
    } else {
      this.isError = true;

    }
  }



  closeModal() {

    if (this.inviteModal != null) {

      this.inviteModal.nativeElement.style.display = 'none';
      console.log('closed modal');

    }

  }

  profile: boolean = true;





}
