import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from 'models/user.model';
import { Observable, Subject } from 'rxjs';
import { GetDataService } from 'src/app/dataService/get-data.service';
import { debounceTime, distinctUntilChanged, switchMap, filter, map } from 'rxjs/operators';
import { ISkill } from 'models/skill.model';

@Component({
  selector: 'app-skill-search',
  templateUrl: './skill-search.component.html',
  styleUrls: ['./skill-search.component.scss']
})
export class SkillSearchComponent implements OnInit {

  private skills$: Observable<ISkill[]>;
  private searchedSkills: string[] = [];

  private searchTerms = new Subject<string>();

  private focused: boolean;
  
  @Output() addSearchTerm = new EventEmitter();
  
  searchValue: string = '';

  constructor(private dataService:GetDataService) { }

  search(term:string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.skills$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.dataService.getSkillMatches(term.trim()).pipe(
          map(skillArray => skillArray.filter( skill => {
            return !this.searchedSkills.includes(skill.name.toLowerCase())
          }))
        );
      })
    )
  }

  delayUnfocus() {
    setTimeout(() => this.focused = false, 200);
  }

  addSkillToSearch(skillId: number, skillName: string) {

    this.searchValue = '';

    this.searchedSkills.push(skillName.toLowerCase());

    let skillSearchObj = {
      skillId,
      skillName
    }

    this.addSearchTerm.emit(skillSearchObj);

  }


}
