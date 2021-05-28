import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DashboardRoutingModule } from './dashboard-routing';
import { CandidatedashboardComponent } from './candidatedashboard/candidatedashboard.component';
import { LobbydashboardComponent } from './lobbydashboard/lobbydashboard.component';


@NgModule({
  declarations: [  CandidatedashboardComponent, LobbydashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
