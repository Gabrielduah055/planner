import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-preload',
  standalone: true,
  imports: [],
  templateUrl: './login-preload.component.html',
  styleUrl: './login-preload.component.css'
})
export class LoginPreloadComponent {

  @Input() loadingMessage: string ='';

}
