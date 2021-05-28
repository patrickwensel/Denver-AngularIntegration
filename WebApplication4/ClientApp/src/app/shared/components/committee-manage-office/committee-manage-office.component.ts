import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods, ErrorMessageService, MasterDataService, MasterUrlService } from 'src/app/core';
import { SnackbarService } from './../../../core/snackbar/snackbar.service';
import { DeleteModalComponent } from './../../../shared/components/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/core/api-services/client.service';
import { debounceTime } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-committee-manage-office',
  templateUrl: './committee-manage-office.component.html',
  styleUrls: ['./committee-manage-office.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CommitteeManageOfficeComponent implements OnInit {
  hideRequiredMarker:boolean = true;
  static_data: any = {};
  addCommitteeOfficerForm: FormGroup;
  officeSearchList:any = [];//[{ id: 1, name: "Sample 1" }, { id: 2, name: "Sample 1 Large" }, { id: 3, name: "Sample 1 Extra Large" }]
  SearchControl = new FormControl();
  modal: any = {};
  FormEditId: any = 0;
  @Output() officerDataEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() backBtnEmiter = new EventEmitter<Object>();
  @Input() committeeInformation: any = {committeeInfo:{}};
  stateList: any = [];
  officerList: any = [];
  userType: any = '';
  // searchAdvanceSub: Subscription;
  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    public snackbar: SnackbarService,
    public dialog: MatDialog,
    private service: ClientService,
    private urlService: MasterUrlService,
    public router: Router,
    public route : ActivatedRoute
  ) { }

  isTableExpanded = false;

  ngOnInit() {
  //   this.route.queryParams.subscribe((params:any) => {
  //     this.userType = +params['userType']; // (+) converts string 'id' to a number

  //  });
    this.dataOfficerList.data = this.STUDENTS_DATA;
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.initCommitteeOfficerForm();
    this.getStateList();
    this.getOfficerTypeList();
    // this.getOfficerList();
    this.setOfficerList(this.committeeInformation.committeeInfo);
    this.getOfficerListAPI();

  }

  setOfficerList(committeeInfo: any){
    let list =committeeInfo.officerInfo?.map((dat:any)=>{
      let { userId,firstName, phone, lastName, email, address1, address2, city, stateCode, zipcode, description, officerType } = dat;
      return  {
        "tenantId": 0,
          userId,
          firstName,
          lastName,
          address1 ,
          address2 ,
          city ,
          state:stateCode ,
          zipcode,
          countryCode:"" ,
          email ,
          phone ,
          officerType ,
          description
        }
    })
    console.log(list)
    this.dataOfficerList.data = list;
  }

  getOfficerListAPI(event:any = null) {
    let value ='';
    if(event)
    value = event.target.value;

    this.officeSearchList =[];
    this.service.postData(this.urlService.getOfficeSearchByName,{"searchOfficerName": value}).subscribe((res: any) => {
      this.officeSearchList = res;
    })
  }

  getStateList (){
    this.stateList =[];
    this.service.getData(this.urlService.getStatelist).subscribe((res: any) => {
      this.stateList = res;
    })
  }

  getOfficerTypeList (){
    this.officerList =[];
    this.service.postData(this.urlService.getOfficerTypeList,{"lookUpType": "OFF"}).subscribe((res: any) => {
      this.officerList = res;
    })
  }

  getOfficerList (val: any = null){
    this.officerList =[];
    this.service.postData(this.urlService.getOfficerTypeList,{"lookUpType": "OFF"}).subscribe((res: any) => {
      this.officeSearchList = res;
    })
  }
  // }

  initCommitteeOfficerForm(data: any = {}) {

    this.addCommitteeOfficerForm = new FormGroup({
      type: new FormControl(data.type || '',
        []),
      firstName: new FormControl(data.firstName || '',
        [Validators.minLength(1), Validators.maxLength(120), Validators.pattern(this.masterDate.onlyAlpha)]),
      lastName: new FormControl(data.lastName || null,
        [Validators.minLength(1), Validators.maxLength(120), Validators.pattern(this.masterDate.onlyAlpha)]),
      phone: new FormControl(data.phone || null,
        [Validators.maxLength(10), Validators.pattern(this.masterDate.phoneNumerhipenvalidation)]),
      email: new FormControl(data.email || null,
        [Validators.maxLength(120), Validators.pattern(this.masterDate.emailValidations)]),
      address1: new FormControl(data.address1 || null,
        [Validators.minLength(1), Validators.maxLength(150), Validators.pattern(this.masterDate.addressPattern)]),
      address2: new FormControl(data.address2 || null,
        [Validators.minLength(1), Validators.maxLength(150), Validators.pattern(this.masterDate.addressPattern)]),
      city: new FormControl(data.city || null,
        []),
      state: new FormControl(data.state || null,
        []),
      zipcode: new FormControl(data.zipcode || null,
        [Validators.maxLength(5)]),
      description: new FormControl(data.description || null,
        []),
      officerType: new FormControl(data.officerType || null,
        []),
    })

    // this.searchAdvanceSub = this.addCommitteeOfficerForm.get('SearchControl').valueChanges.pipe(debounceTime(500)).subscribe(val => {
      // this.searchAssociatedFacilities(val);
    // });
  }
  STUDENTS_DATA = [
    {
      id: 1,
      firstName: "dfdsf",
      lastName: "dfdsf",
      address1: "dfdsf",
      address2: "dfdsf",
      city: "dfdsf",
      state: "AP",
      zipcode: "12345",
      phone: "dfdsf",
      email: "dfdsf",
      description: "dfdsf",
      officerType: "dfdsf",
      isExpanded: false,
    },

  ];


  dataOfficerList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ['toggle', 'firstName', 'lastName', 'officerType', 'description', 'edit'];

  goBack(){
    this.backBtnEmiter.emit(2)
  }

  searchOfficer(event: any){
    this.getOfficerList(event.target.value + '')

  }

  // Toggel Rows
  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataOfficerList.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }

  selectedItem(data: any) {
    console.log(data);
    let { firstName, phone, lastName, email, address1, address2, city, stateCode, zipcode, description, officerType} = data;
    this.modal = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address1,
      address2,
      city,
      state: stateCode,
      zipcode,
      phone,
      email,
      description,
      officerType,
      // officerId,
      // isExpanded: false,
    };
    this.initCommitteeOfficerForm(this.modal);
  }

  // Next page event SubmittOfficers
  validateSubmitOfficer() {
    if (this.dataOfficerList.data.length < 1) {
      return this.snackbar.snackbarError("Minimum One Officer is required", this.masterDate.centre)
    }
    this.officerDataEmitter.emit(this.dataOfficerList.data);
  }

  // Save/Add Officerto List
  validateAddOfficer() {
    if (this.addCommitteeOfficerForm.valid) {
      const data = this.dataOfficerList.data;
      let { firstName, phone, lastName, email, address1, address2, city, state, zipcode, description, officerType } = this.addCommitteeOfficerForm.value;
      if (this.checkEmailAlreadyExist(email)) {
        return this.snackbar.snackbarError("Officer Email already exist in the Current Officers list", this.masterDate.centre)
      }
      this.modal = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        address1,
        address2,
        city,
        state,
        zipcode,
        phone,
        email,
        description,
        officerType,
        isExpanded: false,
      };

      if (!this.FormEditId) {

        this.modal.id = data.length + 1;

      } else {
        // update
        let findI = data.findIndex((fd: any) => fd.id == this.FormEditId);
        if (findI != -1) {
          data.splice(findI, 1)
        }
        this.modal.id = this.FormEditId;
        this.FormEditId = 0;
      }
      data.push(this.modal);
      this.dataOfficerList.data = data;
      this.snackbar.snackbarSuccess("Officer added successfully")
      this.clearForm()
      console.log(this.dataOfficerList);
    }
    else {
      this.addCommitteeOfficerForm.markAllAsTouched();
    }
  }

  checkEmailAlreadyExist(email: string) {
    if (this.FormEditId) return false;

    let exist = this.dataOfficerList.data.findIndex((d: any) => d.email == email);
    return !(exist === -1);
  }

  // clear Form
  clearForm() {
    this.FormEditId = 0;
    this.addCommitteeOfficerForm.reset();

    // this.initCommitteeOfficerForm();
    // Object.keys(this.addCommitteeOfficerForm.controls).forEach(key => {
    //   if(this.addCommitteeOfficerForm.get('key'))
    //   this.addCommitteeOfficerForm.get('key').setErrors(null) ;
    // });
    // this.addCommitteeOfficerForm.reset({
    //   'firstName': '',
    //   'officerType': '',
    //   'description': '',
    //   'address1': '',
    //   'address2':'',
    //   'city': '',
    //   'state': '',
    //   'country': '',
    //    'zipcode': '',
    //    'email':'',
    //    'phone':''

    //  });
     this.addCommitteeOfficerForm.markAsUntouched();
     this.addCommitteeOfficerForm.markAsPristine();
  }

  editOfficerForm(data: any) {
    this.FormEditId = data.id;
    this.initCommitteeOfficerForm(data)
  }

  openConfirmationModal(id: any): void {
    if (this.dataOfficerList.data.length <= 1)
    return this.snackbar.snackbarError('Minimum one officer is required', this.masterDate.centre);
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: "460px",
      // height: "350px",
      data: {
        id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== "close") {
        const data = this.dataOfficerList.data;
        let findI = data.findIndex((fd: any) => fd.id == result);
        if (findI != -1) {
          data.splice(findI, 1)
        }
        this.dataOfficerList.data = data;
      }
    });
  }

}
