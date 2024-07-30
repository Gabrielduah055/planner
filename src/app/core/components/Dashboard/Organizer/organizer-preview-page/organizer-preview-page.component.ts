import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrganizerDashComponent } from '../../../../../shared/Organizer/organizer-sidebar/organizer-dash.component';
import { OrganizerTopBarComponent } from '../../../../../shared/Organizer/organizer-top-bar/organizer-top-bar.component';
import { OrgViewEventsComponent } from '../org-view-events/org-view-events.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { heading } from './staticfiles';
import { sub_heading } from './staticfiles';

@Component({
  selector: 'app-organizer-preview-page',
  standalone: true,
  imports: [
    CommonModule,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
    OrgViewEventsComponent,
    RouterLink,
    RouterOutlet,
    CommonModule,

  ],
  templateUrl: './organizer-preview-page.component.html',
  styleUrl: './organizer-preview-page.component.css'
})
export class OrganizerPreviewPageComponent {

  heading = heading
  sub_heading = sub_heading

}
