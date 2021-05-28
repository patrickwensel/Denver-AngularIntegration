import { Injectable } from "@angular/core";
import { Subject, Observable, Subscription, BehaviorSubject } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
// import { DialogConfirmationComponent } from "../dialog-confirmation/dialog-confirmation.component";
// import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ReturnStatement } from "@angular/compiler";
import { ClientService } from "../api-services/client.service";
import { MasterDataService } from "src/app/configs/master-data";
import { SnackbarService } from '../snackbar/snackbar.service';
import { MasterUrlService } from "..";
import * as data from "./../../../assets/i18n/static_data.json";
@Injectable()
export class SharedService {

  constructor(private snackbar: SnackbarService) { }



}
// Shared/Common methods

@Injectable()
export class CommonMethods {

  // For checking is from compeleted QUEUE or Not
  setCurrentLanguage(currentLan = 'en') {

    try {
      sessionStorage.setItem('lang', currentLan.toString());
    } catch (err) {
      console.log("SessionStorage Set Issue<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<====================", err)
      //  return data['en'];
    }
  }
  // For checking is from compeleted QUEUE or Not
  getCurrentLanguage() {
    let selectedData = data['default'];
    try {
      let language = sessionStorage.getItem("lang");
      // For checking is from compeleted QUEUE or Not
      let selectedLan = (language && language != 'undefined') ? language : 'en';


      return selectedData[selectedLan];
    } catch (err) {
      console.log("SessionStorage Issue<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<====================", err)
      return selectedData['en'];
    }
  }
  isReloaded(flag = 'true') {
    sessionStorage.setItem('reloaded', flag);
  }
  getIsReloaded() {
    return (sessionStorage.getItem('reloaded') || 'false');
  }
}

