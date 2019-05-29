import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';
import { ActivatedRoute } from '@angular/router';


interface UserData {
firstName: string,
lastName: string,
email: string,
picture: string
}

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.scss']
})
export class AdminUserProfileComponent implements OnInit {

  constructor(private data: GetDataService,
              private route: ActivatedRoute) { }


adminData = {
  name: "",
  email: "",
  picture: ""
}

  ngOnInit() {
    let email;
    this.route.params.subscribe(params => {
      email = params.id;
    })
if (email) {
  this.data.getOneUser({email: email}).then((userData: UserData) => {
    this.adminData ={
      name: `${userData.firstName}  ${userData.lastName}`,
      email: userData.email,
      picture: userData.picture
    } 
  })
console.log(email)
}

  }

}
