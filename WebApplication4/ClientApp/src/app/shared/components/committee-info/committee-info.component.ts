import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonMethods, MasterUrlService, SnackbarService, MasterDataService, LocalstorageService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-committee-info',
  templateUrl: './committee-info.component.html',
  styleUrls: ['./committee-info.component.scss']
})
export class CommitteeInfoComponent implements OnInit {
  @Input() Id: any;
  @Input() Type: any;
  listitems: any;
  committeeInfoDetails: any;
  static_data: any;
  bindItems: any;
  localrole: any;
  @Output() committeeType: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private commonMethods: CommonMethods,
    public service: ClientService,
    public urlService: MasterUrlService,
    private snackbar: SnackbarService,
    public masterDate: MasterDataService,
    private localStore: LocalstorageService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.localrole = this.localStore.getLocalStorage('user_chosen');
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.getlistItems();
    this.getDetails();
  }

  getlistItems() {
    this.listitems = [];
  }

  getDetails() {
    this.service.postData(this.urlService.getCommiteeDetail + this.Id, {}).subscribe((res) => {
      if (res.hasError) {
        if (res.message) {
          return this.snackbar.snackbarError(res.message, 'center');
        } else {
          return this.snackbar.snackbarError(this.masterDate.errorMsg, 'center');
        }
      } else {
        this.bindItems = res;
        if(res.committeeDetail.cType == 'Candidate Committee') {
          this.committeeType.emit('candidate');
        } else if (res.committeeDetail.cType == 'Issue Committee'){
          this.committeeType.emit('issue');
        }
      }
    }, err => {
      if (err && err.hasError) {
        this.snackbar.snackbarError(err.message || this.masterDate.errorMsg, 'center');
      } else {
        this.snackbar.snackbarError(this.masterDate.errorMsg, 'center');
      }
    })
  }

  // assigndetails(res) {
  //   let labelarray = this.committeeInfoDetails;
  //   this.listitems = [];
  //   console.log('res', res);
  //   let resarr = [res.committeeDetail.cName, res.committeeDetail.cId, res.committeeDetail.cType, res.committeeDetail.Candidate_name, res.committeeDetail.Candidate_name, res.committeeDetail.electionDate  ]
  //   labelarray.forEach((element: any) => {
  //     element.value = res.committeeDetail.Candidate_name
  //     console.log('===>>>>>>', element);
  //     // this.listitems.push(obj)
  //   });
  // }


}
