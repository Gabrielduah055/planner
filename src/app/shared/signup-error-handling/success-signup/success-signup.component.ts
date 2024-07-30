import { Component } from '@angular/core';

@Component({
  selector: 'app-success-signup',
  standalone: true,
  imports: [],
  templateUrl: './success-signup.component.html',
  styleUrl: './success-signup.component.css'
})
export class SuccessSignupComponent {

  closeBtn: boolean = true;

  close(){
    this.closeBtn =false;
  }
}


