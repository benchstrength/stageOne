import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';
import { ISkill } from 'models/skill.model';

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


  constructor() { }
    
  @Input()
  set adminData(adminData: any) {
    console.log('prev value: ', this._adminData);
    console.log('got name: ', adminData);
    this._adminData = adminData;
  }

  get adminData() {
    return this._adminData;
  }

  interests = ["Not Interested", "A Little Interested", "Interested", "Very Interested"];
  abilities = ["Familiar", "Beginner/Intermediate", "Advanced", "Master/Teacher"];
 
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
