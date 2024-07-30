import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthenticationResponse, LoginRequest } from '../../Interface/registration/login-register';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private HttpClient: HttpClient) { }
  token = sessionStorage.getItem('Token')


  private loginApi = environment.LOGIN_URL;

  login(data: LoginRequest): Observable<AuthenticationResponse> {

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', 'Content-Type')

    return this.HttpClient.post<AuthenticationResponse>(this.loginApi, data, {headers})
  }

}
