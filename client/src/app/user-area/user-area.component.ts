import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../dataService/get-data.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
 
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  search$: Observable<any>;

  private searchTerms = new Subject<string>();

  @Input("searchType") searchType: string;

  search(term: string): void {
    this.searchTerms.next(term);
  }

  // searchInput: string = "";

  searchWords = new FormControl('') 

  filteredList: any;


  constructor(private data: GetDataService) { }

  // performFilter(): void {
  //   let searchArr = this.searchWords.value.split(" ");
  //   let filtered;
  //   if (this.searchType === "skills") {
  //     // Search for users by skill
  //     console.log(searchArr)
  //     if (searchArr[0] === "" || searchArr[0] === " ") {
  //       this.allUsers();
  //     } else {
  //       this.data.getUserBySkill({skills: searchArr}).then(users => {
  //         filtered = users;
  //         console.log(users)
  //         return this.filteredList = filtered;
  //         });
  //     }
  //   } else if (this.searchType === "users") {
  //     // Search for users by name
  //     if (searchArr[0] === "" || searchArr[0] === " ") {
  //       this.allUsers();
  //     } else {
  //       let userName = {
  //         firstName: searchArr[0],
  //         lastName: searchArr[1]
  //       }
  //       this.data.getUsersByName(userName).then(users => {
  //         filtered = users;
  //         console.log(users)
  //         return this.filteredList = filtered;
  //         });
  //     }
  //   }
  // }

allUsers() {
  this.data.getAllUsers({searchItem: "all"}).then(data => {
    this.filteredList = data
    console.log(data);
  });
};

  ngOnInit() {
    // this.allUsers();
    // console.log(`Search Type: ${this.searchType}`);
    // console.log(this.searchType === "skills");

    this.search$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.data.searchHeroes(term)), 
    );
  };

}
