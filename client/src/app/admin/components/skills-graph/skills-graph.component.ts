import { Component, OnInit } from '@angular/core';
import { Skill } from '../search/skill';
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
      position: 'bottom',
      fullWidth: true,
      labels: {
          fontColor: 'rgb(35, 99, 132)'
      }
    }
  };
  public chartData = [
    { data: [73, 89, 71, 43, 22, 34, 45, 56, 67], label: 'Percieved Skill' },
    { data: [32, 21, 53, 63, 62, 74, 24, 35, 73], label: 'Accurate Skill' },
    { data: [71, 43, 22, 34, 45, 56, 67, 78, 89], label: 'Interest Rating' }
  ];
  public chartLabels = [
    "html/css", "react", "angular", "jquery", "typescript", "scss/less", "webpack", "node", "express"];
  constructor() {}
  ngOnInit() {}
}
