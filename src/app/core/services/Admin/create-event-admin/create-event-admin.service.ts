import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateEventAdminService {


  private createEventURL = environment.ADMIN_CREATE_EVENT_URL + '/' + localStorage.getItem('userId');

  constructor(private httpClient: HttpClient) {}

  createEvent(data: any): Observable<any> {
    const Token = localStorage.getItem(environment.ORGANIZER_TOKEN);

    if (!Token) {
      console.error('Token not found in session storage');

    }

    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${Token}`)


    return this.httpClient.post(this.createEventURL, data, { headers });
  }

}
