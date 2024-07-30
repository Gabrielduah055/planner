import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-exist',
  standalone: true,
  imports: [],
  templateUrl: './user-exist.component.html',
  styleUrl: './user-exist.component.css'
})
export class UserExistComponent {
  constructor(private router: Router)
{

}
  closeBtn: boolean = true;

  close(){
    this.closeBtn =false;

  }

}
