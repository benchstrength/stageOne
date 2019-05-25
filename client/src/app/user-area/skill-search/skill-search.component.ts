import { Component, OnInit } from '@angular/core';
import { IUser } from 'models/user.model';
import { Observable, Subject } from 'rxjs';
import { GetDataService } from 'src/app/dataService/get-data.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ISkill } from 'models/skill.model';

@Component({
  selector: 'app-skill-search',
  templateUrl: './skill-search.component.html',
  styleUrls: ['./skill-search.component.scss']
})
export class SkillSearchComponent implements OnInit {

  private skills$: Observable<ISkill[]>;

  private searchTerms = new Subject<string>();

  constructor(private dataService:GetDataService) { }

  search(term:string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.skills$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.dataService.getAllSkills())
    )
  }

}
