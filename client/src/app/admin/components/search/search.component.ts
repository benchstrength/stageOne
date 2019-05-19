import { Component, OnInit } from '@angular/core';
import { Skill } from './skill';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  pageTitle: string = "Skills";
  searchInput: string = "";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

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

  constructor() {
    this.filteredSkills = this.skills;
    this.skillFilter = "";
  }

  performFilter(filterBy: string): Skill[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.skills.filter((product: Skill) =>
      product.skillName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
 
  ngOnInit() {
  }

}
