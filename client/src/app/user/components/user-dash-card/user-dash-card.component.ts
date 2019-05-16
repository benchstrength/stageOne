import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';




@Component({
  selector: 'app-user-dash-card',
  templateUrl: './user-dash-card.component.html',
  styleUrls: ['./user-dash-card.component.scss']
})
export class UserDashCardComponent implements OnInit {

  constructor(private auth: AuthService) { }

 userInfo = {}

  ngOnInit() {

if (sessionStorage.getItem("idToken")) {
  this.userInfo = jwt_decode(sessionStorage.getItem("idToken"));
  // access = jwt_decode(sessionStorage.getItem("accessToken"));
} else {
  this.userInfo = {
    email: "",
    name: "",
    picture: "https://via.placeholder.com/200"
      }
    }

  }

}
