import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Organizer, Data, MonthlyRevenueData } from '../../../Interface/Admin/Organizer-dashboard/Organizer-dashboard';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizerDashboardService {

  private http = inject(HttpClient);
  private OrgAnalyticsUrl = `${environment.BASE_URL}/org-analytics/data/`;


  getOrganizerData(id: number): Observable<Data> {
    
    return this.http.get<Organizer>(this.OrgAnalyticsUrl + id).pipe(
      map((response: Organizer) => response.data)
    );
  }
}
