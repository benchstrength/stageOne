import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../dataService/get-data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-addskill',
  templateUrl: './user-addskill.component.html',
  styleUrls: ['./user-addskill.component.scss']
})
export class UserAddskillComponent implements OnInit {

  skillName = new FormControl('');
  skillValue = new FormControl('');

  
  skills;
  constructor(private data: GetDataService) { 
    //injectable service goes here getAllUsers may have a security vulnerability 
    }
    // /api/graph map over res.map(skill => skill.name
  // this.data.getAdminGraph({skills:''})
  ngOnInit() {

  }
sendForm() {
  let formData = [{
    userEmail: sessionStorage.getItem("userEmail"),
    skillName: this.skillName.value,
    skillValue: this.skillValue.value
  }]
  console.log(formData);
  // this.data.addSkill({skill: this.formData}).then(sentForm => console.log(sentForm));
}


}
