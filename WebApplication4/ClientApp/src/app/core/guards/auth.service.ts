import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MasterDataService } from '../../configs/master-data';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { SessionstorageService } from '../sessionstorage/sessionstorage.service';
// import { closeAllModal } from '../services/Shared-services';
// import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private masterData: MasterDataService,
    private localStorage: LocalstorageService,
    private sessionStorage: SessionstorageService,
    // private closeMdoal: closeAllModal,
    // private dialogRef: MatDialog
  ) { }
  sendToken(token: string) {
    this.localStorage.setLocalStorage(this.masterData.token, token);
    // this.sessionStorage.setItemSessionStorage(this.masterData.token, token);
  }
  getToken() {
    return this.localStorage.getLocalStorage(this.masterData.token);
    // return this.sessionStorage.getItemSessionStorage(this.masterData.token);
  }
  isLoggedIn() {
    return (this.getToken()) ? true : false;
  }
  logout() {
    // this.closeMdoal.closeAllModal();
    this.localStorage.clearAllStorage();
    // this.dialogRef.closeAll();
    // this.sessionStorage.removeItemSessionStorage(this.masterData.token);
    this.router.navigate([this.masterData.login]);
  }
}
