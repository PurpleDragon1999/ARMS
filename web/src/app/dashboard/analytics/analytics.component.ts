import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: 'analytics.component.html',
  styleUrls: ['analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor() { }

  // bar chart data
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartLabels = ['Java Developer', 'Full-stack developer', 'UI developer', 'Data analyst', 'DB administrator'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56], label: 'No. of applicants'},
    {data: [28, 20, 40, 19, 27], label: 'Hired applicants'}
  ];

  // doughnut chart data
  public doughnutChartLabels = ['Java Developer', 'Full-stack developer', 'UI developer', 'Data analyst', 'DB administrator'];
  public doughnutChartData = [28, 20, 40, 19, 27];
  public doughnutChartType = 'doughnut';
  public doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngOnInit() {
  }

}
