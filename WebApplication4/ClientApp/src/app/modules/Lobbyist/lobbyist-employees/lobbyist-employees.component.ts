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

const lobbyEmployee = [
  {
    firstName: 'Mellisa',
    lastName: 'Blake',
    phone: 555 - 555 - 555,
    email: 'mblake@ymail.com',
  },
  {
    firstName: 'Michael',
    lastName: 'Feeley',
    phone: 555 - 555 - 555,
    email: 'mfeeley@ymail.com',
  },
];

@Component({
  selector: 'app-lobbyist-employees',
  templateUrl: './lobbyist-employees.component.html',
  styleUrls: ['./lobbyist-employees.component.scss'],
})
export class LobbyistEmployeesComponent implements OnInit {
  @Output() EmployeeeDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() backBtnEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() LobbyRegistrationDate: any = {};

  static_data: any;
  LobbyEmployeesForm: FormGroup;
  editFormId: any;
  modal: any = {};
  SearchLobby: any;
  hideRequiredMarker: boolean = true;

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
    this.LobbyEmployees();
    this.getSearchLobbyType();
    this.setEmployeeList(this.LobbyRegistrationDate);
  }
  EmployeeLobby: string[] = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'action',
  ];
  lobbyEmployeeList = new MatTableDataSource();
  setEmployeeList(LobbyRegistrationDate: any) {
    let list = LobbyRegistrationDate?.employeeInfo?.map((dat: any) => {
      let {
        userId,
        firstName,
        phone,
        lastName,
        email,
        address1,
        address2,
        city,
        stateCode,
        zipcode,
        organisationName,
        occupation,
        lobbyistId,
      } = dat;
      return {
        tenantId: 0,
        userId,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state: stateCode,
        zipcode,
        countryCode: '',
        email,
        phone,
        organisationName,
        occupation,
        lobbyistId,
      };
    });
    console.log(list);
    this.lobbyEmployeeList.data = list;
  }

  getSearchLobbyType(event: any = null) {
    let value = '';
    if (event)
      value = event.target.value;

    this.service.postData(this.urlService.getLobbyID, { "searchLobbyName": value }).subscribe((res: any) => {
      this.SearchLobby = res;
      console.log(res)
    })
  }

  selectedItem(data: any) {
    console.log(data);
    this.LobbyEmployees(data);
  }

  LobbyEmployees(data: any = {}) {
    this.LobbyEmployeesForm = new FormGroup({
      lobbyist: new FormControl(data.type || null, []),
      firstName: new FormControl(data.firstName || null, [
        Validators.minLength(1),
        Validators.maxLength(80),
        Validators.pattern(this.masterDate.onlyAlpha),
      ]),
      lastName: new FormControl(data.lastName || null, [
        Validators.minLength(1),
        Validators.maxLength(80),
        Validators.pattern(this.masterDate.onlyAlpha),
      ]),
      phone: new FormControl(data.phone || null, [
        Validators.maxLength(10),
        Validators.pattern(this.masterDate.phoneNumerhipenvalidation),
      ]),
      email: new FormControl(data.email || null, [
        Validators.pattern(this.masterDate.emailValidations),
      ]),
    });
  }
  ValidateEmployeeForm() {
    if (this.LobbyEmployeesForm.valid) {
      const data = this.lobbyEmployeeList.data;
      let {
        lobbyist,
        firstName,
        lastName,
        phone,
        email,
      } = this.LobbyEmployeesForm.value;
      if (this.checkEmailAlreadyExist(email)) {
        return this.snackbar.snackbarError(
          'Employee Email Already Exist',
          this.masterDate.centre
        );
      }
      this.modal = {
        lobbyist,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone,
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
      this.lobbyEmployeeList.data = data;
      this.snackbar.snackbarSuccess('Employee Added Successfully');
      this.clearForm();
    } else {
      this.LobbyEmployeesForm.markAllAsTouched();
    }
  }
  clearForm() {
    this.editFormId = 0;
    this.LobbyEmployeesForm.reset();
  }
  checkEmailAlreadyExist(email: string) {
    if (this.editFormId) return false;

    let exist = this.lobbyEmployeeList.data.findIndex(
      (d: any) => d.email == email
    );
    return !(exist === -1);
  }
  editEmployee(data: any) {
    this.editFormId = data.id;
    this.LobbyEmployees(data);
  }
  openConfirmationModal(id: any): void {
    if (this.lobbyEmployeeList.data.length <= 1)
      return this.snackbar.snackbarError(
        'Lobbyist Should Have Atleast One Employee',
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

        const data = this.lobbyEmployeeList.data;
        let findI = data.findIndex((fd: any) => fd.id == result);
        if (findI != -1) {
          data.splice(findI, 1);
        }
        this.lobbyEmployeeList.data = data;
      }
    });
  }
  validateSubmitEmployee() {
    if (this.lobbyEmployeeList.data.length < 1) {
      return this.snackbar.snackbarError(
        'Minimum One Employee is required',
        this.masterDate.centre
      );
    }
    this.snackbar.snackbarSuccess('Employee Details Added Successfully');
    this.EmployeeeDataEmitter.emit(this.lobbyEmployeeList.data);
  }
  goBack() {
    this.backBtnEmitter.emit(1);
  }

 validateCancel() {
    this.clearForm();
  }
}
