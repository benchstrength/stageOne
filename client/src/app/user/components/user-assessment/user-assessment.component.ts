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
    //######## NEED to add this next line for Session storage match
    // let email = sessionStorage.getItem("userEmail") 
    //###### Need to put in:  ({email: email}) replacing vanillaThunder as well
    
      this.data.getOneUser({ email: 'vanillaThunder@himym.com' }).then(data => {
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
