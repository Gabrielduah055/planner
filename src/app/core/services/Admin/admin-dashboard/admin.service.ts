import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Analytics } from '../../../Interface/Admin/admin-analytics';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private analyticUrl = environment.ANALYTICS_URL;

  


  getAnalytics():Observable<Analytics>{
    return this.http.get<Analytics>(this.analyticUrl);
  }
}
