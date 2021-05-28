import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemManagementRoutingModule } from './system-management-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ManagementComponent } from './management/management/management.component';
import { UserPermissionComponent } from './management/user-permission/user-permission.component';
import { BallotMeasuresComponent } from './management/ballot-measures/ballot-measures.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CommiteeTypeComponent } from './management/commitee-type/commitee-type.component';
import { OfficesComponent } from './management/offices/offices.component';
import { ContributionLimitsComponent } from './management/contribution-limits/contribution-limits.component';
import { MatchingLimitComponent } from './management/matching-limit/matching-limit.component';
import { ModifyFormsComponent } from './management/modify-forms/modify-forms.component';


@NgModule({
  declarations: [ManagementComponent, UserPermissionComponent, BallotMeasuresComponent, CommiteeTypeComponent, OfficesComponent, ContributionLimitsComponent, MatchingLimitComponent, ModifyFormsComponent],
  imports: [
    CommonModule,
    SystemManagementRoutingModule,
    MaterialModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class SystemManagementModule { }
