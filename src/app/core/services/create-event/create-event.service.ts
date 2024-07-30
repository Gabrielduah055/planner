import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EventObject } from '../../Interface/create-event/organizer';

@Injectable({

  providedIn: 'root'
})
export class CreateEventService {
  
  userId = sessionStorage.getItem('userId')

  private createEventURL = environment.CREATE_EVENT_URL + '/' + this.userId;

  constructor(private httpClient: HttpClient) {}

  createEvent(data: EventObject): Observable<EventObject> {
    return this.httpClient.post<EventObject>(this.createEventURL, data);
  }

}
