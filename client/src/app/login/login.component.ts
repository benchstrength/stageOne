import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
// import { ApiCallsService } from '../apiCalls/api-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  pageTitle: string = "Login Page";
  title: string = "Bench Strength";

  constructor(public auth: AuthService,
              public http: HttpClient) { }

  ngOnInit() {
  }

public sendData() {
  console.log("Send Data!")
  this.http.post("/api/semi-private", {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`),
    message: "Sending data from Angular!"
  }).subscribe(data => console.log(data))
};

}
