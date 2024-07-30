import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invalid-password',
  standalone: true,
  imports: [],
  templateUrl: './invalid-password.component.html',
  styleUrl: './invalid-password.component.css'
})
export class InvalidPasswordComponent {


  closeBtn: boolean = true;


  close(){
    this.closeBtn = !this.closeBtn;
  }

  @Input() errorMessage?: string;
}
