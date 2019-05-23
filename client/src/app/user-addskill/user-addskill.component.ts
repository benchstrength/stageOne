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
  skillInterest = new FormControl('');
  skillSelfRating= new FormControl('');

  
  skills;
  constructor(private data: GetDataService) { 
    //injectable service goes here getAllUsers may have a security vulnerability 
    }
    listSkills() {
    this.data.getAdminGraph({skill: []}).then(data => {
      this.skills = data;
      // console.log(data.map(skill => skill.name));
      });
    }
    // /api/graph map over res.map(skill => skill.name
  // this.data.getAdminGraph({skills:''})
  ngOnInit() {
    this.listSkills();
  }
sendForm() {
  let formData = [{
    userEmail: sessionStorage.getItem("userEmail"),
    skillName: this.skillName.value,
    skillInterest: this.skillInterest.value,
    skillSelfRating: this.skillSelfRating.value

  }]
  console.log(formData);
  // this.data.addSkill({skill: this.formData}).then(sentForm => console.log(sentForm));
}


}
