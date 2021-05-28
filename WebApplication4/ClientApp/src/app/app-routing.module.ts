import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authguard, LoginAuthguard } from './core/index';

//Component
import { LoginLayoutComponent } from './shared/components/login-layout/login-layout.component';
import { HomeLayoutComponent } from './shared/components/home-layout/home-layout.component';
const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    canActivate: [LoginAuthguard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path:'', loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
      }
    ]
    // loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: "lobbyist",
    component: HomeLayoutComponent,
    // canActivate: [Authguard],
    loadChildren: () => import("./modules/Lobbyist/lobbyist.module").then(m => m.LobbyistModule)
  },
  {
    path: 'profile',
    component: HomeLayoutComponent,
    // canActivate: [Authguard],
    loadChildren: () => import("./modules/Profile/profile.module").then(m => m.ProfileModule)
  },
  {
    path: "committee",
    component: LoginLayoutComponent,
    // canActivate: [Authguard],
    loadChildren: () => import("./modules/Committee/committee.module").then(m=>m.CommitteeModule)
  },
  {
    path: "switch",
    component: HomeLayoutComponent,
    canActivate: [Authguard],
    loadChildren: () => import("./modules/switch-committee/switch-committee.module").then(m=>m.SwitchCommitteeModule)
  },
  {
    path: "dashboard",
    component: HomeLayoutComponent,
    // canActivate: [Authguard],
    loadChildren: () => import("./modules/Dashboard/dashboard.module").then(m=>m.DashboardModule)
  },
  {
    path: "system",
    component: HomeLayoutComponent,

    loadChildren: () => import("./modules/System-Management/system-management.module").then(m=>m.SystemManagementModule)
  },
{
  path:"manage",
  component: HomeLayoutComponent,
  loadChildren:() => import("./modules/Manage-Committee/manage-committee.module").then(m => m.ManageCommitteeModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
