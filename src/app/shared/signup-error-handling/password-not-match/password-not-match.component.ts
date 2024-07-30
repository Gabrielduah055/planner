import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-not-match',
  standalone: true,
  imports: [],
  templateUrl: './password-not-match.component.html',
  styleUrl: './password-not-match.component.css'
})
export class PasswordNotMatchComponent {
  constructor(private router: Router)
{

}
  closeBtn: boolean = true;

  close(){
    this.closeBtn =false;

  }

}
