import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';

interface UserData {
  firstName: string,
  lastName: string,
  email: string,
  picture: string
  }

@Component({
  selector: 'app-user-assessment',
  templateUrl: './user-assessment.component.html',
  styleUrls: ['./user-assessment.component.scss']
})
export class UserAssessmentComponent implements OnInit {
skills;
  constructor(private data: GetDataService) { }
  
@Input() adminData: UserData;

  userFilter() {
    //######## NEED to add this next line for Session storage match
    // let email = sessionStorage.getItem("userEmail") 
    //###### Need to put in:  ({email: email}) as well
    let email: string;
    if (this.adminData) {
      email = this.adminData.email
      console.log(email)  
    } else {
      email = sessionStorage.getItem("userEmail")
      console.log(email)  
    }
    this.data.getOneUser({ email: email }).then(data => {
      console.log(email)  
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
