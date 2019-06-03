import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'models/user.model';
import { ISkill } from 'models/skill.model';


interface UserData {
firstName: string,
lastName: string,
email: string,
picture: string
}

interface AdminData {
  name: string,
  email: string,
  picture: string,
  skills?: ISkill[]
}

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.scss']
})
export class AdminUserProfileComponent implements OnInit {

  constructor(private data: GetDataService,
              private route: ActivatedRoute) { }


adminData: AdminData;

  ngOnInit() {
    //Gets and updates page based on email in route
    this.route.params.subscribe(params => {
      let email = params.id;
      console.log(email);
      this.data.getOneUser({email: email}).then((userData: UserData) => {
        this.adminData ={
          name: `${userData.firstName}  ${userData.lastName}`,
          email: userData.email,
          picture: userData.picture
        } 
      })
    })
  };

}
