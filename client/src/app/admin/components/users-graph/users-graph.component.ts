import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-users-graph',
  templateUrl: './users-graph.component.html',
  styleUrls: ['./users-graph.component.scss']
})
export class UsersGraphComponent implements OnInit {
  public chartOptions = {
    responsive: true,
    aspectRatio: 1.25,
    maintainAspectRatio: false,


    legend: {
      display: true,
      position: 'top',
      fullWidth: true,
      labels: {
          fontColor: 'rgb(35, 99, 132)'
      }
    },
  };
  public chartData = [
    { data: [73, 89, 71, 43, 22, 47, 45, 56, 67, 80], label: 'Percieved Skill' },
    { data: [32, 21, 53, 63, 62, 34, 24, 35, 73, 100], label: 'Actual Skill' },
    { data: [71, 43, 22, 34, 45, 17, 67, 78, 89, 10], label: 'Interest' }
  ];
  public chartLabels = [
    "Name","Name","Name","Name","Name","Name","Name","Name","Name", "Name",
    "Name","Name","Name","Name","Name","Name","Name","Name","Name", "Name"
  ];

  constructor() {}
  ngOnInit() {}
}
