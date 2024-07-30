import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InviterAdminService {

  constructor(private httpClient: HttpClient) { }



  private inviteApi = environment.SEND_ADMIN_INVITE+ '/' + localStorage.getItem('userId');

  admin(data: any): Observable<any> {

    const Token = localStorage.getItem(environment.ADMIN_TOKEN);

    if (!Token) {
      console.error('Token not found in session storage');

    }

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', 'Content-Type')
    .set('Authorization', `Bearer ${Token}`)

    return this.httpClient.post<any>(this.inviteApi, data, {headers})
  }
}
