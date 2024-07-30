import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BasicInformationObject, EventObject, PageableResponse } from '../../../Interface/create-event/organizer';
import { AllUsersEvent, Pageable } from '../../../Interface/Admin/getAllUsers';
import { PageResponse } from '../../../Interface/registration/login-register';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  userId = sessionStorage.getItem('userId');
  baseUrl = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {}

  public deleteEvent(eventId: number): Observable<PageResponse> {
    return this.httpClient.delete<PageResponse>(
      this.baseUrl + `/event-vista/delete/${eventId}/${this.userId}`
    );
  }

  public getEventById(eventId: number): Observable<EventObject> {
    return this.httpClient.get<EventObject>(
      this.baseUrl + `/event-vista/read/${eventId}/${this.userId}`
    );
  }

  public updateEventById(data: EventObject, eventId: number): Observable<EventObject> {
    return this.httpClient.put<EventObject>(
      this.baseUrl + `/event-vista/edit/${eventId}/${this.userId}`,
      data
    );
  }

  public getAllOrganizerEvents(): Observable<PageableResponse> {
    return this.httpClient.get<PageableResponse>(
      this.baseUrl + `/event-vista/read-all/${this.userId}`
    );
  }

  public getRegisteredAttendeesByEventId(eventId: string, pageNumber: number, pageSize: number) {
      const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());
      return this.httpClient.get<AllUsersEvent>(
        this.baseUrl + `/event-vista/attendees-registered/${eventId}`,
        { params}
      );
  }


}
