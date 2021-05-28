import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonMethods, ErrorMessageService, MasterDataService, SnackbarService, MasterUrlService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  frmForgot: FormGroup
  email = '';
  submitted: boolean;
  data: any = {};
  constructor(
    private fb: FormBuilder,
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    public snackbar: SnackbarService,
    private service: ClientService,
    public router: Router,
    private urlService: MasterUrlService,
  ) {

  }

  ngOnInit(): void {
    this.initForgotPasswordForm();
    this.commonMethods.setCurrentLanguage();
    this.data = this.commonMethods.getCurrentLanguage();
  }
  get f() { return this.frmForgot.controls; }
  initForgotPasswordForm() {
    this.frmForgot = this.fb.group({
      email: [this.email, [Validators.required, Validators.email, Validators.maxLength(50),
      Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]],
    })
  }
  resetLink() {
    this.submitted = true;
    const email = this.frmForgot.value.email;

    if (this.frmForgot.invalid) {

      return this.frmForgot.markAllAsTouched();
    }

    this.service.postDataParams(this.urlService.forgotPassword+ '?EmailId=' +  email, {}).subscribe((res: any) => {
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
  }

  goBack(){
  this.router.navigate(['/login']);
  }
}
