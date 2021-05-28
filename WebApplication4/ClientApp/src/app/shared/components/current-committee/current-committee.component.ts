import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';


@Component({
  selector: 'app-current-committee',
  templateUrl: './current-committee.component.html',
  styleUrls: ['./current-committee.component.scss']
})
export class CurrentCommitteeComponent implements OnInit {

  static_data: any = {};
  committeeDetails:any;
  committeeName:any;
  committeeDetail:any;
  cId:any;
  committeeType:any;
  candidateName:any;
  treasurerName:any;
  electionDate:any;
  publicStatus:any;
  district:any;
  @Input() Id:any;

  constructor(private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    private urlService: MasterUrlService,
    public snackbar: SnackbarService,
    private localStore: LocalstorageService,
    private fb: FormBuilder
) { }

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();

    this.getCommitteeInfoDetails();
  }

  getCommitteeInfoDetails(){
    this.service.postData(this.urlService.getCommiteeDetail + this.Id, {}).subscribe((res) => {
      this.committeeDetail = res;
      console.log(this.committeeDetail)

      this.committeeName=this.committeeDetail.committeeDetail.cName;
      this.cId = this.committeeDetail.committeeDetail.cId;
      this.district = this.committeeDetail.cDistrict;
      this.committeeType = this.committeeDetail.committeeDetail.cType;
      this.candidateName = this.committeeDetail.committeeDetail.candidateName;
      //this.treasurerName = this.committeeDetail.committeeDetail.;
      this.electionDate = this.committeeDetail.committeeDetail.electionDate;
      //this.publicStatus = this.committeeDetail.committeeDetail.candidateName;

    })
  }
  }
