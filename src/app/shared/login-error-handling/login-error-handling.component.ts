import { Component } from '@angular/core';

@Component({
  selector: 'app-login-error-handling',
  standalone: true,
  imports: [],
  templateUrl: './login-error-handling.component.html',
  styleUrl: './login-error-handling.component.css'
})
export class LoginErrorHandlingComponent {
  
  closeBtn: boolean = true;

  close(){
    this.closeBtn =false;

  }

}
