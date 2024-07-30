import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AllEventdetails, AreaOfInterest, AttendeeProfile, FreeCheckoutData, RegisteredEvents, UpcomingEvents, ViewEventdetails, allEventResponse } from '../../Interface/all-eventdetails/all-eventdetails';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AllUsersResponse } from '../../Interface/Admin/getAllUsers';
import { NotificationService } from '../../../notification-service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class GetEventService {

  token = sessionStorage.getItem('Token')
  profileSubject = new BehaviorSubject<AttendeeProfile | null>(null);

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  get profile$(): Observable<AttendeeProfile | null> {
    return this.profileSubject.asObservable();
  }

  getEvents(id: string, pageNumber?: number){


    let params = new HttpParams().set('id', id);

    if (pageNumber) {
      params = params.set('page', pageNumber.toString());
    }

    const url = `${environment.BASE_URL}/attendee/read-all/${id}`;

    return this.http.get<allEventResponse>(url, { params });
  }

  getEventsByLocationHome(location: string) {

    return this.http.get<allEventResponse>(`${environment.BASE_URL}/find-event/filters?venueLocation=${location}`);
  }

  getEventsByCategoryHome(category: string){

    return this.http.get<allEventResponse>(`${environment.BASE_URL}/find-event/filters?eventCategory=${category}`);
  }

  getEventsByDateHome(startDate: string, endDate: string) {

    const url = `${environment.BASE_URL}/find-event/filters?eventStartDate=${startDate}&eventEndDate=${endDate}`;
    
    return this.http.get<allEventResponse>(url);
  }

  getEventsByTicketStatusHome(status: string){

    return this.http.get<allEventResponse>(
      `${environment.BASE_URL}/find-event/filters?ticketStatus=${status}`);
  }


  loadingUpcomingEvents(id: string) {

    const url = `${environment.BASE_URL}/attendee/upcoming-events/${id}`;

    return this.http.get<UpcomingEvents[]>(url);
  }

  completeOnboarding(userId: string, selectedInterests: string[]) {


    const url = `${environment.BASE_URL}/attendee/${userId}/onboarding`;

    return this.http.post<AreaOfInterest>(url, { areasOfInterest: selectedInterests }).pipe(
      tap((response) => {
        if (response.status === 200) {
          localStorage.setItem('onboardingComplete', 'true');
        }
      }),
      catchError(this.handleError)
    );
  }

  getAttendeeProfile(id: string){


    const url = `${environment.BASE_URL}/attendee/view-profile/${id}`;

    return this.http.get<{ data: AttendeeProfile }>(url);
  }

  updateAttendeeProfile(id: string, updatedProfile: Partial<AttendeeProfile>) {


    const url = `${environment.BASE_URL}/profile/create-attendee-profile`;
    return this.http.post<{ data: AttendeeProfile }>(url, updatedProfile)
      .pipe(
        catchError(error => {
          this.notificationService.showError('Error updating profile');
          return throwError(error);
        })
      );
  }
  
  setProfile(profile: AttendeeProfile) {
    this.profileSubject.next(profile);
  }

  loadUserProfile(userId: string) {
    this.getAttendeeProfile(userId).subscribe({
      next: (res) => {
        this.profileSubject.next(res.data);
      },
      error: (error) => {
        this.notificationService.showError('Error fetching profile');
      }
    });
  }
  

  getEventById(eventId: string) {

    const url = `${environment.BASE_URL}/attendee/read-event/${eventId}`;

    return this.http.get<ViewEventdetails>(url);
  }

  getMyEventRegisteredById(eventId: string) {

    const url = `${environment.BASE_URL}/attendee/my-events/${eventId}`;

    return this.http.get<RegisteredEvents>(url).pipe(
      catchError(this.handleError)
    );
  }

  getEventsByLocation(location: string) {

    return this.http.get<allEventResponse>(
      `${environment.BASE_URL}/attendee/my-events/filter?venueLocation=${location}`);
  }

  getEventsByCategory(category: string){
 

    const url = `${environment.BASE_URL}/attendee/my-events/filter?eventCategory=${category}`

    return this.http.get<allEventResponse>(url);
  }

  getEventsByDate(startDate: string, endDate: string) {

    const url = `${environment.BASE_URL}/find-event/filters?eventStartDate=${startDate}&eventEndDate=${endDate}`;
    
    return this.http.get<allEventResponse>(url);
  }

  getEventsByTicketStatus(status: string){

    return this.http.get<allEventResponse>(
      `${environment.BASE_URL}/attendee/my-events/filter?ticketStatus=${status}`);
  }

  sendFreeCheckoutDetails(eventId: string, userId: string, infoData: FreeCheckoutData) {

    const url = `${environment.BASE_URL}/attendee/register-event/${userId}/${eventId}`;
    
    return this.http.post<AllUsersResponse>(url, infoData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.notificationService.showError('An error occurred');
    } else {
      this.notificationService.showError(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
