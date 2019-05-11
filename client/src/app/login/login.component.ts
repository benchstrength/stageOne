import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from "@angular/common/http"
// import { ApiCallsService } from '../apiCalls/api-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    message: "Sending data from Angular!"
  }).toPromise()
  .then(data => console.log(data))
  .catch(err => console.log(err));

};

}
