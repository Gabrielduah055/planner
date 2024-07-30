import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration,registerables } from 'chart.js';
import { PieChartService } from '../../../core/services/Organizer/PieChart/pie-chart.service';
Chart.register(...registerables)

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  labels = ["fjgrge", "dgfged", "sfg"];
  data = [1, 2.3, 4.4];
  chart!: Chart ;

  constructor(private http: HttpClient, private dataService: PieChartService) {}


  ngOnInit(): void {
    this.fetchDataAndInitializeChart();
  }

  fetchDataAndInitializeChart(): void {
    this.dataService.fetchDataWithToken().subscribe(
      (response) => {
        this.labels = response.labels;
        this.data = response.values;
        this.initializeChart(this.labels, this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  colors = ["#FF4405", "#FF9C66", "#FFD6AE"]

  initializeChart(labels: string[], data: number[]) {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (!ctx) return;
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: this.colors,
            data: data,
            spacing: 0,
            borderSkipped: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            borderWidth: 0,
          },
        },
      },
    };
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, config);
  }

}


