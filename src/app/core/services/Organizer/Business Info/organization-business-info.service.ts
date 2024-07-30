import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationBusinessInfoService {
  private OrganizerBusiness = environment.ORG_BUSINESS_INFORMATION;

  constructor(private httpClient: HttpClient) {}

  OrganizerBusinessInfo(data: any): Observable<any> {
    const Token = localStorage.getItem(environment.ORGANIZER_TOKEN);
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
