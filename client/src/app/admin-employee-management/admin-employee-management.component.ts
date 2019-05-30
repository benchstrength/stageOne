import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../dataService/get-data.service';

@Component({
  selector: 'app-admin-employee-management',
  templateUrl: './admin-employee-management.component.html',
  styleUrls: ['./admin-employee-management.component.scss']
})
export class AdminEmployeeManagementComponent implements OnInit {

  constructor(private data: GetDataService) { }


users: any;
viewData = []

  ngOnInit() {

    this.data.getAllUsers("all").then(users => {
      console.log(users);
      this.users = users;
    })

  }

  showData(email) {
    this.viewData.push(email);
  }

  hideData(email) {
   this.viewData = this.viewData.filter(elem => {
    elem != email;
   });
  }

}
