import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  showSkills: boolean = false;

  ngOnInit() {
    
  }

  showForm() {
    this.showSkills = !this.showSkills;
  }

  theme() {
    var element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
  }

}
