import { Component, inject, OnInit } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';
import { AdminService } from '../../../../services/Admin/admin-dashboard/admin.service';
import { Analytics } from '../../../../Interface/Admin/admin-analytics';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  adminAnalytics = inject(AdminService)

  ngOnInit(): void {
    this.adminAnalytics.getAnalytics().subscribe({
      next:(data:Analytics) => {
        console.log(data)
        const attendeesData = Object.values(data.currentYearData.attendees);
        const organizersData = Object.values(data.currentYearData.organizers);
        const labels = Object.keys(data.currentYearData.attendees);
        this.createChart(labels, attendeesData, organizersData);
      }
    });
  }


   createChart(labels: string[], attendeesData: number[], organizersData: number[]): void {
    const maxAttendees = Math.max(...attendeesData);
    const maxOrganizers = Math.max(...organizersData);
    const maxYValue = Math.max(maxAttendees, maxOrganizers);

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      axisX: {
        valueFormatString: "MMM",
      },
      axisY: {
        title: "Active Users",
        minimum: 0,
        maximum: maxYValue + 100,  // Adding a buffer for better visualization
      },
      toolTip: {
        shared: true
      },
      data: [{        
        type: "line",  
        name: "Attendees",
        showInLegend: true,
        markerType: "circle",
        xValueFormatString: "MMM",
        yValueFormatString: "#,##0",
        dataPoints: labels.map((label, index) => ({
          label: label,
          y: attendeesData[index]
        })),
        color: "rgba(230, 46, 5, 1)",
      },
      {        
        type: "line",  
        name: "Organizers",
        showInLegend: true,
        markerType: "circle",
        xValueFormatString: "MMM",
        yValueFormatString: "#,##0",
        dataPoints: labels.map((label, index) => ({
          label: label,
          y: organizersData[index]
        })),
        color: "rgba(151, 24, 12, 1)",
      }]
    });
    chart.render();
  }
}
function data(value: Analytics): void {
  throw new Error('Function not implemented.');
}

