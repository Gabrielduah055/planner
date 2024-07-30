import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {

  token = sessionStorage.getItem('Token')
  constructor(private http: HttpClient) {}

  activateUser(id: number): Observable<any> {
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.token}`);

    const url = `${environment.BASE_URL}/admin/activate/${id}`;

    return this.http.patch<any>(url, {}, { headers });
  }

  deactivateUser(id: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);

    const url = `${environment.BASE_URL}/admin/deactivate/${id}`;

    return this.http.patch<any>(url, {}, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);

    const url = `${environment.BASE_URL}/admin/delete/${id}`;

    return this.http.delete<any>(url, { headers });
  }
 
}

