import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { LoginAuthguard } from 'src/app/core/guards/authguard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, CreateAccountComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
})
export class AuthModule { }
