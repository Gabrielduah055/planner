import { Component } from '@angular/core';
import { LineChartComponent } from "../line-chart/line-chart.component";

@Component({
    selector: 'app-organizer-revenue-chart',
    standalone: true,
    templateUrl: './organizer-revenue-chart.component.html',
    styleUrl: './organizer-revenue-chart.component.css',
    imports: [LineChartComponent]
})
export class OrganizerRevenueChartComponent {

  RevChart: string = 'Revenue chart'

}
