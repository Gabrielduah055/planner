import { Component } from '@angular/core';

@Component({
  selector: 'app-diabled-account',
  standalone: true,
  imports: [],
  templateUrl: './diabled-account.component.html',
  styleUrl: './diabled-account.component.css'
})
export class DiabledAccountComponent {

  closeBtn: boolean = true;

  close(){
    this.closeBtn = false;
  }

}
