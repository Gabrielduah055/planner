import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AllEventdetails, ViewEventdetails, allEventResponse } from '../../../Interface/all-eventdetails/all-eventdetails';
import { adminAllEventResponse } from '../../../Interface/Admin/getAllUsers';

@Injectable({
  providedIn: 'root'
})
export class EventAdminService {

  token = sessionStorage.getItem('Token')

  constructor(private http: HttpClient) {}

  getEvents(id: string, pageNumber?: number)  {
      let params = new HttpParams().set('id', id);

      if (pageNumber) {
        params = params.set('page', pageNumber.toString());
      }

    const url = `${environment.BASE_URL}/admin/read-all-admin/${id}`;
    return this.http.get<adminAllEventResponse>(url, { params });
  }

  getEventsByTicketStatus(status: string){
    return this.http.get<AllEventdetails[]>(
      `${environment.BASE_URL}/admin/filters?ticketStatus=${status}`, );
  }

  getEventsByLocation(location: string){
   
    return this.http.get<AllEventdetails[]>(
      `${environment.BASE_URL}/admin/filters?venueLocation=${location}`, );
  }

  getAdminEventById(eventId: string) {

    const url = `${environment.BASE_URL}/admin/event-details/${eventId}`;

    return this.http.get<ViewEventdetails>(url, );
  }

}
