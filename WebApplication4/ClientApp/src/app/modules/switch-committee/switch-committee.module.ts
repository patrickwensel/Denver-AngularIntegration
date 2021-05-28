import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwitchCommitteeRoutingModule } from './switch-committee-routing.module';
import { SwitchCommitteeComponent } from './switch-committee/switch-committee.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
@NgModule({
  declarations: [SwitchCommitteeComponent],
  imports: [
    CommonModule,
    SwitchCommitteeRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class SwitchCommitteeModule { }
