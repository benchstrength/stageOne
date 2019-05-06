import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  pageTitle: string = "Login Page";
  title: string = "Bench Strength";

  constructor() { }

  ngOnInit() {
  }

}
