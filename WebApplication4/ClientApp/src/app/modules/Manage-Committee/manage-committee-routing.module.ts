import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCommitteesComponent } from './manage-committees/manage-committees.component';
import { NewCommitteeApproveDenyComponent } from './new-committee-approve-deny/new-committee-approve-deny.component';
import { ExistingCommitteeInfoComponent } from './existing-committee-info/existing-committee-info.component';
import { PublicFundingComponent } from './public-funding/public-funding.component';
import { MessagescreenComponent } from './messagescreen/messagescreen.component';

const routes: Routes = [
  {
    path:"manage_committee", component:ManageCommitteesComponent
  },
  {
    path:"manage_committee/approve_deny/:id", component:NewCommitteeApproveDenyComponent
  },
  {
    path:"manage_committee/existing-committee/:id/:type", component:ExistingCommitteeInfoComponent
  },
  {
    path:"manage_committee/public-funding", component:PublicFundingComponent
  },
  {
    path:"messages", component:MessagescreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCommitteeRoutingModule { }
