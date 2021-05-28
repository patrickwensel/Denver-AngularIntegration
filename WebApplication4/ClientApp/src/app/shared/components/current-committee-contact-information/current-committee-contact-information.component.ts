import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-current-committee-contact-information',
  templateUrl: './current-committee-contact-information.component.html',
  styleUrls: ['./current-committee-contact-information.component.scss']
})
export class CurrentCommitteeContactInformationComponent implements OnInit {

  static_data: any = {};

  committeeId:any=47;
  committeeDetail:any;
  address1:any;
  address2:any;
  city:any;
  state:any;
  zipcode:any;
  campaignPhone:any;
  alternatePhone:any;
  campaignEmail:any;
  alternateEmail:any;
  website:any;
  @Input() Id: any;

  constructor( private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    private urlService: MasterUrlService,
    public snackbar: SnackbarService,
    private localStore: LocalstorageService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.getCommitteeDetails();
  }
  getCommitteeDetails(){

    this.service.postData(this.urlService.getCommiteeDetail + this.Id, {}).subscribe((res) => {
      this.committeeDetail = res;


      this.address1=this.committeeDetail.committeeDetail.cAddress1;
      this.address2=this.committeeDetail.committeeDetail.cAddress2;
      //this.city=this.committeeDetail.committeeDetail.cAddress2;
      this.state=this.committeeDetail.committeeDetail.cState;
      this.zipcode=this.committeeDetail.committeeDetail.cZipcode;
      this.campaignPhone=this.committeeDetail.committeeDetail.campaignPhone;
      this.alternatePhone=this.committeeDetail.committeeDetail.otherPhone;
      this.campaignEmail=this.committeeDetail.committeeDetail.compaignEmail;
      this.alternateEmail=this.committeeDetail.committeeDetail.otherEmail;
      //this.website=this.committeeDetail.committeeDetail.cAddress2;
    })
  }

}
