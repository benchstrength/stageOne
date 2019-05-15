import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service.spec';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pageTitle: string = "Admin Page";

  onClickMe() {
    console.log("click");
  }
  
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
