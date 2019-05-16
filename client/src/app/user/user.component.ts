import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service.spec';
// import { MaterialModule } from "../material.module";



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  pageTitle: string = "User Page";
  
  constructor(public auth: AuthService) { }


  ngOnInit() {
    
  }

getNotes() {
  //Function to get data from DB and return notes information

}

}
