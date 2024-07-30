import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reset } from '../../Interface/reset password/reset';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private HttpClient: HttpClient) { }

  private ResetURL = environment.RESET_URL;

  ResetPassword(data: any): Observable<any> {

  const headers = new HttpHeaders()

  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('Access-Control-Allow-Origin', 'Content-Type')

    return this.HttpClient.post<Reset>(this.ResetURL, data, {headers})

  }


}
