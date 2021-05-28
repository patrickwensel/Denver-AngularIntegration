import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMethods, ErrorMessageService, MasterDataService, MasterUrlService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { Location } from "@angular/common";


@Component({
  selector: 'app-committee-information',
  templateUrl: './committee-information.component.html',
  styleUrls: ['./committee-information.component.scss']
})
export class CommitteeInformationComponent implements OnInit {
  hideRequiredMarker: boolean = true;
  @Input() committeeInformation: any = {committeeInfo:{}};
  @Output() InformationFormValue = new EventEmitter<Object>();
  committeeInformationForm: any;
  static_data: any = {};
  committeeInfoForm:any;
  typeCommittee: any = [];
  ballotIssue: any = [];
  electionDate:any=[];
  position : any =[];
  userType: any = '';
  getAllOfficeListApi: any;
  otherCommittee: boolean = false;
  canUser: any;

  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    private urlService: MasterUrlService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    public router: Router,
    public route : ActivatedRoute,
    private location: Location,

  ) { }

  ngOnInit(): void {
    this.getUserDetailQueryparams();
    this.getAllOfficeList();
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    // this.InformationForm();
    this.getCommitteeType();
    this.getBallotIssue();
    this.getPosition();
    this.InformationForm(this.committeeInformation.committeeInfo)
  }
  getUserDetailQueryparams(){
    this.route?.queryParams.subscribe((params:any) => {
      this.userType = params['userType'];
      this.canUser = params['userType'];
   });
  }
  changevalue(e){
    if (e.lookUpTypeId == "COM-IC"){
      this.userType = 'USER-TSR'
      this.otherCommittee = false;
    }else if (e.lookUpTypeId == "COM-CAN"){
      this.userType = 'USER-CAN'
      this.otherCommittee = false;
    }else{
      this.otherCommittee = true;
      this.userType = ''
    }
  }
  getCommitteType(typeCommittee: any) {
    if (this.userType == 'USER-CAN') {
      return 'COM-CAN';
    } else if (this.userType == 'USER-TSR') {
      return 'COM-IC';
    }
    return typeCommittee;
  }

  checkForUserTypeTSR(){
    return(this.userType == 'USER-TSR')
  }

  checkForUserTypeCAN(){
    return (this.userType == 'USER-CAN')
  }
  getAllOfficeList() {
    this.service
      .getData(this.urlService.getallOfficeList)
      .subscribe((res: any) => {
        this.getAllOfficeListApi = res;
      });
  }
  InformationForm(committeeInfo: any) {
    this.committeeInformationForm = new FormGroup({
      committeeName: new FormControl(committeeInfo.committeeName || null,),
      committeeType: new FormControl(this.getCommitteType(committeeInfo.committeType) || null),
      ballotIssue: new FormControl(committeeInfo.ballotIssueNote || null),
      electionDate: new FormControl(committeeInfo.electionDateRefId || null),
      candidateFirstName: new FormControl(committeeInfo.CandidateFirstName || null),
      candidateLastName: new FormControl(committeeInfo.CandidateLastName || null),
      office_sought: new FormControl(committeeInfo.officerType || null), 
      district: new FormControl(committeeInfo.district || null,
      ),     
      position: new FormControl(committeeInfo.position || null),
      purpose: new FormControl(committeeInfo.purpose || null),
    });
  }

  getCommitteeType() {
    this.service.postData(this.urlService.committeeGetList,{"lookUpType": "COM"}).subscribe((res) => {
      this.typeCommittee = res;
      console.log(this.typeCommittee)

    })
  }
  getBallotIssue(){
    this.service.getData(this.urlService.ballotInformation).subscribe((res) => {
      for (let index = 0; index < res.length; index++) {
        let {ballotIssue, ballotIssueCode,  electionDate, sequenceNo, electionDateRefId=0}  = res[index];
        this.ballotIssue.push({ballotIssue, ballotIssueCode});
        this.electionDate.push({electionDate, sequenceNo, electionDateRefId})

      }
      console.log(this.ballotIssue);
    })
  }
  getPosition(){
    this.service.postData(this.urlService.lookupGetList,{"lookUpType": "POSITION"}).subscribe((res: any) => {
     for (let index = 0; index < res.length; index++) {
     this.position.push(res[index].lookUpName);

     }
      console.log(this.position);
    })
      }


  validateSubmitContactInfo() {
      // this.InformationFormValue.emit(this.committeeInfoForm.value);

      if (this.userType == "USER-CAN"){
        this.committeeInformationForm.controls['committeeName'].setValidators([Validators.required,Validators.minLength(1), Validators.maxLength(100)]),
        this.committeeInformationForm.controls['committeeType'].setValidators([Validators.required]),
        this.committeeInformationForm.controls['candidateFirstName'].setValidators([Validators.required]),
        this.committeeInformationForm.controls['candidateLastName'].setValidators([Validators.required]),
        this.committeeInformationForm.controls['office_sought'].setValidators([Validators.required]),
        this.committeeInformationForm.controls['electionDate'].setValidators([Validators.required]),
        this.committeeInformationForm.controls['committeeName'].updateValueAndValidity()
        this.committeeInformationForm.controls['committeeType'].updateValueAndValidity()
        this.committeeInformationForm.controls['candidateFirstName'].updateValueAndValidity()
        this.committeeInformationForm.controls['candidateLastName'].updateValueAndValidity()
        this.committeeInformationForm.controls['office_sought'].updateValueAndValidity()
        this.committeeInformationForm.controls['electionDate'].updateValueAndValidity()
        this.committeeInformationForm.controls['ballotIssue'].clearValidators()
        this.committeeInformationForm.controls['purpose'].clearValidators()
        this.committeeInformationForm.controls['position'].clearValidators()
      }else if(this.userType == "USER-TSR"){
        this.committeeInformationForm.controls['committeeName'].setValidators([Validators.required,Validators.minLength(1), Validators.maxLength(100)]),
        this.committeeInformationForm.controls['committeeType'].setValidators([Validators.required]),
        this.committeeInformationForm.controls['ballotIssue'].setValidators([Validators.required]),
        this.committeeInformationForm.controls['electionDate'].setValidators([Validators.required]),
        this.committeeInformationForm.controls['position'].setValidators([Validators.required]),
        this.committeeInformationForm.controls['purpose'].setValidators([Validators.required])
        this.committeeInformationForm.controls['committeeName'].updateValueAndValidity()
        this.committeeInformationForm.controls['committeeType'].updateValueAndValidity()
        this.committeeInformationForm.controls['ballotIssue'].updateValueAndValidity()
        this.committeeInformationForm.controls['electionDate'].updateValueAndValidity()
        this.committeeInformationForm.controls['purpose'].updateValueAndValidity()
        this.committeeInformationForm.controls['candidateFirstName'].clearValidators()
        this.committeeInformationForm.controls['candidateLastName'].clearValidators()
        this.committeeInformationForm.controls['office_sought'].clearValidators()
      }else{
        this.committeeInformationForm.controls["purpose"].setValidators([Validators.required,Validators.minLength(2), Validators.maxLength(300)])
        this.committeeInformationForm.controls['purpose'].updateValueAndValidity()
        this.committeeInformationForm.controls['candidateFirstName'].clearValidators()
        this.committeeInformationForm.controls['candidateLastName'].clearValidators()
        this.committeeInformationForm.controls['office_sought'].clearValidators()
        this.committeeInformationForm.controls['ballotIssue'].clearValidators()
        this.committeeInformationForm.controls['position'].clearValidators()
        this.committeeInformationForm.controls['electionDate'].clearValidators()
        this.committeeInformationForm.controls['committeeName'].clearValidators()
        this.committeeInformationForm.controls['committeeType'].clearValidators()
      }
      if (this.committeeInformationForm.valid) {
        this.committeeInfoForm = this.committeeInformationForm.value;
      console.log(JSON.stringify(this.committeeInfoForm));
      this.InformationFormValue.emit(this.committeeInfoForm)
    }
    else {
      this.committeeInformationForm.markAllAsTouched();
    }
  }
  back(){
    this.location.back();
  }
}
