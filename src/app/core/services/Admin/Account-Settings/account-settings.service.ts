import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  private OrganizerBusiness = environment.ADMIN_CREATE_PROFILE;

  constructor(private httpClient: HttpClient) {}

  account(data: any): Observable<any> {
    const Token = localStorage.getItem(environment.ADMIN_TOKEN);
    // const userId = localStorage.getItem(environment.USER_ID);

    if (!Token) {
      console.error('Token not found in session storage');

    }

    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${Token}`)

    return this.httpClient.post(this.OrganizerBusiness, data, { headers });
  }

}
