import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountLobbyistComponent } from './create-account-lobbyist/create-account-lobbyist.component';
import { LobbyistRegistrationComponent } from './lobbyist-registration/lobbyist-registration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path : 'createlobbyist', component : CreateAccountLobbyistComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyistRoutingModule { }
