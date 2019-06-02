import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor() { }

    private _interests = ["Not Interested", "A Little Interested", "Interested", "Very Interested"];
    private _abilities = ["Familiar", "Beginner/Intermediate", "Advanced", "Master/Teacher"];

    get interests() {
      return this._interests;
    };

    get abilities() {
      return this._abilities;
    }

}
