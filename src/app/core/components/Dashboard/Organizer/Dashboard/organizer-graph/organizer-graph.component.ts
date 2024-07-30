import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import {CanvasJS} from '@canvasjs/angular-charts';
import { MonthlyRevenueData } from '../../../../../Interface/Admin/Organizer-dashboard/Organizer-dashboard';

@Component({
  selector: 'app-organizer-graph',
  standalone: true,
  imports: [],
  templateUrl: './organizer-graph.component.html',
  styleUrl: './organizer-graph.component.css'
})
export class OrganizerGraphComponent implements OnInit {

  @Input() monthlyRevenueData!: MonthlyRevenueData;
  ngOnInit(): void {
    this.renderChart();
  }

  renderChart():void {
    const dataPoints = Object.keys(this.monthlyRevenueData).map((month) => ({
      label:month,
      y:this.monthlyRevenueData[month as keyof MonthlyRevenueData]
    }));

    let chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled:true,
      axisY:{
        postMessage:"k",
        lineThickness:0
      },
      data:[{
        type:"splineArea",
        color:"rgba(255,0,0,0.3)",
        dataPoints:dataPoints
      }]
    })

    chart.render()
  }
}
