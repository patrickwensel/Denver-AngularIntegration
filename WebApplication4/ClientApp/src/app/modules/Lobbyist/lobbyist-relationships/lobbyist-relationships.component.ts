import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  CommonMethods,
  ErrorMessageService,
  MasterDataService,
  MasterUrlService,
  SnackbarService,
} from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

const lobbyRelationship = [
  {
    lobbyist: 'Lorem Ipsum',
    officialName: 'Lorem Ipsum',
    officialTitle: 'Lorem Ipsum',
    relationship: 'Lorem Ipsum',
    entityName: 'Lorem Ipsum',
  },
];

@Component({
  selector: 'app-lobbyist-relationships',
  templateUrl: './lobbyist-relationships.component.html',
  styleUrls: ['./lobbyist-relationships.component.scss'],
})
export class LobbyistRelationshipsComponent implements OnInit {
  @Output()
  RelationshipDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() backBtnEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() LobbyRegistrationDate:any = {}
  static_data: any;
  LobbyRelationshipForm: FormGroup;
  editFormId: any;
  modal: any;
  hideRequiredMarker: boolean = true;
  lobbyist:'Lobbyist 1';
  SearchLobby:any;

  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    public snackbar: SnackbarService,
    public dialog: MatDialog,
    private service: ClientService,
    private urlService: MasterUrlService
  ) {}

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();

    this.createRelationshipForm();
    this.setRelationList(this.LobbyRegistrationDate);
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
  setRelationList(LobbyRegistrationDate: any){
    let list =LobbyRegistrationDate.relationship?.map((dat:any)=>{
      let { userId,firstName, phone, lastName, email, address1, address2, city, stateCode, zipcode, officialTitle, officialName, lobbyist,relationship,entityName,countryCode } = dat;
      return  {
        "tenantId": 0,
         lobbyist,
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
          email
        }
    })
    console.log(list)
    this.lobbyRelationshipList.data = list;
  }
  RelationshipLobby: string[] = [
    'lobbyist',
    'officialName',
    'officialTitle',
    'relationship',
    'entityName',
    'action',
  ];
  lobbyRelationshipList = new MatTableDataSource();

  createRelationshipForm(data: any = {}) {
    this.LobbyRelationshipForm = new FormGroup({
      lobbyist: new FormControl(data.lobbyist || null, [Validators.required]),
      officialName: new FormControl(data.officialName || null, [
        Validators.maxLength(100),Validators.pattern(this.masterDate.onlyAlpha),
      ]),
      officialTitle: new FormControl(data.officialTitle || null, [
        Validators.maxLength(100),Validators.pattern(this.masterDate.onlyAlpha),
      ]),
      relationship: new FormControl(data.relationship || null, [
        Validators.maxLength(100),Validators.pattern(this.masterDate.onlyAlpha),
      ]),
      entityName: new FormControl(data.entityName || null, [
        Validators.maxLength(100),Validators.pattern(this.masterDate.onlyAlpha),
      ]),
    });
  }
  ValidateEmployeeForm() {
    if (this.LobbyRelationshipForm.valid) {
      const data = this.lobbyRelationshipList.data;
      let {
        lobbyist,
        officialName,
        officialTitle,
        relationship,
        entityName,
      } = this.LobbyRelationshipForm.value;
      this.modal = {
        lobbyist,
        officialName: officialName.trim(),
        officialTitle: officialTitle.trim(),
        relationship,
        entityName,
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
      this.lobbyRelationshipList.data = data;
      this.snackbar.snackbarSuccess("Relationship Added Successfully");
      this.clearForm();
    } else {
      this.LobbyRelationshipForm.markAllAsTouched();
    }
  }
  clearForm() {
    this.editFormId = 0;
    this.LobbyRelationshipForm.reset();
  }
  editRelationships(data: any) {

    this.editFormId = data.id;
    this.createRelationshipForm(data);
  }
  openConfirmationModal(id: any): void {

    if (this.lobbyRelationshipList.data.length <= 1)
    return this.snackbar.snackbarError('Lobbyist Should Have Atleast One Relationship', this.masterDate.centre);


    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '300px',
      height: '200px',
      data: {
        id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'close') {

        const data = this.lobbyRelationshipList.data;
        let findI = data.findIndex((fd: any) => fd.id == result);
        if (findI != -1) {
          data.splice(findI, 1);
        }
        this.lobbyRelationshipList.data = data;
      }
    });
  }
  SubmitRelationshipForm() {
    if (this.lobbyRelationshipList.data.length < 1) {
      return this.snackbar.snackbarError(
        'Minimum One Relationship is required',
        this.masterDate.centre
      );
    }
    this.RelationshipDataEmitter.emit(this.lobbyRelationshipList.data);
    this.snackbar.snackbarSuccess("Relationship Details Added Successfully");

  }
  goBack(){
    this.backBtnEmitter.emit(3)
  }
  validateCancel(){
    this.clearForm();
  }
}
