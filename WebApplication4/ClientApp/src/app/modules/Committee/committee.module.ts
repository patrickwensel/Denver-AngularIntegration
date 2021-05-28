import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitteeRoutingModule } from './committee-routing.module';
import { CommitteeRegistrationComponent } from './committee-registration/committee-registration.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [CommitteeRegistrationComponent],
  imports: [
    CommonModule,
    CommitteeRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class CommitteeModule { }
