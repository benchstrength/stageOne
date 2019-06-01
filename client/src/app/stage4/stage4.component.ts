import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-stage4',
  templateUrl: './stage4.component.html',
  styleUrls: ['./stage4.component.scss']
})
export class Stage4Component implements OnInit {

  constructor(private auth: AuthService) { }

  showSkills = false;

  @Input() adminData: {
    name:string, 
    email:string, 
    picture:string
  } = {
    name: "",
    email: "",
    picture: ""
  };

 userInfo = {
   name: "",
   email: "",
   picture: ""
 };

  ngOnInit() {
    
    // load user data if it exists
    console.log(this.userInfo)
  if (sessionStorage.getItem('userEmail')) {
    this.userInfo = {
      name: sessionStorage.getItem('userName'),
      email: sessionStorage.getItem('userEmail'),
      picture: sessionStorage.getItem('userPicture')
    }
  }
  
}

  showForm() {
    this.showSkills = !this.showSkills;
  }

  theme() {
    var element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
  }
}
