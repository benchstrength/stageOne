import { Component, OnInit } from '@angular/core';
import { AdminGraphComponent } from '../admin-graph/admin-graph.component';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  onClick() {
    console.log("click");
    console.log(AdminGraphComponent[1]);
  }
  constructor() { }

  ngOnInit() {
  }

}
