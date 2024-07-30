import { Component, OnInit, inject } from '@angular/core';
import { OrganizerEventsService } from '../../../../../services/Organizer/organizer-events/organizer-events.service';
import { Event, Recent } from '../../../../../Interface/Organizer/org.recent';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-organizer-event',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './organizer-event.component.html',
  styleUrl: './organizer-event.component.css'
})
export class OrganizerEventComponent implements OnInit  {
  events: Event[] = [];

  private OrganizerRecent = inject(OrganizerEventsService)
  ngOnInit(): void {
    this.OrganizerRecent.fetchOrganizerEvents().subscribe(
      (response: Recent) => {
        this.events = response.content;
        this.processEventDetails();
      }
    );
  }

  private processEventDetails():void {
    this.events.forEach(event => {
      const eventDetails = {
        title:event.eventTitle,
        summary:event.eventSummary,
        country:event.country,
        city:event.city,
        price:event.virtualEventPrice,
        ticketsLeft:event.totalTicketAllocation,
        scheduleDate: event.scheduleDate
      }
    })
  }


}
