import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {


  private apiUrl = environment.ORG_PIE_CHART;
  private Token = localStorage.getItem('Token');

  constructor(private http: HttpClient) {}

  fetchDataWithToken(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.Token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.http.get<any>(`${this.apiUrl}/data`, { headers });
  }

}
