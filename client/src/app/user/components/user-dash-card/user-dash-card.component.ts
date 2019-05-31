import { Component, OnInit, Input } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';
// import { userInfo } from 'os';




@Component({
  selector: 'app-user-dash-card',
  templateUrl: './user-dash-card.component.html',
  styleUrls: ['./user-dash-card.component.scss']
})
export class UserDashCardComponent implements OnInit {
  private _adminData;
  constructor(private auth: AuthService) { }

  @Input()
set adminData(adminData: any) {
    console.log('prev value: ', this._adminData);
    console.log('got name: ', adminData);
    this._adminData = adminData;
  }
get adminData() {
  return this._adminData;
}
  // specialData = this.adminData;

 userInfo = {
   name: "",
   email: "",
   picture: ""
 };

  ngOnInit() {
    console.log(this._adminData);
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
