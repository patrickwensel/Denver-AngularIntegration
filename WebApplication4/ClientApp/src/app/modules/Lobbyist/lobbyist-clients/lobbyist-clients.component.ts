import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  CommonMethods,
  ErrorMessageService,
  MasterDataService,
  MasterUrlService,
  SnackbarService,
} from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-lobbyist-clients',
  templateUrl: './lobbyist-clients.component.html',
  styleUrls: ['./lobbyist-clients.component.scss'],
})
export class LobbyistClientsComponent implements OnInit {
  @Output() ClientDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() backBtnEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() LobbyRegistrationDate:any =[];

  lobbyClientList = new MatTableDataSource();
  static_data: any;
  modal: any;
  stateList: any;
  LobbyClientsForm: FormGroup;
  selectClient:any;
  editFormId: any;
  hideRequiredMarker: boolean = true;
  @Input() editable: boolean = false;
  txtQueryChanged: Subject<string> = new Subject<string>();
    @Output() addSearchEmitter: EventEmitter<any> = new EventEmitter<any>();
    SearchLobby: any;
  searchpopular: any;
  submitted:boolean;
  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    public dialog: MatDialog,
    public snackbar: SnackbarService,
    private service: ClientService,
    private urlService: MasterUrlService
  ) {
    this.txtQueryChanged.pipe(
      debounceTime(1000) ,// wait 1 sec after the last event before emitting last event
      distinctUntilChanged())// only emit if value is different from previous value
      .subscribe(model => {
        this.searchpopular = model;
    this.addSearchEmitter.emit(this.searchpopular);

      });

  }

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.createClientsForm();
    this.getStateList();
    this.getSearchClients();
    this.setClientList(this.LobbyRegistrationDate);
    this.getSearchLobbyType();
  }
  getSearchLobbyType() {
    this.service
      .postData(this.urlService.getLobbyID, { searchLobbyName: '' })
      .subscribe((res: any) => {
        this.SearchLobby = res;
        console.log(res);
      });
  }
  // selectedItem(data: any) {
  //   console.log(data);
  //   this.LobbyEmployees(data);
  // }
  setClientList(LobbyRegistrationDate: any) {
    let list = LobbyRegistrationDate?.clientInfo?.map((dat: any) => {
      let {
        client,
        firstName,
        phone,
        lastName,
        email,
        address1,
        address2,
        city,
        stateCode,
        zipcode,
        officialTitle,
        officialName,
        lobbyist,
        relationship,
        entityName,
        countryCode,
        companyName,
        businessNature,
        legislativematters,
      } = dat;
      return {
        tenantId: 0,
        lobbyist,
        client,
        companyName,
        businessNature,
        legislativematters,
        officialName,
        officialTitle,
        relationship,
        entityName,
        address1,
        address2,
        city,
        zipcode,
        stateCode,
        countryCode,
        firstName,
        lastName,
        phone,
        email,
      };
    });
    console.log(list);
    this.lobbyClientList.data = list;
  }
  ClientsLobby: string[] = [
    'organisationName',
    'lobbyist',
    'BusinessName',
    'remarks',
    'address1',
    'address2',
    'city',
    'state',
    'zipcode',
    'action',
  ];
  // dataSource = this.lobbyClients;
  commitLobbyList: ['option 1', 'option 2', 'option 3'];

  SearchClients: any;

  getStateList() {
    this.stateList = [];
    this.service.getData(this.urlService.getStatelist).subscribe((res: any) => {
      this.stateList = res;
    });
  }

  getSearchClients() {
    const id = {
      searchClientName : this.selectClient ? this.selectClient : '',
    }
    this.service
      .postData(this.urlService.getClients, id)
      .subscribe((res: any) => {
        this.SearchClients = res;
        console.log(res);
      });
  }
  // getCommittee() {
  //   const id = {
  //     searchCommitteeName: this.selectCommittee ? this.selectCommittee : '',
  //   };
  //   this.service
  //     .postData(this.urlService.committeeList, id)
  //     .subscribe((res: any) => {
  //       this.getCommitteeList = res;
  //     });
  // }
  selectedItem(data: any) {
    console.log(data);
    this.createClientsForm(data);
  }

  createClientsForm(data: any = {}) {
    this.LobbyClientsForm = new FormGroup({
      client: new FormControl(data.client || null, []),
      organisationName: new FormControl(data.companyName || null, [
        Validators.required,
      ]),
      lobbyist: new FormControl(data.lobbyist || null, [
        Validators.minLength(2),
        Validators.maxLength(120),
        Validators.pattern(this.masterDate.onlyAlpha),
      ]),
      BusinessName: new FormControl(data.natureOfBusiness || null, [
        Validators.minLength(2),
        Validators.maxLength(120),
        Validators.pattern(this.masterDate.onlyAlpha),
      ]),
      remarks: new FormControl(data.legislativeMatters || null, [
        Validators.minLength(2),
        Validators.maxLength(120),
        Validators.pattern(this.masterDate.onlyAlpha),
      ]),
      address1: new FormControl(data.address1 || null, [
        Validators.minLength(1),
        Validators.maxLength(150),
        Validators.pattern(this.masterDate.addressPattern),
      ]),
      address2: new FormControl(data.address2 || null, [
        Validators.minLength(1),
        Validators.maxLength(150),
      ]),
      zipcode: new FormControl(data.zipcode || null, []),
      city: new FormControl(data.city || null, []),
      stateCode: new FormControl(data.stateCode || null, []),
    });
  }
  validateClientForm() {
    this.submitted = true;
    if (this.LobbyClientsForm.valid) {
      const data = this.lobbyClientList.data;
      let {
        client,
        organisationName,
        lobbyist,
        BusinessName,
        remarks,
        address1,
        address2,
        zipcode,
        city,
        stateCode,
      } = this.LobbyClientsForm.value;
      this.modal = {
        client,
        organisationName,
        lobbyist,
        BusinessName,
        remarks,
        address1,
        address2,
        zipcode,
        stateCode,
        city,
      };
      if (!this.editFormId) {
        this.modal.id = data.length + 1;
      } else {
        // update
        let findI = data.findIndex((fd: any) => fd.id == this.editFormId);
        if (findI != -1) {
          data.splice(findI, 1);
        }
        this.modal.id = this.editFormId;
        this.editFormId = 0;
      }
      data.push(this.modal);
      this.lobbyClientList.data = data;
      this.snackbar.snackbarSuccess('Client Added Successfully');
      this.clearForm();
    } else {
      this.LobbyClientsForm.markAllAsTouched();
    }
  }
  clearForm() {
    this.editFormId = 0;
    this.LobbyClientsForm.reset();
  }

  editClients(data: any) {

    this.editFormId = data.id;
    this.createClientsForm(data);
  }
  validateSubmitClient() {
    if (this.lobbyClientList.data.length < 1) {
      return this.snackbar.snackbarError(
        'Minimum One Client is required',
        this.masterDate.centre
      );
    }
    this.snackbar.snackbarSuccess('Client Details Added Successfully');
    this.ClientDataEmitter.emit(this.lobbyClientList.data);
  }
  openConfirmationModal(id: any): void {
    if (this.lobbyClientList.data.length <= 1)
      return this.snackbar.snackbarError(
        'Lobbyist Should Have Atleast One Client',
        this.masterDate.centre
      );

    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '300px',
      height: '200px',
      data: {
        id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'close') {

        const data = this.lobbyClientList.data;
        let findI = data.findIndex((fd: any) => fd.id == result);
        if (findI != -1) {
          data.splice(findI, 1);
        }
        this.lobbyClientList.data = data;
      }
    });
  }
  goBack() {
    this.backBtnEmitter.emit(4);
  }
  validateCancel() {
    this.clearForm();
  }
}
