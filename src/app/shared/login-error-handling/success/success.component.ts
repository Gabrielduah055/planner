import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  closeBtn: boolean = true;

  @Input() success?: string;

  close(){
    this.closeBtn =false;
  }
}
