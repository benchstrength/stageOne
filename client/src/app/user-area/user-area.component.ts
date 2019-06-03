import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../dataService/get-data.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
 
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IUser } from 'models/user.model';
import { LevelsService } from '../dataService/levels.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  skillsArray: { 
    skillId: number,
    skillName: string
  }[] = [];

  search: IUser[];
  
  constructor(private data: GetDataService,
              private levels: LevelsService) { }

  abilities = this.levels.abilities;
  interests = this.levels.interests;


  expandSearch(eventObj) {
    this.skillsArray.push(eventObj);
    this.data.getUserBySkill({
      skills: this.skillsArray.map(skill => skill.skillId)
    }).subscribe(data => {
      console.log(data);
      this.search = data as IUser[];
    });
  }



  ngOnInit() {
    this.data.getAllUsers("all").then(users => {
      console.log(users);
    });
  };

}
