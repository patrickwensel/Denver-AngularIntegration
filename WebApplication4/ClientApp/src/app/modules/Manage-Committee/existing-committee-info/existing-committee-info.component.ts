import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonMethods, MasterUrlService, SnackbarService, MasterDataService, LocalstorageService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from "@angular/common";


@Component({
  selector: 'app-existing-committee-info',
  templateUrl: './existing-committee-info.component.html',
  styleUrls: ['./existing-committee-info.component.scss']
})
export class ExistingCommitteeInfoComponent implements OnInit, OnDestroy{
  static_data: any;
  committeeInfoDetails: any;
  candidateLabels: any;
  id: any;
  type: any;
  committeeType: any;
  sub: Subscription;
  comType = '';


  constructor(
    private commonMethods: CommonMethods,
    public service: ClientService,
    public urlService: MasterUrlService,
    private snackbar: SnackbarService,
    public masterData: MasterDataService,
    private localStore: LocalstorageService,
    private activeroute: ActivatedRoute,
    public router: Router,
    private location: Location,

  ) {

  }

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.getcommiteefields();
    // this.getDetails();
    this.sub = this.activeroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      this.type = params.get('type');     
    });
  }

  getCommitteeType(e) {
    console.log(e);
    this.comType = e;
    this.getcommiteefields();
    console.log('add', this.candidateLabels);
  }


  getcommiteefields() {
    console.log('checking before if', this.comType);
    if (this.comType === "candidate") {
      this.candidateLabels = [{
        displayName: this.static_data.public_funds_navigate_tools.commitee_reg,
        routerLink: ["/manage/manage_committee/approve_deny", this.id]
      },
      {
        displayName: "Public Funding",
        routerLink: ["/manage/manage_committee/public-funding"]
      },
      {
        displayName: this.static_data.public_funds_navigate_tools.filing,
        routerLink: ''
      },
      {
        displayName: this.static_data.public_funds_navigate_tools.messages,
        routerLink: [this.masterData.message_admin]
      },
      {
        displayName: this.static_data.public_funds_navigate_tools.finesandfees,
        routerLink: ''
      },
      {
        displayName: this.static_data.public_funds_navigate_tools.documents,
        routerLink: ''
      }
      ]
    } else {
      this.candidateLabels = [
      {
        displayName: this.static_data.public_funds_navigate_tools.commitee_reg,
        routerLink: ["/manage/manage_committee/approve_deny", this.id]
      },
      {
        displayName: this.static_data.public_funds_navigate_tools.filing,
        routerLink: ''
      },
      {
        displayName: this.static_data.public_funds_navigate_tools.messages,
        routerLink: [this.masterData.message_admin]
      },
      {
        displayName: this.static_data.public_funds_navigate_tools.finesandfees,
        routerLink: ''
      },
      {
        displayName: this.static_data.public_funds_navigate_tools.documents,
        routerLink: ''
      }
      ]
    }

  }

  getDetails() {
    this.service.postData(this.urlService.getCommiteeDetail + '47', {}).subscribe((res) => {
      if (res.hasError) {
        if (res.message) {
          return this.snackbar.snackbarError(res.message, 'center');
        } else {
          return this.snackbar.snackbarError(this.masterData.errorMsg, 'center');
        }
      } else {
        this.assigndetails(res);
        console.log('fsdjflk', res);
      }
    }, err => {
      if (err && err.hasError) {
        this.snackbar.snackbarError(err.message || this.masterData.errorMsg, 'center');
      } else {
        this.snackbar.snackbarError(this.masterData.errorMsg, 'center');
      }
    })
  }

  assigndetails(res) {
    // committeeInfoDetails[0].
    // need to work on this.
  }

  back(){
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  gotoScreen(item: any) {
    console.log(item.routerLink);
    this.router.navigate(item.routerLink);
  }

}
