import { Component, OnInit, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { GetDataService } from '../dataService/get-data.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  @Input("searchType") searchType: string;

  constructor(private data: GetDataService) { }


  users: any = [
    {email: "auntrobin@himym.com",
      name: "Robin	Scherbatsky",
    skills: ["nothing"]
  },
    {email: "bartender@himym.com",
      name:	"Carl	McLaren",
    skills: ["jquery", "javascript", "css"]
  },
    {email: "circleofscreaming@himym.com",
      name:	"Arthur	Hobbs",
      skills: ["Angular", "React", "MySql"]
    },
  ]

  ngOnInit() {
    if (this.searchType = "allusers") {
      console.log(this.searchType)
      this.data.getAllUsers({searchItem: "all"}).then(data => {
      this.users = data
      console.log(this.users);
    });
    } else if (this.searchType = "skills") {
      console.log(this.searchType)
      // this.data.getUserBySkill({skill: ["jQuery"]}).then(data => {
      // this.users = data
      // });
    }


  }

}
