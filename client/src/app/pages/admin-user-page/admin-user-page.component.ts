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

email = new FormControl('');
firstName = new FormControl('');
lastName = new FormControl('');
isEmployee = new FormControl('');

showForm = false;

  ngOnInit() {
  }

toggleForm() {
  this.showForm = !this.showForm;
}

sendForm() {
  let employeeStatus;
  console.log(this.isEmployee.value)
  if (this.isEmployee.value === 'Contractor') {
    employeeStatus = false
  } else if (this.isEmployee.value === 'Employee') {
    employeeStatus = true
  };
  let formData = {
    email: this.email.value,
    firstName: this.firstName.value,
    lastName: this.lastName.value,
    isEmployee: employeeStatus
  };
  console.log(formData);
  this.data.addUser(formData).then(sentForm => {
    if (sentForm == formData){
      console.log('it is a match')
    } else {
      console.log("no match, error!")
    }
    console.log(sentForm)
  })
  this.email.setValue('')
  this.firstName.setValue('')
  this.lastName.setValue('')
  this.isEmployee.setValue('Please select')
};

}
