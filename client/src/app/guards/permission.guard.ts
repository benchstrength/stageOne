import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetDataService } from '../dataService/get-data.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements  CanActivate {
  constructor(private router: Router, private data: GetDataService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url 
    return this.checkLogin(url);
  }

  checkLogin(url: string): any {
    // console.log(this.auth.isAuthenticated());
    this.data.checkPermissions({email: sessionStorage.getItem("userEmail")}).then(perm => {
       if (perm) {
        return true
       } else {
         this.router.navigate(["/unauthorized"])
         return false
       }
    })
  }

}
