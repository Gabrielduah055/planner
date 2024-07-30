import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivateAccountResponse } from '../../../Interface/Organizer/activate';

@Injectable({
  providedIn: 'root'
})
export class ActivateCoOrgService {

  private orgActivate: string;

  constructor(private httpClient: HttpClient) {
    this.orgActivate = `${environment.ORG_ACTIVATE}/${sessionStorage.getItem('userId')}/`;
  }

  activateAccount(itemId: string, pageNumber: number, pageSize: number): Observable<ActivateAccountResponse> {
    const headers = new HttpHeaders()
    .set('page', pageNumber.toString())
    .set('size', pageSize.toString());

    return this.httpClient.post<ActivateAccountResponse>(this.orgActivate, { itemId }, { headers });
  }

}
