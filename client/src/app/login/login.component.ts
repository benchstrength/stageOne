import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  pageTitle: string = "Login Page";
  title: string = "Bench Strength";

  constructor(public auth: AuthService,
              public http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    // this.auth.handleAuthentication();
    console.log(this.auth.isAuthenticated());
    if (this.auth.isAuthenticated()) {
        this.router.navigate([ '/user' ])
    }


  }

public sendData() {
  console.log("Send Data!")
  this.http.post("/api/semi-private", {
    message: "Sending data from Angular!"
  }, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)})
  .subscribe(data => console.log(data))
};

}
