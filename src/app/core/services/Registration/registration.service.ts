import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PageResponse, SignupForm } from '../../Interface/registration/login-register';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService  {

  private signupUrl = environment.SIGN_UP_URL;

  constructor(private httpClient: HttpClient) {}

  signup(data: SignupForm): Observable<PageResponse> {
    return this.httpClient.post<PageResponse>(this.signupUrl, data);
  }


}
