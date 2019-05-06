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
    'HTML/CSS', 
    'Javascript', 
    'JQuery', 
    'Angular', 
    'TypeScript'
  ];
  public polarAreaChartData: SingleDataSet = [73, 89, 71, 43, 22];
  public polarAreaLegend = false;

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
