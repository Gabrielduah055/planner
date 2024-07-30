import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { OrgSettingsRequest, OrgSettingsResponse, ViewProfileResponse } from '../../../Interface/service/interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private httpClient: HttpClient) { }

  private org_setting = environment.ORG_CREATE_PROFILE;
  private Token = sessionStorage.getItem('Token');

  orgSettings_(data: OrgSettingsRequest): Observable<OrgSettingsResponse> {

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', 'Content-Type');

    return this.httpClient.post<OrgSettingsResponse>(this.org_setting, data, { headers });
  }

  viewProfile(userId: string): Observable<ViewProfileResponse> {

    const url = `${environment.ORG_GET_PROFILE}/${userId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.httpClient.get<ViewProfileResponse>(url, { headers });
  }
}
