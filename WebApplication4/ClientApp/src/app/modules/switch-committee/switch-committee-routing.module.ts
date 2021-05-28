import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwitchCommitteeComponent } from './switch-committee/switch-committee.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "",
        component: SwitchCommitteeComponent
      },
      {
        path: "nav-switch",
        component: SwitchCommitteeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwitchCommitteeRoutingModule { }
