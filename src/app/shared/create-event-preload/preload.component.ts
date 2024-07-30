import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-preload',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './preload.component.html',
  styleUrl: './preload.component.css'
})
export class PreloadComponent {

}
