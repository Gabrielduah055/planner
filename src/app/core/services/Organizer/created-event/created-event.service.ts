import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatedEventService {

  constructor(private httpClient: HttpClient) { }



  private getAlUsers = environment.GET_ALL_USERS;

  getAllCreatedEvents(data: any): Observable<any> {

    return this.httpClient.get(this.getAlUsers, data)
  }

}
