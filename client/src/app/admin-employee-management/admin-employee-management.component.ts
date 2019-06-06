import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../dataService/get-data.service';
import { LevelsService } from '../dataService/levels.service';
import { IUser } from 'models/user.model';

@Component({
  selector: 'app-admin-employee-management',
  templateUrl: './admin-employee-management.component.html',
  styleUrls: ['./admin-employee-management.component.scss']
})
export class AdminEmployeeManagementComponent implements OnInit {

  constructor(private data: GetDataService,
              private levels: LevelsService) { }


users: IUser[];
viewData: string[] = [];
developers: IUser[];

interests = this.levels.interests;
abilities = this.levels.abilities;

  ngOnInit() {

    this.data.getAllUsers("all").then(users => {
      console.log(users);
      this.users = users as IUser[];
      this.developers = this.users;
    })

  }

  showData(email) {
    this.viewData.push(email);
  }

  filterList(developerEmail) {
    this.users = this.developers.filter(
      developer => developer.email === developerEmail)
  }

  hideData(email: string) {
   let filtered = this.viewData.filter(elem => {
    return elem != email;

  });
  this.viewData = filtered
  }

}
