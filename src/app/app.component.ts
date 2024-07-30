import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResetPasswordComponent } from "./core/components/reset-password/reset-password.component";

import { HomeComponent } from "./core/components/home/home.component";
import { LoginComponent } from "./core/components/login/login.component";
import { RegistrationComponent } from "./core/components/registration/registration.component";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, ResetPasswordComponent,
      HomeComponent, HomeComponent, LoginComponent,
      RegistrationComponent,
      CommonModule,
    ]
})
export class AppComponent {

  title = 'ESP';

}

