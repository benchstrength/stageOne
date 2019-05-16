import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-graph',
  templateUrl: './admin-graph.component.html',
  styleUrls: ['./admin-graph.component.scss']
})
export class AdminGraphComponent implements OnInit {
 
  dataSets: object[] = [
    {
          chartOptions: {
            title: "Skills Graph",
            responsive: true,
            legend: {
              display: true,
              position: 'top',
              fullWidth: true,
              labels: {
                fontColor: 'rgb(255, 99, 132)'
              }
            }
          },
          chartData: [
            { data: [73, 89, 71, 43, 22, 34, 45, 56, 67], label: 'Percieved Skill' },
            { data: [32, 21, 53, 63, 62, 74, 24, 35, 73], label: 'Actual Skill' },
            { data: [71, 43, 22, 34, 45, 56, 67, 78, 89], label: 'Interest' }
          ],
          charLabels: [
            "HTML/CSS",
            "JQuery",
            "Angular",
            'TypeScript',
            "SCSS/LESS",
            "Webpack",
            "NodeJS",
            "Express",
            "React",
          ] 
    },
    {
          chartOptions: {
            title: "Users Graph",
            responsive: true,
            legend: {
              display: true,
              position: 'top',
              fullWidth: true,
              labels: {
                fontColor: 'rgb(255, 99, 132)'
              }
            }
          },
          chartData: [
            { data: [73, 89, 71, 43, 22, 34, 45, 56, 67], label: 'Percieved Skill' },
            { data: [32, 21, 53, 63, 62, 74, 24, 35, 73], label: 'Actual Skill' },
            { data: [71, 43, 22, 34, 45, 56, 67, 78, 89], label: 'Interest' }
          ],
          charLabels: [
            "NAME",
            "NAME",
            "NAME",
            "NAME",
            "NAME",
            "NAME",
            "NAME",
            "NAME",
            "NAME",
          ] 
    }
  ]

  // public chartOptions = {
  //   responsive: true,
  //   legend: {
  //     display: true,
  //     position: 'right',
  //     fullWidth: true,
  //     labels: {
  //         fontColor: 'rgb(255, 99, 132)'
  //     }
  //   }
  // };
  // public chartData = [
  //   { data: [73, 89, 71, 43, 22, 34, 45, 56, 67], label: 'Percieved Skill' },
  //   { data: [32, 21, 53, 63, 62, 74, 24, 35, 73], label: 'Actual Skill' },
  //   { data: [71, 43, 22, 34, 45, 56, 67, 78, 89], label: 'Interest' }
  // ];
  // public chartLabels = [
  //   "HTML/CSS",
  //   "JQuery",
  //   "Angular",
  //   'TypeScript',
  //   "SCSS/LESS",
  //   "Webpack",
  //   "NodeJS",
  //   "Express",
  //   "React",
  // ];

  constructor() { }
  ngOnInit() {}
}
