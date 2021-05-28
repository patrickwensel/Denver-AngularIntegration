import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from "src/app/core";
import { ClientService } from 'src/app/core/api-services/client.service';
import { ConfirmationScreenComponent } from 'src/app/shared/components/confirmation-screen/confirmation-screen.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hideRequiredMarker= true;
  showInformation= true;
  showPassword = false;
  showcommitee = false;
  showUsertype = false;
  pshow = true;
  email = '';
  submitted= false;
  frmLogin: FormGroup;
  data: any = {};
  subscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    public dialog: MatDialog,
    public router: Router,
    public urlService: MasterUrlService,
    public service: ClientService,
    private snackbar: SnackbarService,
    private localStore: LocalstorageService,

  ) {

  }
  ngOnInit() {
    this.initLoginForm();
    this.commonMethods.setCurrentLanguage();
    this.data = this.commonMethods.getCurrentLanguage();
    this.showInformation = true
  }
  // get f() { return this.frmLogin.controls; }
  initLoginForm() {
    this.frmLogin = this.fb.group({
      email: [this.email, [Validators.required, Validators.email, Validators.maxLength(50),
      Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]],
      password: ["", [Validators.required,
      //  Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'),
      // Validators.minLength(18),
      Validators.maxLength(50)]]
    });
  }
  // createInformation() {
  //   this.showInformation = true;
  //   this.showPassword = false;
  //   this.showcommitee = false;
  //   this.showUsertype = false;
  // }
  // createPassword() {
  //   this.showInformation = false;
  //   this.showPassword = true;
  //   this.showcommitee = false;
  //   this.showUsertype = false;
  // }
  // chooseUsertype() {
  //   this.showUsertype = true;
  //   this.showInformation = false;
  //   this.showPassword = false;
  //   this.showcommitee = false;
  // }
  // createCommitee() {
  //   this.showInformation = false;
  //   this.showPassword = false;
  //   this.showcommitee = true;
  //   this.showUsertype = false;
  // }
  login() {
    this.submitted = true;
    let { email, password } = this.frmLogin.value;
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }

    if (this.frmLogin.invalid) {

      this.frmLogin.markAllAsTouched();
      return this.snackbar.snackbarError('Please enter Email and Password', 'center');;

    }

    // {"emailid":"prakash.raju@augustahitech.com","password":"123456"}
    this.subscribe = this.service.postData(this.urlService.loginUrl, { emailId: email.trim(), password: password.trim() }).subscribe((res) => {
      if (res.hasError) {
        if (res.message) {
          return this.snackbar.snackbarError(res.message, 'center');
        } else {
          return this.snackbar.snackbarError(this.masterDate.invalidLogin, 'center');
        }
      } else {
        console.log('==> resonse', res);
        this.localStore.setLocalStorage('email', email);
        this.localStore.setLocalStorage(this.masterDate.userId, res.userId);
        this.localStore.setLocalStorage('user_type',  res.userType);
        // Need to handle token once API Provided, Currently hardcoded
        // this.localStore.setLocalStorage(this.masterDate.token, res.token_type + ' ' + res.access_token);
        this.localStore.setLocalStorage(this.masterDate.token, 'Bearer AbCdEf123456');
        //  this.getUserDetails(res.pkId);
        // const checknow = this.localStore.getLocalStorage('userType');
        // console.log('===>>', checknow);
        if(this.localStore.getLocalStorage('user_type') == 'Admin') {
          this.router.navigate([this.masterDate.manageCommittee]);
        } else {
          this.checkForUserExistingCommitteandLobby(res.userId);
        }
        // this.router.navigate([this.masterDate.dashboard]);
      }
    }, (err: any) => {
      if (err && err.hasError) {
        this.snackbar.snackbarError(err.message || this.masterDate.errorMsg, 'center');
      } else {
        this.snackbar.snackbarError(this.masterDate.errorMsg, 'center');
      }
    });
  }
  routeToAccount() {
    this.router.navigate(['/createaccount'])
  }

  gotoForgot() {
    this.router.navigate(['/forgotpassword']);
  }
  getUserDetails(_userId: any){
    // Need to get User Detail
    this.subscribe = this.service.postData(this.urlService.getUserDetailUrl, {}).subscribe((res) => {
      if (res.hasError) {
        if (res.message) {
          return this.snackbar.snackbarError(res.message, 'center');
        }
      }
      this.localStore.setLocalStorage(this.masterDate.userDetail, res.user);
    });
  }

  checkForUserExistingCommitteandLobby(userId: any) {
    this.service.postData(`${this.urlService.CommitteeLobbyList}${userId}`,{}).subscribe((res) => {
      if (res && res[0]) {
        let resDate = res[0];
        this.localStore.setLocalStorage('user_type', resDate.userType);
        if ((resDate.committeelist.length > 0) && (resDate.lobbyistlist.length > 0)) {
      this.localStore.setLocalStorage('fromlogin', true);
          this.router.navigate([this.masterDate.switchScreen]);
        } else if ((resDate.committeelist.length > 0 && (resDate.committeelist.length > 1) || (resDate.lobbyistlist.length > 0 && resDate.lobbyistlist.length > 1))) {
      this.localStore.setLocalStorage('fromlogin', true);
          this.router.navigate([this.masterDate.switchScreen]);
        } else if ((resDate.committeelist.length > 0)) {
          this.localStore.setLocalStorage('choosen_id', resDate.committeelist[0].committeeID);
          this.localStore.setLocalStorage('user_chosen', 'committee');
          this.router.navigate([this.masterDate.dashboard]);
        } else if ((resDate.lobbyistlist.length > 0)) {
          this.localStore.setLocalStorage('choosen_id', resDate.lobbyistlist[0].lobbyistID);
          this.localStore.setLocalStorage('user_chosen', 'Lobbyist');
          this.router.navigate([this.masterDate.lobbyDashboard]);
        } else if ((resDate.ielist.length > 0)) {
          this.localStore.setLocalStorage('choosen_id', resDate.ielist[0].IndependentSpenderID);
          this.localStore.setLocalStorage('user_chosen', 'ie');
          this.router.navigate([this.masterDate.dashboard]);
        } else {
          // Needed default dashboard to redirect
          this.localStore.setLocalStorage('isnoentity', 'true');
          this.router.navigate([this.masterDate.dashboard]);
        }
      }

    })
  }
}
