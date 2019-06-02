import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../dataService/get-data.service';
import { LevelsService } from '../dataService/levels.service';

@Component({
  selector: 'app-admin-employee-management',
  templateUrl: './admin-employee-management.component.html',
  styleUrls: ['./admin-employee-management.component.scss']
})
export class AdminEmployeeManagementComponent implements OnInit {

  constructor(private data: GetDataService,
              private levels: LevelsService) { }


users: any;
viewData: string[] = []

interests = this.levels.interests;
abilities = this.levels.abilities;

  ngOnInit() {

    this.data.getAllUsers("all").then(users => {
      console.log(users);
      this.users = users;
    })

  }

  showData(email) {
    this.viewData.push(email);
  }

  hideData(email: string) {
   let filtered = this.viewData.filter(elem => {
    return elem != email;

  });
  this.viewData = filtered
  }

}
