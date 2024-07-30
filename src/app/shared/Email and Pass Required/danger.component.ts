import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-danger',
  standalone: true,
  imports: [

    CommonModule,
    RouterModule

  ],
  templateUrl: './danger.component.html',
  styleUrl: './danger.component.css'
})
export class DangerComponent {


hide: boolean = true || false;
  Hide(){
    this.hide = !this.hide;
  }


}
