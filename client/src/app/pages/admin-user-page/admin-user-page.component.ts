import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.scss']
})
export class AdminUserPageComponent implements OnInit {

  constructor(private data: GetDataService) { }

userEmail = new FormControl('');
firstName = new FormControl('');
lastName = new FormControl('');

showForm = false;

  ngOnInit() {
  }

toggleForm() {
  this.showForm = !this.showForm;
}

sendForm() {
  let formData = {
    userEmail: this.userEmail.value,
    firstName: this.firstName.value,
    lastName: this.lastName.value
  }
  console.log(formData);
  this.data.addUser(formData).then(sentForm => console.log(sentForm))
  this.userEmail.setValue('')
  this.firstName.setValue('')
  this.lastName.setValue('')
}

}
