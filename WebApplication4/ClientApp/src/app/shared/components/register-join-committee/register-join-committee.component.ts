import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonMethods, MasterDataService, ErrorMessageService, MasterUrlService, SnackbarService, LocalstorageService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-register-join-committee',
  templateUrl: './register-join-committee.component.html',
  styleUrls: ['./register-join-committee.component.scss']
})
export class RegisterJoinCommitteeComponent implements OnInit {
  static_data: any = {};
  @Output() CommJoinNewEmit = new EventEmitter<Object>();
  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    private urlService: MasterUrlService,
    public snackbar: SnackbarService,
    private localStore: LocalstorageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
  }

  committeeNewJoinEvent(type: any, id: any) {
    this.CommJoinNewEmit.emit({ type, id });
  }
}
