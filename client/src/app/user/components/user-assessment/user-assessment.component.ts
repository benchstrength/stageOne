import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';
import { ISkill } from 'models/skill.model';
import { LevelsService } from 'src/app/dataService/levels.service';

interface UserData {
  firstName: string,
  lastName: string,
  email: string,
  picture: string
  }

@Component({
  selector: 'app-user-assessment',
  templateUrl: './user-assessment.component.html',
  styleUrls: ['./user-assessment.component.scss']
})
export class UserAssessmentComponent implements OnInit, OnChanges {
  
  private _adminData: any;

  @Input() 
  private userSkills: ISkill[];


  constructor(private levels: LevelsService) { }
    
  @Input()
  set adminData(adminData: any) {
    console.log('prev value: ', this._adminData);
    console.log('got name: ', adminData);
    this._adminData = adminData;
    this.userSkills = adminData.skills;
  }

  get adminData() {
    return this._adminData;
  }

  interests = this.levels.interests;
  abilities = this.levels.abilities;
 
  ngOnInit() {
    // this.userFilter();
  }

  ngOnChanges() {
    console.log(this.userSkills);
  }
  
// public sendData() {
//   console.log("Send Data!")
//   this.___("/api/add-user", {
//   });
// }

}
