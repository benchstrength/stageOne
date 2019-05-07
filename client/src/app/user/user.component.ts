import { Component, OnInit } from '@angular/core';
// import { MaterialModule } from "../material.module";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  pageTitle: string = "User Page";
  
  constructor() { }

  ngOnInit() {
  }

}
