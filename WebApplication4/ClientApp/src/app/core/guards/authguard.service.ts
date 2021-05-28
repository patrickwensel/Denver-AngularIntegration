import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from './auth.service';
import { MasterDataService } from '../../configs/master-data';

@Injectable()
export class Authguard {

  constructor(private router: Router, private auth: AuthService, private masterData: MasterDataService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([this.masterData.login]);
      return false;
    }
  }

}

@Injectable()
export class LoginAuthguard {

  constructor(private router: Router, private auth: AuthService, private masterData: MasterDataService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isLoggedIn()) {
      return true;
    } else {
      // Need to do re-direction
      this.router.navigate([this.masterData.dashboard]); 
      return false;
    }
  }

}
