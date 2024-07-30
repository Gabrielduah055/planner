import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  @Input() errorMessage: string ='';

  closeBtn: boolean = true;

  close(){
    this.closeBtn =false;

  }

}
