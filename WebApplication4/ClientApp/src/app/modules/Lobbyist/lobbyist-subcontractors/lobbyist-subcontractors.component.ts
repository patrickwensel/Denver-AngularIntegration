import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  CommonMethods,
  ErrorMessageService,
  MasterDataService,
  SnackbarService,
} from 'src/app/core';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-lobbyist-subcontractors',
  templateUrl: './lobbyist-subcontractors.component.html',
  styleUrls: ['./lobbyist-subcontractors.component.scss'],
})
export class LobbyistSubcontractorsComponent implements OnInit {
  @Output() subcontractorDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() backBtnEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() LobbyRegistrationDate:any = {}
  dataSource = new MatTableDataSource<any>([]);
  static_data: any;
  modal: any = {};
  editFormId: any;
  LobbySubcontractorsForm: FormGroup;
  SearchControl = new FormControl();
  hideRequiredMarker: boolean = true;

  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    public dialog: MatDialog,
    public snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();

    this.createSubcontractorsForm();
    this.setEmployeeList(this.LobbyRegistrationDate);
  }
  setEmployeeList(LobbyRegistrationDate: any){
    let list =LobbyRegistrationDate.subContractorInfo?.map((dat:any)=>{
      let { type,firstName, phone, lastName, email, address1, address2, city, stateCode, zipcode, subcontractorName, occupation, countryCode } = dat;
      return  {
        "tenantId": 0,
        type,
        subcontractorName,
        phone,
        email,
        address1,
        address2,
        stateCode,
        city,
        zipcode,
        countryCode,
        firstName,
        lastName
        }
    })
    console.log(list)
    this.lobbySubcontractorList.data = list;
  }
  SubcontractorLobby: string[] = [
    'type',
    'subcontractorName',
    'phoneNumber',
    'email',
    'action',
  ];
  lobbySubcontractorList = new MatTableDataSource();

  createSubcontractorsForm(data: any = {}) {
    this.LobbySubcontractorsForm = new FormGroup({
      type: new FormControl(data.type || null, [Validators.required]),
      subcontractorName: new FormControl(data.subcontractorName || null, [
        Validators.required, Validators.pattern(this.masterDate.onlyAlpha)
      ]),
      phoneNumber: new FormControl(data.phoneNumber || null, [
        Validators.maxLength(10),
        Validators.pattern(this.masterDate.phoneNumerhipenvalidation),
      ]),
      email: new FormControl(data.email || null, [
        Validators.pattern(this.masterDate.emailValidations),
      ]),
    });
  }

  // Validate Save Button
  ValidateSubcontractorForm() {
    if (this.LobbySubcontractorsForm.valid) {
      const data = this.lobbySubcontractorList.data;
      let {
        type,
        subcontractorName,
        phoneNumber,
        email,
      } = this.LobbySubcontractorsForm.value;
      if (this.checkEmailAlreadyExist(email)) {
        return this.snackbar.snackbarError(
          'Subcontractor Email Already Exist',
          this.masterDate.centre
        );
      }
      this.modal = {
        type,
        subcontractorName: subcontractorName.trim(),
        phoneNumber,
        email,
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
      this.lobbySubcontractorList.data = data;
      this.snackbar.snackbarSuccess("SubContractor Added Successfully");

      this.clearForm();
    } else {
      this.LobbySubcontractorsForm.markAllAsTouched();
    }
  }

  // clearForm
  clearForm() {
    this.editFormId = 0;
    this.LobbySubcontractorsForm.reset();
  }

  // EmailCheck
  checkEmailAlreadyExist(email: string) {
    if (this.editFormId) return false;

    let exist = this.lobbySubcontractorList.data.findIndex(
      (d: any) => d.email == email
    );
    return !(exist === -1);
  }

  // edit
  editSubcontractor(data: any) {

    this.editFormId = data.id;
    this.createSubcontractorsForm(data);
  }

  // Delete
  openConfirmationModal(id: any): void {

    if (this.lobbySubcontractorList.data.length <= 1)
    return this.snackbar.snackbarError('Lobbyist Should Have Atleast One Subcontractor', this.masterDate.centre);


    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '300px',
      height: '200px',
      data: {
        id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'close') {

        const data = this.lobbySubcontractorList.data;
        let findI = data.findIndex((fd: any) => fd.id == result);
        if (findI != -1) {
          data.splice(findI, 1);
        }
        this.lobbySubcontractorList.data = data;
      }
    });
  }

  ValidateSubmitSubContractor() {
    if (this.lobbySubcontractorList.data.length < 1) {
      return this.snackbar.snackbarError(
        'Minimum One Subcontractor is required',
        this.masterDate.centre
      );
    }
    this.subcontractorDataEmitter.emit(this.lobbySubcontractorList.data);
    this.snackbar.snackbarSuccess("Subcontractor Details Added Successfully");

  }

  goBack(){
    this.backBtnEmitter.emit(2)
  }
  validateCancel(){
    this.clearForm();
  }
}
