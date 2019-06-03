import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from 'models/user.model';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-developer-search',
  templateUrl: './developer-search.component.html',
  styleUrls: ['./developer-search.component.scss']
})
export class DeveloperSearchComponent implements OnInit {

  @Input() developers: IUser[];

  private developers$: Observable<IUser[]>;
  private searchTerms = new Subject<string>();

  @Output() foundDeveloper = new EventEmitter();

  searchValue: string = '';

  constructor() { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  delayUnfocus() {}

  ngOnInit() {
    this.developers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        term = term.trim().toLowerCase();
        console.log(this.developers.filter(developer => developer.firstName.toLowerCase().startsWith(term.toLowerCase()) || developer.lastName.toLowerCase().startsWith(term.toLowerCase())));
        return this.developers.filter(developer => developer.firstName.toLowerCase().startsWith(term) || developer.lastName.toLowerCase().startsWith(term))
    }));
  }

}
