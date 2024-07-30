import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recent, Event } from '../../../Interface/Organizer/org.recent';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import {tap, map} from 'rxjs/operators'




@Injectable({
  providedIn: 'root'
})
export class OrganizerEventsService {

  private http = inject(HttpClient);
  private organizerRecent = `${environment.BASE_URL}/event-vista/read-all/2053`


  fetchOrganizerEvents():Observable<Recent> {
    return this.http.get<Recent>(this.organizerRecent);
  }

}
