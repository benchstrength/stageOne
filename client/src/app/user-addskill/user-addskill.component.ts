import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../dataService/get-data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-addskill',
  templateUrl: './user-addskill.component.html',
  styleUrls: ['./user-addskill.component.scss']
})
export class UserAddskillComponent implements OnInit {

  skillId = new FormControl('');
  skillInterest = new FormControl('');
  skillSelfRating= new FormControl('');
  
  skills;

  constructor(private data: GetDataService) { 
    //injectable service goes here getAllUsers may have a security vulnerability 
    }
    // lists skill in Add-Skill dropdown 
    listSkills() {
    this.data.getAdminGraph({skill: []}).then(skillsData => {
      // this.data.getUserBySkill({skills: []}).then(data => {
      //     data.map(skill => skill.name).filter(skills => this.skill.includes(this.skill))
      // }) ### .then doesn't work on an obsevable. If you subscribe, .map doesn't work. ###
      this.skills = skillsData;
      
        
      // console.log(data.map(skill => skill.name)); this is the array to filter


      // var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];
      // var tests = ["limit", "spray", "elite"];
      // const result = words.filter(word => tests.includes(word));
      // console.log(result);


//Maybe will need to ping db ????????????????
      // match any skills that have been previously rated and remove from skills list
      });
    }
    // /api/graph map over res.map(skill => skill.name
  // this.data.getAdminGraph({skills:''})
  ngOnInit() {
    this.listSkills();
    
  }
formData;
sendForm() {
  console.log(this.skillId.value + "BRUH");
  let formData = {
    userEmail: sessionStorage.getItem("userEmail"),
    skillId: parseInt(this.skillId.value),
    skillInterest: parseInt(this.skillInterest.value),
    skillSelfRating: parseInt(this.skillSelfRating.value)

  }
  console.log(formData);
  //Capture Data and post to DB.... /api/add-skill
  this.data.addSkill(formData)
  .then(sentForm => console.log(sentForm));
    
  
  this.skillId.setValue('')
  this.skillInterest.setValue('')
  this.skillSelfRating.setValue('')
// ###  Not writing to the database... Am I missing something with the SkillId?  ####
  
}

// public () {
//   console.log("Send Data!")
//   this.formData.sendForm("/api/add-skill", {
//   });
// }

}
