import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit {

  chart!: Chart;
  colors = ["#FF4405", "#FF9C66", "#FFD6AE"]; // Example colors

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDataAndInitializeChart();
  }

  fetchDataAndInitializeChart(): void {
    // Simulated API call (replace with actual HTTP request)
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const data = [30, 5, 80, 81, 56, 5454, 40];
    this.initializeChart(labels, data);
  }

  initializeChart(labels: string[], data: number[]): void {
    const ctx = this.getChartCanvas();
    if (!ctx) return;

    const transformedData = this.transformData(data);

    const config: ChartConfiguration = this.getChartConfig(labels, transformedData);

    this.destroyExistingChart();
    this.chart = new Chart(ctx, config);
  }

  private getChartCanvas(): HTMLCanvasElement | null {
    return document.getElementById('revenueChart') as HTMLCanvasElement;
  }

  private transformData(data: number[]): number[] {
    return data.map(value => value * 100);
  }

  private getChartConfig(labels: string[], transformedData: number[]): ChartConfiguration {
    return {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: transformedData,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            borderWidth: 0,
            callbacks: {
              label: function(tooltipItem: any) {
                return tooltipItem.value.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                });
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value: any) {
                return (value / 1000) + 'k'; // Format ticks as 0k, 2k, 4k, ..., 10k
              }
            }
          }
        }
      }
    };
  }

  private destroyExistingChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
