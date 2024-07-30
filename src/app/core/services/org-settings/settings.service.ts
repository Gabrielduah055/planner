import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  constructor(private httpClient: HttpClient) { }

  private org_setting = environment.ORG_CREATE_PROFILE;
  private Token = sessionStorage.getItem('Token');

  orgSettings_(data: any): Observable<any> {

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.Token}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', 'Content-Type')

    return this.httpClient.post<any>(this.org_setting, data, {headers})
  }


  viewProfile(userId: any): Observable<any> {

    const url = `${environment.ORG_GET_PROFILE}/${userId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.httpClient.get<any>(url, { headers });
  }
}
