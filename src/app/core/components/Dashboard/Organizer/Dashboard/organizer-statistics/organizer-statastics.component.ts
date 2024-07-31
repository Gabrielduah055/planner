import { Component, Input, OnInit } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-organizer-statastics',
  standalone: true,
  imports: [],
  templateUrl: './organizer-statastics.component.html',
  styleUrl: './organizer-statastics.component.css',
})
export class OrganizerStatasticsComponent implements OnInit {
  @Input() totalTickets!: number;
  @Input() ticketSold!: number;
  @Input() ticketObject!: any;
  ticketSellingDaily!: { left: any; sold: any };
  ticketSellingWeekly!: { left: any; sold: any };
  ticketSellingMonthly!: { left: any; sold: any };
  left!: number;
  sold!: number;
  ngOnInit(): void {
    // this.renderChart();
    console.log(this.ticketObject);
    this.onDaily();

    this.renderChart(this.ticketSellingDaily);
  }

  renderChart(tickets: { left: any; sold: any }): void {
    const ticketsLeft = this.totalTickets - this.ticketSold;

    let chart = new CanvasJS.Chart('doughnutChartContainer', {
      animationEnabled: true,
      data: [
        {
          type: 'doughnut',
          innerRadius: 45,
          dataPoints: [
            { y: tickets.left, label: 'Tickets left', color: '#FF9C66' },
            { y: tickets.sold, label: 'Tickets Sold', color: '#FFD6AE' },
          ],
        },
      ],
    });

    chart.render();
  }
  onWeekly() {
    this.ticketSellingWeekly = {
      left: this.ticketObject?.bestSellingDataWeekly['Tickets Left: '],
      sold: this.ticketObject?.bestSellingDataWeekly[
        'Tickets Sold this Week: '
      ],
    };
    this.left = this.ticketSellingWeekly?.left;
    this.sold = this.ticketSellingWeekly?.sold;
    this.renderChart(this.ticketSellingWeekly);
  }
  onMonthly() {
    this.ticketSellingMonthly = {
      left: this.ticketObject?.bestSellingDataMonthly['Tickets Left: '],
      sold: this.ticketObject?.bestSellingDataMonthly[
        'Tickets Sold this Month '
      ],
    };
    this.left = this.ticketSellingMonthly?.left;
    this.sold = this.ticketSellingMonthly?.sold;

    this.renderChart(this.ticketSellingMonthly);
  }
  onDaily() {
    this.ticketSellingDaily = {
      left: this.ticketObject?.bestSellingDataDaily['Tickets Left: '],
      sold: this.ticketObject?.bestSellingDataDaily['Tickets Sold Today: '],
    };
    this.left = this.ticketSellingDaily?.left;
    this.sold = this.ticketSellingDaily?.sold;
    this.renderChart(this.ticketSellingDaily);
  }
}
