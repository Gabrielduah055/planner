import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InviteUserRequest, InviteUserResponse } from '../../../Interface/Organizer/user-invite';

@Injectable({
  providedIn: 'root'
})
export class InviteUserService {
  constructor(private httpClient: HttpClient) { }

  private orgInvite = `${environment.ORG_USER_INVITE}/${sessionStorage.getItem('userId')}`;

  organizer(data: InviteUserRequest): Observable<InviteUserResponse> {
    const Token = localStorage.getItem(environment.ORGANIZER_TOKEN);
    if (!Token) {
      console.error('Token not found in session storage');
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${Token}`);

    return this.httpClient.post<InviteUserResponse>(this.orgInvite, data, { headers });
  }
}
