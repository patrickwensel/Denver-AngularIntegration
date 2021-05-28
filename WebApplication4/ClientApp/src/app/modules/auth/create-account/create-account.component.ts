import { error } from "@angular/compiler/src/util";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  CommonMethods,
  ErrorMessageService,
  LocalstorageService,
  MasterUrlService,
  SnackbarService,
} from "src/app/core";
import { ClientService } from "src/app/core/api-services/client.service";
import { MasterDataService } from "./../../../configs/master-data";
@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"],
})
export class CreateAccountComponent implements OnInit {
  hideRequiredMarker: boolean = true;
  showInformation: boolean = false;
  showPassword = true;
  showUsertype = true;
  pshow = true;
  hide = true;
  static_data: any=[];
  createInformationForm: FormGroup;
  setPasswordForm: FormGroup;
  independentExpenditureForm: FormGroup;
  contactSubmitForm: FormGroup;
  typeID: string;
  showCommitee: boolean = true;
  selectedCommLobbList: any = [];
  showTab: boolean = true;
  selectIndex: any = 0;
  showCommitteOrLobby: boolean = false;
  showIEF: boolean;
  modal: any;
  contactInformationId: any;
  passwordCompare: boolean;
  getUserType: any;
  selectedsel: any;
  getState: any;
  filerTypes: any;
  filerRole: any;
  role: any;
  getCommitteeList: any;
  listData: any;
  getLobbyList: any;
  confirm: boolean;
  selectCommittee: any;
  hideBack: boolean;
  hideNext: boolean = false;
  maxDate:Date = new Date(2021, 0, 1);
  account='account'
  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    private urlService: MasterUrlService,
    public errorService: ErrorMessageService,
    private fb: FormBuilder,
    private service: ClientService,
    public router: Router,
    public snackbar: SnackbarService,
    private localStore: LocalstorageService,
  ) {
    //for reload


  }

  ngOnInit(): void {
    if (this.commonMethods.getIsReloaded() == 'false') {
      window.location.reload();
      this.commonMethods.isReloaded('true')
      return;
    }
    this.commonMethods.isReloaded('false')
    this.getCommittee();
    this.getLobby();
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.initCreateForm();
    this.initsetPassword();
    this.independentExpenditureFilerForm();
    this.initSubmitForm();
    this.service
      .getData(this.urlService.getallUserType)
      .subscribe((res: any) => {
        this.getUserType = res;
      });
    this.service.getData(this.urlService.getStatelist).subscribe((res: any) => {
      this.getState = res;
      console.log(this.getState);
    });
    //for testing
    // this.showCommitee = true;
    // this.showTab = false;
  }

  showSelectOrCreate(showSel: any) {
    console.log(showSel);
    this.showCommitteOrLobby = false;
    if (showSel) {
      this.selectedsel = showSel;
      this.showCommitteOrLobby = showSel;
      if(this.selectedCommLobbList.length > 0){
        this.hideNext = false;
      }
    } else {
      if (this.showCommitee) {
        //Need to pass userId and UserType
        this.router.navigate(["/committee/committee-registration"], {
          queryParams: {
            userId: this.contactInformationId,
            userType: this.role,
          },
        });
      } else {
        this.router.navigate(["/lobbyist/createlobbyist"], {
          queryParams: {
            userId: this.contactInformationId,
            userType: this.role,
          },
        });
      }
    }
  }
  navigate(data:any){
    if (data) {
      //Need to pass userId and UserType
      this.router.navigate(["/committee/committee-registration"], {
        queryParams: {
          userId: this.contactInformationId,
          userType: this.role,
        },
      });
    } else {
      this.router.navigate(["/lobbyist/createlobbyist"], {
        queryParams: {
          userId: this.contactInformationId,
          userType: this.role,
        },
      });
    }
  }

  deleteSelectedList(e: any) {
    //TODO remove selected lobby/Committee from list
    console.log("need to do remove selected lobby/Committee from list", e.data);
    this.selectedCommLobbList.splice(e.idx, 1);
    if(this.selectedCommLobbList.length == 0){
      this.hideNext = true;
    }
  }

  addSelectedtoList(data: any) {
    this.listData = data;
    //TODO add selected lobby/Committee to list
    console.log("need to do add selected lobby/Committee from list", data);
    if (this.selectedCommLobbList.length < 10) {
      let findLockerProduct
      if (this.showCommitee) {
      findLockerProduct = this.selectedCommLobbList.find(
        (o: any) => o.committeeId == data.committeeId
      );
      }else{
        findLockerProduct = this.selectedCommLobbList.find(
          (o: any) => o.lobbyistID == data.lobbyistID
        );
      }
      if (findLockerProduct) {
        return this.snackbar.snackbarError(
          "Already Selected",
          this.masterDate.centre
        );
      } else {
        this.selectedCommLobbList.push(data);
        this.hideNext = false;
      }
    } else {
      this.snackbar.snackbarError(
        "Maximum Limit Reached",
        this.masterDate.centre
      );
    }

  }

  changeType() {
    this.selectedCommLobbList = [];
  }
  initCreateForm() {
    this.createInformationForm = this.fb.group({
      firstName: ["", [Validators.minLength(2), Validators.maxLength(80)]],
      lastName: ["", [Validators.minLength(2), Validators.maxLength(80)]],
      mailingAdd1: [
        "" || null,
        [
          Validators.minLength(2),
          Validators.maxLength(150),
          Validators.pattern(this.masterDate.addressPattern),
        ],
      ],
      mailingAdd2: [
        "" || null,
        [
          Validators.minLength(2),
          Validators.maxLength(150),
          Validators.pattern(this.masterDate.addressPattern),
        ],
      ],
      phone: ["" || null, [Validators.maxLength(10)]],
      zipcode: ["" || null, []],
      city: ["" || null, []],
      state: ["" || null, []],
      email: ["" || null, []],
    });
  }
  initSubmitForm() {
    this.contactSubmitForm = this.fb.group({
      firstName: ["", [Validators.minLength(1), Validators.maxLength(80)]],
      lastName: ["", [Validators.minLength(1), Validators.maxLength(80)]],
      mailingAdd1: [
        "" || null,
        [
          Validators.minLength(1),
          Validators.maxLength(150),
          Validators.pattern(this.masterDate.addressPattern),
        ],
      ],
      mailingAdd2: [
        "" || null,
        [
          Validators.minLength(1),
          Validators.maxLength(150),
          Validators.pattern(this.masterDate.addressPattern),
        ],
      ],
      phone: [
        "" || null,
        [
          Validators.maxLength(10),
          Validators.pattern(this.masterDate.phoneNumerhipenvalidation),
        ],
      ],
      zipcode: ["" || null, []],
      city: ["" || null, []],
      state: ["" || null, []],
      email: ["" || null, []],
    });
  }
  initsetPassword() {
    this.setPasswordForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(120),
          Validators.pattern(this.masterDate.emailValidations),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(this.masterDate.password),
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
      confirmpassword: ["", [Validators.required]],
    });
  }

  independentExpenditureFilerForm() {
    this.independentExpenditureForm = this.fb.group({
      filerType: ["", []],
      occupation: ["", []],
      employer: ["", []],
    });
  }
  comparePassword() {
    const password = this.setPasswordForm.value.password;
    const confirmpassword = this.setPasswordForm.value.confirmpassword;
    if (password && confirmpassword) {
      if (password === confirmpassword) {
        this.passwordCompare = false;
      } else {
        this.passwordCompare = true;
      }
    } else {
      this.passwordCompare = true;
    }
  }
  switchkey() {
    this.showTab = !this.showTab;
  }
  changevalue() {
    this.filerRole = this.independentExpenditureForm.value.filerType;
  }
  changeState(e: any) {
    this.createInformationForm.value.state = e.stateCode;
  }
  getFiler() {
    const user = {
      lookUpType: "FILER-TYPE",
    };
    this.service
      .postData(this.urlService.getList, user)
      .subscribe((res: any) => {
        console.log(res);
        this.filerTypes = res;
        // this.independentExpenditureForm.patchValue({
        //   filerType: this.filerTypes[1].lookUpTypeId})
      });
  }
  addSearchEmitter(e: any) {
    this.selectCommittee = e;
    if (this.role == "USER-CAN" || this.role == "USER-TSR") {
      this.getCommittee();
    } else {
      this.getLobby();
    }
  }
  getCommittee() {
    const id = {
      searchCommitteeName: this.selectCommittee ? this.selectCommittee : "",
    };
    this.service
      .postData(this.urlService.committeeList, id)
      .subscribe((res: any) => {
        this.getCommitteeList = res;
      });
  }
  getLobby() {
    const id = {
      searchLobbyName: this.selectCommittee ? this.selectCommittee : "",
    };
    this.service.postData(this.urlService.lobbyList, id).subscribe((res: any) => {
      this.getLobbyList = res;
      console.log(this.getLobbyList);
    });
  }
  confirmSubmit() {
    const id = {
      userId: this.contactInformationId,
    };
    this.service
      .postData(this.urlService.confirmSubmit, id)
      .subscribe((res: any) => {
        this.confirmSubmit = res[0];
        console.log(this.confirmSubmit);
      });
  }
  createInformation() {
    return new Promise((resolve, reject) => {
      this.modal = {
        contactInformationID: 0,
        firstName: this.createInformationForm.value.firstName.trim(),
        lastName: this.createInformationForm.value.lastName.trim(),
        mailingAddress1: this.createInformationForm.value.mailingAdd1
          ? this.createInformationForm.value.mailingAdd1
          : "",
        mailingAddress2: this.createInformationForm.value.mailingAdd2
          ? this.createInformationForm.value.mailingAdd2
          : "",
        city: this.createInformationForm.value.city,
        state: this.createInformationForm.value.state,
        zipcode: this.createInformationForm.value.zipcode,
        phone: this.createInformationForm.value.phone,
        email: this.createInformationForm.value.phone,
      };
      this.service
        .postData(this.urlService.CreateContactInformation, this.modal)
        .subscribe((res: any) => {
          if (res[0].hasError) {
          } else {
            this.contactInformationId = res[0].pkId;
            resolve(true);
          }
        });
    });
  }
  setPassword() {
    const info = {
      contactInformationID: this.contactInformationId,
      email: this.setPasswordForm.value.email.toLowerCase(),
      password: this.setPasswordForm.value.password,
      confirmPassword: this.setPasswordForm.value.confirmpassword,
    };
    this.service
      .postData(this.urlService.loginInformation, info)
      .subscribe((res: any) => {
        if (res[0].hasError) {
          return this.snackbar.snackbarError(
            "Email already exists",
            this.masterDate.centre
          );
        } else {
          this.selectIndex += 1;
          this.localStore.setLocalStorage('firstName', this.createInformationForm.value.firstName);
          this.localStore.setLocalStorage('lastName', this.createInformationForm.value.lastName);
          this.localStore.setLocalStorage('email', this.setPasswordForm.value.email);
          // this.snackbar.snackbarError(
          //   "Account created successfully",
          //   this.masterDate.centre
          // );
        }
      });
  }
  next() {
    switch (this.selectIndex) {
      case 0:
        if (this.createInformationForm.valid) {
          this.selectIndex += 1;
        } else {
          this.createInformationForm.markAllAsTouched();
        }
        // this.selectIndex += 1;
        break;
      case 1:
        this.comparePassword();
        this.createInformation().then((result) => {
          if (this.setPasswordForm.valid && this.passwordCompare == false) {
            this.setPassword();
          } else {
            this.setPasswordForm.markAllAsTouched();
          }
          this.hideBack = true;
        });
        // this.selectIndex += 1;
        break;
      case 2:
        this.hideBack = false;
        this.role = this.typeID;
        const user = {
          contactInformationId: this.contactInformationId,
          userTypeId: this.role,
        };
        this.service
          .postData(this.urlService.chooseUserType, user)
          .subscribe((res: any) => {
            if (res && res[0].hasError) {
            } else {
              if (res && res[0].result) {
                this.createInformationForm.patchValue({
                  email: this.setPasswordForm.value.email,
                });
                if (this.role == "USER-CAN" || this.role == "USER-TSR") {
                  this.getCommittee();
                  this.showIEF = false;
                  this.showCommitee = true;
                  if(!this.showCommitteOrLobby && !this.showIEF){
                    this.hideNext = true;
                  }
                  this.selectIndex += 1;
                } else if (this.role == "USER-IEF") {
                  this.getFiler();
                  this.showIEF = true;
                  this.showCommitee = false;
                  this.selectIndex += 1;
                } else if (this.role == "USER-LOB") {
                  this.getLobby();
                  this.showIEF = false;
                  this.showCommitee = false;
                  if(!this.showCommitteOrLobby && !this.showIEF){
                    this.hideNext = true;
                  }
                  this.selectIndex += 1;
                } else if (this.role == "USER-FCE") {
                  // this.showIEF = true;
                  this.showTab = false;

                }

              }
            
            }
          },(error) =>{
              return   this.snackbar.snackbarError(
                "Select atleast anyone user type",
                this.masterDate.centre
              );
          });
        // this.selectIndex += 1;
        break;
      case 3:
        if(this.selectedCommLobbList.length == 0 && !this.showIEF){
         return this.snackbar.snackbarError(
          "Select atleast any one",
          this.masterDate.centre
        );
        }else{
          this.showTab = false;
        }
        this.hideBack = false;
        if (this.showIEF) {
          const ief = {
            userID: this.contactInformationId,
            userTypeId: this.role,
            filerType: this.filerRole,
            occupation: this.independentExpenditureForm.value.occupation.trim(),
            employer: this.independentExpenditureForm.value.employer.trim(),
          };
          this.service
            .postData(this.urlService.iefAdditionalInfo, ief)
            .subscribe((res: any) => {
              console.log(res);
            });
        } else {
          if (this.showCommitee) {
            let selected: any = [];
            this.selectedCommLobbList.forEach((element: any) => {
              selected.push({ refId: element.committeeId });
            });
            const list = {
              userID: this.contactInformationId,
              userType: this.role,
              userRoleId: 1,
              committee: selected,
              relationshipId: 0,
            };
            this.service
              .postData(this.urlService.committeeAditionalInfo, list)
              .subscribe((res: any) => {
                console.log(res);
              });
          } else {
            let selected: any = [];
            this.selectedCommLobbList.forEach((element: any) => {
              selected.push({ refId: element.lobbyistID });
            });
            const list = {
              userID: this.contactInformationId,
              userType: this.role,
              userRoleId: 1,
              lobbyist: selected,
              relationshipId: 0,
            };
            this.service
              .postData(this.urlService.updatelobbyList, list)
              .subscribe((res: any) => {
                console.log(res);
              });
          }
        }

        break;
    }
  }

  isSelected(index: number) {
    if (this.selectIndex == index) {
      return false;
    } else {
      return true;
    }
  }
  back() {
    if (this.selectedCommLobbList.length > 0 && !this.showTab) {
      this.showTab = true;
      this.showCommitteOrLobby = true;
      this.showIEF = false;
    } else if (this.selectedsel) {
      this.selectedsel = false;
      this.showCommitteOrLobby = !this.showCommitteOrLobby;
      this.hideNext = true;
      this.selectIndex = 3;
    } else if (!this.showTab) {
      this.showTab = true;
      this.selectIndex = 3;
    } else if (this.selectIndex == 0) {
      this.router.navigate(["/login"]);
    } else if (this.selectIndex == 3 && this.hideBack == false) {
      this.hideBack = true;
      this.hideNext = false;
      this.selectIndex -= 1;
    }else if(this.role == "USER-FCE" && !this.showTab){
     this.selectIndex == 2
    }
    else {
      this.selectIndex -= 1;
    }
  }
  submit() {
    this.confirm = true;
    this.confirmSubmit();
  }
}
