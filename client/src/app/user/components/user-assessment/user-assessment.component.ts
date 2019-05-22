import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';

@Component({
  selector: 'app-user-assessment',
  templateUrl: './user-assessment.component.html',
  styleUrls: ['./user-assessment.component.scss']
})
export class UserAssessmentComponent implements OnInit {
skills;
  constructor(private data: GetDataService) { }
  userFilter() {
    // let email = sessionStorage.getItem("userEmail") email: email
      this.data.getOneUser({ email: 'vanillaThunder@himym.com' }).then(data => {
        this.skills = data;
        // switch statement to 
        console.log(data)
        });
    }
 
  ngOnInit() {
    this.userFilter();
  }

}
