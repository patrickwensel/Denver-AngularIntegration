import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
  declarations: [ ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    ProfileRoutingModule,

  ]
})
export class ProfileModule { }
