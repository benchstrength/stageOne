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

 userInfo: object;

  ngOnInit() {
    
    // load user data if it exists
  if (sessionStorage.getItem('userEmail')) {
    this.userInfo = {
      name: sessionStorage.getItem('userName'),
      email: sessionStorage.getItem('userEmail'),
      picture: sessionStorage.getItem('userPicture')
    }
  }
  
}

}
