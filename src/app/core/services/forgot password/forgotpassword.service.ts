import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPassword } from '../../Interface/forgot password/forgot-password';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {


  private ResetURL = environment.FORGOT_PASS_URL;

  constructor(private httpClient: HttpClient) { }

  ForgotPassword(data: ForgotPassword): Observable<any> {


  const headers = new HttpHeaders()

  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('Access-Control-Allow-Origin', 'Content-Type')

    return this.httpClient.post<any>(this.ResetURL, data,{headers});
  }



}
