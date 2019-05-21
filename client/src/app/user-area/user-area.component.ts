import { Component, OnInit, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { GetDataService } from '../dataService/get-data.service';

interface Skill {
  skillId: number,
  skillName: string,
  perceived: number,
  accurate: number,
  interest: number
};

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  @Input("searchType") searchType: string;

  searchInput: string = "";

  _skillFilter: string;
  get skillFilter(): string {
    return this._skillFilter;
  }
  set skillFilter(value: string) {
    this._skillFilter = value;
    this.filteredSkills = this.skillFilter ? this.performFilter(this.skillFilter) : this.skills;
  }

  filteredSkills: Skill[];
  skills: Skill[] = [
    {
      "skillId": 1,
      "skillName": "html/css",
      "perceived": 73,
      "accurate": 32,
      "interest": 71
    },
    {
      "skillId": 2,
      "skillName": "react",
      "perceived": 89,
      "accurate": 21,
      "interest": 43
    },
    {
      "skillId": 3,
      "skillName": "angular",
      "perceived": 71,
      "accurate": 53,
      "interest": 22
    },
    {
      "skillId": 4,
      "skillName": "jquery",
      "perceived": 43,
      "accurate": 63,
      "interest": 34
    },
    {
      "skillId": 5,
      "skillName": "typescript",
      "perceived": 22,
      "accurate": 62,
      "interest": 45
    },
    {
      "skillId": 6,
      "skillName": "scss/less",
      "perceived": 34,
      "accurate": 74,
      "interest": 56
    },
    {
      "skillId": 7,
      "skillName": "webpack",
      "perceived": 45,
      "accurate": 24,
      "interest": 67
    },
    {
      "skillId": 8,
      "skillName": "node",
      "perceived": 56,
      "accurate": 35,
      "interest": 78
    },
    {
      "skillId": 9,
      "skillName": "express", 
      "perceived": 67,
      "accurate": 73,
      "interest": 89
    }
  ]


  constructor(private data: GetDataService) { }

  performFilter(filterBy: string): Skill[] {
    let searchArr = filterBy.split(",").map(elem => elem.toLocaleLowerCase());
    console.log(searchArr)
    // filterBy = filterBy.forEach(elem => {
    //   return elem.toLocaleLowerCase();
    // })
    // filterBy = filterBy.toLocaleLowerCase();
    // let filtered: any[] = searchArr.forEach(elem => {
    //   this.skills.filter((user: Skill) => user.skillName.toLocaleLowerCase().indexOf(elem) !== -1)
    // })

    let filterfy: any[] = this.skills.filter((user: Skill) => {
      searchArr.forEach((elem) => user.skillName.toLocaleLowerCase().indexOf(elem) !== -1)
    })
    let filterfy = 
    // console.log(filtered);
    console.log(filterfy)
    return this.skills.filter((product: Skill) =>
      product.skillName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  users: any = [
    {email: "auntrobin@himym.com",
      name: "Robin	Scherbatsky",
    skills: ["nothing"]
  },
    {email: "bartender@himym.com",
      name:	"Carl	McLaren",
    skills: ["jquery", "javascript", "css"]
  },
    {email: "circleofscreaming@himym.com",
      name:	"Arthur	Hobbs",
      skills: ["Angular", "React", "MySql"]
    },
  ]

  ngOnInit() {
    if (this.searchType = "allusers") {
      console.log(this.searchType)
      this.data.getAllUsers({searchItem: "all"}).then(data => {
      this.users = data
      console.log(this.users);
    });
    } else if (this.searchType = "skills") {
      console.log(this.searchType)
      // this.data.getUserBySkill({skill: ["jQuery"]}).then(data => {
      // this.users = data
      // });
    }


  }

}
