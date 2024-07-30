import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrganizerDashGraphComponent } from '../../../../../../shared/organizer-graph/organizer-dash-graph/organizer-dash-graph.component';
import { OrganizerDashComponent } from "../../../../../../shared/Organizer/organizer-sidebar/organizer-dash.component";
import { OrganizerTopBarComponent } from "../../../../../../shared/Organizer/organizer-top-bar/organizer-top-bar.component";
import { OrganizerDashMetricComponent } from "../../../../../../shared/Organizer/organizer-dash-metric/organizer-dash-metric.component";
import { OrganizerChartComponent } from "../../../../../../shared/Organizer/organizer-chart/organizer-chart.component";
import { OrganizerRevenueChartComponent } from "../../../../../../shared/Organizer/organizer-revenue-chart/organizer-revenue-chart.component";

import { OrganizerDashboardService } from '../../../../../services/Organizer/dashboard/organizer-dashboard.service';
import { Data } from '../../../../../Interface/Admin/Organizer-dashboard/Organizer-dashboard';

import {OrganizerGraphComponent} from '../organizer-graph/organizer-graph.component'
import { OrganizerStatasticsComponent } from '../organizer-statistics/organizer-statastics.component';
import { OrganizerEventComponent } from '../organizer-recent/organizer-event.component';
import {organizerConstant} from './organizer-constant'



import { CalendarModule } from '@syncfusion/ej2-angular-calendars';




@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [
    CommonModule,
    RouterLink,
    OrganizerDashGraphComponent,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
    OrganizerDashMetricComponent,
    OrganizerChartComponent,
    OrganizerRevenueChartComponent,
    OrganizerGraphComponent,
    OrganizerStatasticsComponent,
    CalendarModule,
    OrganizerEventComponent
]
})
export class DashboardComponent implements OnInit {

OrganizerDashGraphComponent = OrganizerDashGraphComponent

heading = organizerConstant.contents.heading;
  sub_heading = organizerConstant.contents.subHeading;

  OrgDasImg: string = organizerConstant.images.OrgDasImg;
  DashBoardChartImg: string = organizerConstant.images.DashBoardChartImg;
  EventLayerImg: string = organizerConstant.images.EventLayerImg;
  SettingsImg: string = organizerConstant.images.SettingsImg;
  LogoutImg: string = organizerConstant.images.LogoutImg;
  NavbarBell: string = organizerConstant.images.NavbarBell;
  NavBarImg: string = organizerConstant.images.NavBarImg;
  NavBarDownArrow: string = organizerConstant.images.NavBarDownArrow;
  CardImg: string = organizerConstant.images.CardImg;
  baseImg: string = organizerConstant.images.baseImg;
  pieChart: string = organizerConstant.images.pieChart;

  Event: string = organizerConstant.contents.Event;
  Vista: string = organizerConstant.contents.Vista;

  NavBarName: string = organizerConstant.contents.NavBarName;
  Users: string = organizerConstant.contents.Users;
  LogOut: string = organizerConstant.contents.LogOut;

  eventCreated: string = organizerConstant.contents.eventCreated;
  Revenue: string = organizerConstant.contents.Revenue;
  fourThousand: number = 4000;
  Attendees: string = organizerConstant.contents.Attendees;
  EightThousand: number = 8000;
  RevChart: string = organizerConstant.contents.RevChart;

  organizerData!: Data;
  OrganizerData: Data | null = null;
  dailyTickets = 0;
  public value: Date = organizerConstant.dates.value;
  constant = organizerConstant




private organizerDashboard = inject(OrganizerDashboardService);
private router = inject(Router);


activeStep: string = 'monthly';



  accountSettings() {
    this.router.navigate(['/org-settings']);

  }

  profile: boolean = false;
  email= 'ekumkofi@example.com';

  toggleCard() {

    this.profile = !this.profile
    

  }

     fullName = sessionStorage.getItem('organizerName')



     ngOnInit(): void {
       this.fetchOrganizerData();
     }

   
     fetchOrganizerData(): void {
      this.organizerDashboard.getOrganizerData(2053).subscribe({
        next: (response: Data) => {
          this.OrganizerData = response;
        }
      });
    }

    showContent(step:string):void {
      this.activeStep = step;
    }

}




