import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SignupForm } from '../../../Interface/registration/login-register';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private signupUrl = environment.CREATE_ADMIN;

  constructor(private httpClient: HttpClient) {}

  signup(data: SignupForm): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', 'Content-Type');

    return this.httpClient.post<any>(this.signupUrl, data, { headers });
  }



}
