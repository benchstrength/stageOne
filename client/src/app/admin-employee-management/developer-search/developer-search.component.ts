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

  displayResults = false;
  searchValue: string = '';

  constructor() { }

  search(term: string): void {
    this.displayResults = term.trim() ? true : false;
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
        return new Observable(subscriber => {
          if(term) {
            subscriber.next(this.developers.filter(
              developer => developer.firstName.toLowerCase().startsWith(term) || 
              developer.lastName.toLowerCase().startsWith(term) ||
              developer.email.toLowerCase().startsWith(term)));
          }
          else
            subscriber.next([]);
          subscriber.complete();
        });
    }));
  }

  findDeveloper(developerId) {

    console.log(developerId);

    this.searchValue = '';
    this.displayResults = false;

    this.foundDeveloper.emit(developerId);
  }

}
