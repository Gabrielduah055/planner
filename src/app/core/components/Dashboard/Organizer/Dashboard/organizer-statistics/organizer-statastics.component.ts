import { Component, Input, OnInit } from '@angular/core';
import {CanvasJS} from '@canvasjs/angular-charts'

@Component({
  selector: 'app-organizer-statastics',
  standalone: true,
  imports: [],
  templateUrl: './organizer-statastics.component.html',
  styleUrl: './organizer-statastics.component.css'
})
export class OrganizerStatasticsComponent implements OnInit {
  @Input() totalTickets!:number;
  @Input() ticketSold!:number;

  ngOnInit():void {
    this.renderChart();
  }

  renderChart():void {
    const ticketsLeft = this.totalTickets - this.ticketSold;

    let chart = new CanvasJS.Chart("doughnutChartContainer", {
      animationEnabled:true,
      data: [{
        type:"doughnut",
        innerRadius: 45,
        dataPoints: [
          {y:ticketsLeft, label:"Tickets left", color:"#FF9C66"},
          {y: this.ticketSold, label:"Tickets Sold", color:"#FFD6AE"}
        ]
      }]
    })

    chart.render();
  }
}
