import { Component, OnInit, Input } from '@angular/core';
import { LocalstorageService, CommonMethods } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavcomponent',
  templateUrl: './sidenavcomponent.component.html',
  styleUrls: ['./sidenavcomponent.component.scss']
})
export class SidenavcomponentComponent implements OnInit {
  localrole: any;
  static_data: any;
  public selectedindex = 0;
  isadmin = false;
  islobby = false;
  currenturl: string = '';
  showmsg = false;
  isnoentity: any;
  hidesidenav: any;
  public index = 0;
  constructor(
    private localStore: LocalstorageService,
    private commonMethods: CommonMethods,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currenturl = this.router.url;
    console.log(this.router.url)
    this.localrole = this.localStore.getLocalStorage('user_type');
    this.isnoentity = this.localStore.getLocalStorage('isnoentity');
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.setSidePanel();
    this.checkRouter();
  }

  setSelectedIndex(e) {
    // this.selectedindex
    console.log('mesaage', e);
    // if(this.localrole == 'admin') {
    this.router.navigate(['/manage/messages']);
    this.selectedindex = e;
    // }
  }

  clickedAdminlabel( navigate) {
    switch (navigate) {
      case 'managecomittee':
        this.router.navigate(['/manage/manage_committee']);
        break;
      case 'reviewFilling':
        this.router.navigate(['/']);
        break;
      case 'finesandfees':
        this.router.navigate(['/']);
        break;
      case 'message':
        this.router.navigate(['/manage/messages']);
        break;
      case 'systemManagement':
        this.router.navigate(['/system/Management']);
        break;
      case 'calender':
        this.router.navigate(['/']);
        break;
    }
  }

  clickedlabel(index, navigate) {
    this.selectedindex = index;
    switch (navigate) {
      case 'filling':
        this.router.navigate(['/dashboard/candidate']);

        break;
      case 'committeeinfo':
        this.router.navigate(['/']);

        break;
      case 'fineandfees':
        this.router.navigate(['/']);

        break;
      case 'committeeinfo':
        this.router.navigate(['/']);

        break;
      case 'message':
        this.router.navigate(['/manage/messages']);

        break;
      case 'calender':
        this.router.navigate(['/']);
        break;
      case 'registration':
        this.router.navigate(['/']);
        break;
    }

  }
  // callall(value: any, tab: string) {
  //   this.clickedlabel(value);
  //   if(tab=='filling'){
  //     this.router.navigate(['/dashboard/candidate']);
  //   }
  // }

  setSidePanel() {
    this.localrole = this.localStore.getLocalStorage('user_type');
    if (this.localrole == 'Admin') {
      this.isadmin = true;
    } else {
      this.isadmin = false;
    }
  }
  checkRouter() {
    const splittedRoute = this.currenturl?.split('/');
    if (splittedRoute && splittedRoute[1] == 'dashboard') {
      this.showmsg = true;
    }
    if (splittedRoute && ( splittedRoute[1] == 'switch' || splittedRoute[2] == 'committee-registration' || splittedRoute[2] == 'createlobbyist') ) {
      this.hidesidenav = true;
    }
  }

}
