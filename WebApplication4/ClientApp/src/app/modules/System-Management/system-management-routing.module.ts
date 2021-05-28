import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BallotMeasuresComponent } from './management/ballot-measures/ballot-measures.component';
import { CommiteeTypeComponent } from './management/commitee-type/commitee-type.component';
import { ContributionLimitsComponent } from './management/contribution-limits/contribution-limits.component';
import { ManagementComponent } from './management/management/management.component';
import { MatchingLimitComponent } from './management/matching-limit/matching-limit.component';
import { ModifyFormsComponent } from './management/modify-forms/modify-forms.component';
import { OfficesComponent } from './management/offices/offices.component';
import { UserPermissionComponent } from './management/user-permission/user-permission.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "Management",
        component: ManagementComponent
      },
      {
        path: "Management/ballot-issue",
        component: BallotMeasuresComponent
      },
      {
        path: "Management/commitee-type",
        component: CommiteeTypeComponent
      },
      {
        path: "Management/offices",
        component: OfficesComponent
      },
      {
        path: "Management/contribution",
        component: ContributionLimitsComponent
      },
      {
        path: "Management/public-funding",
        component: MatchingLimitComponent
      },
      {
        path: "Management/User-permission",
        component: UserPermissionComponent
      },
      {
        path: "Management/modify-forms",
        component: ModifyFormsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemManagementRoutingModule { }
