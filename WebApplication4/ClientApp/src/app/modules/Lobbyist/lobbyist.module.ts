import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { LobbyistRoutingModule } from './lobbyist-routing.module';
import { CreateAccountLobbyistComponent } from './create-account-lobbyist/create-account-lobbyist.component';
import { SelectcLComponent } from './selectc-l/selectc-l.component';
import { LobbyistRegistrationComponent } from './lobbyist-registration/lobbyist-registration.component';
import { LobbyistEmployeesComponent } from './lobbyist-employees/lobbyist-employees.component';
import { LobbyistSubcontractorsComponent } from './lobbyist-subcontractors/lobbyist-subcontractors.component';
import { LobbyistRelationshipsComponent } from './lobbyist-relationships/lobbyist-relationships.component';
import { LobbyistClientsComponent } from './lobbyist-clients/lobbyist-clients.component';
import { LobbyistSignatureComponent } from './lobbyist-signature/lobbyist-signature.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
@NgModule({
  declarations: [CreateAccountLobbyistComponent, SelectcLComponent, LobbyistRegistrationComponent, LobbyistEmployeesComponent, LobbyistSubcontractorsComponent, LobbyistRelationshipsComponent, LobbyistClientsComponent, LobbyistSignatureComponent],
  imports: [
    CommonModule,
    LobbyistRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
})
export class LobbyistModule { }
