import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';

export interface UserInfo {
  email: string,
  name: string,
  picture: string
}

@Component({
  selector: 'app-user-dash-card',
  templateUrl: './user-dash-card.component.html',
  styleUrls: ['./user-dash-card.component.scss']
})
export class UserDashCardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  userInfo: UserInfo = jwt_decode(sessionStorage.getItem("idToken"));
    picture = this.userInfo.picture;
    name = this.userInfo.name;
    email= this.userInfo.email;
    access = jwt_decode(sessionStorage.getItem("accessToken"));

  ngOnInit() {
    
  }

}
