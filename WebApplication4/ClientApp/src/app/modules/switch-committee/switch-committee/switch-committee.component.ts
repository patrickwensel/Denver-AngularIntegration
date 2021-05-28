import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods, MasterDataService, ErrorMessageService, MasterUrlService, SnackbarService, LocalstorageService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-switch-committee',
  templateUrl: './switch-committee.component.html',
  styleUrls: ['./switch-committee.component.scss']
})
export class SwitchCommitteeComponent implements OnInit {
  hideRequiredMarker: boolean = true;
  userId: any;
  committeeId: any;
  chooseCommitte: any;
  chooseLobbiest: any;
  chooseIE: any;
  //Committee
  getCommitteeList: any;
  getLobbyList: any;
  getIndipendentList: any = [];
  selectedCommLobbList: any = [];
  filerType: any = 'committee';

  committeeList: any = [{ committeeId: 1, committeeName: "sample 1" }, { committeeId: 2, committeeName: "sample 2" }, { committeeId: 3, committeeName: "sample 3" }];
  LobbyList: any = [{ lobbyId: 1, lobbyName: "sample 1" }, { lobbyId: 2, lobbyName: "sample 2" }, { lobbyId: 3, lobbyName: "sample 3" }]
  // localStore: any;
  // masterDate: any;
  // commonMethods: any;
  static_data: any;
  switchInformationForm: any;
  committeDetail: any =
    {
      "id": 1,
      "name": "Test Committee 1",
      "type": "COM-IC",
      "candidateName": "John Smith",
      "treasurerName": "John Smith",
      "electionDate": "2021-03-02T00:00:00",
      "publicFundingStatus": null
    };
  committeeLobbyList: any = {
    "committeelist": [
      // {
      //   "committeeID": 1,
      //   "committeeName": "test"
      // }
    ],
    "lobbyistlist": [
      // {
      //   "lobbyistID": 1,
      //   "lobbyistName": "test"
      // }
    ],
    "ielist": [
      // {
      // "IndependentSpenderID": "1",
      // "IndependentSpenderName": "test"
      // }
    ],
    "userType": "candidate"
  };
  showJoinCommittee: boolean = false;
  showJoinIndipendent: boolean = false;
  showJoinLobby: boolean = false;
  showNewIndipendent: boolean = false
  listData: any;
  hideNext: boolean;
  selectCommittee: any;
  role: string;
  note: any = '';
  showOtherFiler = false;
  showAllFilter: any = false;
  showWhichComm: any = 'committee';
  showWhichCommId: any;
  fromlogin: boolean;

  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    private urlService: MasterUrlService,
    public snackbar: SnackbarService,
    private localStore: LocalstorageService,
    public router: Router,
  ) {
    this.fromlogin = this.localStore.getLocalStorage('fromlogin');

    //   this.fN =localStorage.getItem('firstName');
    //   this.lN =localStorage.getItem('lastName');
    //   this.fullName = (this.fN + this.lN).replace(/"/g, " ");
    //   console.log(this.fullName)


    // let nav_sw = this.router.url.split('/')[2];
    // if(nav_sw == 'nav-switch'){
    //   // this.showOtherFiler = true;
    //   this.showAllFilter = false;
    //   this.showWhichComm = this.localStore.getLocalStorage('user_chosen');
    //   this.showWhichCommId = this.localStore.getLocalStorage('choosen_id');
    //   let whichComm = this.showWhichComm == 'Lobbyist'? 'Lobbyist':this.showWhichComm;
    //   this.filerType = this.showWhichComm;
    //   this.getCommitteeLobbyDetail(parseInt(this.showWhichCommId),whichComm);
    // } else {
    //   this.showAllFilter = true;
    // }
  }

  ngOnInit(): void {
    //For testing
     this.chooseCommitte = this.committeeLobbyList.committeelist[0]?.committeeID || '';
    this.getInit();
    this.initSwitchForm();
    this.getCommitteeLobbyList();
    this.getCommittee();
    this.getLobby();
    this.getOtherFilerDetails();
  }

  getOtherFilerDetails () {
    let nav_sw = this.router?.url?.split('/')[2];
    if(nav_sw == 'nav-switch'){
      this.showOtherFiler = true;
      this.showAllFilter = false;
      let curr_Comm = this.localStore.getLocalStorage('user_chosen');
      this.showWhichComm = curr_Comm?curr_Comm:'committee';
      this.showWhichCommId = this.localStore.getLocalStorage('choosen_id');
      // let whichComm = this.showWhichComm == 'Lobbyist'? 'Lobbyist':this.showWhichComm;
      this.filerType = this.showWhichComm;
      if(curr_Comm){
      if(this.showWhichComm == 'committee'){
        this.chooseCommitte = parseInt(this.showWhichCommId);
        this.onChangeCommittee({committeeID:parseInt(this.showWhichCommId)});
      } else if(this.showWhichComm == 'Lobbyist'){
        this.chooseLobbiest = parseInt(this.showWhichCommId);
        this.onChangeLobby({lobbyistID:parseInt(this.showWhichCommId)});
      }  else if(this.showWhichComm == 'ie'){
        this.chooseIE = parseInt(this.showWhichCommId);
        this.onChangeIE({IndependentSpenderID:parseInt(this.showWhichCommId)});
      }
    }
      // this.getCommitteeLobbyDetail(parseInt(this.showWhichCommId),whichComm);
    } else {
      this.showAllFilter = true;
    }
  }

  getInit() {
    if (!this.userId)
      this.userId = this.localStore.getLocalStorage(this.masterDate.userId);

    this.userId = parseInt(this.userId);
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    // this.userId = 3;

  }

  getCommitteeLobbyList() {
    this.service.postData(`${this.urlService.CommitteeLobbyList}${this.userId}`, {}).subscribe((res) => {
      this.committeeLobbyList = res[0];
      if (this.committeeLobbyList && this.committeeLobbyList.committeelist.length && !this.showOtherFiler) {
        this.chooseCommitte = this.committeeLobbyList.committeelist[0].committeeID;
      } else if (this.committeeLobbyList && this.committeeLobbyList.lobbyistlist.length && !this.showOtherFiler) {
        this.chooseLobbiest = this.committeeLobbyList.lobbyistlist[0].lobbyistID;
      } else if (this.committeeLobbyList && this.committeeLobbyList.ielist.length && !this.showOtherFiler) {
        this.chooseIE = this.committeeLobbyList.ielist[0].IndependentSpenderID;
      }
    })
  }

  getCommitteeLobbyDetail(id: any, type: any, url:any) {
    this.service.postData(`${url}${id}`, {}).subscribe((res) => {
      this.committeDetail = res[0];
    })
  }

  initSwitchForm() {
    // this.switchInformationForm = new FormGroup({
    //   committeeId: new FormControl('' || null, []),
    // });
  }

  //   api/UserManagement/UpdateIEFAdditionalInfo
  // {"userID":505,"userTypeId":"USER-IEF","filerType":"FT-ORG","occupation":"","employer":"ewrer"

  onChangeCommittee(details: any) {
    this.chooseLobbiest = '';
    this.chooseIE = '';
    this.filerType = 'committee';
    this.getCommitteeLobbyDetail(details.committeeID, 'committee',this.urlService.CommitteeDetail);
  }

  onChangeLobby(details: any) {
    this.chooseCommitte = '';
    this.chooseIE = '';
    this.filerType = 'Lobbyist';
    this.getCommitteeLobbyDetail(details.lobbyistID, 'Lobbyist',this.urlService.LobbyistDetail);
  }

  onChangeIE(details: any) {
    this.chooseCommitte = '';
    this.chooseLobbiest = '';
    this.filerType = 'ie';
    this.getCommitteeLobbyDetail(details.independentSpenderID, 'ie',this.urlService.IEDetail);
  }

  viewOther() {
    this.showAllFilter = true;
  }

  // New /Join Event
  switchJoinNewEvent(event: any) {
    this.Sendback();
    console.log(event);
    let { type, id } = event;
    if (type == 'new') {
      switch (id) {
        case 1:
          this.router.navigate(['/committee/committee-registration']);
          break;
        case 2:
          // this.router.navigate(['/lobbyist/createlobbyist']);
          this.showNewIndipendent = true;
          break;
        case 3:
          this.router.navigate(['/lobbyist/createlobbyist']);
          break;
        default:
          break;
      }
    } else {
      switch (id) {
        case 1:
          this.showJoinCommittee = true;
          break;
        case 2:
          this.showJoinIndipendent = true;
          break;
        case 3:
          this.showJoinLobby = true;
          break;
        default:
          break;
      }
    }
  }


  deleteSelectedList(e: any) {
    //TODO remove selected lobby/Committee from list
    console.log("need to do remove selected lobby/Committee from list", e.data);
    this.selectedCommLobbList.splice(e.idx, 1);
  }

  addSelectedtoList(data: any) {
    this.listData = data;
    //TODO add selected lobby/Committee to list
    console.log("need to do add selected lobby/Committee from list", data);
    if (this.selectedCommLobbList.length < 10) {
      let findLockerProduct
      if (this.showJoinCommittee) {
        findLockerProduct = this.selectedCommLobbList.find(
          (o: any) => o.committeeId == data.committeeId
        );
      } else if (this.showJoinLobby) {
        findLockerProduct = this.selectedCommLobbList.find(
          (o: any) => o.lobbyistID == data.lobbyistID
        );


      } else if (this.showJoinIndipendent) {
        findLockerProduct = this.selectedCommLobbList.find(
          //Need to change
          (o: any) => o.independentSpenderID == data.independentSpenderID
        );
      }
      if (findLockerProduct) {
        return this.snackbar.snackbarError(
          "Already Selected",
          this.masterDate.centre
        );
      } else {
        this.selectedCommLobbList.push(data);
        this.hideNext = false;
        this.getCommitteeList = [];
        this.getLobbyList = [];
        this.getIndipendentList = [];
      }
    } else {
      this.snackbar.snackbarError(
        "Maximum Limit Reached",
        this.masterDate.centre
      );
    }

  }

  addSearchEmitter(e: any) {
    this.selectCommittee = e;
    if (this.showJoinCommittee) {
      this.getCommittee();
    } else if (this.showJoinLobby) {
      this.getLobby();
    } else if (this.showJoinIndipendent) {
      this.getIndipendent();
    }
  }

  getCommittee() {
    const id = {
      searchCommitteeName: this.selectCommittee ? this.selectCommittee : "",
    };
    this.service
      .postData(this.urlService.committeeList, id)
      .subscribe((res: any) => {
        this.getCommitteeList = res;
        console.log(res)
      });
  }
  getLobby() {
    const id = {
      searchLobbyName: this.selectCommittee ? this.selectCommittee : "",
    };
    this.service.postData(this.urlService.lobbyList, id).subscribe((res: any) => {
      this.getLobbyList = res;
      console.log(this.getLobbyList);
    });
  }

  getIndipendent() {
    const id = {
      IndependentSpender: this.selectCommittee ? this.selectCommittee : "",
    };
    // Need to change URL
    this.service.postData(this.urlService.indipendentList, id).subscribe((res: any) => {
      this.getIndipendentList = res;
      console.log(this.getIndipendentList);
    });
  }
  navigate(data: any) {

  }

  SendDetail(selectedJoin: any) {
    let type = "Committee";
    if (selectedJoin == 3) {
      type = "Lobbyist";
    } else if (selectedJoin == 2) {
      type = "Indipend Expenditure"
    }
    if (this.selectedCommLobbList.length == 0 || !this.note) {


      return this.snackbar.snackbarError(`please select ${type} and add Note to it`, this.masterDate.centre)
    }
    let sendObj: any = {
      userID: this.userId,
      notes: this.note
    }
    let url = '';
    if (selectedJoin == 1) {
      url = this.urlService.sendCommittee;
      //Join Committee
      sendObj.committeeids = this.selectedCommLobbList.map((sel: any) => {
        return {
          committeeID: sel.committeeId
        }
      })
    } else if (selectedJoin == 2) {
      url = this.urlService.sendIE;
      //Join Lobbyist
      sendObj.independentSpenderids = this.selectedCommLobbList.map((sel: any) => {
        return {
          independentSpenderID: sel.independentSpenderID
        }
      })
    } else if (selectedJoin == 3) {
      //Join IE
      url = this.urlService.sendLobbyist;
      sendObj.lobbyistids = this.selectedCommLobbList.map((sel: any) => {
        return {
          lobbyistID: sel.lobbyistID
        }
      })
    }

    this.sendDetailService(url, sendObj, type);
  }

  sendDetailService(url, payload, type) {
    this.service.postData(url, payload).subscribe((res: any) => {
      this.snackbar.snackbarSuccess(`${type}'s are sent for approval`);
      this.Sendback();
    });
  }

  SendNewIEDetail() {
    // let  {"userID":505,"userTypeId":"USER-IEF","filerType":"FT-ORG","occupation":"","employer":"ewrer"}
  }

  Sendback() {
    this.showJoinCommittee = false;
    this.showJoinIndipendent = false;
    this.showJoinLobby = false;
    this.showNewIndipendent = false;
    this.selectedCommLobbList = [];
    this.note = '';
  }

  IEFormData(event: any) {
    //Need to Do
    console.log(event);
    let { filerType, occupation, employer, userTypeId = 'USER-IEF' } = event;
    this.service.postData(this.urlService.saveIE, { userID: this.userId, filerType, occupation, employer, userTypeId }).subscribe((res: any) => {
      this.snackbar.snackbarSuccess(`New Indipend Expenditure are sent for approval`);
      this.Sendback();
    });

  }

  selectFiler() {
    const fromlogin = this.localStore.setLocalStorage('fromlogin', false);
    //Need to Do
    this.localStore.setLocalStorage('user_type', this.committeeLobbyList.userType);
    if (this.chooseCommitte) {
      this.localStore.setLocalStorage('choosen_id', this.chooseCommitte);
      this.localStore.setLocalStorage('user_chosen', 'committee');
      this.router.navigate([this.masterDate.dashboard]);
    } else if (this.chooseLobbiest) {
      this.localStore.setLocalStorage('choosen_id', this.chooseLobbiest);
      this.localStore.setLocalStorage('user_chosen', 'Lobbyist');
      this.router.navigate([this.masterDate.lobbyDashboard]);
    } else if (this.chooseIE) {
      this.localStore.setLocalStorage('choosen_id', this.chooseIE);
      this.localStore.setLocalStorage('user_chosen', 'ie');
      this.router.navigate([this.masterDate.dashboard]);
    }
  }

}
