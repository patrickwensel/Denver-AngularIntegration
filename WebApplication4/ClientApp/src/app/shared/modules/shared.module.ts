import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// pipes
import { AgeCalculatorPipe } from '../pipes/age-calculator.pipe';


// directives
import { SelectCreateCommiteeLobbyComponent } from './../../shared/components/select-create-commitee-lobby/select-create-commitee-lobby.component';
import { SearchCommitteeLobbyistComponent } from './../../shared/components/search-committee-lobbyist/search-committee-lobbyist.component';
import { SelectListCommitteeLobbyistComponent } from './../../shared/components/select-list-committee-lobbyist/select-list-committee-lobbyist.component';
import { KeyPreventDirective } from '../directives/prevent-key-typing.directive';
import { CommitteeContactInformationComponent } from './../../shared/components/committee-contact-information/committee-contact-information.component';
import { CommitteeManageOfficeComponent } from './../../shared/components/committee-manage-office/committee-manage-office.component';
import { CommitteeInformationComponent } from '../components/committee-information/committee-information.component';
import { BankInformationComponent } from '../components/bank-information/bank-information.component';
import { CommitteRegistrationSuccessComponent } from '../components/committe-registration-success/committe-registration-success.component';
import { DeleteModalComponent } from '../components/delete-modal/delete-modal.component';
import { ConfirmationScreenComponent } from '../components/confirmation-screen/confirmation-screen.component';
import { ConfirmPopupComponent } from '../components/confirm-popup/confirm-popup.component';
import { ClickOutsideDirective } from '../directives/clicked-outside.directive';
import { RegisterJoinCommitteeComponent } from '../components/register-join-committee/register-join-committee.component';
import { CurrentCommitteeInformationComponent } from '../components/current-committee-information/current-committee-information.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrentCommitteeContactInformationComponent } from '../components/current-committee-contact-information/current-committee-contact-information.component';
import { CurrentCommitteeBankInformationComponent } from '../components/current-committee-bank-information/current-committee-bank-information.component';
import { CurrentCommitteeOfficerInformationComponent } from '../components/current-committee-officer-information/current-committee-officer-information.component';

import { IndipendentExpenditureComponent } from '../components/indipendent-expenditure/indipendent-expenditure.component';
import { NavigatescreenComponent } from '../components/navigatescreen/navigatescreen.component';
import { SummarycomponentComponent } from '../components/summarycomponent/summarycomponent.component';
import { MessagecomponentComponent } from '../components/messagecomponent/messagecomponent.component';
import { ModifyComponent } from '../components/modify/modify.component';
import { CommitteeInfoComponent } from '../components/committee-info/committee-info.component';
import { LobbyExistingReportsTableComponent } from '../components/lobby-existing-reports-table/lobby-existing-reports-table.component';
import { MsgscreenRightPanelComponent } from '../components/msgscreen-right-panel/msgscreen-right-panel.component';
import { CurrentCommitteeComponent } from '../components/current-committee/current-committee.component';
@NgModule({
  declarations: [
    AgeCalculatorPipe,
    // ReveseArray,
    SelectCreateCommiteeLobbyComponent,
    SearchCommitteeLobbyistComponent,
    SelectListCommitteeLobbyistComponent,
    KeyPreventDirective,
    ClickOutsideDirective,
    CommitteeContactInformationComponent,
    CommitteeManageOfficeComponent,
    CommitteeInformationComponent,
    BankInformationComponent,
    CommitteRegistrationSuccessComponent,
    DeleteModalComponent,
    ConfirmationScreenComponent,
    ConfirmPopupComponent,
    RegisterJoinCommitteeComponent,
    CurrentCommitteeInformationComponent,
    CurrentCommitteeContactInformationComponent,
    CurrentCommitteeBankInformationComponent,
    CurrentCommitteeOfficerInformationComponent,
    IndipendentExpenditureComponent,
    NavigatescreenComponent,
    SummarycomponentComponent,
    MessagecomponentComponent,
    ModifyComponent,
    CommitteeInfoComponent,
    LobbyExistingReportsTableComponent,
    MsgscreenRightPanelComponent,
CurrentCommitteeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule,
  ],
  exports: [
    AgeCalculatorPipe,
    KeyPreventDirective,
    ClickOutsideDirective,
    // ReveseArray,
    TranslateModule,
    SelectCreateCommiteeLobbyComponent,
    SearchCommitteeLobbyistComponent,
    SelectListCommitteeLobbyistComponent,
    CommitteeContactInformationComponent,
    CommitteeManageOfficeComponent,
    CommitteeInformationComponent,
    BankInformationComponent,
    CommitteRegistrationSuccessComponent,
    ConfirmationScreenComponent,
    RegisterJoinCommitteeComponent,
    CurrentCommitteeInformationComponent,
    CurrentCommitteeContactInformationComponent,
    CurrentCommitteeBankInformationComponent,
    CurrentCommitteeOfficerInformationComponent,
    IndipendentExpenditureComponent,
    NavigatescreenComponent,
    SummarycomponentComponent,
    MessagecomponentComponent,
    ModifyComponent,
    CommitteeInfoComponent,
    LobbyExistingReportsTableComponent,
    MsgscreenRightPanelComponent,
    CurrentCommitteeComponent
  ],
  entryComponents: []
})
export class SharedModule { }
