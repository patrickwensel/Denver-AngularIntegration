import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-current-committee-bank-information',
  templateUrl: './current-committee-bank-information.component.html',
  styleUrls: ['./current-committee-bank-information.component.scss']
})
export class CurrentCommitteeBankInformationComponent implements OnInit {

  static_data: any = {};
  committeeId:any=47;
  committeeDetail:any;
  bankName:any;
  address1:any;
  address2:any;
  city:any;
  state:any;
  zipcode:any;
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


      //this.address1=this.committeeDetail.committeeDetail.cAddress1;
     this.bankName=this.committeeDetail.committeeDetail.bankName;
     this.address1=this.committeeDetail.committeeDetail.bankAddress1;
     this.address2=this.committeeDetail.committeeDetail.bankAddress2;
     this.city=this.committeeDetail.committeeDetail.bankCity;
     this.state=this.committeeDetail.committeeDetail.bankState;
     this.zipcode=this.committeeDetail.committeeDetail.bankZipcode;
    })
  }

}
