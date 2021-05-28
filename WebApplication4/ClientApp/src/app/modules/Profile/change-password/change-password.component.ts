import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/core/api-services/client.service';
import { Router } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { CommonMethods, MasterDataService, ErrorMessageService, MasterUrlService, SnackbarService, LocalstorageService } from 'src/app/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  frmchangepwd: FormGroup;
  email = '';
  submitted: boolean;
  data: any = {};
  pshow = true;
  pshowcnfm = true;
  hideconfm = false;
  hide = true;
  passwordCompare: boolean;
  static_data: any;
  hideRequiredMarker = true;




  constructor(
    private fb: FormBuilder,
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    private urlService: MasterUrlService,
    public snackbar: SnackbarService,
    public router: Router,
    private localStore: LocalstorageService,

  ) {
    this.commonMethods.setCurrentLanguage();
    this.data = this.commonMethods.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.initChangePwdForm();
    this.static_data = this.commonMethods.getCurrentLanguage();

  }
  get f() { return this.frmchangepwd.controls; }
  initChangePwdForm() {
    this.frmchangepwd = this.fb.group({
      newpassword: [
        "",
        [
          Validators.required,
          Validators.pattern(this.masterDate.password),
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
      confirmpassword: [
        "",
        [
          Validators.required,
          Validators.pattern(this.masterDate.password),
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],   
      oldpassword: [
        "",
        [
          Validators.required,
          Validators.pattern(this.masterDate.password),
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],  
    })
  }

  comparePassword() {
    const password = this.frmchangepwd.value.newpassword;
    const confirmpassword = this.frmchangepwd.value.confirmpassword;
    if (password || confirmpassword) {
      if (password === confirmpassword) {
        this.passwordCompare = false;
        console.log('1', this.passwordCompare);
      } else {
        this.passwordCompare = true;
        console.log('2', this.passwordCompare);
      }
    } else {
      this.passwordCompare = true;
    }
  }

  changePassword(): void {
    this.submitted = true;
    const userid = this.localStore.getLocalStorage('userId');
    const changePasswordBody = {
      userId: userid,
      password: this.frmchangepwd.value.newpassword,
      confirmpassword: this.frmchangepwd.value.confirmpassword,
      oldPassword: this.frmchangepwd.value.oldpassword
    };
    if (this.frmchangepwd.invalid) {
      if (this.frmchangepwd.value.newpassword.valid) {
      }
      return this.frmchangepwd.markAllAsTouched();
    }
    this.service.postData(this.urlService.resetPassword, changePasswordBody).subscribe((res: any) => {
      if (res.hasError) {
        if (res.message) {
          return this.snackbar.snackbarError(res.message, 'center');
        } else {
          return this.snackbar.snackbarError(this.masterDate.errorMsg, 'center');
        }
      } else {
        this.snackbar.snackbarError(res.message, 'center');
        this.router.navigate([this.masterDate.login]);
      }
    }, err => {
      if (err && err.hasError) {
        this.snackbar.snackbarError(err.message || this.masterDate.errorMsg, 'center');
      } else {
        this.snackbar.snackbarError(this.masterDate.errorMsg, 'center');
      }
    });
    // this.service
    //   .postData(this.urlService.resetPassword, )
    //   .subscribe((res: any) => {
    //     this.confirmSubmit = res[0];
    //     console.log(this.confirmSubmit);
    //   });
  }

}
