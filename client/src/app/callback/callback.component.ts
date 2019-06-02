import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GetDataService } from '../dataService/get-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private data: GetDataService,
              private router: Router) { }

  ngOnInit() {
    console.log("hi")
    console.log(sessionStorage.getItem("userEmail"))
    this.getPerms();
  }


  getPerms() {
    if (sessionStorage.getItem("userEmail")) {
      this.data.checkPermissions().then((perm: any) => {
        console.log(perm)
        if (perm.role === 'admin'|| 'super-admin') {
          console.log(perm.role)
          this.router.navigate(['/admin']);
        } else if (perm.role === 'user') {
          console.log(perm.role)

          this.router.navigate(['/user']);
        } else {
          console.log(perm.role)
          // this.router.navigate(['/login']);        
        }
      });
    } else {
      console.log(sessionStorage.getItem("userEmail"));
      setTimeout(() => this.getPerms(), 300);
    }
  }

}
