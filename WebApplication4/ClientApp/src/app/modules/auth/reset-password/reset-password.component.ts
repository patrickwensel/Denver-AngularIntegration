import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonMethods, MasterDataService, ErrorMessageService, MasterUrlService, SnackbarService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  frmresetpwd: FormGroup;
  id: number;
  submitted: boolean;
  data: any = {};
  pshow = true;
  pshowcnfm = true;
  hideconfm = true;
  hide = true;
  passwordCompare = false;
  hideRequiredMarker = true;
  // tslint:disable-next-line:variable-name
  static_data: any;

  constructor(
    private fb: FormBuilder,
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    private urlService: MasterUrlService,
    private activeroute: ActivatedRoute,
    public snackbar: SnackbarService,
    public router: Router
  ) {

    this.activeroute?.queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        // this.page = +params['page'] || 0;
        this.id = params.id;
        // console.log('mydate', this.repid);
      });
  }

  ngOnInit(): void {

    this.initForgotPasswordForm();
    this.commonMethods.setCurrentLanguage();
    this.data = this.commonMethods.getCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();

  }
  get f() { return this.frmresetpwd.controls; }
  initForgotPasswordForm(): void {
    this.frmresetpwd = this.fb.group({
      newpassword: [
        '',
        [
          Validators.required,
          Validators.pattern(this.masterDate.password),
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
      confirmpassword: [
        '',
        [
          Validators.required,
          Validators.pattern(this.masterDate.password),
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  comparePassword(): void {
    this.submitted = true;
    const password = this.frmresetpwd.value.newpassword;
    const confirmpassword = this.frmresetpwd.value.confirmpassword;
    console.log('password', password);
    console.log('cnfrm pwd', confirmpassword);
    console.log('result', password === confirmpassword);
    if (password && confirmpassword) {
      if (password === confirmpassword) {
        this.passwordCompare = false;
      } else {
        this.passwordCompare = true;
      }
    } else {
      this.passwordCompare = true;
    }
  }

  resetPassword(): void {
    this.submitted = true;
    const y: number = +this.id;
    const resetPassword = {
      userId: y,
      password: this.frmresetpwd.value.newpassword,
      confirmpassword: this.frmresetpwd.value.confirmpassword,
      oldPassword: ''
    };
    if (this.frmresetpwd.invalid) {
      if (this.frmresetpwd.value.newpassword.valid) {
      }
      this.frmresetpwd.markAllAsTouched();
    }
    if (this.frmresetpwd.valid) {

      this.service.postData(this.urlService.resetPassword, resetPassword).subscribe((res: any) => {
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


}
