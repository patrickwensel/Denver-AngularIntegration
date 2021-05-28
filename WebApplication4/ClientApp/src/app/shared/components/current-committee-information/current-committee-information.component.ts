import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonMethods, MasterDataService, ErrorMessageService, MasterUrlService, SnackbarService, LocalstorageService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-current-committee-information',
  templateUrl: './current-committee-information.component.html',
  styleUrls: ['./current-committee-information.component.scss']
})
export class CurrentCommitteeInformationComponent implements OnInit {

  static_data: any = {};
  @Input() committeeInformation: any = {};
  @Input() filerType: any = 'committee';
  @Input() committeeId:any = 0;
  committeeDetails:any;
  committeeName:any;
  committeeDetail:any;
  cId:any;
  committeeType:any;
  candidateName:any;
  treasurerName:any;
  electionDate:any;
  publicStatus:any;

  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    private urlService: MasterUrlService,
    public snackbar: SnackbarService,
    private localStore: LocalstorageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    // this.getCommitteeDetails();
    if(this.committeeId){
      let url = this.urlService.CommitteeDetail;
      if(this.filerType == 'Lobbyist'){
        url = this.urlService.LobbyistDetail;
      } else if(this.filerType == 'ie'){
        url = this.urlService.IEDetail;
      } 
      this.getCommitteeLobbyDetail(this.committeeId,this.filerType,url);
    }
  }
  getCommitteeLobbyDetail(id: any, type: any,url:any) {
    this.service.postData(`${url}${id}`, {}).subscribe((res) => {
      this.committeeInformation = res[0];
    })
  }

  //   this.service.postDataParams(this.urlService.getCommitteeDetails+ '?committeeId=' +this.committeeId,{}).subscribe((res:any) => {
  //     this.committeeDetail = res;

  //     this.committeeName=this.committeeDetail.committeeDetail.cName;
  //     this.cId = this.committeeDetail.committeeDetail.cId;
  //     this.committeeType = this.committeeDetail.committeeDetail.cType;
  //     this.candidateName = this.committeeDetail.committeeDetail.candidateName;
  //     //this.treasurerName = this.committeeDetail.committeeDetail.;
  //     this.electionDate = this.committeeDetail.committeeDetail.electionDate;
  //     //this.publicStatus = this.committeeDetail.committeeDetail.candidateName;

  //   })
  // }

}
