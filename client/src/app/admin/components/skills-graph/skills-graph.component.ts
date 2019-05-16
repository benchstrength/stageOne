import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-skills-graph',
  templateUrl: './skills-graph.component.html',
  styleUrls: ['./skills-graph.component.scss']
})
export class SkillsGraphComponent implements OnInit {
  public chartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'right',
      fullWidth: true,
      labels: {
          fontColor: 'rgb(35, 99, 132)'
      }
    }
  };
  public chartData = [
    { data: [73, 89, 71, 43, 22, 34, 45, 56, 67], label: 'Percieved Skill' },
    { data: [32, 21, 53, 63, 62, 74, 24, 35, 73], label: 'Actual Skill' },
    { data: [71, 43, 22, 34, 45, 56, 67, 78, 89], label: 'Interest' }
  ];
  public chartLabels = [
    "HTML/CSS", "JQuery", "Angular", "TypeScript", "SCSS/LESS", "Webpack", "NodeJS", "Express", "React"];
  constructor() {}
  ngOnInit() {}
}
