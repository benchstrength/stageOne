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
    //######## NEED this next line for Session storage match
    let email = sessionStorage.getItem("userEmail") 
    //###### Need to put in:  ({email: email}) replacing vanillaThunder@himym.com as well
    //
    
      this.data.getOneUser({ email: email }).then(data => {
        this.skills = data;
        // switch statement to 
        console.log(data)
        });
    }
 
  ngOnInit() {
    this.userFilter();
  }
// public sendData() {
//   console.log("Send Data!")
//   this.___("/api/add-user", {
//   });
// }

}
