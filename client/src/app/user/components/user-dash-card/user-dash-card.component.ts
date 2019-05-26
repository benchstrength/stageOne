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
  
  constructor(private auth: AuthService) { }

  @Input() adminData: object;
  
// adminData = {
//   name: "",
//   email: "",
//   picture: ""
// };

 userInfo = {
   name: "",
   email: "",
   picture: ""
 };

  ngOnInit() {
    
    // load user data if it exists
    console.log(this.userInfo)
  if (sessionStorage.getItem('userEmail')) {
    this.userInfo = {
      name: sessionStorage.getItem('userName'),
      email: sessionStorage.getItem('userEmail'),
      picture: sessionStorage.getItem('userPicture')
    }
  }
  
}

}
