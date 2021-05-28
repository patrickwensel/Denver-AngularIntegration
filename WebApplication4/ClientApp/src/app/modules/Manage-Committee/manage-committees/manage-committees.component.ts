import { viewClassName } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { CommonMethods, ErrorMessageService, MasterUrlService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-manage-committees',
  templateUrl: './manage-committees.component.html',
  styleUrls: ['./manage-committees.component.scss'],
})
export class ManageCommitteesComponent implements OnInit {

  @Output() addSearchEmitter: EventEmitter<any> = new EventEmitter<any>();
  manageCommitteeForm: FormGroup;
  static_data: any;
  hideRequiredMarker: boolean = true;
  typeCommittee:any;
  userType:any;
  status:any;
  getCommitteeList:any;
  selectCommittee:any;
  officerList:any;
  searchFilers:any;
  txtQueryChanged: Subject<string> = new Subject<string>();
  searchpopular: any;
  committeeList:any;
  filerid:any;
  filername:any;
  filerStatus:any;
  lastfillingDate:any;
  createdDate:any;
  electionDate:any;
  modal:any;
  getUserType:any;
  visible:boolean=false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  manageFilerDetails:any;
  primaryUser:any;
  isExpanded: false;
  selectedFilterType="";
  selectedFilterStatus="";
  selectedFilterCType="";
  selectedFilterOffice="";

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('allSelectedStatus') private allSelectedStatus :MatOption;
  @ViewChild('allSelectedOffice') private allSelectedOffice :MatOption;
  @ViewChild('allSelectedCType') private allSelectedCType :MatOption;

  constructor(
    public errorService: ErrorMessageService,
    private commonMethods: CommonMethods,
    private urlService: MasterUrlService,
    private service: ClientService,
    public router: Router,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.txtQueryChanged.pipe(
      debounceTime(1000) ,// wait 1 sec after the last event before emitting last event
      distinctUntilChanged())// only emit if value is different from previous value
      .subscribe(model => {
        this.searchpopular = model;
    this.addSearchEmitter.emit(this.searchpopular);

      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.createManageCommittee();
    this.getCommitteeType();
    this.getOfficerTypeList();
    this.getCommittee();
    this.getStatus();
    //this.getManageCommitteeDetails();
    this.getFilerType();
    this.getManageFilerDetail();

  }
  committeegrid: string[] = ['filerID', 'filerName', 'status', 'primaryUser','lastFillingDate','createdDate','electionDate','view'];
  dataSource = new MatTableDataSource();

  getManageFilerDetail(){
    console.log(this.manageCommitteeForm.value)
    const searchResult = {
        "filerName": "",
        "filerType": this.selectedFilterType?this.selectedFilterType:"",
        "filerStatus": this.selectedFilterStatus?this.selectedFilterStatus:"",
        "lastFillingStartDate": null,
        "lastFillingEndDate": null,
        "committeType": this.selectedFilterCType?this.selectedFilterCType:"",
        "officeType": this.selectedFilterOffice?this.selectedFilterOffice:"",
        "publicFundStatus": ""
    }

    this.service.postData(this.urlService.getManageFilerDetail,searchResult).subscribe((res:any) => {
      this.manageFilerDetails = res;
      //const sample = this.manageFilerDetails.pipe(filter(data => searchResult))
      console.log(this.manageFilerDetails)
      const data = [];
      if(this.manageFilerDetails==""){
        this.dataSource.data=[];
      }
      else
      {
     for (let i = 0; i < this.manageFilerDetails.length; i++) {
      this.modal = {
        filerid:this.manageFilerDetails[i].id,
        filername:this.manageFilerDetails[i].name,
        filerStatus:this.manageFilerDetails[i].status,
        primaryUser:this.manageFilerDetails[i].primaryUser,
        lastfillingDate:this.manageFilerDetails[i].lastFillingDate,
        createdDate:this.manageFilerDetails[i].createdDate,
        electionDate:this.manageFilerDetails[i].electionDate,
        filerType:this.manageFilerDetails[i].filerType
      }
      //const data=[];


      data.push(this.modal);
      this.dataSource.data=[];
      setTimeout(() => {
        this.dataSource.data = data;
        this.table.renderRows();
        this.changeDetectorRefs.detectChanges();
      }, 200);
    }
     }
    })
  }

  onChangeType(data){
    this.selectedFilterType = this.manageCommitteeForm.controls.filerType.value? this.manageCommitteeForm.controls.filerType.value.toString():"";
    this.selectedFilterStatus =this.manageCommitteeForm.controls.filerStatus.value? this.manageCommitteeForm.controls.filerStatus.value.toString():"";
    this.selectedFilterCType = this.manageCommitteeForm.controls.committeeType.value?this.manageCommitteeForm.controls.committeeType.value.toString():"";
    this.selectedFilterOffice = this.manageCommitteeForm.controls.office.value?this.manageCommitteeForm.controls.office.value.toString():"";
    this.getManageFilerDetail();
  }


  getOfficerTypeList (){
    this.officerList =[];
    this.service.postData(this.urlService.getOfficerTypeList,{"lookUpType": "OFF"}).subscribe((res: any) => {
      this.officerList = res;
      console.log(this.officerList);
    })
  }

  getCommitteeType() {
    this.service.postData(this.urlService.committeeGetList,{"lookUpType": "COM"}).subscribe((res) => {
      this.typeCommittee = res;
      console.log(this.typeCommittee);
    })
  }

  getStatus(){
    this.service.postData(this.urlService.getStatusList,{"statusType": "COM-STATUS"}).subscribe((res) => {
      this.status = res;
      console.log(this.status);
    })
  }

  getCommitteType(typeCommittee: any) {
    if (this.userType == 'USER-CAN') {
      return 'COM-CAN';
    } else if (this.userType == 'USER-TSR') {
      return 'COM-IC';
    }
    return typeCommittee;
  }

  selectedItem(data: any) {
    this.createManageCommittee();
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
  getFilerType(){
    this.service
      .getData(this.urlService.getallUserType)
      .subscribe((res: any) => {
        this.getUserType = res;
      });
  }
  //FilerType
  toggleAllSelectionType() {
    if (this.allSelected.selected) {
      this.manageCommitteeForm.controls.filerType
        .patchValue([...this.getUserType.map(item => item.userTypeId), 0]);
    } else {
      this.manageCommitteeForm.controls.filerType.patchValue([]);
    }
  }
  tosslePerOneType(all){
    if (this.allSelected.selected) {
     this.allSelected.deselect();
     return false;
 }
   if(this.manageCommitteeForm.controls.filerType.value.length==this.getUserType.length)
     this.allSelected.select();
 }

 //FilerStatus
 toggleAllSelectionStatus() {
  if (this.allSelectedStatus.selected) {
    this.manageCommitteeForm.controls.filerStatus
      .patchValue([...this.status.map(item => item.statusCode), 0]);
  } else {
    this.manageCommitteeForm.controls.filerStatus.patchValue([]);
  }
}

tosslePerOneStatus(all){
  if (this.allSelectedStatus.selected) {
   this.allSelectedStatus.deselect();
   return false;
}
 if(this.manageCommitteeForm.controls.filerStatus.value.length==this.status.length)
   this.allSelectedStatus.select();
}

//Office
toggleAllSelectionOffice() {
  if (this.allSelectedOffice.selected) {
    this.manageCommitteeForm.controls.office
      .patchValue([...this.officerList.map(item => item.lookUpTypeId), 0]);
  } else {
    this.manageCommitteeForm.controls.office.patchValue([]);
  }
}

tosslePerOneOffice(all){
  if (this.allSelectedOffice.selected) {
   this.allSelectedOffice.deselect();
   return false;
}
 if(this.manageCommitteeForm.controls.office.value.length==this.officerList.length)
   this.allSelectedOffice.select();
}

//CommitteeType
toggleAllSelectionCType() {
  if (this.allSelectedCType.selected) {
    this.manageCommitteeForm.controls.committeeType
      .patchValue([...this.typeCommittee.map(item => item.lookUpTypeId), 0]);
  } else {
    this.manageCommitteeForm.controls.committeeType.patchValue([]);
  }
}

tosslePerOneCType(all){
  if (this.allSelectedCType.selected) {
   this.allSelectedCType.deselect();
   return false;
}
 if(this.manageCommitteeForm.controls.committeeType.value.length==this.typeCommittee.length)
   this.allSelectedCType.select();
}

  moreFilters(){
    console.log("HAiii");
    this.visible=true
  }


  createManageCommittee() {
    this.manageCommitteeForm = new FormGroup({
      searchFilers: new FormControl('' || null),
      filerStatus : new FormControl('' || null, [Validators.required]),
      filerType: new FormControl('' || null, [Validators.required]),
      committeeType: new FormControl('' || null),
      startDate : new FormControl('' || null),
      endDate: new FormControl('' || null),
      office: new FormControl('' || null),
      publicFundingStatus : new FormControl('' || null)
    });
  }

  viewDetails(element) {
    console.log("girdelemetn", element);
    this.router.navigate(['/manage/manage_committee/existing-committee',element.filerid , element.filerType]);
  }


}
