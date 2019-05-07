import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  // PolarArea
  public polarAreaChartLabels: Label[] = [
    "HTML/CSS",
    "JQuery",
    "Angular",
    'TypeScript',
    "SCSS/LESS",
    "Webpack",
    "NodeJS",
    "Express",
    "React",
    "Redux",
    "Vue",
    "Django",
    "PHP",
    "MSSQL",
    "MySQL",
    "Postgres",
    "Mongo",
    "Sequelize",
    "Mongoose",
    "Eloquent",
    "Redis",
    "Laravel",
    "Gulp", 
    "Grunt", 
    "Elixer",
    "Git",
    "Linting",
    "Ruby",
    "Rails",
    "Perl",
    "Python",
    "Bash/Scripting",
    "Responsive Design",
    "UX",
    "Slack",
    "Machine Learning/AI",
    "ARKit",
    "E2E QA",
    "Unit Testing/QA",
    "Nix Server Management",
    "AWS",
    "Kentico",
    "C#/.NET",
    "CakePHP",
    "CMS",
    "iOS Native/Swift",
    "Android Native/Java/Kotlin",
    "VirtualBox",
    "Vagrant",
    "Javascript",
  ];
  public polarAreaChartData: SingleDataSet = [73, 89, 71, 43, 22, 34, 45, 56, 67, 78, 89, 98, 98, 65, 54, 43, 32, 32, 21, 53, 63, 62, 74, 24, 35, 73, 89, 71, 43, 22, 34, 45, 56, 67, 78, 89, 98, 98, 65, 54, 43, 32, 32, 21, 53, 63, 62, 74, 24, 34];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
