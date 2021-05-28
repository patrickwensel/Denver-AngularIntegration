import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods, ErrorMessageService, MasterDataService, MasterUrlService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-committee-contact-information',
  templateUrl: './committee-contact-information.component.html',
  styleUrls: ['./committee-contact-information.component.scss']
})
export class CommitteeContactInformationComponent implements OnInit {
  hideRequiredMarker:boolean = true;
  @Output() contactInformationFormValue = new EventEmitter<Object>();
  @Output() backBtnEmiter = new EventEmitter<Object>();
  @Input() committeeInformation: any = {committeeInfo:{}};
  createCommitteeInformationForm: FormGroup;
  createcommitteeInfoForm: any;
  static_data: any = {};
  stateList : any =[];

  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private urlService: MasterUrlService,
    private service: ClientService,
  ) { }

  ngOnInit(): void {
    // this.initCreateForm();
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.getStateList ()
    this.initCreateForm(this.committeeInformation.committeeInfo)
  }


  getStateList (){
    this.service.getData(this.urlService.getStatelist).subscribe((res: any) => {
      this.stateList = res;
    })
  }
  goBack(){
    this.backBtnEmiter.emit(1)
  }

  initCreateForm(committeeInfo: any) {
    this.createCommitteeInformationForm = new FormGroup({
      address1: new FormControl(committeeInfo.address1 || null,
        [Validators.minLength(1), Validators.maxLength(150), Validators.pattern(this.masterDate.addressPattern)]),
      address2: new FormControl(committeeInfo.address2 || null,
        [Validators.minLength(1), Validators.maxLength(150), Validators.pattern(this.masterDate.addressPattern)]),
      city: new FormControl(committeeInfo.city || null,
        []),
      campPhone: new FormControl(committeeInfo.campaignPhone || null,
        [Validators.maxLength(10), Validators.pattern(this.masterDate.phoneNumerhipenvalidation)]),


      state: new FormControl(committeeInfo.stateCode || null,
        []),
      zipCode: new FormControl(committeeInfo.zipcode|| null,
      [Validators.maxLength(5)]),
      campEmail: new FormControl(committeeInfo.campaignEmail|| null,
        [Validators.required, Validators.email, Validators.maxLength(120),
        Validators.pattern(this.masterDate.emailValidations)]),
      altPhone: new FormControl(committeeInfo.otherPhone || null,
        [Validators.maxLength(10)]),
      altEmail: new FormControl(committeeInfo.otherEmail || null,
        [Validators.email, Validators.maxLength(120),
        Validators.pattern(this.masterDate.emailValidations)]),
      commWebsite: new FormControl(committeeInfo.campaignWebsite || null,
        [Validators.maxLength(120),
          Validators.pattern(this.masterDate.websiteRegex)]),
    });
  }

  next() {
    if (this.createCommitteeInformationForm.valid) {
      this.createcommitteeInfoForm = this.createCommitteeInformationForm.value;
      console.log(JSON.stringify(this.createcommitteeInfoForm));
      this.contactInformationFormValue.emit(this.createcommitteeInfoForm)

    }
    else{
      this.createCommitteeInformationForm.markAllAsTouched();
    }
  }
}
