import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';

@Component({
  selector: 'app-user-assessment',
  templateUrl: './user-assessment.component.html',
  styleUrls: ['./user-assessment.component.scss']
})
export class UserAssessmentComponent implements OnInit {
user;
  constructor(private data: GetDataService) { }
  userFilter() {
      this.data.getOneUser({ email:'vanillaThunder@himym.com' }).then(data => {
        this.user = data;
        // switch statement to 
        console.log(data)
        });
    }
  skills;
  skillFilter() {
    this.data.getAllUsers({searchItem: 'all'}).then(data => {
      this.skills = data;
      console.log(data);
    })
  }
  ngOnInit() {
    this.userFilter();
  }

}
