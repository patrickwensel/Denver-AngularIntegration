import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatedashboardComponent } from './candidatedashboard/candidatedashboard.component';
import { LobbydashboardComponent } from './lobbydashboard/lobbydashboard.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "candidate",
        component: CandidatedashboardComponent
      },
      {
        path: "lobby",
        component: LobbydashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
