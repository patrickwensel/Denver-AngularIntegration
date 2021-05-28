
import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AuthService, MasterDataService, MasterRoleService, LocalstorageService, SharedService, MasterUrlService } from '../../../core/index';
import { Router } from '@angular/router';
// import { DispensaryChecklistComponent } from '../../../modules/patient-management/dispensary-checklist/dispensary-checklist.component';
import { ClientService } from 'src/app/core/api-services/client.service';
import { Subject, Subscription } from 'rxjs';
// import { TimezoneComponent } from '../timezone/timezone.component';
import { MatDialog } from '@angular/material/dialog';
// import { QueueService } from 'src/app/modules/queue/queue.service';

@Component({
  selector: 'app-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.scss']
})
export class NavLayoutComponent implements OnInit {
  showNav = true;
  searchAdvanceSub: Subscription;
  showProfileMenu = false;
  activeClass = 'home';
  loginDetails: any;
  faclity: any;
  checklistVisible = false;
  orderId=0;
  patientId=0;
  viewToShow= true;
  userOpen: Subject<any> = new Subject();
  visibleUser: boolean = false;
  // @ViewChild("dropdown") dropdown;
  // @ViewChild(DispensaryChecklistComponent) dispensaryChecklist: DispensaryChecklistComponent;
  hideNavBars: boolean = false;
  emitdialog: Subscription;
  emitdialog1: Subscription;
  navRoute: any;

    constructor(
    public masterKey: MasterDataService,
    private authGuard: AuthService,
    public roleGuard: MasterRoleService,
    // private localStore: LocalstorageService,
    // private sharedService: SharedService,
    public router: Router,
    // private eRef: ElementRef,
    // private service: ClientService,
    // private model: ConfirmationModal,
    // private snackbar: SnackbarService,
    // private dialogRef: MatDialog,
    // private queueService: QueueService,
    // private searchAdvanceFilter: SearchAdvanceFilter,
    private urlService: MasterUrlService
  ) {
    this.hideNavBars = false;
    // this.sharedService.facilityCheck.subscribe((value: any) => {
    //   this.faclity = value;
    // });
    //  this.sharedService.hideNavBars.subscribe((val: boolean) =>this.hideNavBars = val );
    // let urlArry = this.router.url.split('/');
    // if(urlArry.length && urlArry[1] && urlArry[1] == 'queue' && urlArry[2] && urlArry[2] == 'preview-document'){
    //   this.hideNavBars = true;
    // }else{
    //   this.hideNavBars = false;
    // }
  }

  ngOnInit() {
    this.hideNavBars = false;
    // let urlArry = this.router.url.split('/');
    // if(urlArry.length && urlArry[1] && urlArry[1] == 'queue' && urlArry[2] && urlArry[2] == 'preview-document'){
    //   this.hideNavBars = true;
    // }
    // // this.loginDetails = this.localStore.getLocalStorage(this.masterKey.userDetails);
    // this.patientId =0;
    // this.orderId=0;
    // this.searchAdvanceSub = this.searchAdvanceFilter.getQueueAndTimeZone().subscribe((data: { content: { type: string; }; }) => {
    //   if (data.content.type == 'update') {
    //     this.ngOnInit();
    //   }
    // });
  }

  // @HostListener('document:click', ['$event'])
  // clickout(event: any }) {
  //   if (event.target.id !== 'showDropDown' && event.target.id !== 'hideDropDown') {
  //     document.querySelector('.c-Site-header__profile-menu').classList.remove('active');
  //     this.showProfileMenu = false;
  //   }

  //   if (this.checklistVisible) {
  //     if (this.childOf(event.target, document.getElementById('checklist'))) {
  //       return;
  //     } else {
  //       this.checklistVisible = false;
  //     }
  //   }

  // }

  // childOf(c: { parentNode: any; }, p: HTMLElement | null) {
  //   while ((c = c.parentNode) && c !== p);
  //   return !!c;
  // }

  // toggleOpen() {
  //   this.showNav = !this.showNav;
  //   if (!this.showNav) {
  //     document.querySelector('body').classList.add('nav-open');
  //   } else {
  //     document.querySelector('body').classList.remove('nav-open');
  //   }
  // }

  // openQueue() {
  //   var role  = this.loginDetails ? this.loginDetails.role : '';
  //   this.showNav = !this.showNav;
  //   // this.navRoute = JSON.parse(sessionStorage.getItem('navRoute'));
  //   // var updateQueue = JSON.parse(sessionStorage.getItem('queueUpdated'));
  //   this.router.navigate([this.navRoute]);
  //   if (role !== 'Admin' && !updateQueue) {
  //     /**Timezone update after login */
  //     let dialog  = this.dialogRef.open(TimezoneComponent, {
  //       width: "450px",
  //       height: "270px",
  //       disableClose: true,
  //       data: {queueTypeID: this.loginDetails?.queueTypeID, timeZoneID:this.loginDetails?.timezoneID, from: 'queue'},
  //     });

  //     dialog.afterClosed().subscribe((result) => {
  //       sessionStorage.setItem("queueUpdated", JSON.stringify(true));
  //       var timezone = JSON.parse(sessionStorage.getItem('selectedTimezone'));
  //       const navLinks = [
  //         {
  //           label: 'Intake',
  //           path: './queue',
  //           url: '/queue/queue',
  //           queueTypeName: "Intake Queue",
  //           index: 0
  //         },
  //         {
  //           label: 'Verification',
  //           path: './VerificationList',
  //           url: '/queue/VerificationList',
  //           queueTypeName: "Verification Queue",
  //           index: 1
  //         },
  //         {
  //           label: 'Client Relation',
  //           path: './ClientRelationship',
  //           url: '/queue/ClientRelationship',
  //           queueTypeName: "Client Relations",
  //           index: 2
  //         },
  //         {
  //           label: 'Exception',
  //           path: './ExceptionList',
  //           url: '/queue/ExceptionList',
  //           queueTypeName: "Exception Queue",
  //           index: 3
  //         },
  //         {
  //           label: 'Care Management',
  //           path: './CareQueueList',
  //           url: '/queue/CareQueueList',
  //           queueTypeName: "Care Management Queue",
  //           index: 4
  //         },
  //         {
  //           label: 'MCS',
  //           path: './MCSList',
  //           url: '/queue/MCSList',
  //           queueTypeName: "MCS Queue",
  //           index: 5
  //         },
  //         {
  //           label: 'Completed Order',
  //           path: './completedOrder',
  //           url: '/queue/completedOrder',
  //           queueTypeName: "Completed Queue",
  //           index: 6
  //         },
  //         {
  //           label: 'Payer Relations',
  //           path: './PayerList',
  //           url: '/queue/PayerList',
  //           queueTypeName: "Payer",
  //           index: 7
  //         }
  //       ];
  //       if(result) {
  //         if(result?.timeZoneID) {
  //           this.queueService.timeZone.next(result?.timeZoneID);
  //         }
  //         if(result?.navRoute && result?.update === true) {
  //           this.router.navigate([result.navRoute]);
  //         }
  //         var found = navLinks.find(obj =>  obj.url === result?.navRoute);
  //         const queueType = this.router.url.split('/')
  //         const currentUrl = queueType[queueType.length - 1];
  //         if (!this.showNav) {
  //           // document.querySelector('body').classList.add('nav-open');
  //         } else {
  //           // document.querySelector('body').classList.remove('nav-open');
  //         }
  //         if(found && './'+currentUrl === found.path){
  //           this.searchAdvanceFilter.sendQueue({
  //             type: timezone,
  //           });
  //         }
  //         this.searchAdvanceFilter.sendueuAndTimeZone({
  //           type: 'update',
  //         });
  //       }
  //     });
  //   }
  // }

  create() {
    this.visibleUser = false;
    this.userOpen.next(false);
  }

  toggleProfileMenu() {
    this.visibleUser = false;
    this.userOpen.next(false);
    if (!this.showProfileMenu) {
      // document.querySelector('.c-Site-header__profile-menu').classList.add('active');
    } else {
      // document.querySelector('.c-Site-header__profile-menu').classList.remove('active');
    }
    this.showProfileMenu = !this.showProfileMenu;
  }
  goToProfile(){
    this.router.navigate(['/home/my-profile'])
  }
  viewChecklist(event: { stopPropagation: () => void; }) {
    // this.dispensaryChecklist.getDispensaryChecklist();
    this.checklistVisible = !this.checklistVisible;
    // this.callChecklist = true;
    event.stopPropagation();
  }

  ngOnDestroy() {
    if (this.searchAdvanceSub) {
      this.searchAdvanceSub.unsubscribe();
    }
  }

  isViewable(): Object {
    if (this.checklistVisible) {
      return { visibility: 'visible', opacity: 1 }
    } else {
      return { visibility: 'hidden', opacity: 0 }
    }
  }

  // closeWindowEvent(e) {
  //   const elem = e.target;
  //   let isElmFound = elem.closest('.' + window.openTarget);
  //   if(!isElmFound) {
  //     if(window.openTarget === 'c-Site-header__profile-menu') {
  //       this.showProfileMenu = false;
  //       window.removeEventListener('click', window.closeWindowEvent);
  //     }
  //   }
  // // }
  // openRefill() {
  //   if(this.faclity){
  //   this.sharedService.refillOpen.next('true');

  //   }else{
  //     this.router.navigate(['refill-request'], { queryParams: { from: 'Patient' } });
  //   }
  // }
  // openSWO() {
  //   if (this.faclity) {
  //     this.sharedService.dwoOpen.next('true');
  //   }
  //   else {
  //     this.router.navigateByUrl('swo-order');
  //   }
  // }
  // openModalfacility() {
  //   if (this.faclity) {
  //     this.sharedService.facilityCommunicationOpen.next('true');
  //   }
  //   else {
  //     this.router.navigate(['facility-communication'], { queryParams: { from: 'Patient' } });
  //   }

  // }
  // opendispensing() {
  //   console.log(this.faclity, "this.faclity");
  //   if (this.faclity) {
  //     this.sharedService.dispensingOpen.next('true');
  //   }
  //   else {
  //     this.router.navigate(['dispensing-order'] ,  { queryParams: { from: 'Patient' }});
  //   }
  // }

  // openModalmedical() {
  //   if (this.faclity) {
  //     this.sharedService.medicalFormOpen.next('true');
  //   }
  //   else {
  //     this.router.navigate(['medical-request'] ,  { queryParams: { from: 'Patient' }});
  //   }
  // }

  // /**user Summary Toggle */
  // userSummary(){
  //   this.visibleUser = !this.visibleUser
  //   this.userOpen.next(this.visibleUser);
  // }

  // help() {
  //   this.visibleUser = false;
  //   this.userOpen.next(false);
  // }

  // notify() {
  //   this.visibleUser = false;
  //   this.userOpen.next(false);
  // }

  // /**Update User Summary Visiblity */
  // updateUserSummary(value) {
  //   this.visibleUser = value;
  // }
  // /**Manual Logout */
  // logout() {
  //   this.model.open({
  //     id: "logout",
  //     title: this.masterKey.logout,
  //     content: this.masterKey.logoutContent,
  //     yesButton: this.masterKey.logoutButton,
  //     noButton: this.masterKey.cancel,
  //   });
  //   this.emitdialog = this.model.closeListen().subscribe((data) => {
  //     if (data.requestId === "logout") {
  //       if (data.confirmation) {
  //         var payload = [];
  //         payload.push({logoutType: true});
  //         this.service.postData(this.urlService.logout, payload).subscribe((res: any) => {
  //           if(res) {
  //             this.authGuard.logout();
  //             sessionStorage.clear();
  //           }
  //         });
  //       }
  //     }
  //   });
  // }

  // /**Change password confirmation dialog */
  // changePassword() {
  //   this.model.open({
  //     id: "change_password",
  //     title: this.masterKey.changePasswordTitle,
  //     content: this.masterKey.changePasswordContent,
  //     yesButton: this.masterKey.yes,
  //     noButton: this.masterKey.cancel,
  //   });
  //   this.emitdialog1 = this.model.closeListen().subscribe((data) => {
  //     if (data.requestId === "change_password") {
  //       if (data.confirmation) {
  //         var body = {
  //           userName: this.loginDetails?.userName,
  //           reqType: "CHANGE_PASSWORD"
  //         }
  //         this.service.postData(this.urlService.forgetPassword, body).subscribe(res => {
  //           if (res.hasError || res.result.hasError) {
  //             this.snackbar.snackbarError(res.message ? res.message : (res.result && res.result.message) ?
  //             res.result.message : this.masterKey.somethingWentWrong, this.masterKey.center);
  //           } else {
  //             this.snackbar.snackbarSuccess(res.message ? res.message : (res.result && res.result.message) ?
  //             res.result.message : this.masterKey.forgotPasswordOnSubmit1);
  //           }
  //         });
  //       }
  //     }
  //   });
  // }
}
