import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitteeRegistrationComponent } from './committee-registration/committee-registration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "committee-registration",
        component: CommitteeRegistrationComponent
      },
      {
        path: "committee-registration/:userId/:userType",
        component: CommitteeRegistrationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitteeRoutingModule { }
