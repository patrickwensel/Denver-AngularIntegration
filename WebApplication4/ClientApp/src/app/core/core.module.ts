import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services Files
import { Authguard, AuthService, LoginAuthguard, MasterDataService, MasterUrlService, ErrorMessageService, MasterRoleService, SnackbarService, LocalstorageService, LabelsAndOptions } from './index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [MasterDataService, MasterUrlService, MasterRoleService, Authguard, ErrorMessageService, AuthService, LoginAuthguard, SnackbarService, LocalstorageService, LabelsAndOptions]
})
export class CoreModule { }
