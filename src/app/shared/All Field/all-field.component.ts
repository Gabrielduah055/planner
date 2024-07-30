import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-field',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule

  ],
  templateUrl: './all-field.component.html',
  styleUrl: './all-field.component.css'
})
export class AllFieldComponent {

  hide: boolean = true || false;
  
  Hide(){
    this.hide = !this.hide;
  }

}
