import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {Chart, registerables } from 'chart.js';
// Chart.register(...registerables)


@Component({
  selector: 'app-organizer-dash-graph',
  standalone: true,
  imports: [


    CommonModule,
    RouterLink,
  ],
  templateUrl: './organizer-dash-graph.component.html',
  styleUrl: './organizer-dash-graph.component.css',


})
export class OrganizerDashGraphComponent {



  }


