import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ISkill } from 'models/skill.model';
import { GetDataService } from 'src/app/dataService/get-data.service';
import { IUser } from 'models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  private showSkills: boolean = false;
  private unskilled: ISkill[];
  private skills: ISkill[];
  private userEmail: string;

  constructor(private auth: AuthService, private data: GetDataService) {
    this.userEmail = sessionStorage.getItem("userEmail");
   }

  ngOnInit() {

    this.data.getAdminGraph({skill: []})
      .then(skillsData => {
        this.data.getOneUser({email: this.userEmail})
        .then(data => {
          this.skills = (data as IUser).Skills;
          let skillNames = this.skills.map(skill => skill.name);
          console.log(this.skills);
          this.unskilled = skillsData.filter(skill => {
            return !skillNames.includes(skill.name);
          });
        });
      });

  }

  private updateSkills(addedSkill): void {
    console.log(addedSkill);
    this.unskilled = this.unskilled
      .filter(skill => skill.id !== addedSkill.SkillId);
    this.skills.push({
      name: addedSkill.skill.name,
      id: addedSkill.skill.id,
      isActive: addedSkill.skill.isActive,
      required: addedSkill.skill.required,
      user_skill:{
        interest: addedSkill.user_skill.interest,
        self_rating: addedSkill.user_skill.self_rating,
        employer_rating: addedSkill.user_skill.employer_rating
      }
    } as ISkill);
  }

  showForm() {
    this.showSkills = !this.showSkills;
  }

  theme() {
    var element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
  }

}
