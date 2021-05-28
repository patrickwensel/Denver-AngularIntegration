import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MasterDataService, LocalstorageService, CommonMethods, ErrorMessageService, SnackbarService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  static_data: any;
  showProfile: boolean;
  hideSideBar = false;
  public selectedindex = 0;
  noentity : any;
  currenturl: string = '';
  showNoentityMsg : any;

  constructor(
    private masterData: MasterDataService,
    private localStore: LocalstorageService,
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public router: Router,
    public errorService: ErrorMessageService,
    public snackbar: SnackbarService,

  ) { }

  ngOnInit() {
    // this.noentity = this.localStore.getLocalStorage('isnoentity');
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    // this.masterData.currentUser = this.localStore.getLocalStorage(this.masterData.keyUserName) || '';
  }

  changePwd() {
    console.log('router cmae');
    this.hideSideBar = true;
    this.router.navigate(['/profile/changepassword']);
  }

  closedrpdwn() {
    console.log('directive came');
    this.showProfile = true;
  }

  logout() {
    this.localStore.clearAllStorage();
    this.snackbar.snackbarError("Logged Out Successfully!!", 'center');
    this.router.navigate(['/login']);
  }
  clickedlabel(index: any ) {
    console.log('====>', index)
    this.selectedindex = index;
  }

  switchCommittee(){
    this.router.navigate([this.masterData.switchScreenNav])
  }
  checkRouter() {
    const splittedRoute = this.currenturl?.split('/');
    if (splittedRoute && splittedRoute[1] == 'switch') {
      this.showNoentityMsg = true;
    }
  } 
}
